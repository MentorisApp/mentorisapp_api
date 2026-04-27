import { and, desc, eq } from "drizzle-orm";

import { offerReviews, offers } from "~/db/schema";
import { ConflictError } from "~/shared/errors/generic/ConflictError";
import { ForbiddenError } from "~/shared/errors/generic/ForbiddenError";
import { NotFoundError } from "~/shared/errors/generic/NotFoundError";
import { App } from "~/types/app.types";
import { unwrapResult } from "~/utils/db.util";

import type { CreateReviewRequest } from "./schemas/dto/create-review.schema";

export function createReviewService(app: App) {
	const { db } = app;

	async function createReview(payload: CreateReviewRequest, userId: number) {
		const offer = await db.query.offers.findFirst({
			where: eq(offers.id, payload.offerId),
			columns: { id: true, user_id: true },
		});

		if (!offer) {
			throw new NotFoundError("Offer not found");
		}

		if (offer.user_id === userId) {
			throw new ForbiddenError("You cannot review your own offer!");
		}

		const reviewExists = await checkUserReviewExistsByOfferId(userId, payload.offerId);

		if (reviewExists) {
			throw new ConflictError("Review already exists");
		}

		const result = await db
			.insert(offerReviews)
			.values({
				user_id: userId,
				offer_id: payload.offerId,
				rating: payload.rating,
				description: payload.description,
			})
			.returning();

		const newReview = unwrapResult(result);

		return newReview;
	}

	async function getAllActiveOfferReviews(offerId: number) {
		// TODO pagination
		// TODO show review full
		const reviewsData = await db.query.offerReviews.findMany({
			where: and(eq(offerReviews.offer_id, offerId), eq(offerReviews.mod_status, "APPROVED")),
			columns: {
				rating: true,
				id: true,
				description: true,
				offer_id: true,
				created_at: true,
			},
			orderBy: desc(offerReviews.created_at),
			limit: 50,
			with: {
				user: {
					with: {
						profile: { columns: { profile_picture_url: true } },
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
			.from(offerReviews)
			.where(and(eq(offerReviews.offer_id, offerId), eq(offerReviews.user_id, userId)))
			.limit(1);

		return result.length > 0;
	}

	return {
		createReview,
		checkUserReviewExistsByOfferId,
		getAllActiveOfferReviews,
	};
}
