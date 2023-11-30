class BattleMenu extends Menu {
    constructor(params) {
        super(params);

        //Upper Container
        this.upperContainer = null;
        this.upperHeader = null;
        this.creaturesContainer = null;
        this.alliesContainer = null;
        this.enemiesContainer = null;
        this.allySlots = [];
        this.enemySlots = [];
        this.allyRects = [];
        this.enemyRects = [];

        //Lower Container
        this.lowerContainer = null;
        this.lowerLeftContainer = null;
        this.lowerCenterContainer = null;
        this.lowerRightContainer = null;

        this.drawCardButton = null;
        this.drawCardRect = null;
        this.holdingCardSlots = [];
        this.holdingCardRects = [];
        this.gameBattleButton = [];
        this.gameBattleRect = [];

        //Misc
        this.cardObjects = [];

        this.isMouseInButton = (x, y, button) => {
            if (x > button.left && x < button.right && y > button.top && y < button.bottom) {
                return true;
            }
            return false;
        }

        this.onMouseDown = event =>{
            event.preventDefault();
            let x = parseInt(event.offsetX);
            let y = parseInt(event.offsetY);

            if(this.isMouseInButton(x, y, this.drawCardRect)){
                console.log("Drawing card from deck");
            }
            else if(this.isMouseInButton(x, y, this.gameBattleRect)){
                console.log("Battle System is still in development...");
            }
        }
    }

    update() {
        this.drawCardObject();

        this.gameEngine.context.fillStyle = `white`;
        this.gameEngine.context.fillRect(this.drawCardRect.x, this.drawCardRect.y, this.drawCardRect.width, this.drawCardRect.height);
        this.gameEngine.context.drawImage(this.gameEngine.testImg, this.gameBattleRect.x, this.gameBattleRect.y, this.gameBattleRect.width, this.gameBattleRect.height);

        this.gameEngine.canvas.onmousedown = this.onMouseDown;
    }

    launch() {
        this.addElement("battle-menu",
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
        for (let i = 0; i < 5; i++) {
            const cardObject = new CardObject({
                gameEngine: this.gameEngine,
                x: this.holdingCardRects[i].x,
                y: this.holdingCardRects[i].y,
                width: this.gameEngine.cardWidth,
                height: this.gameEngine.cardHeight,
                color: `green`
            });
            this.cardObjects.push(cardObject);
        }
        

        this.cardObjects[0].color = `red`;
        this.cardObjects[1].color = `orange`;
        this.cardObjects[2].color = `yellow`;
        this.cardObjects[3].color = `green`;
        this.cardObjects[4].color = `blue`;

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

    drawCardObject() {
        this.cardObjects.map(card => {
            this.gameEngine.context.fillStyle = card.color;
            this.gameEngine.context.fillRect(card.x, card.y, card.width, card.height);
        });
    }
}