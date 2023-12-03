window.Units = {
    Bulbasaur: {
        name: "Bulbasaur",
        imageSrc: "Assets/Bulbasaur.png",
        tier: 1,
        attack: 2,
        health: 2,
        effectDesc: "Vine Whip",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },
    Charmander: {
        name: "Charmander",
        imageSrc: "Assets/Charmander.png",
        tier: 1,
        attack: 3,
        health: 1,
        effectDesc: "Ember",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },
    Squirtle: {
        name: "Squirtle",
        imageSrc: "Assets/Squirtle.png",
        tier: 1,
        attack: 1,
        health: 3,
        effectDesc: "Water Gun",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },
    Pikachu: {
        name: "Pikachu",
        imageSrc: "Assets/Pikachu.png",
        tier: 1,
        attack: 2,
        health: 2,
        effectDesc: "Thunder Shock",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },
    Ghastly: {
        name: "Ghastly",
        imageSrc: "Assets/Ghastly.png",
        tier: 1,
        attack: 3,
        health: 3,
        effectDesc: "Shadow Ball",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },
}