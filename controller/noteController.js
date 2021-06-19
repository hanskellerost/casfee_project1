/* eslint-disable class-methods-use-this */
import { noteStore } from '../services/noteStore.js';

export class NoteController {
    async readNotes(req, res) {
        noteStore.all(req.query, (err, notes) => {
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
                return res.status(201).send(note);
            }
            return res.send(err);
        });
    }

    async updateNote(req, res) {
        noteStore.update(req.body, (err, note) => {
            if (err) {
                console.log(err);
                res.status(500).send();
            }

            if (note === 1) {
                res.status(200).send();
            }
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
