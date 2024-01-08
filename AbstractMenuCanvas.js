class AbstractMenuCanvas extends AbstractMenu {
    constructor(params) {
        super(params);
        if (this.constructor == AbstractMenuCanvas) { throw new Error("Abstract classes can't be instantiated.") }

        //Mouse
        this.mouseX = 0;
        this.mouseY = 0;
        this.isHoldingCard = false;
        this.holdingCard = null;
    }

    setTurnCountElement(count) {
        const element = document.querySelector(".turn-count");
        element.innerHTML = (`⏱️Turn: ${count}`);
    }

    setWaveCountElement(count) {
        const element = document.querySelector(".wave-count");
        element.innerHTML = (`👾Wave: ${count}`);
    }

    setLifePointsElement(points) {
        const element = document.querySelector(".life-points");
        element.innerHTML = (`❤️Life Points: ${points}`);
    }

    setManaPointsElement(points) {
        const element = document.querySelector(".mana-points");
        element.innerHTML = (`💎Mana Points: ${points}`);
    }

    createSellingCardElement(type1, type2, power, health) {
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

    getElementRect(element) {
        const rect = element.getBoundingClientRect();
        rect.x -= this.gameEngine.containerRect.x;
        rect.y -= this.gameEngine.containerRect.y;
        return rect;
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

            this.holdingCard.x += newCardX;
            this.holdingCard.y += newCardY;

            this.mouseX = newMouseX; //Slows the dragging
            this.mouseY = newMouseY;
        }
    }

    onMouseDownOnCard(event, sellingUnitCards, summonedUnitCards) {
        this.mouseX = parseInt(event.offsetX);
        this.mouseY = parseInt(event.offsetY);

        let allCards = [];
        allCards.push(...sellingUnitCards);
        allCards.push(...summonedUnitCards);

        allCards.map(card => {
            if (this.isMouseInCard(card)) {
                this.holdingCard = card;
                this.isHoldingCard = true;
                return;
            }
        })
    }

    onMouseUpOnCard(event) {
        if (!this.isHoldingCard) {
            return;
        } else if (this.isHoldingCard) {
            event.preventDefault();
            this.isHoldingCard = false;
            this.holdingCard = null;
        }
    }

    onMouseOut = event => {
        //console.log("Mouse is outside of canvas")
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

    drawCards(cards) {
        cards.map(card => {
            if (card != this.holdingCard && card.name != undefined) {
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
                );
            }
        });
    }

    drawHoldingCard() {
        if (this.holdingCard) {
            this.gameEngine.ctx.drawImage(
                this.holdingCard.image,
                0,
                0,
                80,
                80,
                this.holdingCard.x,
                this.holdingCard.y,
                this.holdingCard.width,
                this.holdingCard.height
            );
        }
    }
}