class DeckEditMenu extends Menu {
    constructor(params) {
        super(params);

        //Deck Cover
        this.deckCoverElement = null;
        this.deckCoverRect = null;

        //Elements & Rects
        this.deckContainer = null;
        this.trunkContainer = null;
        this.deckBinder = null;
        this.trunkBinder = null;
        this.deckBinderRect = null;
        this.trunkBinderRect = null;
        this.slotsPerPage = 32;
        this.deckSlots = [];
        this.trunkSlots = [];
        this.deckSlotRects = [];
        this.trunkSlotRects = [];
    }

    onMouseMove = event => {
        this.onMouseMoveOnCard(event);
    }

    onMouseDown = event => {
        this.onMouseDownOnCard(event);
    }

    onMouseUp = event => {
        this.onMouseUpOnCard(event);
    }

    update() {
        this.gameEngine.canvas.onmousedown = this.onMouseDown;
        this.gameEngine.canvas.onmousemove = this.onMouseMove;
        this.gameEngine.canvas.onmouseout = this.onMouseOut;
        this.gameEngine.canvas.onmouseup = this.onMouseUp;

        this.cardObjects.map(card => {
            if (this.isCardInRect(card, this.deckCoverRect) && !this.isHoldingCard) { //Set card position to deck cover position
                card.x = this.deckCoverRect.x;
                card.y = this.deckCoverRect.y;
            }
            else if (!this.isHoldingCard) { //Return to original position
                card.x = card.baseX;
                card.y = card.baseY;
            }
        })

        this.drawCardObjects();
        this.drawHoldingCard();
        //console.log(this.cardObjects[0].x, this.cardObjects[0].y, this.cardObjects[0].baseX, this.cardObjects[0].baseY);
    }

    launch() {
        //Elements
        this.addMenuElement("deck-edit-menu",
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

        //Binder Rects
        this.deckBinderRect = this.deckBinder.getBoundingClientRect();
        this.deckBinderRect.x -= this.gameEngine.containerRect.x;
        this.deckBinderRect.y -= this.gameEngine.containerRect.y;
        this.trunkBinderRect = this.trunkBinder.getBoundingClientRect();
        this.trunkBinderRect.x -= this.gameEngine.containerRect.x;
        this.trunkBinderRect.y -= this.gameEngine.containerRect.y;

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
                name: "card-"+i,
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

    

}
