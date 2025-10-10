import { eq } from "drizzle-orm";
import { FastifyInstance } from "fastify";
import { AlreadyExistsError } from "~/domain/errors/AlreadyExistsError";
import { NotFoundError } from "~/domain/errors/NotFoundError";
import { unwrapResult } from "~/utils/db.util";
import { OfferUserCreate, OfferUserUpdate } from "~/validators/offer.validator";

export function createOfferService(app: FastifyInstance) {
	const { db } = app;
	const { offers } = db;

	async function createOffer(body: OfferUserCreate, userId: number) {
		const existingOffer = await checkOfferExistsByUserId(userId);

		if (existingOffer) {
			throw new AlreadyExistsError("Offer already exists for this user");
		}

		const record = await db
			.insert(offers)
			.values({
				...body,
				userId: userId,
			})
			.returning();

		return unwrapResult(record);
	}

	async function updateOffer(body: OfferUserUpdate, userId: number) {
		const existingOffer = await checkOfferExistsByUserId(userId);

		if (!existingOffer) {
			throw new NotFoundError("Offer you are trying to update does not exist");
		}

		const { priceType, price, priceFrom, priceTo, ...restBody } = body;

		const record = await db
			.update(offers)
			.set({
				...restBody,
				price: priceType === "FIXED" ? price : null,
				priceFrom: priceType === "RANGE" ? priceFrom : null,
				priceTo: priceType === "RANGE" ? priceTo : null,
				priceType: priceType,
				updatedAt: new Date(),
			})
			.where(eq(offers.userId, userId))
			.returning();

		return unwrapResult(record);
	}

	async function checkOfferExistsByUserId(userId: number) {
		const record = await db.select().from(offers).where(eq(offers.userId, userId)).limit(1);
		return record.length > 0;
	}

	async function getOfferByUserId(userId: number) {
		const record = await db.select().from(offers).where(eq(offers.userId, userId)).limit(1);
		return unwrapResult(record);
	}

	return { createOffer, updateOffer, getOfferByUserId };
}
