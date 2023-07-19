import layout from "./layout";
import Dom from "./domManipulate";
import {save} from "./projects";

class Task {
    constructor(subject, desc, priority, completed=false) {
        this.subject = subject;
        this.desc = desc;
        this.priority = priority;
        this.dom = layout.getTask(this);
        this.completed = completed;
        if (this.completed) this.dom.classList.add("completed"); 
    }
}

let currentProject;

function loadTasks(project) {
    let main = document.querySelector(".main");
    main.classList.add("sunset-gradient");
    
    let tasks = Dom.newElement("div", "tasks");

    let header = layout.getTaskHeader(project);
    let tasksContainer = Dom.newElement("div", "task-container")
    populateTasks(project, tasksContainer);

    tasks.appendChild(header);
    tasks.appendChild(tasksContainer);

    main.appendChild(tasks);
    currentProject = project;
}

function populateTasks(project, container) {
    let tasksArray = project.tasks;

    tasksArray.forEach(task => {
        task.dom.classList.add("invisible");
        layout.addTask(task, container);
    })

    showTasks(project.tasks);
}


function addNewTask(form) {
    let project = currentProject;
    let priorities = form.querySelectorAll(".form-priority");
    let i;
    for (i = 0; i < priorities.length; i++) {
        if (priorities[i].classList.value.includes("selected")) break;
    }
    let priority = i;

    let subject = form.querySelector(".task-subject");
    let description = form.querySelector(".task-description");

    if (subject.value === "") {subject.style["outline"] = "1px solid red"; subject.focus(); return;}
    let desc = description.value;
    
    if (desc === "") desc = "No description needed";

    let newTask = new Task(subject.value, desc, priority);
    project.tasks.push(newTask);
    Dom.removeDOM(form);
    layout.addTask(newTask);
    save();
}

function showTasks(tasks, index=-1) {
    if (index !== -1) tasks[index++].dom.classList.remove("invisible");
    else index = 0;
    if (index < tasks.length) setTimeout(showTasks.bind(this, tasks, index), 300);
}

function newTask(subject, desc, priority) {
    return new Task(subject, desc, priority);
}



function removeTask(event, obj) {
    event.stopPropagation();
    let tasks = currentProject.tasks;
    tasks.splice((tasks.indexOf(obj)), 1);
    Dom.removeDOM(obj.dom);
    save();
}


export {Task};
export default {loadTasks, newTask, addNewTask, removeTask};