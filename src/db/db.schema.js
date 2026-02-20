import { sql } from "drizzle-orm";
import { unique } from "drizzle-orm/gel-core";
import { check, integer, pgEnum, pgTable, primaryKey, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 255 }).unique().notNull(),
  email: varchar({ length: 255 }).unique().notNull(),
  hashPass: varchar().notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
});

export const statusEnum = pgEnum("status", ["PLAYING", "COMPLETED", "DROPPED", "WANT", "ONHOLD"])

export const gamesTable = pgTable("games", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  genre: varchar({ length: 255 }),
  platform: varchar({ length: 255 }),
  releaseYear: integer(),
  coverURL: varchar().default('https://i.pinimg.com/736x/19/a3/3c/19a33c4ef6b5edf300344a2349ddbd57.jpg'),
  status: statusEnum("status").default("WANT").notNull(),
  addedAt: timestamp("addedAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),

  userId: integer().notNull().references(() => usersTable.id),
});

export const reviewsTable = pgTable("reviews", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  rating: integer(),
  review_text: varchar(),
  createdAt: timestamp("createdAt").defaultNow(),
  gameId: integer().notNull().references(() => gamesTable.id),
  userId : integer().notNull().references(() => usersTable.id)
},
  (table) => ({
    ratingRange: check(
      "rating_range",
      sql`${table.rating} >= 1 AND ${table.rating} <= 10`
    ),

    uniqueGameReview: unique().on(table.userId, table.gameId),
  })
)
