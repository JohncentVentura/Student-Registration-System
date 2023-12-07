class Card{
    constructor(params) {
        //For Canvas
        this.image = new Image();
        this.x = params.x;
        this.y = params.y;
        this.width = params.width;
        this.height = params.height;

        //For Stats
        this.image.src = params.imageSrc;
        this.name = params.name;
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