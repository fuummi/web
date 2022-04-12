//获取当前的时间
const getTime = function (){
    const time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth()+1;
    let day = time.getDate();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    let realTime = (`${year}年${month}月${day}日${hour}时${min}分${sec}秒`);
    return realTime;
}
exports.getTime = getTime;
