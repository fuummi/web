//map
Array.prototype.myMap = function (fn) {
    let newArr = [];
    for (let i = 0; i < this.length; i++) {
        newArr.push(fn(this[i], i, this));
    }
    return newArr;
}
//测试map
let mapTest = function (currentValue, index, Array) {
    return currentValue * 2;
}
console.log([1, 2, 3].myMap(mapTest));
console.log([1, 2, 3].map(mapTest));

//filter
Array.prototype.myFilter = function (fn) {
    let newArr = [];
    for (let i = 0; i < this.length; i++) {
        if (fn(this[i]) != undefined) { //满足条件，返回值不为undefined
            newArr.push(fn(this[i],i,this));
        }
    }
    return newArr;
}
//测试filter
let filterTest = function (currentValue,index,Array) {
    if (currentValue >= 18) {
        return currentValue;
    }
}
console.log([98, 34, 43, 10, 6].myFilter(filterTest));
console.log([98, 34, 43, 10, 6].filter(filterTest));

//reduce
Array.prototype.myReduce = function (fn) {
    let total = this[0];
    for (let i = 1; i < this.length; i++) {
        total = fn(total, this[i], i, this);
    }
    return total;
}
//测试reduce
let reduceTest = function (accumulator, currentValue, currentIndix, array) {
    return accumulator + currentValue;
}
console.log([98, 34, 23, 54].myReduce(reduceTest));
console.log([98, 34, 23, 54].reduce(reduceTest));