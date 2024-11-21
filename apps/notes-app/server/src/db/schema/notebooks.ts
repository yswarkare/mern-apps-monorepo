import { pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';
import { timestamps } from './columns.helpers';
import { relations } from 'drizzle-orm';
import { users } from './users';
import { tagsToNotebook } from './tagsToNotebook';
import { notesToNotebook } from './notesToNotebook';

export const notebooks = pgTable('notebooks', {
	id: uuid().primaryKey().notNull().unique(),
	title: varchar({ length: 255 }).notNull(),
	userId: uuid()
		.references(() => users.id, { onDelete: 'cascade' })
		.notNull(),
	...timestamps,
});

export const notebookRelations = relations(notebooks, ({ one, many }) => ({
	user: one(users, {
		fields: [notebooks.userId],
		references: [users.id],
	}),
	tagsToNotebook: many(tagsToNotebook),
	notesToNotebook: many(notesToNotebook),
}));
