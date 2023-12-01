class MainMenu extends Menu {
    constructor(params) {
        super(params);
        this.playMenuButton = null;
        this.deckMenuButton = null;
    }

    update() {
    }

    launch() {
        this.addMenuElement("main-menu",
            `<h1>Main Menu</h1>
            <button type="button" class="play-menu-button">
                Play
            </button>
            <button type="button" class="deck-menu-button">
                Deck
            </button>    
            <button type="button" class="back-button">
                Back
            </button>`
        );
        this.playMenuButton = document.querySelector(".play-menu-button");
        this.deckMenuButton = document.querySelector(".deck-menu-button");
        this.backButton = document.querySelector(".back-button");

        this.playMenuButton.addEventListener("mousedown", event => {
            this.gameEngine.changeMenu(this, this.gameEngine.playSelectMenu);
        })

        this.deckMenuButton.addEventListener("mousedown", event => {
            this.gameEngine.changeMenu(this, this.gameEngine.deckSelectMenu);
        })

        this.backButton.addEventListener("mousedown", event => {
            this.gameEngine.changeMenu(this, this.gameEngine.startMenu);
        })
    }
}