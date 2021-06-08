// function uniFactory<objtype>(classRef: { new (): objtype; }): objtype {
//     return new classRef();
// }

interface IStorageEngine {
    addItem(item:Product):void;
    getItem(index:number):Product;
    getCount():number;
}

class Scales<StorageEngine extends IStorageEngine>  {

    se:StorageEngine = null;

    constructor(_se:StorageEngine) {
        this.se = _se;
    }

    add (prod:Product):void {
        this.se.addItem(prod);
    }

    getSumScale ():number {
        let sumScale = 0;
        for (let i=0; i<this.se.getCount(); i++) {
            sumScale+=this.se.getItem(i).getScale()
        }
        return sumScale
    }

    getNameList ():Array<string> {
        let nameList = [];
        for (let i=0; i<this.se.getCount(); i++) {
            nameList.push(this.se.getItem(i).getName())
        }
        return nameList
    }
}

class StorageEngineArray implements IStorageEngine {

    private productsArr:Array<Product> = [];

    addItem(item:Product):void {
        this.productsArr.push(item);
    }

    getItem(index:number):Product {
        return this.productsArr[index]
    };

    getCount():number {
        return this.productsArr.length
    }
}

class StorageEngineLocalStorage implements IStorageEngine {

    addItem(item:Product):void {
        
        if (localStorage['scales']) {
            let lsArr:Array<Object> = JSON.parse(localStorage['scales']);
            lsArr.push({'name':item.getName(), 'scale': item.getScale()});
            localStorage['scales'] = JSON.stringify(lsArr);
        }
        else {
            localStorage['scales'] = JSON.stringify([{'name':item.getName(), 'scale': item.getScale()}])
        }
    }

    getItem(index:number):Product {
        let selectedProd:any = JSON.parse(localStorage['scales'])[index];
        return new Product (selectedProd.scale, selectedProd.name)
    };

    getCount():number {
        return JSON.parse(localStorage['scales']).length
    }
}

class Product {

    private weight:number;
    private name:string;

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

let ScalesStorageEngineArray = new Scales<StorageEngineArray>(new StorageEngineArray);

let appleGolden:Product = new Product(5, "Яблоко Голден");
let appleAnton:Product = new Product(3, "Яблоко Антоновка");
let appleRed:Product = new Product(4, "Яблоко Ред");
let tomatoCherry:Product = new Product(8, "Помидор Чери");
let tomatoBlack:Product = new Product(1, "Помидор Чёрный принц");

ScalesStorageEngineArray.add(appleAnton);
ScalesStorageEngineArray.add(appleGolden);
ScalesStorageEngineArray.add(appleRed);
ScalesStorageEngineArray.add(tomatoCherry);
ScalesStorageEngineArray.add(tomatoBlack);

console.log(ScalesStorageEngineArray.getSumScale());
console.log(ScalesStorageEngineArray.getNameList());

let ScalesStorageEngineLocalStorage = new Scales<StorageEngineLocalStorage>(new StorageEngineLocalStorage);

let lemon:Product = new Product(8, "Лимон");
let orange:Product = new Product(7, "Апельсин");
let pineapple:Product = new Product(11, "Ананас");

ScalesStorageEngineLocalStorage.add(lemon);
ScalesStorageEngineLocalStorage.add(orange);
ScalesStorageEngineLocalStorage.add(pineapple);

console.log(ScalesStorageEngineLocalStorage.getSumScale());
console.log(ScalesStorageEngineLocalStorage.getNameList());