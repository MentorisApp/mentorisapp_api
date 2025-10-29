import { eq } from "drizzle-orm";
import { FastifyInstance } from "fastify";
import { offers_categories } from "~/db/schema/junctions/offers_categories.schema";
import { AlreadyExistsError } from "~/domain/errors/AlreadyExistsError";
import { NotFoundError } from "~/domain/errors/NotFoundError";
import { OfferUserCreate, OfferUserUpdate } from "~/validators/offer.validator";

export function createOfferService(app: FastifyInstance) {
	const { db } = app;
	const { offers } = db;

	async function createOffer(body: OfferUserCreate, userId: number) {
		const existingOffer = await checkOfferExistsByUserId(userId);

		if (existingOffer) {
			throw new AlreadyExistsError("Offer already exists for this user");
		}

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

	async function updateOffer(body: OfferUserUpdate, userId: number) {
		const existingOffer = await checkOfferExistsByUserId(userId);

		if (!existingOffer) {
			throw new NotFoundError("Offer you are trying to update does not exist");
		}

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

		if (!offer) {
			throw new NotFoundError("Offer does not exist");
		}

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
					with: {
						category: true,
					},
				},
			},
		});

		if (!offer) {
			throw new NotFoundError("Offer does not exist");
		}

		const { offersCategories, ...restOffer } = offer;

		const transformedOffer = {
			...restOffer,
			categories: offersCategories.map((oc) => oc.category),
		};

		return transformedOffer;
	}

	return { createOffer, updateOffer, getOfferByUserId, getOfferByOfferId };
}
