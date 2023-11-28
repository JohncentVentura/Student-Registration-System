class GameEngine {
    constructor() {
        this.container = document.querySelector(".game-container");
        this.canvas = this.container.querySelector(".game-canvas");
        this.context = this.canvas.getContext("2d");
        this.context.imageSmoothingEnabled = false;

        this.testImg = new Image();
        this.testImg.src = "/Assets/DemoBG.png"
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
        this.initCanvasDim();
        //Initialization
        const startMenu = new StartMenu({ gameEngine: this });
        const mainMenu = new MainMenu({ gameEngine: this });
        const deckSelectMenu = new DeckSelectMenu({ gameEngine: this });
        const deckEditMenu = new DeckEditMenu({ gameEngine: this });
        const playSelectMenu = new PlaySelectMenu({ gameEngine: this });
        //Assigning
        this.startMenu = startMenu;
        this.mainMenu = mainMenu;
        this.deckSelectMenu = deckSelectMenu;
        this.deckEditMenu = deckEditMenu;
        this.playSelectMenu = playSelectMenu;

        /*
        window.addEventListener('resize', ()=>{
            if(window.innerWidth <= 720 || window.innerHeight <= 480){
                this.canvas.width = 720;
                this.canvas.height = 480;
                console.log(this.canvas.width, this.canvas.height);
            }
        })
        */

        this.currentMenu = this.startMenu;
        this.currentMenu.launch();
        this.update();
    }

    initCanvasDim() { //Initialize Canvas Dimensions
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
    }

    changeMenu(previousMenu, nextMenu) {
        if (nextMenu === this.deckSelectMenu) {
            console.log("nextMenu is deckSelectMenu");
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