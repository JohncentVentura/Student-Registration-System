class PlayMenu extends Menu {
    constructor(params) {
        super(params);

        this.upperBackgroundImage = new Image();
        this.upperBackgroundImage.src = "/Assets/BG Field.png";

        this.allyElements = [];
        this.allyRects = [];

        this.holdingCardSlots = [];
        this.holdingCardRects = [];
        this.holdingCardStatsSlots = [];
        this.holdingCardStatsRects = [];

        this.holdingCardData = []; //Blueprint for Objects
        this.holdingCardObjects = []; //Rendered on the canvas
        this.playingCardData = [];
        this.playingCardObjects = [];

        //Mouse
        this.mouseX = 0;
        this.mouseY = 0;
        this.holdingCardID = -1;
        this.isHoldingCard = false;
    }

    onMouseMove = event => {
        this.onMouseMoveOnCard(event);

        this.holdingCardObjects.map(card => {
            if (this.isCardInRect(card, this.allyRects[0])) {
                console.log("isCardInRect allyRects 0");
            }
            else if (this.isCardInRect(card, this.allyRects[1])) {
                console.log("isCardInRect allyRects 1");
            }
            else if (this.isCardInRect(card, this.allyRects[2])) {
                console.log("isCardInRect allyRects 2");
            }
            else if (this.isCardInRect(card, this.allyRects[3])) {
                console.log("isCardInRect allyRects 3");
            }
            else if (this.isCardInRect(card, this.allyRects[4])) {
                console.log("isCardInRect allyRects 4");
            }
            else if (this.isCardInRect(card, this.allyRects[5])) {
                console.log("isCardInRect allyRects 4");
            }
            else if (!this.isHoldingCard) { //Return to original position

            }
        })
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

            let holdingCard = this.holdingCardObjects[this.holdingCardID];
            holdingCard.x += newCardX;
            holdingCard.y += newCardY;

            this.drawHoldingCardObjects();
            this.mouseX = newMouseX; //Slows the dragging
            this.mouseY = newMouseY;
        }
    }

    onMouseDown = event => {
        this.onMouseDownOnCard(event);

        if (this.isMouseInRect(this.drawCardRect)) {
            console.log("Draw cards")
            this.rollHoldingCards();
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

        this.holdingCardObjects.map(card => {
            if (this.isMouseInCard(card)) {
                this.holdingCardID = cardId;
                this.isHoldingCard = true;
                return;
            }
            cardId++; //Increments until the if statement returns to end map()
        });
    }

    onMouseUp = event => {
        if (this.isHoldingCard && this.holdingCardObjects[this.holdingCardID].x === this.holdingCardObjects[this.holdingCardID].baseX
            && this.holdingCardObjects[this.holdingCardID].y === this.holdingCardObjects[this.holdingCardID].baseY) {
            this.createCardDisplayElement(
                this.holdingCardObjects[this.holdingCardID].image.src,
                this.holdingCardObjects[this.holdingCardID].name,
                this.holdingCardObjects[this.holdingCardID].tier,
                this.holdingCardObjects[this.holdingCardID].type1,
                this.holdingCardObjects[this.holdingCardID].type2,
                this.holdingCardObjects[this.holdingCardID].power,
                this.holdingCardObjects[this.holdingCardID].health,
                this.holdingCardObjects[this.holdingCardID].effectDesc
            );
        }

        this.onMouseUpOnCard(event);
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
            this.gameEngine.context.drawImage(this.gameEngine.buttonHoverImage, this.drawCardRect.x, this.drawCardRect.y, this.drawCardRect.width, this.drawCardRect.height);
        } else {
            this.gameEngine.context.drawImage(this.gameEngine.buttonDefaultImage, this.drawCardRect.x, this.drawCardRect.y, this.drawCardRect.width, this.drawCardRect.height);
        }

        //Show Deck Button
        if (this.isMouseInRect(this.showDeckRect)) {
            this.gameEngine.context.drawImage(this.gameEngine.buttonHoverImage, this.showDeckRect.x, this.showDeckRect.y, this.showDeckRect.width, this.showDeckRect.height);
        } else {
            this.gameEngine.context.drawImage(this.gameEngine.buttonDefaultImage, this.showDeckRect.x, this.showDeckRect.y, this.showDeckRect.width, this.showDeckRect.height);
        }

        //Draw Battle Button
        if (this.isMouseInRect(this.gameBattleRect)) {
            this.gameEngine.context.drawImage(this.gameEngine.buttonHoverImage, this.gameBattleRect.x, this.gameBattleRect.y, this.gameBattleRect.width, this.gameBattleRect.height);
        } else {
            this.gameEngine.context.drawImage(this.gameEngine.buttonDefaultImage, this.gameBattleRect.x, this.gameBattleRect.y, this.gameBattleRect.width, this.gameBattleRect.height);
        }

        //Cards Position to Ally Rects Position
        this.holdingCardObjects.forEach(card => {
            if (this.isCardInRect(card, this.allyRects[0]) && !this.isHoldingCard) {
                card.x = this.allyRects[0].x;
                card.y = this.allyRects[0].y;
            }
            else if (this.isCardInRect(card, this.allyRects[1]) && !this.isHoldingCard) {
                card.x = this.allyRects[1].x;
                card.y = this.allyRects[1].y;
            }
            else if (this.isCardInRect(card, this.allyRects[2]) && !this.isHoldingCard) {
                card.x = this.allyRects[2].x;
                card.y = this.allyRects[2].y;
            }
            else if (this.isCardInRect(card, this.allyRects[3]) && !this.isHoldingCard) {
                card.x = this.allyRects[3].x;
                card.y = this.allyRects[3].y;
            }
            else if (this.isCardInRect(card, this.allyRects[4]) && !this.isHoldingCard) {
                card.x = this.allyRects[4].x;
                card.y = this.allyRects[4].y;
            }
            else if (this.isCardInRect(card, this.allyRects[5]) && !this.isHoldingCard) {
                card.x = this.allyRects[5].x;
                card.y = this.allyRects[5].y;
            }
            else if (!this.isHoldingCard) { //Return to original position
                card.x = card.baseX;
                card.y = card.baseY;
            }
        })

        this.drawHoldingCardObjects();
        this.drawDraggingCardObject();
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

        //Lower Container
        this.lowerContainer = document.querySelector(".lower-container");
        this.lowerLeftContainer = document.querySelector(".lower-left-container");
        this.lowerCenterContainer = document.querySelector(".lower-center-container");
        this.lowerRightContainer = document.querySelector(".lower-right-container");

        this.drawCardButton = document.querySelector(".draw-card-button");
        this.showDeckButton = document.querySelector(".show-deck-button");
        this.gameBattleButton = document.querySelector(".game-battle-button");

        //Setting Creatures Slots & Rects, Holding Cards Slots & Rects
        for (let i = 0; i < 6; i++) {
            const allyElement = document.createElement("div");
            allyElement.classList.add("unit-slot");
            this.unitsContainer.appendChild(allyElement);
            this.allyElements.push(allyElement);

            const allyRect = this.getElementRect(this.allyElements[i]);
            this.allyRects.push(allyRect);
        }

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

        this.gameEngine.playingUnits = this.gameEngine.playingTier3Units;
        this.rollHoldingCards();

        console.log("AllySlots");
        console.log(this.allyElements);
        console.log("AllyRects");
        console.log(this.allyRects);
    }

    drawHoldingCardObjects() {
        const patternImage = new Image();
        patternImage.src = "/Assets/Card Background.png";
        const pattern = this.gameEngine.context.createPattern(patternImage, "repeat");

        for (let card of this.holdingCardObjects) {
            if (card == this.holdingCardObjects[this.holdingCardID]) {
                continue; //Don't draw selected card, drawDraggingCardObject() will draw it 
            }

            //this.gameEngine.context.fillStyle = pattern;
            //this.gameEngine.context.fillRect(card.x, card.y, card.width, card.height);
            this.gameEngine.context.drawImage(
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

    drawDraggingCardObject() {
        if (this.holdingCardObjects[this.holdingCardID]) {
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

            this.gameEngine.context.drawImage(
                this.holdingCardObjects[this.holdingCardID].image,
                0,
                0,
                80,
                80,
                this.holdingCardObjects[this.holdingCardID].x,
                this.holdingCardObjects[this.holdingCardID].y,
                this.holdingCardObjects[this.holdingCardID].width,
                this.holdingCardObjects[this.holdingCardID].height
            );
        }
    }

    rollHoldingCards() {
        const holdingCardSize = 5;
        this.holdingCardData = [];
        this.holdingCardObjects = [];

        this.holdingCardSlots = [];
        this.holdingCardRects = [];
        while (this.lowerCenterContainer.hasChildNodes()) {
            this.lowerCenterContainer.removeChild(this.lowerCenterContainer.firstChild)
        }

        for (let i = 0; i < holdingCardSize; i++) {
            this.holdingCardData.push(this.gameEngine.playingUnits[Math.floor(Math.random() * this.gameEngine.playingUnits.length)]);
        }

        for (let i = 0; i < holdingCardSize; i++) {
            const holdingCardSlot = this.getCreatedCardElement(
                this.holdingCardData[i].imageSrc,
                this.holdingCardData[i].type1,
                this.holdingCardData[i].type2,
                this.holdingCardData[i].power,
                this.holdingCardData[i].health
            )
            this.lowerCenterContainer.appendChild(holdingCardSlot);
            this.holdingCardSlots.push(holdingCardSlot);

            const holdingCardRect = this.getElementRect(this.holdingCardSlots[i]);
            this.holdingCardRects.push(holdingCardRect);
        }  

        for (let i = 0; i < holdingCardSize; i++) {
            const cardObject = new CardObject({
                gameEngine: this.gameEngine,
                x: this.holdingCardRects[i].x,
                y: this.holdingCardRects[i].y + (this.holdingCardRects[i].y * 0.05),
                width: this.gameEngine.cardWidth,
                height: this.gameEngine.cardHeight * 0.7,

                name: this.holdingCardData[i].name,
                imageSrc: this.holdingCardData[i].imageSrc,
                tier: this.holdingCardData[i].tier,
                type1: this.holdingCardData[i].type1,
                type2: this.holdingCardData[i].type2,
                power: this.holdingCardData[i].power,
                health: this.holdingCardData[i].health,
                effectDesc: this.holdingCardData[i].effectDesc,
                effectFunc: this.holdingCardData[i].effectFunc
            });
            this.holdingCardObjects.push(cardObject)
        }
    }

    getCreatedCardElement(imageSrc, type1, type2, power, health) {
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

        const cardImage = document.createElement("div");
        cardImage.classList.add("card-image");
        //cardImage.setAttribute(`src`, `${imageSrc}`);
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

    getPlayedCardStatsElement(){
        
    }

}