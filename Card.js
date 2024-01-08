class Card{
    constructor(params) {
        //For Canvas
        this.image = params.image;
        this.x = params.x;
        this.y = params.y;
        this.width = params.width;
        this.height = params.height;

        this.baseX = this.x;
        this.baseY = this.y;

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

        //For Selling
        this.sellingId = params.sellingId;
        this.isSellingCardLocked = params.isSellingCardLocked;
        this.lockedId = params.lockedId;

        //For Summoning
        this.summonId = params.summonId;
        this.summonLevel = params.summonLevel;
        this.summonSellCost = params.summonSellCost;
    }
}