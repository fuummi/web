let listS = document.querySelector('.listS')
let SlistItem = listS.querySelector('.SlistItem')
let SlistItem1 = listS.querySelector('.SlistItem1')
let SlistHeader = document.querySelector('.SlistHeader')
let audio = document.querySelector('audio')

let songIdList1 = []
let searchFn = function (value) { //搜索
    document.querySelector('.searchInner').innerText = '搜索 ' + value + ''
    document.title = '搜索 ' + value + ''
    fetch('http://localhost:3000/search?keywords=' + value + '')
        .then(res => { return res.json() }).then(data => {
            for (let i = 0; i < data.result.songs.length; i++) {
                songIdList1.push(data.result.songs[i].id)//录入搜索结果歌单中歌曲的id
            }
            localStorage.setItem('songIdList', songIdList1)//存歌单歌曲id入本地
            listS.style.height = '' + data.result.songs.length * 49 + 'px'
            data.result.songs.push(data.result.songs[0])
            data.result.songs.push(data.result.songs[1])//修正，见readme
            data.result.songs.shift(data.result.songs[0])
            data.result.songs.shift(data.result.songs[1])
            for (let i = 0; i < data.result.songs.length; i++) {
                if (i % 2 == 0) { //交替插入底色为灰、白的两种方块，用%2==0判断，这里是插入灰色的
                    document.querySelector('.listS').append(SlistItem.cloneNode(true))
                    SlistItem.querySelector('.title').innerText = '' + data.result.songs[i].name + ''
                    if (data.result.songs[i].artists[0].name.length > 10) {
                        SlistItem.querySelector('.singer').innerText = '' + data.result.songs[i].artists[0].name.substr(0, 10) + '...'
                    } else {
                        SlistItem.querySelector('.singer').innerText = '' + data.result.songs[i].artists[0].name + ''
                    }
                    if (data.result.songs[i].album.name.length > 20) {
                        SlistItem.querySelector('.album').innerText = '' + data.result.songs[i].album.name.substr(0, 20) + '...'
                    } else {
                        SlistItem.querySelector('.album').innerText = '' + data.result.songs[i].album.name + ''
                    }
                    SlistItem.id = data.result.songs[i].id
                    let m = parseInt(data.result.songs[i].duration / 60000)
                    let s = parseInt(data.result.songs[i].duration % 60)
                    SlistItem.querySelector('.time').innerText = '' + m + ':' + s + ''
                } else { //同上，这里是插入白色的方块
                    document.querySelector('.listS').append(SlistItem1.cloneNode(true))
                    SlistItem1.querySelector('.title').innerText = '' + data.result.songs[i].name + ''
                    if (data.result.songs[i].artists[0].name.length > 10) {
                        SlistItem1.querySelector('.singer').innerText = '' + data.result.songs[i].artists[0].name.substr(0, 10) + '...'
                    } else {
                        SlistItem1.querySelector('.singer').innerText = '' + data.result.songs[i].artists[0].name + ''
                    }
                    if (data.result.songs[i].album.name.length > 20) {
                        SlistItem1.querySelector('.album').innerText = '' + data.result.songs[i].album.name.substr(0, 20) + '...'
                    } else {
                        SlistItem1.querySelector('.album').innerText = '' + data.result.songs[i].album.name + ''
                    } SlistItem1.id = data.result.songs[i].id
                    let m = parseInt(data.result.songs[i].duration / 60000)
                    let s = parseInt(data.result.songs[i].duration % 60)
                    SlistItem1.querySelector('.time').innerText = '' + m + ':' + s + ''
                }
            }
            let remove = listS.querySelectorAll('#remove') //修正
            for (let i = 0; i < remove.length; i++) {
                listS.removeChild(remove[i])
            }
        })
}
searchFn(localStorage.searchValue)
//插入歌单序号,id
let numF1 = function () {
    if (document.querySelector('.listS').children.length !== 2) { //插入完成后才写入序号，避免错误
        //插入序号
        for (let i = 1; i < document.querySelector('.listS').children.length + 1; i++) {
            document.querySelectorAll('.listItem')[i - 1].querySelector('.num').innerHTML = '' + i + '<img src="./images/listheart.png"><img src="./images/listdown.png">'
        }
        //存id入本地存储
        let listItem = document.querySelectorAll('.listItem')
        for (let i = 0; i < listItem.length; i++) {
            listItem[i].addEventListener('click', () => {
                localStorage.setItem('songId', listItem[i].id)
                window.location.href = 'play.html'
            })
        }
        clearInterval(numTimer1)
        clearInterval(idTimer1)
    }
}//在这之前一直检查是否插入完毕
let numTimer1 = setInterval(numF1, 100)
let idTimer1 = setTimeout(numF1, 100)
//获取底部播放方块的歌曲信息
let getLittle1 = function () {
    fetch('http://localhost:3000/song/url?id=' + localStorage.songId + '')
        .then(res => { return res.json() }).then(data => {
            audio.src = data.data[0].url
        })
    fetch('http://localhost:3000/song/detail?ids=' + localStorage.songId + '')
        .then(res => { return res.json() }).then(data => {
            document.querySelector('.playTitle').innerText = data.songs[0].name
            document.querySelector('.littleCover').src = data.songs[0].al.picUrl
            document.querySelector('.playSinger').innerText = '' + data.songs[0].ar[0].name + ' / ' + data.songs[0].al.name + ''
        })
}
getLittle1()
let get11 = function () {
    let duration = document.querySelector('.audio').duration;
    let currentTime = document.querySelector('.audio').currentTime;
    //插入时间
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
setTimeout(get11, 800)
setInterval(get11, 1000)
//拖动进度条
let running = document.querySelector('.running')
let runningGrey = document.querySelector('.runningGrey')
running.addEventListener('click', () => {
    let Fpos = running.getBoundingClientRect().left
    let Spos = event.clientX
    let percentage = (Spos - Fpos) / 560
    document.querySelector('.audio').currentTime = document.querySelector('.audio').duration * percentage
    Pdot.style.left = '' + Spos - Fpos - 7.5 + 'px'
    runningGrey.style.width = '' + Spos - Fpos - 7.5 + 'px' 
})
runningGrey.addEventListener('click', () => {
    let Fpos = running.getBoundingClientRect().left
    let Spos = event.clientX
    let percentage = (Spos - Fpos) / 560
    document.querySelector('.audio').currentTime = document.querySelector('.audio').duration * percentage
    Pdot.style.left = '' + Spos - Fpos - 7.5 + 'px'
    runningGrey.style.width = '' + Spos - Fpos - 7.5 + 'px' 
})
let playSong = document.querySelector('.playSong')
playSong.addEventListener('click', () => {
    get11()
    if (audio.paused) {
        playBtns[2].src = './images/play12.png'
        playBtns[2].addEventListener('mouseenter', function () {
            playBtns[2].src = './images/play121.png'
        })
        playBtns[2].addEventListener('mouseleave', function () {
            playBtns[2].src = './images/play12.png'
        })
        audio.play();//播放
    } else {
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
//点击小图片打开详情
document.querySelector('.littleCover').addEventListener('click', () => {
    window.open('play.html')
    audio.pause();
})
//音量调节
let volumBtn1 = document.querySelector('.volumBtn')
let volumL1 = document.querySelector('.l')
let volumD1 = document.querySelector('.d')
let count9 = 0;
volumBtn1.addEventListener('click', function () {
    count9++;
    if (count9 % 2 != 0) {
        document.querySelector('.volum').style.display = 'block'
    } else {
        document.querySelector('.volum').style.display = 'none'
    }
})
volumL1.addEventListener('click', () => {
    let Fpos = volumL.getBoundingClientRect().bottom
    let Spos = event.clientY
    let persentage = (Fpos - Spos) / 100
    volumD.style.marginTop = '' + -(7 + (persentage * 100)) + 'px'
    audio.volume = persentage
})
//热搜
let hotSearch1 = document.querySelector('.hotSearch')
let searchs1 = document.querySelectorAll('.hotSearch div')
for (let i = 0; i < 20; i++) {
    searchs1[i].addEventListener('mouseenter', function () {
        searchs1[i].style.backgroundColor = 'rgb(242, 242, 242)'
    })
    searchs1[i].addEventListener('mouseleave', function () {
        searchs1[i].style.backgroundColor = '#fff'
    })
}
fetch('http://localhost:3000/search/hot/detail')
    .then(res => { return res.json() }).then(data => {
        for (let i = 0; i < 20; i++) {
            searchs1[i].querySelector('.hotName').innerText = data.data[i].searchWord
            searchs1[i].querySelector('.hotNum').innerText = data.data[i].score
            if (data.data[i].content != '') {
                searchs1[i].querySelector('.detile').innerText = data.data[i].content
            }
            if (data.data[i].iconUrl != null) {
                searchs1[i].querySelector('img').src = data.data[i].iconUrl
                searchs1[i].querySelector('img').style.height = '20px'
            }
            searchs1[i].addEventListener('click', function () {
                localStorage.setItem('searchValue', data.data[i].searchWord)
                window.location.href = 'search.html'
            })
        }
    })
document.querySelector('.search1').onblur = function () {
    setTimeout("document.querySelector('.hotSearch').style.display = 'none'", 100)
}
//默认搜索词
fetch('http://localhost:3000/search/default')
    .then(res => { return res.json() }).then(data => {
        document.querySelector('.search').placeholder = '' + data.data.showKeyword + ''
        localStorage.setItem('realkeyword', data.data.realkeyword)
    })
//搜索
document.querySelector('.search').onfocus = function () {
    hotSearch1.style.display = 'block'
    document.onkeydown = function (e) {
        let a = e || window.event;
        if (a.keyCode == 13) {
            if (document.querySelector('.search').value !== '') {
                localStorage.setItem('searchValue', document.querySelector('.search').value)
                window.location.href = 'search.html'
            } else {
                localStorage.setItem('searchValue', localStorage.realkeyword)
                window.location.href = 'search.html'
            }
        }
    }
}
//上一首下一首
let temp4 = 0
let preId1 = 0
let nextId1 = 0
let idArr1 = []
let fn1 = function () {
    idArr1 = localStorage.songIdList.split(',')
    temp4 = 0
    for (let i = 0; i < idArr1.length; i++) {
        temp4++
        if (idArr1[i] === localStorage.songId) {
            if (temp4 == 1) {  //处于第一首
                preId1 = idArr1[idArr1.length - 1]
                nextId1 = idArr1[1]
            } else if (temp4 == idArr1.length) { //最后一首
                preId1 = idArr1[idArr1.length - 2]
                nextId1 = idArr1[0]
            } else {
                preId1 = idArr1[temp4 - 2]
                nextId1 = idArr1[temp4]
            }
        }
    }
}
let recolor1 = function(){
    for(let i = 0;i<document.querySelectorAll('.NlistItem').length;i++){
        document.querySelectorAll('.NlistItem')[i].style.color = ''
        if(document.querySelectorAll('.NlistItem')[i].id == localStorage.songId){
            document.querySelectorAll('.NlistItem')[i].style.color = 'red'
        }
    }
}
document.querySelector('.preSong').addEventListener('click', () => {
    fn1()
    localStorage.setItem('songId', preId1)
    getLittle1()
    recolor1()
})
document.querySelector('.nextSong').addEventListener('click', () => {
    fn1()
    localStorage.setItem('songId', nextId1)
    getLittle1()
    recolor1()
})
document.querySelector('.playAll').addEventListener('click', () => {
    alert('播放全部会替换当前的播放列表,是否继续?')
    fetch('http://localhost:3000/search?keywords=' + localStorage.searchValue + '')
        .then(res => { return res.json() }).then(data => {
            console.log(data.result.songs);
            for (let i = 0; i < data.result.songs.length; i++) {
                songIdList1.push(data.result.songs[i].id)
            }
            localStorage.setItem('songIdList', songIdList1)
        })
    fn1()
    localStorage.setItem('songId', idArr1[0])
    getLittle1()
    localStorage.setItem('songListId', localStorage.songListId)
    localStorage.setItem('NsongListId',localStorage.songListId)
    nowFn()  
    location.reload() //这个bug是如果不刷新直接写入新的歌曲，旧的歌曲还会在里面，实在找不出来了，直接刷新解决
})