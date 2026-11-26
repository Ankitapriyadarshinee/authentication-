const {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
} = require("drizzle-orm/pg-core");

const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 150 }).notNull().unique(),
  phone: varchar("phone", { length: 15 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

const loginLogs = pgTable("login_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  email: varchar("email", { length: 150 }),
  loggedInAt: timestamp("logged_in_at", { withTimezone: true }).defaultNow(),
});

module.exports = { users, loginLogs };