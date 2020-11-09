import { Toast } from "../models/toast";

export class ToastController{
    private container = document.getElementById('toasterContainer');

    TOAST_INTERVAL = 2000;

    constructor(){
    }

    public toast(model: Toast){
        let element = document.createElement('div');
        element.className = 'toast';
        element.innerHTML = `
            <div class="icon"></div>
            <div class="title">${model.title}</div>
            <div class="subTitle">${model.subTitle}</div>
            <div class="closeBtn"></div>
        `;

        this.container.prepend(element);

        setTimeout(() => {
            element.classList.add('fade-out');
            setTimeout(() => {
                element.remove();
            }, this.TOAST_INTERVAL/4);
        }, this.TOAST_INTERVAL);
    }
}
