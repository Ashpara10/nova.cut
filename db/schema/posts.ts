import { integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { renders } from "./renders";

export const postStatusEnum = pgEnum("post_status", [
  "scheduled",
  "uploading",
  "published",
  "failed",
  "cancelled",
]);

export const postPlatformEnum = pgEnum("post_platform", ["youtube"]);

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  renderId: uuid("render_id")
    .references(() => renders.id, { onDelete: "cascade" })
    .notNull(),
  platform: postPlatformEnum("platform").notNull(),
  status: postStatusEnum("status").default("scheduled").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  youtubeVideoId: text("youtube_video_id"),
  uploadSessionUri: text("upload_session_uri"),
  scheduledAt: timestamp("scheduled_at", { withTimezone: true }),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  error: text("error"),
  uploadProgress: integer("upload_progress"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type TPost = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type TPostStatus = typeof postStatusEnum.enumValues[number];
export type TPostPlatform = typeof postPlatformEnum.enumValues[number];
