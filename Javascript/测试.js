console.log(1);
setTimeout(() => {
    console.log(2);
})
let p = new Promise((resolve, reject) => {
    console.log(3);
    resolve()
}).then(() => {
    console.log(4);
    return new Promise.reject()
}).then(() => {
    console.log(1);
})