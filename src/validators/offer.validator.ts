import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import z from "zod";

import { offers } from "~/db/schema";

export const OfferUserCreateSchema = createInsertSchema(offers)
	.pick({
		title: true,
		description: true,
		level: true,
		format: true,
		price: true,
		priceFrom: true,
		priceTo: true,
		priceType: true,
	})
	.extend({
		categoryIds: z.array(z.number()).min(1, "At least one category must be selected"),
	})
	.refine((ctx) => !(ctx.price && (ctx.priceFrom || ctx.priceTo)), {
		message: "Cannot set fixed price and range together",
		path: ["price", "priceFrom", "priceTo"],
	})
	.refine((ctx) => ctx.priceType !== "FIXED" || ctx.price, {
		message: "Price must be defined if price type is set as: FIXED",
		path: ["price"],
	})
	.refine((ctx) => ctx.priceType !== "RANGE" || (ctx.priceFrom && ctx.priceTo), {
		message: "Price from/to must be defined if price type is set as: RANGE",
		path: ["priceFrom", "priceTo"],
	})
	.strict();

export const OfferUserUpdateSchema = createUpdateSchema(offers)
	.pick({
		title: true,
		description: true,
		level: true,
		format: true,
		price: true,
		priceFrom: true,
		priceTo: true,
		priceType: true,
		updatedAt: true,
	})
	.extend({
		categoryIds: z.array(z.number()).min(1, "At least one category must be selected").optional(),
	})
	.refine((ctx) => !(ctx.price && (ctx.priceFrom || ctx.priceTo)), {
		message: "Cannot set fixed price and range together",
		path: ["price", "priceFrom", "priceTo"],
	})
	.refine((ctx) => ctx.priceType !== "FIXED" || ctx.price, {
		message: "Price must be defined if price type is set as: FIXED",
		path: ["price"],
	})
	.refine((ctx) => ctx.priceType !== "RANGE" || (ctx.priceFrom && ctx.priceTo), {
		message: "Price from/to must be defined if price type is set as: RANGE",
		path: ["priceFrom", "priceTo"],
	})
	.strict();

export type OfferUserCreate = z.infer<typeof OfferUserCreateSchema>;
export type OfferUserUpdate = z.infer<typeof OfferUserUpdateSchema>;
