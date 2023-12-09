class GameBattle{
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
    }
    
    update(){

    }

    launch(){
        this.createMenuElement("game-battle",
            `<h3>Game Battleu</h3>`
        );
    }
}