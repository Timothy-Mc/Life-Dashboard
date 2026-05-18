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

// TODO: Modal Setup for adding new tasks

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

// ? Habits Panel

// TODO: Store habits as an object
let habits = {};
// let habits = {
//     exercise: [false, false, false, false, false, false, false],
//     read: [false, false, false, false, false, false, false],
//     code: [false, false, false, false, false, false, false]
// };

// TODO: Render the habit grid from this data

function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
}

function loadHabits() {
    const savedHabits = localStorage.getItem('habits');

    if (savedHabits) {
        habits = JSON.parse(savedHabits);
        renderHabits();
    } else {
        // habits = {};
        habits = {
            exercise: [false, false, false, false, false, false, false],
            read: [false, false, false, false, false, false, false],
            code: [false, false, false, false, false, false, false]
        };
    }
}

loadHabits();

function renderHabits() {
    // 1. Get the container where all habits live
    // (this is your #habits-container or whatever you named it)
    const habitContainer = document.getElementById('habits-container');

     // 2. Clear existing HTML inside the container
    // (so you don’t duplicate habits every render)
    habitContainer.innerHTML = "";

    // 3. Loop through your habits object
    // (use Object.entries or Object.keys)
    Object.keys(habits).forEach(habitName => {
        // 4. For each habit:
        //    - create a parent div (.habit)
        //    - set data-habit attribute
        const habitDiv = document.createElement('div');
        habitDiv.classList.add('habit')
        habitDiv.dataset.habit(habitName.text.toLowerCase())

        // 5. Create and add habit name element
        //    - span or div for the title
        //    - set text content
        const habitSpan = document.createElement('span');
        habitSpan.classList.add('habit-name');
        habitSpan.textContent = habitName.text;

        // 6. Create the "habit-days" container



        // 7. Create 7 day labels (Mon–Sun)
        //    (optional here if you already have static labels in HTML)



        // 8. Loop through the 7 boolean values for this habit
        //    (true/false array)



            // 9. For each day:
            //    - create a day-cell span
            //    - set data-index



            // 10. If value is true:
            //     - add "completed" class



            // 11. Add click listener to toggle:
            //     - update habits object
            //     - update class
            //     - optionally save to localStorage



        // 12. Append day cells to habit-days container



        // 13. Append habit-name + habit-days to habit container



        // 14. Append full habit block to main container
    })
}

document.querySelectorAll('.day-cell').forEach(cell => {
    cell.addEventListener('click', (e) => {
        const habitElement = e.target.closest('.habit');
        const habitName = habitElement.dataset.habit;

        // console.log(habitElement);
        
        const dayIndex = parseInt(cell.dataset.index); 

        if (!(habitName in habits)) return;   

        const newValue = !habits[habitName][dayIndex];
        // console.log(newValue);
        habits[habitName][dayIndex] = newValue;


        e.target.classList.toggle("completed", newValue);

        // console.log(habits[habitName]);
        // console.log(habitName);
    });
});


// TODO: Add a click listener to each cell

// TODO: Modal Setup for adding new habits
