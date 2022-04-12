let img = document.querySelectorAll('.ban')
let ol = document.querySelector('ol')
let pre = document.querySelector('.banBtn1')
let next = document.querySelector('.banBtn2')
let dot = document.querySelector('.dot')
let timerNext = setInterval(forTimerNext, 5000)//定时播放    
for (let i = 0; i < img.length; i++) {       //用循环添加圆点
    let li = document.createElement('li')
    ol.appendChild(li);
}
let li = document.querySelectorAll('ol li')
ol.children[1].className = 'dotIn'  //第二张默认在最上面 
let arr = [];
let arr1 = [];//新建空数组,存Img,li,解决伪数组不能使用方法的问题
for (let i = 0; i < img.length; i++) {
    arr[i] = img[i];
    arr1[i] = li[i];
}
for (let i = 0; i < img.length; i++) { //用for循环给每个li绑定事件
    arr1[i].onmouseover = function () {
        clearInterval(timerNext)
        let flag = arr[1].id      //先判断当前在最上面的图片索引号
        let k = i                 //新建一个变量k，防止下面while                              
        while (k > flag) {        //执行时改变i对判断产生影响(一开始直接用i，循环完i递减，会出错)
            getNext()             //当点击的图片序号大于当前图片序号，前进至所点的图片
            k--
        }
        while (k < flag) {        //反之
            getPre()
            k++
        }
        for (let j = 0; j < img.length; j++) {  //用for循环给每个li清除样式
            arr[j].className = 'img3'
            arr1[j].className = ''
        }
        arr[0].className = 'img0'
        arr[1].className = 'img1'//根据索引号赋予图片样式 0：左边 1：中间 2：右边
        arr[2].className = 'img2'
        arr1[1].className = 'dotIn'//给对应圆点修改类名
        timerNext = setInterval(forTimerNext, 5000)
    }
}
let len = img.length - 1;//数组长度减一，表示图片索引号
//console.log(len);
function getNext() {
    let throww = arr[0]//存下arr数组的第一个元素
    arr.shift()//扔掉arr数组的第一个元素
    arr.push(throww)//把扔掉的元素push，实现换序
    let throww1 = arr1[0]//对小圆点li同理
    arr1.shift()
    arr1.push(throww1)
}
next.onclick = function () {
    clearInterval(timerNext)
    getNext()
    arr.className = 'img3'//先重置图片样式 全设为在后面
    arr[0].className = 'img0'
    arr[1].className = 'img1'//根据索引号赋予图片样式 0：左边 1：中间 2：右边
    arr[2].className = 'img2'
    arr[3].className = 'img3'
    arr[len].className = 'img3'//刚换下来的为 3：后面  
    arr1[1].className = 'dotIn'
    arr1[0].className = ''
    timerNext = setInterval(forTimerNext, 5000)
}
//next函数只改变图片数组的顺序，可以用在其他地方
//next.onclick函数既改变了顺序又改变了样式，只用于切换图片
function getPre() {         //同上,原理相反
    let throww = arr[len]
    arr.pop();
    arr.unshift(throww)
    let throww1 = arr1[len]
    arr1.pop();
    arr1.unshift(throww1)
}
pre.onclick = function () {
    clearInterval(timerNext)
    getPre()
    arr[0].className = 'img0'
    arr[1].className = 'img1'
    arr[2].className = 'img2'
    arr[3].className = 'img3'
    arr[len].className = 'img3'
    arr1[1].className = 'dotIn'
    arr1[2].className = ''
    timerNext = setInterval(forTimerNext, 3000)
}
function forTimerNext() {
    getNext()
    arr.className = 'img3'
    arr[0].className = 'img0'
    arr[1].className = 'img1'
    arr[2].className = 'img2'
    arr[3].className = 'img3'
    arr[len].className = 'img3'
    arr1[1].className = 'dotIn'
    arr1[0].className = ''
}
pre.onmouseover = function () {       //鼠标移至/移出按钮，按钮显示/消失
    pre.className = 'banBtn1'
    next.className = 'banBtn2'
}
next.onmouseover = function () {
    pre.className = 'banBtn1'
    next.className = 'banBtn2'
}
pre.onmouseleave = function () {
    pre.className = 'none'
    next.className = 'none'
}
next.onmouseleave = function () {
    pre.className = 'none'
    next.className = 'none'
}
for (let i = 0; i < img.length; i++) {
    img[i].onmouseenter = function () {   //鼠标移至最上面的图片上，清除定时播放
        clearInterval(timerNext)
        pre.className = 'banBtn1'
        next.className = 'banBtn2'
    }
    img[i].onmouseleave = function () {                  //鼠标移开，恢复定时播放
        timerNext = setInterval(forTimerNext, 5000)
        pre.className = 'none'
        next.className = 'none'
    }
}
