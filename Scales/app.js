var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Scales = /** @class */ (function () {
    function Scales() {
        this.productsArr = [];
    }
    Scales.prototype.add = function (prod) {
        this.productsArr.push(prod);
    };
    Scales.prototype.getSumScale = function () {
        return this.productsArr.reduce(function (r, v) { return r + v.weight; }, 0);
    };
    Scales.prototype.getNameList = function () {
        return this.productsArr.map(function (v) { return v.getName(); });
    };
    return Scales;
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
var Apple = /** @class */ (function (_super) {
    __extends(Apple, _super);
    function Apple(_weight, _name) {
        return _super.call(this, _weight, _name) || this;
    }
    return Apple;
}(Product));
var Tomato = /** @class */ (function (_super) {
    __extends(Tomato, _super);
    function Tomato(_weight, _name) {
        return _super.call(this, _weight, _name) || this;
    }
    return Tomato;
}(Product));
var myScales = new Scales;
var appleGolden = new Apple(5, "Яблоко Голден");
var appleAnton = new Apple(3, "Яблоко Антоновка");
var appleRed = new Apple(4, "Яблоко Ред");
var tomatoCherry = new Tomato(8, "Помидор Чери");
var tomatoBlack = new Tomato(1, "Помидор Чёрный принц");
myScales.add(appleAnton);
myScales.add(appleGolden);
myScales.add(appleRed);
myScales.add(tomatoCherry);
myScales.add(tomatoBlack);
console.log(appleAnton.getName());
console.log(myScales.getSumScale());
console.log(myScales.getNameList());
//# sourceMappingURL=app.js.map