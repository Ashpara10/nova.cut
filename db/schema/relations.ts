import { relations } from "drizzle-orm";
import { user } from "./auth";
import { projects, assets } from "./projects";
import { jobs, jobStages } from "./jobs";
import { scriptVersions, scriptSegments } from "./scripts";
import { subscription, creditTransaction } from "./billing";
import { renders } from "./renders";

export const userRelations = relations(user, ({ many }) => ({
  projects: many(projects),
}));

export const projectRelations = relations(projects, ({ many, one }) => ({
  assets: many(assets),
  jobs: many(jobs),
  renders: many(renders),
  user: one(user, {
    fields: [projects.userId],
    references: [user.id],
  }),
}));

export const assetRelations = relations(assets, ({ one }) => ({
  project: one(projects, {
    fields: [assets.projectId],
    references: [projects.id],
  }),
}));

export const jobRelations = relations(jobs, ({ one, many }) => ({
  project: one(projects, {
    fields: [jobs.projectId],
    references: [projects.id],
  }),
  stages: many(jobStages),
}));

export const jobStageRelations = relations(jobStages, ({ one }) => ({
  job: one(jobs, {
    fields: [jobStages.jobId],
    references: [jobs.id],
  }),
}));

export const scriptVersionRelations = relations(scriptVersions, ({ many }) => ({
  segments: many(scriptSegments),
}));

export const scriptSegmentRelations = relations(scriptSegments, ({ one }) => ({
  version: one(scriptVersions, {
    fields: [scriptSegments.scriptVersionId],
    references: [scriptVersions.id],
  }),
}));

export const userBillingRelations = relations(subscription, ({ one }) => ({
  user: one(user, {
    fields: [subscription.userId],
    references: [user.id],
  }),
}));

export const creditTransactionsRelations = relations(creditTransaction, ({ one }) => ({
  user: one(user, {
    fields: [creditTransaction.userId],
    references: [user.id],
  }),
}));

export const renderRelations = relations(renders, ({ one }) => ({
  project: one(projects, {
    fields: [renders.projectId],
    references: [projects.id],
  }),
}));
