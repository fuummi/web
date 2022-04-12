let heart = document.querySelector('.heart')
let sidebar = document.querySelector('.sidebar')
let row = document.querySelector('.row')
let thr1 = document.querySelector('.thr1')
let list1 = document.querySelector('.list1')
let zhankai1 = document.querySelector('.zhankai1')
let thr2 = document.querySelector('.thr2')
let list2 = document.querySelector('.list2')
let zhankai2 = document.querySelector('.zhankai2')
let playBtns = document.querySelectorAll('.btns img')
let temp = 0;
let count1 = 0;
let count2 = 0;
let count3 = 0;
heart.addEventListener('click', function () {
    count3++;
    if (count3 % 2 != 0) { //底部播放按钮红心点击变红
        heart.src = "./images/heartafter.png"
    } else {
        heart.src = "./images/heartbefore.png"
    }
})
for (let i = 0; i < 5; i++) { //底部播放按钮覆盖变红
    playBtns[i].addEventListener('mouseenter', function () {
        playBtns[i].src = './images/play' + i + '1.png'
    })
    playBtns[i].addEventListener('mouseleave', function () {
        playBtns[i].src = './images/play' + i + '.png'
    })
}
