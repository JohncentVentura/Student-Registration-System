class PlayMenu extends AbstractMenuCanvas {
    constructor(params) {
        super(params);

        this.summonFieldImage = new Image();
        this.summonFieldImage.src = "/Assets/Summon Field.png";
        this.buttonDefaultImage = new Image();
        this.buttonDefaultImage.src = "/Assets/Button Default.png";
        this.buttonHoverImage = new Image();
        this.buttonHoverImage.src = "/Assets/Button Hover.png";

        this.rollSellingCardsCost = 1;
        this.summoningCardCost = 3;
        this.sellingUnitCount = 4;
        this.sellingItemCount = 2;

        this.rolledUnitCards = [];
        this.sellingUnitCards = [];
        this.summonedUnitCards = [];

        this.sellingUnitElements = [];
        this.sellingUnitRects = [];
        this.summonedUnitElements = [];
        this.summonedUnitRects = [];
        this.summonedUnitStatsElements = [];
        this.summonedUnitStatsUpperElements = [];
        this.summonedUnitStatsLowerElements = [];

        this.constHoldingCard = undefined;
        this.constSummonedCards = [];
        this.lockedSellingCards = [];
    }

    launch() {
        this.createMenuElement("play-menu",
            `<div class="upper-container"> 
                <img src="/Assets/BG Field.png" alt="BG Field.png" class="upper-image">

                <div class="upper-left-container">
                    <div class="turn-count"></div>
                    <div class="wave-count"></div>
                    <div class="life-points"></div>
                    <div class="mana-points"></div>
                </div>

                <div class="upper-center-container">
                    <div class="summoned-types-container">
                        <h3>Types Synergies</h3>
                        <div class="active-type-synergy"></div>
                        <div class="inactive-type-synergy"></div>
                    </div>
                    <div class="summoned-units-container"></div>
                    <div class="summoned-stats-container"></div>
                </div>

                <div class="upper-right-container">
                    <button type="button" class="show-deck-button">Deck</button>
                    <button type="button" class="show-types-button">Types</button>
                </div>
            </div>

            <div class="lower-container">
                <div class="lower-left-container">
                    <button type="button" class="draw-card-button">Draw</button>
                </div>

                <div class="lower-center-container">
                </div>

                <div class="lower-right-container">
                    <button type="button" class="game-battle-button">Battle</button>
                </div>
            </div>`);
        this.element.style.setProperty('z-index', '-1'); //Canvas will be rendered before innerHTML so canvas is interactable

        //upper-header-container-elements
        this.setLifePointsElement(this.gameEngine.lifePoints);
        this.setManaPointsElement(this.gameEngine.manaPoints);
        this.setWaveCountElement(this.gameEngine.waveCount);
        this.setTurnCountElement(this.gameEngine.turnCount);

        //upper-container-elements
        this.upperContainer = document.querySelector(".upper-container");
        this.upperLeftContainer = document.querySelector(".upper-left-container");
        this.upperCenterContainer = document.querySelector(".upper-center-container");
        this.upperRightContainer = document.querySelector(".upper-right-container");
        this.summonedUnitContainer = document.querySelector(".summoned-units-container");
        this.summonedStatsContainer = document.querySelector(".summoned-stats-container");
        this.activeTypeContainer = document.querySelector(".active-type-synergy");
        this.inactiveTypeContainer = document.querySelector(".inactive-type-synergy");

        //lower-container-elements
        this.lowerContainer = document.querySelector(".lower-container");
        this.lowerLeftContainer = document.querySelector(".lower-left-container");
        this.lowerCenterContainer = document.querySelector(".lower-center-container");
        this.lowerRightContainer = document.querySelector(".lower-right-container");

        //Canvas Elements & Rects
        this.showDeckButton = document.querySelector(".show-deck-button");
        this.showTypesButton = document.querySelector(".show-types-button");
        this.drawCardButton = document.querySelector(".draw-card-button");
        this.gameBattleButton = document.querySelector(".game-battle-button");
        this.showDeckRect = this.getElementRect(this.showDeckButton);
        this.showTypesRect = this.getElementRect(this.showTypesButton);
        this.drawCardRect = this.getElementRect(this.drawCardButton);
        this.gameBattleRect = this.getElementRect(this.gameBattleButton);
        
        /*for (let i = 0; i < 5; i++) {
            const holdingCardSlot = document.createElement("div");
            holdingCardSlot.classList.add("holding-card-slot");
            holdingCardSlot.classList.add("holding-card-slot-" + i);
            this.lowerCenterContainer.appendChild(holdingCardSlot);
            this.holdingCardSlots.push(holdingCardSlot);
            const holdingCardRect = this.getElementRect(this.holdingCardSlots[i]);
            this.holdingCardRects.push(holdingCardRect);
        }*/

        //Deck & Cards Setup
        //* TEMPORARY!!! playingUnits will be initialized later on
        this.gameEngine.playingTier1Units = this.gameEngine.unlockedTier1Units;
        this.gameEngine.playingTier2Units = this.gameEngine.unlockedTier2Units;
        this.gameEngine.playingTier3Units = this.gameEngine.unlockedTier3Units;
        //*/

        //this.gameEngine.playingUnits is the deck compose of units with different tiers to roll and summon
        this.gameEngine.playingUnits.push(...this.gameEngine.playingTier1Units);
        this.gameEngine.playingUnits.push(...this.gameEngine.playingTier2Units);
        this.gameEngine.playingUnits.push(...this.gameEngine.playingTier3Units);

        this.rollSellingCards();

        this.summonedUnitElements = [];
        this.summonedUnitRects = [];
        this.summonedUnitStatsElements = [];
        this.summonedUnitStatsUpperElements = [];
        this.summonedUnitStatsLowerElements = [];

        for (let i = 0; i < 6; i++) {
            //Create Summoned Unit Elements
            const summonedUnitElement = document.createElement("div");
            summonedUnitElement.classList.add("summoned-unit-div");

            const summonedUnitField = document.createElement("img");
            summonedUnitField.setAttribute("src", this.summonFieldImage.src);
            summonedUnitElement.appendChild(summonedUnitField);

            this.summonedUnitContainer.appendChild(summonedUnitElement);
            this.summonedUnitElements.push(summonedUnitElement);
            const summonedUnitRect = this.getElementRect(summonedUnitElement);
            this.summonedUnitRects.push(summonedUnitRect);

            //Create Summoned Unit Stats Elements
            const unitStatsElement = document.createElement("div");
            unitStatsElement.classList.add("summoned-stats-div");

            const unitUpperStats = document.createElement("div");
            unitUpperStats.classList.add("unit-upper-stats");
            const unitUpper1Stats = document.createElement("div");
            unitUpperStats.appendChild(unitUpper1Stats);
            const unitUpper2Stats = document.createElement("div");
            unitUpperStats.appendChild(unitUpper2Stats);
            unitStatsElement.appendChild(unitUpperStats);

            const unitLowerStats = document.createElement("div");
            unitLowerStats.classList.add("unit-lower-stats");
            const unitLower1Stats = document.createElement("div");
            unitLowerStats.appendChild(unitLower1Stats);
            const unitLower2Stats = document.createElement("div");
            unitLowerStats.appendChild(unitLower2Stats);
            unitStatsElement.appendChild(unitLowerStats);

            unitStatsElement.style.setProperty("visibility", "hidden");
            this.summonedStatsContainer.appendChild(unitStatsElement);
            this.summonedUnitStatsElements.push(unitStatsElement);
            this.summonedUnitStatsUpperElements.push(unitUpperStats);
            this.summonedUnitStatsLowerElements.push(unitLowerStats);

            if (this.summonedUnitCards[i] != undefined && this.summonedUnitCards[i].summonId != undefined) {
                this.setSummonedUnitStatsElement(i);
            }

            if (this.summonedUnitCards.length != 6) {
                //Create Summoned Unit Cards
                const tempSummonedUnitCard = new Card({
                    image: new Image(),
                    imageSrc: "",
                    name: undefined,
                    tier: undefined,
                    type1: undefined,
                    type2: undefined,
                    power: undefined,
                    health: undefined,
                    effectDesc: undefined,
                    effectFunc: undefined,
                });
                this.summonedUnitCards.push(tempSummonedUnitCard);
            }
        }
    }

    update() {
        this.gameEngine.canvas.onmousemove = this.onMouseMove;
        this.gameEngine.canvas.onmousedown = this.onMouseDown;
        this.gameEngine.canvas.onmouseup = this.onMouseUp;
        this.gameEngine.canvas.onmouseout = this.onMouseOut;

        //Show Deck Button
        if (this.isMouseInRect(this.showDeckRect)) {
            this.gameEngine.ctx.drawImage(this.buttonHoverImage, this.showDeckRect.x, this.showDeckRect.y, this.showDeckRect.width, this.showDeckRect.height);
        } else {
            this.gameEngine.ctx.drawImage(this.buttonDefaultImage, this.showDeckRect.x, this.showDeckRect.y, this.showDeckRect.width, this.showDeckRect.height);
        }

        //Show Deck Button
        if (this.isMouseInRect(this.showTypesRect)) {
            this.gameEngine.ctx.drawImage(this.buttonHoverImage, this.showTypesRect.x, this.showTypesRect.y, this.showTypesRect.width, this.showTypesRect.height);
        } else {
            this.gameEngine.ctx.drawImage(this.buttonDefaultImage, this.showTypesRect.x, this.showTypesRect.y, this.showTypesRect.width, this.showTypesRect.height);
        }

        //Draw the Draw Button
        if (this.isMouseInRect(this.drawCardRect)) {
            this.gameEngine.ctx.drawImage(this.buttonHoverImage, this.drawCardRect.x, this.drawCardRect.y, this.drawCardRect.width, this.drawCardRect.height);
        } else {
            this.gameEngine.ctx.drawImage(this.buttonDefaultImage, this.drawCardRect.x, this.drawCardRect.y, this.drawCardRect.width, this.drawCardRect.height);
        }

        //Draw Battle Button
        if (this.isMouseInRect(this.gameBattleRect)) {
            this.gameEngine.ctx.drawImage(this.buttonHoverImage, this.gameBattleRect.x, this.gameBattleRect.y, this.gameBattleRect.width, this.gameBattleRect.height);
        } else {
            this.gameEngine.ctx.drawImage(this.buttonDefaultImage, this.gameBattleRect.x, this.gameBattleRect.y, this.gameBattleRect.width, this.gameBattleRect.height);
        }

        this.drawCards(this.sellingUnitCards);
        this.drawCards(this.summonedUnitCards);
        this.drawHoldingCard();
    }

    rollSellingCards() {
        this.sellingUnitElements = [];
        this.sellingUnitRects = [];

        //Remove all elements from this.sellingUnitElements
        while (this.lowerCenterContainer.hasChildNodes()) {
            this.lowerCenterContainer.removeChild(this.lowerCenterContainer.firstChild)
        }

        if (this.sellingUnitCards.length == 0) {
            //For Locked Selling Cards
            for (let i = 0; i < this.lockedSellingCards.length; i++) {
                const sellingUnitElement = this.createSellingCardElement(
                    this.lockedSellingCards[i].type1,
                    this.lockedSellingCards[i].type2,
                    this.lockedSellingCards[i].power,
                    this.lockedSellingCards[i].health
                );
                this.lowerCenterContainer.appendChild(sellingUnitElement);
                this.sellingUnitElements.push(sellingUnitElement);
                const sellingUnitRect = this.getElementRect(this.sellingUnitElements[i]);
                this.sellingUnitRects.push(sellingUnitRect);
                this.setSellingUnitElementsStyles(i);

                const sellingUnitCard = new Card({
                    image: this.lockedSellingCards[i].image,
                    x: this.sellingUnitRects[i].x,
                    y: this.sellingUnitRects[i].y + (this.sellingUnitRects[i].y * 0.05),
                    width: this.gameEngine.cardWidth,
                    height: this.gameEngine.cardHeight * 0.7,

                    imageSrc: this.lockedSellingCards[i].image.src,
                    name: this.lockedSellingCards[i].name,
                    tier: this.lockedSellingCards[i].tier,
                    type1: this.lockedSellingCards[i].type1,
                    type2: this.lockedSellingCards[i].type2,
                    power: this.lockedSellingCards[i].power,
                    health: this.lockedSellingCards[i].health,
                    effectDesc: this.lockedSellingCards[i].effectDesc,
                    effectFunc: this.lockedSellingCards[i].effectFunc,

                    sellingId: i,
                    isSellingCardLocked: true,
                    lockedId: this.lockedSellingCards[i].lockedId
                });
                this.sellingUnitCards.push(sellingUnitCard);
            }

            //For Rolled Selling Cards
            for (let i = 0; i < this.sellingUnitCount - this.lockedSellingCards.length; i++) {
                this.rolledUnitCards.push(this.gameEngine.playingUnits[Math.floor(Math.random() * this.gameEngine.playingUnits.length)]);

                const sellingUnitElement = this.createSellingCardElement(
                    this.rolledUnitCards[i].type1,
                    this.rolledUnitCards[i].type2,
                    this.rolledUnitCards[i].power,
                    this.rolledUnitCards[i].health
                );
                this.lowerCenterContainer.appendChild(sellingUnitElement);
                this.sellingUnitElements.push(sellingUnitElement);
                const sellingUnitRect = this.getElementRect(this.sellingUnitElements[i + this.lockedSellingCards.length]);
                this.sellingUnitRects.push(sellingUnitRect);

                const sellingUnitCard = new Card({
                    image: new Image(),
                    x: this.sellingUnitRects[i + this.lockedSellingCards.length].x,
                    y: this.sellingUnitRects[i + this.lockedSellingCards.length].y + (this.sellingUnitRects[i + this.lockedSellingCards.length].y * 0.05),
                    width: this.gameEngine.cardWidth,
                    height: this.gameEngine.cardHeight * 0.7,

                    imageSrc: this.rolledUnitCards[i].imageSrc,
                    name: this.rolledUnitCards[i].name,
                    tier: this.rolledUnitCards[i].tier,
                    type1: this.rolledUnitCards[i].type1,
                    type2: this.rolledUnitCards[i].type2,
                    power: this.rolledUnitCards[i].power,
                    health: this.rolledUnitCards[i].health,
                    effectDesc: this.rolledUnitCards[i].effectDesc,
                    effectFunc: this.rolledUnitCards[i].effectFunc,

                    sellingId: i + this.lockedSellingCards.length,
                    isSellingCardLocked: false,
                    lockedId: undefined
                });
                this.sellingUnitCards.push(sellingUnitCard);
            }
        }
        else if (this.sellingUnitCards.length != 0) { //Returning back from DeckMenu
            for (let i = 0; i < this.sellingUnitCount; i++) {
                const sellingUnitElement = this.createSellingCardElement(
                    this.sellingUnitCards[i].type1,
                    this.sellingUnitCards[i].type2,
                    this.sellingUnitCards[i].power,
                    this.sellingUnitCards[i].health
                );
                this.lowerCenterContainer.appendChild(sellingUnitElement);
                this.sellingUnitElements.push(sellingUnitElement);
                const sellingUnitRect = this.getElementRect(this.sellingUnitElements[i]);
                this.sellingUnitRects.push(sellingUnitRect);

                if (this.sellingUnitCards[i].lockedId != undefined) {
                    this.setSellingUnitElementsStyles(i);
                }

                if (this.sellingUnitCards[i].x == undefined && this.sellingUnitCards[i].y == undefined) {
                    while (this.sellingUnitElements[i].hasChildNodes()) {
                        this.sellingUnitElements[i].removeChild(this.sellingUnitElements[i].firstChild)
                    }
                }
            }
        }

        /*
        //For Locked Selling Cards
            for (let i = 0; i < this.lockedSellingCards.length; i++) {
                const sellingUnitElement = this.createSellingCardElement(
                    this.lockedSellingCards[i].type1,
                    this.lockedSellingCards[i].type2,
                    this.lockedSellingCards[i].power,
                    this.lockedSellingCards[i].health
                );
                this.lowerCenterContainer.appendChild(sellingUnitElement);
                this.sellingUnitElements.push(sellingUnitElement);
                const sellingUnitRect = this.getElementRect(this.sellingUnitElements[i]);
                this.sellingUnitRects.push(sellingUnitRect);

                this.sellingUnitCards[i].x = this.sellingUnitRects[i].x;
                this.sellingUnitCards[i].y = this.sellingUnitRects[i].y + (this.sellingUnitRects[i].y * 0.05);
            }
            //For Rolled Selling Cards
            for (let i = 0; i < this.sellingUnitCount - this.lockedSellingCards.length; i++) {
                const sellingUnitElement = this.createSellingCardElement(
                    this.sellingUnitCards[i + this.lockedSellingCards.length].type1 ? this.sellingUnitCards[i + this.lockedSellingCards.length].type1 : '',
                    this.sellingUnitCards[i + this.lockedSellingCards.length].type2,
                    this.sellingUnitCards[i + this.lockedSellingCards.length].power,
                    this.sellingUnitCards[i + this.lockedSellingCards.length].health
                );
                this.lowerCenterContainer.appendChild(sellingUnitElement);
                this.sellingUnitElements.push(sellingUnitElement);
                const sellingUnitRect = this.getElementRect(this.sellingUnitElements[i + this.lockedSellingCards.length]);
                this.sellingUnitRects.push(sellingUnitRect);

                this.sellingUnitCards[i + this.lockedSellingCards.length].x = this.sellingUnitRects[i + this.lockedSellingCards.length].x;
                this.sellingUnitCards[i + this.lockedSellingCards.length].y = this.sellingUnitRects[i + this.lockedSellingCards.length].y + (this.sellingUnitRects[i + this.lockedSellingCards.length].y * 0.05);
            }
            for (let i = 0; i < this.sellingUnitCount; i++) {
                if (this.sellingUnitCards[i].lockedId != undefined) {
                    this.setSellingUnitElementsStyles(i);
                }
            }
            console.log("Previous rolled cards after returnign from DeckMenu");
        */

        console.log("Rolled cards: summonedUnitCards", this.summonedUnitCards, "sellingUnitCards", this.sellingUnitCards,
            "lockedSellingCards", this.lockedSellingCards);
    }

    onMouseMove = event => {
        this.onMouseMoveOnCard(event);

        for (let i = 0; i < this.summonedUnitRects.length; i++) {
            if (this.holdingCard //summonedUnitRects has a summonedUnitCards
                && this.isCardInRect(this.holdingCard, this.summonedUnitRects[i]) && this.isHoldingCard
                && this.summonedUnitCards[i] != null && this.summonedUnitCards[i].name != null
                && this.holdingCard.name != this.summonedUnitCards[i].name) {
                this.summonedUnitElements[i].style.setProperty("border", `2px solid var(--color-red)`);
            }
            else if (this.holdingCard //summonedUnitRects is empty
                && this.isCardInRect(this.holdingCard, this.summonedUnitRects[i]) && this.isHoldingCard) {
                this.summonedUnitElements[i].style.setProperty("border", `2px solid var(--color-black)`);
            }
            else {
                this.summonedUnitElements[i].style.setProperty("border", `0px solid var(--color-black)`);
            }
        }
    }

    onMouseDown = event => {
        this.onMouseDownOnCard(event, this.sellingUnitCards, this.summonedUnitCards);

        if (this.isMouseInRect(this.showDeckRect)) {
            this.gameEngine.changeMenu(this, this.gameEngine.deckMenu);
        }
        else if (this.isMouseInRect(this.showTypesRect)) {
            console.log("Show Types Synergies")
        }
        else if (this.isMouseInRect(this.drawCardRect) && this.gameEngine.manaPoints >= this.rollSellingCardsCost) {
            this.rolledUnitCards = [];
            this.sellingUnitCards = [];
            this.rollSellingCards();

            for (let i = 0; i < this.summonedUnitCards.length; i++) {
                if (this.summonedUnitCards[i].summonId != undefined) {
                    this.setSummonedUnitStatsElement(i);
                }
            }

            this.gameEngine.manaPoints -= this.rollSellingCardsCost;
            this.setManaPointsElement(this.gameEngine.manaPoints);
        }
        else if (this.isMouseInRect(this.gameBattleRect)) {
            console.log("Start Battle")
        }
    }

    onMouseUp = event => {
        if (this.isHoldingCard && this.holdingCard.x === this.holdingCard.baseX && this.holdingCard.y === this.holdingCard.baseY) {
            this.constHoldingCard = this.holdingCard;
            this.createCardDisplayElement(
                this.holdingCard.image.src,
                this.holdingCard.name,
                this.holdingCard.tier,
                this.holdingCard.type1,
                this.holdingCard.type2,
                this.holdingCard.power,
                this.holdingCard.health,
                this.holdingCard.effectDesc,
                this.setCardDisplayButton
            )
        }

        if (this.holdingCard && this.isCardInRect(this.holdingCard, this.summonedUnitRects[0]) && this.isHoldingCard) {
            this.summonUnitCard(0, this.holdingCard);
        }
        else if (this.holdingCard && this.isCardInRect(this.holdingCard, this.summonedUnitRects[1]) && this.isHoldingCard) {
            this.summonUnitCard(1, this.holdingCard);
        }
        else if (this.holdingCard && this.isCardInRect(this.holdingCard, this.summonedUnitRects[2]) && this.isHoldingCard) {
            this.summonUnitCard(2, this.holdingCard);
        }
        else if (this.holdingCard && this.isCardInRect(this.holdingCard, this.summonedUnitRects[3]) && this.isHoldingCard) {
            this.summonUnitCard(3, this.holdingCard);
        }
        else if (this.holdingCard && this.isCardInRect(this.holdingCard, this.summonedUnitRects[4]) && this.isHoldingCard) {
            this.summonUnitCard(4, this.holdingCard);
        }
        else if (this.holdingCard && this.isCardInRect(this.holdingCard, this.summonedUnitRects[5]) && this.isHoldingCard) {
            this.summonUnitCard(5, this.holdingCard);
        }
        else if (this.isHoldingCard) {
            //console.log("Return to previous position");
            this.holdingCard.x = this.holdingCard.baseX;
            this.holdingCard.y = this.holdingCard.baseY;
        }

        this.onMouseUpOnCard(event);
    }

    setCardDisplayButton = () => {
        const cardButton = document.createElement("button");
        cardButton.classList.add("card-button");
        cardButton.setAttribute(`type`, `button`);

        if (this.constHoldingCard.summonId != undefined) cardButton.innerHTML = (`Sell Card`);
        else if (this.constHoldingCard.isSellingCardLocked) cardButton.innerHTML = (`Unlock Card`);
        else if (!this.constHoldingCard.isSellingCardLocked) cardButton.innerHTML = (`Lock Card`);
        this.cardBackgroundElement.appendChild(cardButton);

        cardButton.addEventListener("mousedown", event => {
            if (this.constHoldingCard.summonId != undefined) {
                this.gameEngine.manaPoints += this.constHoldingCard.summonSellCost;
                this.setManaPointsElement(this.gameEngine.manaPoints);

                this.summonedUnitStatsElements[this.constHoldingCard.summonId].style.setProperty("visibility", "hidden");
                this.removeSummonedUnitCard(this.constHoldingCard.summonId);
                //console.log("Sell summonedUnitCards", this.summonedUnitCards);
            }
            else if (this.constHoldingCard.isSellingCardLocked) {
                this.sellingUnitElements[this.constHoldingCard.sellingId].style.setProperty("background-color", `var(--color-white)`);
                this.sellingUnitElements[this.constHoldingCard.sellingId].style.setProperty("border-color", `var(--color-red)`);
                this.sellingUnitElements[this.constHoldingCard.sellingId].querySelector(".card-types").style.setProperty("background-color", `var(--color-red)`);
                this.sellingUnitElements[this.constHoldingCard.sellingId].querySelector(".card-image").style.setProperty("background-color", `var(--color-white)`);
                this.sellingUnitElements[this.constHoldingCard.sellingId].querySelector(".card-stats").style.setProperty("background-color", `var(--color-red)`);
                this.sellingUnitElements[this.constHoldingCard.sellingId].querySelector(".card-stats").style.setProperty("color", `var(--color-white)`);
                this.unlockSellingUnitCard(this.constHoldingCard.sellingId, this.constHoldingCard.lockedId);
            }
            else if (!this.constHoldingCard.isSellingCardLocked) {
                this.setSellingUnitElementsStyles(this.constHoldingCard.sellingId);
                this.lockedSellingCards.push(this.constHoldingCard);
                for (let i = 0; i < this.lockedSellingCards.length; i++) {
                    this.lockedSellingCards[i].isSellingCardLocked = true;
                    this.lockedSellingCards[i].lockedId = i;
                }
                console.log("Lock cards: summonedUnitCards", this.summonedUnitCards, "sellingUnitCards", this.sellingUnitCards, "lockedSellingCards", this.lockedSellingCards);
            }
        })
    }

    unlockSellingUnitCard(sellingId, lockedId) {
        this.sellingUnitCards[sellingId].isSellingCardLocked = false;
        this.lockedSellingCards.splice(lockedId, 1);

        for (let i = 0; i < this.lockedSellingCards.length; i++) {
            this.lockedSellingCards[i].lockedId = i;
        }

        this.sellingUnitCards[sellingId].lockedId = undefined;
        console.log("Unlock cards: summonedUnitCards", this.summonedUnitCards, "sellingUnitCards", this.sellingUnitCards, "lockedSellingCards", this.lockedSellingCards);
    }

    setSellingUnitElementsStyles(index) {
        this.sellingUnitElements[index].style.setProperty("background-color", `var(--color-white)`);
        this.sellingUnitElements[index].style.setProperty("border-color", `var(--color-grey)`);
        this.sellingUnitElements[index].querySelector(".card-types").style.setProperty("background-color", `var(--color-grey)`);
        this.sellingUnitElements[index].querySelector(".card-image").style.setProperty("background-color", `var(--color-white)`);
        this.sellingUnitElements[index].querySelector(".card-stats").style.setProperty("background-color", `var(--color-grey)`);
        this.sellingUnitElements[index].querySelector(".card-stats").style.setProperty("color", `var(--color-white)`);
    }

    summonUnitCard(index, card) {
        if (this.summonedUnitCards[index].name == null && card.summonId != undefined) {
            console.log("Move summoned card to an empty rect");
            this.setSummonedUnitPosition(this.summonedUnitRects[index], card);
            this.setSummonedUnitCard(index, card);
            this.setSummonedUnitStatsElement(index);

            this.summonedUnitStatsElements[card.summonId].style.setProperty("visibility", "hidden");
            this.removeSummonedUnitCard(card.summonId);
        }
        else if (this.summonedUnitCards[index].name == card.name
            && this.summonedUnitCards[index].summonId != card.summonId) {
            console.log("LEVEL UP!!!")
            this.holdingCard.x = this.holdingCard.baseX;
            this.holdingCard.y = this.holdingCard.baseY;
        }
        else if (this.summonedUnitCards[index].name != null && card.summonId != undefined) {
            console.log("Move summoned card with summonId", card.summonId, "& replace summoned card in index", index);

            //CONSTANT ANTI-REFERENCE VARIABLES XD
            this.constSummonedCards = [...this.summonedUnitCards];
            const swappingId = this.constSummonedCards[card.summonId].summonId;

            this.summonedUnitCards[index] = this.constSummonedCards[swappingId];
            this.summonedUnitCards[swappingId] = this.constSummonedCards[index];

            this.setSummonedUnitPosition(this.summonedUnitRects[index], this.summonedUnitCards[index]);
            this.setSummonedUnitPosition(this.summonedUnitRects[swappingId], this.summonedUnitCards[swappingId]);
            this.summonedUnitCards[index].summonId = index;
            this.summonedUnitCards[swappingId].summonId = swappingId;
            this.setSummonedUnitStatsElement(index);
            this.setSummonedUnitStatsElement(swappingId);
        }
        else if (this.summonedUnitCards[index].name != null) {
            console.log("CANNOT Summon bought card to an occupied rect")
            card.x = card.baseX;
            card.y = card.baseY;
        }
        else if (this.summonedUnitCards[index].name == null && this.gameEngine.manaPoints >= this.summoningCardCost) {
            console.log("Summon bought card to an empty rect");
            this.setSummonedUnitPosition(this.summonedUnitRects[index], card);
            this.setSummonedUnitCard(index, card);
            this.setSummonedUnitStatsElement(index);
            this.unlockSellingUnitCard(card.sellingId, card.lockedId);
            this.setBoughtSellingUnitElements();

            this.gameEngine.manaPoints -= this.summoningCardCost;
            this.setManaPointsElement(this.gameEngine.manaPoints);
        }
    }

    setSummonedUnitPosition(rect, card) {
        if (card.tier == 1) {
            card.x = rect.x + (rect.width * 0.15);
            card.y = rect.y + (rect.height * 0.42);
        }
        else if (card.tier == 2) {
            card.x = rect.x + (rect.width * 0.14);
            card.y = rect.y + (rect.height * 0.39);
        }
        else if (card.tier == 3) {
            card.x = rect.x + (rect.width * 0.16);
            card.y = rect.y + (rect.height * 0.33);
        }
        card.baseX = card.x;
        card.baseY = card.y;
    }

    setSummonedUnitCard(index, card) {
        this.summonedUnitCards[index].image = card.image;
        this.summonedUnitCards[index].x = card.x;
        this.summonedUnitCards[index].y = card.y;
        this.summonedUnitCards[index].width = card.width;
        this.summonedUnitCards[index].height = card.height;

        this.summonedUnitCards[index].baseX = this.summonedUnitCards[index].x;
        this.summonedUnitCards[index].baseY = this.summonedUnitCards[index].y;

        this.summonedUnitCards[index].name = card.name;
        this.summonedUnitCards[index].tier = card.tier;
        this.summonedUnitCards[index].type1 = card.type1;
        this.summonedUnitCards[index].type2 = card.type2;
        this.summonedUnitCards[index].power = card.power;
        this.summonedUnitCards[index].health = card.health;
        this.summonedUnitCards[index].effectDesc = card.effectDesc;
        this.summonedUnitCards[index].effectFunc = card.effectFunc;

        this.sellingId = undefined;
        this.isSellingLocked = undefined;

        this.summonedUnitCards[index].summonId = index;
        this.summonedUnitCards[index].summonLevel = card.summonLevel == undefined ? 1 : card.summonLevel;
        this.summonedUnitCards[index].summonSellCost = card.summonSellCost == undefined ? 1 : card.summonSellCost;
    }

    setSummonedUnitStatsElement(index) {
        this.summonedUnitStatsElements[index].style.setProperty("visibility", "visible");
        for (let i = 0; i < 6; i++) {
            this.summonedUnitStatsUpperElements[index].innerHTML = (
                `⚔️${this.summonedUnitCards[index].power} / ${this.summonedUnitCards[index].health}❤️`
            );

            this.summonedUnitStatsLowerElements[index].innerHTML = (
                `Lv ${this.summonedUnitCards[index].summonLevel} / ${TYPES.TYPES_ICONS[this.summonedUnitCards[index].type1]} ${TYPES.TYPES_ICONS[this.summonedUnitCards[index].type2]}`
            );
        }
    }

    setBoughtSellingUnitElements() {
        for (let i = 0; i < this.sellingUnitCount; i++) {
            if (this.sellingUnitCards[i].baseX != this.sellingUnitRects[i].x
                && this.sellingUnitCards[i].baseY != this.sellingUnitRects[i].y) {

                while (this.sellingUnitElements[i].hasChildNodes()) {
                    this.sellingUnitElements[i].removeChild(this.sellingUnitElements[i].firstChild)
                }

                this.sellingUnitCards[i].image = new Image();
                this.sellingUnitCards[i].x = undefined;
                this.sellingUnitCards[i].y = undefined;
                this.sellingUnitCards[i].width = undefined;
                this.sellingUnitCards[i].height = undefined;

                this.sellingUnitCards[i].baseX = undefined;
                this.sellingUnitCards[i].baseY = undefined;

                this.sellingUnitCards[i].imageSrc = undefined;
                this.sellingUnitCards[i].name = undefined;
                this.sellingUnitCards[i].tier = undefined;
                this.sellingUnitCards[i].type1 = undefined;
                this.sellingUnitCards[i].type2 = undefined;
                this.sellingUnitCards[i].power = undefined;
                this.sellingUnitCards[i].health = undefined;
                this.sellingUnitCards[i].effectDesc = undefined;
                this.sellingUnitCards[i].effectFunc = undefined;

                this.sellingUnitCards[i].isSellingCardLocked = undefined;
                this.sellingUnitCards[i].lockedId = undefined;
            }
        }
    }

    removeSummonedUnitCard(index) {
        this.summonedUnitCards[index].image = new Image();
        this.summonedUnitCards[index].x = undefined;
        this.summonedUnitCards[index].y = undefined;
        this.summonedUnitCards[index].width = undefined;
        this.summonedUnitCards[index].height = undefined;

        this.summonedUnitCards[index].baseX = undefined;
        this.summonedUnitCards[index].baseY = undefined;

        this.summonedUnitCards[index].imageSrc = undefined;
        this.summonedUnitCards[index].name = undefined;
        this.summonedUnitCards[index].tier = undefined;
        this.summonedUnitCards[index].type1 = undefined;
        this.summonedUnitCards[index].type2 = undefined;
        this.summonedUnitCards[index].power = undefined;
        this.summonedUnitCards[index].health = undefined;
        this.summonedUnitCards[index].effectDesc = undefined;
        this.summonedUnitCards[index].effectFunc = undefined;

        this.summonedUnitCards[index].summonId = undefined;
        this.summonedUnitCards[index].summonLevel = undefined;
        this.summonedUnitCards[index].summonSellCost = undefined;
    }



}