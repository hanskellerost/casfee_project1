/* eslint-disable class-methods-use-this */

export class NoteService {
    constructor() {
        this.notes = [];
    }

    async readNotes(orderBy, filterBy) {
        return fetch('/notes/').then((response) => response.json());
    }

    async readNote(id) {
        if (parseInt(id, 10)) {
            return this.notes.filter((note) => note.id === parseInt(id, 10))[0];
        }
        return null;
    }

    async createNote(note) {
        return fetch('/notes/', {method: 'POST', body: JSON.stringify(note)}).then((response) => response.json());
    }

    async updateNote(note) {
        if (note) {
            const objIndex = this.notes.findIndex((obj) => obj.id === note.id);
            this.notes[objIndex] = note;
        }
    }

    async deleteNote(id) {
        return fetch(`/notes/${id}`, {method: 'DELETE'}).then((response) => response.json());
    }
}

export const noteService = new NoteService();
