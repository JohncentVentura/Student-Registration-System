class StartMenu extends Menu {
    constructor(params) {
        super(params);
        this.gameEngine.previousMenu = null;
        this.newGameButton = null;
        this.continueGameButton = null;
        this.newGameButtonImgSrc = "/Assets/DemoBG1.png";
    }

    update() {

    }

    launch() {
        this.addElement("start-menu",
            `<h1>Start Menu</h1>
            <button type="button" class="new-game-button">
                <img src=${this.newGameButtonImgSrc} alt="this.newGameInputSrc1">
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
            this.gameEngine.changeMenu(this, this.gameEngine.battleMenu);
        });
    }
}