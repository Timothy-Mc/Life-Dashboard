// app.js

import { renderDate } from './utils/date.js';

import { initModal } from './modules/modal.js';
import { initTasks } from './modules/tasks.js';
import { initHabits } from './modules/habits.js';
import { initNotes } from './modules/notes.js';

console.log('Life Dashboard Loaded');

renderDate();

initModal();
initTasks();
initHabits();
initNotes();