//改变sayIdol函数的this
function sayIdol() {
    console.log('我的idol是' + this.names + ',她' + this.age + '岁了');
}
//法1
let idol1 = {
    names: '钰姐',
    age: 18,
    fn: sayIdol//这里把函数sayIdol作为idol1变量的一个参数
}
idol1.fn()//调用sayIdol函数时标明是idol1对象里的sayIdol，就可以改变sayIdol的this
delete idol1.fn//删除fn ，否则idol1对象里会存在fn

//法2
let idol2 = {
    names: '钰姐',
    age: 18
}
Function.prototype.myCall = function (obj) {
    //console.log(this);//这个函数的this是sayIdol,因为是sayIdol调用了它
    //console.log(obj);//idol2
    obj.fn = this//同法一
    obj.fn()
    delete obj.fn
}
sayIdol.myCall(idol2)
//法2只是把法1的方法封装在maCall里，这样可以通过 ‘要改变this的函数.myCall(要改变的this)’ 更方便地更改函数的this了
//试验一下
let p = {
    time: '周六',
    plan: '做完红岩作业后'
}
function CET4() {
    console.log('' + this.time + '就要考四级了，我打算' + this.plan + '就开始复习');
}
CET4.myCall(p)

//apply
function sayIdolPro(outlook,mind) {
    console.log('她既' + outlook + '又' + mind + '');
}
let idol3 = ['漂亮', '温柔']
Function.prototype.myApply = function (obj,arr) {
    //console.log(this);//sayIdolPro函数
    //console.log(obj);//传入的第一个实参(对象)
    //console.log(arr);//传入的第二个实参(数组)
    obj.fn = this
    obj.fn(arr[0],arr[1])
    delete obj.fn
}
sayIdolPro.myApply(idol3,idol3)