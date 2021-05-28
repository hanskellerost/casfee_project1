import Note from './note.js';

export class NoteService {
    constructor() {
        this.notes = [];
    }

    initializeNotes() {
        this.notes = [];
        const note1 = new Note(1, 'finished', 'CAS FEE Selbststudium / Projekt Aufgabe erledigen', 'HTML für die note App erstellen.<br>CSS erstellen für die note App[...]', 3, '2021-05-21T08:00:00', null);
        const note2 = new Note(2, 'started', 'CAS FEE Projekt 1', 'Selbständige Umsetzung Projekt 1 bis 27.06.2021', 1, '2021-05-23T08:00:00', '2021-05-26T08:00:00');
        const note3 = new Note(3, 'started', 'CAS FEE Projekt 2', 'Teamarbeit Projekt 2 bis XX.XX.202X', 6, '2021-08-01T08:00:00', null);
        const note4 = new Note(4, 'finished', 'CAS FEE Vorprojekt', 'Selbständiges Vorprojekt bis 20.04.2021', 6, '2021-03-01T08:00:00', '2021-04-20T08:00:00');
        this.notes.push(note1);
        this.notes.push(note2);
        this.notes.push(note3);
        this.notes.push(note4);
    }

    readNotes(orderBy, filterBy) {
        this.initializeNotes();

        if (filterBy) {
            if (filterBy !== 'finished') {
                this.notes = this.notes.filter((a) => a.status !== 'finished');
            }
        } else {
            this.notes = this.notes.filter((a) => a.status !== 'finished');
        }

        if (orderBy) {
            this.notes.sort((a, b) => {
                if (orderBy === 'importance') {
                    return a.importance - b.importance;
                }
                if (orderBy === 'createdDate') {
                    const comp1 = a.startDate !== null ? new Date(a.startDate) : new Date('2099-12-31T12:00:00');
                    const comp2 = b.startDate !== null ? new Date(b.startDate) : new Date('2099-12-31T12:00:00');
                    return comp1 - comp2;
                }
                const comp1 = a.finishDate !== null ? new Date(a.finishDate) : new Date('2099-12-31T12:00:00');
                const comp2 = b.finishDate !== null ? new Date(b.finishDate) : new Date('2099-12-31T12:00:00');
                return comp1 - comp2;
            });
        }
    }

    readNote(id) {
        return this.notes.filter((note) => note.id === id);
    }

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
