/* global Handlebars */

import { noteService } from '../services/note-service.js';

export default class NoteController {
    constructor() {
        this.changeStyleBtn = document.querySelector('#styles');
        this.createNoteBtn = document.querySelector('#createNote');

        this.finishdateBtn = document.querySelector('#finishDate');
        this.createddateBtn = document.querySelector('#createdDate');
        this.importanceBtn = document.querySelector('#importance');

        this.noteTemplate = Handlebars.compile(document.querySelector('#entry-template').innerHTML);
        this.notesContent = document.querySelector('#notesContent');
    }

    initStyleSelect() {
        this.changeStyleBtn.addEventListener('change', () => {
            document.body.classList.toggle('dark-theme');
        });
    }

    initCreateButton() {
        this.createNoteBtn.addEventListener('click', () => {
            this.noteService.createNote();
        });
    }

    initSortButtons() {
        this.finishdateBtn.addEventListener('click', this.sortingEvent());
        this.createddateBtn.addEventListener('click', this.sortingEvent);
        this.importanceBtn.addEventListener('click', this.sortingEvent);
    }

    initEventHandlers() {
        this.initCreateButton();
        this.initSortButtons();
        this.initStyleSelect();

        document.addEventListener('DOMContentLoaded', () => {
            this.initializeTemplate();
        });
    }

    initializeTemplate() {
        for (const n of noteService.notes) {
            let html = this.noteTemplate(n);
            let divElement = document.createElement('li');
            divElement.setAttribute('id', 'liContent');
            divElement.innerHTML = html;
            notesContent.appendChild(divElement);
        }
    }

    sortNotes(orderby) {
        console.log(this);
        noteService.notes = noteService.notes.sort((a, b) => {
            if (orderby === 'importance') {
                return a.importance - b.importance;
            }
            if (orderby === 'startDate') {
                return a.startDate - b.startDate;
            }
            return a.finishDate - b.finishDate;
        });
    }

    sortingEvent(ev) {
       // const { orderby } = ev.target.dataset;
       const orderby = 'priority';
        if (orderby) {
            this.sortNotes(orderby);
        }
        //this.initializeTemplate();
    }

    initialize() {
        this.initEventHandlers();
        noteService.readNotes();
    }
}

new NoteController().initialize();
