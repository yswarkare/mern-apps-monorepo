import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { notebooks } from './notebooks';
import { tags } from './tags';

export const tagsToNotebook = pgTable(
	'tags_to_notebook',
	{
		notebookId: uuid()
			.notNull()
			.references(() => notebooks.id),
		tagId: uuid()
			.notNull()
			.references(() => tags.id),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.notebookId, t.tagId] }),
	})
);

export const TagsToNotebookRelations = relations(tagsToNotebook, ({ one }) => ({
	tag: one(tags, {
		fields: [tagsToNotebook.tagId],
		references: [tags.id],
	}),
	notebook: one(notebooks, {
		fields: [tagsToNotebook.notebookId],
		references: [notebooks.id],
	}),
}));
