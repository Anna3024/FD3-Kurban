// function uniFactory<objtype>(classRef: { new (): objtype; }): objtype {
//     return new classRef();
// }
var Scales = /** @class */ (function () {
    function Scales(_se) {
        this.se = null;
        this.se = _se;
    }
    Scales.prototype.add = function (prod) {
        this.se.addItem(prod);
    };
    Scales.prototype.getSumScale = function () {
        var sumScale = 0;
        for (var i = 0; i < this.se.getCount(); i++) {
            sumScale += this.se.getItem(i).getScale();
        }
        return sumScale;
    };
    Scales.prototype.getNameList = function () {
        var nameList = [];
        for (var i = 0; i < this.se.getCount(); i++) {
            nameList.push(this.se.getItem(i).getName());
        }
        return nameList;
    };
    return Scales;
}());
var StorageEngineArray = /** @class */ (function () {
    function StorageEngineArray() {
        this.productsArr = [];
    }
    StorageEngineArray.prototype.addItem = function (item) {
        this.productsArr.push(item);
    };
    StorageEngineArray.prototype.getItem = function (index) {
        return this.productsArr[index];
    };
    ;
    StorageEngineArray.prototype.getCount = function () {
        return this.productsArr.length;
    };
    return StorageEngineArray;
}());
var StorageEngineLocalStorage = /** @class */ (function () {
    function StorageEngineLocalStorage() {
    }
    StorageEngineLocalStorage.prototype.addItem = function (item) {
        if (localStorage['scales']) {
            var lsArr = JSON.parse(localStorage['scales']);
            lsArr.push({ 'name': item.getName(), 'scale': item.getScale() });
            localStorage['scales'] = JSON.stringify(lsArr);
        }
        else {
            localStorage['scales'] = JSON.stringify([{ 'name': item.getName(), 'scale': item.getScale() }]);
        }
    };
    StorageEngineLocalStorage.prototype.getItem = function (index) {
        var selectedProd = JSON.parse(localStorage['scales'])[index];
        return new Product(selectedProd.scale, selectedProd.name);
    };
    ;
    StorageEngineLocalStorage.prototype.getCount = function () {
        return JSON.parse(localStorage['scales']).length;
    };
    return StorageEngineLocalStorage;
}());
var Product = /** @class */ (function () {
    function Product(_weight, _name) {
        this.weight = _weight;
        this.name = _name;
    }
    Product.prototype.getScale = function () {
        return this.weight;
    };
    Product.prototype.getName = function () {
        return this.name;
    };
    return Product;
}());
var ScalesStorageEngineArray = new Scales(new StorageEngineArray);
var appleGolden = new Product(5, "Яблоко Голден");
var appleAnton = new Product(3, "Яблоко Антоновка");
var appleRed = new Product(4, "Яблоко Ред");
var tomatoCherry = new Product(8, "Помидор Чери");
var tomatoBlack = new Product(1, "Помидор Чёрный принц");
ScalesStorageEngineArray.add(appleAnton);
ScalesStorageEngineArray.add(appleGolden);
ScalesStorageEngineArray.add(appleRed);
ScalesStorageEngineArray.add(tomatoCherry);
ScalesStorageEngineArray.add(tomatoBlack);
console.log(ScalesStorageEngineArray.getSumScale());
console.log(ScalesStorageEngineArray.getNameList());
var ScalesStorageEngineLocalStorage = new Scales(new StorageEngineLocalStorage);
var lemon = new Product(8, "Лимон");
var orange = new Product(7, "Апельсин");
var pineapple = new Product(11, "Ананас");
ScalesStorageEngineLocalStorage.add(lemon);
ScalesStorageEngineLocalStorage.add(orange);
ScalesStorageEngineLocalStorage.add(pineapple);
console.log(ScalesStorageEngineLocalStorage.getSumScale());
console.log(ScalesStorageEngineLocalStorage.getNameList());
//# sourceMappingURL=app.js.map