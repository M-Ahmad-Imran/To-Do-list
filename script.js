let date = new Date();
let year = date.getFullYear();
let month = String(date.getMonth() + 1).padStart(2, 0);
let day = String(date.getDate()).padStart(2, 0);
let hour = String(date.getHours()).padStart(2, 0);
let minutes = String(date.getMinutes()).padStart(2, 0);

const d = `${year}-${month}-${day}T${hour}:${minutes}`

document.getElementById("input-date").value = d;

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

function addTask() {
    const task = document.getElementById('input-task');
    const task_time = document.getElementById('input-date').value;
    const desc = document.getElementById("dis");
    const formatedDate = formatDate(task_time);
    const tasklist = document.getElementById('taskList');

    if (task.value !== "" && task_time !== "" && desc.value !== "") {
        const newtask = document.createElement('li');

        newtask.innerHTML = `
        <h1 class="todotext">${task.value}</h1>
        <span class="datetime">${formatedDate}</span>
        <span class="tododesc">${desc.value}</span>
        <input class="edittext"></input>
        <span class="btns">
            <button class="remove-btn" onclick="deleteTask(this.parentElement)">Remove</button>
            <button id="editbtn">Edit</button>
            <button id="safebtn">Safe</button>
        </span>`

        tasklist.appendChild(newtask);
        const edittext = document.querySelector(".edittext");
        const textcontent = document.querySelector(".tododesc");
        edittext.style.display = "none";
        editbtn.addEventListener("click", () => {
            edittext.value = textcontent.textContent;
            edittext.style.display = "inline";
            textcontent.style.display = "none";
            editbtn.style.display = "none";
            safebtn.style.display = "inline";
            task.value = "";
            desc.value = "";
            task_time.value = "";
            warning.innerHTML = "";
        })
        document.getElementById('safebtn').addEventListener("click", ()=>{
            textcontent.textContent = edittext.value;
            edittext.style.display = "none";
            textcontent.style.display = "inline";
            safebtn.style.display = "none";
            editbtn.style.display = "inline";
        })
    } else {
        warning.innerHTML = "Filling each box is compulsary!";
    }
}

function deleteTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();
}