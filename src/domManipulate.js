function newElement(tag, ...classes) {
    let element = document.createElement(tag);
    classes.forEach(cls => element.classList.add(cls));

    return element;
}

function removeDOM(dom) {
    dom.parentNode.removeChild(dom);
}

function clearMain() {
    let main = document.querySelector(".main");
    main.innerHTML = "";
    main.classList.remove("blue-gradient");
    main.classList.remove("sunset-gradient");
}

function newPara(paragraph, ...classes) {
    let para = newElement("p", ...classes);
    para.textContent = paragraph;
    return para;
}

export default {newElement, newPara, removeDOM, clearMain};