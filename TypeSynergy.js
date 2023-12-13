class TypeSynergy {
    constructor() {
        this.synergies = [];
        this.inactiveTypes = [];
        this.resetAllTypesCount();
    }

    resetAllTypesCount() {
        this.synergies = [];
        this.noneUnitsCount = 0;
        this.fireUnitsCount = 0;
        this.waterUnitsCount = 0;
        this.airUnitsCount = 0;
        this.earthUnitsCount = 0;
        this.plantUnitsCount = 0;
        this.poisonUnitsCount = 0;
        this.fightingUnitsCount = 0;
        this.metalUnitsCount = 0;
    }

    printAllTypesCount() {
        console.log("None:", this.noneUnitsCount,
            "/Fire:", this.fireUnitsCount,
            "/Water:", this.waterUnitsCount,
            "/Air:", this.airUnitsCount,
            "/Earth:", this.earthUnitsCount,
            "/Plant:", this.plantUnitsCount,
            "/Poison:", this.poisonUnitsCount,
            "/Fighting:", this.fightingUnitsCount,
            "/Metal:", this.metalUnitsCount,
        )
    }

    addTypeCount(type) {
        if (type === TYPES.TYPES_NAMES[`NONE`]) this.noneUnitsCount++;
        else if (type === TYPES.TYPES_NAMES[`FIRE`]) this.fireUnitsCount++;
        else if (type === TYPES.TYPES_NAMES[`WATER`]) this.waterUnitsCount++;
        else if (type === TYPES.TYPES_NAMES[`AIR`]) this.airUnitsCount++;
        else if (type === TYPES.TYPES_NAMES[`EARTH`]) this.earthUnitsCount++;
        else if (type === TYPES.TYPES_NAMES[`PLANT`]) this.plantUnitsCount++;
        else if (type === TYPES.TYPES_NAMES[`POISON`]) this.poisonUnitsCount++;
        else if (type === TYPES.TYPES_NAMES[`FIGHTING`]) this.fightingUnitsCount++;
        else if (type === TYPES.TYPES_NAMES[`METAL`]) this.metalUnitsCount++;
    }

    returnCreatedTypeElement(type) {
        const element = document.createElement("div");
        let count = 0;

        if (type === TYPES.TYPES_NAMES[`NONE`]) count = this.noneUnitsCount;
        else if (type === TYPES.TYPES_NAMES[`FIRE`]) count = this.fireUnitsCount;
        else if (type === TYPES.TYPES_NAMES[`WATER`]) count = this.waterUnitsCount;
        else if (type === TYPES.TYPES_NAMES[`AIR`]) count = this.airUnitsCount;
        else if (type === TYPES.TYPES_NAMES[`EARTH`]) count = this.earthUnitsCount;
        else if (type === TYPES.TYPES_NAMES[`PLANT`]) count = this.plantUnitsCount;
        else if (type === TYPES.TYPES_NAMES[`POISON`]) count = this.poisonUnitsCount;
        else if (type === TYPES.TYPES_NAMES[`FIGHTING`]) count = this.fightingUnitsCount;
        else if (type === TYPES.TYPES_NAMES[`METAL`]) count = this.metalUnitsCount;
        
        element.innerHTML = (`${TYPES.TYPES_ICONS[type]}x${count}`);
        return element;
    }

}