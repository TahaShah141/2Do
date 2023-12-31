import Dom from "./domManipulate.js";
import prj from "./projects.js";
import tsks from "./tasks.js"
import {save} from "./projects.js";

function initializeBody() {
    let header = getHeader();
    let main = getMain();
    let footer = getFooter();

    document.body.appendChild(header);
    document.body.appendChild(main);
    document.body.appendChild(footer);
}

function getFooter() {
    let footer = Dom.newElement("div", "footer", "center");
    let text = Dom.newElement("p", "footer-text");

    text.textContent = "Copyright © 2023 Taha Shah";

    footer.appendChild(text);
    return footer;
}

function getHeader() {
    let header = Dom.newElement("div", "header");
    let companyBranding = Dom.newElement("div", "branding");
    let logo = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>progress-check</title><path d="M13,2.03V2.05L13,4.05C17.39,4.59 20.5,8.58 19.96,12.97C19.5,16.61 16.64,19.5 13,19.93V21.93C18.5,21.38 22.5,16.5 21.95,11C21.5,6.25 17.73,2.5 13,2.03M11,2.06C9.05,2.25 7.19,3 5.67,4.26L7.1,5.74C8.22,4.84 9.57,4.26 11,4.06V2.06M4.26,5.67C3,7.19 2.25,9.04 2.05,11H4.05C4.24,9.58 4.8,8.23 5.69,7.1L4.26,5.67M15.5,8.5L10.62,13.38L8.5,11.26L7.44,12.32L10.62,15.5L16.56,9.56L15.5,8.5M2.06,13C2.26,14.96 3.03,16.81 4.27,18.33L5.69,16.9C4.81,15.77 4.24,14.42 4.06,13H2.06M7.1,18.37L5.67,19.74C7.18,21 9.04,21.79 11,22V20C9.58,19.82 8.23,19.25 7.1,18.37Z" fill="currentColor"/></svg>';

    companyBranding.innerHTML = `<h1>2Do</h1>${logo}`;

    header.appendChild(companyBranding);
    return header;
}


function getMain() {
    let main = Dom.newElement("div", "main");
    prj.loadProjects(main);
    return main;
}

function openNewProjectForm() {
    console.log("form opened");
    const main = document.querySelector(".main");
    main.removeChild(document.querySelector(".add-button"));

    let form = Dom.newElement("div", "project-form");
    form.classList.add("closed");
    let projectName = Dom.newElement("input", "name-input");
    projectName.placeholder = "Project Name";
    projectName.required = true;

    let dateLabel = Dom.newElement("label", "date-label");
    dateLabel.textContent = "Due Date:";
    let dueDateCalender = Dom.newElement("input", "date");
    dueDateCalender.type = "date";
    dueDateCalender.value = null;

    let dueDate = Dom.newElement("div", "due-date");
    dueDate.appendChild(dateLabel);
    dueDate.appendChild(dueDateCalender);

    let desc = Dom.newElement("input", "description");
    desc.placeholder = "Description";

    let buttons = Dom.newElement("div", "form-buttons");
    let confirmButton = Dom.newElement("div", "confirm");
    let confirm = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check</title><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" fill="currentColor"/></svg>';
    confirmButton.innerHTML = `${confirm}`;
    confirmButton.addEventListener("click", prj.addNewProject);
    let cancelButton = Dom.newElement("div", "cancel");
    let cancel = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" fill="currentColor"/></svg>';
    cancelButton.innerHTML = `${cancel}`;
    cancelButton.addEventListener("click", closeProjectForm);
    buttons.appendChild(confirmButton);
    buttons.appendChild(cancelButton);

    form.appendChild(projectName);
    form.appendChild(dueDate);
    form.appendChild(desc);
    form.appendChild(buttons);

    main.appendChild(form);

    setTimeout(() => form.classList.remove("closed"), 50);
    main.addEventListener("click", closeProjectForm);
    form.addEventListener("click", (e) => {e.stopPropagation()});
    projectName.focus();
}

function closeProjectForm() {
    let form = document.querySelector(".project-form");
    form.classList.add("closed");

    console.log("form closed");
    let main = document.querySelector(".main");
    setTimeout(() => 
    {        
        main.removeChild(form);
        let addButton = prj.getAddButton();
        main.appendChild(addButton);
        main.removeEventListener("click", closeProjectForm);
    }
    ,500);
}

function getProject(obj, projectName) {
    let project = Dom.newElement("div", "project");

    let content = Dom.newElement("div", "project-content");
    let name = Dom.newElement("p", "project-name");
    name.textContent = `${projectName}`
    let button = getProjectButtons();
    button.addEventListener("click", (e) => prj.removeProject(e, obj))
    content.appendChild(name);
    content.appendChild(button);

    project.appendChild(content);
    project.addEventListener("click", () => prj.openProject(obj));
    return project;
}

function getProjectButtons() {
    let button = Dom.newElement("div", "project-buttons");
    let remove = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>select-remove</title><path d="M21 20C21 20.55 20.55 21 20 21H19V19H21V20M15 21V19H17V21H15M11 21V19H13V21H11M7 21V19H9V21H7M4 21C3.45 21 3 20.55 3 20V19H5V21H4M3 15H5V17H3V15M21 15V17H19V15H21M14.59 8L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41L14.59 8M3 11H5V13H3V11M21 11V13H19V11H21M3 7H5V9H3V7M21 7V9H19V7H21M4 3H5V5H3V4C3 3.45 3.45 3 4 3M20 3C20.55 3 21 3.45 21 4V5H19V3H20M15 5V3H17V5H15M11 5V3H13V5H11M7 5V3H9V5H7Z" fill="currentColor"/></svg>'

    button.innerHTML = `${remove}`;

    return button;
}

function addProject(project, container) {
    if (!container) container = document.querySelector(".projects");
    container.appendChild(project.dom);
}

function addTask(task, container) {
    if (!container) container = document.querySelector(".task-container");
    container.appendChild(task.dom);
}

function getTaskHeader(project) {
    let projectHeader = Dom.newElement("div", "project-header");
    let backButton = getBackButton();

    let projectName = Dom.newElement("div", "name", "center");
    projectName.appendChild(Dom.newPara(`${project.name}`, "project-name", "center-text"))

    let projectDesc = Dom.newElement("div", "project-desc", "center")
    projectDesc.appendChild(Dom.newPara(`${project.desc}`, "secondary-text"));

    let projectDue = Dom.newElement("div", "project-due", "center");
    let date = project.dueDate;
    if (typeof(project.dueDate) !== "string") date = project.dueDate.toDateString();
    projectDue.appendChild(Dom.newPara(`${date}`, "due"));

    let addTask = getAddTaskButton();

    projectHeader.appendChild(backButton);
    projectHeader.appendChild(projectName);
    projectHeader.appendChild(projectDesc);
    projectHeader.appendChild(projectDue);
    projectHeader.appendChild(addTask);

    return projectHeader;
}

function getTask(taskObj) {
    let task = Dom.newElement("div", "task");
    let taskName = Dom.newPara(`${taskObj.subject}`, "task-name");
    let taskDesc = Dom.newPara(`${taskObj.desc}`, "task-desc");
    let colors = ["#34eb34", "yellow", "#f82d2d"];
    task.style["border"] = `3px solid ${colors[taskObj.priority]}`;

    task.appendChild(taskName);
    task.appendChild(taskDesc);

    task.addEventListener("click", function() {this.classList.toggle("completed"); taskObj.completed = !taskObj.completed; save();});
    let delButton = Dom.newElement("div", "delete-task-button");
    delButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" fill="currentColor"/></svg>';
    delButton.addEventListener("click", (e) => tsks.removeTask(e, taskObj));
    task.appendChild(delButton);
    return task;
}

function getBackButton() {
    let backButton = Dom.newElement("div", "back-button");
    backButton.addEventListener("click", () => {Dom.clearMain(); prj.loadProjects()})
    let back = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>arrow-left</title><path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" fill="currentColor" /></svg>';
    backButton.innerHTML = `${back}`;
    return backButton;
}

function getAddTaskButton() {
    let addButton = Dom.newElement("div", "add-task");
    let plusSign = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor"/></svg>';
    addButton.innerHTML = `${plusSign}`;
    addButton.addEventListener("click", openNewTaskForm);
    return addButton;
}

function openNewTaskForm() {
    if (document.querySelector(".task-form")) return;

    let form = Dom.newElement("div", "task", "task-form", "invisible");
    let header = Dom.newElement("div", "form-header");

    let subjectInput = Dom.newElement("input", "task-subject");
    subjectInput.placeholder = "Task Name";
    let priorities = getFormPriorities();
    
    header.appendChild(subjectInput);
    header.appendChild(priorities);

    console.log("here");

    let footer = Dom.newElement("div", "form-footer");
    let descInput = Dom.newElement("input", "task-description");
    descInput.placeholder = "Task Description"
    let formButtons = Dom.newElement("div", "task-form-buttons");
    let confirm = Dom.newElement("button", "confirm");
    confirm.textContent = "confirm";
    confirm.addEventListener("click", tsks.addNewTask.bind(this, form));
    let cancel = Dom.newElement("button", "cancel");
    cancel.textContent = "cancel";
    cancel.addEventListener("click", closeTaskForm)

    formButtons.appendChild(cancel);
    formButtons.appendChild(confirm);

    footer.appendChild(descInput);
    footer.appendChild(formButtons);

    form.appendChild(header);
    form.appendChild(footer);
    let tasks = document.querySelector(".task-container");
    tasks.appendChild(form);
    setTimeout(function() {form.classList.remove("invisible")}, 200);
    subjectInput.focus();
}

function getFormPriorities() {
    let container = Dom.newElement("div", "priorities");
    let colors = ["#34eb34", "yellow", "#f82d2d"];
    for (let i = 0; i < 3; i++) {
        let priority = Dom.newElement("div", "form-priority");
        priority.addEventListener("click", selectMe);
        priority.style["background-color"] = colors[i];
        container.appendChild(priority);
    }
    container.firstChild.classList.add("selected");
    return container;
}

function selectMe() {
    let priorities = this.parentNode.querySelectorAll(".form-priority");
    priorities.forEach(priority => priority.classList.remove("selected"));
    this.classList.add("selected");
}

function closeTaskForm() {
    Dom.removeDOM(document.querySelector(".task-form"));
}


export default {initializeBody, getProject, addProject, openNewProjectForm, closeProjectForm, getTask, addTask, getTaskHeader};