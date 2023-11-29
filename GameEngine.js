class GameEngine {
    constructor() {
        this.container = document.querySelector(".game-container");
        this.canvas = this.container.querySelector(".game-canvas");
        this.context = this.canvas.getContext("2d");

        this.containerRect = this.container.getBoundingClientRect(); //For getting elements position
        this.context.imageSmoothingEnabled = false;

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
        this.initCanvasDimenion();
        //* TESTING GameProgress with initial value
        this.gameProgress = new GameProgress({gameEngine: this});
        this.gameProgress.unlockedCards = 12;

        //*/

        //Initializating and assigning Menu Classes
        const startMenu = new StartMenu({ gameEngine: this });
        const mainMenu = new MainMenu({ gameEngine: this });
        const deckSelectMenu = new DeckSelectMenu({ gameEngine: this });
        const deckEditMenu = new DeckEditMenu({ gameEngine: this });
        const playSelectMenu = new PlaySelectMenu({ gameEngine: this });
        this.startMenu = startMenu;
        this.mainMenu = mainMenu;
        this.deckSelectMenu = deckSelectMenu;
        this.deckEditMenu = deckEditMenu;
        this.playSelectMenu = playSelectMenu;

        //Loading Complete, Starting Game
        this.currentMenu = this.startMenu;
        this.currentMenu.launch();
        this.update();
    }

    initCanvasDimenion() { //For changing game-canvas width and height in HTML
        if (window.innerWidth <= 1920 && window.innerWidth >= 1280) {
            this.canvas.setAttribute("width", "1280");
            this.canvas.setAttribute("height", "720");
        }
        else if (window.innerWidth <= 1280 && window.innerWidth >= 854) {
            this.canvas.setAttribute("width", "854");
            this.canvas.setAttribute("height", "480");
        }
        else if (window.innerWidth <= 854 && window.innerWidth >= 640) {
            this.canvas.setAttribute("width", "640");
            this.canvas.setAttribute("height", "360");
        }
        else {
            this.canvas.setAttribute("width", "426");
            this.canvas.setAttribute("height", "240");
        }

        /*
        window.addEventListener('resize', ()=>{
            if(window.innerWidth <= 720 || window.innerHeight <= 480){
                this.canvas.width = 720;
                this.canvas.height = 480;
                console.log(this.canvas.width, this.canvas.height);
            }
        })
        */
    }

    changeMenu(previousMenu, nextMenu) {
        if (nextMenu === this.deckSelectMenu) {
            console.log("GameEngine changeMenu() nextMenu is deckSelectMenu");
            if (previousMenu === this.playSelectMenu) {
                this.deckSelectMenu.deckSelectMenuMode = DeckSelectMenuMode.PlayArena;
            }
            else if (previousMenu === this.playSelectMenu) {
                this.deckSelectMenu.deckSelectMenuMode = DeckSelectMenuMode.PlayAdventure;
            }
            else if (previousMenu === this.mainMenu){
                this.deckSelectMenu.deckSelectMenuMode = DeckSelectMenuMode.DeckEdit;
            }
        }

        previousMenu.element.remove();
        this.currentMenu = nextMenu;
        this.currentMenu.launch();
    }

}