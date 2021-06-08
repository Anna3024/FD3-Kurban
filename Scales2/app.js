var Scales = /** @class */ (function () {
    function Scales() {
        this.productsArr = [];
    }
    Scales.prototype.add = function (prod) {
        this.productsArr.push(prod);
    };
    Scales.prototype.getSumScale = function () {
        return this.productsArr.reduce(function (r, v) { return r + v.getScale(); }, 0);
    };
    Scales.prototype.getNameList = function () {
        return this.productsArr.map(function (v) { return v.getName(); });
    };
    return Scales;
}());
var Apple = /** @class */ (function () {
    function Apple(_weight, _name) {
        this.weight = _weight;
        this.name = _name;
    }
    Apple.prototype.getScale = function () {
        return this.weight;
    };
    Apple.prototype.getName = function () {
        return "Яблоко " + this.name;
    };
    return Apple;
}());
var Tomato = /** @class */ (function () {
    function Tomato(_weight, _name) {
        this.weight = _weight;
        this.name = _name;
    }
    Tomato.prototype.getScale = function () {
        return this.weight;
    };
    Tomato.prototype.getName = function () {
        return "Помидор " + this.name;
    };
    return Tomato;
}());
var myScales = new Scales;
var appleGolden = new Apple(5, "Голден");
var appleAnton = new Apple(3, "Антоновка");
var appleRed = new Apple(4, "Ред");
var tomatoCherry = new Tomato(8, "Чери");
var tomatoBlack = new Tomato(1, "Чёрный принц");
myScales.add(appleAnton);
myScales.add(appleGolden);
myScales.add(appleRed);
myScales.add(tomatoCherry);
myScales.add(tomatoBlack);
console.log(myScales.getSumScale());
console.log(myScales.getNameList());
//# sourceMappingURL=app.js.map