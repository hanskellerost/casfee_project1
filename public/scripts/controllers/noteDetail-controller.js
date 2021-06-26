/* global Handlebars */
import { noteService } from '../services/note-service.js';
import Note from '../services/note.js';

export default class NoteDetailController {
    constructor() {
        this.noteTemplate = Handlebars.compile(document.querySelector('#entry-template').innerHTML);
        this.noteContent = document.querySelector('#noteContent');
        this.importanceIcons = [];
        this.importanceActive = 'importance fas fa-bolt checked';
        this.importanceInactive = 'importance fas fa-bolt';
    }

    initEventHandlers() {
        this.cancelBtn = document.querySelector('#cancelBtn');
        this.cancelBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });

        this.saveNote = document.querySelector('#saveBtn');
        this.saveNote.addEventListener('click', () => {
            this.createOrUpdateNote();
            window.location.href = 'index.html';
        });
    }

    initImportance() {
        this.importanceIcons = [...document.getElementsByClassName('importance')];

        this.importanceIcons.map((im) => {
            im.onclick = () => {
                const clickedIndex = this.importanceIcons.indexOf(im);

                this.importanceIcons.map((imp, i) => {
                    if (i <= clickedIndex) {
                        imp.className = this.importanceActive;
                    } else {
                        imp.className = this.importanceInactive;
                    }
                    return true;
                });
            };
            return true;
        });
    }

    setImportance(imp) {
        this.importanceIcons.filter((im, i) => i < imp).map((im) => {
            im.className = this.importanceActive;
            return true;
        });
    }

    getImportance() {
        return this.importanceIcons.filter((im) => im.className === this.importanceActive).length;
    }

    createOrUpdateNote() {
        const noteForm = document.querySelector('#noteForm');
        const noteFormData = new FormData(noteForm);

        this.note.subject = noteFormData.get('title');
        this.note.description = noteFormData.get('description');
        this.note.importance = this.getImportance();
        this.note.startDate = !this.note.startDate || this.note.startDate === '' ? NoteDetailController.formatDateLeadingZero(new Date(Date.now())) : this.note.startDate;
        this.note.endDate = noteFormData.get('endDate');

        // eslint-disable-next-line no-underscore-dangle
        if (this.note && this.note._id) {
            noteService.updateNote(this.note);
        } else {
            noteService.createNote(this.note);
        }
    }

    async initialize() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        if (urlParams.has('note') && urlParams.get('note')) {
            this.note = await noteService.readNote(urlParams.get('note'));
            if (this.note) {
                this.initNote();
            } else {
                window.location.href = 'index.html';
            }
        } else if (urlParams.has('note') && urlParams.get('note') === '') {
            this.initNote();
            this.note = new Note();
        } else {
            window.location.href = 'index.html';
        }
    }

    static formatDateLeadingZero(date) {
        const monthLeadingZero = ('0'.concat((date.getMonth() + 1))).slice(-2);
        const dayLeadingZero = ('0'.concat(date.getDate())).slice(-2);
        return `${date.getFullYear()}-${monthLeadingZero}-${dayLeadingZero}`;
    }

    initNote() {
        if (this.note?.endDate) {
            this.note.endDate = NoteDetailController.formatDateLeadingZero(new Date(this.note.endDate));
        }

        this.noteContent.innerHTML = this.noteTemplate(this.note);
        this.initEventHandlers();

        this.initImportance();
        if (this.note?.importance > -1) {
            this.setImportance(this.note.importance);
        }
    }
}

new NoteDetailController().initialize();
