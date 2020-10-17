import { Game } from "../game";
import { ClickerType } from "../models/clickers/clickerType";
import { Ticker } from "../models/ticker";

export class GuiController{
    guiTicker: Ticker;

    clickBtn: JQuery<HTMLElement>;
    counterLbl: JQuery<HTMLElement>;
    saveBtn: JQuery<HTMLElement>;
    resetSaveBtn: JQuery<HTMLElement>;
    buttonContainer: JQuery<HTMLElement>;

    constructor(public game:Game){
        this.setElements();
        this.registerListeners();
        this.initTicker();
    }

    setElements(){
        this.clickBtn = $('#cheese');
        this.saveBtn = $('#saveBtn');
        this.counterLbl = $('#counterLbl');
        this.resetSaveBtn = $('#resetSaveBtn');
        this.buttonContainer = $('#upgradeContainer');
    }

    registerListeners() {
        this.clickBtn.on('click', () => this.game.click());
        this.saveBtn.on('click', () => this.game.saveController.saveGame(this.game));
        this.resetSaveBtn.on('click', () => this.game.saveController.resetGame(this.game));

        this.buttonContainer.on('click','.btn-clicker', (event: JQuery.ClickEvent) => {
            let type = $(event.currentTarget).data('type') as keyof typeof ClickerType;
            this.game.buyClicker(ClickerType[type]);
        });
    }

    initTicker(){
        this.guiTicker = new Ticker(()=>{
            this.updateState();
        }, 100); //update the game state every 100ms
    }

    updateState(){
        let prevUnitValue = this.counterLbl.text();
        if(prevUnitValue != this.game.units.toString()){
            this.counterLbl.text(this.game.units);
        }

        this.updateButtons();
    }

    updateButtons() {
        this.game.clickers.listClickers().forEach(clicker => {
            if(!clicker.hasRendered && clicker.showBtn){
                this.buttonContainer.append(clicker.renderButton());
            }
        });

        this.game.clickers.listClickers().filter(c => c.hasRendered).forEach(clicker => {
            let element = $(`#${clicker.elementName}`);
            let clickerCost = clicker.getCost();

            if (this.game.units >= clickerCost && element.prop('disabled')) {
                element.prop('disabled', false);
            } else if (this.game.units < clickerCost && !element.prop('disabled')) {
                element.prop('disabled', true);
            }

            let html = clicker.renderInnerButton();

            if(element.html() != html){ //just to save on DOM writes
                element.html(html);
            }
        });
    }
}
