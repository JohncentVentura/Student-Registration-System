class StartMenu extends Menu {
    constructor(params) {
        super(params);
    }

    update() {
    }

    launch() {
        this.addElement(this.gameEngine.container, "div", "start-menu",
            `<h1>Start Menu</h1>
            <button type="button">New Game</button>
            <button type="button">Continue Game</button>`);

        this.element.addEventListener("click", ev => {
            this.element.remove();
            console.log("StartMenu click");
            this.gameEngine.deckEditMenu.launch();
        });

        
    }
}