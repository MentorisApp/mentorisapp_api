import { relations } from "drizzle-orm";
import {
	boolean,
	decimal,
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import {
	offerFormatEnum,
	offerLevelEnum,
	offerStatusEnum,
	priceTypeEnum,
} from "../enums/db.enum.schema";
import { offers_categories } from "../junctions/offers_categories.schema";

export const offers = pgTable("offers", {
	id: serial("id").primaryKey(),
	userId: integer("user_id").notNull(),

	// Base info
	title: varchar("title", { length: 255 }).notNull(),
	description: text("description").notNull(),

	// Pricing info
	priceType: priceTypeEnum("price_type").notNull(),

	// TODO Its either price or price range, validate in api or dbs
	price: decimal("price", { precision: 10, scale: 2 }),
	priceFrom: decimal("price_from", { precision: 10, scale: 2 }),
	priceTo: decimal("price_to", { precision: 10, scale: 2 }),

	level: offerLevelEnum("level").notNull(),
	format: offerFormatEnum("format").notNull(),
	status: offerStatusEnum("status").notNull().default("PENDING"),

	// Statuses
	isApproved: boolean("is_approved").notNull().default(false),
	isActive: boolean("is_active").notNull().default(false),

	// Approval
	approvedAt: timestamp("approved_at"),
	approvedBy: integer("approved_by"),

	// Rejection
	rejectedAt: timestamp("rejected_at"),
	rejectedBy: integer("rejected_by"),

	// Created/Updated at
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),

	// TODO Add in payment gateway story phase
	// expiresAt: timestamp("expires_at").defaultNow().notNull(),
	// expiredAt: timestamp("expired_at").defaultNow().notNull(),
	// isPaid: boolean("is_paid").notNull().default(false),

	// Geolocation coordinates when map feature implemented
});

export const offersRelations = relations(offers, ({ many }) => ({
	offersCategories: many(offers_categories),
}));
