// modules/habits.js
import { saveToStorage, loadFromStorage } from '../storage/storage.js';
import { formatName, getTodayIndex } from '../utils/helpers.js';
import { openModal, getModalInput, getModalMode, closeModal } from './modal.js';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

let habits = {};
let habitEditMode = false;

export function initHabits() {
    habits = loadFromStorage('habits', {});

    renderHabits();

    document.getElementById('add-habit-btn').onclick = () => openModal('habit');
    document.getElementById('edit-habit').onclick = () => toggleEditMode();

    document.getElementById('modal-save-btn').addEventListener('click', () => {
        if (getModalMode() !== 'habit') return;
        saveHabit();
    });
}

function persist() {
    saveToStorage('habits', habits);
}

function toggleEditMode() {
    habitEditMode = !habitEditMode;

    const editBtn = document.getElementById('edit-habit');

    editBtn.classList.toggle('active', habitEditMode);
    editBtn.textContent = habitEditMode ? 'Done' : 'Edit';

    renderHabits();
}

function saveHabit() {
    const modalInput = getModalInput();
    const habitName = modalInput.value.trim();

    if (!habitName) {
        alert('Please enter a Habit name.');
        return;
    }

    const key = habitName.toLowerCase().replace(/ /g, '_');

    if (Object.hasOwn(habits, key)) {
        alert('Habit already exists!');
        return;
    }
    
    habits[key] = [false, false, false, false, false, false, false];

    persist();
    renderHabits();

    closeModal();
}

function getStreak(daysCompleted) {
    const todayIndex = getTodayIndex();
    let streaks = 0;

    for (let i = todayIndex; i >= 0; i--) {
        if (daysCompleted[i] === true) {
            streaks++;
        } else {
            break;
        }
    }

    return streaks;
}

function renderHabits() {
    const habitContainer = document.getElementById('habits-container');
    const todayIndex = getTodayIndex();

    habitContainer.innerHTML = '';

    if (Object.keys(habits).length === 0) {
        const empty = document.createElement('div');
        empty.classList.add('task-empty');
        empty.textContent = 'No habits yet. Add one above.';
        habitContainer.appendChild(empty);
        return;
    }

    Object.entries(habits).forEach(([habitName, daysArray]) => {
        if (!Array.isArray(daysArray)) return;

        const streaks = getStreak(daysArray);

        const habitDiv = document.createElement('div');
        habitDiv.classList.add('habit');
        habitDiv.dataset.habit = habitName;

        if (habitEditMode) habitDiv.classList.add('editing');

        const habitHeader = document.createElement('div');
        habitHeader.classList.add('habit-header');

        const habitSpan = document.createElement('span');
        habitSpan.classList.add('habit-name');
        habitSpan.textContent = formatName(habitName);

        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('habit-actions');

        const streaksSpan = document.createElement('span');
        streaksSpan.classList.add('habit-streak');
        streaksSpan.textContent = `🔥 ${streaks}`;

        const habitDel = document.createElement('span');
        habitDel.classList.add('habit-del');
        habitDel.classList.add('delete-btn');

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('width', '14');
        svg.setAttribute('height', '14');

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M6 6L18 18M18 6L6 18');
        path.setAttribute('stroke', 'currentColor');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('stroke-linecap', 'round');

        svg.appendChild(path);
        habitDel.appendChild(svg);

        actionsDiv.appendChild(streaksSpan);
        actionsDiv.appendChild(habitDel);

        habitHeader.appendChild(habitSpan);
        habitHeader.appendChild(actionsDiv);

        const habitDays = document.createElement('div');
        habitDays.classList.add('habit-days');

        days.forEach((day, index) => {
            const label = document.createElement('span');
            label.classList.add('day-label');
            label.textContent = day;

            if (index === todayIndex) label.classList.add('today');

            habitDays.appendChild(label);
        });

        daysArray.forEach((completed, index) => {
            const cell = document.createElement('span');
            cell.classList.add('day-cell');
            cell.dataset.index = index;

            if (index === todayIndex) cell.classList.add('today');

            if (completed) cell.classList.add('completed');

            cell.addEventListener('click', () => {
                habits[habitName][index] = !habits[habitName][index];
                persist();
                renderHabits();
            });

            habitDays.appendChild(cell);
        });

        // renaming in edit mode
        if (habitEditMode) {
            habitSpan.contentEditable = true;
            habitSpan.classList.add('editable');

            const originalKey = habitName;

            habitSpan.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    habitSpan.blur();
                }
            });

            habitSpan.addEventListener('blur', () => {
                const newText = habitSpan.textContent.trim();

                if (!newText) {
                    habitSpan.textContent = formatName(originalKey);
                    return;
                }

                const newKey = newText.toLowerCase().replace(/ /g, '_');

                if (newKey === originalKey) return;

                if (Object.hasOwn(habits, newKey)) {
                    alert('Habit already exists!');
                    habitSpan.textContent = formatName(originalKey);
                    return;
                }

                habits[newKey] = habits[originalKey];
                delete habits[originalKey];
                persist();
                renderHabits();
            });
        } else {
            habitSpan.contentEditable = false;
            habitSpan.classList.remove('editable');
        }

        habitDel.onclick = () => {
            if (!habitEditMode) return;
            if (!confirm('Delete habit?')) return;
            delete habits[habitName];
            persist();
            renderHabits();
        };

        habitDiv.appendChild(habitHeader);
        habitDiv.appendChild(habitDays);

        habitContainer.appendChild(habitDiv);
    });
}

