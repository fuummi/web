const myAxios = function (obj) {
//     return new Promise((resolve, reject) => {
//         let xhr = null
//         if (xhr == null) {
//             xhr = new XMLHttpRequest();
//             xhr.open(obj.method, obj.url, true);
//             xhr.onreadystatechange = () => {
//                 if (xhr.readyState === 4 && xhr.status === 200) {
//                     resolve(xhr.response) //成功拿到结果，传递响应体
//                     xhr = null
//                 }
//             }
//             xhr.onerror = (err) => {
//                 reject(err);
//                 xhr = null
//             };
//             xhr.send(JSON.stringify(obj.data));
//         }
//     })
// }

// myAxios({
//     method: 'POST',
//     url: 'http://localhost:3000/posts',
//     data: {
//         "title": "json-server",
//         "author": "typicode"
//     }
// }).then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// })
