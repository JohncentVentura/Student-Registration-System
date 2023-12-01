class CardObject{
    constructor(params) {
        this.gameEngine = params.gameEngine;
        this.name = params.name || "unknown";
        this.x = params.x || 0;
        this.y = params.y || 0;
        this.width = params.width;
        this.height = params.height;
        this.color = params.color;

        this.baseX = this.x;
        this.baseY = this.y;
    }
}