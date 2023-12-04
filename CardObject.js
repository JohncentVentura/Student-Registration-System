class CardObject{
    constructor(params) {
        this.gameEngine = params.gameEngine;
        this.x = params.x || 0;
        this.y = params.y || 0;
        this.width = params.width;
        this.height = params.height;

        this.image = new Image();
        this.name = params.name;
        this.image.src = params.imageSrc;
        this.rank = params.rank;
        this.race = params.race;
        this.role = params.role;
        this.attack = params.attack;
        this.health = params.health;
        this.effectDesc = params.effectDesc;
        this.effectFunc = params.effectFunc;

        this.baseX = this.x;
        this.baseY = this.y;
    }
}