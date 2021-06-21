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

    create(note, callback) {
        const newNote = new Note(note);
        this.db.insert(newNote, (err, newDoc) => {
            if (callback) {
                callback(err, newDoc);
            }
        });
    }

    read(id, callback) {
        this.db.findOne({ _id: id }, (err, doc) => {
            callback(err, doc);
        });
    }

    update(note, callback) {
        // eslint-disable-next-line no-underscore-dangle
        note.endDate = new Date(note.endDate);
        this.db.update({_id: note._id}, note, {}, (err, newDoc) => {
            if (callback) {
                callback(err, newDoc);
            }
        });
    }

    delete(id, callback) {
        this.db.update({ _id: id }, { $set: { state: 'DELETED' } }, { returnUpdatedDocs: true }, (err, numDocs, doc) => {
            callback(err, doc);
        });
    }
}
export const noteStore = new NoteStore();
