import { Game } from "../game";
import { ClickerType } from "../models/clickers/clickerType";
import { Ticker } from "../models/ticker";
import "../lib/numberExtensions";
import { ModalController } from "./modalController";

export class GuiController{

    guiTicker: Ticker;

    clickBtn: HTMLElement;
    counterLbl: HTMLElement;
    saveBtn: HTMLElement;
    resetSaveBtn: HTMLElement;
    buttonContainer: HTMLElement;
    secLbl: HTMLElement;
    spawnModalBtn: HTMLElement;

    modalController: ModalController;
    optionsBtn: HTMLElement;

    constructor(public game:Game){
        this.setElements();
        this.registerListeners();

        this.modalController = new ModalController(game);
        // this.initTicker();
    }

    setElements(){
        this.clickBtn = document.getElementById('cheese');
        this.saveBtn = document.getElementById('saveBtn');
        this.counterLbl = document.getElementById('counterLbl');
        this.secLbl = document.getElementById('secLbl');
        this.resetSaveBtn = document.getElementById('resetSaveBtn');
        this.buttonContainer = document.getElementById('upgradeContainer');
        this.optionsBtn = document.getElementById('optionsBtn');
    }

    registerListeners() {
        this.clickBtn.addEventListener('click', () => this.game.click());
        this.saveBtn.addEventListener('click', () => this.game.saveController.saveGame());
        this.resetSaveBtn.addEventListener('click', () => this.game.saveController.resetGame());
        this.optionsBtn.addEventListener('click', ()=> this.modalController.renderOptionsModal());

        this.buttonContainer.addEventListener('click', (e: Event) => {
            if(e.target == this.buttonContainer) return;
            let targetClass = '.btn-clicker';
            let btn = (e.target as HTMLElement).closest(targetClass);

            if(btn){
                let type = btn.getAttribute('data-type') as keyof typeof ClickerType;
                this.game.buyClicker(ClickerType[type]);
            }
        },false);

        // this.spawnModalBtn.addEventListener('click', ()=> this.modalController.renderOptionsModal());
    }

    updateState(){
        let prevUnitValue = this.counterLbl.innerText;
        let units = this.game.units;
        if(prevUnitValue != units.toPretty()){
            this.counterLbl.innerText = units.toPretty(true);
        }

        this.updateButtons();
        this.updateCheesePerSecLabel();
    }

    updateCheesePerSecLabel() {
        let cheesePerSec = this.game.clickers.getIncrement() * (1000 / this.game.TICKER_INTERVAL);
        let element = this.secLbl;
        let lbl = cheesePerSec.toPretty(true);
        //if(lbl.endsWith('.0')) lbl = lbl.replace('.0','');

        let label = `${lbl} per sec`;

        if(element.innerHTML != label){
            element.innerHTML = label;
        }
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
