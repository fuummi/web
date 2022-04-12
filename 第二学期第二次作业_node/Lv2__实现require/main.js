const fs = require('fs');
const path = require('path')

const myRequire = function (path) {
    const stringCode = fs.readFileSync(path.resolve(__dirname, path), 'utf-8', function (err, data) {//读取文件，返回字符串型代码
        return data;
    });
    const module = eval(stringCode);//把字符串型代码转化为对象
    return module;
}

const testModule = myRequire('./module.js');//导入

console.log(testModule.age);//18
console.log(testModule.fn());//Hello！

//是这样的吗？我做对了吗?