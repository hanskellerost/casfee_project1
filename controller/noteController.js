/* eslint-disable class-methods-use-this */
import {noteStore} from '../services/noteStore.js';

export class NoteController {
    async readNotes(req, res) {
        noteStore.all((err, notes) => {
            if (notes) {
                return res.send(notes);
            }
            return res.send(err);
        });
    }

    async readNote(req, res) {
        noteStore.read(req.params.id, (err, note) => {
            if (note) {
                return res.send(note);
            }
            return res.send(err);
        });
    }

    async createNote(req, res) {
        noteStore.create(req.body, (err, note) => {
            if (note) {
                return res.send(note);
            }
            return res.send(err);
        });
    }

    async deleteNote(req, res) {
        noteStore.delete(req.params.id, (err, note) => {
            if (note) {
                return res.send(note);
            }
            return res.send(err);
        });
    }
}

export const noteController = new NoteController();
