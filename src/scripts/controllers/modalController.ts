import { Game } from "../game";

export class ModalController {
    constructor(public game : Game) {

    }

    renderOptionsModal(){
        let element = document.createElement('div');

        element.className = 'modal';
        element.innerHTML = `
            <div class="modalTitle">Title</div>
            <div class="modalCloseBtn">X</div>
            <div class="modalBody">Body</div>
            <div class="modalFooter">Footer</div>
        `;

        document.getElementById('main').appendChild(element);
    }
}