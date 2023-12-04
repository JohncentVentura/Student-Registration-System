class MainMenu extends Menu {
    constructor(params) {
        super(params);
        this.playSelectButton = null;
        this.deckSelectButton = null;
    }

    update() {
    }

    launch() {
        this.createMenuElement("main-menu",
            `<h1>Main Menu</h1>
            <button type="button" class="play-select-button">
                Play
            </button>
            <button type="button" class="deck-select-button">
                Deck
            </button>    
            <button type="button" class="back-button">
                Back
            </button>`
        );
        this.playSelectButton = document.querySelector(".play-select-button");
        this.deckSelectButton = document.querySelector(".deck-select-button");
        this.backButton = document.querySelector(".back-button");

        this.playSelectButton.addEventListener("mousedown", event => {
            this.gameEngine.changeMenu(this, this.gameEngine.playMenu);
        })

        this.deckSelectButton.addEventListener("mousedown", event => {
            this.gameEngine.changeMenu(this, this.gameEngine.deckMenu);
        })

        this.backButton.addEventListener("mousedown", event => {
            this.gameEngine.changeMenu(this, this.gameEngine.startMenu);
        })
    }
}