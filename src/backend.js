import Dom from "./domManipulate.js";
import layout from "./layout.js";
import prj from "./projects.js";

function addProject(project) {
    let container = document.querySelector(".projects");
    container.appendChild(project.dom);
}

function openProject(project) {
}

export default {addProject, openProject};