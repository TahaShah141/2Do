import backend from "./backend";
import layout from "./layout";

const projects = [];

class Project {
    constructor(name) {
        this.name = name;
        this.dom = layout.getProject(this, name);
    }
}

function testing() {
    for (let i = 0; i < 7; i++) {
        projects.push(new Project(`test ${i+1}`));
    }

    populateProjects();
    showProjects();
}

function populateProjects() {
    projects.forEach(project => {
        project.dom.classList.add("invisible");
        backend.addProject(project);
    });
}

function showProjects(index=-1) {
    if (index !== -1) projects[index++].dom.classList.remove("invisible");
    else index = 0;
    if (index < projects.length) setTimeout(showProjects.bind(this, index), 2500/projects.length);
}

function addNewProject() {
    const form = document.querySelector(".project-form");
    console.log(form);
}

export default {projects, Project, testing, addNewProject};