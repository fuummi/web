let banner = document.querySelectorAll('.ban')
let songBlock = document.querySelector('.songBlock')
let box = document.getElementById("000")
let discribe = document.querySelector('.discribe')
let audio = document.querySelector('audio')
let Pdot = document.querySelector('.Pdot')
let running = document.querySelector('.running')
let playSong = document.querySelector('.playSong ')
let runningGrey = document.querySelector('.runningGrey')
let song = document.querySelector('.song')
//轮播图图片
fetch('http://localhost:3000/banner')
    .then(res => {
        return res.json();
    }).then(data => {
        for (i = 0; i < data.banners.length; i++) {
            banner[i].src = data.banners[i].imageUrl;
        }
    })
//推荐歌单数据插入
fetch('http://localhost:3000/personalized?limit=10')
    .then(res => {
        return res.json();
    }).then(data => {
        data.result.push(data.result[0])
        data.result.shift(data.result[0])
        for (i = 0; i < 10; i++) {
            document.querySelector('.song').appendChild(songBlock.cloneNode(true))
            songBlock.querySelector('.playCount').innerHTML = '<img src="./images/littleplay.png">' + parseInt(data.result[i].playCount * 0.0001) + '万'
            songBlock.querySelector('.discribe').innerHTML = data.result[i].name
            songBlock.querySelector('.cover').src = data.result[i].picUrl
            songBlock.id = data.result[i].id
            songBlock.setAttribute('temp', '01')
        }
        let remove = song.querySelector('#remove')
        song.removeChild(remove)
    })
//歌单广场数据插入
let groundHead = document.querySelector('.groundHead')
let song1 = document.querySelector('.song1')
let songBlock1 = document.querySelector('.songBlock1')
let nowHead = document.querySelector('.nowHead')
//插入标签名
fetch('http://localhost:3000/playlist/hot').then(res => { return res.json(); })
    .then(data => {
        for (let i = 0; i < data.tags.length; i++) {
            let spans = document.createElement('span')
            spans.innerText = data.tags[i].name
            spans.className = 'spanss'
            groundHead.append(spans)
        }
    }).then(() => {
        let cats = document.querySelectorAll('.spanss')
        for (let i = 0; i < cats.length; i++) {
            cats[i].addEventListener('click', () => {
                append1(cats[i].innerText)
            })
        }
    })
let append1 = function (va) { //根据类型加载歌单
    fetch('http://localhost:3000/top/playlist?cat=' + va + '').then(res => {return res.json();}).then(data => {
        nowHead.innerText = '' + data.cat + '>' //现在的歌单类型
        let songBlock1 = document.querySelectorAll('.songBlock1')
        for (i = 0; i < data.playlists.length; i++) { //创建并插入所有歌单方块
            songBlock1[i].querySelector('.playCount').innerHTML = '<img src="./images/littleplay.png">' + parseInt(data.playlists[i].playCount * 0.0001) + '万'
            songBlock1[i].querySelector('.discribe').innerHTML = data.playlists[i].name
            songBlock1[i].querySelector('.cover').src = data.playlists[i].coverImgUrl
            songBlock1[i].id = data.playlists[i].id
        }
        let remove = song1.querySelector('#remove')
        song1.removeChild(remove)
    })
}
fetch('http://localhost:3000/top/playlist').then(res => { //默认类型加载歌单
    return res.json();
}).then(data => {
    nowHead.innerText = '' + data.cat + '>'
    for (i = 0; i < data.playlists.length; i++) {
        document.querySelector('.song1').appendChild(songBlock1.cloneNode(true))
        songBlock1.querySelector('.playCount').innerHTML = '<img src="./images/littleplay.png">' + parseInt(data.playlists[i].playCount * 0.0001) + '万'
        songBlock1.querySelector('.discribe').innerHTML = data.playlists[i].name
        songBlock1.querySelector('.cover').src = data.playlists[i].coverImgUrl
        songBlock1.id = data.playlists[i].id
    }
    let remove = song1.querySelector('#remove')
    song1.removeChild(remove)
})
//点击歌单方块跳转
let click = function () {
    let songBlocks = document.querySelectorAll('.songBlock')
    let songBlocks1 = document.querySelectorAll('.songBlock1')
    for (let i = 0; i < songBlocks.length; i++) {
        songBlocks[i].addEventListener('click', function () {
            localStorage.setItem('songListId', songBlocks[i].id)//存id入本地存储
            localStorage.setItem('NsongListId', songBlocks[i].id)//存id入本地存储
            window.location.href = 'songlist.html'
        })
    }
    for (let i = 0; i < songBlocks1.length; i++) {
        songBlocks1[i].addEventListener('click', function () {
            localStorage.setItem('songListId', songBlocks1[i].id)//存id入本地存储
            localStorage.setItem('NsongListId', songBlocks1[i].id)
            window.location.href = 'songlist.html'
        })
    }
}
setTimeout(click, 500)
//搜索
let search = document.querySelector('.search')
document.onkeydown = function (e) {
    let a = e || window.event;
    if (a.keyCode == 13) {
        localStorage.setItem('searchValue', search.value)
        window.location.href = 'search.html'
    }
}
//获取现在播放的歌曲信息，并插入底部播放方块
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
//获取歌曲信息
let get = function () {
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
setTimeout(get, 800)
let timer = setInterval(get, 1000)//一秒刷新一次
//拖动进度条
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
playSong.addEventListener('click', () => {
    get()
    if (audio.paused) {
        playBtns[2].src = '/images/play12.png'
        playBtns[2].addEventListener('mouseenter', function () {
            playBtns[2].src = '/images/play121.png'
        })
        playBtns[2].addEventListener('mouseleave', function () {
            playBtns[2].src = '/images/play12.png'
        })

        audio.play();//播放
    } else {
        playBtns[2].src = '/images/play1.png'
        playBtns[2].addEventListener('mouseenter', function () {
            playBtns[2].src = '/images/play21.png'
        })
        playBtns[2].addEventListener('mouseleave', function () {
            playBtns[2].src = '/images/play2.png'
        })
        audio.pause();//暂停
    }
})
//点击小图片打开详情
document.querySelector('.littleCover').addEventListener('click', () => {
    window.location.href ='play.html'
    audio.pause();
})
//音量调节
let volumBtn = document.querySelector('.volumBtn')
let volumL = document.querySelector('.l')
let volumD = document.querySelector('.d')
let count8 = 0;
volumBtn.addEventListener('click', function () {
    count8++;
    if (count8 % 2 != 0) {
        document.querySelector('.volum').style.display = 'block'
    } else {
        document.querySelector('.volum').style.display = 'none'
    }
})
volumL.addEventListener('click', () => {
    let Fpos = volumL.getBoundingClientRect().bottom
    let Spos = event.clientY
    let persentage = (Fpos - Spos) / 100
    console.log(persentage);
    volumD.style.marginTop = '' + -(7 + (persentage * 100)) + 'px'
    audio.volume = persentage
})
//热搜
let hotSearch = document.querySelector('.hotSearch')
let searchs = document.querySelectorAll('.hotSearch div')
for (let i = 0; i < 20; i++) {
    searchs[i].addEventListener('mouseenter', function () {
        searchs[i].style.backgroundColor = 'rgb(242, 242, 242)'
    })
    searchs[i].addEventListener('mouseleave', function () {
        searchs[i].style.backgroundColor = '#fff'
    })
}
fetch('http://localhost:3000/search/hot/detail')
    .then(res => { return res.json() }).then(data => {
        for (let i = 0; i < 20; i++) {
            searchs[i].querySelector('.hotName').innerText = data.data[i].searchWord
            searchs[i].querySelector('.hotNum').innerText = data.data[i].score
            if (data.data[i].content != '') {
                searchs[i].querySelector('.detile').innerText = data.data[i].content
            }
            if (data.data[i].iconUrl != null) {
                searchs[i].querySelector('img').src = data.data[i].iconUrl
                searchs[i].querySelector('img').style.height = '20px'
            }
            searchs[i].addEventListener('click', function () {
                localStorage.setItem('searchValue', data.data[i].searchWord)
                window.location.href = 'search.html'
            })
        }
    })

document.querySelector('.search').onblur = function () {
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
    document.querySelector('.hotSearch').style.display = 'block'
    document.onkeydown = function (e) {
        let a = e || window.event;
        if (a.keyCode == 13) {
            if (search.value !== '') {
                localStorage.setItem('searchValue', search.value)
                window.location.href = 'search.html'
            } else {
                localStorage.setItem('searchValue', localStorage.realkeyword)
                window.location.href = 'search.html'
            }
        }
    }
}
//主页 歌单广场切换
let one = document.querySelector('.one')
let two = document.querySelector('.two')
one.addEventListener('click', () => {
    document.querySelector('.banner').style.display = 'block'
    document.querySelector('.main').style.display = 'block'
    document.querySelector('.ground').style.display = 'none'
    one.className = 'switchAfter'
    two.className = 'switchBefore'
})
two.addEventListener('click', () => {
    document.querySelector('.banner').style.display = 'none'
    document.querySelector('.main').style.display = 'none'
    document.querySelector('.ground').style.display = 'block'
    one.className = 'switchBefore'
    two.className = 'switchAfter'
})
//上一首下一首
let getLittle = function () {
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
let preSong = document.querySelector('.preSong')
let nextSong = document.querySelector('.nextSong')
let temp3 = 0
let preId = 0
let nextId = 0
let idArr = []
let fn = function () {
    idArr = localStorage.songIdList.split(',')
    temp3 = 0
    for (let i = 0; i < idArr.length; i++) {
        temp3++
        if (idArr[i] === localStorage.songId) {
            if (temp3 == 1) {  //处于第一首
                preId = idArr[idArr.length - 1]
                nextId = idArr[1]
            } else if (temp3 == idArr.length) { //最后一首
                preId = idArr[idArr.length - 2]
                nextId = idArr[0]
            } else {
                preId = idArr[temp3 - 2]
                nextId = idArr[temp3]
            }
        }
    }
}
let recolor = function(){ //点击上一首下一首后，当前播放列表正在播放的歌曲字体颜色变红
    for(let i = 0;i<document.querySelectorAll('.NlistItem').length;i++){
        document.querySelectorAll('.NlistItem')[i].style.color = ''
        if(document.querySelectorAll('.NlistItem')[i].id == localStorage.songId){
            document.querySelectorAll('.NlistItem')[i].style.color = 'red'
        }
    }
}
preSong.addEventListener('click', () => {
    fn()
    localStorage.setItem('songId', preId)
    getLittle()
    recolor()
})
nextSong.addEventListener('click', () => {
    fn()
    localStorage.setItem('songId', nextId)
    getLittle()
    recolor()
})
