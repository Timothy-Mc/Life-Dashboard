// console.log("Life Dashboard Loaded")

// let modalMode = "";

// // In app.js
// const dateEl = document.querySelector('header p');
// const today = new Date();
// dateEl.textContent = today.toLocaleDateString('en-GB', {
//     day: 'numeric', month: 'long', year: 'numeric'
// });

// // TODO: Modal Setup

// // task filter state
// let currentFilter = 'all';

// const modal = document.getElementById('modal')
// const modalInput = document.getElementById('modal-input')
// const modalSaveBtn = document.getElementById('modal-save-btn')

// document.getElementById('add-task-btn').onclick = () => openModal('task');
// document.getElementById('add-habit-btn').onclick = () => openModal('habit');

// document.getElementById('modal-close').onclick = () => {
//     modalInput.value = "";
//     modal.classList.remove('active');
// }

// modalSaveBtn.onclick = () => {
//     if (modalMode === 'task') saveTask();
//     if (modalMode === 'habit') saveHabit();
// }

// modalInput.addEventListener('keydown', (e) => {
//     if  (e.key === 'Enter') {
//         if (modalMode === 'task') saveTask();
//         if (modalMode === 'habit') saveHabit();
//     }
// });


// window.onclick = function(event) {
//     modalInput.value = "";
//     if (event.target == modal) {
//         modal.classList.remove('active');
//     }
// }

// document.addEventListener('keydown', (e) => {
//     if (e.key === 'Escape') modal.classList.remove('active');
// });


// // ? Task Panel

// // task edit mode
// let taskEditMode = false;

// document.getElementById('edit-task-btn').onclick = () => editMode('task');

// // TODO: Add functionality to save tasks to local storage so they persist across page reloads
// let tasks = [];

// function saveTasks() {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
// }

// function loadTasks() {
//     const savedTasks = localStorage.getItem('tasks');

//     if (savedTasks) {
//         tasks = JSON.parse(savedTasks);
//         renderTasks();
//     } else {
//         tasks = []
//     }
// }

// loadTasks();

// function renderTasks() {
//     const taskList = document.getElementById('task-list');
//     taskList.innerHTML = "";

//     // empty state when no tasks exist
//     if (tasks.length === 0) {
//         const empty = document.createElement('div');
//         empty.classList.add('task-empty');
//         empty.textContent = 'No tasks yet. Add one above.';
//         taskList.appendChild(empty);
//         return;
//     }

//     // sort so completed sink to bottom
//     tasks.sort((a, b) => a.done - b.done);

//     // filter based on currentFilter
//     let visible = tasks;
//     if (currentFilter === 'active') visible = tasks.filter(t => !t.done);
//     if (currentFilter === 'completed') visible = tasks.filter(t => t.done);

//     // if filter yields no results, show a helpful message
//     if (visible.length === 0) {
//         const empty = document.createElement('div');
//         empty.classList.add('task-empty');
//         if (currentFilter === 'active') empty.textContent = 'No active tasks.';
//         else if (currentFilter === 'completed') empty.textContent = 'No completed tasks.';
//         else empty.textContent = 'No tasks yet. Add one above.';
//         taskList.appendChild(empty);
//         return;
//     }

//     visible.forEach(task => {
//         const taskLi = document.createElement('li');
//         taskLi.classList.add('task-item')

//         if (task.done === true) {
//             taskLi.classList.add("completed")
//         }

//         const label = document.createElement('label');

//         const checkbox = document.createElement('input');
//         checkbox.type = "checkbox";
//         checkbox.checked = task.done;

//         const taskSpan = document.createElement('span');
//         taskSpan.classList.add('task-text');
//         taskSpan.textContent = formatName(task.text);

//         if (taskEditMode) taskLi.classList.add('editing');

//         // Delete Logic
//         const taskDel = document.createElement('span')
//         taskDel.classList.add('task-del');
//         taskDel.classList.add('delete-btn');

//         const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//         svg.setAttribute("viewBox", "0 0 24 24");
//         svg.setAttribute("width", "14");
//         svg.setAttribute("height", "14");

//         const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
//         path.setAttribute("d", "M6 6L18 18M18 6L6 18");
//         path.setAttribute("stroke", "currentColor");
//         path.setAttribute("stroke-width", "2");
//         path.setAttribute("stroke-linecap", "round");

//         if (taskEditMode) {
//             taskSpan.contentEditable = true;
//             taskSpan.classList.add('editable');

//             checkbox.disabled = true;

//             const originalText = task.text;

//             taskSpan.addEventListener('keydown', (e) => {
//                 if (e.key === 'Enter') {
//                     e.preventDefault();
//                     taskSpan.blur();
//                 }
//             });

//             taskSpan.addEventListener('blur', () => {
//                 const newText = taskSpan.textContent.trim();

//                 if (!newText) {
//                     taskSpan.textContent = formatName(originalText);
//                     return;
//                 }

//                 const newKey = newText.toLowerCase().replace(/ /g, '_');

//                 const originalKey = originalText.toLowerCase().replace(/ /g, '_');

//                 if (newKey === originalKey) return;

//                 // ensure no other task uses the same name
//                 const duplicate = tasks.some(t => t.text && t.text.toLowerCase().replace(/ /g, '_') === newKey && t.id !== task.id);
//                 if (duplicate) {
//                     alert('Task already exists!');
//                     taskSpan.textContent = formatName(originalText);
//                     return;
//                 }

//                 // update the task object and persist
//                 const t = tasks.find(x => x.id === task.id);
//                 if (t) {
//                     t.text = newText;
//                     saveTasks();
//                     renderTasks();
//                 }
//             });
//         } else {
//             taskSpan.contentEditable = false;
//             taskSpan.classList.remove('editable');
//         }


//         taskDel.onclick = () => {
//             if (!confirm('Delete task?')) return;
//             tasks = tasks.filter(t => t.id !== task.id);
//             saveTasks();
//             renderTasks();
//         }

//         // Checkbox Logic
//         checkbox.onchange = () => {
//             // find the task in the main array and update
//             const t = tasks.find(x => x.id === task.id);
//             if (t) {
//                 t.done = checkbox.checked;
//                 saveTasks();
//                 renderTasks();
//             }
//         }

//         svg.appendChild(path);
//         taskDel.appendChild(svg);

//         label.appendChild(checkbox);
//         label.appendChild(taskSpan);
//         label.appendChild(taskDel);

//         taskLi.appendChild(label)
//         taskList.appendChild(taskLi)
//     });
// }

// function saveTask() {
//     const taskName = modalInput.value.trim();

//     if (taskName === "") {
//         alert("Please enter a task name.");
//         return;
//     }

//     const taskExist = tasks.some(task => task.text === taskName)

//     if (taskExist) {
//         alert("Task already exists!");
//         return;
//     }
    
//     const newTask = {
//         id: Date.now(),
//         text: taskName,
//         done: false
//     };

//     tasks.push(newTask);

//     saveTasks();
//     renderTasks();

//     modalInput.value = "";
//     modal.classList.remove('active');
// }

// // ? Notes Panel

// // TODO Setup Notes to have local storage so they persist across page reloads

// const noteInput = document.getElementById('note-textarea');

// function saveNotes(value) {
//     localStorage.setItem('notes', value);
// }

// function loadNotes() {
//     const savedNotes = localStorage.getItem('notes');

//     return savedNotes || '';
// }

// function renderNotes() {
//     noteInput.value = loadNotes();
// }

// noteInput.addEventListener('input', (event) => {
//     saveNotes(event.target.value);
// });

// renderNotes()

// // ? Habits Panel

// // TODO: Store habits as an object
// let habits = {};


// // habit edit mode
// let habitEditMode = false;

// document.getElementById('edit-habit').onclick = () => editMode('habit');

// // TODO: Render the habit grid from this data
// const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// function saveHabits() {
//     localStorage.setItem('habits', JSON.stringify(habits));
// }

// function loadHabits() {
//     const savedHabits = localStorage.getItem('habits');

//     if (savedHabits) {
//         habits = JSON.parse(savedHabits);
//     } else {
//         habits = {};
//     }
// }

// function renderHabits() {
//     const habitContainer = document.getElementById('habits-container');
//     const todayIndex = getTodayIndex();
    

//     habitContainer.innerHTML = "";

//     if (Object.keys(habits).length === 0) {
//         const empty = document.createElement('div');
//         empty.classList.add('task-empty');
//         empty.textContent = 'No habits yet. Add one above.';
//         habitContainer.appendChild(empty);
//         return;
//     }


//     Object.entries(habits).forEach(([habitName, daysArray]) => {
//         const streaks = getStreak(habits[habitName]);

//         const habitDiv = document.createElement('div');
//         habitDiv.classList.add('habit')
//         habitDiv.dataset.habit = habitName;

//         if (habitEditMode) habitDiv.classList.add('editing');

//         const habitHeader = document.createElement('div');
//         habitHeader.classList.add('habit-header')

//         const habitSpan = document.createElement('span');
//         habitSpan.classList.add('habit-name');
//         habitSpan.textContent = formatName(habitName);

//         const actionsDiv = document.createElement('div');
//         actionsDiv.classList.add('habit-actions');

//         const streaksSpan = document.createElement('span')
//         streaksSpan.classList.add('habit-streak');
//         streaksSpan.textContent = `🔥 ${streaks}`;

//         const habitDel = document.createElement('span')
//         habitDel.classList.add('habit-del');
//         habitDel.classList.add('delete-btn');

//         const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//         svg.setAttribute("viewBox", "0 0 24 24");
//         svg.setAttribute("width", "14");
//         svg.setAttribute("height", "14");

//         const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
//         path.setAttribute("d", "M6 6L18 18M18 6L6 18");
//         path.setAttribute("stroke", "currentColor");
//         path.setAttribute("stroke-width", "2");
//         path.setAttribute("stroke-linecap", "round");

//         svg.appendChild(path)
//         habitDel.appendChild(svg)

//         actionsDiv.appendChild(streaksSpan);
//         actionsDiv.appendChild(habitDel);
        
//         habitHeader.appendChild(habitSpan);
//         habitHeader.appendChild(actionsDiv);

//         const habitDays = document.createElement('div');
//         habitDays.classList.add('habit-days')

//         days.forEach((day,index) => {
//             const label = document.createElement('span');
//             label.classList.add('day-label');
//             label.textContent = day;

//             if (index === todayIndex) label.classList.add('today');

//             habitDays.appendChild(label);
//         });


//         if (!Array.isArray(habits[habitName])) return;

//         habits[habitName].forEach((completed, index) => {

//             const cell = document.createElement('span');
//             cell.classList.add('day-cell');
//             cell.dataset.index = index;

//             if (index === todayIndex) cell.classList.add('today');

//             if (completed) {
//                 cell.classList.add('completed');
//             }

//             cell.addEventListener('click', (e) => {
//                 habits[habitName][index] = !habits[habitName][index];

//                 cell.classList.toggle('completed', habits[habitName][index]);

//                 saveHabits();
//                 renderHabits();
//             });

//             habitDays.appendChild(cell);
//         });

//         // enable renaming when in edit mode for this habit
//         if (habitEditMode) {
//             habitSpan.contentEditable = true;
//             habitSpan.classList.add('editable');

//             const originalKey = habitName;

//             habitSpan.addEventListener('keydown', (e) => {
//                 if (e.key === 'Enter') {
//                     e.preventDefault();
//                     habitSpan.blur();
//                 }
//             });

//             habitSpan.addEventListener('blur', () => {
//                 const newText = habitSpan.textContent.trim();

//                 if (!newText) {
//                     habitSpan.textContent = formatName(originalKey);
//                     return;
//                 }

//                 const newKey = newText.toLowerCase().replace(/ /g, '_');

//                 if (newKey === originalKey) return;

//                 if (Object.hasOwn(habits, newKey)) {
//                     alert('Habit already exists!');
//                     habitSpan.textContent = formatName(originalKey);
//                     return;
//                 }

//                 habits[newKey] = habits[originalKey];
//                 delete habits[originalKey];
//                 saveHabits();
//                 renderHabits();
//             });
//         } else {
//             habitSpan.contentEditable = false;
//             habitSpan.classList.remove('editable');
//         }

//         // delete only in edit mode
//         habitDel.onclick = () => {
//             if (!habitEditMode) return;
//             if (!confirm('Delete habit?')) return;
//             delete habits[habitName];
//             saveHabits();
//             renderHabits();
//         }

//         habitDiv.appendChild(habitHeader);
//         habitDiv.appendChild(habitDays);

//         habitContainer.appendChild(habitDiv);

//     })

// }

// loadHabits();
// renderHabits();

// // TODO: Add a click listener to each cell
// function saveHabit() {
//     const habitName = modalInput.value.trim();
    
    
//     if (habitName === "") {
//         alert("Please enter a Habit name.");
//         return;
//     }

//     const key = habitName.toLowerCase().replace(/ /g, '_');

//     if (Object.hasOwn(habits, key)) {
//         alert("Habit already exists!");
//         return;
//     }
    
//     habits[key] = [false, false, false, false, false, false, false];

//     saveHabits();
//     renderHabits();

//     modalInput.value = "";
//     modal.classList.remove('active');
// }

// function getStreak(daysCompleted) {
//     const todayIndex = getTodayIndex();
//     let streaks = 0;

//     for (let i = todayIndex; i >= 0; i--) {
//         if (daysCompleted[i] === true) {
//             streaks++;
//         } else {
//             break;
//         }
//     }

//     return streaks;
// }

// // ? Helper Functions

// function editMode(mode) {
//     if (mode === 'task') {
//         const editTaskBtn = document.getElementById('edit-task-btn')

//         taskEditMode = !taskEditMode;
//         editTaskBtn.classList.toggle('active', taskEditMode);
//         editTaskBtn.textContent = taskEditMode ? 'Done' : 'Edit';
//         renderTasks();

//     } else if (mode === 'habit') {
//         const editHabitBtn = document.getElementById('edit-habit')

//         habitEditMode = !habitEditMode;
//         editHabitBtn.classList.toggle('active', habitEditMode);
//         editHabitBtn.textContent = habitEditMode ? 'Done' : 'Edit';
//         renderHabits();
//     }
// }

// function formatName(name) {
//     return name
//         .replace(/_/g, ' ')
//         .replace(/\b\w/g, c => c.toUpperCase());
// }

// function openModal(mode) {
//     modalMode = mode;
//     const modalTitle = document.getElementById('modal-title')

//     modalTitle.textContent = mode === "task" ? "Add Task" : "Add Habit";
//     modalInput.placeholder = mode === "task" ? "New task..." : "New habit...";

//     modal.classList.add('active');
// }

// function getTodayIndex() {
//     const day = new Date().getDay();

//     return day === 0 ? 6 : day - 1;
// }
// // filter buttons
// const filterAllBtn = document.getElementById('filter-all')
// const filterActiveBtn = document.getElementById('filter-active')
// const filterCompletedBtn = document.getElementById('filter-completed')
// const clearCompletedBtn = document.getElementById('clear-completed-btn')

// function setFilter(filter) {
//     currentFilter = filter;
//     // toggle active state using toggle with condition
//     filterAllBtn.classList.toggle('active', filter === 'all');
//     filterActiveBtn.classList.toggle('active', filter === 'active');
//     filterCompletedBtn.classList.toggle('active', filter === 'completed');
//     renderTasks();
// }

// filterAllBtn.onclick = () => setFilter('all');
// filterActiveBtn.onclick = () => setFilter('active');
// filterCompletedBtn.onclick = () => setFilter('completed');
// clearCompletedBtn.onclick = () => {
//     // remove completed tasks
//     tasks = tasks.filter(t => !t.done);
//     saveTasks();
//     renderTasks();
// }
