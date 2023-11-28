class DeckEditMenu extends Menu {
    constructor(params) {
        super(params);
        this.cardObjects = []; //Drawn in Canvas
        this.cardWidth = 70;
        this.cardHeight = 100;
        this.trunkCards = [];

        //Elements
        this.deckCardsElement = null;
        this.trunkCardsElement = null;
        this.cardPosElements = [];

        //Mouse Variables & Events
        this.currentCardIndex = null;
        this.isDragging = false;
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
                    this.isDragging = true;
                    return;
                }
                index++;
            });
        }

        this.onMouseUpOrOut = (event) => {
            if (!this.isDragging) {
                return;
            }

            event.preventDefault();
            this.isDragging = false;
        }

        this.onMouseMove = (event) => {
            if (!this.isDragging) {
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
    }

    update() {
        this.gameEngine.canvas.onmousedown = this.onMouseDown;
        this.gameEngine.canvas.onmouseup = this.onMouseUpOrOut;
        this.gameEngine.canvas.onmouseout = this.onMouseUpOrOut;
        this.gameEngine.canvas.onmousemove = this.onMouseMove;
        this.drawCardObject();
    }

    launch() {
        //Elements
        this.addElement("deck-edit-menu",
            `<div class="deck-container">
                <h3>Deck</h3>
                <div class="deck-cards"></div>
            </div>
            <div class="trunk-container">
                <h3>Trunk</h3>
                <div class="trunk-cards">
                    <div class="card-pos card-pos-0"></div>
                </div>
            </div>`);
        this.deckCardsElement = document.querySelector(".deck-cards");
        this.trunkCardsElement = document.querySelector(".trunk-cards");

        const cardPos0 = document.querySelector(".card-pos-0");
        this.cardPosElements.push(cardPos0);
        const cardPosRect = this.cardPosElements[0].getBoundingClientRect();
        
        let gameContainerRect = this.gameEngine.container.getBoundingClientRect();
        console.log("gameContainerRect pos: "+gameContainerRect.x, gameContainerRect.y);

        let cardPosX = cardPosRect.x - gameContainerRect.x;
        let cardPosY = cardPosRect.y - gameContainerRect.y;
        console.log("cardPos "+cardPosX, cardPosY)



        //Card Objects
        this.cardWidth = this.scaleCardSize(this.cardWidth);
        this.cardHeight = this.scaleCardSize(this.cardHeight);

        this.cardObjects.push({
            x: cardPosX,
            y: cardPosY,
            width: this.cardWidth,
            height: this.cardHeight,
            color: 'red'
        });
        this.cardObjects.push({
            x: this.gameEngine.canvas.width - this.cardWidth,
            y: 0,
            width: this.cardWidth,
            height: this.cardHeight,
            color: 'blue'
        });
        this.cardObjects.push({
            x: this.gameEngine.canvas.width - this.cardWidth,
            y: this.gameEngine.canvas.height - this.cardHeight,
            width: this.cardWidth,
            height: this.cardHeight,
            color: 'green'
        });
        this.cardObjects.push({
            x: 0,
            y: this.gameEngine.canvas.height - this.cardHeight,
            width: this.cardWidth,
            height: this.cardHeight,
            color: 'yellow'
        });

        console.log("cardSize: " + parseInt(this.cardWidth), parseInt(this.cardHeight));
        console.log("cardObjects[0] pos: " + this.cardObjects[0]["x"], this.cardObjects[0]["y"]);
    }

    drawCardObject() {
        this.cardObjects.forEach(card => {
            this.gameEngine.context.fillStyle = card.color;
            this.gameEngine.context.fillRect(card.x, card.y, card.width, card.height);
        });
    }

    scaleCardSize(cardSize) {
        const canvasWidth = this.gameEngine.canvas.width * 0.001;
        const newCardSize = cardSize * canvasWidth;
        return newCardSize;
    }
}

/*
class DeckEditMenu extends Menu {
    constructor(params) {
        super(params);
        this.shapes = [];
        this.current_shape_index = null;
        this.is_dragging = false;
        this.startX = 0;
        this.startY = 0;
    }

    update() {
        let is_mouse_in_shape = (x, y, shape) => {
            let shape_left = shape.x;
            let shape_right = shape.x + shape.width;
            let shape_top = shape.y;
            let shape_bottom = shape.y + shape.height;

            if (x > shape_left && x < shape_right && y > shape_top && y < shape_bottom) {
                return true;
            }

            return false;
        }

        let mouse_down = (event) => {
            event.preventDefault();

            this.startX = parseInt(event.offsetX);
            this.startY = parseInt(event.offsetY);

            let index = 0;
            this.shapes.forEach(shape => {
                if (is_mouse_in_shape(this.startX, this.startY, shape)) {
                    this.current_shape_index = index;
                    this.is_dragging = true;
                    return;
                }
                index++;
            });
        }

        let mouse_up = (event) => {
            if(!this.is_dragging){
                return;
            }

            event.preventDefault();
            this.is_dragging = false;
        }

        let mouse_out = (event) => {
            if(!this.is_dragging){
                return;
            }

            event.preventDefault();
            this.is_dragging = false;
        }

        let mouse_move = (event) => {
            if(!this.is_dragging){
                return;
            } else {
                event.preventDefault();
                let mouseX = parseInt(event.offsetX);
                let mouseY = parseInt(event.offsetY);

                let dx = mouseX - this.startX;
                let dy = mouseY - this.startY;

                let current_shape = this.shapes[this.current_shape_index];
                current_shape.x += dx;
                current_shape.y += dy;

                this.draw_shapes();

                this.startX = mouseX; //Slows the dragging
                this.startY = mouseY;
            }
        }

        this.gameEngine.canvas.onmousedown = mouse_down;
        this.gameEngine.canvas.onmouseup = mouse_up;
        this.gameEngine.canvas.onmouseout = mouse_out;
        this.gameEngine.canvas.onmousemove = mouse_move;

        this.draw_shapes();
    }

    launch() {
        this.shapes.push({ x: 10, y: 10, width: 70, height: 100, color: 'brown' });
        this.shapes.push({ x: 90, y: 0, width: 70, height: 100, color: 'tan' });
        this.gameEngine.currentMenu = this;
    }

    draw_shapes() {
        this.shapes.forEach(shape => {
            this.gameEngine.context.fillStyle = shape.color;
            this.gameEngine.context.fillRect(shape.x, shape.y, shape.width, shape.height);
        });
    }
}
*/