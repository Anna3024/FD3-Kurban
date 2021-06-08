interface IScalable {
    getScale ():number;
    getName ():string
}

class Scales {

    productsArr:Array<IScalable> = [];

    add (prod:IScalable):void {
        this.productsArr.push(prod);
    }

    getSumScale ():number {
        return this.productsArr.reduce((r:number,v:IScalable):number=>r+v.getScale(),0)
    }

    getNameList ():Array<string> {
        return this.productsArr.map((v:IScalable):string=>v.getName())
    }
}

class Apple implements IScalable {

    weight:number;

    name:string;

    constructor (_weight:number, _name:string) {
        this.weight = _weight;
        this.name = _name;
    }

    getScale ():number {
        return this.weight
    }

    getName ():string {
        return "Яблоко "+this.name
    }
}

class Tomato implements IScalable {

    weight:number;

    name:string;

    constructor (_weight:number, _name:string) {
        this.weight = _weight;
        this.name = _name;
    }

    getScale ():number {
        return this.weight
    }

    getName ():string {
        return "Помидор "+this.name
    }
}

let myScales:Scales = new Scales;

let appleGolden:Apple = new Apple(5, "Голден");
let appleAnton:Apple = new Apple(3, "Антоновка");
let appleRed:Apple = new Apple(4, "Ред");
let tomatoCherry:Tomato = new Tomato(8, "Чери");
let tomatoBlack:Tomato = new Tomato(1, "Чёрный принц");

myScales.add(appleAnton);
myScales.add(appleGolden);
myScales.add(appleRed);
myScales.add(tomatoCherry);
myScales.add(tomatoBlack);

console.log(myScales.getSumScale());
console.log(myScales.getNameList());