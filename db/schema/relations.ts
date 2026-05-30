import { relations } from "drizzle-orm";
import { user } from "./auth";
import { projects, assets } from "./projects";
import { jobs, jobStages } from "./jobs";
import { scriptVersions, scriptSegments } from "./scripts";
import { userBilling, creditTransactions, jobCosts } from "./billing";
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

export const userBillingRelations = relations(userBilling, ({ one }) => ({
  user: one(user, {
    fields: [userBilling.userId],
    references: [user.id],
  }),
}));

export const creditTransactionsRelations = relations(creditTransactions, ({ one }) => ({
  user: one(user, {
    fields: [creditTransactions.userId],
    references: [user.id],
  }),
  project: one(projects, {
    fields: [creditTransactions.projectId],
    references: [projects.id],
  }),
}));

export const jobCostsRelations = relations(jobCosts, ({ one }) => ({
  job: one(jobs, {
    fields: [jobCosts.jobId],
    references: [jobs.id],
  }),
}));

export const renderRelations = relations(renders, ({ one }) => ({
  project: one(projects, {
    fields: [renders.projectId],
    references: [projects.id],
  }),
}));
