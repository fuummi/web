let windowWidth = document.body.clientWidth
let listItem = document.querySelector('.listItem')
let listItem1 = document.querySelector('.listItem1')
let listHeader = document.querySelector('.listHeader')
let change = document.querySelector('.change')
let list = document.querySelector('.list')
let audio = document.querySelector('audio')
let Pdot = document.querySelector('.Pdot')
let running = document.querySelector('.running')
let playSong = document.querySelector('.playSong ')
let comments = document.querySelector('.comments')
let comment = document.querySelector('.comment')
let runningGrey = document.querySelector('.runningGrey')
listHeader.style.width = '' + windowWidth - 300 + 'px'
listItem.style.width = '' + windowWidth - 300 + 'px'
//change.style.width = '' + windowWidth - 300 + 'px'
//用户喜欢的歌单
if (sessionStorage.iLike == localStorage.songListId) {
    fetch('http://localhost:3000/playlist/detail?id=' + sessionStorage.iLike + '&cookie=' + sessionStorage.cookie + '', {
    }).then((res) => { return res.json(); }).then(data => {
        document.title = data.playlist.name
        document.querySelector('.songCover').src = '' + data.playlist.coverImgUrl + ''
        document.querySelector('.listName').innerHTML = '<img src="./images/songlisticon.png">' + data.playlist.name + ''
        document.querySelector('.creatorAvatar').src = '' + data.playlist.creator.avatarUrl + ''
        document.querySelector('.creator').innerText = '' + data.playlist.creator.nickname + ''
        document.querySelector('.btn1').innerHTML = '<img src="./images/collecticon.png"> 收藏(' + data.playlist.subscribedCount + ')'
        document.querySelector('.tag').innerHTML = '标签:' + data.playlist.tags + ''
        document.querySelector('.count').innerHTML = '歌曲:' + data.playlist.trackCount + ' 播放:' + data.playlist.playCount + ''
        document.querySelector('.state').innerText = '简介:' + data.playlist.description + ''
        if (data.playlist.description.length > 30) { //简介过长变点
            document.querySelector('.state').innerText = '简介:' + data.playlist.description.substr(0, 30) + '...'
        } else {
            document.querySelector('.state').innerText = '简介:' + data.playlist.description + ''
        }
    })
    fetch('http://localhost:3000/likelist?uid=' + sessionStorage.userId + '&cookie=' + sessionStorage.cookie + '', {
    }).then((res) => { return res.json(); }).then(data => {
        fetch('http://localhost:3000/song/detail?ids=' + data.ids.join(",") + '')
            .then(res => { return res.json() }).then(data => {
                for (let i = 0; i < data.songs.length; i++) {
                    songIdList.push(data.songs[i].id)//录入歌单中歌曲的id
                }
                localStorage.setItem('songIdList', songIdList)//存歌单歌曲id入本地
                list.style.height = '' + data.songs.length * 50 + 'px'
                data.songs.push(data.songs[1])
                data.songs.push(data.songs[0])//修正
                data.songs.shift(data.songs[1])
                data.songs.shift(data.songs[0])
                for (let i = 0; i < data.songs.length; i++) {
                    songIdList.push(data.songs[i].id)//给每个歌曲方块录入id
                    if (i % 2 == 0) {
                        document.querySelector('.list').append(listItem.cloneNode(true))
                        listItem.id = i
                        //判断是否有并插入详细描述
                        if (data.songs[i].tns != undefined) {
                            listItem.querySelector('.title').innerText = '' + data.songs[i].name + ' (' + data.songs[i].tns + ')'
                        } else {
                            listItem.querySelector('.title').innerText = '' + data.songs[i].name + ''
                        }
                        //歌手名字专辑名字过长变...
                        if (data.songs[i].ar[0].name.length > 15) {
                            listItem.querySelector('.singer').innerText = '' + data.songs[i].ar[0].name.substr(0, 15) + '...'
                        } else {
                            listItem.querySelector('.singer').innerText = '' + data.songs[i].ar[0].name + ''
                        }
                        if (data.songs[i].al.name.length > 30) {
                            listItem.querySelector('.album').innerText = '' + data.songs[i].al.name.substr(0, 30) + '...'
                        } else {
                            listItem.querySelector('.album').innerText = '' + data.songs[i].al.name + ''
                        }
                        listItem.id = data.songs[i].id
                        let m = parseInt(data.songs[i].dt / 60000)//歌曲的时间
                        let s = parseInt(data.songs[i].dt % 60)
                        listItem.querySelector('.time').innerText = '' + m + ':' + s + ''
                    } else { //同上，这里插入底色为白色的方块
                        document.querySelector('.list').append(listItem1.cloneNode(true))
                        listItem1.id = i
                        if (data.songs[i].tns != undefined) {
                            listItem1.querySelector('.title').innerText = '' + data.songs[i].name + ' (' + data.songs[i].tns + ')'
                        } else {
                            listItem1.querySelector('.title').innerText = '' + data.songs[i].name + ''
                        }
                        if (data.songs[i].ar[0].name.length > 10) {
                            listItem1.querySelector('.singer').innerText = '' + data.songs[i].ar[0].name.substr(0, 10) + '...'
                        } else {
                            listItem1.querySelector('.singer').innerText = '' + data.songs[i].ar[0].name + ''
                        }
                        if (data.songs[i].al.name.length > 20) {
                            listItem1.querySelector('.album').innerText = '' + data.songs[i].al.name.substr(0, 20) + '...'
                        } else {
                            listItem1.querySelector('.album').innerText = '' + data.songs[i].al.name + ''
                        }
                        listItem1.id = data.songs[i].id
                        let m = parseInt(data.songs[i].dt / 60000)
                        let s = parseInt(data.songs[i].dt % 60)
                        listItem1.querySelector('.time').innerText = '' + m + ':' + s + ''
                    }
                }
                let remove = list.querySelectorAll('#remove')
                for (let i = 0; i < remove.length; i++) {
                    list.removeChild(remove[i])
                }
            })
    })
}
let songIdList = []
let load = function (id) {
    //页面顶部歌单信息插入
    fetch('http://localhost:3000/playlist/detail?id=' + id + '')
        .then(res => { return res.json() }).then(data => {
            console.log(data);
            document.title = data.playlist.name
            let time = new Date(data.playlist.createTime);
            document.querySelector('.date').innerText = ' '+time.getFullYear()+'-'+time.getMonth()+'-'+time.getDate()+'创建'
            document.querySelector('.songCover').src = '' + data.playlist.coverImgUrl + ''
            document.querySelector('.listName').innerHTML = '<img src="./images/songlisticon.png">' + data.playlist.name + ''
            document.querySelector('.creatorAvatar').src = '' + data.playlist.creator.avatarUrl + ''
            document.querySelector('.creator').innerText = '' + data.playlist.creator.nickname + ' '
            document.querySelector('.btn1').innerHTML = '<img src="./images/collecticon.png"> 收藏(' + data.playlist.subscribedCount + ')'
            document.querySelector('.tag').innerHTML = '标签:' + data.playlist.tags + ''
            document.querySelector('.count').innerHTML = '歌曲:' + data.playlist.trackCount + ' 播放:' + data.playlist.playCount + ''
            document.querySelector('.state').innerText = '简介:' + data.playlist.description + ''
            document.querySelector('.commentSwitch').innerText = '评论('+data.playlist.commentCount+')'
            if (data.playlist.description.length > 30) { //简介过长变点
                document.querySelector('.state').innerText = '简介:' + data.playlist.description.substr(0, 30) + '...'
            } else {
                document.querySelector('.state').innerText = '简介:' + data.playlist.description + ''
            }
        })
    //歌单所有歌曲信息
    fetch('http://localhost:3000/playlist/track/all?id=' + id + '')
        .then(res => { return res.json() }).then(data => {
            for (let i = 0; i < data.songs.length; i++) {
                songIdList.push(data.songs[i].id)//录入歌单中歌曲的id
            }
            localStorage.setItem('songIdList', songIdList)//存歌单歌曲id入本地
            list.style.height = '' + data.songs.length * 50 + 'px'
            data.songs.push(data.songs[1])
            data.songs.push(data.songs[0])//修正
            data.songs.shift(data.songs[1])
            data.songs.shift(data.songs[0])
            for (let i = 0; i < data.songs.length; i++) {
                songIdList.push(data.songs[i].id)//给每个歌曲方块录入id
                if (i % 2 == 0) {
                    document.querySelector('.list').append(listItem.cloneNode(true))
                    listItem.id = i
                    //判断是否有并插入详细描述
                    if (data.songs[i].tns != undefined) {
                        listItem.querySelector('.title').innerText = '' + data.songs[i].name + ' (' + data.songs[i].tns + ')'
                    } else {
                        listItem.querySelector('.title').innerText = '' + data.songs[i].name + ''
                    }
                    //歌手名字专辑名字过长变...
                    if (data.songs[i].ar[0].name.length > 15) {
                        listItem.querySelector('.singer').innerText = '' + data.songs[i].ar[0].name.substr(0, 15) + '...'
                    } else {
                        listItem.querySelector('.singer').innerText = '' + data.songs[i].ar[0].name + ''
                    }
                    if (data.songs[i].al.name.length > 30) {
                        listItem.querySelector('.album').innerText = '' + data.songs[i].al.name.substr(0, 30) + '...'
                    } else {
                        listItem.querySelector('.album').innerText = '' + data.songs[i].al.name + ''
                    }
                    listItem.id = data.songs[i].id
                    let m = parseInt(data.songs[i].dt / 60000)//歌曲的时间
                    let s = parseInt(data.songs[i].dt % 60)
                    listItem.querySelector('.time').innerText = '' + m + ':' + s + ''
                } else { //同上，这里插入底色为白色的方块
                    document.querySelector('.list').append(listItem1.cloneNode(true))
                    listItem1.id = i
                    if (data.songs[i].tns != undefined) {
                        listItem1.querySelector('.title').innerText = '' + data.songs[i].name + ' (' + data.songs[i].tns + ')'
                    } else {
                        listItem1.querySelector('.title').innerText = '' + data.songs[i].name + ''
                    }
                    if (data.songs[i].ar[0].name.length > 10) {
                        listItem1.querySelector('.singer').innerText = '' + data.songs[i].ar[0].name.substr(0, 10) + '...'
                    } else {
                        listItem1.querySelector('.singer').innerText = '' + data.songs[i].ar[0].name + ''
                    }
                    if (data.songs[i].al.name.length > 20) {
                        listItem1.querySelector('.album').innerText = '' + data.songs[i].al.name.substr(0, 20) + '...'
                    } else {
                        listItem1.querySelector('.album').innerText = '' + data.songs[i].al.name + ''
                    }
                    listItem1.id = data.songs[i].id
                    let m = parseInt(data.songs[i].dt / 60000)
                    let s = parseInt(data.songs[i].dt % 60)
                    listItem1.querySelector('.time').innerText = '' + m + ':' + s + ''
                }
            }
            let remove = list.querySelectorAll('#remove')
            for (let i = 0; i < remove.length; i++) {
                list.removeChild(remove[i])
            }
        })
}
load(localStorage.songListId)
//插入歌单序号,id
let numF = function () {
    if (document.querySelector('.list').children.length !== 2) { //插入完成后
        //插入序号
        for (let i = 1; i < document.querySelector('.list').children.length + 1; i++) {
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
        clearInterval(numTimer)
    }
}//在这之前一直检查是否插入完毕
let numTimer = setInterval(numF, 100)
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
getLittle()
//控制播放
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
let playBtns = document.querySelectorAll('.btns img')
playSong.addEventListener('click', () => { //中间的三角按钮
    get()
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
//评论
let commentF = function () {
    fetch('http://localhost:3000/comment/playlist?id=' + localStorage.songListId + '')
        .then(res => { return res.json() }).then(data => {
            //热评
            for (let i = 0; i < data.hotComments.length; i++) {
                document.querySelector('.comment').append(comments.cloneNode(true))
                comment.querySelector('.Chead').src = '' + data.hotComments[i].user.avatarUrl + ''
                comment.querySelector('.Cinner a').innerText = '' + data.hotComments[i].user.nickname + ''
                comment.querySelector('.inner').innerText = ':' + data.hotComments[i].content + ''
                comment.querySelector('.Ctime').innerText = '' + data.hotComments[i].timeStr + ''
                comment.querySelector('.CCright span').innerText = '' + data.hotComments[i].likedCount + ''
            }
            let moreComment = document.createElement("img")
            moreComment.src = "./images/morecomment.png"
            moreComment.style.marginLeft = '30%'
            moreComment.style.cursor = 'pointer'
            comment.appendChild(moreComment)
            let cNum1 = document.querySelector(".cNum")
            cNum1.innerText = '全部评论(' + data.total + ')'
            comment.append(cNum1.cloneNode(true))
            //普通评论
            for (let i = 0; i < data.comments.length; i++) {
                document.querySelector('.comment').append(comments.cloneNode(true))
                comment.querySelector('.Chead').src = '' + data.comments[i].user.avatarUrl + ''
                comment.querySelector('.Cinner a').innerText = '' + data.comments[i].user.nickname + ''
                comment.querySelector('.inner').innerText = ':' + data.comments[i].content + ''
                comment.querySelector('.Ctime').innerText = '' + data.comments[i].timeStr + ''
                comment.querySelector('.CCright span').innerText = '' + data.comments[i].likedCount + ''
            }
            //完全没修好的bug
            let remove2 = comment.children[1]
            let remove3 = comment.children[2]
            comment.appendChild(remove2)
            comment.removeChild(remove3)
            let temp = data.hotComments.length + 2
            let remove1 = comment.children[temp]
            comment.removeChild(remove1)
            comment.children[temp]
        })
}
commentF()
let listSwitch = document.querySelector('.listSwitch')
let commentSwitch = document.querySelector('.commentSwitch')
let top1 = document.querySelector('.top1')

//歌单评论切换
listSwitch.addEventListener('click', () => {
    top1.style.display = 'block'
    comment.style.display = 'none'
    listSwitch.className = 'switchAfter listSwitch'
    commentSwitch.className = 'switchBefore commentSwitch'
})

commentSwitch.addEventListener('click', () => {
    top1.style.display = 'none'
    comment.style.display = 'block'
    listSwitch.className = 'switchBefore listSwitch'
    commentSwitch.className = 'switchAfter commentSwitch'
})
//热搜
let hotSearch = document.querySelector('.hotSearch')
let searchs = document.querySelectorAll('.hotSearch div')

for (let i = 0; i < 20; i++) { //热搜方块鼠标移入样式改变
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
let search = document.querySelector('.search')
search.onfocus = function () {
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
//上一首下一首
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
let recolor = function () {
    for (let i = 0; i < document.querySelectorAll('.NlistItem').length; i++) {
        document.querySelectorAll('.NlistItem')[i].style.color = ''
        if (document.querySelectorAll('.NlistItem')[i].id == localStorage.songId) {
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
let ccc = 0
//播放全部按钮
document.querySelector('.playAll').addEventListener('click', () => {
    alert('播放全部会替换当前的播放列表,是否继续?')
    fetch('http://localhost:3000/playlist/track/all?id=' + localStorage.NsongListId + '')//重新加载新歌单的信息
        .then(res => { return res.json() }).then(data => {
            for (let i = 0; i < data.songs.length; i++) {
                songIdList.push(data.songs[i].id)//存下歌单中所有歌曲的id
            }
            localStorage.setItem('songIdList', songIdList)//存歌单歌曲id入本地
        })
    fn()
    localStorage.setItem('songId', idArr[0])
    getLittle() //刷新底部播放板块的歌曲信息
    localStorage.setItem('songListId', localStorage.songListId)
    localStorage.setItem('NsongListId', localStorage.songListId)
    nowFn() //重新获取现在播放的歌曲列表
    location.reload() //这个bug实在找不出来了，直接暴力刷新
})