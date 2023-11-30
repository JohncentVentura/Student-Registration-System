class PlayAdventureMenu extends Menu{
    constructor(params){
        super(params);
        this.selectDeckButton = null;
    }

    update(){
        
    }

    launch(){
        this.addElement("play-adventure-menu",
            `<h3>Play Adventure Menu</h3>
            <button type="button" class="select-deck-button">
                Select Deck
            </button>    
            <button type="button" class="back-button">
                Back
            </button>`
        );
        this.selectDeckButton = document.querySelector(".select-deck-button");
        this.backButton = document.querySelector(".back-button");

        this.selectDeckButton.addEventListener("mousedown", event =>{
            this.gameEngine.changeMenu(this, this.gameEngine.deckSelectMenu);
        })

        this.backButton.addEventListener("mousedown", event => {
            this.gameEngine.changeMenu(this, this.gameEngine.playSelectMenu);
        });
    }
}