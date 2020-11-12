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

        element.innerHTML = `
            <div class="modalTitle">Options</div>
            <div class="modalCloseBtn"></div>
        `;

        element.querySelector('.modalCloseBtn').addEventListener('click', (e)=>this.closeModal(e));
        element.append(body);
        document.getElementById('main').appendChild(element);

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