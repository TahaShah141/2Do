import layout from "./layout";
import Dom from "./domManipulate";
import tsks, {Task} from "./tasks";

const projects = [];

class Project {
    constructor(name, desc="This project has no Description", date="", tasks=[]) {
        this.name = name;
        if (desc !== "") this.desc = desc;
        else this.desc = "This project has no Description";
        if (date !== "" && !(!date)) this.dueDate = new Date(date);
        else this.dueDate = "No Due Date";
        
        this.dom = layout.getProject(this, name);
        this.tasks = [];
        tasks.forEach(task => this.tasks.push(new Task(task.subject, task.desc, task.priority, task.completed)));
    }
}

function getDefaultProject() {
    let project = new Project("(Default)", "This is the default project for your 2Do's");
    return project;
}

function initProjects() {
    unloadProjects();
}

function unloadProjects() {
    try {
        let storedProjects = JSON.parse(localStorage["projects"]);
        storedProjects.forEach(project => projects.push(new Project(project.name, project.desc, project.dueDate, project.tasks)));
    }
    catch (e) {
        projects.push(getDefaultProject());
    }
    removeDefaultDeleteButton();
}

function removeDefaultDeleteButton() {
    Dom.removeDOM(projects[0].dom.querySelector(".project-buttons"));
}

function populateProjects(container) {
    if (projects.length === 0) initProjects();
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
    console.log(desc.value === "");
    let newProject = new Project(title.value, desc.value, date.value);
    console.log(newProject.desc);
    projects.push(newProject);

    newProject.dom.classList.add("invisible");
    layout.addProject(newProject);
    setTimeout(() => newProject.dom.classList.remove("invisible"), 50);

    layout.closeProjectForm();
    save();
}

function removeProject(event, obj) {
    event.stopPropagation();
    projects.splice((projects.indexOf(obj)), 1);
    Dom.removeDOM(obj.dom);
    save();
}

function openProject(obj) {
    if (!obj) obj = projects[0];
    console.log("Opened project");
    Dom.clearMain();
    tsks.loadTasks(obj);
}


function loadProjects(main) {
    if (!main) main = document.querySelector(".main");
    main.classList.add("blue-gradient");
    let projects = Dom.newElement("div", "projects");
    populateProjects(projects);
    let addButton = getAddButton();
    main.appendChild(projects);
    main.appendChild(addButton);
}

function getAddButton() {
    let addButton = Dom.newElement("div", "add-button");
    let plusSign = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor"/></svg>';
    addButton.innerHTML = `<p>Add Project</p>${plusSign}`;
    addButton.addEventListener("click", (e) => {e.stopPropagation();layout.openNewProjectForm();});
    return addButton;
}

function save() {
    localStorage.setItem("projects", JSON.stringify(projects));
}

export {save};
export {projects};
export default {loadProjects, addNewProject, removeProject, openProject, getAddButton};
