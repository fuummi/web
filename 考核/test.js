function reverse(num) {
    let str = String(num);
    let arr = str.split('');
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== '0') { newArr.push(arr[i]) }
    }
    newArr.reverse().join('');
    console.log(newArr);
}
reverse(123)

// function reverse(num){
//     if(num>=0){
//         const str=String(num)
//         return Number(str.split('').reverse().join(''))
//     }else{
//     const str=String(num);
//     return -str.slice(1).split('').reverse().join('')
//     }
//     }
//     console.log(reverse(120));
