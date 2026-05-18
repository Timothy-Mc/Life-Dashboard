console.log("Life Dashboard Loaded")


// ? Task Panel

// TODO: Add functionality to save tasks to local storage so they persist across page reloads
let tasks = [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    } else {
        tasks = []
    }
}

loadTasks();

function renderTasks() {
    var taskList = document.getElementById('task-list');
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement('li');

        if (task.done === true) {
            li.classList.add("completed")
        }

        const label = document.createElement('label');

        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.checked = task.done;

        const text = document.createElement('span');
        text.classList.add('task-text');
        text.textContent = task.text;

        const del = document.createElement('span');
        del.classList.add('delete-task');

        // Delete Logic
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("width", "14");
        svg.setAttribute("height", "14");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M6 6L18 18M18 6L6 18");
        path.setAttribute("stroke", "currentColor");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("stroke-linecap", "round");

        del.onclick = () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
        }

        // Checkbox Logic
        checkbox.onchange = () => {
            task.done = checkbox.checked;
            saveTasks();
            renderTasks();
        }

        svg.appendChild(path);
        del.appendChild(svg);

        label.appendChild(checkbox);
        label.appendChild(text);
        label.appendChild(del);

        li.appendChild(label)
        taskList.appendChild(li)

    });
}

// TODO: Modal Setup for adding new tasks and habits

var taskModal = document.getElementById('task-modal');
var addTaskBtn = document.getElementById('add-task-btn');
var closeSpan = document.getElementById('close-modal');
var saveTaskBtn = document.getElementById('save-task-btn');
var taskInput = document.getElementById('task-input')

addTaskBtn.onclick = function() {
    taskModal.classList.add('active');
}

closeSpan.onclick = function() {
    taskInput.value = "";
    taskModal.classList.remove('active');
}

saveTaskBtn.onclick = function() {
    var taskName = taskInput.value.trim();

    if (taskName === "") {
        alert("Please enter a task name.");
        return;
    }

    const taskExist = tasks.some(task => task.text === taskName)

    if (taskExist) {
        alert("Task already exists!");
        return;
    }
    

    const newTask = {
        id: Date.now(),
        text: taskName,
        done: false
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();

    taskInput.value = "";
    taskModal.classList.remove('active');
}

window.onclick = function(event) {
    taskInput.value = "";
    if (event.target == taskModal) {
        taskModal.classList.remove('active');
    }
}

// ? Notes Panel

// TODO Setup Notes to have local storage so they persist across page reloads

const noteInput = document.getElementById('note-textarea');

function saveNotes(value) {
    localStorage.setItem('notes', value);
}

function loadNotes() {
    const savedNotes = localStorage.getItem('notes');

    return savedNotes || '';
}

function renderNotes() {
    noteInput.value = loadNotes();
}

noteInput.addEventListener('input', (event) => {
    saveNotes(event.target.value);
});

renderNotes()