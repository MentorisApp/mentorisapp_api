import { and, desc, eq } from "drizzle-orm";
import { FastifyInstance } from "fastify";

import { AlreadyExistsError } from "~/domain/errors/AlreadyExistsError";
import { ForbiddenError } from "~/domain/errors/ForbiddenError";
import { NotFoundError } from "~/domain/errors/NotFoundError";
import { unwrapResult } from "~/utils/db.util";
import { ReviewCreate } from "~/validators/reviews.validator";

export function createReviewService(app: FastifyInstance) {
	const { db } = app;
	const { reviews, offers } = db;

	async function createReview(payload: ReviewCreate, userId: number) {
		const offer = await db.query.offers.findFirst({
			where: eq(offers.id, payload.offerId),
			columns: { id: true, userId: true },
		});

		if (!offer) {
			throw new NotFoundError("Offer not found");
		}

		if (offer.userId === userId) {
			throw new ForbiddenError("You cannot review your own offer!");
		}

		const reviewExists = await checkUserReviewExistsByOfferId(userId, payload.offerId);

		if (reviewExists) {
			throw new AlreadyExistsError("Review already exists");
		}

		const result = await db
			.insert(reviews)
			.values({
				...payload,
				userId: userId,
			})
			.returning();

		const newReview = unwrapResult(result);

		return newReview;
	}

	async function getAllActiveOfferReviews(offerId: number) {
		// TODO pagination
		const reviewsData = await db.query.reviews.findMany({
			where: and(eq(reviews.offerId, offerId), eq(reviews.modStatus, "APPROVED")),
			columns: {
				rating: true,
				id: true,
				description: true,
				offerId: true,
				createdAt: true,
			},
			orderBy: desc(reviews.createdAt),
			limit: 50,
			with: {
				user: {
					with: {
						profile: { columns: { firstName: true, lastName: true, profilePictureUrl: true } },
					},
				},
			},
		});

		const reviewsTransformed = reviewsData.map((review) => {
			return {
				...review,
				user: review.user.profile,
			};
		});

		return reviewsTransformed;
	}

	async function checkUserReviewExistsByOfferId(userId: number, offerId: number) {
		const result = await db
			.select()
			.from(reviews)
			.where(and(eq(reviews.offerId, offerId), eq(reviews.userId, userId)))
			.limit(1);

		return result.length > 0;
	}

	return {
		createReview,
		checkUserReviewExistsByOfferId,
		getAllActiveOfferReviews,
	};
}
