import Datastore from 'nedb';
import Note from './note.js';

export class NoteStore {
    constructor(db) {
        this.db = db || new Datastore({ filename: './data/note.db', autoload: true });
    }

    async all(queryparams, callback) {
        const searchterm = {};
        if (queryparams?.orderBy === 'importance') {
            searchterm[queryparams?.orderBy] = -1;
        } else if (queryparams?.orderBy) {
            searchterm[queryparams?.orderBy] = 1;
        }

        this.db.find({state: { $nin: ['DELETED', queryparams.filterBy]}}).sort(searchterm).exec((err, docs) => {
            if (callback) {
                callback(err, docs);
            }
        });
    }

    async create(note, callback) {
        const newNote = new Note(note);
        this.db.insert(newNote, (err, newDoc) => {
            if (callback) {
                callback(err, newDoc);
            }
        });
    }

    async read(id, callback) {
        this.db.findOne({ _id: id }, (err, doc) => {
            callback(err, doc);
        });
    }

    async update(note, callback) {
        note.endDate = new Date(note.endDate);
        // eslint-disable-next-line no-underscore-dangle
        this.db.update({_id: note._id}, note, {}, (err, newDoc) => {
            if (callback) {
                callback(err, newDoc);
            }
        });
    }

    async delete(id, callback) {
        this.db.update({ _id: id }, { $set: { state: 'DELETED' } }, { returnUpdatedDocs: true }, (err, numDocs, doc) => {
            callback(err, doc);
        });
    }
}
export const noteStore = new NoteStore();
