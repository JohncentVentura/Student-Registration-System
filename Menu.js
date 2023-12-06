class Menu {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;

        //Elements
        this.element = null;
        this.backButton = null;
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

    createCardDisplayElement(imageSrc, name, tier, type1, type2, power, health, effect) {
        const cardBackground = document.createElement("div");
        cardBackground.classList.add("card-background");

        const cardDisplay = document.createElement("div");
        cardDisplay.classList.add("card-display");
        cardBackground.appendChild(cardDisplay);

        const cardImage = document.createElement("img");
        cardImage.classList.add("card-image");
        cardImage.setAttribute("src", `${imageSrc}`);
        cardDisplay.appendChild(cardImage);

        const cardStatsContainer = document.createElement("div");
        cardStatsContainer.classList.add("card-stats-container");
        cardDisplay.appendChild(cardStatsContainer);

        const cardName = document.createElement("div");
        cardName.classList.add("card-stat");
        cardName.classList.add("card-center");
        cardName.innerHTML = (`Name: ${name}`);
        cardStatsContainer.appendChild(cardName);

        const cardTypes = document.createElement("div");
        cardTypes.classList.add("card-stat");
        cardTypes.classList.add("card-center");
        if (type2 == TYPES.TYPES_NAMES.NONE) {
            cardTypes.innerHTML = (`Type: ${TYPES.TYPES_NAMES[type1]} ${TYPES.TYPES_ICONS[type1]}`);

        } else {
            cardTypes.innerHTML = (`Type: ${TYPES.TYPES_NAMES[type1]} ${TYPES.TYPES_ICONS[type1]} 
            / ${TYPES.TYPES_NAMES[type2]} ${TYPES.TYPES_ICONS[type2]}`);
        }
        cardStatsContainer.appendChild(cardTypes);

        const cardTier = document.createElement("div");
        cardTier.classList.add("card-stat");
        cardTier.innerHTML = (`⭐Tier: ${tier}`);
        cardStatsContainer.appendChild(cardTier);

        const cardPower = document.createElement("div");
        cardPower.classList.add("card-stat");
        cardPower.innerHTML = (`⚔️Power: ${power}`);
        cardStatsContainer.appendChild(cardPower);

        const cardHealth = document.createElement("div");
        cardHealth.classList.add("card-stat");
        cardHealth.innerHTML = (`❤️Health: ${health}`);
        cardStatsContainer.appendChild(cardHealth);

        const cardEffects = document.createElement("div");
        cardEffects.classList.add("card-effects");
        cardEffects.innerHTML = (`Effect: ${effect}`);
        cardDisplay.appendChild(cardEffects);

        /* Card Background Button */
        const cardButton = document.createElement("button");
        cardButton.classList.add("card-button");
        cardButton.setAttribute(`type`, `button`);
        cardButton.innerHTML = (`Add`)
        cardBackground.appendChild(cardButton);

        this.gameEngine.container.appendChild(cardBackground);

        cardBackground.addEventListener("mousedown", event => {
            cardBackground.remove();
        })
    }

    /* For menus where cards has interactions */
    onMouseOut = event => {
        console.log("Mouse is outside of canvas")
    }

    getElementRect(element){
        const rect = element.getBoundingClientRect();
        rect.x -= this.gameEngine.containerRect.x;
        rect.y -= this.gameEngine.containerRect.y;
        return rect;
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
}