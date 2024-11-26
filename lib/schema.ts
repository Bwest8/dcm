import { pgTable, serial, varchar, date, timestamp, integer, text, boolean, unique, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const schoolYear = pgTable('school_year', {
  id: serial('id').primaryKey(),
  schoolYear: date('school_year').notNull().unique(),
  startDate: date('start_date').notNull(),
  description: varchar('description', { length: 9 }).notNull(),
  reportingYearStart: varchar('reporting_year_start', { length: 4 }).notNull(),
  reportingYearEnd: varchar('reporting_year_end', { length: 4 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const schoolYearRelations = relations(schoolYear, ({ many }) => ({
  collectionWindows: many(collectionWindow),
  snapshots: many(snapshot),
}));

export const collectionWindow = pgTable('collection_window', {
  id: serial('id').primaryKey(),
  schoolYearId: integer('school_year_id').notNull().references(() => schoolYear.id, { onDelete: 'cascade' }),
  collectionNumber: varchar('collection_number', { enum: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'] }).notNull(),
  monthSeason: varchar('month_season', { enum: ['October', 'December', 'February', 'June', 'Summer', 'AllYear', 'January', 'April'] }).notNull(),
  collectionLabel: varchar('collection_label', { length: 50 }).notNull(),
  description: varchar('description', { length: 100 }).notNull(),
}, (table) => ({
  uqCollectionWindow: unique().on(table.schoolYearId, table.collectionNumber, table.monthSeason),
  schoolYearIdIdx: index('school_year_id_idx').on(table.schoolYearId),
}));

export const collectionWindowRelations = relations(collectionWindow, ({ one, many }) => ({
  schoolYear: one(schoolYear, {
    fields: [collectionWindow.schoolYearId],
    references: [schoolYear.id],
  }),
  collections: many(collection),
}));

export const domain = pgTable('domain', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  docPath: varchar('doc_path', { length: 255 }),
});

export const domainRelations = relations(domain, ({ many }) => ({
  templates: many(template),
}));

export const template = pgTable('template', {
  id: serial('id').primaryKey(),
  pimsName: varchar('pims_name', { length: 255 }).notNull().unique(),
  escholarName: varchar('escholar_name', { length: 100 }).notNull(),
  docPath: varchar('doc_path', { length: 255 }),
  domainId: integer('domain_id').notNull().references(() => domain.id, { onDelete: 'cascade' }),
}, (table) => ({
  domainIdIdx: index('domain_id_idx').on(table.domainId),
}));

export const templateRelations = relations(template, ({ one, many }) => ({
  domain: one(domain, {
    fields: [template.domainId],
    references: [domain.id],
  }),
  collectionTemplates: many(collectionTemplate),
}));

export const snapshotName = pgTable('snapshot_name', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
});

export const snapshotNameRelations = relations(snapshotName, ({ many }) => ({
  snapshots: many(snapshot),
}));

export const dataSetDescription = pgTable('data_set_description', {
  id: serial('id').primaryKey(),
  description: varchar('description', { length: 255 }).notNull().unique(),
});

export const dataSetDescriptionRelations = relations(dataSetDescription, ({ many }) => ({
  collectionTemplates: many(collectionTemplate),
}));

export const snapshotDataType = pgTable('snapshot_data_type', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  description: text('description'),
});

export const snapshotDataTypeRelations = relations(snapshotDataType, ({ many }) => ({
  snapshots: many(snapshotDataTypeLink),
}));

export const collection = pgTable('collection', {
  id: serial('id').primaryKey(),
  collectionWindowId: integer('collection_window_id').notNull().references(() => collectionWindow.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  comments: text('comments'),
  isOpenThrough: boolean('is_open_through').default(false).notNull(),
  openDate: date('open_date').notNull(),
  closeDate: date('close_date').notNull(),
  finalCloseDate: date('final_close_date').notNull(),
  pdeReviewStartDate: date('pde_review_start_date'),
  pdeReviewEndDate: date('pde_review_end_date'),
  pdeReviewComment: text('pde_review_comment'),
  correctionStartDate: date('correction_start_date'),
  correctionEndDate: date('correction_end_date'),
  correctionComment: text('correction_comment'),
  acsDueDate: date('acs_due_date'),
  acsDueComment: text('acs_due_comment'),
  isSnapshot: boolean('is_snapshot').default(false).notNull(),
}, (table) => ({
  uqCollection: unique().on(table.collectionWindowId, table.name),
  collectionWindowIdIdx: index('collection_window_id_idx').on(table.collectionWindowId),
}));

export const collectionRelations = relations(collection, ({ one, many }) => ({
  collectionWindow: one(collectionWindow, {
    fields: [collection.collectionWindowId],
    references: [collectionWindow.id],
  }),
  collectionTemplates: many(collectionTemplate),
  snapshotCollections: many(snapshotCollection),
}));

export const collectionTemplate = pgTable('collection_template', {
  id: serial('id').primaryKey(),
  collectionId: integer('collection_id').notNull().references(() => collection.id, { onDelete: 'cascade' }),
  templateId: integer('template_id').notNull().references(() => template.id, { onDelete: 'cascade' }),
  dataSetDescriptionId: integer('data_set_description_id').notNull().references(() => dataSetDescription.id, { onDelete: 'cascade' }),
  requiredUpdates: varchar('required_updates', { enum: ['Required', 'Updates'] }).notNull(),
  requirementDescription: text('requirement_description'),
  sortOrder: integer('sort_order').notNull(),
}, (table) => ({
  uqCollectionTemplate: unique().on(table.collectionId, table.templateId),
  uqCollectionTemplateSort: unique().on(table.collectionId, table.dataSetDescriptionId, table.sortOrder),
  collectionIdTemplateIdIdx: index('collection_id_template_id_idx').on(table.collectionId, table.templateId),
  collectionIdDataSetDescriptionIdSortOrderIdx: index('collection_id_data_set_description_id_sort_order_idx').on(table.collectionId, table.dataSetDescriptionId, table.sortOrder),
}));

export const collectionTemplateRelations = relations(collectionTemplate, ({ one }) => ({
  collection: one(collection, {
    fields: [collectionTemplate.collectionId],
    references: [collection.id],
  }),
  template: one(template, {
    fields: [collectionTemplate.templateId],
    references: [template.id],
  }),
  dataSetDescription: one(dataSetDescription, {
    fields: [collectionTemplate.dataSetDescriptionId],
    references: [dataSetDescription.id],
  }),
}));

export const snapshot = pgTable('snapshot', {
  id: serial('id').primaryKey(),
  snapshotNameId: integer('snapshot_name_id').notNull().references(() => snapshotName.id, { onDelete: 'cascade' }),
  schoolYearId: integer('school_year_id').notNull().references(() => schoolYear.id, { onDelete: 'cascade' }),
  requiredUpdates: varchar('required_updates', { enum: ['Required', 'Updates'] }).notNull(),
  comments: text('comments'),
  pimsInternalSnapshotDate: date('pims_internal_snapshot_date').notNull(),
  runDate: date('run_date').notNull(),
  previousYearSnapshotDate: date('previous_year_snapshot_date').notNull(),
  acsDueDate: date('acs_due_date'),
  updateDeadline: varchar('update_deadline', { length: 100 }),
}, (table) => ({
  snapshotNameIdIdx: index('snapshot_name_id_idx').on(table.snapshotNameId),
  schoolYearIdIdx: index('school_year_id_idx').on(table.schoolYearId),
}));

export const snapshotRelations = relations(snapshot, ({ one, many }) => ({
  snapshotName: one(snapshotName, {
    fields: [snapshot.snapshotNameId],
    references: [snapshotName.id],
  }),
  schoolYear: one(schoolYear, {
    fields: [snapshot.schoolYearId],
    references: [schoolYear.id],
  }),
  snapshotDataTypes: many(snapshotDataTypeLink),
  snapshotCollections: many(snapshotCollection),
}));

export const snapshotDataTypeLink = pgTable('snapshot_data_type_link', {
  snapshotId: integer('snapshot_id').notNull().references(() => snapshot.id, { onDelete: 'cascade' }),
  snapshotDataTypeId: integer('snapshot_data_type_id').notNull().references(() => snapshotDataType.id, { onDelete: 'cascade' }),
}, (table) => ({
  pk: unique().on(table.snapshotId, table.snapshotDataTypeId),
  snapshotIdIdx: index('snapshot_id_idx').on(table.snapshotId),
  snapshotDataTypeIdIdx: index('snapshot_data_type_id_idx').on(table.snapshotDataTypeId),
}));

export const snapshotDataTypeLinkRelations = relations(snapshotDataTypeLink, ({ one }) => ({
  snapshot: one(snapshot, {
    fields: [snapshotDataTypeLink.snapshotId],
    references: [snapshot.id],
  }),
  snapshotDataType: one(snapshotDataType, {
    fields: [snapshotDataTypeLink.snapshotDataTypeId],
    references: [snapshotDataType.id],
  }),
}));

export const snapshotCollection = pgTable('snapshot_collection', {
  snapshotId: integer('snapshot_id').notNull().references(() => snapshot.id, { onDelete: 'cascade' }),
  collectionId: integer('collection_id').notNull().references(() => collection.id, { onDelete: 'cascade' }),
  collectionSpecificComment: text('collection_specific_comment'),
}, (table) => ({
  pk: unique().on(table.snapshotId, table.collectionId),
  snapshotIdIdx: index('snapshot_id_idx').on(table.snapshotId),
  collectionIdIdx: index('collection_id_idx').on(table.collectionId),
}));

export const snapshotCollectionRelations = relations(snapshotCollection, ({ one }) => ({
  snapshot: one(snapshot, {
    fields: [snapshotCollection.snapshotId],
    references: [snapshot.id],
  }),
  collection: one(collection, {
    fields: [snapshotCollection.collectionId],
    references: [collection.id],
  }),
}));