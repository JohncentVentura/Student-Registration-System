class MainMenu extends Menu {
    constructor(params) {
        super(params);
        this.gameEngine.previousMenu = this.gameEngine.startMenu;
        this.playMenuElement = null;
        this.deckMenuElement = null;
    }

    update() {
    }

    launch() {
        this.addElement("main-menu",
            `<h1>Main Menu</h1>
            <button type="button" class="play-menu">Play</button>
            <button type="button" class="deck-menu">Deck</button>    
            <button type="button" class="back-button">Back</button>`);
        this.playMenuElement = document.querySelector(".play-menu");
        this.deckMenuElement = document.querySelector(".deck-menu");
        this.backButtonElement = document.querySelector(".back-button");

        this.playMenuElement.addEventListener("mousedown", event => {
            this.gameEngine.changeMenu(this, this.gameEngine.playSelectMenu);
        })

        this.deckMenuElement.addEventListener("mousedown", event => {
            this.gameEngine.changeMenu(this, this.gameEngine.deckSelectMenu);
        })

        this.backButtonElement.addEventListener("mousedown", event => {
            this.gameEngine.changeMenu(this, this.gameEngine.startMenu);
        })
    }
}