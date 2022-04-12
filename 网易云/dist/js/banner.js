/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/banner.js":
/*!**************************!*\
  !*** ./src/js/banner.js ***!
  \**************************/
/***/ (() => {

eval("let img = document.querySelectorAll('.ban')\r\nlet ol = document.querySelector('ol')\r\nlet pre = document.querySelector('.banBtn1')\r\nlet next = document.querySelector('.banBtn2')\r\nlet dot = document.querySelector('.dot')\r\nlet timerNext = setInterval(forTimerNext, 5000)//定时播放    \r\nfor (let i = 0; i < img.length; i++) {       //用循环添加圆点\r\n    let li = document.createElement('li')\r\n    ol.appendChild(li);\r\n}\r\nlet li = document.querySelectorAll('ol li')\r\nol.children[1].className = 'dotIn'  //第二张默认在最上面 \r\nlet arr = [];\r\nlet arr1 = [];//新建空数组,存Img,li,解决伪数组不能使用方法的问题\r\nfor (let i = 0; i < img.length; i++) {\r\n    arr[i] = img[i];\r\n    arr1[i] = li[i];\r\n}\r\nfor (let i = 0; i < img.length; i++) { //用for循环给每个li绑定事件\r\n    arr1[i].onmouseover = function () {\r\n        clearInterval(timerNext)\r\n        let flag = arr[1].id      //先判断当前在最上面的图片索引号\r\n        let k = i                 //新建一个变量k，防止下面while                              \r\n        while (k > flag) {        //执行时改变i对判断产生影响(一开始直接用i，循环完i递减，会出错)\r\n            getNext()             //当点击的图片序号大于当前图片序号，前进至所点的图片\r\n            k--\r\n        }\r\n        while (k < flag) {        //反之\r\n            getPre()\r\n            k++\r\n        }\r\n        for (let j = 0; j < img.length; j++) {  //用for循环给每个li清除样式\r\n            arr[j].className = 'img3'\r\n            arr1[j].className = ''\r\n        }\r\n        arr[0].className = 'img0'\r\n        arr[1].className = 'img1'//根据索引号赋予图片样式 0：左边 1：中间 2：右边\r\n        arr[2].className = 'img2'\r\n        arr1[1].className = 'dotIn'//给对应圆点修改类名\r\n        timerNext = setInterval(forTimerNext, 5000)\r\n    }\r\n}\r\nlet len = img.length - 1;//数组长度减一，表示图片索引号\r\n//console.log(len);\r\nfunction getNext() {\r\n    let throww = arr[0]//存下arr数组的第一个元素\r\n    arr.shift()//扔掉arr数组的第一个元素\r\n    arr.push(throww)//把扔掉的元素push，实现换序\r\n    let throww1 = arr1[0]//对小圆点li同理\r\n    arr1.shift()\r\n    arr1.push(throww1)\r\n}\r\nnext.onclick = function () {\r\n    clearInterval(timerNext)\r\n    getNext()\r\n    arr.className = 'img3'//先重置图片样式 全设为在后面\r\n    arr[0].className = 'img0'\r\n    arr[1].className = 'img1'//根据索引号赋予图片样式 0：左边 1：中间 2：右边\r\n    arr[2].className = 'img2'\r\n    arr[3].className = 'img3'\r\n    arr[len].className = 'img3'//刚换下来的为 3：后面  \r\n    arr1[1].className = 'dotIn'\r\n    arr1[0].className = ''\r\n    timerNext = setInterval(forTimerNext, 5000)\r\n}\r\n//next函数只改变图片数组的顺序，可以用在其他地方\r\n//next.onclick函数既改变了顺序又改变了样式，只用于切换图片\r\nfunction getPre() {         //同上,原理相反\r\n    let throww = arr[len]\r\n    arr.pop();\r\n    arr.unshift(throww)\r\n    let throww1 = arr1[len]\r\n    arr1.pop();\r\n    arr1.unshift(throww1)\r\n}\r\npre.onclick = function () {\r\n    clearInterval(timerNext)\r\n    getPre()\r\n    arr[0].className = 'img0'\r\n    arr[1].className = 'img1'\r\n    arr[2].className = 'img2'\r\n    arr[3].className = 'img3'\r\n    arr[len].className = 'img3'\r\n    arr1[1].className = 'dotIn'\r\n    arr1[2].className = ''\r\n    timerNext = setInterval(forTimerNext, 3000)\r\n}\r\nfunction forTimerNext() {\r\n    getNext()\r\n    arr.className = 'img3'\r\n    arr[0].className = 'img0'\r\n    arr[1].className = 'img1'\r\n    arr[2].className = 'img2'\r\n    arr[3].className = 'img3'\r\n    arr[len].className = 'img3'\r\n    arr1[1].className = 'dotIn'\r\n    arr1[0].className = ''\r\n}\r\npre.onmouseover = function () {       //鼠标移至/移出按钮，按钮显示/消失\r\n    pre.className = 'banBtn1'\r\n    next.className = 'banBtn2'\r\n}\r\nnext.onmouseover = function () {\r\n    pre.className = 'banBtn1'\r\n    next.className = 'banBtn2'\r\n}\r\npre.onmouseleave = function () {\r\n    pre.className = 'none'\r\n    next.className = 'none'\r\n}\r\nnext.onmouseleave = function () {\r\n    pre.className = 'none'\r\n    next.className = 'none'\r\n}\r\nfor (let i = 0; i < img.length; i++) {\r\n    img[i].onmouseenter = function () {   //鼠标移至最上面的图片上，清除定时播放\r\n        clearInterval(timerNext)\r\n        pre.className = 'banBtn1'\r\n        next.className = 'banBtn2'\r\n    }\r\n    img[i].onmouseleave = function () {                  //鼠标移开，恢复定时播放\r\n        timerNext = setInterval(forTimerNext, 5000)\r\n        pre.className = 'none'\r\n        next.className = 'none'\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://cloud-music/./src/js/banner.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/banner.js"]();
/******/ 	
/******/ })()
;