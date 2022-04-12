let quite = document.querySelector('.quite')
let logchoice = document.querySelector('.logchoice')
let icons = document.querySelectorAll('.icons')
let readchoice = document.querySelector('.readchoice')
let logInBlock = document.querySelector('.logInBlock')
let triangle = document.querySelector('.triangle')
let userName = document.querySelector('.userName')
let header = document.querySelector('.header')
let phone = document.querySelector('.phone')
let password = document.querySelector('.password')
let logIn = document.querySelector('.logIn')
let userListItem = document.querySelector('.userListItem')
let userCollectItem = document.querySelector('.userCollectItem')
let iLike = document.querySelector('.iLike')
let logOut = document.querySelector('.logOut')
let song = document.querySelector('.song')
let list1 = document.querySelector('.list1')
let list2 = document.querySelector('.list2')
//登录小方块的交互
quite.addEventListener('click', function () {
    logInBlock.style.display = 'none'
})
userName.addEventListener('click', function () {
    logInBlock.style.display = 'block'
})
triangle.addEventListener('click', function () {
    logInBlock.style.display = 'block'
})
header.addEventListener('click', function () {
    logInBlock.style.display = 'block'
})
//右上角退出×
quite.addEventListener('mouseenter', function () {
    quite.src = "./images/quite2.png"
})
quite.addEventListener('mouseleave', function () {
    quite.src = "./images/quite1.png"
})

//自动登录按钮
let count4 = 0;
logchoice.addEventListener('click', function () {
    count4++;
    if (count4 % 2 != 0) {
        logchoice.src = "./images/logchoice1.png"
    } else {
        logchoice.src = "./images/logchoice.png"
    }
})
//其他平台登录图标
for (let i = 0; i < 4; i++) {
    icons[i].addEventListener('mouseenter', function () {
        icons[i].src = './images/icons_' + i + '0.png'
    })
    icons[i].addEventListener('mouseleave', function () {
        icons[i].src = './images/icons_' + i + '.png'
    })
}
//是否阅读须知
let count5 = 0;
readchoice.addEventListener('click', function () {
    count5++;
    if (count5 % 2 != 0) {
        readchoice.src = "./images/readchoice1.png"
    } else {
        readchoice.src = "./images/readchoice.png"
    }
})
iLike.addEventListener('click', () => { //我喜欢的歌单 点击事件
    localStorage.setItem('songListId', iLike.id)
    window.location.href = 'songList.html'
})
let user = {}
logIn.addEventListener('click', function () { //点击登录按钮事件
    logInF()
    setTimeout(logInBlock.style.display = 'none', 500)
    logOutF()
})
let logInF = function () { //登录，获取用户信息
    fetch('http://localhost:3000/login/cellphone?phone=' + phone.value + '&password=' + password.value + '', {
        method: 'POST',
        header: {
            'Content-Type': 'application/xxx-www-form-unlencoded',
        }
    }).then((res) => { return res.json(); }).then(data => {
        if (data.code == 200) { //录入头像、昵称
            sessionStorage.setItem('cookie', data.cookie)
            sessionStorage.setItem('userId', data.profile.userId)
            user.id = data.profile.userId
            user.nickname = data.profile.nickname
            user.avatarUrl = data.profile.avatarUrl
            header.src = user.avatarUrl
            userName.innerText = user.nickname
        } if (data.code !== 200) { //登录失败，返回信息
            alert('' + data.message + '')
        }
    }).then(() => {
        GetUserList(user.id) //登陆成功后插入侧边栏的用户歌单
    })
}
//录入用户的歌单信息
let userList = []
let userSelfList = []
let userCollectList = []
let GetUserList = function (va) {
    fetch('http://localhost:3000/user/playlist?uid=' + va + '')
        .then(res => { return res.json() }).then(data => {
            for (i = 0; i < data.playlist.length; i++) { //数组userList录入用户的歌单信息
                let songList = {}
                songList.coverImgUrl = data.playlist[i].coverImgUrl
                songList.id = data.playlist[i].id
                songList.tags = data.playlist[i].tags
                songList.creator = data.playlist[i].creator
                songList.name = data.playlist[i].name
                songList.userId = data.playlist[i].userId
                songList.creator = data.playlist[i].creator.userId
                userList[i] = songList
            }
            for (let i = 0; i < userList.length; i++) { //歌单分类：或收藏
                if (userList[i].creator == user.id) {//自创
                    userSelfList.push(userList[i])
                } else { //收藏
                    userCollectList.push(userList[i])
                }
            }
            iLike.id = '' + userSelfList[0].id + ''
            sessionStorage.setItem('iLike', userSelfList[0].id)
            for (let i = 0; i < userSelfList.length; i++) { //插入相应数量的歌单方块，写入歌单名字、歌单id
                if (i != 0) { //除去第一个，第一个为我喜欢的歌单
                    document.querySelector('.list1').appendChild(userListItem.cloneNode(true))
                    if (userSelfList[i].name.length > 8) {
                        userListItem.querySelector('.listname').innerText = userSelfList[i].name.substr(0, 8) + "..."
                    } else {
                        userListItem.querySelector('.listname').innerText = '' + userSelfList[i].name + ''
                    }
                    userListItem.id = '' + userSelfList[i].id + ''
                }
            }
            for (let i = 0; i < userCollectList.length; i++) {
                document.querySelector('.list2').appendChild(userCollectItem.cloneNode(true))
                if (userCollectList[i].name.length > 8) {
                    userCollectItem.querySelector('.listname').innerText = userCollectList[i].name.substr(0, 8) + "..."
                } else {
                    userCollectItem.querySelector('.listname').innerText = '' + userCollectList[i].name + ''
                }
                userCollectItem.id = '' + userCollectList[i].id + ''
            }
            let remove1 = document.querySelector('.list1').querySelector('#remove') //bug修正，详见readme
            let remove2 = document.querySelector('.list2').querySelector('#remove')
            document.querySelector('.list1').removeChild(remove1)
            document.querySelector('.list2').removeChild(remove2)
        })
}
let clickSideBar = function () { //点击侧边栏的歌单打开歌单详情页
    let userListItem = document.querySelectorAll('.userListItem')
    for (let i = 0; i < userListItem.length; i++) {
        userListItem[i].addEventListener('click', () => {
            localStorage.setItem('songListId', userListItem[i].id)
            window.location.href = 'songList.html'
        })
    }
    let userCollectItem = document.querySelectorAll('.userCollectItem')
    for (let i = 0; i < userCollectItem.length; i++) {
        userCollectItem[i].addEventListener('click', () => {
            localStorage.setItem('songListId', userCollectItem[i].id)
            window.location.href = 'songList.html'
        })
    }
}
let count6 = 1
document.querySelector('.thr1').addEventListener('click', function () { //展开或收起侧边栏歌单
    count6++
    if (count6 % 2 == 0) {
        list1.style.display = 'block'
        document.querySelector('.zhankai1').src = './images/zhankai1.png'
    } else {
        list1.style.display = 'none'
        document.querySelector('.zhankai1').src = './images/zhankai.png'
    }
    if (count6 == 2) {
        clickSideBar()
    }
})
let count7 = 1
document.querySelector('.thr2').addEventListener('click', function () { //展开或收起侧边栏歌单
    count7++
    if (count7 % 2 == 0) {
        list2.style.display = 'block'
        document.querySelector('.zhankai2').src = './images/zhankai1.png'
    } else {
        list2.style.display = 'none'
        document.querySelector('.zhankai2').src = './images/zhankai.png'
    }
})

//点击底部播放小专辑封面、歌名打开播放页
document.querySelector('.littleCover').addEventListener('click', () => {
    window.location.href = 'play.html'
    audio.pause();
})
document.querySelector('.playTitle').addEventListener('click', () => {
    window.location.href = 'play.html'
    audio.pause();
})
//登录状态保持
fetch('http://localhost:3000/user/detail?uid=' + sessionStorage.userId + '', {
}).then((res) => { return res.json(); }).then(data => {
    //console.log(data);
    user.id = data.profile.userId
    user.nickname = data.profile.nickname
    user.avatarUrl = data.profile.avatarUrl
    header.src = user.avatarUrl
    userName.innerText = user.nickname
    GetUserList(sessionStorage.userId)
})
let logOutF = function(){
    if (sessionStorage.userId == undefined) {
        //登录板块展示或隐藏
        quite.romoveEventListener('click', function () {
            logInBlock.style.display = 'none'
        })
        userName.removeEventListener('click', function () {
            logInBlock.style.display = 'block'
        })
        triangle.removeEventListener('click', function () {
            logInBlock.style.display = 'block'
        })
        header.removeEventListener('click', function () {
            logInBlock.style.display = 'block'
        })
    } else {
        let count10 = 1
        userName.addEventListener('click', function () { //展开或收起侧边栏歌单
            count10++
            if (count10 % 2 == 0) {
                logOut.style.display = 'block'
            } else {
                logOut.style.display = 'none'
            }
        })
    }
    logOut.addEventListener('click',function(){
        sessionStorage.clear('userId')
        location.reload()
    })
}
