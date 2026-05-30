import { integer, pgEnum, pgTable, text, timestamp, uuid, jsonb } from "drizzle-orm/pg-core";
import { projects } from "./projects";

export const jobStatusEnum = pgEnum("job_status", [
  "queued",
  "processing",
  "completed",
  "failed",
]);

export const jobs = pgTable("jobs", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .references(() => projects.id, { onDelete: "cascade" })
    .notNull(),
  status: jobStatusEnum("status")
    .default("queued")
    .notNull(),
  error: text("error"),
  startedAt: timestamp("started_at"),
  finishedAt: timestamp("finished_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});



export const stageNameEnum = pgEnum("stage_name", [
  "ingest",
  "transcribe",
  "generate-script",
  "generate-tts",
  "generate-images",
  "generate-captions",
  "analyse-clips",
  "cut-clips",
]);

export const stageStatusEnum = pgEnum("stage_status", [
  "pending",
  "processing",
  "done",
  "failed",
]);

export const jobStages = pgTable("job_stages", {
  id: uuid("id").primaryKey().defaultRandom(),
  jobId: uuid("job_id")
    .references(() => jobs.id, { onDelete: "cascade" })
    .notNull(),
  stage: stageNameEnum("stage").notNull(),
  status: stageStatusEnum("status").default("pending").notNull(),
  input: jsonb("input").$type<Record<string, any>>(),
  output: jsonb("output").$type<Record<string, any>>(),
  error: text("error"),
  progress: integer("progress").default(0).notNull(), // 0-100
  startedAt: timestamp("started_at"),
  finishedAt: timestamp("finished_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type TJob = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;

export type TJobStage = typeof jobStages.$inferSelect;
export type NewJobStage = typeof jobStages.$inferInsert;

export type TStageName = typeof stageNameEnum.enumValues[number];
export type TStageStatus = typeof stageStatusEnum.enumValues[number];
