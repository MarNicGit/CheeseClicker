import { Clicky } from "../clicky";
import { ClickerType } from "../enums";
import { Ticker } from "../models/ticker";

export class GuiController{
    guiTicker: Ticker;

    clickBtn: JQuery<HTMLElement>;
    counterLbl: JQuery<HTMLElement>;
    saveBtn: JQuery<HTMLElement>;
    buyAutoclickerBtn: JQuery<HTMLElement>;
    resetSaveBtn: JQuery<HTMLElement>;

    constructor(public game:Clicky){
        this.setElements();
        this.registerListeners();
        this.initTicker();
    }

    setElements(){
        this.clickBtn = $('#clicker');
        this.saveBtn = $('#saveBtn');
        this.counterLbl = $('#counterLbl');
        this.buyAutoclickerBtn = $('#buyAutoclickerBtn');
        this.resetSaveBtn = $('#resetSaveBtn');
    }

    registerListeners() {
        this.clickBtn.on('click', () => this.game.click());
        this.saveBtn.on('click', () => this.game.saveController.saveGame(this.game));
        this.buyAutoclickerBtn.on('click',()=> this.game.buyAutoclicker());
        this.resetSaveBtn.on('click', () => this.game.saveController.resetGame(this.game));
    }

    initTicker(){
        this.guiTicker = new Ticker(()=>{
            this.updateState();
        }, 100); //update the game state every 100ms
    }

    updateState(){
        let prevUnitValue = this.counterLbl.text();
        if(prevUnitValue != this.game.units.toString()){
            this.counterLbl.text(this.game.units.toFixed(2));
        }

        this.updateButtons();
    }

    updateButtons() {

        let autoclickerCost = Number((this.game.clickers.autoClicker.getCost()).toFixed(2));
        if((this.game.units >= this.game.AUTOCLICKER_MIN_UNITS || this.game.clickers.autoClicker.amount > 0) && this.buyAutoclickerBtn.hasClass('hidden')){
            this.buyAutoclickerBtn.removeClass('hidden');
        }

        if(this.game.units >= autoclickerCost && this.buyAutoclickerBtn.prop('disabled')){
            this.buyAutoclickerBtn.prop('disabled', false);
        }

        if(this.game.units < autoclickerCost && !this.buyAutoclickerBtn.prop('disabled')){
            this.buyAutoclickerBtn.prop('disabled', true);
        }

        let label = `Buy autoclicker - ${this.game.clickers.getClickerCost(ClickerType.AutoClicker).toFixed(2)} units`;

        if(this.buyAutoclickerBtn.text() != label){
            this.buyAutoclickerBtn.text(label);
        }
    }
}
