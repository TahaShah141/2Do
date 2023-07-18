import layout from "./layout";

class Task {
    constructor(subject, desc, priority) {
        this.subject = subject;
        this.desc = desc;
        this.priority = priority;
    }
}

function openTasks(project) {
    console.log("opened tasks");
    let main = document.querySelector(".main");
    main.classList.add("sunset-gradient");

    let tasks = layout.getTasks(project);

    main.appendChild(tasks);
}

function newTask(subject, desc, priority) {
    return new Task(subject, desc, priority);
}

export default {openTasks, newTask};