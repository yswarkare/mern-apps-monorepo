import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { notebooks } from './notebooks';
import { notes } from './notes';

export const notesToNotebook = pgTable(
	'notes_to_notebook',
	{
		notebookId: uuid()
			.notNull()
			.references(() => notebooks.id),
		noteId: uuid()
			.notNull()
			.references(() => notes.id),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.notebookId, t.noteId] }),
	})
);

export const notesToNotebookRelations = relations(notesToNotebook, ({ one }) => ({
	note: one(notes, {
		fields: [notesToNotebook.noteId],
		references: [notes.id],
	}),
	notebook: one(notebooks, {
		fields: [notesToNotebook.notebookId],
		references: [notebooks.id],
	}),
}));
