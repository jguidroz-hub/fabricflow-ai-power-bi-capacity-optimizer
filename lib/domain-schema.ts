import { pgTable, text, timestamp, boolean, integer, jsonb, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users } from './schema';

// Per-user preferences and settings
export const userSettings = pgTable('user_settings', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  timezone: text('timezone').default('UTC'),
  emailNotifications: boolean('email_notifications').default(true),
  weeklyDigest: boolean('weekly_digest').default(true),
  createdAt: timestamp('created_at').notNull().default(sql`now()`),
  updatedAt: timestamp('updated_at').notNull().default(sql`now()`),
});

// Tracks important state changes for debugging and compliance
export const auditLog = pgTable('audit_log', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
  action: text('action').notNull(),
  entityType: text('entity_type').notNull(),
  entityId: text('entity_id'),
  metadata: jsonb('metadata'),
  ipAddress: text('ip_address'),
  createdAt: timestamp('created_at').notNull().default(sql`now()`),
});

// Records of Power BI/Fabric capacity metrics at specific intervals
export const capacitySnapshots = pgTable('capacity_snapshots', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  tenantId: text('tenant_id').notNull(),
  totalCpuPercent: text('total_cpu_percent').notNull(),
  memoryUsageGb: text('memory_usage_gb').notNull(),
  queryPoolActiveJobs: integer('query_pool_active_jobs').notNull(),
  potentialThrottlingRisk: boolean('potential_throttling_risk'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

// AI-generated recommendations for capacity optimization
export const optimizationRecommendations = pgTable('optimization_recommendations', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  snapshotId: text('snapshot_id').references(() => capacitySnapshots.id, { onDelete: 'cascade' }),
  recommendationType: text('recommendation_type').notNull(),
  severity: text('severity').notNull(),
  estimatedSavingsPercent: text('estimated_savings_percent').notNull(),
  detailedDescription: text('detailed_description').notNull(),
  implemented: boolean('implemented'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});
