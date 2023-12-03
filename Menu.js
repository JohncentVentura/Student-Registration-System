class Menu {
    constructor(params) {
        this.gameEngine = params.gameEngine;

        //Elements
        this.element = null;
        this.backButton = null;

        //Mouse
        this.mouseX = 0;
        this.mouseY = 0;
        this.cardObjects = [];
        this.isHoldingCard = false;
        this.holdingCardID = 0;
    }

    update() {
        //Overrided by child class
    }

    launch() {
        //Overrided by child class
    }

    createMenuElement(className, innerHTML) {
        this.element = document.createElement("div");
        this.element.classList.add("menu");
        this.element.classList.add(className);
        this.element.innerHTML = innerHTML;
        this.gameEngine.container.appendChild(this.element);

        //Prevents context menu when right clicking in the canvas
        this.gameEngine.canvas.addEventListener("contextmenu", event => {
            if (event.button === 2) event.preventDefault();
        })

        //Prevents context menu when right clicking in the HTML element
        this.element.addEventListener("contextmenu", event => {
            //if (event.button === 2) event.preventDefault();
        })
    }

    createCardDisplayElement(imageSrc, name, tier, power, health, ability) {
        const cardBackground = document.createElement("div");
        cardBackground.classList.add("card-background");

        const cardDisplay = document.createElement("div");
        cardDisplay.classList.add("card-display");
        cardBackground.appendChild(cardDisplay);

        const cardImage = document.createElement("img");
        cardImage.classList.add("card-image");
        cardImage.setAttribute("src", `${imageSrc}`);
        cardDisplay.appendChild(cardImage);

        const cardName = document.createElement("div");
        cardName.classList.add("card-name");
        cardName.innerHTML = (`${name}`);
        cardDisplay.appendChild(cardName);
        
        const cardStatsContainer = document.createElement("div");
        cardStatsContainer.classList.add("card-stats-container");
        cardDisplay.appendChild(cardStatsContainer);
        
        const cardTier = document.createElement("div");
        cardTier.classList.add("card-tier");
        cardTier.innerHTML = (`⭐ ${tier}`);
        cardStatsContainer.appendChild(cardTier);

        const cardAttack = document.createElement("div");
        cardAttack.classList.add("card-attack");
        cardAttack.innerHTML = (`⚔️ ${power}`);
        cardStatsContainer.appendChild(cardAttack);

        const cardHealth = document.createElement("div");
        cardHealth.classList.add("card-health");
        cardHealth.innerHTML = (`❤️ ${health}`);
        cardStatsContainer.appendChild(cardHealth);

        const cardAbility = document.createElement("div");
        cardAbility.classList.add("card-ability");
        cardAbility.innerHTML = (`${ability}`);
        cardDisplay.appendChild(cardAbility);

        this.gameEngine.container.appendChild(cardBackground);

        cardBackground.addEventListener("mousedown", event => {
            cardBackground.remove();
        })
    }

    /* For menus where cards has interactions */
    onMouseMove = event => {
        //this.mouseX = parseInt(event.offsetX);
        //this.mouseY = parseInt(event.offsetY);
    }

    onMouseDown = event => {

    }

    onMouseUp = event => {

    }

    onMouseOut = event => {
        console.log("Mouse is outside of canvas")
    }

    isMouseInCard(card) {
        if (this.mouseX > card.x && this.mouseX < (card.x + card.width) && this.mouseY > card.y && this.mouseY < (card.y + card.height)) {
            return true;
        }
        return false;
    }

    isMouseInRect(rect) {
        if (this.mouseX > rect.left && this.mouseX < rect.right && this.mouseY > rect.top && this.mouseY < rect.bottom) {
            return true;
        }
        return false;
    }

    isCardInRect(card, rect) {
        if (rect.left <= card.x && rect.right >= (card.x + card.width) && rect.top <= card.y && rect.bottom >= (card.y + card.height)) {
            return true;
        }
        return false;
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

            let holdingCard = this.cardObjects[this.holdingCardID];
            holdingCard.x += newCardX;
            holdingCard.y += newCardY;

            this.drawCardObjects();
            this.mouseX = newMouseX; //Slows the dragging
            this.mouseY = newMouseY;
        }
    }

    onMouseDownOnCard(event) {
        this.mouseX = parseInt(event.offsetX);
        this.mouseY = parseInt(event.offsetY);
        let cardId = 0;

        this.cardObjects.map(card => {
            if (this.isMouseInCard(card)) {
                this.holdingCardID = cardId;
                this.isHoldingCard = true;
                return;
            }
            cardId++; //Increments until the if statement returns to end map()
        })
    }


    onMouseUpOnCard(event) {
        if (!this.isHoldingCard) {
            return;
        } else {
            if (this.isHoldingCard && this.cardObjects[this.holdingCardID].x === this.cardObjects[this.holdingCardID].baseX
                && this.cardObjects[this.holdingCardID].y === this.cardObjects[this.holdingCardID].baseY) {
                //console.log("Show card " + this.cardObjects[this.holdingCardID].name + " details");
            }

            event.preventDefault();
            this.isHoldingCard = false;
            //this.holdingCard = null;
        }
    }

    drawCardObjects() {
        this.cardObjects.map(card => {
            /*
            this.gameEngine.context.fillStyle = card.color;
            this.gameEngine.context.fillRect(card.x, card.y, card.width, card.height);
            */

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
            //*/
        });
    }

    drawHoldingCard() {
        if (this.cardObjects[this.holdingCardID]) {
            this.gameEngine.context.drawImage(
                this.gameEngine.cardSampleImage,
                0,
                0,
                801,
                1202,
                this.cardObjects[this.holdingCardID].x,
                this.cardObjects[this.holdingCardID].y,
                this.cardObjects[this.holdingCardID].width,
                this.cardObjects[this.holdingCardID].height
            );
        }
    }

    tryDrawCardObject(card){
        if (this.cardObjects[this.holdingCardID]) {
            this.gameEngine.context.drawImage(
                this.gameEngine.cardSampleImage,
                0,
                0,
                801,
                1202,
                this.cardObjects[this.holdingCardID].x,
                this.cardObjects[this.holdingCardID].y,
                this.cardObjects[this.holdingCardID].width,
                this.cardObjects[this.holdingCardID].height
            );
        }

        this.gameEngine.context.fillStyle = 'blue';
        let tierRectX = card.x;
        let tierRectY = card.y;
        let tierRectWidth = card.width / 2;
        let tierRectHeight = card.height / 4;
        this.gameEngine.context.fillRect(tierRectX, tierRectY, tierRectWidth, tierRectHeight);

        this.gameEngine.context.fillStyle = 'orange';
        let attackRectX = card.x;
        let attackRectY = card.y + (card.height - (card.height / 4));
        let attackRectWidth = card.width / 2;
        let attackRectHeight = card.height / 4;
        this.gameEngine.context.fillRect(attackRectX, attackRectY, attackRectWidth, attackRectHeight);

        this.gameEngine.context.fillStyle = 'red';
        let healthRectX = card.x + attackRectWidth;
        let healthRectY = card.y + + (card.height - (card.height / 4));
        let healthRectWidth = card.width / 2;
        let healthRectHeight = card.height / 4;
        this.gameEngine.context.fillRect(healthRectX, healthRectY, healthRectWidth, healthRectHeight);
    }
}