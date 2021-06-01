type ProdType={weight:number, name:string, getScale ():number, getName():string}

class Scales {

    productsArr:Array<ProdType> = [];

    add (prod:ProdType):void {
        this.productsArr.push(prod);
    }

    getSumScale ():number {
        return this.productsArr.reduce((r:number,v:ProdType):number=>r+v.weight,0)
    }

    getNameList ():Array<string> {
        return this.productsArr.map((v:ProdType):string=>v.getName())
    }
}

class Product {

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
        return this.name
    }

}

class Apple extends Product {
    constructor (_weight:number, _name:string) {
        super(_weight, _name);
    }
}

class Tomato extends Product {
    constructor (_weight:number, _name:string) {
        super(_weight, _name);
    }
}

let myScales:Scales = new Scales;

let appleGolden:Apple = new Apple(5, "Яблоко Голден");
let appleAnton:Apple = new Apple(3, "Яблоко Антоновка");
let appleRed:Apple = new Apple(4, "Яблоко Ред");
let tomatoCherry:Tomato = new Tomato(8, "Помидор Чери");
let tomatoBlack:Tomato = new Tomato(1, "Помидор Чёрный принц");

myScales.add(appleAnton);
myScales.add(appleGolden);
myScales.add(appleRed);
myScales.add(tomatoCherry);
myScales.add(tomatoBlack);

console.log(myScales.getSumScale());
console.log(myScales.getNameList());