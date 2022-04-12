//AOP：在原函数的基础上新增新功能但不改变原函数，切片编程
let func = function(){
    console.log(2);
}
Function.prototype.before = function(callback){ //新增功能在原函数前
    let _this = this;//第一层函数的this为原函数(before的调用者为原函数)
    return function(){
        callback.apply(this,arguments);//执行新增函数
        _this.apply(this,arguments);//执行原函数
        return _this;//因为新增功能不能影响原函数，返回原函数
    }
}
Function.prototype.after = function(callback){ //新增功能在原函数后
    let _this = this;
    return function(){
        _this.apply(this,arguments);
        callback.apply(this,arguments);
        return _this;
    }
}
func = func.before((a=1) => {
    console.log(a)
}).after((b=3) => {
    console.log(b);
})
func()
