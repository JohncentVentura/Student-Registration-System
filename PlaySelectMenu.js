class PlaySelectMenu extends Menu {
    constructor(params) {
        super(params);
        this.gameEngine.previousMenu = this.gameEngine.mainMenu;
        this.playArenaElement = null;
        this.playAdventureElement = null;
    }

    update() {

    }

    launch() {
        this.addElement("main-menu",
            `<h1>Play Menu</h1>
            <button type="button" class="play-arena">Arena</button>
            <button type="button" class="play-adventure">Adventure</button>    
            <button type="button" class="back-button">Back</button>`);
        this.playArenaElement = document.querySelector(".play-arena");
        this.playAdventureElement = document.querySelector(".play-adventure");
        this.backButtonElement = document.querySelector(".back-button");

        this.playArenaElement.addEventListener("mousedown", event => {
            this.gameEngine.changeMenu(this, this.gameEngine.deckSelectMenu);
        })

        this.playAdventureElement.addEventListener("mousedown", event => {
            this.gameEngine.changeMenu(this, this.gameEngine.deckSelectMenu);
        })

        this.backButtonElement.addEventListener("mousedown", event => {
            this.gameEngine.changeMenu(this, this.gameEngine.mainMenu);
        })
    }
}