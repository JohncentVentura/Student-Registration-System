class TypeSynergy {
    constructor() {
        this.resetAllTypesCount();
    }

    resetAllTypesCount() {
        this.activeTypeSynergies = [];
        this.inactiveTypeSynergies = [];
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
        console.log(
            "/ActiveTypeSynergies:", this.activeTypeSynergies,
            "/InactiveTypeSynergies:", this.inactiveTypeSynergies,
            "/None:", this.noneUnitsCount,
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

    sortTypeSynergies(newTypeSynergies) {
        for (let i = 0; i < newTypeSynergies.length; i++) {
            if (this.getCountOfType(newTypeSynergies[i]) >= 2 && newTypeSynergies[i] !== TYPES.TYPES_NAMES[`NONE`]) {
                this.activeTypeSynergies.push(newTypeSynergies[i]);
            }
            else if (this.getCountOfType(newTypeSynergies[i]) == 1 && newTypeSynergies[i] !== TYPES.TYPES_NAMES[`NONE`]) {
                this.inactiveTypeSynergies.push(newTypeSynergies[i]);
            } 
        }

        //console.log("sortTypeSynergies newTypeSynergies", newTypeSynergies);
        //console.log("sortTypeSynergies inactiveTypeSynergies", this.inactiveTypeSynergies);
        //console.log("sortTypeSynergies activeTypeSynergies", this.activeTypeSynergies);
    }

    returnCreatedTypeElement(type) {
        const element = document.createElement("div");
        
        if (this.getCountOfType(type) >= 2 && type !== TYPES.TYPES_NAMES[`NONE`]) {
            element.innerHTML = (`${TYPES.TYPES_ICONS[type]}x${this.getCountOfType(type)}`);
        }
        else if (this.getCountOfType(type) == 1 && type !== TYPES.TYPES_NAMES[`NONE`]) {
            element.classList.add(`inactive-type-synergy`);
            element.innerHTML = (`${TYPES.TYPES_ICONS[type]}x${this.getCountOfType(type)}`);
        }

        return element;
    }

    getCountOfType(type){
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
        return count;
    }

}