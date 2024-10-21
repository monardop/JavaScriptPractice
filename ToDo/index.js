const cardSection = document.getElementById("cardSection");
const doneButton = document.getElementById("done");
const submitButton = document.getElementById("submitButton");
const taskName = document.getElementById('task');
const taskDescription = document.getElementById('description');
const taskDate = document.querySelector('input[type="datetime-local"]');


function createNewTask(task) {
    const {name, description, date} = task;
    const taskTitle = `<summary>${name} | <span>${date}</span></summary>`;
    const taskDescription = `<p class="task-description">${description}</p>`
    const newTask = `<div class="task-card">
    <details name="faq" close>
    ${taskTitle} 
    ${taskDescription}  
    </details>
    <input type="button" value="Done" id="done"/>
    </div>`

    return newTask;
}



submitButton.addEventListener("click", () => {
    const name = taskName.value;
    const description = taskDescription.value;
    let date = taskDate.value;


    if(name.length < 1 || description.length < 1) {
        alert("Insert something");
        return
    } 

    if(date.length < 1) {
        date = new Date().toLocaleDateString()
    }

    const newTask = {
        name, description, date
    };
    
    cardSection.innerHTML += createNewTask(newTask);

    taskName.value = "";
    taskDescription.value = "";
    taskDate.value = "";
    
})


