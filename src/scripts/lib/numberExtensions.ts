declare interface Number {
    toPretty(): string;
    toCommafied(singleDecimal?:boolean) :string;
}

/**
 * Return the number, rounded, with long unit behind it
 */
Number.prototype.toPretty = function (this: number): string {
    let unitsLong = [ //yanked off wikipedia
        //'Million',
        'Billion',
        'Trillion',
        'Quadrillion',
        'Quintillion',
        'Sextillion',
        'Septillion',
        'Octillion',
        'Nonillion',
        'Decillion',
        'Undecillion',
        'Duodecillion',
        'Tredecillion',
        'Quattuordecillion',
        'Quindecillion',
        'Sexdecillion',
        'Septendecillion',
        'Octodecillion',
        'Novemdecillion',
        'Vigintillion'
    ];

    let seperators = (this.toCommafied().match(/,/g)||[]).length;

    let selectedUnit: string;
    if(seperators > unitsLong.length-2){
        selectedUnit = 'Loadsillion';
    }else if(seperators == 2){
        return this.toCommafied();
    }else{
        selectedUnit = unitsLong[seperators-3];
    }

    return `${this.toCommafied(true)} ${selectedUnit}`;
}

/**
 * Return the number, rounded, with commas as decimal seperator
 */
Number.prototype.toCommafied = function (this: number, singleDecimal: boolean = false): string{
    let valueAsString = Math.round(this).toString();

    if(valueAsString.length < 4) return valueAsString; //nothing to commafy

    let seperatorRegex = /(?!^)(?=(\d{3})+(?=\.|$))/gm; //https://regex101.com/r/xF1oZ5/1
    if(singleDecimal) valueAsString = valueAsString.slice(0,4);
    return valueAsString.replace(seperatorRegex, ',');
}