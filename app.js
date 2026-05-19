console.log("Life Dashboard Loaded")

let modalMode = "";

// TODO: Modal Setup

const modal = document.getElementById('modal')
const modalInput = document.getElementById('modal-input')
const modalSaveBtn = document.getElementById('modal-save-btn')

document.getElementById('add-task-btn').onclick = () => openModal('task');
document.getElementById('add-habit-btn').onclick = () => openModal('habit');

document.getElementById('modal-close').onclick = () => {
    modalInput.value = "";
    modal.classList.remove('active');
}

modalSaveBtn.onclick = () => {
    if (modalMode === 'task') saveTask();
    if (modalMode === 'habit') saveHabit();
}

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
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add('task-item')

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

            li.remove();
        }

        // Checkbox Logic
        checkbox.onchange = () => {
            task.done = checkbox.checked;
            saveTasks();

            li.classList.toggle("completed", task.done);
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

function saveTask() {
    const taskName = modalInput.value.trim();

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

    modalInput.value = "";
    modal.classList.remove('active');
}

window.onclick = function(event) {
    modalInput.value = "";
    if (event.target == modal) {
        modal.classList.remove('active');
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

// ? Habits Panel

// TODO: Store habits as an object
let habits = {};

// TODO: Render the habit grid from this data
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
}

function loadHabits() {
    const savedHabits = localStorage.getItem('habits');

    if (savedHabits) {
        habits = JSON.parse(savedHabits);
    } else {
        // habits = {};
        habits = {};
    }
}

function renderHabits() {
    const habitContainer = document.getElementById('habits-container');
    const todayIndex = getTodayIndex();
    

    habitContainer.innerHTML = "";


    Object.entries(habits).forEach(([habitName, daysArray]) => {
        const streaks = getStreak(habits[habitName]);

        const habitDiv = document.createElement('div');
        habitDiv.classList.add('habit')
        habitDiv.dataset.habit = habitName;

        const habitHeader = document.createElement('div');
        habitHeader.classList.add('habit-header')

        const habitSpan = document.createElement('span');
        habitSpan.classList.add('habit-name');
        habitSpan.textContent = formatHabitName(habitName);

        const streaksSpan = document.createElement('span')
        streaksSpan.classList.add('habit-streak');
        streaksSpan.textContent = `🔥 ${streaks}`;

        habitHeader.appendChild(habitSpan);
        habitHeader.appendChild(streaksSpan);

        const habitDays = document.createElement('div');
        habitDays.classList.add('habit-days')

        days.forEach((day,index) => {
            const label = document.createElement('span');
            label.classList.add('day-label');
            label.textContent = day;

            if (index === todayIndex) label.classList.add('today');

            habitDays.appendChild(label);
        });


        if (!Array.isArray(habits[habitName])) return;

        habits[habitName].forEach((completed, index) => {

            const cell = document.createElement('span');
            cell.classList.add('day-cell');
            cell.dataset.index = index;

            if (index === todayIndex) cell.classList.add('today');

            if (completed) {
                cell.classList.add('completed');
            }

            cell.addEventListener('click', (e) => {
                habits[habitName][index] = !habits[habitName][index];

                cell.classList.toggle('completed', habits[habitName][index]);

                saveHabits();
                renderHabits();
            });

            habitDays.appendChild(cell);
        });

        habitDiv.appendChild(habitHeader);
        habitDiv.appendChild(habitDays);

        habitContainer.appendChild(habitDiv);



    })
}

loadHabits();
renderHabits();

// TODO: Add a click listener to each cell
function saveHabit() {
    const habitName = modalInput.value.trim();
    
    
    if (habitName === "") {
        alert("Please enter a Habit name.");
        return;
    }

    const key = habitName.toLowerCase().replace(/ /g, '_');

    if (Object.hasOwn(habits, key)) {
        alert("Habit already exists!");
        return;
    }
    
    habits[key] = [false, false, false, false, false, false, false];

    saveHabits();
    renderHabits();

    modalInput.value = "";
    modal.classList.remove('active');
}

function getStreak(daysCompleted) {
    const todayIndex = getTodayIndex();

    console.log(daysCompleted)

    let streaks = 0;

    for (let i = todayIndex; i >= 0; i--) {
        console.log('here')
        if (daysCompleted[i] === true) {
            streaks++;
            console.log('there')
        } else {
            console.log('no')
            break;
        }

        console.log(streaks);
    }

    return streaks;
}

// ? Helper Functions

function formatHabitName(name) {
    return name
        .replace(/_/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
}

function openModal(mode) {
    modalMode = mode;
    const modalTitle = document.getElementById('modal-title')

    modalTitle.textContent = mode === "task" ? "Add Task" : "Add Habit";
    modalInput.placeholder = mode === "task" ? "New task..." : "New habit...";

    modal.classList.add('active');
}

function getTodayIndex() {
    const day = new Date().getDay();

    return day === 0 ? 6 : day - 1;
}