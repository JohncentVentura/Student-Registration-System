class PlayMenu extends Menu {
    constructor(params) {
        super(params);

        this.allySlots = [];
        this.enemySlots = [];
        this.allyRects = [];
        this.enemyRects = [];

        this.holdingCardSlots = [];
        this.holdingCardRects = [];

        this.holdingCardData = []; //Blueprint for Objects
        this.holdingCardObjects = []; //Rendered on the screen
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
                this.holdingCardObjects[this.holdingCardID].rank,
                this.holdingCardObjects[this.holdingCardID].race,
                this.holdingCardObjects[this.holdingCardID].role,
                this.holdingCardObjects[this.holdingCardID].attack,
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
            else if (!this.isHoldingCard) { //Return to original position
                card.x = card.baseX;
                card.y = card.baseY;
            }
        })

        this.drawHoldingCardObjects();
        this.drawSelectedCardObject();
    }

    launch() {
        this.createMenuElement("play-battle-menu",

            `<div class="upper-container">
                <div class="upper-header">
                    <div>Turn 99</div>
                    <div>Life Points  5</div>
                    <div>Mana 10</div>
                    <div>Timer 60</div>
                </div>
                <div class="creatures-container">
                    <div class="allies-container">
                    </div>
                    <div class="enemies-container">
                    </div>
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
            </div>`
        );
        this.element.style.setProperty('z-index', '-1'); //Canvas will be rendered before innerHTML so canvas is interactable

        //Upper Container
        this.upperContainer = document.querySelector(".upper-container");
        this.upperHeader = document.querySelector(".upper-header");
        this.creaturesContainer = document.querySelector(".creatures-container");
        this.alliesContainer = document.querySelector(".allies-container");
        this.enemiesContainer = document.querySelector(".enemies-container");

        //Lower Container
        this.lowerContainer = document.querySelector(".lower-container");
        this.lowerLeftContainer = document.querySelector(".lower-left-container");
        this.lowerCenterContainer = document.querySelector(".lower-center-container");
        this.lowerRightContainer = document.querySelector(".lower-right-container");

        this.drawCardButton = document.querySelector(".draw-card-button");
        this.gameBattleButton = document.querySelector(".game-battle-button");

        //Setting Creatures Slots & Rects, Holding Cards Slots & Rects
        for (let i = 0; i < 5; i++) {
            const allySlot = document.createElement("div");
            allySlot.classList.add("creature-slot");
            allySlot.classList.add("ally-slot-" + i);
            this.alliesContainer.appendChild(allySlot);
            this.allySlots.push(allySlot);

            const allyRect = this.allySlots[i].getBoundingClientRect();
            allyRect.x -= this.gameEngine.containerRect.x;
            allyRect.y -= this.gameEngine.containerRect.y;
            this.allyRects.push(allyRect);

            const enemySlot = document.createElement("div");
            enemySlot.classList.add("creature-slot");
            enemySlot.classList.add("enemy-slot-" + i);
            this.enemiesContainer.appendChild(enemySlot);
            this.enemySlots.push(enemySlot);

            const enemyRect = this.enemySlots[i].getBoundingClientRect();
            enemyRect.x -= this.gameEngine.containerRect.x;
            enemyRect.y -= this.gameEngine.containerRect.y;
            this.enemyRects.push(enemyRect);

            const holdingCardSlot = document.createElement("div");
            holdingCardSlot.classList.add("holding-card-slot");
            holdingCardSlot.classList.add("holding-card-slot-" + i);
            this.lowerCenterContainer.appendChild(holdingCardSlot);
            this.holdingCardSlots.push(holdingCardSlot);

            const holdingCardRect = this.holdingCardSlots[i].getBoundingClientRect();
            holdingCardRect.x -= this.gameEngine.containerRect.x;
            holdingCardRect.y -= this.gameEngine.containerRect.y;
            this.holdingCardRects.push(holdingCardRect);
        }

        //Buttons in Canvas
        this.drawCardRect = this.drawCardButton.getBoundingClientRect();
        this.drawCardRect.x -= this.gameEngine.containerRect.x;
        this.drawCardRect.y -= this.gameEngine.containerRect.y;
        this.gameBattleRect = this.gameBattleButton.getBoundingClientRect();
        this.gameBattleRect.x -= this.gameEngine.containerRect.x;
        this.gameBattleRect.y -= this.gameEngine.containerRect.y;

        //Deck & Cards Setup
        //* TEMPORARY!!! playingUnits will be initialized later on
        this.gameEngine.playingRankOneUnits = this.gameEngine.rankOneUnits;
        this.gameEngine.playingRankTwoUnits = this.gameEngine.rankTwoUnits;
        this.gameEngine.playingRankThreeUnits = this.gameEngine.rankThreeUnits;
        //*/

        this.gameEngine.playingDeck = this.gameEngine.playingRankOneUnits;
        this.rollHoldingCards();
    }

    drawHoldingCardObjects() {
        const patternImage = new Image();
        patternImage.src = "/Assets/Card Background.png";
        const pattern = this.gameEngine.context.createPattern(patternImage, "repeat");

        for (let card of this.holdingCardObjects) {
            if (card == this.holdingCardObjects[this.holdingCardID]) {
                continue; //Don't draw selected card, drawSelectedCardObject() will draw it 
            }

            this.gameEngine.context.fillStyle = pattern;
            this.gameEngine.context.fillRect(card.x, card.y, card.width, card.height);
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

    drawSelectedCardObject() {
        if (this.holdingCardObjects[this.holdingCardID]) {
            //* TO FULL WIDTH AND HEIGHT ONLY!!!
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
        this.holdingCardData = [];
        this.holdingCardObjects = [];

        for (let i = 0; i < 4; i++) {
            this.holdingCardData.push(this.gameEngine.playingDeck[Math.floor(Math.random() * this.gameEngine.playingDeck.length)]);
        }

        for (let i = 0; i < 4; i++) {
            const cardObject = new CardObject({
                gameEngine: this.gameEngine,
                x: this.holdingCardRects[i].x,
                y: this.holdingCardRects[i].y,
                width: this.gameEngine.cardWidth,
                height: this.gameEngine.cardHeight,

                name: this.holdingCardData[i].name,
                imageSrc: this.holdingCardData[i].imageSrc,
                rank: this.holdingCardData[i].rank,
                race: this.holdingCardData[i].race,
                role: this.holdingCardData[i].role,
                attack: this.holdingCardData[i].attack,
                health: this.holdingCardData[i].health,
                effectDesc: this.holdingCardData[i].effectDesc,
                effectFunc: this.holdingCardData[i].effectFunc
            });
            this.holdingCardObjects.push(cardObject)
        }
    }

}