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

/***/ "./src/js/test.js":
/*!************************!*\
  !*** ./src/js/test.js ***!
  \************************/
/***/ (() => {

eval("let banner = document.querySelectorAll('.ban')\r\nlet songBlock = document.querySelector('.songBlock')\r\nlet box = document.getElementById(\"000\")\r\nlet discribe = document.querySelector('.discribe')\r\nlet audio = document.querySelector('audio')\r\nlet Pdot = document.querySelector('.Pdot')\r\nlet running = document.querySelector('.running')\r\nlet playSong = document.querySelector('.playSong ')\r\nlet runningGrey = document.querySelector('.runningGrey')\r\nlet song = document.querySelector('.song')\r\n//轮播图图片\r\nfetch('http://localhost:3000/banner')\r\n    .then(res => {\r\n        return res.json();\r\n    }).then(data => {\r\n        for (i = 0; i < data.banners.length; i++) {\r\n            banner[i].src = data.banners[i].imageUrl;\r\n        }\r\n    })\r\n//推荐歌单数据插入\r\nfetch('http://localhost:3000/personalized?limit=10')\r\n    .then(res => {\r\n        return res.json();\r\n    }).then(data => {\r\n        data.result.push(data.result[0])\r\n        data.result.shift(data.result[0])\r\n        for (i = 0; i < 10; i++) {\r\n            document.querySelector('.song').appendChild(songBlock.cloneNode(true))\r\n            songBlock.querySelector('.playCount').innerHTML = '<img src=\"./images/littleplay.png\">' + parseInt(data.result[i].playCount * 0.0001) + '万'\r\n            songBlock.querySelector('.discribe').innerHTML = data.result[i].name\r\n            songBlock.querySelector('.cover').src = data.result[i].picUrl\r\n            songBlock.id = data.result[i].id\r\n            songBlock.setAttribute('temp', '01')\r\n        }\r\n        let remove = song.querySelector('#remove')\r\n        song.removeChild(remove)\r\n    })\r\n//歌单广场数据插入\r\nlet groundHead = document.querySelector('.groundHead')\r\nlet song1 = document.querySelector('.song1')\r\nlet songBlock1 = document.querySelector('.songBlock1')\r\nlet nowHead = document.querySelector('.nowHead')\r\n//插入标签名\r\nfetch('http://localhost:3000/playlist/hot').then(res => { return res.json(); })\r\n    .then(data => {\r\n        for (let i = 0; i < data.tags.length; i++) {\r\n            let spans = document.createElement('span')\r\n            spans.innerText = data.tags[i].name\r\n            spans.className = 'spanss'\r\n            groundHead.append(spans)\r\n        }\r\n    }).then(() => {\r\n        let cats = document.querySelectorAll('.spanss')\r\n        for (let i = 0; i < cats.length; i++) {\r\n            cats[i].addEventListener('click', () => {\r\n                append1(cats[i].innerText)\r\n            })\r\n        }\r\n    })\r\nlet append1 = function (va) { //根据类型加载歌单\r\n    fetch('http://localhost:3000/top/playlist?cat=' + va + '').then(res => {return res.json();}).then(data => {\r\n        nowHead.innerText = '' + data.cat + '>' //现在的歌单类型\r\n        let songBlock1 = document.querySelectorAll('.songBlock1')\r\n        for (i = 0; i < data.playlists.length; i++) { //创建并插入所有歌单方块\r\n            songBlock1[i].querySelector('.playCount').innerHTML = '<img src=\"./images/littleplay.png\">' + parseInt(data.playlists[i].playCount * 0.0001) + '万'\r\n            songBlock1[i].querySelector('.discribe').innerHTML = data.playlists[i].name\r\n            songBlock1[i].querySelector('.cover').src = data.playlists[i].coverImgUrl\r\n            songBlock1[i].id = data.playlists[i].id\r\n        }\r\n        let remove = song1.querySelector('#remove')\r\n        song1.removeChild(remove)\r\n    })\r\n}\r\nfetch('http://localhost:3000/top/playlist').then(res => { //默认类型加载歌单\r\n    return res.json();\r\n}).then(data => {\r\n    nowHead.innerText = '' + data.cat + '>'\r\n    for (i = 0; i < data.playlists.length; i++) {\r\n        document.querySelector('.song1').appendChild(songBlock1.cloneNode(true))\r\n        songBlock1.querySelector('.playCount').innerHTML = '<img src=\"./images/littleplay.png\">' + parseInt(data.playlists[i].playCount * 0.0001) + '万'\r\n        songBlock1.querySelector('.discribe').innerHTML = data.playlists[i].name\r\n        songBlock1.querySelector('.cover').src = data.playlists[i].coverImgUrl\r\n        songBlock1.id = data.playlists[i].id\r\n    }\r\n    let remove = song1.querySelector('#remove')\r\n    song1.removeChild(remove)\r\n})\r\n//点击歌单方块跳转\r\nlet click = function () {\r\n    let songBlocks = document.querySelectorAll('.songBlock')\r\n    let songBlocks1 = document.querySelectorAll('.songBlock1')\r\n    for (let i = 0; i < songBlocks.length; i++) {\r\n        songBlocks[i].addEventListener('click', function () {\r\n            localStorage.setItem('songListId', songBlocks[i].id)//存id入本地存储\r\n            localStorage.setItem('NsongListId', songBlocks[i].id)//存id入本地存储\r\n            window.location.href = 'songlist.html'\r\n        })\r\n    }\r\n    for (let i = 0; i < songBlocks1.length; i++) {\r\n        songBlocks1[i].addEventListener('click', function () {\r\n            localStorage.setItem('songListId', songBlocks1[i].id)//存id入本地存储\r\n            localStorage.setItem('NsongListId', songBlocks1[i].id)\r\n            window.location.href = 'songlist.html'\r\n        })\r\n    }\r\n}\r\nsetTimeout(click, 500)\r\n//搜索\r\nlet search = document.querySelector('.search')\r\ndocument.onkeydown = function (e) {\r\n    let a = e || window.event;\r\n    if (a.keyCode == 13) {\r\n        localStorage.setItem('searchValue', search.value)\r\n        window.location.href = 'search.html'\r\n    }\r\n}\r\n//获取现在播放的歌曲信息，并插入底部播放方块\r\nfetch('http://localhost:3000/song/url?id=' + localStorage.songId + '')\r\n    .then(res => { return res.json() }).then(data => {\r\n        audio.src = data.data[0].url\r\n    })\r\nfetch('http://localhost:3000/song/detail?ids=' + localStorage.songId + '')\r\n    .then(res => { return res.json() }).then(data => {\r\n        document.querySelector('.playTitle').innerText = data.songs[0].name\r\n        document.querySelector('.littleCover').src = data.songs[0].al.picUrl\r\n        document.querySelector('.playSinger').innerText = '' + data.songs[0].ar[0].name + ' / ' + data.songs[0].al.name + ''\r\n    })\r\n//获取歌曲信息\r\nlet get = function () {\r\n    let duration = document.querySelector('.audio').duration;\r\n    let currentTime = document.querySelector('.audio').currentTime;\r\n    //插入时间\r\n    let m = parseInt(duration / 60)\r\n    let s = parseInt(duration % 60)\r\n    let mm = parseInt(currentTime / 60)\r\n    let ss = parseInt(currentTime % 60)\r\n    document.querySelector('.totalTime').innerText = '' + m + ':' + s + ''\r\n    document.querySelector('.nowTime').innerText = '' + mm + ':' + ss + ''\r\n    //进度圆点前进\r\n    Pdot.style.left = '' + (currentTime / duration) * 560 + 'px'\r\n    runningGrey.style.width = '' + (currentTime / duration) * 560 + 'px'\r\n}\r\nsetTimeout(get, 800)\r\nlet timer = setInterval(get, 1000)//一秒刷新一次\r\n//拖动进度条\r\nrunning.addEventListener('click', () => {\r\n    let Fpos = running.getBoundingClientRect().left\r\n    let Spos = event.clientX\r\n    let percentage = (Spos - Fpos) / 560\r\n    document.querySelector('.audio').currentTime = document.querySelector('.audio').duration * percentage\r\n    Pdot.style.left = '' + Spos - Fpos - 7.5 + 'px'\r\n    runningGrey.style.width = '' + Spos - Fpos - 7.5 + 'px' \r\n})\r\nrunningGrey.addEventListener('click', () => {\r\n    let Fpos = running.getBoundingClientRect().left\r\n    let Spos = event.clientX\r\n    let percentage = (Spos - Fpos) / 560\r\n    document.querySelector('.audio').currentTime = document.querySelector('.audio').duration * percentage\r\n    Pdot.style.left = '' + Spos - Fpos - 7.5 + 'px'\r\n    runningGrey.style.width = '' + Spos - Fpos - 7.5 + 'px' \r\n})\r\nplaySong.addEventListener('click', () => {\r\n    get()\r\n    if (audio.paused) {\r\n        playBtns[2].src = '/images/play12.png'\r\n        playBtns[2].addEventListener('mouseenter', function () {\r\n            playBtns[2].src = '/images/play121.png'\r\n        })\r\n        playBtns[2].addEventListener('mouseleave', function () {\r\n            playBtns[2].src = '/images/play12.png'\r\n        })\r\n\r\n        audio.play();//播放\r\n    } else {\r\n        playBtns[2].src = '/images/play1.png'\r\n        playBtns[2].addEventListener('mouseenter', function () {\r\n            playBtns[2].src = '/images/play21.png'\r\n        })\r\n        playBtns[2].addEventListener('mouseleave', function () {\r\n            playBtns[2].src = '/images/play2.png'\r\n        })\r\n        audio.pause();//暂停\r\n    }\r\n})\r\n//点击小图片打开详情\r\ndocument.querySelector('.littleCover').addEventListener('click', () => {\r\n    window.location.href ='play.html'\r\n    audio.pause();\r\n})\r\n//音量调节\r\nlet volumBtn = document.querySelector('.volumBtn')\r\nlet volumL = document.querySelector('.l')\r\nlet volumD = document.querySelector('.d')\r\nlet count8 = 0;\r\nvolumBtn.addEventListener('click', function () {\r\n    count8++;\r\n    if (count8 % 2 != 0) {\r\n        document.querySelector('.volum').style.display = 'block'\r\n    } else {\r\n        document.querySelector('.volum').style.display = 'none'\r\n    }\r\n})\r\nvolumL.addEventListener('click', () => {\r\n    let Fpos = volumL.getBoundingClientRect().bottom\r\n    let Spos = event.clientY\r\n    let persentage = (Fpos - Spos) / 100\r\n    console.log(persentage);\r\n    volumD.style.marginTop = '' + -(7 + (persentage * 100)) + 'px'\r\n    audio.volume = persentage\r\n})\r\n//热搜\r\nlet hotSearch = document.querySelector('.hotSearch')\r\nlet searchs = document.querySelectorAll('.hotSearch div')\r\nfor (let i = 0; i < 20; i++) {\r\n    searchs[i].addEventListener('mouseenter', function () {\r\n        searchs[i].style.backgroundColor = 'rgb(242, 242, 242)'\r\n    })\r\n    searchs[i].addEventListener('mouseleave', function () {\r\n        searchs[i].style.backgroundColor = '#fff'\r\n    })\r\n}\r\nfetch('http://localhost:3000/search/hot/detail')\r\n    .then(res => { return res.json() }).then(data => {\r\n        for (let i = 0; i < 20; i++) {\r\n            searchs[i].querySelector('.hotName').innerText = data.data[i].searchWord\r\n            searchs[i].querySelector('.hotNum').innerText = data.data[i].score\r\n            if (data.data[i].content != '') {\r\n                searchs[i].querySelector('.detile').innerText = data.data[i].content\r\n            }\r\n            if (data.data[i].iconUrl != null) {\r\n                searchs[i].querySelector('img').src = data.data[i].iconUrl\r\n                searchs[i].querySelector('img').style.height = '20px'\r\n            }\r\n            searchs[i].addEventListener('click', function () {\r\n                localStorage.setItem('searchValue', data.data[i].searchWord)\r\n                window.location.href = 'search.html'\r\n            })\r\n        }\r\n    })\r\n\r\ndocument.querySelector('.search').onblur = function () {\r\n    setTimeout(\"document.querySelector('.hotSearch').style.display = 'none'\", 100)\r\n}\r\n//默认搜索词\r\nfetch('http://localhost:3000/search/default')\r\n    .then(res => { return res.json() }).then(data => {\r\n        document.querySelector('.search').placeholder = '' + data.data.showKeyword + ''\r\n        localStorage.setItem('realkeyword', data.data.realkeyword)\r\n    })\r\n//搜索\r\ndocument.querySelector('.search').onfocus = function () {\r\n    document.querySelector('.hotSearch').style.display = 'block'\r\n    document.onkeydown = function (e) {\r\n        let a = e || window.event;\r\n        if (a.keyCode == 13) {\r\n            if (search.value !== '') {\r\n                localStorage.setItem('searchValue', search.value)\r\n                window.location.href = 'search.html'\r\n            } else {\r\n                localStorage.setItem('searchValue', localStorage.realkeyword)\r\n                window.location.href = 'search.html'\r\n            }\r\n        }\r\n    }\r\n}\r\n//主页 歌单广场切换\r\nlet one = document.querySelector('.one')\r\nlet two = document.querySelector('.two')\r\none.addEventListener('click', () => {\r\n    document.querySelector('.banner').style.display = 'block'\r\n    document.querySelector('.main').style.display = 'block'\r\n    document.querySelector('.ground').style.display = 'none'\r\n    one.className = 'switchAfter'\r\n    two.className = 'switchBefore'\r\n})\r\ntwo.addEventListener('click', () => {\r\n    document.querySelector('.banner').style.display = 'none'\r\n    document.querySelector('.main').style.display = 'none'\r\n    document.querySelector('.ground').style.display = 'block'\r\n    one.className = 'switchBefore'\r\n    two.className = 'switchAfter'\r\n})\r\n//上一首下一首\r\nlet getLittle = function () {\r\n    fetch('http://localhost:3000/song/url?id=' + localStorage.songId + '')\r\n        .then(res => { return res.json() }).then(data => {\r\n            audio.src = data.data[0].url\r\n        })\r\n    fetch('http://localhost:3000/song/detail?ids=' + localStorage.songId + '')\r\n        .then(res => { return res.json() }).then(data => {\r\n            document.querySelector('.playTitle').innerText = data.songs[0].name\r\n            document.querySelector('.littleCover').src = data.songs[0].al.picUrl\r\n            document.querySelector('.playSinger').innerText = '' + data.songs[0].ar[0].name + ' / ' + data.songs[0].al.name + ''\r\n        })\r\n}\r\nlet preSong = document.querySelector('.preSong')\r\nlet nextSong = document.querySelector('.nextSong')\r\nlet temp3 = 0\r\nlet preId = 0\r\nlet nextId = 0\r\nlet idArr = []\r\nlet fn = function () {\r\n    idArr = localStorage.songIdList.split(',')\r\n    temp3 = 0\r\n    for (let i = 0; i < idArr.length; i++) {\r\n        temp3++\r\n        if (idArr[i] === localStorage.songId) {\r\n            if (temp3 == 1) {  //处于第一首\r\n                preId = idArr[idArr.length - 1]\r\n                nextId = idArr[1]\r\n            } else if (temp3 == idArr.length) { //最后一首\r\n                preId = idArr[idArr.length - 2]\r\n                nextId = idArr[0]\r\n            } else {\r\n                preId = idArr[temp3 - 2]\r\n                nextId = idArr[temp3]\r\n            }\r\n        }\r\n    }\r\n}\r\nlet recolor = function(){ //点击上一首下一首后，当前播放列表正在播放的歌曲字体颜色变红\r\n    for(let i = 0;i<document.querySelectorAll('.NlistItem').length;i++){\r\n        document.querySelectorAll('.NlistItem')[i].style.color = ''\r\n        if(document.querySelectorAll('.NlistItem')[i].id == localStorage.songId){\r\n            document.querySelectorAll('.NlistItem')[i].style.color = 'red'\r\n        }\r\n    }\r\n}\r\npreSong.addEventListener('click', () => {\r\n    fn()\r\n    localStorage.setItem('songId', preId)\r\n    getLittle()\r\n    recolor()\r\n})\r\nnextSong.addEventListener('click', () => {\r\n    fn()\r\n    localStorage.setItem('songId', nextId)\r\n    getLittle()\r\n    recolor()\r\n})\r\n\n\n//# sourceURL=webpack://cloud-music/./src/js/test.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/test.js"]();
/******/ 	
/******/ })()
;