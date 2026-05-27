import { pgTable, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    fullName: varchar("full_name", { length: 100 }).notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),

    passwordHash: text("password_hash"),
    provider: varchar("provider", { length: 20 }).notNull(),
    providerId: varchar("provider_id", { length: 255 }).notNull(),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  },
  (table) => [
    uniqueIndex("users_provider_account_unique").on(table.provider, table.providerId),
  ],
);
