class Menu {
    constructor(params) {
        this.gameEngine = params.gameEngine;
        this.element = null;
        this.backButtonElement = null;
    }

    update() {

    }

    launch() {

    }

    addElement(className, innerHTML) {
        this.element = document.createElement("div");
        this.element.classList.add("menu");
        this.element.classList.add(className);
        this.element.innerHTML = innerHTML;
        this.gameEngine.container.appendChild(this.element);

        //Prevents context menu when right clicking in the canvas
        this.gameEngine.canvas.addEventListener("contextmenu", event => {
            if (event.button === 0 || event.button === 2) event.preventDefault();
        })

        //Prevents context menu when right clicking in the HTML element
        this.element.addEventListener("contextmenu", event => {
            if (event.button === 0 || event.button === 2) event.preventDefault();
        })
    }
}