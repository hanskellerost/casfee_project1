/* global Handlebars */
// import moment from 'moment';
import { noteService } from '../services/note-service.js';
import Note from '../services/note.js';

export default class NoteDetailController {
    constructor() {
        this.noteTemplate = Handlebars.compile(document.querySelector('#entry-template').innerHTML);
        this.noteContent = document.querySelector('#noteContent');
    }

    initEventHandlers() {
        this.cancelBtn = document.querySelector('#cancelBtn');
        this.cancelBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });

        this.saveNote = document.querySelector('#saveBtn');
        this.saveNote.addEventListener('click', () => {
            const note = this.createNote();
            //window.location.href = 'index.html';
        });
    }

    createNote() {
        const noteForm = document.querySelector('#noteForm');
        const noteFormData = new FormData(noteForm);

        this.note.id = Math.max(...noteService.notes.map((note) => note.id)) + 1;
        this.note.subject = noteFormData.get('title');
        this.note.description = noteFormData.get('description');
        this.note.importance = noteFormData.get('importance');
        this.note.endDate = noteFormData.get('endDate');
        noteService.createNote(this.note);
    }

    initialize() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        if (urlParams.has('note') && parseInt(urlParams.get('note'), 10)) {
            this.note = noteService.readNote(parseInt(urlParams.get('note'), 10));
            if (this.note) {
                this.noteContent.innerHTML = this.noteTemplate(this.note);
                this.initEventHandlers();
            } else {
                window.location.href = 'index.html';
            }
        } else if (urlParams.has('note') && urlParams.get('note') === '') {
            this.note = new Note();
            this.noteContent.innerHTML = this.noteTemplate(this.note);
            this.initEventHandlers();
        } else {
            window.location.href = 'index.html';
        }
    }
}

new NoteDetailController().initialize();
