class Scales {

    productsArr:Array<Product> = [];

    add (prod:Product):void {
        this.productsArr.push(prod);
    }

    getSumScale ():number {
        return this.productsArr.reduce((r:number,v:Product):number=>r+v.getScale(),0)
    }

    getNameList ():Array<string> {
        return this.productsArr.map((v:Product):string=>v.getName())
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

let appleGolden:Product = new Apple(5, "Яблоко Голден");
let appleAnton:Product = new Apple(3, "Яблоко Антоновка");
let appleRed:Product = new Apple(4, "Яблоко Ред");
let tomatoCherry:Product = new Tomato(8, "Помидор Чери");
let tomatoBlack:Product = new Tomato(1, "Помидор Чёрный принц");

myScales.add(appleAnton);
myScales.add(appleGolden);
myScales.add(appleRed);
myScales.add(tomatoCherry);
myScales.add(tomatoBlack);

console.log(myScales.getSumScale());
console.log(myScales.getNameList());