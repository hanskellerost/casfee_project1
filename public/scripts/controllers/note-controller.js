/* global Handlebars */
import { noteService } from '../services/note-service.js';

export default class NoteController {
    constructor() {
        this.notes = [];

        this.changeStyleBtn = document.querySelector('#styles');
        this.createNoteBtn = document.querySelector('#createNote');

        this.endDateBtn = document.querySelector('#endDate');
        this.startDateBtn = document.querySelector('#startDate');
        this.importanceBtn = document.querySelector('#importance');

        this.filterBtn = document.querySelector('#showFinished');

        this.noteTemplate = Handlebars.compile(document.querySelector('#entry-template').innerHTML);
        this.notesContent = document.querySelector('#notesContent');

        this.orderBy = this.endDateBtn.dataset.orderby;
        this.filterBy = 'finished';
    }

    initButtons() {
        this.createNoteBtn.addEventListener('click', () => {
            window.location.href = 'note.html?note=';
        });

        this.endDateBtn.addEventListener('click', this.orderEvent.bind(this));
        this.startDateBtn.addEventListener('click', this.orderEvent.bind(this));
        this.importanceBtn.addEventListener('click', this.orderEvent.bind(this));

        this.filterBtn.addEventListener('change', this.filteringEvent.bind(this));
    }

    initEditButton() {
        const editButtons = document.querySelectorAll('.editNoteBtn');

        editButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                window.location.href = `note.html?note=${btn.dataset.noteid}`;
            });
        });
    }

    async initDeleteButton() {
        const deleteButtons = document.querySelectorAll('.deleteNoteBtn');
        deleteButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                noteService.deleteNote(btn.dataset.noteid).then(() => {
                    this.initialize();
                });
            });
        });
    }

    initStateCheckbox() {
        const stateCheckboxes = document.querySelectorAll('.stateCheckbox');
        stateCheckboxes.forEach((chb) => {
            chb.addEventListener('change', async () => {
                const note = this.notes.find((n) => n._id === chb.dataset.noteid);

                if (note) {
                    note.state = chb.checked === true ? 'finished' : null;
                    note.endDate = chb.checked === true ? Date.now() : null;
                    await noteService.updateNote(note);
                    this.initialize();
                } else {
                    throw new Error('Cloud not update the note. Please refresh the page.');
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
    }

    initializeTemplate() {
        this.notesContent.textContent = '';
        this.notes.forEach((note) => {
            const html = this.noteTemplate(note);
            const divElement = document.createElement('li');
            divElement.setAttribute('id', 'liContent');
            divElement.innerHTML = html;
            this.notesContent.appendChild(divElement);
        });

        this.initEditButton();
        this.initDeleteButton();
        this.initStateCheckbox();
    }

    async getNotes() {
        this.notes = await noteService.readNotes(this.orderBy, this.filterBy);
        this.initializeTemplate();
    }

    filteringEvent(ev) {
        this.filterBy = ev.target.checked ? null : ev.target.dataset.filterby;
        this.getNotes();
    }

    orderEvent(ev) {
        this.orderBy = ev.target.dataset.orderby;
        this.getNotes();
    }

    async registerHelpers() {
        Handlebars.registerHelper('times', (n, block) => {
            let accum = '';
            for (let i = 0; i < n; ++i) {
                accum += block.fn(i);
            }
            return accum;
        });

        // Handlebars.registerHelper('ifEquals', (arg1, arg2, options) => {
        //     return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        // });

        Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        });

        Handlebars.registerHelper('formatDate', (datetime) => {
            if (!datetime || new Date(datetime) < new Date('2000-01-01')) return '';

            const date = new Date(datetime);
            const monthLeadingZero = ('0'.concat((date.getMonth() + 1))).slice(-2);
            const dayLeadingZero = ('0'.concat(date.getDate())).slice(-2);
            return `${date.getFullYear()}-${monthLeadingZero}-${dayLeadingZero}`;
        });
    }

    async initialize() {
        this.initEventHandlers();
        this.getNotes();
    }

    firstInitialize() {
        this.registerHelpers();
        this.initialize();
    }
}

new NoteController().firstInitialize();
