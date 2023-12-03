class PlayBattleMenu extends Menu {
    constructor(params) {
        super(params);

        this.allySlots = [];
        this.enemySlots = [];
        this.allyRects = [];
        this.enemyRects = [];

        this.holdingCardSlots = [];
        this.holdingCardRects = [];
        this.gameBattleButton = [];
        this.gameBattleRect = [];
    }

    onMouseMove = event => {
        this.onMouseMoveOnCard(event);
    }

    onMouseDown = event => {
        this.onMouseDownOnCard(event);

        if (this.isMouseInRect(this.drawCardRect)) {
            console.log("Draw cards")
        }
        else if (this.isMouseInRect(this.gameBattleRect)) {
            console.log("Start Battle")
        }
    }

    onMouseUp = event => {
        if (this.isHoldingCard && this.cardObjects[this.holdingCardID].x === this.cardObjects[this.holdingCardID].baseX
            && this.cardObjects[this.holdingCardID].y === this.cardObjects[this.holdingCardID].baseY) {
            this.createCardDisplayElement(this.gameEngine.cardSampleImage.src, "Yasuo", 4, 4, 4, "WIND WALL!");
        }

        this.onMouseUpOnCard(event);
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
        this.cardObjects.map(card => {
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

        this.drawCardObjects();
        this.drawHoldingCard();
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
        
        //Card Objects
        for (let i = 0; i < this.gameEngine.deckOne.length; i++) {
            const cardObject = new CardObject({
                gameEngine: this.gameEngine,
                x: this.holdingCardRects[i].x,
                y: this.holdingCardRects[i].y,
                width: this.gameEngine.cardWidth,
                height: this.gameEngine.cardHeight,
                
                name: this.gameEngine.deckOne[i].name,
                imageSrc: this.gameEngine.deckOne[i].imageSrc,
                tier: this.gameEngine.deckOne[i].tier,
                attack: this.gameEngine.deckOne[i].attack,
                health: this.gameEngine.deckOne[i].health,
                effectDesc: this.gameEngine.deckOne[i].effectDesc,
                effectFunc: this.gameEngine.deckOne[i].effectFunc
            });
            this.cardObjects.push(cardObject);
        }

        console.log("Ally slots");
        console.log(this.allySlots);
        console.log("Enemy slots");
        console.log(this.enemySlots);
        console.log("Holdingc ard slots");
        console.log(this.holdingCardSlots);

        console.log("Ally rects");
        console.log(this.allyRects);
        console.log("Enemy rects");
        console.log(this.enemyRects);
        console.log("Holding Card rects");
        console.log(this.holdingCardRects);
        console.log("Card objects");
        console.log(this.cardObjects);
    }

    drawCardObjects() {
        for(let i = 0; i < this.gameEngine.deckOne.length; i++){
            this.gameEngine.context.drawImage(
                this.gameEngine.deckOne[i].image,
                0,
                0,
                50,
                50,
                this.cardObjects[i].x,
                this.cardObjects[i].y,
                this.gameEngine.cardWidth,
                this.gameEngine.cardHeight
            );
        }

        /*
        this.cardObjects.map(card => {
            //this.gameEngine.context.fillStyle = card.color;
            //this.gameEngine.context.fillRect(card.x, card.y, card.width, card.height);

            //*
            this.gameEngine.context.drawImage(
                this.gameEngine.cardSampleImage,
                0,
                0,
                801,
                1202,
                card.x,
                card.y,
                card.width,
                card.height
            )
            
        });
        */
    }

}