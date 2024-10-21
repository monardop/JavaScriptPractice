const cardSection = document.getElementById("cardSection");
const finishedSection = document.getElementById("finished");
const submitButton = document.getElementById("submitButton");
const taskName = document.getElementById('task');
const taskDescription = document.getElementById('description');
const taskDate = document.querySelector('input[type="datetime-local"]');

let activeTask = [];
let finishedTasks = [];


function createNewTask(task, finished = false) {
    const {taskID, name, description, date} = task;
    
    if(!finished) {
        return `<div class="task-card" id="${taskID}">
        <details name="faq" close>
        <summary>${name} | <span>${date}</span></summary>
        <p class="task-description">${description}</p> 
        </details>
        <input type="button" value="Done" id="done" onclick="taskDone(${taskID})"/>
        </div>`
    } else {
        return `<div class="task-card-finished" id="${taskID}">
        <details name="faq" close>
        <summary class="finishedTask">${name} | <span>${date}</span></summary>
        <p class="task-description">${description}</p> 
        </details>
        </div>`
    }
}

submitButton.addEventListener("click", () => {
    const name = taskName.value;
    const description = taskDescription.value;
    let date = taskDate.value;


    if(name.length < 1 || description.length < 1) {
        alert("Insert something");
        return
    } 

    const taskID = activeTask.length;

    if(date.length < 1) {
        date = new Date().toLocaleDateString()
    }

    const newTask = {
        taskID, name, description, date
    };
    
    cardSection.innerHTML += createNewTask(newTask);

    taskName.value = "";
    taskDescription.value = "";
    taskDate.value = "";
    activeTask.push(newTask);
})

function taskDone(id) {
    const currentCard = document.getElementById(`${id}`);
    let finishedTask = activeTask.find((element) => element.taskID === id);
    finishedTask.tasID = finishedTasks.length;
    finishedTasks.push(finishedTask);

    finishedSection.innerHTML += createNewTask(finishedTask, true);

    currentCard.remove()
}