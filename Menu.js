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

    createCardDisplayElement(imageSrc, name, rank, race, role, power, health, effect) {
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
        cardName.innerHTML = (`Name: ${name}`);
        cardStatsContainer.appendChild(cardName);

        const cardRank = document.createElement("div");
        cardRank.classList.add("card-stat");
        cardRank.innerHTML = (`Rank: ${rank}⭐`);
        cardStatsContainer.appendChild(cardRank);

        const cardAttack = document.createElement("div");
        cardAttack.classList.add("card-stat");
        cardAttack.innerHTML = (`Attack: ${power} ⚔️`);
        cardStatsContainer.appendChild(cardAttack);

        const cardRace = document.createElement("div");
        cardRace.classList.add("card-stat");
        cardRace.innerHTML = (`Race: ${race} ${Types.RaceIcon[race]}`);
        cardStatsContainer.appendChild(cardRace);

        const cardHealth = document.createElement("div");
        cardHealth.classList.add("card-stat");
        cardHealth.innerHTML = (`Health: ${health} ❤️`);
        cardStatsContainer.appendChild(cardHealth);
        
        const cardRole = document.createElement("div");
        cardRole.classList.add("card-stat");
        cardRole.innerHTML = (`Role: ${role} ${Types.RoleIcon[role]}`);
        cardStatsContainer.appendChild(cardRole);

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