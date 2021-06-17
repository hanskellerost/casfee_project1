/* global Handlebars */
// import moment from 'moment';
import { noteService } from '../services/note-service.js';

export default class NoteController {
    constructor() {
        this.notes = [];

        this.changeStyleBtn = document.querySelector('#styles');
        this.createNoteBtn = document.querySelector('#createNote');

        this.finishdateBtn = document.querySelector('#finishDate');
        this.createddateBtn = document.querySelector('#createdDate');
        this.importanceBtn = document.querySelector('#importance');

        this.filterBtn = document.querySelector('#showFinished');

        this.noteTemplate = Handlebars.compile(document.querySelector('#entry-template').innerHTML);
        this.notesContent = document.querySelector('#notesContent');

        this.orderBy = this.finishdateBtn.dataset.orderby;
        this.filterBy = null;
    }

    initButtons() {
        this.createNoteBtn.addEventListener('click', () => {
            window.location.href = 'note.html?note=';
        });

        this.finishdateBtn.addEventListener('click', this.orderEvent.bind(this));
        this.createddateBtn.addEventListener('click', this.orderEvent.bind(this));
        this.importanceBtn.addEventListener('click', this.orderEvent.bind(this));

        this.filterBtn.addEventListener('change', this.filteringEvent.bind(this));
    }

    initEditButton() {
        const editButtons = document.querySelectorAll('.editNoteBtn');
        editButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                window.location.href = `note.html?note=${btn.dataset.noteid}`;
            });
        })
    }

    async initDeleteButton() {
        const deleteButtons = document.querySelectorAll('.deleteNoteBtn');
        deleteButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                try {
                    const deleteResult = noteService.deleteNote(btn.dataset.noteid);
                    if (deleteResult) this.initializeTemplate();
                } catch (ex) {
                    console.error(ex);
                }
            });
        });
    }

    initStyleSelect() {
        this.changeStyleBtn.addEventListener('change', () => {
            document.body.classList.toggle('dark-theme');
        });
    }

    initEventHandlers() {
        this.initStyleSelect();
        this.initButtons();

        this.initializeTemplate();
    }

    initializeTemplate() {
        this.notesContent.textContent = '';
        for (const n of this.notes) {
            const html = this.noteTemplate(n);
            const divElement = document.createElement('li');
            divElement.setAttribute('id', 'liContent');
            divElement.innerHTML = html;
            this.notesContent.appendChild(divElement);
        }

        this.initEditButton();
        this.initDeleteButton();
    }

    getNotes() {
        this.notes = noteService.readNotes(this.orderBy, this.filterBy);
        this.initializeTemplate();
    }

    filteringEvent(ev) {
        this.filterBy = ev.target.checked ? ev.target.dataset.filterby : null;
        this.getNotes();
    }

    orderEvent(ev) {
        this.orderBy = ev.target.dataset.orderby;
        this.getNotes();
    }

    async initialize() {
        this.notes = await noteService.readNotes(this.orderBy);
        this.initEventHandlers();
    }
}

new NoteController().initialize();
