class PlayMenu extends Menu {
    constructor(params) {
        super(params);

        this.summonFieldImage = new Image();
        this.summonFieldImage.src = "/Assets/Summon Field.png";

        this.sellingUnitCount = 4;
        this.sellingItemCount = 2;

        this.sellingUnitElements = [];
        this.sellingUnitRects = []; //For position of Card
        this.sellingUnitCards = [];

        this.summonedUnitElements = []; //For border in CSS
        this.summonedUnitRects = []; //For position of Card
        this.summonedUnitTypesElements = [];
        this.summonedUnitStatsElements = [];
        this.summonedUnitCards = []; //For Back-End

        //Mouse
        this.mouseX = 0;
        this.mouseY = 0;
        this.holdingCardID = -1;
        this.isHoldingCard = false;

    }

    onMouseMove = event => {
        this.onMouseMoveOnCard(event);

        for (let i = 0; i < this.summonedUnitRects.length; i++) {
            if (this.sellingUnitCards[this.holdingCardID]
                && this.isCardInRect(this.sellingUnitCards[this.holdingCardID], this.summonedUnitRects[i])
                && this.isHoldingCard) {
                this.summonedUnitElements[i].style.setProperty("border", `2px solid var(--color-black)`);
            } else {
                this.summonedUnitElements[i].style.setProperty("border", `0px solid var(--color-black)`);
            }
        }
    }

    setSummoningUnitElementBorder(index) {
        for (let i = 0; i < this.summonedUnitRects.length; i++) {
            if (i == index) {
                this.summonedUnitElements[index].style.setProperty("border", `2px solid var(--color-black)`);
            }
            else {
                this.summonedUnitElements[i].style.setProperty("border", `0px solid var(--color-black)`);
            }
        }
    }

    onMouseMoveOnCard(event) {
        if (!this.isHoldingCard) {
            this.mouseX = parseInt(event.offsetX);
            this.mouseY = parseInt(event.offsetY);
            return;
        } else {
            let newMouseX = parseInt(event.offsetX);
            let newMouseY = parseInt(event.offsetY);
            let newCardX = newMouseX - this.mouseX;
            let newCardY = newMouseY - this.mouseY;

            let holdingCard = this.sellingUnitCards[this.holdingCardID];
            holdingCard.x += newCardX;
            holdingCard.y += newCardY;

            this.drawSellingCardObjects();
            this.mouseX = newMouseX; //Slows the dragging
            this.mouseY = newMouseY;
        }
    }

    onMouseDown = event => {
        this.onMouseDownOnCard(event);

        if (this.isMouseInRect(this.drawCardRect)) {
            console.log("Draw cards")
            this.rollSellingCards();
        }
        else if (this.isMouseInRect(this.showDeckRect)) {
            this.gameEngine.changeMenu(this, this.gameEngine.deckMenu);
        }
        else if (this.isMouseInRect(this.gameBattleRect)) {
            console.log("Start Battle")
        }
    }

    onMouseDownOnCard(event) {
        this.mouseX = parseInt(event.offsetX);
        this.mouseY = parseInt(event.offsetY);
        let cardId = 0;

        this.sellingUnitCards.map(card => {
            if (this.isMouseInCard(card)) {
                this.holdingCardID = cardId;
                this.isHoldingCard = true;
                return;
            }
            cardId++; //Increments until the if statement returns to end map()
        });
    }

    onMouseUp = event => {
        if (this.isHoldingCard && this.sellingUnitCards[this.holdingCardID].x === this.sellingUnitCards[this.holdingCardID].baseX
            && this.sellingUnitCards[this.holdingCardID].y === this.sellingUnitCards[this.holdingCardID].baseY) {
            this.createCardDisplayElement(
                this.sellingUnitCards[this.holdingCardID].image.src,
                this.sellingUnitCards[this.holdingCardID].name,
                this.sellingUnitCards[this.holdingCardID].tier,
                this.sellingUnitCards[this.holdingCardID].type1,
                this.sellingUnitCards[this.holdingCardID].type2,
                this.sellingUnitCards[this.holdingCardID].power,
                this.sellingUnitCards[this.holdingCardID].health,
                this.sellingUnitCards[this.holdingCardID].effectDesc
            );
        }

        this.onMouseUpOnCard(event);

        this.sellingUnitCards.map(card => {
            if (this.isCardInRect(card, this.summonedUnitRects[0]) && !this.isHoldingCard) {
                this.setUnitPosition(card, this.summonedUnitRects[0]);
                this.setSummonedUnit(0, card);
                this.setSellingElements(0);
            }
            else if (this.isCardInRect(card, this.summonedUnitRects[1]) && !this.isHoldingCard) {
                this.setUnitPosition(card, this.summonedUnitRects[1]);
                this.setSummonedUnit(1, card);
                this.setSellingElements(1);
            }
            else if (this.isCardInRect(card, this.summonedUnitRects[2]) && !this.isHoldingCard) {
                this.setUnitPosition(card, this.summonedUnitRects[2]);
                this.setSummonedUnit(2, card);
                this.setSellingElements(2);
            }
            else if (this.isCardInRect(card, this.summonedUnitRects[3]) && !this.isHoldingCard) {
                this.setUnitPosition(card, this.summonedUnitRects[3]);
                this.setSummonedUnit(3, card);
                this.setSellingElements(3);
            }
            else if (this.isCardInRect(card, this.summonedUnitRects[4]) && !this.isHoldingCard) {
                this.setUnitPosition(card, this.summonedUnitRects[4]);
                this.setSummonedUnit(4, card);
                this.setSellingElements(4);
            }
            else if (this.isCardInRect(card, this.summonedUnitRects[5]) && !this.isHoldingCard) {
                this.setUnitPosition(card, this.summonedUnitRects[5]);
                this.setSummonedUnit(5, card);
                this.setSellingElements(5);
            }
            else if (!this.isHoldingCard) { //Return to previous position
                card.x = card.baseX;
                card.y = card.baseY;
            }
        });
    }

    setUnitPosition(card, rect) {
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

    onMouseUpOnCard(event) {
        if (!this.isHoldingCard) {
            return;
        } else {
            event.preventDefault();
            this.isHoldingCard = false;
            this.holdingCardID = -1;
        }
    }

    update() {
        this.gameEngine.canvas.onmousedown = this.onMouseDown;
        this.gameEngine.canvas.onmousemove = this.onMouseMove;
        this.gameEngine.canvas.onmouseout = this.onMouseOut;
        this.gameEngine.canvas.onmouseup = this.onMouseUp;

        //Draw the Draw Button
        if (this.isMouseInRect(this.drawCardRect)) {
            this.gameEngine.ctx.drawImage(this.gameEngine.buttonHoverImage, this.drawCardRect.x, this.drawCardRect.y, this.drawCardRect.width, this.drawCardRect.height);
        } else {
            this.gameEngine.ctx.drawImage(this.gameEngine.buttonDefaultImage, this.drawCardRect.x, this.drawCardRect.y, this.drawCardRect.width, this.drawCardRect.height);
        }

        //Show Deck Button
        if (this.isMouseInRect(this.showDeckRect)) {
            this.gameEngine.ctx.drawImage(this.gameEngine.buttonHoverImage, this.showDeckRect.x, this.showDeckRect.y, this.showDeckRect.width, this.showDeckRect.height);
        } else {
            this.gameEngine.ctx.drawImage(this.gameEngine.buttonDefaultImage, this.showDeckRect.x, this.showDeckRect.y, this.showDeckRect.width, this.showDeckRect.height);
        }

        //Draw Battle Button
        if (this.isMouseInRect(this.gameBattleRect)) {
            this.gameEngine.ctx.drawImage(this.gameEngine.buttonHoverImage, this.gameBattleRect.x, this.gameBattleRect.y, this.gameBattleRect.width, this.gameBattleRect.height);
        } else {
            this.gameEngine.ctx.drawImage(this.gameEngine.buttonDefaultImage, this.gameBattleRect.x, this.gameBattleRect.y, this.gameBattleRect.width, this.gameBattleRect.height);
        }

        this.drawSellingCardObjects();
        this.drawHoldingCardObject();
    }

    launch() {
        this.createMenuElement("play-battle-menu",
            `
            <div class="upper-container"> 
                <img src="/Assets/BG Field.png" alt="BG Field.png" class="upper-image">
                <div class="upper-header-container">
                    <div>Life Points  5</div>
                    <div>Mana 10</div>
                    <div>Timer 60</div>
                    <div>Wave 12</div>
                    <div>Turn 99</div>
                </div> 

                <div class="upper-left-container">
                    <h3>Types Combo</h3>
                    <div class="active-type-combo">
                        <div>🔥(Power +1)</div>    
                    </div>
                    <div class="inactive-type-combo">
                        <div>🔥(Power +1)</div>    
                    </div>
                </div>

                <div class="upper-center-container">
                    <div class="units-container"></div>
                    <div class="stats-container"></div>
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
            </div>
            `
        );
        this.element.style.setProperty('z-index', '-1'); //Canvas will be rendered before innerHTML so canvas is interactable

        //Upper Container
        this.upperHeader = document.querySelector(".upper-header-container");
        this.upperContainer = document.querySelector(".upper-container");
        this.upperLeftContainer = document.querySelector(".upper-left-container");
        this.upperCenterContainer = document.querySelector(".upper-center-container");
        this.upperRightContainer = document.querySelector(".upper-right-container");
        this.unitsContainer = document.querySelector(".units-container");
        this.statsContainer = document.querySelector(".stats-container");

        //Lower Container
        this.lowerContainer = document.querySelector(".lower-container");
        this.lowerLeftContainer = document.querySelector(".lower-left-container");
        this.lowerCenterContainer = document.querySelector(".lower-center-container");
        this.lowerRightContainer = document.querySelector(".lower-right-container");

        this.drawCardButton = document.querySelector(".draw-card-button");
        this.showDeckButton = document.querySelector(".show-deck-button");
        this.gameBattleButton = document.querySelector(".game-battle-button");

        /*
        for (let i = 0; i < 5; i++) {
            const holdingCardSlot = document.createElement("div");
            holdingCardSlot.classList.add("holding-card-slot");
            holdingCardSlot.classList.add("holding-card-slot-" + i);
            this.lowerCenterContainer.appendChild(holdingCardSlot);
            this.holdingCardSlots.push(holdingCardSlot);

            const holdingCardRect = this.getElementRect(this.holdingCardSlots[i]);
            this.holdingCardRects.push(holdingCardRect);
        }
        */

        //Buttons in Canvas
        this.drawCardRect = this.getElementRect(this.drawCardButton);
        this.gameBattleRect = this.getElementRect(this.gameBattleButton);
        this.showDeckRect = this.getElementRect(this.showDeckButton);

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
    }

    drawSellingCardObjects() {
        const patternImage = new Image();
        patternImage.src = "/Assets/Card Background.png";
        const pattern = this.gameEngine.ctx.createPattern(patternImage, "repeat");

        for (let card of this.sellingUnitCards) {
            if (card == this.sellingUnitCards[this.holdingCardID]) {
                continue; //Don't draw selected card, drawHoldingCardObject() will draw it 
            }

            //this.gameEngine.context.fillStyle = pattern;
            //this.gameEngine.context.fillRect(card.x, card.y, card.width, card.height);
            this.gameEngine.ctx.drawImage(
                card.image,
                0,
                0,
                80,
                80,
                card.x,
                card.y,
                card.width,
                card.height
            )
        }
    }

    drawHoldingCardObject() {
        if (this.sellingUnitCards[this.holdingCardID]) {
            /* TO FULL WIDTH AND HEIGHT ONLY!!!
            const patternImage = new Image();
            patternImage.src = "/Assets/Card Background.png";
            const pattern = this.gameEngine.context.createPattern(patternImage, "repeat");
            this.gameEngine.context.fillStyle = pattern;
            this.gameEngine.context.fillRect(
                this.holdingCardObjects[this.holdingCardID].x,
                this.holdingCardObjects[this.holdingCardID].y,
                this.holdingCardObjects[this.holdingCardID].width,
                this.holdingCardObjects[this.holdingCardID].height
            );
            //*/

            this.gameEngine.ctx.drawImage(
                this.sellingUnitCards[this.holdingCardID].image,
                0,
                0,
                80,
                80,
                this.sellingUnitCards[this.holdingCardID].x,
                this.sellingUnitCards[this.holdingCardID].y,
                this.sellingUnitCards[this.holdingCardID].width,
                this.sellingUnitCards[this.holdingCardID].height
            );
        }
    }

    rollSellingCards() {
        let rolledUnitCards = [];
        this.sellingUnitElements = [];
        this.sellingUnitRects = [];
        this.sellingUnitCards = [];
        this.summonedUnitTypesElements = [];
        this.summonedUnitStatsElements = [];

        //Removes all children elements of this.lowerCenterContainer
        while (this.lowerCenterContainer.hasChildNodes()) {
            this.lowerCenterContainer.removeChild(this.lowerCenterContainer.firstChild)
        }

        //Removes elements generated by setSummonElement():
        while (this.unitsContainer.hasChildNodes()) {
            this.unitsContainer.removeChild(this.unitsContainer.firstChild)
        }

        while (this.statsContainer.hasChildNodes()) {
            this.statsContainer.removeChild(this.statsContainer.firstChild)
        }

        //Removes all children elements of this.lowerCenterContainer
        while (this.lowerCenterContainer.hasChildNodes()) {
            this.lowerCenterContainer.removeChild(this.lowerCenterContainer.firstChild)
        }

        this.setSummonElements();

        for (let i = 0; i < this.sellingUnitCount; i++) {
            rolledUnitCards.push(this.gameEngine.playingUnits[Math.floor(Math.random() * this.gameEngine.playingUnits.length)]);

            const sellingUnitElement = this.getSellingCardElement(
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
                imageSrc: rolledUnitCards[i].imageSrc,
                x: this.sellingUnitRects[i].x,
                y: this.sellingUnitRects[i].y + (this.sellingUnitRects[i].y * 0.05),
                width: this.gameEngine.cardWidth,
                height: this.gameEngine.cardHeight * 0.7,

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

    setSummonElements() {
        for (let i = 0; i < 6; i++) {
            //For Summoned Unit Elements
            const summonedUnitElement = document.createElement("div");
            summonedUnitElement.classList.add("summoned-unit-container");

            const summonedUnitField = document.createElement("img");
            summonedUnitField.setAttribute("src", this.summonFieldImage.src);
            summonedUnitElement.appendChild(summonedUnitField);

            this.unitsContainer.appendChild(summonedUnitElement);
            this.summonedUnitElements.push(summonedUnitElement);
            const summonedUnitRect = this.getElementRect(summonedUnitElement);
            this.summonedUnitRects.push(summonedUnitRect);

            //For Summoned Unit Cards
            const tempCard = new Card({
                imageSrc: "",
                name: "",
                tier: null,
                type1: "",
                type2: "",
                power: null,
                health: null,
                effectDesc: "",
                effectFunc: null,
            });
            this.summonedUnitCards.push(tempCard);

            //For Summoned Unit Stats Elements
            const unitStatsElement = document.createElement("div");
            unitStatsElement.classList.add("summoned-stats-container");

            const unitTypes = document.createElement("div");
            unitTypes.classList.add("summoned-unit-types");
            unitTypes.innerHTML = (``);
            unitStatsElement.appendChild(unitTypes);

            const unitStats = document.createElement("div");
            unitStats.classList.add("summoned-unit-stats");
            unitStats.innerHTML = (``);
            unitStatsElement.appendChild(unitStats);

            this.statsContainer.appendChild(unitStatsElement);

            this.summonedUnitTypesElements.push(unitTypes);
            this.summonedUnitStatsElements.push(unitStats);
        }
    }

    setSummonedUnit(index, card) {
        this.summonedUnitCards[index].image = card.image;
        this.summonedUnitCards[index].x = card.x;
        this.summonedUnitCards[index].y = card.y;
        this.summonedUnitCards[index].width = card.width;
        this.summonedUnitCards[index].height = card.height;

        this.summonedUnitCards[index].name = card.name;
        this.summonedUnitCards[index].tier = card.tier;
        this.summonedUnitCards[index].type1 = card.type1;
        this.summonedUnitCards[index].type2 = card.type2;
        this.summonedUnitCards[index].power = card.power;
        this.summonedUnitCards[index].health = card.health;
        this.summonedUnitCards[index].effectDesc = card.effectDesc;
        this.summonedUnitCards[index].effectFunc = card.effectFunc;

        this.summonedUnitCards[index].baseX = this.summonedUnitCards[index].x;
        this.summonedUnitCards[index].baseY = this.summonedUnitCards[index].y;

        this.summonedUnitTypesElements[index].innerHTML = (
            `${TYPES.TYPES_ICONS[this.summonedUnitCards[index].type1]} ${TYPES.TYPES_ICONS[this.summonedUnitCards[index].type2]}`
        );
        this.summonedUnitStatsElements[index].innerHTML = (`${this.summonedUnitCards[index].power}⚔️ ${this.summonedUnitCards[index].health}❤️`);
    }

    setSellingElements(index) {
        for (let i = 0; i < this.sellingUnitCount; i++) {
            if (this.sellingUnitCards[i].baseX != this.sellingUnitRects[i].x
                && this.sellingUnitCards[i].baseY != this.sellingUnitRects[i].y) {

                while (this.sellingUnitElements[i].hasChildNodes()) {
                    this.sellingUnitElements[i].removeChild(this.sellingUnitElements[i].firstChild)
                }
            }
        }
    }

}