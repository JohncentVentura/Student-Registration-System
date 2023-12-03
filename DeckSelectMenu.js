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
        this.createMenuElement("deck-select-menu",
            `<h1>Select Deck</h1>`
        );

        /*
        //Creating Playable Decks Buttons
        for(let i = 0; i < this.gameEngine.gameProgress.playableDecks; i++){
            const deckButton = document.createElement("button");
            deckButton.setAttribute("type", 'button');
            deckButton.classList.add(`deck-button-${i}`);
            deckButton.innerHTML = (`New Deck ${i}`);
            this.element.appendChild(deckButton);
            this.playableDeckButtons.push(deckButton);
        }
        */

        if (this.deckSelectMenuMode === DeckSelectMenuMode.PlayDeck) {
            for (let i = 0; i < this.gameEngine.gameProgress.playableDecks; i++) {
                this.createDeckElement(this.gameEngine.cardSampleImage.src);
            }
        }
        else if (this.deckSelectMenuMode === DeckSelectMenuMode.ViewDeck) {
            
        }
        

        //Creating Back Button
        this.backButton = document.createElement("button");
        this.backButton.setAttribute("type", "button");
        this.backButton.classList.add("back-button");
        this.backButton.innerHTML = ("Back");
        this.element.appendChild(this.backButton);

        this.playableDeckButtons.map(deck => {
            deck.addEventListener("mousedown", event => {
                if (this.deckSelectMenuMode === DeckSelectMenuMode.PlayDeck) {
                    this.gameEngine.changeMenu(this, this.gameEngine.playBattleMenu);
                }
                else if (this.deckSelectMenuMode === DeckSelectMenuMode.ViewDeck) {
                    this.gameEngine.changeMenu(this, this.gameEngine.deckEditMenu);
                }
            })
        })

        this.backButton.addEventListener("mousedown", event => {
            if (this.deckSelectMenuMode === DeckSelectMenuMode.PlayDeck) {
                this.gameEngine.changeMenu(this, this.gameEngine.playSelectMenu);
            }
            else if (this.deckSelectMenuMode === DeckSelectMenuMode.ViewDeck) {
                this.gameEngine.changeMenu(this, this.gameEngine.mainMenu);
            }
        })
    }

    createDeckElement(imageSrc) {
        const deckElement = document.createElement("div");
        deckElement.classList.add("deck-element");

        const deckImage = document.createElement("img");
        deckImage.classList.add("deck-image");
        deckImage.setAttribute("src", `${imageSrc}`);
        deckElement.appendChild(deckImage);

        const deckButtonContainer = document.createElement("div");
        deckButtonContainer.classList.add("deck-button-container");
        deckElement.appendChild(deckButtonContainer);

        const playDeckButton = document.createElement("button");
        playDeckButton.classList.add("deck-button");
        playDeckButton.setAttribute("type", "button");
        playDeckButton.innerHTML = (`Play`);
        deckButtonContainer.appendChild(playDeckButton);

        const editDeckButton = document.createElement("button");
        editDeckButton.classList.add("deck-button");
        editDeckButton.setAttribute("type", "button");
        editDeckButton.innerHTML = (`Edit`);
        deckButtonContainer.appendChild(editDeckButton);

        this.element.appendChild(deckElement);

        playDeckButton.addEventListener("mousedown", event => {
            this.gameEngine.changeMenu(this, this.gameEngine.playBattleMenu);
        });

        editDeckButton.addEventListener("mousedown", event => {
            this.gameEngine.changeMenu(this, this.gameEngine.deckEditMenu);
        });
    }
}

window.DeckSelectMenuMode = {
    PlayDeck: {},
    ViewDeck: {}
}

/*
    if (this.deckSelectMenuMode === DeckSelectMenuMode.PlayArena) {

    }
    else if (this.deckSelectMenuMode === DeckSelectMenuMode.PlayAdventure) {

    }
    else if (this.deckSelectMenuMode === DeckSelectMenuMode.DeckEdit) {

    }
*/