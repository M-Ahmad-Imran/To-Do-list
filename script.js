function DT() {
    let date = new Date();
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, 0);
    let day = String(date.getDate()).padStart(2, 0);
    let hour = String(date.getHours()).padStart(2, 0);
    let minutes = String(date.getMinutes()).padStart(2, 0);

    return `${year}-${month}-${day}T${hour}:${minutes}`
}

document.getElementById("input-date").value = DT();

function formatDate(Datetime) {
    let date = new Date(Datetime);
    let year = date.getFullYear();
    let month = String(date.getMonth()).padStart(2, 0);
    let day = String(date.getDate()).padStart(2, 0);
    let hour = String(date.getHours()).padStart(2, 0);
    let minutes = String(date.getMinutes()).padStart(2, 0);
    const dt = `Date:${day}-${month}-${year}<br>Time:${hour}:${minutes}`;

    return dt;
}

function addTask(tasks, date, description) {
    const task = tasks;
    const task_time = date;
    const desc = description;
    const formatedDate = formatDate(task_time);

    if (task !== "" && task_time !== "" && desc !== "") {
        const li = document.createElement('li');

        li.innerHTML = `
        <h1 class="todotext">${task}</h1>
        <span class="datetime">${formatedDate}</span>
        <span class="tododesc">${desc}</span>
        <input class="edittext" style="display:none"></input>
        <span class="btns">
            <button class="remove-btn">Remove</button>
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
    } else {
        warning.innerHTML = "Filling each box is compulsary!";
    }
}

function todoitem(tasks, date, description) {
    const tasklist = document.getElementById('taskList');
    const newitem = addTask(tasks, date, description);
    tasklist.appendChild(newitem);
}

document.getElementById('todo-box').addEventListener('submit', function (e) {
    e.preventDefault();
    const task = document.getElementById("input-task");
    const description = document.getElementById("dis");
    const date = document.getElementById("input-date");

    todoitem(task.value, date.value, description.value);
    task.value = "";
    description.value = "";
    date.value = d;
});

function deleteTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();
}