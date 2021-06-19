/* eslint-disable class-methods-use-this */

export class NoteService {
    constructor() {
        this.notes = [];
        this.customHeaders = new Headers({'Content-Type': 'application/json'});
    }

    async readNotes(orderBy, filterBy) {
        return fetch(`/notes/?orderBy=${orderBy}&filterBy=${filterBy}`).then((response) => response.json());
    }

    async readNote(id) {
        return fetch(`/notes/${id}`).then((response) => response.json());
    }

    async createNote(note) {
        return fetch('/notes/', {method: 'POST', headers: this.customHeaders, body: JSON.stringify(note)}).then((response) => response.json());
    }

    async updateNote(note) {
        // eslint-disable-next-line no-underscore-dangle
        return fetch(`/notes/${note._id}`, {method: 'PUT', headers: this.customHeaders, body: JSON.stringify(note)}).then((response) => response.json());
    }

    async deleteNote(id) {
        return fetch(`/notes/${id}`, {method: 'DELETE'}).then((response) => response.json());
    }
}

export const noteService = new NoteService();
