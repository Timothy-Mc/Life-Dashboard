console.log("Life Dashboard Loaded")


const tasks = document.querySelectorAll('#task-list input[type="checkbox"]');

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


// TODO: Delete Task Functionality
document.querySelectorAll('#task-list .delete').forEach(btn => {
    btn.addEventListener('click', () => {
        const taskItem = btn.closest('li');
        if (taskItem) {
            taskItem.remove();
        }
    })
})


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
    const taskDeleteBtn = document.querySelectorAll('#task-list .delete')

    if (taskName === "") {
        alert("Please enter a task name.");
        return;
    }

    const newTask = document.createElement('li');
    const newTaskLabel = document.createElement('label');
    const newTaskCheckbox = document.createElement('input');
    const newTaskText = document.createElement('span');
    const deleteBtn = document.createElement('span');

    deleteBtn.classList.add('delete');
    deleteBtn.id = 'delete-task';
    deleteBtn.textContent = '\u00D7';
  

    newTaskCheckbox.type = "checkbox";

    newTaskLabel.appendChild(newTaskCheckbox);
    newTaskText.classList.add('task-text');
    newTaskText.textContent = taskName;
    newTaskLabel.appendChild(newTaskText);
    newTaskLabel.appendChild(deleteBtn);
    newTask.appendChild(newTaskLabel);


    taskList.appendChild(newTask);

    newTaskCheckbox.addEventListener('change', function () {
        if (newTaskCheckbox.checked) {
            newTask.classList.add('completed');
        } else {
            newTask.classList.remove('completed');
        }
    });

    deleteBtn.addEventListener('click', function () {
        const taskItem = deleteBtn.closest('li');
        if (taskItem) {
            taskItem.remove();
        }
    });

    taskInput.value = "";
    taskModal.classList.remove('active');
}

window.onclick = function(event) {
    if (event.target == taskModal) {
        taskModal.classList.remove('active');
    }
}
