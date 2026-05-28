// modules/notes.js

import { saveToStorage, loadFromStorage} from '../storage/storage.js';

const noteInput = document.getElementById('note-textarea');

export function initNotes() {
    noteInput.value = loadFromStorage('notes', '');

    noteInput.addEventListener('input', (e) => {
        saveToStorage('notes', e.target.value);
    });
}