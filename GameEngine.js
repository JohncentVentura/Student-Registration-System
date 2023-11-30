class GameEngine {
    constructor() {
        this.container = document.querySelector(".game-container");
        this.canvas = this.container.querySelector(".game-canvas");
        this.context = this.canvas.getContext("2d");
        this.context.imageSmoothingEnabled = false; //So Pixel Art won't be filtered

        this.setGameScreenSize();
        this.isGameResized = false;

        this.testImg = new Image();
        this.testImg.src = "/Assets/DemoBG1.png"
    }

    update() {
        const gameLoop = () => {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            //Only add/edit/remove codes below

            //this.ctx.drawImage(this.testImg, 300, 0);
            if (this.currentMenu) { this.currentMenu.update(); }

            //Only add/edit/remove codes above
            requestAnimationFrame(() => {
                gameLoop();
            })
        }
        gameLoop();
    }

    launch() {
        //Checks if window & canvas is resized, so other window.addEventListener with this.isGameResized is called once per resize
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
        //*/

        //Initializating and assigning Menu Classes
        const startMenu = new StartMenu({ gameEngine: this });
        const mainMenu = new MainMenu({ gameEngine: this });
        const deckSelectMenu = new DeckSelectMenu({ gameEngine: this });
        const deckEditMenu = new DeckEditMenu({ gameEngine: this });
        const playSelectMenu = new PlaySelectMenu({ gameEngine: this });
        const playAdventureMenu = new PlayAdventureMenu({ gameEngine: this });
        const battleMenu = new BattleMenu({ gameEngine: this });
        const gameBattle = new GameBattle({ gameEngine: this });
        this.startMenu = startMenu;
        this.mainMenu = mainMenu;
        this.deckSelectMenu = deckSelectMenu;
        this.deckEditMenu = deckEditMenu;
        this.playSelectMenu = playSelectMenu;
        this.playAdventureMenu = playAdventureMenu;
        this.battleMenu = battleMenu;
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
        if (nextMenu === this.deckSelectMenu) {
            if (previousMenu === this.playSelectMenu) {
                this.deckSelectMenu.deckSelectMenuMode = DeckSelectMenuMode.PlayArena;
            }
            else if (previousMenu === this.playAdventureMenu) {
                this.deckSelectMenu.deckSelectMenuMode = DeckSelectMenuMode.PlayAdventure;
            }
            else if (previousMenu === this.mainMenu) {
                this.deckSelectMenu.deckSelectMenuMode = DeckSelectMenuMode.DeckEdit;
            }

            console.log("DeckSelectMenuMode");
            console.log(this.deckSelectMenu.deckSelectMenuMode);
        }

        previousMenu.element.remove();
        this.currentMenu = nextMenu;
        this.currentMenu.launch();
    }

}