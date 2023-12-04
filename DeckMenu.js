class DeckMenu extends Menu {
    constructor(params) {
        super(params);

        this.rankOneUnitElements = [];
        this.rankOneItemElements = [];
        this.rankTwoUnitElements = [];
        this.rankTwoItemElements = [];
        this.rankThreeUnitElements = [];
        this.rankThreeItemElements = [];
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
                <div class="rank-one-elements">
                    <h3 class="rank-number"> Rank 1 Units </h3>
                    <div class="rank-one-units"></div>
                    <h3 class="rank-number"> Rank 1 Items </h3>
                    <div class="rank-one-items"></div>
                </div>
                <div class="rank-two-elements">
                    <h3 class="rank-number"> Rank 2 Units </h3>
                    <div class="rank-two-units"></div>
                    <h3 class="rank-number"> Rank 2 Items </h3>
                    <div class="rank-two-items"></div>
                </div>
                <div class="rank-three-elements">
                    <h3 class="rank-number"> Rank 3 Units </h3>
                    <div class="rank-three-units"></div>
                    <h3 class="rank-number"> Rank 3 Items </h3>
                    <div class="rank-three-items"></div>
                </div>
            </div>
            `
        );
        this.deckSaveButton = document.querySelector(".deck-save-button");
        this.rankOneUnitsDiv = document.querySelector(".rank-one-units");
        this.rankOneItemsDiv = document.querySelector(".rank-one-items");
        this.rankTwoUnitsDiv = document.querySelector(".rank-two-units");
        this.rankTwoItemsDiv = document.querySelector(".rank-two-items");
        this.rankThreeUnitsDiv = document.querySelector(".rank-three-units");
        this.rankThreeItemsDiv = document.querySelector(".rank-three-items");

        //Creating Units Element & Adding Event Listener to each Units Element
        for (let i = 0; i < 12; i++) {
            const rankOneUnitElement = this.getCreatedCardElement(this.gameEngine.rankOneUnits[i].imageSrc, 
                this.gameEngine.rankOneUnits[i].race, this.gameEngine.rankOneUnits[i].role);
            this.rankOneUnitsDiv.appendChild(rankOneUnitElement);
            this.rankOneUnitElements.push(rankOneUnitElement);

            this.rankOneUnitElements[i].addEventListener("mousedown", event => {
                this.createCardDisplayElement(
                    this.gameEngine.rankOneUnits[i].imageSrc,
                    this.gameEngine.rankOneUnits[i].name,
                    this.gameEngine.rankOneUnits[i].rank,
                    this.gameEngine.rankOneUnits[i].race,
                    this.gameEngine.rankOneUnits[i].role,
                    this.gameEngine.rankOneUnits[i].attack,
                    this.gameEngine.rankOneUnits[i].health,
                    this.gameEngine.rankOneUnits[i].effectDesc
                );
            });
            
            const rankTwoUnitElement = this.getCreatedCardElement(this.gameEngine.rankTwoUnits[i].imageSrc, 
                this.gameEngine.rankTwoUnits[i].race, this.gameEngine.rankTwoUnits[i].role);
            this.rankTwoUnitsDiv.appendChild(rankTwoUnitElement);
            this.rankTwoUnitElements.push(rankTwoUnitElement);

            this.rankTwoUnitElements[i].addEventListener("mousedown", event => {
                this.createCardDisplayElement(
                    this.gameEngine.rankTwoUnits[i].imageSrc,
                    this.gameEngine.rankTwoUnits[i].name,
                    this.gameEngine.rankTwoUnits[i].rank,
                    this.gameEngine.rankTwoUnits[i].race,
                    this.gameEngine.rankTwoUnits[i].role,
                    this.gameEngine.rankTwoUnits[i].attack,
                    this.gameEngine.rankTwoUnits[i].health,
                    this.gameEngine.rankTwoUnits[i].effectDesc
                );
            });

            const rankThreeUnitElement = this.getCreatedCardElement(this.gameEngine.rankThreeUnits[i].imageSrc, 
                this.gameEngine.rankThreeUnits[i].race, this.gameEngine.rankThreeUnits[i].role);
            this.rankThreeUnitsDiv.appendChild(rankThreeUnitElement);
            this.rankThreeUnitElements.push(rankThreeUnitElement);

            this.rankThreeUnitElements[i].addEventListener("mousedown", event => {
                this.createCardDisplayElement(
                    this.gameEngine.rankThreeUnits[i].imageSrc,
                    this.gameEngine.rankThreeUnits[i].name,
                    this.gameEngine.rankThreeUnits[i].rank,
                    this.gameEngine.rankThreeUnits[i].race,
                    this.gameEngine.rankThreeUnits[i].role,
                    this.gameEngine.rankThreeUnits[i].attack,
                    this.gameEngine.rankThreeUnits[i].health,
                    this.gameEngine.rankThreeUnits[i].effectDesc
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

    getCreatedCardElement(imageSrc, race, role) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card-element");

        const cardImage = document.createElement("img");
        cardImage.classList.add("card-image");
        cardImage.setAttribute(`src`, `${imageSrc}`);
        cardElement.appendChild(cardImage); 

        const cardStats = document.createElement("div");
        cardStats.classList.add("card-stats");
        cardElement.appendChild(cardStats);

        const cardRace = document.createElement("div");
        cardRace.classList.add("card-race");
        cardRace.innerHTML = (`${Types.RaceIcon[race]}`);
        cardStats.appendChild(cardRace);

        const cardRole = document.createElement("div");
        cardRole.classList.add("card-role");
        cardRole.innerHTML = (`${Types.RoleIcon[role]}`);
        cardStats.appendChild(cardRole);

        /*
        const cardAttack = document.createElement("div");
        cardAttack.classList.add("card-attack");
        cardAttack.innerHTML = (`1⚔️`);
        cardStats.appendChild(cardAttack);

        const cardHealth = document.createElement("div");
        cardHealth.classList.add("card-health");
        cardHealth.innerHTML = (`1❤️`);
        cardStats.appendChild(cardHealth);
        */

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