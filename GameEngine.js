class GameEngine {
    constructor() {
        this.container = document.querySelector(".game-container");
        this.canvas = this.container.querySelector(".game-canvas");
        this.context = this.canvas.getContext("2d");
        
        this.setGameScreenSize();
        this.isGameResized = false;

        this.buttonDefaultImage = new Image();
        this.buttonDefaultImage.src = "/Assets/Button Default.png";
        this.buttonHoverImage = new Image();
        this.buttonHoverImage.src = "/Assets/Button Hover.png";
    }

    update() {
        const gameLoop = () => {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.imageSmoothingEnabled = false; //So Pixel Art won't be filtered
            //Only add/edit/remove codes below

            if (this.currentMenu) { this.currentMenu.update(); }

            //Only add/edit/remove codes above
            requestAnimationFrame(() => {
                gameLoop();
            })
        }
        gameLoop();
    }

    launch() {
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

        //* TESTING GameProgress with initial value
        this.gameProgress = new GameProgress({ gameEngine: this });
        this.gameProgress.unlockedCards = 12;
        this.gameProgress.playableDecks = 3;

        this.rankOneUnits = [
            Units.Bulbasaur, Units.Charmander, Units.Squirtle, 
            Units.Chikorita, Units.Cyndaquil, Units.Totodile,
            Units.Treecko, Units.Torchic, Units.Mudkip,
            Units.Turtwig, Units.Chimchar, Units.Piplup
        ];
        this.rankTwoUnits = [
            Units.Ivysaur, Units.Charmeleon, Units.Wartortle,
            Units.Bayleef, Units.Quilava, Units.Croconaw,
            Units.Grovyle, Units.Combusken, Units.Marshtomp,
            Units.Grotle, Units.Monferno, Units.Prinplup
        ];
        this.rankThreeUnits = [
            Units.Venusaur, Units.Charizard, Units.Blastoise,
            Units.Meganium, Units.Typlosion, Units.Feraligatr,
            Units.Sceptile, Units.Blaziken, Units.Swampert,
            Units.Torterra, Units.Infernape, Units.Empoleon
        ];

        this.playingRankOneUnits = [];
        this.playingRankTwoUnits = [];
        this.playingRankThreeUnits = [];

        this.playingDeck = [];
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

    setGameScreenSize() { //Sets width and height of elements in HTML & CSS
        //Sets canvas width and height attributes in HTML, sets --canvas-width and --canvas-height variables in CSS 
        if (window.innerWidth <= 1920 && window.innerWidth >= 1280) {
            this.canvas.setAttribute("width", "1280");
            this.canvas.setAttribute("height", "720");
            document.documentElement.style.setProperty('--canvas-width', '1280px');
            document.documentElement.style.setProperty('--canvas-height', '720px');
        }
        else if (window.innerWidth <= 1280 && window.innerWidth >= 854) {
            this.canvas.setAttribute("width", "854");
            this.canvas.setAttribute("height", "480");
            document.documentElement.style.setProperty('--canvas-width', '854px');
            document.documentElement.style.setProperty('--canvas-height', '480px');
        }
        else if (window.innerWidth <= 854 && window.innerWidth >= 640) {
            this.canvas.setAttribute("width", "640");
            this.canvas.setAttribute("height", "360");
            document.documentElement.style.setProperty('--canvas-width', '640px');
            document.documentElement.style.setProperty('--canvas-height', '360px');
        }
        else {
            this.canvas.setAttribute("width", "426");
            this.canvas.setAttribute("height", "240");
            document.documentElement.style.setProperty('--canvas-width', '426px');
            document.documentElement.style.setProperty('--canvas-height', '240px');
        }

        //Set width and height for CardObjects.js, sets --card-width and --card-height variables in CSS 
        this.cardWidth = this.canvas.width * 0.07;
        this.cardHeight = this.canvas.width * 0.001 * 100;
        document.documentElement.style.setProperty('--card-width', `${this.cardWidth}px`);
        document.documentElement.style.setProperty('--card-height', `${this.cardHeight}px`);

        this.containerRect = this.container.getBoundingClientRect(); //For getting elements position, refreshes value when resizing
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