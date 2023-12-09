class StartMenu extends AbstractMenu {
    constructor(params) {
        super(params);
        this.newGameButton = null;
        this.continueGameButton = null;
    }

    launch() {
        this.createMenuElement("start-menu",
            `<h1>Start Menu</h1>
            <button type="button" class="new-game-button">
                New Game
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
            this.gameEngine.changeMenu(this, this.gameEngine.playMenu);
        });
    }

    update() {
    }
}