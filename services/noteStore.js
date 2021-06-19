import Datastore from 'nedb';
import Note from './note.js';

export class NoteStore {
    constructor(db) {
        this.db = db || new Datastore({ filename: './data/note.db', autoload: true });
    }

    async all(queryparams, callback) {
        // return await this.db.cfind({orderedBy : currentUser}).sort({ orderDate: -1 }).exec();
        //this.db.find({orderedBy: queryparams.orderedBy}).exec((err, docs) => {
        //this.db.find({state: { $ne: 'DELETED' }, endDate: { $ne: '' }}).sort({`${queryparams.orderedBy}:-1` }).exec((err, docs) => {
            this.db.find({state: { $ne: 'DELETED' }, endDate: { $ne: '' }}).exec((err, docs) => {
            if (callback) {
                callback(err, docs);
            }
        });
    }

    create(note, callback) {
        //const newNote = new Note(note.status, note.subject, note.description, note.importance, note.startDate, note.finishDate);
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
        console.log(note);
        console.log(typeof(note));
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
