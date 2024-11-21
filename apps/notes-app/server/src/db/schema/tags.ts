import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";
import { relations } from "drizzle-orm";
import { tagsToNotebook } from "./tagsToNotebook";
import { tagsToNotes } from "./tagsToNotes";

export const tags = pgTable("tags", {
  id: uuid().primaryKey().notNull().unique(),
  name: varchar({ length: 150 }).notNull(),
  ...timestamps
});

export const tagRelations = relations(tags, ({ many }) => ({
  tagsToNotebook: many(tagsToNotebook),
  tagsToNotes: many(tagsToNotes),
}));

