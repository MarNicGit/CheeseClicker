import { Game } from "../game";
import { ClickerType } from "../models/clickers/clickerType";
import { Ticker } from "../models/ticker";

export class GuiController{

    guiTicker: Ticker;

    clickBtn: HTMLElement;
    counterLbl: HTMLElement;
    saveBtn: HTMLElement;
    resetSaveBtn: HTMLElement;
    buttonContainer: HTMLElement;

    constructor(public game:Game){
        this.setElements();
        this.registerListeners();
        // this.initTicker();
    }

    setElements(){
        this.clickBtn = document.getElementById('cheese');
        this.saveBtn = document.getElementById('saveBtn');
        this.counterLbl = document.getElementById('counterLbl');
        this.resetSaveBtn = document.getElementById('resetSaveBtn');
        this.buttonContainer = document.getElementById('upgradeContainer');
    }

    registerListeners() {
        this.clickBtn.addEventListener('click', () => this.game.click());
        this.saveBtn.addEventListener('click', () => this.game.saveController.saveGame(this.game));
        this.resetSaveBtn.addEventListener('click', () => this.game.saveController.resetGame(this.game));

        this.buttonContainer.addEventListener('click', (e: Event) => {
            if(e.target == this.buttonContainer) return;
            let targetClass = '.btn-clicker';
            let btn = (e.target as HTMLElement).closest(targetClass);

            if(btn){
                let type = btn.getAttribute('data-type') as keyof typeof ClickerType;
                this.game.buyClicker(ClickerType[type]);
            }
        },false);
    }

    updateState(){
        let prevUnitValue = this.counterLbl.innerText;
        let units = this.game.units.toString();
        if(prevUnitValue != units){
            this.counterLbl.innerText = units;
        }

        this.updateButtons();
    }

    updateButtons() {
        this.game.clickers.listClickers().forEach(clicker => {
            if(!clicker.hasRendered && clicker.showBtn){
                this.buttonContainer.innerHTML += clicker.renderButton();
            }
        });

        this.game.clickers.listClickers().filter(c => c.hasRendered).forEach(clicker => {
            let element = document.getElementById(`${clicker.elementName}`);
            let clickerCost = clicker.getCost();

            if (this.game.units >= clickerCost && element.getAttribute('disabled') == 'true') {
                element.setAttribute('disabled', String(false));
            } else if (this.game.units < clickerCost && element.getAttribute('disabled') == 'false') {
                element.setAttribute('disabled', String(true));
            }

            let html = clicker.renderInnerButton();

            if(element.innerHTML != html){ //just to save on DOM writes
                element.innerHTML = html;
            }
        });
    }

    resetButtonContainer() {
        this.buttonContainer.innerHTML = '';
    }
}
