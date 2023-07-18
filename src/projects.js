import layout from "./layout";
import Dom from "./domManipulate";
import tasks from "./tasks";

const projects = [];


class Project {
    constructor(name, desc="This project has no Description", date="") {
        this.name = name;
        this.desc = desc;
        if (date !== "") this.dueDate = new Date(date);
        else this.dueDate = "No Due Date";
        this.dom = layout.getProject(this, name);
    }
}

let defaultProject;

function initProjects() {
    if (projects.length !== 0) return;

    defaultProject = new Project("(Default)");
    projects.push(defaultProject);
    Dom.removeDOM(defaultProject.dom.firstChild.lastChild);

    unloadProjects();
}

function unloadProjects() {
    for (let i = 0; i < 5; i++) projects.push(new Project(`test ${i+1}`));
}

function populateProjects(container) {
    initProjects();
    projects.forEach(project => {
        project.dom.classList.add("invisible");
        layout.addProject(project, container);
    });

    showProjects();
}

function showProjects(index=-1) {
    if (index !== -1) projects[index++].dom.classList.remove("invisible");
    else index = 0;
    if (index < projects.length) setTimeout(showProjects.bind(this, index), Math.min((2500/projects.length), 300));
}

function addNewProject() {
    let form = document.querySelector(".project-form");
    let title = form.querySelector(".name-input");
    let date = form.querySelector(".date");
    let desc = form.querySelector(".description");

    if (title.value === "") {
        title.style["outline"] = "2px solid red";
        title.style["border"] = "none";
        title.focus();
        return;
    }

    let newProject = new Project(title.value, desc.value, date.value);
    projects.push(newProject);

    newProject.dom.classList.add("invisible");
    layout.addProject(newProject);
    setTimeout(() => newProject.dom.classList.remove("invisible"), 50);

    layout.closeForm();
}

function removeProject(event, obj) {
    event.stopPropagation();
    projects.splice((projects.indexOf(obj)), 1);
    Dom.removeDOM(obj.dom);
}

function openProject(obj) {
    if (!obj) obj = projects[0];
    console.log("Opened project");
    Dom.clearMain();
    tasks.openTasks(obj);
}

export default {populateProjects, addNewProject, removeProject, openProject};