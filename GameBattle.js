class GameBattle{
    constructor(params) {
        this.gameEngine = params.gameEngine;
    }
    
    update(){

    }

    launch(){
        this.addMenuElement("game-battle",
            `<h3>Game Battleu</h3>`
        );
    }
}