window.Types = {
    Race:{
        Amphibian: "Amphibian",
        Reptile: "Reptile",
        Turtle: "Turtle",
        Mammal: "Mammal",
        Bird: "Bird"
    },
    RaceIcon:{
        Amphibian: `🐸`,
        Reptile: `🦎`,
        Turtle: `🐢`,
        Mammal: `🐾`,
        Bird: `🐤`
    },
    Role:{
        GrassStarter: "GrassStarter",
        FireStarter: "FireStarter",
        WaterStarter: "WaterStarter",
    },
    RoleIcon:{
        GrassStarter: `🌿`,
        FireStarter: `🔥`,
        WaterStarter: `💧`,
    },
}

window.Units = {
    Bulbasaur: {
        name: "Bulbasaur",
        imageSrc: "/Assets/01.png",
        rank: 1,
        race: Types.Race.Amphibian,
        role: Types.Role.GrassStarter,
        attack: 2,
        health: 2,
        effectDesc: "Vine Whip",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },
    Ivysaur: {
        name: "Ivysaur",
        imageSrc: "/Assets/02.png",
        rank: 2,
        race: Types.Race.Amphibian,
        role: Types.Role.GrassStarter,
        attack: 3,
        health: 3,
        effectDesc: "Leech Seed",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },
    Venusaur: {
        name: "Venusaur",
        imageSrc: "/Assets/03.png",
        rank: 3,
        race: Types.Race.Amphibian,
        role: Types.Role.GrassStarter,
        attack: 4,
        health: 4,
        effectDesc: "Frenzy Plant",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },

    Charmander: {
        name: "Charmander",
        imageSrc: "/Assets/04.png",
        rank: 1,
        race: Types.Race.Reptile,
        role: Types.Role.FireStarter,
        attack: 3,
        health: 1,
        effectDesc: "Ember",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },
    Charmeleon: {
        name: "Charmeleon",
        imageSrc: "/Assets/05.png",
        rank: 2,
        race: Types.Race.Reptile,
        role: Types.Role.FireStarter,
        attack: 4,
        health: 2,
        effectDesc: "Metal Claw",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },
    Charizard: {
        name: "Charizard",
        imageSrc: "/Assets/06.png",
        rank: 3,
        race: Types.Race.Reptile,
        role: Types.Role.FireStarter,
        attack: 5,
        health: 3,
        effectDesc: "Blast Burn",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },

    Squirtle: {
        name: "Squirtle",
        imageSrc: "/Assets/07.png",
        rank: 1,
        race: Types.Race.Turtle,
        role: Types.Role.WaterStarter,
        attack: 1,
        health: 3,
        effectDesc: "Bubble",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },
    Wartortle: {
        name: "Wartortle",
        imageSrc: "/Assets/08.png",
        rank: 2,
        race: Types.Race.Turtle,
        role: Types.Role.WaterStarter,
        attack: 2,
        health: 4,
        effectDesc: "Bubblebeam",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },
    Blastoise: {
        name: "Blastoise",
        imageSrc: "/Assets/09.png",
        rank: 3,
        race: Types.Race.Turtle,
        role: Types.Role.WaterStarter,
        attack: 3,
        health: 5,
        effectDesc: "Hydro Cannon",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },

    Chikorita: {
        name: "Chikorita",
        imageSrc: "/Assets/10.png",
        rank: 1,
        race: Types.Race.Reptile,
        role: Types.Role.GrassStarter,
        attack: 1,
        health: 3,
        effectDesc: "Absorb",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },
    Bayleef: {
        name: "Bayleef",
        imageSrc: "/Assets/11.png",
        rank: 2,
        race: Types.Race.Reptile,
        role: Types.Role.GrassStarter,
        attack: 2,
        health: 4,
        effectDesc: "Mega Drain",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },
    Meganium: {
        name: "Meganium",
        imageSrc: "/Assets/12.png",
        rank: 3,
        race: Types.Race.Reptile,
        role: Types.Role.GrassStarter,
        attack: 3,
        health: 5,
        effectDesc: "Giga Drain",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },
    
    Cyndaquil: {
        name: "Cyndaquil",
        imageSrc: "/Assets/13.png",
        rank: 1,
        race: Types.Race.Mammal,
        role: Types.Role.FireStarter,
        attack: 2,
        health: 2,
        effectDesc: "Rollout",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },
    Quilava: {
        name: "Quilava",
        imageSrc: "/Assets/14.png",
        rank: 2,
        race: Types.Race.Mammal,
        role: Types.Role.FireStarter,
        attack: 3,
        health: 3,
        effectDesc: "Fire Spin",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },
    Typlosion: {
        name: "Typlosion",
        imageSrc: "/Assets/15.png",
        rank: 3,
        race: Types.Race.Mammal,
        role: Types.Role.FireStarter,
        attack: 4,
        health: 4,
        effectDesc: "Fire Blast",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },

    Totodile: {
        name: "Totodile",
        imageSrc: "/Assets/16.png",
        rank: 1,
        race: Types.Race.Reptile,
        role: Types.Role.WaterStarter,
        attack: 3,
        health: 1,
        effectDesc: "Bite",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },
    Croconaw: {
        name: "Croconaw",
        imageSrc: "/Assets/17.png",
        rank: 2,
        race: Types.Race.Reptile,
        role: Types.Role.WaterStarter,
        attack: 4,
        health: 2,
        effectDesc: "Crunch",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },
    Feraligatr: {
        name: "Feraligatr",
        imageSrc: "/Assets/18.png",
        rank: 3,
        race: Types.Race.Reptile,
        role: Types.Role.WaterStarter,
        attack: 5,
        health: 3,
        effectDesc: "Water Pulse",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },

    Treecko: {
        name: "Treecko",
        imageSrc: "/Assets/19.png",
        rank: 1,
        race: Types.Race.Reptile,
        role: Types.Role.GrassStarter,
        attack: 3,
        health: 1,
        effectDesc: "Bullet Seed",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },
    Grovyle: {
        name: "Grovyle",
        imageSrc: "/Assets/20.png",
        rank: 2,
        race: Types.Race.Reptile,
        role: Types.Role.GrassStarter,
        attack: 4,
        health: 2,
        effectDesc: "Leaf Blade",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },
    Sceptile: {
        name: "Sceptile",
        imageSrc: "/Assets/21.png",
        rank: 3,
        race: Types.Race.Reptile,
        role: Types.Role.GrassStarter,
        attack: 5,
        health: 3,
        effectDesc: "Leaf Storm",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },

    Torchic: {
        name: "Torchic",
        imageSrc: "/Assets/22.png",
        rank: 1,
        race: Types.Race.Bird,
        role: Types.Role.FireStarter,
        attack: 2,
        health: 2,
        effectDesc: "Peck",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },
    Combusken: {
        name: "Combusken",
        imageSrc: "/Assets/23.png",
        rank: 2,
        race: Types.Race.Bird,
        role: Types.Role.FireStarter,
        attack: 3,
        health: 3,
        effectDesc: "Double Kick",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },
    Blaziken: {
        name: "Blaziken",
        imageSrc: "/Assets/24.png",
        rank: 3,
        race: Types.Race.Bird,
        role: Types.Role.FireStarter,
        attack: 4,
        health: 4,
        effectDesc: "Blaze Kick",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },

    Mudkip: {
        name: "Mudkip",
        imageSrc: "/Assets/25.png",
        rank: 1,
        race: Types.Race.Amphibian,
        role: Types.Role.WaterStarter,
        attack: 1,
        health: 3,
        effectDesc: "Mud Slap",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },
    Marshtomp: {
        name: "Marshtomp",
        imageSrc: "/Assets/26.png",
        rank: 2,
        race: Types.Race.Amphibian,
        role: Types.Role.WaterStarter,
        attack: 2,
        health: 4,
        effectDesc: "Mud Shot",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },
    Swampert: {
        name: "Swampert",
        imageSrc: "/Assets/27.png",
        rank: 3,
        race: Types.Race.Amphibian,
        role: Types.Role.WaterStarter,
        attack: 3,
        health: 5,
        effectDesc: "Muddy Water",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },

    Turtwig: {
        name: "Turtwig",
        imageSrc: "/Assets/28.png",
        rank: 1,
        race: Types.Race.Turtle,
        role: Types.Role.GrassStarter,
        attack: 1,
        health: 3,
        effectDesc: "Sand Attack",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },
    Grotle: {
        name: "Grotle",
        imageSrc: "/Assets/29.png",
        rank: 2,
        race: Types.Race.Turtle,
        role: Types.Role.GrassStarter,
        attack: 2,
        health: 4,
        effectDesc: "Magnitude",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },
    Torterra: {
        name: "Torterra",
        imageSrc: "/Assets/30.png",
        rank: 3,
        race: Types.Race.Turtle,
        role: Types.Role.GrassStarter,
        attack: 3,
        health: 5,
        effectDesc: "Earthquake",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },

    Chimchar: {
        name: "Chimchar",
        imageSrc: "/Assets/31.png",
        rank: 1,
        race: Types.Race.Mammal,
        role: Types.Role.FireStarter,
        attack: 3,
        health: 1,
        effectDesc: "Scratch",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },
    Monferno: {
        name: "Monferno",
        imageSrc: "/Assets/32.png",
        rank: 2,
        race: Types.Race.Mammal,
        role: Types.Role.FireStarter,
        attack: 4,
        health: 2,
        effectDesc: "Fury Swipes",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },

    Infernape: {
        name: "Infernape",
        imageSrc: "/Assets/33.png",
        rank: 3,
        race: Types.Race.Mammal,
        role: Types.Role.FireStarter,
        attack: 5,
        health: 3,
        effectDesc: "Fire Punch",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },
    Piplup: {
        name: "Piplup",
        imageSrc: "/Assets/34.png",
        rank: 1,
        race: Types.Race.Bird,
        role: Types.Role.WaterStarter,
        attack: 2,
        health: 2,
        effectDesc: "Water Gun",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },
    Prinplup: {
        name: "Prinplup",
        imageSrc: "/Assets/35.png",
        rank: 2,
        race: Types.Race.Bird,
        role: Types.Role.WaterStarter,
        attack: 3,
        health: 3,
        effectDesc: "Aqua Jet",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    },
    Empoleon: {
        name: "Empoleon",
        imageSrc: "/Assets/36.png",
        rank: 3,
        race: Types.Race.Bird,
        role: Types.Role.WaterStarter,
        attack: 4,
        health: 4,
        effectDesc: "Steel Wing",
        effectFunc: () => {
            console.log(this.name+" uses "+this.effectDesc);
        }
    }
}