class AbstractMenu {
    constructor(gameEngine) {
        if (this.constructor == AbstractMenu) { throw new Error("Abstract classes can't be instantiated.") }

        this.gameEngine = gameEngine;
        this.element = null;
        this.backButton = null;
        this.cardBackgroundElement = null;
    }

    update() { throw new Error("Abstract method must be implemented.") }
    launch() { throw new Error("Abstract method must be implemented.") }

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
            if (event.button === 2) event.preventDefault();
        })
    }

    createCardDisplayElement(imageSrc, name, tier, type1, type2, power, health, effect, buttonFunc) {
        this.cardBackgroundElement = document.createElement("div");
        this.cardBackgroundElement.classList.add("card-background");

        const cardDisplay = document.createElement("div");
        cardDisplay.classList.add("card-display");
        this.cardBackgroundElement.appendChild(cardDisplay);

        //
        const cardUpperContainer = document.createElement("div");
        cardUpperContainer.classList.add("card-upper-container");
        cardDisplay.appendChild(cardUpperContainer);

        const cardName = document.createElement("div");
        cardName.classList.add("card-stat");
        cardName.innerHTML = (`Name: ${name}`);
        cardUpperContainer.appendChild(cardName);

        const cardTypes = document.createElement("div");
        cardTypes.classList.add("card-stat");
        if (type2 == TYPES.TYPES_NAMES.NONE) {
            cardTypes.innerHTML = (`Type: ${TYPES.TYPES_NAMES[type1]} ${TYPES.TYPES_ICONS[type1]}`);
        } else {
            cardTypes.innerHTML = (`Type: ${TYPES.TYPES_NAMES[type1]} ${TYPES.TYPES_ICONS[type1]} 
            / ${TYPES.TYPES_NAMES[type2]} ${TYPES.TYPES_ICONS[type2]}`);
        }
        cardUpperContainer.appendChild(cardTypes);

        //
        const cardImage = document.createElement("img");
        cardImage.classList.add("card-image");
        cardImage.setAttribute("src", `${imageSrc}`);
        cardDisplay.appendChild(cardImage);
        
        //
        const cardLowerContainer = document.createElement("div");
        cardLowerContainer.classList.add("card-lower-container");
        cardDisplay.appendChild(cardLowerContainer);

        const cardTier = document.createElement("div");
        cardTier.classList.add("card-stat");
        cardTier.innerHTML = (`⭐Tier: ${tier}`);
        cardLowerContainer.appendChild(cardTier);

        const cardPower = document.createElement("div");
        cardPower.classList.add("card-stat");
        cardPower.innerHTML = (`⚔️Power: ${power}`);
        cardLowerContainer.appendChild(cardPower);

        const cardHealth = document.createElement("div");
        cardHealth.classList.add("card-stat");
        cardHealth.innerHTML = (`❤️Health: ${health}`);
        cardLowerContainer.appendChild(cardHealth);

        const cardEffectsContainer = document.createElement("div");
        cardEffectsContainer.classList.add("card-effects-container");
        cardEffectsContainer.innerHTML = (`Effect: ${effect}`);
        cardDisplay.appendChild(cardEffectsContainer);

        this.gameEngine.container.appendChild(this.cardBackgroundElement);

        buttonFunc();

        //Prevents context menu when right clicking in the canvas
        this.gameEngine.canvas.addEventListener("contextmenu", event => {
            if (event.button === 2) event.preventDefault();
        })

        //Prevents context menu when right clicking in the HTML element
        this.cardBackgroundElement.addEventListener("contextmenu", event => {
            if (event.button === 2) event.preventDefault();
        })

        this.cardBackgroundElement.addEventListener("mousedown", event => {
            this.cardBackgroundElement.remove();
        })
    }

    setCardDisplayButton(){
        const cardButton = document.createElement("button");
        cardButton.classList.add("card-button");
        cardButton.setAttribute(`type`, `button`);
        cardButton.innerHTML = (`Add`)
        this.cardBackgroundElement.appendChild(cardButton);
    }

}

/*
createCardDisplayElement(menu, imageSrc, name, tier, type1, type2, power, health, effect) {
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

        Card Background Button 
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

    //////////////////////////////////////////////////////////////////////////////////////CSS

    .card-background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.75);
}

.card-background .card-display {
    border: 6px solid var(--color-red);
    border-radius: var(--card-border-radius);
    width: 30%;
    height: 70%;
    background-color: var(--color-white);
    color: white;
    display: flex;
    flex-direction: column;
}

.card-display .card-image {
    width: 100%;
    height: 60%;
    object-fit: contain;
    image-rendering: pixelated;
}

.card-display .card-stats-container {
    background-color: var(--color-red);
    width: 100%;
    height: 15%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 0 10%;
}

.card-display .card-stats-container .card-center {
    grid-column: 1 / span 3;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-display .card-effects {
    border-bottom-left-radius: 100%;
    border-bottom-right-radius: 100%;
    width: 100%;
    height: 25%;
    background-color: var(--color-red);
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-background .card-button {
    width: 15%;
    height: 10%;
}
*/