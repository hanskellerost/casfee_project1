import Note from './note.js';

export class NoteService {
    constructor() {
        this.notes = [];
    }

    readNotes() {
        const note1 = new Note('finished', 'CAS FEE Selbststudium / Projekt Aufgabe erledigen', 'HTML für die note App erstellen.<br>CSS erstellen für die note App[...]', 3, '2021-05-21', '');
        const note2 = new Note('started', 'CAS FEE Projekt 1', 'Selbständige Umsetzung Projekt 1 bis 27.06.2021', 1, '2021-05-23', '2021-05-26');
        const note3 = new Note('started', 'CAS FEE Projekt 2', 'Teamarbeit Projekt 2 bis XX.XX.202X', 6, '2021-08-01', '');
        this.notes.push(note1);
        this.notes.push(note2);
        this.notes.push(note3);
    }

    // readNote() {
    //     console.log('readNote');
    // }

    // createNote() {
    //     console.log('createNote');
    // }

    // updateNote() {
    //     console.log('updateNote');
    // }

    // deleteNote() {
    //     console.log('deleteNote');
    // }
}

export const noteService = new NoteService();
