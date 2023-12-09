class GameEngine {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.container = document.querySelector(".game-container");
        this.canvas = this.container.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.setGameScreenSize();
    }

    launch() {
        /*
        //Checks if window & canvas is resized, so other window.addEventListener with this.isGameResized is only called once per resize
        window.addEventListener('resize', event => {
            let previousCanvasWidth = this.canvas.width;
            this.setGameScreenSize();

            if (previousCanvasWidth !== this.canvas.width) {
                this.isGameResized = true;
                previousCanvasWidth = this.canvas.width; //Calls this if statement once per resize of canvas 
            } else {
                this.isGameResized = false;
            }
        })
        */

        //* TESTING GameProgress with initial value
        this.gameProgress = new GameProgress({ gameEngine: this });
        this.gameProgress.unlockedCards = 12;
        this.gameProgress.playableDecks = 3;

        this.unlockedTier1Units = [
            Units.Bulbasaur, Units.Charmander, Units.Squirtle,
            Units.Chikorita, Units.Cyndaquil, Units.Totodile,
            Units.Treecko, Units.Torchic, Units.Mudkip,
            Units.Turtwig, Units.Chimchar, Units.Piplup
        ];
        this.unlockedTier2Units = [
            Units.Ivysaur, Units.Charmeleon, Units.Wartortle,
            Units.Bayleef, Units.Quilava, Units.Croconaw,
            Units.Grovyle, Units.Combusken, Units.Marshtomp,
            Units.Grotle, Units.Monferno, Units.Prinplup
        ];
        this.unlockedTier3Units = [
            Units.Venusaur, Units.Charizard, Units.Blastoise,
            Units.Meganium, Units.Typlosion, Units.Feraligatr,
            Units.Sceptile, Units.Blaziken, Units.Swampert,
            Units.Torterra, Units.Infernape, Units.Empoleon
        ];

        //Units that will be used when playing
        this.playingTier1Units = [];
        this.playingTier2Units = [];
        this.playingTier3Units = [];

        //Units that can be drawn when playing, add units with different tier here
        this.playingUnits = [];
        this.holdingCards = [];
        this.playingUnits = [];
        //*/

        //Initializating and assigning Menu Classes
        const startMenu = new StartMenu(this);
        const mainMenu = new MainMenu(this);
        const playMenu = new PlayMenu(this);
        const deckMenu = new DeckMenu(this);
        const gameBattle = new GameBattle(this);
        this.startMenu = startMenu;
        this.mainMenu = mainMenu;
        this.playMenu = playMenu;
        this.deckMenu = deckMenu;
        this.gameBattle = gameBattle;
        
        //Loading Complete, Starting Game
        this.currentMenu = this.startMenu;
        this.currentMenu.launch();
        this.update();
    }

    update() {
        const gameLoop = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.imageSmoothingEnabled = false; //So Pixel Art won't be filtered
            //Only add/edit/remove codes below

            if (this.currentMenu) { this.currentMenu.update(); }

            //Only add/edit/remove codes above
            requestAnimationFrame(() => {
                gameLoop();
            })
        }
        gameLoop();
    }

    setGameScreenSize() { //Sets width and height of elements in HTML & CSS
        //Sets canvas width and height attributes in HTML, sets --game-width and --game-height variables in CSS 
        document.documentElement.style.setProperty("--game-width", `${this.gameWidth}px`);
        document.documentElement.style.setProperty("--game-height", `${this.gameHeight}px`);
        this.containerRect = this.container.getBoundingClientRect(); //For getting elements position, refreshes value when resizing
        this.canvas.setAttribute("width", `${this.gameWidth}`);
        this.canvas.setAttribute("height", `${this.gameHeight}`);
        
        this.buttonWidth = this.canvas.width * 0.1;
        this.buttonHeight = this.canvas.height * 0.1;
        document.documentElement.style.setProperty('--button-width', `${this.buttonWidth}px`);
        document.documentElement.style.setProperty('--button-height', `${this.buttonHeight}px`);

        //Set width and height for CardObjects.js, sets --card-width and --card-height variables in CSS 
        this.cardWidth = this.canvas.width * 0.08;
        this.cardHeight = this.canvas.width * 0.12;
        document.documentElement.style.setProperty('--card-width', `${this.cardWidth}px`);
        document.documentElement.style.setProperty('--card-height', `${this.cardHeight}px`);

        this.summonWidth = this.cardWidth + (this.cardWidth * 0.4);
        this.summonHeight = this.cardHeight + (this.cardHeight * 0.1);
        document.documentElement.style.setProperty('--summon-width', `${this.summonWidth}px`);
        document.documentElement.style.setProperty('--summon-height', `${this.summonHeight}px`);

        //console.log("game size & containerRect " +this.gameWidth, this.gameHeight, this.containerRect); 
        //console.log("card size "+this.cardWidth, this.cardHeight)
    }

    changeMenu(previousMenu, nextMenu) {
        /*
        if (nextMenu === this.deckSelectMenu) {
            if (previousMenu === this.playSelectMenu) {
                this.deckSelectMenu.deckSelectMenuMode = DeckSelectMenuMode.PlayDeck;
            }
            else if (previousMenu === this.mainMenu) {
                this.deckSelectMenu.deckSelectMenuMode = DeckSelectMenuMode.EditDeck;
            }
        }
        */

        previousMenu.element.remove();
        this.currentMenu = nextMenu;
        this.currentMenu.launch();
    }

}