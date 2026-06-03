// modules/tasks.js

import { saveToStorage, loadFromStorage} from '../storage/storage.js';
import { formatName } from '../utils/helpers.js';
import { openModal, getModalInput, getModalMode, closeModal } from './modal.js';

let tasks = [];
let currentFilter = 'all';
let taskEditMode = false;

export function initTasks() {
    tasks = loadFromStorage('tasks', []);

    renderTasks();

    document.getElementById('add-task-btn').onclick = () => openModal('task');
    document.getElementById('edit-task-btn').onclick = () => toggleEditMode();

    document.getElementById('filter-all').onclick = () => setFilter('all');
    document.getElementById('filter-active').onclick = () => setFilter('active');
    document.getElementById('filter-completed').onclick = () => setFilter('completed');

    document.getElementById('clear-completed-btn').onclick = () => {
        tasks = tasks.filter(t => !t.done);
        persist();
        renderTasks();
    };

    document.getElementById('modal-save-btn').addEventListener('click', () => {
        if (getModalMode() !== 'task') return;
        saveTask();
    });
}

function persist() {
    saveToStorage('tasks', tasks);
}

function toggleEditMode() {
    taskEditMode = !taskEditMode;

    const editBtn = document.getElementById('edit-task-btn');

    editBtn.classList.toggle('active', taskEditMode);
    editBtn.textContent = taskEditMode ? 'Done' : 'Edit';

    renderTasks();
}

function setFilter(filter) {
    currentFilter = filter;

    document.getElementById('filter-all').classList.toggle('active', filter === 'all');
    document.getElementById('filter-active').classList.toggle('active', filter === 'active');
    document.getElementById('filter-completed').classList.toggle('active', filter === 'completed');

    renderTasks();
}

function saveTask() {
    const modalInput = getModalInput();
    const taskName = modalInput.value.trim();

    if (!taskName) {
        alert('Please enter a task name.');
        return;
    }

    const taskExist = tasks.some(
        task => task.text.toLowerCase() === taskName.toLowerCase()
    );

    if (taskExist) {
        alert('Task already exists!');
        return;
    }

    tasks.push({
        id: Date.now(),
        text: taskName,
        done: false
    });

    persist();

    renderTasks();

    closeModal();
}

function renderTasks() {
    const taskList = document.getElementById('task-list');

    taskList.innerHTML = '';

    let visibleTasks = [...tasks];

    visibleTasks.sort((a, b) => a.done - b.done);

    if (currentFilter === 'active') {
        visibleTasks = visibleTasks.filter(t => !t.done);
    }

    if (currentFilter === 'completed') {
        visibleTasks = visibleTasks.filter(t => t.done);
    }

    if (visibleTasks.length === 0) {
        const emptyMsg = document.createElement('div');

        emptyMsg.classList.add('task-empty');
        emptyMsg.textContent = 'No tasks yet. Add one above.';

        taskList.appendChild(emptyMsg);

        return;
    }

    visibleTasks.forEach(task => {
        const taskLi = document.createElement('li');
        taskLi.classList.add('task-item');

        // mark editing class on the whole item so delete button shows only in edit mode
        if (taskEditMode) taskLi.classList.add('editing');

        if (task.done) taskLi.classList.add('completed');

        const taskCheckbox = document.createElement('input');
        taskCheckbox.type = 'checkbox';
        taskCheckbox.checked = task.done;
        // disable checkbox while editing so users can't toggle completion when renaming
        taskCheckbox.disabled = taskEditMode;
        taskCheckbox.onchange = () => {
            task.done = taskCheckbox.checked;
            persist();
            renderTasks();
        };

        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.textContent = formatName(task.text);

        if (taskEditMode) {
            taskText.contentEditable = true;
            taskText.classList.add('editable');

            taskText.addEventListener('blur', () => {
                const newText = taskText.textContent.trim();
                if (!newText) return;
                task.text = newText;
                persist();
                renderTasks();
            });
        } else {
            taskText.contentEditable = false;
            taskText.classList.remove('editable');
        }

        const delBtn = document.createElement('span');
        // add task-del so CSS can hide/show this element based on `.editing`
        delBtn.classList.add('delete-btn');
        delBtn.classList.add('task-del');

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
        delBtn.appendChild(svg);

        delBtn.onclick = () => {
            if (!confirm('Delete task?')) return;
            tasks = tasks.filter(t => t.id !== task.id);
            persist();
            renderTasks();
        };

        taskLi.append(taskCheckbox, taskText, delBtn);
        taskList.appendChild(taskLi);
    });
}