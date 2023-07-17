import layout from "./layout";

const projects = [];


class Project {
    constructor(name, desc="", date="") {
        this.name = name;
        this.desc = desc;
        if (date !== "") this.dueDate = new Date(date);
        this.dom = layout.getProject(this, name);
    }
}

let defaultProject;

function initProjects() {
    defaultProject = new Project("(Default)");
    projects.push(defaultProject);

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

export default {populateProjects, addNewProject};