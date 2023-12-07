class DeckMenu extends Menu {
    constructor(params) {
        super(params);

        this.tier1UnitElements = [];
        this.tierOneItemElements = [];
        this.tier2UnitElements = [];
        this.tierTwoItemElements = [];
        this.tier3UnitElements = [];
        this.tierThreeItemElements = [];
    }

    update() {
        //this.drawCardObjects();
    }

    launch() {
        this.createMenuElement("deck-menu",
            `
            <div class="deck-menu-header">
                <form>
                    <textarea id="deck-name-ta" name="deck-name-ta" rows="1" cols="50" placeholder="Deck Name..."></textarea>
                </form>
                <button type="button" class="deck-save-button"> Save </button>
                <button type="button" class="deck-discard-button"> Discard </button>
                <button type="button" class="deck-delete-button"> Delete </button>
            </div>  
            <div class="deck-menu-trunk">
                    <h3 class="tier-number"> Tier 1 Units </h3>
                    <div class="tier-one-units"></div>
                    <h3 class="tier-number"> Tier 1 Items </h3>
                    <div class="tier-one-items"></div>
                
                    <h3 class="tier-number"> Tier 2 Units </h3>
                    <div class="tier-two-units"></div>
                    <h3 class="tier-number"> Tier 2 Items </h3>
                    <div class="tier-two-items"></div>
                
                    <h3 class="tier-number"> Tier 3 Units </h3>
                    <div class="tier-three-units"></div>
                    <h3 class="tier-number"> Tier 3 Items </h3>
                    <div class="tier-three-items"></div>
                
            </div>
            `
        );
        this.deckDiscardButton = document.querySelector(".deck-discard-button");
        this.deckDiscardButton.addEventListener("mousedown", event => {
            this.gameEngine.changeMenu(this, this.gameEngine.playMenu);
        })

        this.tier1UnitsDiv = document.querySelector(".tier-one-units");
        this.tierOneItemsDiv = document.querySelector(".tier-one-items");
        this.tier2UnitsDiv = document.querySelector(".tier-two-units");
        this.tierTwoItemsDiv = document.querySelector(".tier-two-items");
        this.tier3UnitsDiv = document.querySelector(".tier-three-units");
        this.tierThreeItemsDiv = document.querySelector(".tier-three-items");

        //Creating Units Element & Adding Event Listener to each Units Element
        for (let i = 0; i < 12; i++) {
            const tier1UnitElement = this.getSellingCardElement(
                this.gameEngine.unlockedTier1Units[i].imageSrc,
                this.gameEngine.unlockedTier1Units[i].type1,
                this.gameEngine.unlockedTier1Units[i].type2,
                this.gameEngine.unlockedTier1Units[i].power,
                this.gameEngine.unlockedTier1Units[i].health
            );
            this.tier1UnitsDiv.appendChild(tier1UnitElement);
            this.tier1UnitElements.push(tier1UnitElement);

            this.tier1UnitElements[i].addEventListener("mousedown", event => {
                this.createCardDisplayElement(
                    this.gameEngine.unlockedTier1Units[i].imageSrc,
                    this.gameEngine.unlockedTier1Units[i].name,
                    this.gameEngine.unlockedTier1Units[i].tier,
                    this.gameEngine.unlockedTier1Units[i].type1,
                    this.gameEngine.unlockedTier1Units[i].type2,
                    this.gameEngine.unlockedTier1Units[i].power,
                    this.gameEngine.unlockedTier1Units[i].health,
                    this.gameEngine.unlockedTier1Units[i].effectDesc
                );
            });

            const tier2UnitElement = this.getSellingCardElement(
                this.gameEngine.unlockedTier2Units[i].imageSrc,
                this.gameEngine.unlockedTier2Units[i].type1,
                this.gameEngine.unlockedTier2Units[i].type2,
                this.gameEngine.unlockedTier2Units[i].power,
                this.gameEngine.unlockedTier2Units[i].health
            );
            this.tier2UnitsDiv.appendChild(tier2UnitElement);
            this.tier2UnitElements.push(tier2UnitElement);

            this.tier2UnitElements[i].addEventListener("mousedown", event => {
                this.createCardDisplayElement(
                    this.gameEngine.unlockedTier2Units[i].imageSrc,
                    this.gameEngine.unlockedTier2Units[i].name,
                    this.gameEngine.unlockedTier2Units[i].tier,
                    this.gameEngine.unlockedTier2Units[i].type1,
                    this.gameEngine.unlockedTier2Units[i].type2,
                    this.gameEngine.unlockedTier2Units[i].power,
                    this.gameEngine.unlockedTier2Units[i].health,
                    this.gameEngine.unlockedTier2Units[i].effectDesc
                );
            });

            const tier3UnitElement = this.getSellingCardElement(
                this.gameEngine.unlockedTier3Units[i].imageSrc,
                this.gameEngine.unlockedTier3Units[i].type1,
                this.gameEngine.unlockedTier3Units[i].type2,
                this.gameEngine.unlockedTier3Units[i].power,
                this.gameEngine.unlockedTier3Units[i].health
            );
            this.tier3UnitsDiv.appendChild(tier3UnitElement);
            this.tier3UnitElements.push(tier3UnitElement);

            this.tier3UnitElements[i].addEventListener("mousedown", event => {
                this.createCardDisplayElement(
                    this.gameEngine.unlockedTier3Units[i].imageSrc,
                    this.gameEngine.unlockedTier3Units[i].name,
                    this.gameEngine.unlockedTier3Units[i].tier,
                    this.gameEngine.unlockedTier3Units[i].type1,
                    this.gameEngine.unlockedTier3Units[i].type2,
                    this.gameEngine.unlockedTier3Units[i].power,
                    this.gameEngine.unlockedTier3Units[i].health,
                    this.gameEngine.unlockedTier3Units[i].effectDesc
                );
            });
        }

        /* Item Rects
        for (let i = 0; i < 4; i++) {
            const tierOneItemElement = this.getCreatedCardElement();
            this.tierOneItems.appendChild(tierOneItemElement);
            this.tierOneItemElements.push(tierOneItemElement);

            const tierTwoItemElement = this.getCreatedCardElement();
            this.tierTwoItems.appendChild(tierTwoItemElement);
            this.tierTwoItemElements.push(tierTwoItemElement);

            const tierThreeItemElement = this.getCreatedCardElement();
            this.tierThreeItems.appendChild(tierThreeItemElement);
            this.tierThreeItemElements.push(tierThreeItemElement);
        }
        */
    }

    getSellingCardElement(imageSrc, type1, type2, power, health) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card-element");

        const cardTypes = document.createElement("div");
        cardTypes.classList.add("card-types");
        cardElement.appendChild(cardTypes);

        const cardType1 = document.createElement("div");
        cardType1.innerHTML = (`${TYPES.TYPES_ICONS[type1]}`);
        cardTypes.appendChild(cardType1);

        const cardType2 = document.createElement("div");
        cardType2.innerHTML = (`${TYPES.TYPES_ICONS[type2]}`);
        cardTypes.appendChild(cardType2);

        const cardImage = document.createElement("img");
        cardImage.classList.add("card-image");
        cardImage.setAttribute(`src`, `${imageSrc}`);
        cardElement.appendChild(cardImage);

        const cardStats = document.createElement("div");
        cardStats.classList.add("card-stats");
        cardElement.appendChild(cardStats);

        const cardPower = document.createElement("div");
        cardPower.innerHTML = (`${power}⚔️`);
        cardStats.appendChild(cardPower);

        const cardHealth = document.createElement("div");
        cardHealth.innerHTML = (`${health}❤️`);
        cardStats.appendChild(cardHealth);

        return cardElement;
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