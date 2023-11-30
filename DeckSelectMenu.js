class DeckSelectMenu extends Menu {
    constructor(params) {
        super(params);
        this.deckSelectMenuMode = null;
        this.createDeckButton = null;
        this.playableDeckButtons = [];
    }

    update() {

    }

    launch() {
        this.addElement("deck-select-menu",
            `<h1>Select Deck</h1>`
        );

        //Creating Playable Decks Buttons
        for(let i = 0; i < this.gameEngine.gameProgress.playableDecks; i++){
            const deckButton = document.createElement("button");
            deckButton.setAttribute("type", 'button');
            deckButton.classList.add(`deck-button-${i}`);
            deckButton.innerHTML = (`New Deck ${i}`);
            this.element.appendChild(deckButton);
            this.playableDeckButtons.push(deckButton);
        }

        //Creating Create New Deck Button
        this.createDeckButton = document.createElement("button");
        this.createDeckButton.setAttribute("type", "button");
        this.createDeckButton.classList.add("create-deck-button");
        this.createDeckButton.innerHTML = ("Create New Deck");
        this.element.appendChild(this.createDeckButton);

        //Creating Back Button
        this.backButton = document.createElement("button");
        this.backButton.setAttribute("type", "button");
        this.backButton.classList.add("back-button");
        this.backButton.innerHTML = ("Back");
        this.element.appendChild(this.backButton);

        this.playableDeckButtons.map(deck =>{
            deck.addEventListener("mousedown", event => {
                if (this.deckSelectMenuMode === DeckSelectMenuMode.PlayArena) {
                    this.gameEngine.changeMenu(this, this.gameEngine.battleMenu);
                }
                else if (this.deckSelectMenuMode === DeckSelectMenuMode.PlayAdventure) {
                    console.log("Play Adventure is still in development...");
                    this.gameEngine.changeMenu(this, this.gameEngine.mainMenu);
                }
                else if (this.deckSelectMenuMode === DeckSelectMenuMode.DeckEdit) {
                    this.gameEngine.changeMenu(this, this.gameEngine.deckEditMenu);
                }
            })
        })
        
        this.createDeckButton.addEventListener("mousedown", event => {
            this.gameEngine.changeMenu(this, this.gameEngine.deckEditMenu);
        });

        this.backButton.addEventListener("mousedown", event => {
            if (this.deckSelectMenuMode === DeckSelectMenuMode.PlayArena) {
                this.gameEngine.changeMenu(this, this.gameEngine.playSelectMenu);
            }
            else if (this.deckSelectMenuMode === DeckSelectMenuMode.PlayAdventure) {
                this.gameEngine.changeMenu(this, this.gameEngine.playAdventureMenu);
            }
            else if (this.deckSelectMenuMode === DeckSelectMenuMode.DeckEdit) {
                this.gameEngine.changeMenu(this, this.gameEngine.mainMenu);
            }
        })
    }

    addDeckElement() {
        let newElement = document.createElement("button");
        newElement.setAttribute("type", "button");
        newElement.classList.add(`deck-${this.playableDeckButtons.length}`);
        newElement.innerHTML = (`Deck ${this.playableDeckButtons.length}`);
        this.element.appendChild(newElement);
        this.playableDeckButtons.push(newElement);
        console.log(this.playableDeckButtons);
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