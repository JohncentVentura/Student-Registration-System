class StartMenu extends Menu {
    constructor(params) {
        super(params);
        this.gameEngine.previousMenu = null;
        this.newGameElement = null;
        this.continueGameElement = null;
    }

    update() {
        
    }

    launch() {
        this.addElement("start-menu",
            `<h1>Start Menu</h1>
            <button type="button" class="new-game">New Game</button>
            <button type="button" class="continue-game">Continue Game</button>`);
        this.newGameElement = document.querySelector(".new-game");
        this.continueGameElement = document.querySelector(".continue-game");

        this.newGameElement.addEventListener("mousedown", event => {
            this.gameEngine.changeMenu(this, this.gameEngine.mainMenu);
        });

        this.continueGameElement.addEventListener("mousedown", event => {
            this.gameEngine.changeMenu(this, this.gameEngine.deckEditMenu);
        });
    }
}