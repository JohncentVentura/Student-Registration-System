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
        this.tier = params.tier;
        this.type1 = params.type1;
        this.type2 = params.type2;
        this.power = params.power;
        this.health = params.health;
        this.effectDesc = params.effectDesc;
        this.effectFunc = params.effectFunc;

        this.baseX = this.x;
        this.baseY = this.y;
    }
}