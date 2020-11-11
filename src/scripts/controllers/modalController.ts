import { Game } from "../game";

export class ModalController {
    constructor(public game : Game) {

    }

    renderOptionsModal(){
        let element = document.createElement('div');

        element.className = 'modal';
        element.innerHTML = `
            <div class="modalTitle">Options</div>
            <div class="modalCloseBtn"></div>
            <div class="modalBody">Body</div>
            <div class="modalFooter">Footer</div>
        `;

        element.querySelector('.modalCloseBtn').addEventListener('click', (e)=>this.closeModal(e));

        document.getElementById('main').appendChild(element);

    }

    closeModal(e:Event){
        let el = e.target as HTMLElement;
        el.closest('.modal').remove();
    }
}