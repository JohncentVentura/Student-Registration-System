class CardObject{
    constructor(params) {
        this.gameEngine = params.gameEngine;
        this.x = params.x || 0;
        this.y = params.y || 0;
        this.width = params.width;
        this.height = params.height;

        this.image = new Image();
        this.name = params.name || "unknown";
        this.imageSrc = params.imageSrc || "";
        this.tier = params.tier || 0;
        this.attack = params.attack || 0;
        this.health = params.health || 1;
        this.effectDesc = params.effectDesc || "";
        this.effectFunc = params.effectFunc;

        this.baseX = this.x;
        this.baseY = this.y;
    }
}