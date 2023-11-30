class DeckEditMenu extends Menu {
    constructor(params) {
        super(params);
        this.cardObjects = []; //Drawn in Canvas
        this.cardWidth = 70;
        this.cardHeight = 100;

        //Deck Cover
        this.deckCoverElement = null;
        this.deckCoverRect = null;

        //Elements & Rects
        this.deckContainer = null;
        this.trunkContainer = null;
        this.deckBinder = null;
        this.trunkBinder = null;
        this.slotsPerPage = 32;
        this.deckSlots = [];
        this.trunkSlots = [];
        this.deckSlotRects = [];
        this.trunkSlotRects = [];

        //Mouse Variables & Events
        this.currentCardIndex = null;
        this.isDraggingCard = false;
        this.startX = 0;
        this.startY = 0;
        this.currentCard = null;

        this.isMouseInCard = (x, y, card) => {
            let cardLeft = card.x;
            let cardRight = card.x + card.width;
            let cardTop = card.y;
            let cardBottom = card.y + card.height;

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
            this.cardObjects.map(card => {
                if (this.isMouseInCard(this.startX, this.startY, card)) {
                    this.currentCardIndex = index;
                    this.isDraggingCard = true;
                    return;
                }
                index++; //Increments until the if statement returns to end map()
            });
        }

        this.onMouseUpOrOut = (event) => {
            if (!this.isDraggingCard) {
                return;
            }
            console.log(this.trunkSlotRects[0])
            this.currentCard = this.cardObjects[this.currentCardIndex];
            if (this.isDraggingCard && this.currentCard.x === this.currentCard.baseX && this.currentCard.y === this.currentCard.baseY) {
                console.log("Show card " + this.currentCardIndex + " details");
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

                this.currentCard = this.cardObjects[this.currentCardIndex];
                this.currentCard.x += dx;
                this.currentCard.y += dy;

                this.drawCardObject();
                this.startX = mouseX; //Slows the dragging
                this.startY = mouseY;
            }
        }

        this.isCardInDeckCover = (rect, card) => {
            let cardLeft = card.x;
            let cardRight = card.x + card.width;
            let cardTop = card.y;
            let cardBottom = card.y + card.height;

            let rectLeft = rect.x;
            let rectRight = rect.x + rect.width;
            let rectTop = rect.y;
            let rectBottom = rect.y + rect.height;

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
            if (this.isCardInDeckCover(this.deckCoverRect, card) && !this.isDraggingCard) {
                card.x = this.deckCoverRect.x;
                card.y = this.deckCoverRect.y;
            }
            else if (!this.isDraggingCard) {
                card.x = card.baseX;
                card.y = card.baseY;
            }
        })

        this.drawCardObject();
        console.log(this.cardObjects[0].x, this.cardObjects[0].y, this.cardObjects[0].baseX, this.cardObjects[0].baseY);
    }

    launch() {
        //Elements
        this.addElement("deck-edit-menu",
            `<div class="deck-container">
                <h3>Deck</h3>
                <div class="deck-container-2">
                    <div class="card-slot deck-cover"></div>
                    <div>Deck Cover</div>
                        <div class="deck-container-3">
                            <span>Deck Name</span>
                            <span>1 cost Unit: 0</span>
                            <span>2 cost Unit: 0</span>
                        </div>
                    </div class="deck-container-2">
                <div class="deck-binder"></div>
            </div class="deck-container">
            </div>
            <div class="trunk-container">
                <h3>Trunk</h3>
                <div class="trunk-binder"></div>
            </div>`
        );
        this.deckContainer = document.querySelector(".deck-container");
        this.trunkContainer = document.querySelector(".trunk-container");
        this.deckBinder = document.querySelector(".deck-binder");
        this.trunkBinder = document.querySelector(".trunk-binder");

        //Deck Cover
        this.deckCoverElement = this.deckContainer.querySelector(".deck-cover");
        this.deckCoverRect = this.deckCoverElement.getBoundingClientRect();
        this.deckCoverRect.x -= this.gameEngine.containerRect.x;
        this.deckCoverRect.y -= this.gameEngine.containerRect.y;

        //Trunk Cards
        for (let i = 0; i < this.slotsPerPage; i++) {
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
        for (let i = 0; i < this.gameEngine.gameProgress.unlockedCards; i++) {
            const cardObject = new CardObject({
                gameEngine: this.gameEngine,
                x: this.trunkSlotRects[i].x,
                y: this.trunkSlotRects[i].y,
                width: this.gameEngine.cardWidth,
                height: this.gameEngine.cardHeight,
                color: `green`
            });
            this.cardObjects.push(cardObject);
        }
        
        this.logArrays();

        //window event
        window.addEventListener('resize', event => {
            if (this.gameEngine.isGameResized && this != undefined) {
                //Deck Cover
                this.deckCoverRect = this.deckCoverElement.getBoundingClientRect();
                this.deckCoverRect.x -= this.gameEngine.containerRect.x;
                this.deckCoverRect.y -= this.gameEngine.containerRect.y;

                //Trunk Rects
                this.trunkSlotRects = [];
                for (let i = 0; i < this.slotsPerPage; i++) {
                    const slotRect = this.trunkSlots[i].getBoundingClientRect();
                    slotRect.x -= this.gameEngine.containerRect.x;
                    slotRect.y -= this.gameEngine.containerRect.y;
                    this.trunkSlotRects.push(slotRect);
                }

                //Card Objects
                for (let i = 0; i < this.gameEngine.gameProgress.unlockedCards; i++) {
                    this.cardObjects[i].baseX = this.trunkSlotRects[i].x;
                    this.cardObjects[i].baseY = this.trunkSlotRects[i].y;
                    this.cardObjects[i].width = this.gameEngine.cardWidth;
                    this.cardObjects[i].height = this.gameEngine.cardHeight;
                }

                this.logArrays();
            }
        })
    }

    logArrays() {
        console.log("DeckEditMenu launch() this.deckCoverRect");
        console.log(this.deckCoverRect)
        //console.log("DeckEditMenu launch() this.trunkSlots");
        //console.log(this.trunkSlots);
        console.log("DeckEditMenu launch() this.trunkSlotRects");
        console.log(this.trunkSlotRects)
        console.log("DeckEditMenu launch() this.cardObjects");
        console.log(this.cardObjects);
    }

    drawCardObject() {
        this.cardObjects.map(card => {
            this.gameEngine.context.fillStyle = card.color;
            this.gameEngine.context.fillRect(card.x, card.y, card.width, card.height);
        });
    }

}
