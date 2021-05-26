function changeStyle() {
    console.log('changeStyle');
    document.body.classList.toggle('dark-theme');
}

function readNotes() {
    console.log('readNotes');
}

function readNote() {
    console.log('readNote');
}

function createNote() {
    console.log('createNote');
}

function updateNote() {
    console.log('updateNote');
}

function deleteNote() {
    console.log('deleteNote');
}

function sortNotes(orderby) {
    console.log('tada');
}

const notes

// createNote
const createNoteBtn = document.querySelector('#createNote');
createNoteBtn.addEventListener('click', () => {
    createNote();
});

// sorting
const finishdateBtn = document.querySelector('#finishdate');
const createddateBtn = document.querySelector('#createddate');
const importanceBtn = document.querySelector('#importance');

const sortingEvent = (ev) => {
    if (ev.target.dataset.orderby) {
        sortNotes(ev);
    }
};

finishdateBtn.addEventListener('click', sortingEvent);
createddateBtn.addEventListener('click', sortingEvent);
importanceBtn.addEventListener('click', sortingEvent);

// change Color
const changeStyleBtn = document.querySelector('#styles');
changeStyleBtn.addEventListener('onchange', () => {
    changeStyle();
});
