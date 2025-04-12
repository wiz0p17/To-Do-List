document.addEventListener("DOMContentLoaded",() => {
    const todoInput = document.getElementById("todo-input")
    const addTaskButton = document.getElementById("add-task-button")
    const container = document.querySelector('.container');

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task) => renderTask(task));

    addTaskButton.addEventListener("click",()=>{
        const taskText = todoInput.value.trim()

        if(taskText === "") return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        }

        tasks.push(newTask)
        saveTask();
        renderTask(newTask);
        todoInput.value = "";//clear input
        console.log(tasks)
    })

    function renderTask(task){
        const ul = document.createElement('ul')
        ul.setAttribute('id','todo-list')
        container.appendChild(ul)

        const li = document.createElement('li')
        li.setAttribute("data-id",task.id)

        li.innerHTML = `
            <span> ${task.text} </span>
            <button class="delete-btn">Delete</button>`;

        

        li.addEventListener('click',(e) => {
            if(e.target.tagName === "BUTTON") return;

            task.completed = !task.completed
            li.classList.toggle("completed")
            saveTask();

        })

        li.querySelector("button").addEventListener('click',(e) => {
            e.stopPropagation() //prevent toggle from firing
            tasks = tasks.filter(t => t.id !== task.id)
            li.remove();
            saveTask();
        })

        ul.appendChild(li)

    }


    function saveTask() {
        localStorage.setItem("tasks",JSON.stringify(tasks))
    }
})