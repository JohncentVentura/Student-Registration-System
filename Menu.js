class Menu {
    constructor(params) {
        this.gameEngine = params.gameEngine;
        this.element = null;
    }

    update(){

    }

    launch(){
        
    }

    addElement(container, tagName, classList, innerHTML) {
        this.element = document.createElement(tagName);
        this.element.classList.add("menu");
        this.element.classList.add(classList);
        this.element.innerHTML = innerHTML;
        container.appendChild(this.element);
    }
}