import { eq } from "drizzle-orm";

import { offers, offersOfferCategories, offersOfferLevels } from "~/db/schema";
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

		const { categoryIdList, levelIdList, ...offerData } = body;

		const newOffer = await db.transaction(async (tx) => {
			const [offer] = await tx
				.insert(offers)
				.values({
					title: offerData.title,
					description: offerData.description,
					price_from_cents: offerData.priceFromCents,
					price_to_cents: offerData.priceToCents,
					user_id: userId,
				})
				.returning();

			if (categoryIdList.length) {
				await tx.insert(offersOfferCategories).values(
					categoryIdList.map((categoryId) => ({
						offer_id: offer.id,
						category_id: categoryId,
					})),
				);
			}

			if (levelIdList?.length) {
				await tx.insert(offersOfferLevels).values(
					levelIdList.map((levelId) => ({
						offer_id: offer.id,
						offer_level_id: levelId,
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
				.where(eq(offers.user_id, userId))
				.returning();

			if (categoryIds) {
				await tx.delete(offersOfferCategories).where(eq(offersOfferCategories.offer_id, offer.id));

				await tx.insert(offersOfferCategories).values(
					categoryIds.map((categoryId) => ({
						offer_id: offer.id,
						category_id: categoryId,
					})),
				);
			}

			return offer;
		});

		return updatedOffer;
	}

	async function checkOfferExistsByUserId(userId: number) {
		const record = await db.select().from(offers).where(eq(offers.user_id, userId)).limit(1);
		return record.length > 0;
	}

	async function getOfferByUserId(userId: number) {
		const offer = await db.query.offers.findFirst({
			where: eq(offers.user_id, userId),
			with: {
				offersOfferCategories: {
					with: {
						offerCategory: true,
					},
				},
			},
		});

		if (!offer) throw new NotFoundError("Offer does not exist");

		const { offersOfferCategories, ...restOffer } = offer;

		const transformedOffer = {
			...restOffer,
			categories: offersOfferCategories.map((oc) => oc.offerCategory),
		};

		return transformedOffer;
	}

	async function getOfferByOfferId(offerId: number) {
		const offer = await db.query.offers.findFirst({
			where: eq(offers.id, offerId),
			with: {
				offersOfferCategories: {
					with: { offerCategory: { columns: { id: true, label: true } } },
					columns: { offer_id: false, category_id: false },
				},
			},
		});

		if (!offer) throw new NotFoundError("Offer does not exist");

		return offer;
	}

	return { createOffer, updateOffer, getOfferByUserId, getOfferByOfferId };
}
