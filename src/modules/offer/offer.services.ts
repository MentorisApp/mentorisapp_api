import { eq } from "drizzle-orm";

import { offer_offer_level, offers, offers_categories } from "~/db/schema";
import { ConflictError } from "~/shared/errors/generic/ConflictError";
import { NotFoundError } from "~/shared/errors/generic/NotFoundError";
import { App } from "~/types/app.types";

import type { CreateOfferRequest } from "./schemas/dto/create-offer.schema";
import type { UpdateOfferRequest } from "./schemas/dto/update-offer.schema";

export function createOfferService(app: App) {
	const { db } = app;

	async function createOffer(body: CreateOfferRequest, userId: number) {
		const existingOffer = await checkOfferExistsByUserId(userId);

		if (existingOffer) throw new ConflictError("Offer already exists for this user");

		const { categoryIdList, levelIdList, formatIdList, ...offerData } = body;

		const newOffer = await db.transaction(async (tx) => {
			const [offer] = await tx
				.insert(offers)
				.values({
					...offerData,
					userId,
				})
				.returning();

			if (categoryIdList.length) {
				await tx.insert(offers_categories).values(
					categoryIdList.map((categoryId) => ({
						offerId: offer.id,
						categoryId,
					})),
				);
			}

			if (levelIdList?.length) {
				await tx.insert(offer_offer_level).values(
					levelIdList.map((levelId) => ({
						offerId: offer.id,
						offerLevelId: levelId,
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

		const { categoryIds, ...restBody } = body;

		const updatedOffer = await db.transaction(async (tx) => {
			const [offer] = await tx
				.update(offers)
				.set({
					...restBody,
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
