class StartMenu extends Menu {
    constructor(params) {
        super(params);
        this.gameEngine.previousMenu = null;
        this.newGameButton = null;
        this.continueGameButton = null;
    }

    update() {
    }

    launch() {
        this.addMenuElement("start-menu",
            `<h1>Start Menu</h1>
            <button type="button" class="new-game-button">
                <img src=${this.gameEngine.buttonDefaultImage.src} alt="Button Default">
            </button>
            <button type="button" class="continue-game-button">
                Continue Game
            </button>`
        );
        this.newGameButton = document.querySelector(".new-game-button");
        this.continueGameButton = document.querySelector(".continue-game-button");

        this.newGameButton.addEventListener("mousedown", event => {
            this.gameEngine.changeMenu(this, this.gameEngine.mainMenu);
        });

        this.continueGameButton.addEventListener("mousedown", event => {
            this.gameEngine.changeMenu(this, this.gameEngine.deckEditMenu);
        });
    }
}