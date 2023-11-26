class GameEngine {
    constructor() {
        this.container = document.querySelector(".game-container");
        this.canvas = this.container.querySelector(".game-canvas")
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;

        this.testImg = new Image();
        this.testImg.src = "/Assets/DemoBG.png"


    }

    update() {
        const gameLoop = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
        //Initialization of objects
        const gameEngineInstance = { gameEngine: this };
        const startMenu = new StartMenu(gameEngineInstance);
        const mainMenu = new MainMenu(gameEngineInstance);
        const deckSelectMenu = new DeckSelectMenu(gameEngineInstance);
        const deckEditMenu = new DeckEditMenu(gameEngineInstance);
        //Assigning objects to global variables and to an array for iteration
        this.currentMenu = null;
        this.startMenu = startMenu;
        this.mainMenu = mainMenu;
        this.deckSelectMenu = deckSelectMenu;
        this.deckEditMenu = deckEditMenu;

        console.log("Done loading... ");
        startMenu.launch();
        this.update();
    }
}