class PlaySelectMenu extends Menu {
    constructor(params) {
        super(params);
        this.playArenaButton = null;
        this.playAdventureButton = null;
    }

    update() {
    }

    launch() {
        this.addMenuElement("main-menu",
            `<h1>Play Menu</h1>
            <button type="button" class="play-arena-button">
                Arena
            </button>
            <button type="button" class="play-adventure-button">
                Adventure
            </button>    
            <button type="button" class="back-button">
                Back
            </button>`
        );
        this.playArenaButton = document.querySelector(".play-arena-button");
        this.playAdventureButton = document.querySelector(".play-adventure-button");
        this.backButton = document.querySelector(".back-button");

        this.playArenaButton.addEventListener("mousedown", event => {
            this.gameEngine.changeMenu(this, this.gameEngine.deckSelectMenu);
        })

        this.playAdventureButton.addEventListener("mousedown", event => {
            this.gameEngine.changeMenu(this, this.gameEngine.playAdventureMenu);
        })

        this.backButton.addEventListener("mousedown", event => {
            this.gameEngine.changeMenu(this, this.gameEngine.mainMenu);
        })
    }
}