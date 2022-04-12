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

/***/ "./src/js/play.js":
/*!************************!*\
  !*** ./src/js/play.js ***!
  \************************/
/***/ (() => {

eval("let heart = document.querySelector('.heart')\r\nlet sidebar = document.querySelector('.sidebar')\r\nlet row = document.querySelector('.row')\r\nlet thr1 = document.querySelector('.thr1')\r\nlet list1 = document.querySelector('.list1')\r\nlet zhankai1 = document.querySelector('.zhankai1')\r\nlet thr2 = document.querySelector('.thr2')\r\nlet list2 = document.querySelector('.list2')\r\nlet zhankai2 = document.querySelector('.zhankai2')\r\nlet playBtns = document.querySelectorAll('.btns img')\r\nlet temp = 0;\r\nlet count1 = 0;\r\nlet count2 = 0;\r\nlet count3 = 0;\r\nheart.addEventListener('click', function () {\r\n    count3++;\r\n    if (count3 % 2 != 0) { //底部播放按钮红心点击变红\r\n        heart.src = \"./images/heartafter.png\"\r\n    } else {\r\n        heart.src = \"./images/heartbefore.png\"\r\n    }\r\n})\r\nfor (let i = 0; i < 5; i++) { //底部播放按钮覆盖变红\r\n    playBtns[i].addEventListener('mouseenter', function () {\r\n        playBtns[i].src = './images/play' + i + '1.png'\r\n    })\r\n    playBtns[i].addEventListener('mouseleave', function () {\r\n        playBtns[i].src = './images/play' + i + '.png'\r\n    })\r\n}\r\n\n\n//# sourceURL=webpack://cloud-music/./src/js/play.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/play.js"]();
/******/ 	
/******/ })()
;