const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const config = require('./webpack.config.js');

let filePathname = path.join(__dirname, 'index.html'); //和服务器文件的路径拼接,形成请求文件的完整路径

let server = http.createServer();



function writeFn(req, res) {

    if (urlPathname === '/index.html' || urlPathname === '/bundle.js') {
        fs.readFile(filePathname, (err, data) => {
            res.writeHead(200);
            cache = data
            res.end(data)
        })
    }
}


let obj = server.on('request', (req, res) => {
    let urlObj = url.parse(req.url); //获取请求url,并解析
    let urlPathname = urlObj.pathname;
    let filePathname = path.join(`${__dirname}/dist`, urlPathname);
    let obj = {
        urlObj: urlObj,
        urlPathname: urlPathname,
        filePathname: filePathname
    }
    return obj
})
// webpack(config, () => { });


let cache
if (obj !== undefined) {
    setInterval((obj) => {
        if (obj.urlPathname === '/index.html' || obj.urlPathname === '/bundle.js') {
            fs.readFile(filePathname, (err, data) => {
                if (cache !== data) {
                    webpack(config, () => {

                    });
                    window.reload()
                    cache = data
                }
            })
        }
    }, 1000)
}






server.listen(3000, () => {
    console.log('running');
})