import { numeric, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { projects } from "./projects";
import { jobs } from "./jobs";

export const renderStatusEnum = pgEnum("render_status", [
  "rendering",
  "done",
  "failed",
]);

export const renders = pgTable("renders", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .references(() => projects.id, { onDelete: "cascade" })
    .notNull(),
  renderId: text("render_id").notNull(),
  bucketName: text("bucket_name").notNull(),
  functionName: text("function_name").notNull(),
  outputUrl: text("output_url"),
  status: renderStatusEnum("status")
    .default("rendering")
    .notNull(),
  costUsd: text("cost_usd"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type Render = typeof renders.$inferSelect;
export type NewRender = typeof renders.$inferInsert;