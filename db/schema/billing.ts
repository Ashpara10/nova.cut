// db/schema/billing.ts
import { boolean, integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const planEnum = pgEnum("plan", ["free", "creator", "pro", "studio"]);

export const creditTransactionTypeEnum = pgEnum("credit_transaction_type", [
  "subscription_grant",
  "pack_grant",
  "manual_grant",
  "video_consumed",
]);

// Dodo doesn't auto-create these — we own them
export const subscription = pgTable("subscription", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  dodoSubscriptionId: text("dodo_subscription_id").unique(),
  dodoCustomerId: text("dodo_customer_id"),
  plan: planEnum("plan").notNull().default("free"),
  status: text("status").notNull().default("active"), // active | cancelled | past_due
  currentPeriodEnd: timestamp("current_period_end"),
  cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
});

export const creditTransaction = pgTable("credit_transaction", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  type: creditTransactionTypeEnum("type").notNull(),
  delta: integer("delta").notNull(),          // negative = spent, positive = granted
  balanceAfter: integer("balance_after").notNull(),
  jobId: text("job_id"),                      // set on video_consumed
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Subscription = typeof subscription.$inferSelect;
export type CreditTransaction = typeof creditTransaction.$inferSelect;