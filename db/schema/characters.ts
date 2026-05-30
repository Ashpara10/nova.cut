import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const characters = pgTable("characters", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  systemPrompt: text("system_prompt"),
  avatarUrl: text("avatar_url"),
  defaultVoiceId: text("default_voice_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type TCharacter = typeof characters.$inferSelect;
export type NewCharacter = typeof characters.$inferInsert;
