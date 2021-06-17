import Datastore from 'nedb';
import Note from './note.js';

export class NoteStore {
    constructor(db) {
        this.db = db || new Datastore({ filename: './data/note.db', autoload: true });
    }

    async all(callback) {
        // return await this.db.cfind({orderedBy : currentUser}).sort({ orderDate: -1 }).exec();
        this.db.find({}).exec((err, docs) => {
            if (callback) {
                callback(err, docs);
            }
        });
    }

    create(note, callback) {
        const newNote = new Note(note.id, note.status, note.subject, note.description, note.importance, note.startDate, note.finishDate);
        this.db.insert(newNote, (err, newDoc) => {
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

    read(id, callback) {
        this.db.findOne({ _id: id }, (err, doc) => {
            callback(err, doc);
        });
    }
}
export const noteStore = new NoteStore();
