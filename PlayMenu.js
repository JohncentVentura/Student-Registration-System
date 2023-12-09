class PlayMenu extends AbstractMenuCanvas {
    constructor(params) {
        super(params);

        this.summonFieldImage = new Image();
        this.summonFieldImage.src = "/Assets/Summon Field.png";
        this.buttonDefaultImage = new Image();
        this.buttonDefaultImage.src = "/Assets/Button Default.png";
        this.buttonHoverImage = new Image();
        this.buttonHoverImage.src = "/Assets/Button Hover.png";

        this.sellingUnitCount = 4;
        this.sellingItemCount = 2;

        this.sellingUnitElements = []; //For Selling Card Stats
        this.sellingUnitRects = []; //For position of Card
        this.sellingUnitCards = [];

        this.summonedUnitElements = []; //For border in CSS
        this.summonedUnitRects = []; //For position of Card
        this.summonedUnitCards = []; //For Back-End

        this.summonedUnitStatsElements = [];
        this.summonedUnitStatsUpperElements = [];
        this.summonedUnitStatsLowerElements = [];

        this.lockedSummonedCards = [];
        this.lockedSellingCards = [];
    }

    launch() {
        this.createMenuElement("play-menu",
            `<div class="upper-container"> 
                <img src="/Assets/BG Field.png" alt="BG Field.png" class="upper-image">
                <div class="upper-header-container">
                    <div>Life Points 5</div>
                    <div>Mana 10</div>
                    <div>Wave 12</div>
                    <div>Turn 99</div>
                </div> 

                <div class="upper-left-container">
                    <h3>Types Synergies</h3>
                    <div class="active-type-synergy">
                        <div>🔥(Power +1)</div>    
                    </div>
                    <div class="inactive-type-synergy">
                        <div>🔥(Power +1)</div>    
                    </div>
                </div>

                <div class="upper-center-container">
                    <div class="summoned-unit-container"></div>
                    <div class="summoned-stats-container"></div>
                </div>

                <div class="upper-right-container">
                </div>
            </div>

            <div class="lower-container">
                <div class="lower-left-container">
                    <button type="button" class="draw-card-button">Draw</button>
                    <button type="button" class="show-deck-button">Deck</button>
                </div>

                <div class="lower-center-container">
                </div>

                <div class="lower-right-container">
                    <button type="button" class="game-battle-button">Battle</button>
                </div>
            </div>`);
        this.element.style.setProperty('z-index', '-1'); //Canvas will be rendered before innerHTML so canvas is interactable

        //upper-container-elements
        this.upperHeader = document.querySelector(".upper-header-container");
        this.upperContainer = document.querySelector(".upper-container");
        this.upperLeftContainer = document.querySelector(".upper-left-container");
        this.upperCenterContainer = document.querySelector(".upper-center-container");
        this.upperRightContainer = document.querySelector(".upper-right-container");
        this.summonedUnitContainer = document.querySelector(".summoned-unit-container");
        this.summonedStatsContainer = document.querySelector(".summoned-stats-container");

        //lower-container-elements
        this.lowerContainer = document.querySelector(".lower-container");
        this.lowerLeftContainer = document.querySelector(".lower-left-container");
        this.lowerCenterContainer = document.querySelector(".lower-center-container");
        this.lowerRightContainer = document.querySelector(".lower-right-container");

        //Canvas Elements & Rects
        this.drawCardButton = document.querySelector(".draw-card-button");
        this.showDeckButton = document.querySelector(".show-deck-button");
        this.gameBattleButton = document.querySelector(".game-battle-button");
        this.drawCardRect = this.getElementRect(this.drawCardButton);
        this.gameBattleRect = this.getElementRect(this.gameBattleButton);
        this.showDeckRect = this.getElementRect(this.showDeckButton);

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

            //Create Summoned Unit Cards
            const tempSummonedUnitCard = new Card({
                image: new Image(),
                imageSrc: "",
                name: null,
                tier: null,
                type1: null,
                type2: null,
                power: null,
                health: null,
                effectDesc: null,
                effectFunc: null,
            });
            this.summonedUnitCards.push(tempSummonedUnitCard);
        }
    }

    update() {
        this.gameEngine.canvas.onmousemove = this.onMouseMove;
        this.gameEngine.canvas.onmousedown = this.onMouseDown;
        this.gameEngine.canvas.onmouseup = this.onMouseUp;
        this.gameEngine.canvas.onmouseout = this.onMouseOut;

        //Draw the Draw Button
        if (this.isMouseInRect(this.drawCardRect)) {
            this.gameEngine.ctx.drawImage(this.buttonHoverImage, this.drawCardRect.x, this.drawCardRect.y, this.drawCardRect.width, this.drawCardRect.height);
        } else {
            this.gameEngine.ctx.drawImage(this.buttonDefaultImage, this.drawCardRect.x, this.drawCardRect.y, this.drawCardRect.width, this.drawCardRect.height);
        }

        //Show Deck Button
        if (this.isMouseInRect(this.showDeckRect)) {
            this.gameEngine.ctx.drawImage(this.buttonHoverImage, this.showDeckRect.x, this.showDeckRect.y, this.showDeckRect.width, this.showDeckRect.height);
        } else {
            this.gameEngine.ctx.drawImage(this.buttonDefaultImage, this.showDeckRect.x, this.showDeckRect.y, this.showDeckRect.width, this.showDeckRect.height);
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
        let rolledUnitCards = [];
        this.sellingUnitElements = [];
        this.sellingUnitRects = [];
        this.sellingUnitCards = [];

        //Remove all elements from this.sellingUnitElements
        while (this.lowerCenterContainer.hasChildNodes()) {
            this.lowerCenterContainer.removeChild(this.lowerCenterContainer.firstChild)
        }

        for (let i = 0; i < this.sellingUnitCount; i++) {
            rolledUnitCards.push(this.gameEngine.playingUnits[Math.floor(Math.random() * this.gameEngine.playingUnits.length)]);

            const sellingUnitElement = this.createSellingCardElement(
                rolledUnitCards[i].type1,
                rolledUnitCards[i].type2,
                rolledUnitCards[i].power,
                rolledUnitCards[i].health
            );
            this.lowerCenterContainer.appendChild(sellingUnitElement);
            this.sellingUnitElements.push(sellingUnitElement);
            const sellingUnitRect = this.getElementRect(this.sellingUnitElements[i]);
            this.sellingUnitRects.push(sellingUnitRect);

            const sellingUnitCard = new Card({
                image: new Image(),
                x: this.sellingUnitRects[i].x,
                y: this.sellingUnitRects[i].y + (this.sellingUnitRects[i].y * 0.05),
                width: this.gameEngine.cardWidth,
                height: this.gameEngine.cardHeight * 0.7,

                imageSrc: rolledUnitCards[i].imageSrc,
                name: rolledUnitCards[i].name,
                tier: rolledUnitCards[i].tier,
                type1: rolledUnitCards[i].type1,
                type2: rolledUnitCards[i].type2,
                power: rolledUnitCards[i].power,
                health: rolledUnitCards[i].health,
                effectDesc: rolledUnitCards[i].effectDesc,
                effectFunc: rolledUnitCards[i].effectFunc
            });
            this.sellingUnitCards.push(sellingUnitCard);
        }
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
        //console.log("onMouseDown() this.holdingCard", this.holdingCard);

        if (this.isMouseInRect(this.drawCardRect)) {
            console.log("Draw cards")
            this.rollSellingCards();

            for (let i = 0; i < this.summonedUnitCards.length; i++) {
                if (this.summonedUnitCards[i].summonId != undefined) {
                    this.setSummonedUnitStatsElement(i);
                }
            }

            console.log("summonUnitCard() summoned&selling cards", this.summonedUnitCards, this.sellingUnitCards);
        }
        else if (this.isMouseInRect(this.showDeckRect)) {
            this.gameEngine.changeMenu(this, this.gameEngine.deckMenu);
        }
        else if (this.isMouseInRect(this.gameBattleRect)) {
            console.log("Start Battle")
        }
    }

    setCardDisplayButton = () => {
        const cardButton = document.createElement("button");
        cardButton.classList.add("card-button");
        cardButton.setAttribute(`type`, `button`);
        cardButton.innerHTML = (`Lock`)
        this.cardBackgroundElement.appendChild(cardButton);

        cardButton.addEventListener("mousedown", event => {
            console.log("Selling Card is Locked");
        })
    }

    onMouseUp = event => {
        //*
        if (this.isHoldingCard && this.holdingCard.x === this.holdingCard.baseX && this.holdingCard.y === this.holdingCard.baseY) {
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
            );
        }

        if (this.holdingCard != null && this.holdingCard != this.lockedSellingCards[0]) {
            this.lockedSellingCards.push(this.holdingCard);
            console.log("Push", this.lockedSellingCards)
        }
        //*/

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
            console.log("Return to previous position");
            this.holdingCard.x = this.holdingCard.baseX;
            this.holdingCard.y = this.holdingCard.baseY;
        }

        this.onMouseUpOnCard(event);
        console.log("onMouseUp END")
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
            this.lockedSummonedCards = [...this.summonedUnitCards];
            const swappingId = this.lockedSummonedCards[card.summonId].summonId;

            this.summonedUnitCards[index] = this.lockedSummonedCards[swappingId];
            this.summonedUnitCards[swappingId] = this.lockedSummonedCards[index];

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
        else if (this.summonedUnitCards[index].name == null) {
            console.log("Summon bought card to an empty rect");
            this.setSummonedUnitPosition(this.summonedUnitRects[index], card);
            this.setSummonedUnitCard(index, card);
            this.setSummonedUnitStatsElement(index);
            this.setBoughtUnitElements();
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

        this.summonedUnitCards[index].summonId = index;
        this.summonedUnitCards[index].summonLevel = card.summonLevel == undefined ? 1 : card.summonLevel;
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

    setBoughtUnitElements() {
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
            }
        }
    }

    removeSummonedUnitCard(index) {
        this.summonedUnitCards[index].image = new Image();
        this.summonedUnitCards[index].x = null;
        this.summonedUnitCards[index].y = null;
        this.summonedUnitCards[index].width = null;
        this.summonedUnitCards[index].height = null;

        this.summonedUnitCards[index].baseX = null;
        this.summonedUnitCards[index].baseY = null;

        this.summonedUnitCards[index].imageSrc = null;
        this.summonedUnitCards[index].name = null;
        this.summonedUnitCards[index].tier = null;
        this.summonedUnitCards[index].type1 = null;
        this.summonedUnitCards[index].type2 = null;
        this.summonedUnitCards[index].power = null;
        this.summonedUnitCards[index].health = null;
        this.summonedUnitCards[index].effectDesc = null;
        this.summonedUnitCards[index].effectFunc = null;

        this.summonedUnitCards[index].summonId = null;
        this.summonedUnitCards[index].summonLevel = null;
    }



}