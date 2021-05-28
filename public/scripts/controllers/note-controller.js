/* global Handlebars */
// import moment from 'moment';
import { noteService } from '../services/note-service.js';

export default class NoteController {
    constructor() {
        this.changeStyleBtn = document.querySelector('#styles');
        this.createNoteBtn = document.querySelector('#createNote');

        this.finishdateBtn = document.querySelector('#finishDate');
        this.createddateBtn = document.querySelector('#createdDate');
        this.importanceBtn = document.querySelector('#importance');

        this.filterBtn = document.querySelector('#showFinished');

        this.noteTemplate = Handlebars.compile(document.querySelector('#entry-template').innerHTML);
        this.notesContent = document.querySelector('#notesContent');

        // const DateFormats = {
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
            this.noteService.createNote();
        });

        this.finishdateBtn.addEventListener('click', this.orderEvent.bind(this));
        this.createddateBtn.addEventListener('click', this.orderEvent.bind(this));
        this.importanceBtn.addEventListener('click', this.orderEvent.bind(this));

        this.filterBtn.addEventListener('change', this.filteringEvent.bind(this));
    }

    initStyleSelect() {
        this.changeStyleBtn.addEventListener('change', () => {
            document.body.classList.toggle('dark-theme');
        });
    }

    initEventHandlers() {
        this.initButtons();
        this.initStyleSelect();

        document.addEventListener('DOMContentLoaded', () => {
            this.initializeTemplate();
        });
    }

    initializeTemplate() {
        this.notesContent.textContent = '';
        for (const n of noteService.notes) {
            let html = this.noteTemplate(n);
            const divElement = document.createElement('li');
            divElement.setAttribute('id', 'liContent');
            divElement.innerHTML = html;
            this.notesContent.appendChild(divElement);
        }
    }

    getEvents() {
        noteService.readNotes(this.orderBy, this.filterBy);
        this.initializeTemplate();
    }

    filteringEvent(ev) {
        this.filterBy = ev.target.checked ? ev.target.dataset.filterby : null;
        this.getEvents();
    }

    orderEvent(ev) {
        this.orderBy = ev.target.dataset.orderby;
        this.getEvents();
    }

    initialize() {
        this.initEventHandlers();
        noteService.readNotes(this.orderBy);
    }
}

new NoteController().initialize();
