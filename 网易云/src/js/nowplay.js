let NlistItem = document.querySelector('.NlistItem')
let NlistItem1 = document.querySelector('.NlistItem1')
let nowPlayList = document.querySelector('.nowPlayList')
let clearNowPlay = document.querySelector('.clearNowPlay')
let nowBtn = document.querySelector('.nowBtn')
let topBtn1 = document.querySelector('.topBtn1')
let topBtn2 = document.querySelector('.topBtn2')
let nowFn = function () { //获取现在播放的歌单
    fetch('http://localhost:3000/song/detail?ids=' + localStorage.songIdList + '')
        .then(res => { return res.json() }).then(data => {
            data.songs.push(data.songs[1])
            data.songs.push(data.songs[0]) //bug修正,详见readme
            data.songs.shift(data.songs[1])
            data.songs.shift(data.songs[0])
            document.querySelector('.nowPlayTotal').innerText = '总' + data.songs.length + '首'
            for (let i = 0; i < data.songs.length; i++) {
                if (i % 2 == 0) { //交替插入底色为灰、白的两种方块，用%2==0判断，这里是插入灰色的
                    nowPlayList.append(NlistItem.cloneNode(true))
                    if (data.songs[i].name.length > 15) { //内容过长变点
                        NlistItem.querySelector('.Ntitle').innerText = '' + data.songs[i].name.substr(0, 15) + '...'
                    } else {
                        NlistItem.querySelector('.Ntitle').innerText = '' + data.songs[i].name + ''
                    }
                    if (data.songs[i].ar[0].name.length > 10) {
                        NlistItem.querySelector('.Nsinger').innerText = '' + data.songs[i].ar[0].name.substr(0, 10) + '...'
                    } else {
                        NlistItem.querySelector('.Nsinger').innerText = '' + data.songs[i].ar[0].name + ''
                    }
                    let m = parseInt(data.songs[i].dt / 60000)
                    let s = parseInt(data.songs[i].dt % 60)
                    NlistItem.querySelector('.Ntime').innerText = '' + m + ':' + s + ''
                    NlistItem.id = data.songs[i].id
                    if (localStorage.songId == NlistItem1.id) { //当前播放的为红色
                        NlistItem.style.color = 'red'
                    }
                } else { //同上，这里是插入白色的方块
                    nowPlayList.append(NlistItem1.cloneNode(true))
                    if (data.songs[i].name.length > 15) {
                        NlistItem1.querySelector('.Ntitle').innerText = '' + data.songs[i].name.substr(0, 15) + '...'
                    } else {
                        NlistItem1.querySelector('.Ntitle').innerText = '' + data.songs[i].name + ''
                    }
                    if (data.songs[i].ar[0].name.length > 10) {
                        NlistItem1.querySelector('.Nsinger').innerText = '' + data.songs[i].ar[0].name.substr(0, 10) + '...'
                    } else {
                        NlistItem1.querySelector('.Nsinger').innerText = '' + data.songs[i].ar[0].name + ''
                    }
                    let m = parseInt(data.songs[i].dt / 60000)
                    let s = parseInt(data.songs[i].dt % 60)
                    NlistItem1.querySelector('.Ntime').innerText = '' + m + ':' + s + ''
                    NlistItem1.id = data.songs[i].id

                }
            }
            let remove2 = nowPlayList.children[5] //bug修正，详见readme
            let remove3 = nowPlayList.children[6]
            nowPlayList.removeChild(remove2)
            nowPlayList.removeChild(remove3)
            document.querySelectorAll('.NlistItem').forEach((element) => { //给每个方块添加点击后播放的事件
                element.addEventListener('click', () => {
                    localStorage.setItem('songId', element.id)
                    getLittle2() //更新底部播放方块的信息
                    for (let i = 0; i < document.querySelectorAll('.NlistItem').length; i++) { //排他思想给特定方块标红
                        //console.log(1);
                        document.querySelectorAll('.NlistItem')[i].style.color = ''
                    }
                    element.style.color = 'red'
                })
            })
        })
}
nowFn()
let getLittle2 = function () {//更新底部播放方块的信息
    fetch('http://localhost:3000/song/url?id=' + localStorage.songId + '') //获取url
        .then(res => { return res.json() }).then(data => {
            audio.src = data.data[0].url
        })
    fetch('http://localhost:3000/song/detail?ids=' + localStorage.songId + '')//获取专辑等信息
        .then(res => { return res.json() }).then(data => {
            document.querySelector('.playTitle').innerText = data.songs[0].name
            document.querySelector('.littleCover').src = data.songs[0].al.picUrl
            document.querySelector('.playSinger').innerText = '' + data.songs[0].ar[0].name + ' / ' + data.songs[0].al.name + ''
        })
}
let count33 = 0;
nowBtn.addEventListener('click', function () { //点击页面最右下角的按钮展示该方块
    count33++;
    if (count33 % 2 != 0) {
        nowPlayList.style.display = 'block'
    } else {
        nowPlayList.style.display = 'none'
    }
})

topBtn1.addEventListener('click', function () {
    window.history.back() 
})
topBtn2.addEventListener('click', function () {
    window.history.forward() 
})
