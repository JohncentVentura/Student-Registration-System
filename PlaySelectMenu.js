class PlaySelectMenu extends Menu {
    constructor(params) {
        super(params);
        this.playWorldKingdomButton = null;
        this.playWorldTreeButton = null;
        this.playUnderworldButton = null;
    }

    update() {
    }

    launch() {
        this.createMenuElement("play-select-menu",
            `<h1>Select world to play</h1>
            <button type="button" class="play-worldkingdom-button">
                World Kingdom
            </button>
            <button type="button" class="play-worldtree-button">
                World Tree
            </button>    
            <button type="button" class="play-underworld-button">
                Underworld
            </button>   
            <button type="button" class="back-button">
                Back
            </button>`
        );
        this.playWorldKingdomButton = document.querySelector(".play-worldkingdom-button");
        this.playWorldTreeButton = document.querySelector(".play-worldtree-button");
        this.playUnderworldButton = document.querySelector(".play-underworld-button");
        this.backButton = document.querySelector(".back-button");

        this.playWorldKingdomButton.addEventListener("mousedown", event => {
            this.gameEngine.changeMenu(this, this.gameEngine.deckSelectMenu);
        })

        this.playWorldTreeButton.addEventListener("mousedown", event => {
            this.gameEngine.changeMenu(this, this.gameEngine.deckSelectMenu);
        })

        this.playUnderworldButton.addEventListener("mousedown", event => {
            this.gameEngine.changeMenu(this, this.gameEngine.deckSelectMenu);
        })

        this.backButton.addEventListener("mousedown", event => {
            this.gameEngine.changeMenu(this, this.gameEngine.mainMenu);
        })
    }
}