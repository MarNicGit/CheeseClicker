interface JQuery {
    disabled: boolean;
    enable(): void
    disable(): void
}

jQuery.fn.enable = ()=>{
    console.log(this);
}

jQuery.fn.disable = ()=>{
    console.log('disable' + this);
}