const a = require('aaxxiioosss')

a({
    method:'get',
    url: 'http://localhost:3000/posts',
}).then(() => {
    console.log('外面的.then执行啦');
})
