class DeckSelectMenu extends Menu {
    constructor(params) {
        super(params);
        this.deckSelectMenuMode = null;
        this.createDeckElement = null;
        this.deckElements = [];
    }

    update() {

    }

    launch() {
        this.addElement("deck-select-menu",
            `<h1>Select Deck</h1>
            <button type="button" class="create-deck">Create Deck</button>    
            <button type="button" class="back-button">Back</button>`);
        this.createDeckElement = document.querySelector(".create-deck");
        this.backButtonElement = document.querySelector(".back-button");

        this.createDeckElement.addEventListener("mousedown", event => {
            this.gameEngine.changeMenu(this, this.gameEngine.deckEditMenu);
        });

        this.backButtonElement.addEventListener("mousedown", event => {
            if (this.deckSelectMenuMode === DeckSelectMenuMode.PlayArena) {
                this.gameEngine.changeMenu(this, this.gameEngine.playSelectMenu);
            }
            else if (this.deckSelectMenuMode === DeckSelectMenuMode.PlayAdventure) {
                this.gameEngine.changeMenu(this, this.gameEngine.playSelectMenu);
            }
            else if (this.deckSelectMenuMode === DeckSelectMenuMode.DeckEdit) {
                this.gameEngine.changeMenu(this, this.gameEngine.mainMenu);
            }
        })
    }

    addDeckElement() {
        let newElement = document.createElement("button");
        newElement.setAttribute("type", "button");
        newElement.classList.add(`deck-${this.deckElements.length}`);
        newElement.innerHTML = (`Deck ${this.deckElements.length}`);
        this.element.appendChild(newElement);
        this.deckElements.push(newElement);
        console.log(this.deckElements);
    }
}

window.DeckSelectMenuMode = {
    PlayArena: {},
    PlayAdventure: {},
    DeckEdit: {}
}

/*
    if (this.deckSelectMenuMode === DeckSelectMenuMode.PlayArena) {

    }
    else if (this.deckSelectMenuMode === DeckSelectMenuMode.PlayAdventure) {

    }
    else if (this.deckSelectMenuMode === DeckSelectMenuMode.DeckEdit) {

    }
*/