import { Game } from "../game";
import { Options } from "../models/options";

export class ModalController {
    constructor(public game : Game) {

    }

    renderOptionsModal(){
        if(document.getElementById('optionsModal')){
            return;
        }

        let element = document.createElement('div');

        element.className = 'modal';
        element.id = 'optionsModal';

        let body = document.createElement('div');

        body.className = 'modalBody';
        body.append(this.renderBoolBtn('Use short labels', this.game.options.useShortLabels, ()=>{
            return this.game.options.useShortLabels = !this.game.options.useShortLabels;
        }));

        let footer = document.createElement('div');
        footer.id = 'modalFooter';

        let resetBtn = document.createElement('button');
        resetBtn.id = 'resetSaveBtn';

        resetBtn.innerHTML = '<div class="icon"></div>';
        resetBtn.classList.add('btn','btn-icon');
        resetBtn.addEventListener('click', () => this.resetBtnOnClick());
        footer.append(resetBtn);

        element.innerHTML = `
            <div class="modalTitle">Options</div>
            <div class="modalCloseBtn"></div>
        `;

        element.querySelector('.modalCloseBtn').addEventListener('click', (e)=>this.closeModal(e));
        element.append(body);
        element.append(footer);
        document.getElementById('main').appendChild(element);

    }

    resetBtnOnClick(): void {
        if(confirm('This will reset your savegame. Are you sure?')){
            this.game.saveController.resetGame();
            document.getElementById('optionsModal').remove();
        }
    }

    closeModal(e:Event){
        let el = e.target as HTMLElement;
        el.closest('.modal').remove();
    }

    renderBoolBtn(label:string, initialValue:boolean, fn:Function){
        let btn = document.createElement('div');
        btn.className = 'boolBtn';
        btn.textContent = label;

        btn.addEventListener('click',()=>{
            this.setDisabledClass(btn, fn());
        });

        this.setDisabledClass(btn, initialValue);

        return btn;
    }

    private setDisabledClass(btn:HTMLElement, value:boolean){
        if(!value){
            btn.classList.add('disabled');
        }else{
            btn.classList.remove('disabled');
        }
    }
}