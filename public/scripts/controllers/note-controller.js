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

        // const DateFormatcreateNotes = {
        //     short: 'DD MMMM - YYYY',
        //     long: 'dddd DD.MM.YYYY HH:mm',
        // };

        // Handlebars.registerHelper('formatDate', (datetime, format) => {
        //     if (moment) {
        //         // eslint-disable-next-line no-param-reassign
        //         format = DateFormats[format] || format;
        //         return moment(datetime).format(format);
        //     }
        //     return datetime;
        // });
        this.orderBy = this.finishdateBtn.dataset.orderby;
        this.filterBy = null;
    }

    initButtons() {
        this.createNoteBtn.addEventListener('click', () => {
            window.location.href = `note.html?note=`;
        });

        this.finishdateBtn.addEventListener('click', this.orderEvent.bind(this));
        this.createddateBtn.addEventListener('click', this.orderEvent.bind(this));
        this.importanceBtn.addEventListener('click', this.orderEvent.bind(this));

        this.filterBtn.addEventListener('change', this.filteringEvent.bind(this));
    }

    initEditButtons() {
        const editButtons = document.querySelectorAll('.editNoteBtn');
        editButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                window.location.href = `note.html?note=${btn.dataset.noteid}`;
            });
        })
    }

    initStyleSelect() {
        this.changeStyleBtn.addEventListener('change', () => {
            document.body.classList.toggle('dark-theme');
        });
    }

    initEventHandlers() {
        this.initStyleSelect();
        this.initButtons();

        document.addEventListener('DOMContentLoaded', () => {
            this.initializeTemplate();
        });
    }

    initializeTemplate() {
        this.notesContent.textContent = '';
        for (const n of this.notes) {
            let html = this.noteTemplate(n);
            const divElement = document.createElement('li');
            divElement.setAttribute('id', 'liContent');
            divElement.innerHTML = html;
            this.notesContent.appendChild(divElement);
        }

        this.initEditButtons();
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

    initialize() {
        this.notes = noteService.readNotes(this.orderBy);
        this.initEventHandlers();
    }
}

new NoteController().initialize();
