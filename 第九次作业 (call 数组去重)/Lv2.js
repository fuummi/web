let arr = [1, 2, 3, 4, 5, 1, 2, 3]
let arr2 = ['a', 'w', 't', 'p', 'w', 'c', 't']
let newArr = [];
let newArr2 = [];
//法一
function fn(obj) {
    for (let i = 0; i < obj.length; i++) {
        if (newArr.indexOf(obj[i]) === -1) {  //indexOf=-1,数组里不存在该数
            newArr.push(obj[i])
        }
    }
    return newArr
}
fn(arr)
console.log(newArr)
//法二
function del(element){
    return element!==''; //因为用了delete,会出现空元素,先写一个删除空元素的函数
}
function fn2(obj) {
    for (let i = 0; i < obj.length; i++) {       //外层遍历整个数组
        for (let j = i + 1; j <= obj.length; j++) { //内层遍历上层的数之后的所有数
            if (obj[i] === obj[j]) { //出现重合,删除
                delete obj[i]
            }
        }
    }
    return newArr2 = obj.filter(del)//用del去除数组中的空元素
}
fn2(arr2)
console.log(newArr2);