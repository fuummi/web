const fs = require('fs');
const path = require('path')
const puppeteer = require('puppeteer');
const getTime = require('./getTime');//获取当前时间模块

; (async function () {
  console.log('打开网页中......');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://s.weibo.com/top/summary');//打开目标网页
  page.on('load', async () => { //页面加载完成后
    console.log('页面已打开,爬取中.....');
    const data = await page.evaluate(() => {
      const message = document.querySelectorAll('.td-02');//获取网页内DOM节点  
      const title = [];
      for (let i = 0; i < message.length; i++) {
        if (i === 0) { //除去第一个不参与排名的方块
          continue
        }
        const word = String(message[i].innerText).replace(/\d{6,}$/,'')
        const num = String(message[i].innerText).match(/\d+$/)
        if (word == null) { //除去广告
            continue
        }
        title.push(` 排名:${i} \n 标题:${word} \n 点击量:${num}\n 链接:${message[i].children[0].attributes["href"].value} \n\n`);
      }
      return title;
    })
    const dirname = path.resolve(__dirname,'./微博热搜')
    if (!fs.existsSync(dirname)) { //不存在文件夹则创建
      fs.mkdir(dirname, err => {})
    }
    const option = {
      encoding: 'utf8',
      flag: 'a+'
    }
    for (let i = 0; i < data.length; i++) { //写入txt
      fs.writeFileSync(`${path.resolve(__dirname,'./微博热搜')}/${getTime.getTime()}.txt`, data[i], option, (err) => {})
    }
    console.log(`写入完成！热搜时间:${getTime.getTime()}`);
    browser.close();
  })
})()