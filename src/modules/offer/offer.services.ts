import { eq } from "drizzle-orm";
import { FastifyInstance } from "fastify";

import { offers_categories } from "~/db/schema/junctions/offers_categories.schema";
import { ConflictError } from "~/errors/generic/ConflictError";
import { NotFoundError } from "~/errors/generic/NotFoundError";

import type { CreateOfferRequest } from "./schemas/createOffer.schema";
import type { UpdateOfferRequest } from "./schemas/updateOffer.schema";

export function createOfferService(app: FastifyInstance) {
	const { db } = app;
	const { offers } = db;

	async function createOffer(body: CreateOfferRequest, userId: number) {
		const existingOffer = await checkOfferExistsByUserId(userId);

		if (existingOffer) throw new ConflictError("Offer already exists for this user");

		const { categoryIds, ...offerData } = body;

		const newOffer = await db.transaction(async (tx) => {
			const [offer] = await tx
				.insert(offers)
				.values({
					...offerData,
					userId,
				})
				.returning();

			if (categoryIds?.length) {
				await tx.insert(offers_categories).values(
					categoryIds.map((categoryId) => ({
						offerId: offer.id,
						categoryId,
					})),
				);
			}

			return offer;
		});

		return newOffer;
	}

	async function updateOffer(body: UpdateOfferRequest, userId: number) {
		const existingOffer = await checkOfferExistsByUserId(userId);

		if (!existingOffer) throw new NotFoundError("Offer you are trying to update does not exist");

		const { categoryIds, priceType, price, priceFrom, priceTo, ...restBody } = body;

		const updatedOffer = await db.transaction(async (tx) => {
			const [offer] = await tx
				.update(offers)
				.set({
					...restBody,
					price: priceType === "FIXED" ? price : null,
					priceFrom: priceType === "RANGE" ? priceFrom : null,
					priceTo: priceType === "RANGE" ? priceTo : null,
					priceType,
					updatedAt: new Date(),
				})
				.where(eq(offers.userId, userId))
				.returning();

			if (categoryIds) {
				await tx.delete(offers_categories).where(eq(offers_categories.offerId, offer.id));

				await tx.insert(offers_categories).values(
					categoryIds.map((categoryId) => ({
						offerId: offer.id,
						categoryId,
					})),
				);
			}

			return offer;
		});

		return updatedOffer;
	}

	async function checkOfferExistsByUserId(userId: number) {
		const record = await db.select().from(offers).where(eq(offers.userId, userId)).limit(1);
		return record.length > 0;
	}

	async function getOfferByUserId(userId: number) {
		const offer = await db.query.offers.findFirst({
			where: eq(offers.userId, userId),
			with: {
				offersCategories: {
					with: {
						category: true,
					},
				},
			},
		});

		if (!offer) throw new NotFoundError("Offer does not exist");

		const { offersCategories, ...restOffer } = offer;

		const transformedOffer = {
			...restOffer,
			categories: offersCategories.map((oc) => oc.category),
		};

		return transformedOffer;
	}

	async function getOfferByOfferId(offerId: number) {
		const offer = await db.query.offers.findFirst({
			where: eq(offers.id, offerId),
			with: {
				offersCategories: {
					with: { category: { columns: { id: true, name: true } } },
					columns: { offerId: false, categoryId: false },
				},
			},
		});

		if (!offer) throw new NotFoundError("Offer does not exist");

		return offer;
	}

	return { createOffer, updateOffer, getOfferByUserId, getOfferByOfferId };
}

// TODO USE THISSSSSS IN MAPPER AND DTO
type OfferService = ReturnType<typeof createOfferService>;

// TODO USE THISSSSSS IN MAPPER AND DTO
export type OfferWithRelations = NonNullable<
	Awaited<ReturnType<OfferService["getOfferByOfferId"]>>
>;

/**
 * 🧠 PROJECT STRUCTURE GUIDELINE (DTO + MAPPERS + DOMAIN LAYER)
 *
 * This project uses a feature-based architecture.
 *
 * Each feature/module (e.g. profile, offers, users) contains its own:
 *
 * ┌─────────────────────────────────────────────┐
 * │ MODULE (e.g. offers/)                      │
 * ├─────────────────────────────────────────────┤
 * │ controller.ts   → HTTP layer (Fastify)     │
 * │ service.ts      → business logic + DB      │
 * │ repository.ts   → (optional) DB abstraction│
 * │                                             │
 * │ dtos/                                      │
 * │   offer.dto.ts  → API response types       │
 * │                                             │
 * │ mappers/                                   │
 * │   offer.mapper.ts → DB/domain → DTO shape  │
 * │                                             │
 * │ schemas/ (optional)                        │
 * │   zod validation for request bodies        │
 * └─────────────────────────────────────────────┘
 *
 *
 * ─────────────────────────────────────────────
 * 🧩 RESPONSIBILITY RULES
 * ─────────────────────────────────────────────
 *
 * 1. Controller
 *    - ONLY handles HTTP (request/response)
 *    - NO business logic
 *    - NO DB calls
 *    - calls service + returns DTO
 *
 *
 * 2. Service
 *    - contains business logic
 *    - handles validation rules (e.g. "exists", "conflict")
 *    - interacts with DB (directly or via repository)
 *    - returns RAW DB shape OR domain object (NOT API shape)
 *
 *
 * 3. Mapper
 *    - converts DB/domain → DTO
 *    - handles:
 *        - renaming fields (snake_case → camelCase)
 *        - flattening relations
 *        - shaping API response
 *    - MUST NOT contain business logic
 *
 *
 * 4. DTO
 *    - defines API response contract
 *    - should be stable and frontend-focused
 *    - NEVER contains DB structure
 *    - can be defined using Zod inference OR TS types
 *
 *
 * ─────────────────────────────────────────────
 * 🧠 DATA FLOW
 * ─────────────────────────────────────────────
 *
 * DB (Drizzle)
 *   ↓
 * Service (business logic)
 *   ↓
 * Mapper (shape transformation)
 *   ↓
 * DTO (API contract)
 *   ↓
 * Controller response
 *
 *
 * ─────────────────────────────────────────────
 * 🧪 EXAMPLE FLOW (offers)
 * ─────────────────────────────────────────────
 *
 * service:
 *   const offer = await db.query.offers.findFirst(...)
 *   return offer;
 *
 * mapper:
 *   return {
 *     id: offer.id,
 *     categories: offer.offersCategories.map(...)
 *   }
 *
 * controller:
 *   reply.ok({
 *     data: toOfferDto(offer)
 *   })
 *
 *
 * ─────────────────────────────────────────────
 * 🚫 ANTI-PATTERNS
 * ─────────────────────────────────────────────
 *
 * ❌ DB shape returned directly to frontend
 * ❌ mapping inside controllers
 * ❌ business logic inside mappers
 * ❌ leaking DB join structure into API
 *
 *
 * ─────────────────────────────────────────────
 * 🚀 DESIGN GOAL
 * ─────────────────────────────────────────────
 *
 * - DB = efficient data access
 * - Service = business rules
 * - Mapper = transformation logic
 * - DTO = stable API contract
 *
 * Keep controllers thin, services meaningful, mappers pure.
 */
