class DeckEditMenu extends Menu {
    constructor(params) {
        super(params);
        this.cardObjects = []; //Drawn in Canvas
        this.cardWidth = 70;
        this.cardHeight = 100;

        this.deckCoverElement = null;
        this.deckCoverRect = null;
        this.trunkCardRect0 = null;

        //Elements
        this.deckBinder = null;
        this.trunkBinder = null;
        this.deckSlots = [];
        this.trunkSlots = [];
        this.deckSlotRects = [];
        this.trunkSlotRects = [];

        //Mouse Variables & Events
        this.currentCardIndex = null;
        this.isDraggingCard = false;
        this.startX = 0;
        this.startY = 0;

        this.isMouseInCard = (x, y, card) => {
            let cardLeft = card.x;
            let cardRight = card.x + card.width;
            let cardTop = card.y;
            let cardBottom = card.y + card.height;
            //console.log(x, y, cardLeft, cardRight, cardTop, cardBottom);

            if (x > cardLeft && x < cardRight && y > cardTop && y < cardBottom) {
                return true;
            }

            return false;
        }

        this.onMouseDown = (event) => {
            event.preventDefault();

            this.startX = parseInt(event.offsetX);
            this.startY = parseInt(event.offsetY);

            let index = 0;
            this.cardObjects.forEach(card => {
                if (this.isMouseInCard(this.startX, this.startY, card)) {
                    this.currentCardIndex = index;
                    this.isDraggingCard = true;
                    return;
                }
                index++;
            });
        }

        this.onMouseUpOrOut = (event) => {
            if (!this.isDraggingCard) {
                return;
            }

            event.preventDefault();
            this.isDraggingCard = false;
        }

        this.onMouseMove = (event) => {
            if (!this.isDraggingCard) {
                return;
            } else {
                event.preventDefault();
                let mouseX = parseInt(event.offsetX);
                let mouseY = parseInt(event.offsetY);

                let dx = mouseX - this.startX;
                let dy = mouseY - this.startY;

                let currenCard = this.cardObjects[this.currentCardIndex];
                currenCard.x += dx;
                currenCard.y += dy;

                this.drawCardObject();
                //console.log("cardPos: " + parseInt(currenCard.x), parseInt(currenCard.y))

                this.startX = mouseX; //Slows the dragging
                this.startY = mouseY;
            }
        }

        this.isCardInDeckCardRect0 = (rect, card) => {
            let cardLeft = card.x;
            let cardRight = card.x + card.width;
            let cardTop = card.y;
            let cardBottom = card.y + card.height;

            let rectLeft = rect.x;
            let rectRight = rect.x + rect.width;
            let rectTop = rect.y;
            let rectBottom = rect.y + rect.height;

            //console.log("rect " + rectLeft, rectRight, rectTop, rectBottom + " / card " + cardLeft, cardRight, cardTop, cardBottom);

            if (rectLeft <= cardLeft && rectRight >= cardRight && rectTop <= cardTop && rectBottom >= cardBottom) {
                return true;
            }

            return false;
        }
    }

    update() {
        this.gameEngine.canvas.onmousedown = this.onMouseDown;
        this.gameEngine.canvas.onmouseup = this.onMouseUpOrOut;
        this.gameEngine.canvas.onmouseout = this.onMouseUpOrOut;
        this.gameEngine.canvas.onmousemove = this.onMouseMove;

        this.cardObjects.map(card => {
            if (this.isCardInDeckCardRect0(this.deckCoverRect, card) && !this.isDraggingCard) {
                card.x = this.deckCoverRect.x;
                card.y = this.deckCoverRect.y;
            }
        })

        this.drawCardObject();
    }

    launch() {
        //Elements
        this.addElement("deck-edit-menu",
            `<div class="deck-container">
                <h3>Deck Name 00 / 40 </h3>
                <div class="deck-binder">
                    <div class="card-slot deck-cover">
                    </div>
                </div>
            </div>
            <div class="trunk-container">
                <h3>Trunk</h3>
                <div class="trunk-binder">
                </div>
            </div>`
        );
        this.deckBinder = document.querySelector(".deck-binder");
        this.trunkBinder = document.querySelector(".trunk-binder");

        //Deck Cover
        this.deckCoverElement = this.deckBinder.querySelector(".deck-cover");
        this.deckCoverRect = this.deckCoverElement.getBoundingClientRect();
        this.deckCoverRect.x -= this.gameEngine.containerRect.x;
        this.deckCoverRect.y -= this.gameEngine.containerRect.y;

        //Trunk Cards
        for (let i = 0; i < 32; i++) {
            const slotElement = document.createElement("div");
            slotElement.classList.add("card-slot");
            slotElement.classList.add("trunk-slot-" + i);
            this.trunkBinder.appendChild(slotElement);

            this.trunkSlots.push(slotElement);
            const slotRect = this.trunkSlots[i].getBoundingClientRect();
            slotRect.x -= this.gameEngine.containerRect.x;
            slotRect.y -= this.gameEngine.containerRect.y;
            this.trunkSlotRects.push(slotRect);
        }

        //Card Objects
        this.cardWidth = this.scaleCardSizeBaseOnCanvasSize(this.cardWidth);
        this.cardHeight = this.scaleCardSizeBaseOnCanvasSize(this.cardHeight);

        for (let i = 0; i < this.gameEngine.gameProgress.unlockedCards; i++) {
            this.cardObjects.push({
                x: this.trunkSlotRects[i].x,
                y: this.trunkSlotRects[i].y,
                width: this.cardWidth,
                height: this.cardHeight,
                color: `green`
            })
        }

        console.log("this.cardObjects");
        console.log(this.cardObjects);
        console.log("this.trunkSlots");
        console.log(this.trunkSlots);
        console.log("this.trunkSlotRects");
        console.log(this.trunkSlotRects)
    }

    drawCardObject() {
        this.cardObjects.forEach(card => {
            this.gameEngine.context.fillStyle = card.color;
            this.gameEngine.context.fillRect(card.x, card.y, card.width, card.height);
        });
    }

    scaleCardSizeBaseOnCanvasSize(cardSize) {
        const canvasWidth = this.gameEngine.canvas.width * 0.001;
        const newCardSize = cardSize * canvasWidth;
        return newCardSize;
    }
}
