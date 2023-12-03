class DeckEditMenu extends Menu {
    constructor(params) {
        super(params);

        this.tierOneUnitElements = [];
        this.tierOneItemElements = [];
        this.tierTwoUnitElements = [];
        this.tierTwoItemElements = [];
        this.tierThreeUnitElements = [];
        this.tierThreeItemElements = [];
    }

    update() {
        //this.drawCardObjects();
    }

    launch() {
        this.createMenuElement("deck-edit-menu",
            `
            <div class="deck-edit-header">
                <form>
                    <textarea id="deck-name-ta" name="deck-name-ta" rows="1" cols="50" placeholder="Deck Name..."></textarea>
                </form>
                <button type="button" class="deck-save-button">
                    Save
                </button>
                <button type="button" class="deck-discard-button">
                    Discard
                </button>
                <button type="button" class="deck-delete-button">
                    Delete
                </button>
            </div>
            <div class="deck-edit-trunk">
                <div class="tier-one-elements">
                    <h3 class="tier-number">Tier 1 Units</h3>
                    <div class="tier-one-units"></div>
                    <h3 class="tier-number">Tier 1 Items</h3>
                    <div class="tier-one-items"></div>
                </div>
                <div class="tier-two-elements">
                <h3 class="tier-number">Tier 2 Units</h3>
                    <div class="tier-two-units"></div>
                    <h3 class="tier-number">Tier 2 Items</h3>
                    <div class="tier-two-items"></div>
                </div>
                <div class="tier-three-elements">
                <h3 class="tier-number">Tier 3 Units</h3>
                    <div class="tier-three-units"></div>
                    <h3 class="tier-number">Tier 3 Items</h3>
                    <div class="tier-three-items"></div>
                </div>
            </div>
            `
        );
        this.deckSaveButton = document.querySelector(".deck-save-button");
        this.tierOneUnits = document.querySelector(".tier-one-units");
        this.tierOneItems = document.querySelector(".tier-one-items");
        this.tierTwoUnits = document.querySelector(".tier-two-units");
        this.tierTwoItems = document.querySelector(".tier-two-items");
        this.tierThreeUnits = document.querySelector(".tier-three-units");
        this.tierThreeItems = document.querySelector(".tier-three-items");

        //Tier 1 and Tier 2 Unit Rects
        for (let i = 0; i < 8; i++) {
            const tierOneUnitElement = this.getCreatedCardElement();
            this.tierOneUnits.appendChild(tierOneUnitElement);
            this.tierOneUnitElements.push(tierOneUnitElement);

            const tierTwoUnitElement = this.getCreatedCardElement();
            this.tierTwoUnits.appendChild(tierTwoUnitElement);
            this.tierTwoUnitElements.push(tierTwoUnitElement);
        }

        //Tier 3 Unit, Tier 1 Item, and Tier 2 Item Rects
        for (let i = 0; i < 4; i++) {
            const tierThreeUnitElement = this.getCreatedCardElement();
            this.tierThreeUnits.appendChild(tierThreeUnitElement);
            this.tierThreeUnitElements.push(tierThreeUnitElement);

            const tierOneItemElement = this.getCreatedCardElement();
            this.tierOneItems.appendChild(tierOneItemElement);
            this.tierOneItemElements.push(tierOneItemElement);

            const tierTwoItemElement = this.getCreatedCardElement();
            this.tierTwoItems.appendChild(tierTwoItemElement);
            this.tierTwoItemElements.push(tierTwoItemElement);
        }

        //Tier 3 Item Rects
        for (let i = 0; i < 2; i++) {
            const tierThreeItemElement = this.getCreatedCardElement();
            this.tierThreeItems.appendChild(tierThreeItemElement);
            this.tierThreeItemElements.push(tierThreeItemElement);
        }

        this.tierOneUnitElements.map(unit => {
            unit.addEventListener("mousedown", event => {
                this.createCardDisplayElement(this.gameEngine.cardSampleImage.src, "Yasuo", 4, 4, 4, "HASAGI! *Whirling wind sounds.*");
            });
        })
    }

    getCreatedCardElement() {
        const element = document.createElement("img");
        element.classList.add("card-element");
        element.setAttribute("src", `${this.gameEngine.cardSampleImage.src}`);
        return element;
    }

    
}
/*
constructor(params) {
    super(params);

    //Elements & Rects
    this.deckContainer = null;
    this.trunkContainer = null;
    this.deckBinder = null;
    this.trunkBinder = null;
    this.deckBinderRect = null;
    this.trunkBinderRect = null;

    this.slotsPerPage = 32;
    this.trunkSlots = [];
    this.deckSlotRects = [];
    this.trunkSlotRects = [];
}

onMouseMove = event => {
    this.onMouseMoveOnCard(event);
}

onMouseDown = event => {
    this.onMouseDownOnCard(event);

    if(this.isMouseInRect(this.discardRect)){
        this.gameEngine.changeMenu(this, this.gameEngine.mainMenu);
    }
}

onMouseOut = event => {
    console.log("Mouse is outside of canvas");
    this.onMouseUpOnCard(event);
}

onMouseUp = event => {
    if(this.isCardInRect(this.cardObjects[this.holdingCardID], this.deckBinderRect)){
        let newCardElement = document.createElement("div");
        newCardElement.classList.add("card");
        newCardElement.innerHTML = (`${this.cardObjects[this.holdingCardID].name}`);

        if(this.cardObjects[this.holdingCardID].tier == 1){
            this.tierOneCards.appendChild(newCardElement);
        }
        else if(this.cardObjects[this.holdingCardID].tier == 2){
            this.tierTwoCards.appendChild(newCardElement);
        }
        else if(this.cardObjects[this.holdingCardID].tier == 3){
            this.tierThreeCards.appendChild(newCardElement);
        }
    }

    this.onMouseUpOnCard(event);
}

update() {
    this.gameEngine.canvas.onmousedown = this.onMouseDown;
    this.gameEngine.canvas.onmousemove = this.onMouseMove;
    this.gameEngine.canvas.onmouseout = this.onMouseOut;
    this.gameEngine.canvas.onmouseup = this.onMouseUp;

    this.cardObjects.map(card => {
        if (!this.isHoldingCard) { //Return to original position
            card.x = card.baseX;
            card.y = card.baseY;
        }
    })

    //this.drawCardObjects();
    //this.drawHoldingCard();
    this.tryDrawCardObject(this.cardObjects[0]);
}

launch() {
    //Elements
    this.addMenuElement("deck-edit-menu",
        `<div class="deck-container">
            <div class="deck-binder">
                <div class="tier-1-cards">
                    <h3 class="tier">Tier 1</h3>
                </div>
                <div class="tier-2-cards">
                    <h3 class="tier">Tier 2</h3>
                </div>
                <div class="tier-3-cards">
                    <h3 class="tier">Tier 3</h3>
                </div>
            </div>
            <div class="deck-footer">
                <button type="button" class="save-button">Save</button>
                <button type="button" class="discard-button">Discard</button>
                <button type="button" class="delete-button">Delete</button>
            </div>
        </div>
        <div class="trunk-container">
            <div class="trunk-binder">
            </div>
        </div>`
    );
    this.deckContainer = document.querySelector(".deck-container");
    this.trunkContainer = document.querySelector(".trunk-container");
    this.deckBinder = document.querySelector(".deck-binder");
    this.trunkBinder = document.querySelector(".trunk-binder");

    //Binder Rects
    this.deckBinderRect = this.deckBinder.getBoundingClientRect();
    this.deckBinderRect.x -= this.gameEngine.containerRect.x;
    this.deckBinderRect.y -= this.gameEngine.containerRect.y;
    this.trunkBinderRect = this.trunkBinder.getBoundingClientRect();
    this.trunkBinderRect.x -= this.gameEngine.containerRect.x;
    this.trunkBinderRect.y -= this.gameEngine.containerRect.y;

    //Deck Binder Cards
    this.tierOneCards = document.querySelector(".tier-1-cards");
    this.tierTwoCards = document.querySelector(".tier-2-cards");
    this.tierThreeCards = document.querySelector(".tier-3-cards");


    //Deck Container Buttons
    //this.discardButton = document.querySelector(".discard-button");
    //this.discardRect = this.discardButton.getBoundingClientRect();
    this.discardRect = document.querySelector(".discard-button").getBoundingClientRect();
    this.discardRect.x -= this.gameEngine.containerRect.x;
    this.discardRect.y -= this.gameEngine.containerRect.y;

    //Trunk Cards
    for (let i = 0; i < this.slotsPerPage; i++) {
        const slotElement = document.createElement("div");
        slotElement.classList.add("card-slot");
        slotElement.classList.add("trunk-slot-" + i);
        this.trunkBinder.appendChild(slotElement);
        this.trunkSlots.push(slotElement);

        const slotRect = this.trunkSlots[i].getBoundingClientRect();
        slotRect.x -= this.gameEngine.containerRect.x;
        slotRect.y -= this.gameEngine.containerRect.y;
        this.trunkSlotRects.push(slotRect);
    }

    //Card Objects
    for (let i = 0; i < this.gameEngine.gameProgress.unlockedCards; i++) {
        const cardObject = new CardObject({
            gameEngine: this.gameEngine,
            name: "card-" + i,
            x: this.trunkSlotRects[i].x,
            y: this.trunkSlotRects[i].y,
            width: this.gameEngine.cardWidth,
            height: this.gameEngine.cardHeight,
            color: `green`,
            tier: Math.floor(Math.random() * 3) + 1
        });
        this.cardObjects.push(cardObject);
    }

    this.createHeaderElements();
    
    //window event
    window.addEventListener('resize', event => {
        if (this.gameEngine.isGameResized && this != undefined) {
            /*Deck Cover
            this.deckCoverRect = this.deckCoverElement.getBoundingClientRect();
            this.deckCoverRect.x -= this.gameEngine.containerRect.x;
            this.deckCoverRect.y -= this.gameEngine.containerRect.y;
            

            //Trunk Rects
            this.trunkSlotRects = [];
            for (let i = 0; i < this.slotsPerPage; i++) {
                const slotRect = this.trunkSlots[i].getBoundingClientRect();
                slotRect.x -= this.gameEngine.containerRect.x;
                slotRect.y -= this.gameEngine.containerRect.y;
                this.trunkSlotRects.push(slotRect);
            }

            //Card Objects
            for (let i = 0; i < this.gameEngine.gameProgress.unlockedCards; i++) {
                this.cardObjects[i].baseX = this.trunkSlotRects[i].x;
                this.cardObjects[i].baseY = this.trunkSlotRects[i].y;
                this.cardObjects[i].width = this.gameEngine.cardWidth;
                this.cardObjects[i].height = this.gameEngine.cardHeight;
            }

            this.logArrays();
        }
    })
}

logArrays() {
    console.log("DeckEditMenu launch() this.deckCoverRect");
    console.log(this.deckCoverRect)
    //console.log("DeckEditMenu launch() this.trunkSlots");
    //console.log(this.trunkSlots);
    console.log("DeckEditMenu launch() this.trunkSlotRects");
    console.log(this.trunkSlotRects)
    console.log("DeckEditMenu launch() this.cardObjects");
    console.log(this.cardObjects);
}

createHeaderElements(){
    //Header Elements
    this.headerContainer = document.createElement("div");
    this.headerContainer.classList.add("header-container");
    this.gameEngine.container.appendChild(this.headerContainer);

    this.deckHeaderElement = document.createElement("div");
    this.deckHeaderElement.classList.add("deck-header-element");
    this.deckHeaderElement.innerHTML = (
        `
        <form>
            <label for="deck-name-id">Deck Name</label>
            <textarea id="deck-name-id" name="deck-name-id" rows="1" cols="50" placeholder="Deck Name"></textarea>
        </form>
        `
    );
    this.headerContainer.appendChild(this.deckHeaderElement);

    this.trunkHeaderElement = document.createElement("div");
    this.trunkHeaderElement.classList.add("trunk-header-element");
    this.trunkHeaderElement.innerHTML = (
        `
        <div class="trunk-buttons search-buttons">
            <button type="button" class="search-button"> Search </button>
            <form>
                <textarea id="deck-name-id" name="deck-name-id" rows="1" cols="50" placeholder="Search Card">
                </textarea>
            </form>
        </div>
        <div class="trunk-buttons page-buttons">
            <button type="button" class="trunk-button"> < </button>
            <button type="button" class="trunk-button"> > </button>
        </div>
        `
    );
    this.headerContainer.appendChild(this.trunkHeaderElement);
}
}
*/