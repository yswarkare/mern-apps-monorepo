import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { notebooks } from './notebooks';
import { tags } from './tags';
import { notes } from './notes';

export const tagsToNotes = pgTable(
	'tags_to_notes',
	{
		noteId: uuid()
			.notNull()
			.references(() => notebooks.id),
		tagId: uuid()
			.notNull()
			.references(() => tags.id),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.noteId, t.tagId] }),
	})
);

export const TagsToNotebookRelations = relations(tagsToNotes, ({ one }) => ({
	tag: one(tags, {
		fields: [tagsToNotes.tagId],
		references: [tags.id],
	}),
	note: one(notes, {
		fields: [tagsToNotes.noteId],
		references: [notes.id],
	}),
}));
