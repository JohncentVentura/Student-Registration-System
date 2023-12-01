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

    addMenuElement(className, innerHTML) {
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
            if (event.button === 2) event.preventDefault();
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
                console.log("Show card " + this.cardObjects[this.holdingCardID].name + " details");
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
}