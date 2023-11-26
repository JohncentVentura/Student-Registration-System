class DeckEditMenu extends Menu {

    /*
    let shapes = [];
    this.currenShapeIndex = null;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;

    let isMouseInShape = (x, y, shape) => {
        let shapeLeft = shape.x;
        let shapeRight = shape.x + shape.width;
        let shapeTop = shape.y;
        let shapeBottom = shape.y + shape.height;
 
        if (x > shapeLeft && x < shapeRight && y > shapeTop && y < shapeBottom) {
            return true;
        }
 
        return false;
    }

    this.mouseDown = function (event) {
        event.preventDefault();

        this.startX = parseInt(event.clientX);
        this.startY = parseInt(event.clientY);

        shapes.push({ x: 0, y: 0, width: 200, height: 200, color: 'red' });
        console.log("mouseDown this.shapes "+shapes);
        
        let index = 0;
        for (let shape in shapes) {
            console.log(this.shapes);
            if (isMouseInShape(this.startX, this.startY, shape)) {
                this.currenShapeIndex = index;
                this.isDragging = true;
                return;
            }
            index++;
        }
    }

    this.mouseUp = function (event) {
        console.log("mouseUp");
        if (!this.isDragging) {
            return;
        }

        event.preventDefault();
        this.isDragging = false;
    }

    this.mouseOut = function (event) {
        console.log("mouseOut");
        if (!this.isDragging) {
            return;
        }

        event.preventDefault();
        this.isDragging = false;
    }

    this.mouseMove = function (event) {
        if (!this.isDragging) {
            console.log("mouseMove is not dragging")
            return;
        } else {
            event.preventDefault();
            let mouseX = parseInt(event.clientX);
            let mouseY = parseInt(event.clientY);

            let dx = mouseX - this.startX;
            let dy = mouseY - this.startY;

            let currentShape = this.shapes[this.currenShapeIndex];
            currentShape.x += dx;
            currentShape.y += dy;

            this.drawShapes(shape);

            this.startX = mouseX;
            this.startY = mouseY;
        }
    }
    */

    /*
        this.gameEngine.canvas.onmousedown = this.mouseDown;
        this.gameEngine.canvas.onmouseup = this.mouseUp;
        this.gameEngine.canvas.onmouseout = this.mouseOut;
        this.gameEngine.canvas.onmousemove = this.mouseMove;
        */

    constructor(params) {
        super(params);

        this.cardObject = {};
        this.currenShapeIndex = null;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
    }

    update() {
        this.gameEngine.ctx.fillStyle = this.cardObject.color;
        this.gameEngine.ctx.fillRect(this.cardObject.x, this.cardObject.y, this.cardObject.width, this.cardObject.height);

        this.gameEngine.canvas.onmousedown = this.mouseDown;
        this.gameEngine.canvas.onmouseup = this.mouseUp;
        this.gameEngine.canvas.onmouseout = this.mouseOut;
        this.gameEngine.canvas.onmousemove = this.mouseMove;
    }

    launch() {
        /*
        this.addElement(this.gameEngine.container, "div", "deck-edit-menu",
            `<div class="deck-container">
                <h3>Deck</h3>
                <div class="cards-container">
                </div>
            </div>
            <div class="trunk-container">
                <h3>Trunk</h3>
                <div class="cards-container"></div>
            </div>`);
        */
        //Only add/edit/remove codes below

        this.cardObject = { x: 0, y: 0, width: 70, height: 100, color: 'brown' };

        //Only add/edit/remove codes above
        this.gameEngine.currentMenu = this;
    }

    mouseDown(event) {
        event.preventDefault();
        console.log("mouseDown");

        this.startX = parseInt(event.clientX);
        this.startY = parseInt(event.clientY);
        let isMouseInCard = (x, y, card) => {
            let cardLeft = card.x;
            let cardRight = card.x + card.width;
            let cardTop = card.y;
            let cardBottom = card.y + card.height;

            if (x > cardLeft && x < cardRight && y > cardTop && y < cardBottom) {
                return true;
            }

            return false;
        };

        let index = 0;
        console.log(this.cardObject);
        if (isMouseInCard(this.startX, this.startY, this.cardObject)) {
            this.currenShapeIndex = index;
            this.isDragging = true;
            return;
        }
        index++;
    }

    mouseUp(event) {
        event.preventDefault();
        console.log("mouseUp");
    }

    mouseOut(event) {
        event.preventDefault();
        console.log("mouseOut");
    }

    mouseMove(event) {
        event.preventDefault();
        console.log("mouseMove");
    }

    drawShapes(shapes) {
        this.gameEngine.ctx.clearRect(0, 0, this.gameEngine.canvas.width, this.gameEngine.canvas.height);
        shapes.forEach(shape => {
            this.gameEngine.ctx.fillStyle = shape.color;
            this.gameEngine.ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
        });
    }




}