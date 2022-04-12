const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

class InterceptorsManage {
    constructor() {
        this.handlers = [];//InterceptorsManage被创建时，任务队列为空
    }
    use(onFulField, onRejected) { //InterceptorsManage的use方法将拦截器传进来的函数push进数组
        this.handlers.push([onFulField, onRejected])
    }
}

class Axios {  //axios是Aixos类的一个实例
    constructor() { //创建axios时，axios的interceptors的request和response属性各创建一个新的InterceptorsManage
        this.interceptors = {
            request: new InterceptorsManage(),
            response: new InterceptorsManage()
        }
    }
    sendXhr(obj) { //发送xhr的模块
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(obj.method, obj.url);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(JSON.stringify(obj.data));
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(xhr.response)
                    } else {
                        reject(xhr.response)//发送成功，promise的状态改为reslove
                    }
                }
            }
        })
    }
    core(obj) {
        let chain = [[Axios.prototype.sendXhr.bind(this), function () { console.log('发送请求出错') }]] //首先将发送xhr的代码放入数组
        this.interceptors.request.handlers.forEach(element => { //将发送前数据处理的函数放在数组chain的前面
            chain.unshift(element)
        })
        this.interceptors.response.handlers.forEach(element => { //再将返回数据处理的函数放在数组chain的末尾
            chain.push(element)
        })
        let promise = Promise.resolve(obj) //新建一个promise,设置为成功状态并传入发送请求所需的数据，让后面的.then执行
        while (chain.length > 0) { //如果任务队列中有函数，按照先后顺序执行
            const [resolve1, reject1] = chain.shift() //从数组中按序取出函数数组
            promise = promise.then(resolve1, reject1) //放入promise执行
        }
        return promise //最后返回一个promise，用于外部的链式调用
    }
}
//将方法换绑的函数  utils.extend(a,b)将后者的方法 绑定到前者身上
const utils = {
    extend(a, b, context) { //a:需要绑定方法的空白函数 b:带着方法的实例 
        for (let key in b) { //遍历b里面所有的属性
            if (b.hasOwnProperty(key)) { //返回一个布尔值，指示对象自身属性中是否具有指定的属性
                if (typeof b[key] === 'function') { //如果b里面的属性是函数，需要绑定正确的this，即实例化出来的小axios
                    a[key] = b[key].bind(context)
                } else {
                    a[key] = b[key] //普通属性直接添加
                    //console.log(key); //interceptors
                }
            }
        }
    }
}
//实现axios.method 第一步给Axios.prototype上绑方法
const methodsArr = ['get', 'delete', 'head', 'options', 'put', 'patch', 'post'];
methodsArr.forEach(element => {
    Axios.prototype[element] = function () { //往Axios类的原型里面添加方法
        if (['get', 'delete', 'head', 'options'].includes(element)) { //这几个方法发送时不需要传输数据
            return Axios.prototype.sendXhr({
                method: element,
                url: arguments[0].url,
            })
        } else {
            return Axios.prototype.sendXhr({
                method: element,
                url: arguments[0].url,
                data: arguments[0].data
            })
        }
    }
})

// //Axios是一个类，但是实际实现axios功能的是里面的core函数，所以要为函数绑上方法
function CreateAxiosFn() {
    let axios = new Axios();
    let req = axios.core.bind(axios);
    utils.extend(req, Axios.prototype, axios);//绑定axios.method
    utils.extend(req, axios); //绑定interceptors
    return req;
}

module.exports = CreateAxiosFn()