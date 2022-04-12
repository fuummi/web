function sum(a, b, c) {
    console.log(a+b+c);
    return a + b + c;
}

function Curry(fn) {
    return function curry(...arg) {
        if (arg.length < fn.length){ //小于，不满足条件，合成数据
            return function(...arg1){
                return curry.apply(this,arg =[...arg,...arg1]) //数据合成完后，再返回curry，但是这一次的curry已经存储了上一次传入的数据
            }
        }else{
            return fn.apply(this,arg) //满足条件，返回需要柯里化的函数，并把满足条件的arg作为参数传入
        }
    }
}

Curry(sum)(1)(2)(3)
Curry(sum)(1,2,3)
Curry(sum)(1,2)(3)
//总结：第一个参数是需要柯里化的函数
//(sum)后，返回的是curry这个函数，即curry(1)，curry会判断传入的参数数量满不满足需要柯里化的函数所需的参数数量
//如果不满足，curry将本次传入的参数存储在arg里面(arg =[...arg,...arg1])，并返回自己，继续接收下一次传入的参数,
//即curry(1,2)，一直循环直至满足条件
//如果满足，则会返回一开始传入的函数(sum)，并把满足条件的arg作为参数传入sum
