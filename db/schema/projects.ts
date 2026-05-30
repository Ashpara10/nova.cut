import { jsonb, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const projectStatusEnum = pgEnum("project_status", [
  "uploading",
  "processing",
  "ready",
  "completed",
  "failed",
]);

export const assetTypes = [
  "raw_video",
  "audio",
  "audio_segment",
  "image",
  "transcript",
  "clip",
  "captions",
  "final_video",
] as const;

export const projectTypes = [
  "generate-viral-clips",
  "generate-viral-clips-youtube",
  "character-explanation",
  "story-time-video",
  "reddit-to-video",
  "x-post-to-video"
] as const;

export type TProjectType = "generate-viral-clips" | "generate-viral-clips-youtube" |
  "character-explanation" | "story-time-video" | "reddit-to-video" | "x-post-to-video";

export const assetTypeEnum = pgEnum("asset_type", assetTypes);
export const projectTypeEnum = pgEnum("project_type", projectTypes);

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  metadata: jsonb("metadata").$type<Record<string, any>>(),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").notNull(),
  type: projectTypeEnum("type").notNull(),
  status: projectStatusEnum("status"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


export const assets = pgTable("assets", {
  id: uuid("id").primaryKey().defaultRandom(),

  projectId: uuid("project_id")
    .references(() => projects.id, { onDelete: "cascade" })
    .notNull(),

  type: assetTypeEnum("type").notNull(),

  storagePath: text("storage_path").notNull(),

  metadata: jsonb("metadata").$type<Record<string, any>>(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});



export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;

export type TAsset = typeof assets.$inferSelect;
export type NewAsset = typeof assets.$inferInsert;

export type TAssetType = typeof assetTypes[number];
