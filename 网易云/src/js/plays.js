let part1 = document.querySelector('.part1')
let part2 = document.querySelector('.part2')
let SongCover = document.querySelector('.SongCover')
let bottomIcons = document.querySelectorAll('.icons img')
let playBtns = document.querySelectorAll('.btns img')
let preSong = document.querySelector('.preSong')
let playSong = document.querySelector('.playSong')
let nextSong = document.querySelector('.nextSong')
let audio = document.querySelector('audio')
let Pdot = document.querySelector('.Pdot')
let running = document.querySelector('.running')
let Ccomments = document.querySelector('.Ccomments')
let Ccomment = document.querySelector('.Ccomment')
let runningGrey = document.querySelector('.runningGrey')
let windowWidth = document.body.clientWidth
//document.body.style.zoom = 0.67;
document.querySelector('.Play').style.width = '' + windowWidth + 'px'

for (let i = 0; i < 5; i++) {//底部播放控制按钮覆盖变红
    playBtns[i].addEventListener('mouseenter', function () {
        playBtns[i].src = './images/play' + i + '1.png'
    })
    playBtns[i].addEventListener('mouseleave', function () {
        playBtns[i].src = './images/play' + i + '.png'
    })
}
for (let i = 0; i < 4; i++) {//底部按钮覆盖变样式
    bottomIcons[i].addEventListener('mouseenter', function () {
        bottomIcons[i].src = './images/playbottom' + i + '1.png'
    })
    bottomIcons[i].addEventListener('mouseleave', function () {
        bottomIcons[i].src = './images/playbottom' + i + '0.png'
    })
}
//上一首下一首
let temp3 = 0 //计数变量
let preId = 0 //上一首歌的id
let nextId = 0 //下一首歌的id
let idF = function () {
    let idArr = localStorage.songIdList.split(',') //当前歌单所有歌曲的id数组
    for (let i = 0; i < idArr.length; i++) {
        temp3++;
        if (idArr[i] == localStorage.songId) { //如果现在播放的歌曲与列表中的某一个相同
            if (temp3 == 1) {  //处于第一首
                preId = idArr[idArr.length - 1]
                nextId = idArr[1]
            } else if (temp3 == idArr.length) { //处于最后一首
                preId = idArr[idArr.length - 2]
                nextId = idArr[0]
            } else { //通常
                preId = idArr[temp3 - 2]
                nextId = idArr[temp3]
            }
        }
    }
}
setTimeout(idF, 500) //页面加载顺序问题修正
preSong.addEventListener('click', function () { //上一首按钮点击事件
    audio.pause();
    localStorage.setItem('songId', preId)
    window.location.href = 'play.html'
})
nextSong.addEventListener('click', function () { //下一首按钮点击事件
    audio.pause();
    localStorage.setItem('songId', nextId)
    window.location.href = 'play.html'
})
//根据localStorage.songId加载底部播放的歌曲信息
fetch('http://localhost:3000/song/url?id=' + localStorage.songId + '')
    .then(res => { return res.json() }).then(data => {
        audio.src = data.data[0].url
        console.log(audio.src);
    })
fetch('http://localhost:3000/song/detail?ids=' + localStorage.songId + '')
    .then(res => { return res.json() }).then(data => {
        document.querySelector('.songName').innerText = data.songs[0].name
        document.title = data.songs[0].name
        document.querySelector('.SongCover').src = data.songs[0].al.picUrl
        document.querySelector('.al').innerText = '' + data.songs[0].ar[0].name + ' / ' + data.songs[0].al.name + ''
    })


//播放控制
let get = function () { //获取歌曲信息
    let duration = document.querySelector('.audio').duration;
    let currentTime = document.querySelector('.audio').currentTime;
    //处理并插入时间
    let m = parseInt(duration / 60)
    let s = parseInt(duration % 60)
    let mm = parseInt(currentTime / 60)
    let ss = parseInt(currentTime % 60)
    document.querySelector('.totalTime').innerText = '' + m + ':' + s + ''
    document.querySelector('.nowTime').innerText = '' + mm + ':' + ss + ''
    //进度圆点前进
    Pdot.style.left = '' + (currentTime / duration) * 560 + 'px'
    runningGrey.style.width = '' + (currentTime / duration) * 560 + 'px'
}
let timer = setInterval(get, 1000)//一秒刷新一次
//拖动进度条
running.addEventListener('click', () => { //点击进度条，进度改变，圆点前进
    let Fpos = running.getBoundingClientRect().left
    let Spos = event.clientX
    let percentage = (Spos - Fpos) / 560
    document.querySelector('.audio').currentTime = document.querySelector('.audio').duration * percentage
    Pdot.style.left = '' + Spos - Fpos - 7.5 + 'px'
})
runningGrey.addEventListener('click', () => {
    let Fpos = running.getBoundingClientRect().left
    let Spos = event.clientX
    let percentage = (Spos - Fpos) / 560
    document.querySelector('.audio').currentTime = document.querySelector('.audio').duration * percentage
    Pdot.style.left = '' + Spos - Fpos - 7.5 + 'px'
    runningGrey.style.width = '' + Spos - Fpos - 7.5 + 'px'
})
//唱片旋转
let deg = 1
let rotate = function () {
    deg++
    part2.style.transform = 'rotate(' + deg + 'deg)'
    SongCover.style.transform = 'rotate(' + deg + 'deg)'
    return deg
}
let timerR = {}
playSong.addEventListener('click', () => {
    get()
    if (audio.paused) { //如果暂停时点击
        timerR = setInterval(rotate, 50) //开始旋转
        part1.className = 'part1After'
        playBtns[2].src = './images/play12.png' //播放按钮三角变两竖杠
        playBtns[2].addEventListener('mouseenter', function () {
            playBtns[2].src = './images/play121.png'
        })
        playBtns[2].addEventListener('mouseleave', function () {
            playBtns[2].src = './images/play12.png'
        })
        audio.play();//播放
        return timerR
    } else { //反之
        clearInterval(timerR)
        part1.className = 'part1'
        playBtns[2].src = './images/play1.png'
        playBtns[2].addEventListener('mouseenter', function () {
            playBtns[2].src = './images/play21.png'
        })
        playBtns[2].addEventListener('mouseleave', function () {
            playBtns[2].src = './images/play2.png'
        })
        audio.pause();//暂停
    }
})
//歌名方块居中
let center = function () {
    let songTitle = document.querySelector('.songTitle')
    songTitle.style.marginLeft = '' + -0.5 * songTitle.offsetWidth + 'px'
}
setTimeout(center, 400) //页面加载顺序问题修正
//音量调节
let volumBtn = document.querySelector('.volumBtn')
let volumL = document.querySelector('.l')
let volumD = document.querySelector('.d')
let count8 = 0;
volumBtn.addEventListener('click', function () { //点击喇叭出现音量调节方块
    count8++;
    if (count8 % 2 != 0) {
        document.querySelector('.volum').style.display = 'block'
    } else {
        document.querySelector('.volum').style.display = 'none'
    }
})
volumL.addEventListener('click', () => {
    let Fpos = volumL.getBoundingClientRect().bottom //通过音量条长度和点击Y坐标的比值控制音量
    let Spos = event.clientY
    let persentage = (Fpos - Spos) / 100
    volumD.style.marginTop = '' + -(7 + (persentage * 100)) + 'px'
    audio.volume = persentage
})
//评论
let commentF = function () {
    fetch('http://localhost:3000/comment/music?id=' + localStorage.songId + '')
        .then(res => { return res.json() }).then(data => {
            Ccomment.querySelector('.cNum').innerText = '全部评论(' + data.total + ')'
            //热评
            for (let i = 0; i < data.hotComments.length; i++) {
                document.querySelector('.Ccomment').append(Ccomments.cloneNode(true))
                Ccomment.querySelector('.Chead').src = '' + data.hotComments[i].user.avatarUrl + ''
                Ccomment.querySelector('.Cinner a').innerText = '' + data.hotComments[i].user.nickname + ''
                Ccomment.querySelector('.inner').innerText = ':' + data.hotComments[i].content + ''
                Ccomment.querySelector('.Ctime').innerText = '' + data.hotComments[i].timeStr + ''
                Ccomment.querySelector('.Cright span').innerText = '' + data.hotComments[i].likedCount + ''
            }
            let moreComment = document.createElement("img")
            moreComment.src = "./images/morecomment.png"
            moreComment.style.marginLeft = '350px'
            moreComment.style.cursor = 'pointer'
            Ccomment.append(moreComment)
            let cNum1 = document.querySelector(".cNum")
            cNum1.innerText = '最新评论(' + data.total + ')'
            Ccomment.append(cNum1.cloneNode(true))
            //普通评论
            for (let i = 0; i < data.comments.length; i++) {
                document.querySelector('.Ccomment').append(Ccomments.cloneNode(true))
                Ccomment.querySelector('.Chead').src = '' + data.comments[i].user.avatarUrl + ''
                Ccomment.querySelector('.Cinner a').innerText = '' + data.comments[i].user.nickname + ''
                Ccomment.querySelector('.inner').innerText = ':' + data.comments[i].content + ''
                Ccomment.querySelector('.Ctime').innerText = '' + data.comments[i].timeStr + ''
                Ccomment.querySelector('.Cright span').innerText = '' + data.comments[i].likedCount + ''
            }
            //bug修正
            let remove2 = Ccomment.children[1]
            let remove3 = Ccomment.children[2]
            Ccomment.appendChild(remove2)
            Ccomment.removeChild(remove3)
            let temp = data.hotComments.length + 2
            let remove1 = Ccomment.children[temp]
            Ccomment.removeChild(remove1)
        })
}
commentF()
//热搜
let hotSearch = document.querySelector('.hotSearch')
let searchs = document.querySelectorAll('.hotSearch div')
for (let i = 0; i < 20; i++) { //方块鼠标移入变色
    searchs[i].addEventListener('mouseenter', function () {
        searchs[i].style.backgroundColor = 'rgb(242, 242, 242)'
    })
    searchs[i].addEventListener('mouseleave', function () {
        searchs[i].style.backgroundColor = '#fff'
    })
}
fetch('http://localhost:3000/search/hot/detail') //获取热搜内容
    .then(res => { return res.json() }).then(data => {
        for (let i = 0; i < 20; i++) {
            searchs[i].querySelector('.hotName').innerText = data.data[i].searchWord
            searchs[i].querySelector('.hotNum').innerText = data.data[i].score
            if (data.data[i].content != '') { //热搜评论
                searchs[i].querySelector('.detile').innerText = data.data[i].content
            }
            if (data.data[i].iconUrl != null) { //热搜小图标
                searchs[i].querySelector('img').src = data.data[i].iconUrl
                searchs[i].querySelector('img').style.height = '20px'
            }
            searchs[i].addEventListener('click', function () { //点击搜索
                localStorage.setItem('searchValue', data.data[i].searchWord)
                window.location.href = 'search.html'
            })
        }
    })
document.querySelector('.search').onblur = function () { //搜索框失去焦点，消失
    setTimeout("document.querySelector('.hotSearch').style.display = 'none'", 100)
}
//获取默认搜索词
fetch('http://localhost:3000/search/default')
    .then(res => { return res.json() }).then(data => {
        document.querySelector('.search').placeholder = '' + data.data.showKeyword + ''
        localStorage.setItem('realkeyword', data.data.realkeyword)
    })
//搜索
document.querySelector('.search').onfocus = function () {
    document.querySelector('.hotSearch').style.display = 'block'
    document.onkeydown = function (e) {
        let a = e || window.event;
        if (a.keyCode == 13) {
            if (document.querySelector('.search').value !== '') {//输入框里有值，直接搜索
                localStorage.setItem('searchValue', document.querySelector('.search').value)
                window.location.href = 'search.html'
            } else { //输入框为空，用默认值搜索
                localStorage.setItem('searchValue', localStorage.realkeyword)
                window.location.href = 'search.html'
            }
        }
    }
}
//歌词滚动
let lyArr = []
let tlyric = []
let tlyric1 = []
let timeArr = []
let wordArr = []
let tempArr = []
let nowTime = 0
let lyricBox = document.querySelector('.lyric')
fetch('http://localhost:3000/lyric?id=' + localStorage.songId + '')
    .then(res => { return res.json() }).then(data => {
        lyArr = data.lrc.lyric.split('\n') //歌词数组
        tlyric = data.tlyric.lyric.split('\n') //翻译数组
        for (let i = 0; i < lyArr.length; i++) {
            if (lyArr[i].slice(11) == '') {
                lyArr.splice(i, 1)
            }
        }
        tlyric.forEach((currentValue) => {
            tlyric1.push(currentValue.slice(1, 10))
        })
        for (let i = 0; i < lyArr.length; i++) { //把时间和词分入两个数组
            let sec = 0
            if (lyArr[i].slice(1, 3) != 00) { //有分钟位
                sec = parseInt(lyArr[i].slice(2, 3) * 60) + parseInt(lyArr[i].slice(4, 6))
            } else if (lyArr[i].slice(4, 5) == 0) { //第一个秒位上有0
                sec = lyArr[i].slice(5, 6)
            } else {
                sec = lyArr[i].slice(4, 6)
            }
            if (lyArr[i].slice(lyArr[i].indexOf(']') + 1) != "") {//去除歌词中为空的
                timeArr.push(parseFloat('' + sec + '.' + lyArr[i].slice(7, 10) + ''))
                if (data.tlyric.lyric != '') {//如果有翻译
                    for (let i = 0; i < lyArr.length; i++) {
                        wordArr.push(lyArr[i].slice(lyArr[i].indexOf(']') + 1))
                        for (let j = 0; j < tlyric1.length; j++) {
                            if (lyArr[i].slice(1, 10) == tlyric1[j]) { //如果歌词与翻译的时间相符
                                wordArr[i] = '' + lyArr[i].slice(lyArr[i].indexOf(']') + 1) + '\n' + tlyric[j].slice(lyArr[i].indexOf(']') + 1) + ''
                            }
                        }
                    }
                } else {
                    wordArr.push(lyArr[i].slice(lyArr[i].indexOf(']') + 1))
                }
            }
        }
        for (let i = 0; i < timeArr.length; i++) {
            let p = document.createElement('p')
            p.innerText = wordArr[i]
            if (i == 0) {
                p.className = 'lyin'
            } else {
                p.className = 'lyout'
            }
            lyricBox.append(p) //插入歌词方块
        }
    })
let getLy = function () { //更新播放进度
    nowTime = document.querySelector('.audio').currentTime.toFixed(3)
}
let temp111 = 0
let compare = function () {
    for (let i = 0; i < timeArr.length; i++) {
        if (nowTime > timeArr[i]) { //播放时间超出时间轴时间，代表这句歌词已经过去
            temp111 = i
        }
    }
}
let scroll = function () { //歌词滚动效果
    if (temp111 == 0) {
        lyricBox.querySelectorAll('p').forEach((currentValue) => { //排他思想改变样式
            currentValue.className = 'lyout'
        })
        lyricBox.querySelectorAll('p')[temp111].className = 'lyin'
    } else {
        lyricBox.querySelectorAll('p').forEach((currentValue) => {
            currentValue.className = 'lyout'
        })
        lyricBox.querySelectorAll('p')[temp111].className = 'lyin'
    }
    if (tlyric != '') {//如果有翻译，要滚得多一些
        lyricBox.scroll({
            top: (temp111) * 150,
            behavior: 'smooth'
        })
    } else {
        lyricBox.scroll({
            top: (temp111) * 90,
            behavior: 'smooth'
        })
    }
}
window.onload = function () {
    setInterval(() => {
        scroll()
        getLy()
        compare()
    }, 100)
};
setTimeout(() => {
    document.querySelectorAll('.NlistItem').forEach((element) => {
        element.style.color = ''
        if (element.id == localStorage.songId) {//当前歌曲字体为红色
            element.style.color = 'red'
        }
        element.addEventListener('click', () => {
            localStorage.setItem('songId', element.id)
            window.location.href = 'play.html'
        })
    })
}, 1000);



