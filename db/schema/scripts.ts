import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { projects } from "./projects";

export const scriptVersions = pgTable(
  "script_versions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("project_id")
      .references(() => projects.id, { onDelete: "cascade" })
      .notNull(),
    name: text("name").notNull(),
    isActive: boolean("is_active").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("script_versions_project_id_unique").on(table.projectId),
  ],
);

export const scriptSegments = pgTable("script_segments", {
  id: uuid("id").primaryKey().defaultRandom(),
  scriptVersionId: uuid("script_version_id")
    .references(() => scriptVersions.id, { onDelete: "cascade" })
    .notNull(),
  order: integer("order").notNull(),
  voiceId: text("voice_id"),
  text: text("text").notNull(),
  visualDescription: text("visual_description"),
  durationSeconds: integer("duration_seconds"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type TScript = typeof scriptVersions.$inferSelect;
export type NewScript = typeof scriptVersions.$inferInsert;

export type TScriptSegment = typeof scriptSegments.$inferSelect;
export type NewScriptSegment = typeof scriptSegments.$inferInsert;
