class DeckSelectMenu extends Menu{
    constructor(params) {
        super(params);
    }

    update(){

    }

    launch(){
        this.addElement(this.gameEngine.container, "div", "deck-select-menu",
            `<h1>Select Deck</h1>
            <button type="button">Default Deck</button>`);

        this.element.addEventListener("click", ev => {
            this.element.remove();
            console.log("DeckSelectMenu click");
            this.gameEngine.deckEditMenu.launch();
        });
    }
}