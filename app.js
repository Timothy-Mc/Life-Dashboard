console.log("Life Dashboard Loaded")


const tasks = document.querySelectorAll('#task-list input[type="checkbox"]');

tasks.forEach(task => {
    task.addEventListener('change', () => {
        console.log(task.checked);
    })
})

// TODO: Add functionality to mark tasks as completed and move them to a "Completed Tasks" section
document.querySelectorAll('#task-list li').forEach(task => {
    const checkbox = task.querySelector('input[type="checkbox"]');

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            task.classList.add('completed');
        } else {
            task.classList.remove('completed');
        }
    });
});


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
    taskModal.classList.remove('active');
}

saveTaskBtn.onclick = function() {
    var taskName = taskInput.value.trim();
    var taskList = document.getElementById('task-list');

    if (taskName === "") {
        alert("Please enter a task name.");
        return;
    }

    const newTask = document.createElement('li');
    const newTaskLabel = document.createElement('label');
    const newTaskCheckbox = document.createElement('input');

    newTaskCheckbox.type = "checkbox";

    newTaskLabel.appendChild(newTaskCheckbox);
    newTaskLabel.appendChild(document.createTextNode(taskName));
    newTask.appendChild(newTaskLabel);


    taskList.appendChild(newTask);

    taskInput.value = "";
    taskModal.classList.remove('active');
}

window.onclick = function(event) {
    if (event.target == taskModal) {
        taskModal.classList.remove('active');
    }
}