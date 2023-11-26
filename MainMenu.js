class MainMenu extends Menu {
    constructor(params) {
        super(params);
    }

    update() {
        console.log("MainMenu update");
    }

    launch() {
        this.addElement(this.gameEngine.container, "div", "main-menu",
            `<h1>Main Menu</h1>
            <button type="button">Play</button>
            <button type="button">Deck</button>`);

        this.element.addEventListener("click", ev => {
            this.element.remove();
            this.gameEngine.currentMenu = null;
            console.log("MainMenu click");
            this.gameEngine.deckSelectMenu.launch();
        });

        this.gameEngine.currentMenu = this;
    }
}