function DT() {
    let date = new Date();
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, 0);
    let day = String(date.getDate()).padStart(2, 0);
    let hour = String(date.getHours()).padStart(2, 0);
    let minutes = String(date.getMinutes()).padStart(2, 0);

    return `${year}-${month}-${day}T${hour}:${minutes}`
}

function formatDate(Datetime) {
    let date = new Date(Datetime);
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, 0);
    let day = String(date.getDate()).padStart(2, 0);
    let hour = String(date.getHours()).padStart(2, 0);
    let minutes = String(date.getMinutes()).padStart(2, 0);
    const dt = `Date:${day}-${month}-${year}<br>Time:${hour}:${minutes}`;

    return dt;
}

function addTask(tasks, date, description, id) {
    const task = tasks;
    const task_time = date;
    const desc = description;
    const formatedDate = formatDate(task_time);

    const li = document.createElement('li');
    li.id = id; // Set the ID of the <li> element to the task ID

    li.innerHTML = `
        <h1 class="todotext">${task}</h1>
        <span class="datetime">${formatedDate}</span>
        <span class="tododesc">${desc}</span>
        <input type="text" class="edittext" style="display:none"></input>
        <span class="btns">
            <button class="remove-btn" onclick="deleteTask(this.parentElement)">Remove</button>
            <button id="editbtn">Edit</button>
            <button id="safebtn">Safe</button>
        </span>`

    const edittext = li.querySelector(".edittext");
    const textcontent = li.querySelector(".tododesc");
    const editbtn = li.querySelector("#editbtn");
    const safebtn = li.querySelector('#safebtn');
    editbtn.addEventListener('click', function () {
        edittext.value = textcontent.textContent;
        edittext.style.display = "inline";
        textcontent.style.display = "none";
        editbtn.style.display = "none";
        safebtn.style.display = "inline";
    })
    safebtn.addEventListener('click', function () {
        textcontent.textContent = edittext.value;
        edittext.style.display = "none";
        textcontent.style.display = "inline";
        safebtn.style.display = "none";
        editbtn.style.display = "inline";
    })

    return li;
}

function todoitem(tasks, date, description, id) {
    const tasklist = document.getElementById('taskList');
    const existingTask = document.getElementById(id);
    if (existingTask) return; // If task already exists, do not add it again

    const newitem = addTask(tasks, date, description, id);
    tasklist.appendChild(newitem);
}

// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', function () {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach(function (task) {
        todoitem(task.task, task.date, task.description, task.id);
    });

    // Set default values after loading tasks from localStorage
    document.getElementById("input-date").value = DT();
});

document.getElementById('todo-box').addEventListener('submit', function (e) {
    e.preventDefault();
    const task = document.getElementById("input-task");
    const description = document.getElementById("dis");
    const date = document.getElementById("input-date");

    const taskId = new Date().getTime(); // Unique key for each task
    todoitem(task.value, date.value, description.value, taskId);
    
    // Update local storage after adding a new task
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.push({ id: taskId, task: task.value, date: date.value, description: description.value });
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
    task.value = "";
    description.value = "";
    date.value = DT();
});

function deleteTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();

    // Remove task from local storage
    const taskId = taskItem.id;
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = storedTasks.filter(task => task.id != taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
