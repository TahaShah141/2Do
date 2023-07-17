function newElement(tag, ...classes) {
    let element = document.createElement(tag);
    classes.forEach(cls => element.classList.add(cls));

    return element;
}

export default {newElement};