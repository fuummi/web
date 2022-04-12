//词法分析
function tokenizer(sourceCode) {
    const tokens = [];
    let current = 0;
    while (current < sourceCode.length) {
        const char = sourceCode[current] //这里得到的是单个的字符
        if (/</.test(char)) {
            tokens.push({
                type: 'LeftParentheses', value: '<'
            })
            current++     
            if (sourceCode[current] == '/') {
                continue
            }
            let value = ''
            while (/[a-z1234]/.test(sourceCode[current]) && current < sourceCode.length) {
                value = value + sourceCode[current]
                current++
            }
            tokens.push({
                type: 'JSXIdentifier', value: value
            })
            continue
        }
        if (/>/.test(char)) {
            tokens.push({
                type: 'RightParentheses', value: char
            })
            current++
            continue
        }
        if (/\//.test(char)) {
            tokens.push({
                type: 'BackSlash', value: char
            })
            current++
            let value = ''
            while (/[a-z1234]/.test(sourceCode[current]) && current < sourceCode.length) {
                value = value + sourceCode[current]
                current++
            }
            tokens.push({
                type: 'JSXIdentifier', value: value
            })
            continue
        }
        if (/\s/.test(char)) {
            current++
            continue
        }
        if (/"/.test(char)) {
            current++
            let value = ''
            while (/[^"> ]/.test(sourceCode[current]) !== false && current < sourceCode.length) {
                value = value + sourceCode[current]
                current++
            }
            if (value!==undefined&&value!=='') {
                tokens.push({
                    type: 'AttributeStringValue', value: value
                })
            }
            continue
        }
        if (/=/.test(char)) {
            tokens.push({
                type: 'Equator', value: char
            })
            current++
            continue
        }
        if (/[a-zA-Z\$\_]/.test(char)) {
            let value = char
            current++
            while (/[a-zA-Z\$\_1234]/.test(sourceCode[current]) && current < sourceCode.length) {
                value = value + sourceCode[current]
                current++
            }
            if (/id|class|name/.test(value)) {
                tokens.push({
                    type: 'AttributeKey', value: value
                })
            }
            else{
                tokens.push({
                    type: 'JSXText', value: value
                })
            }
            continue
        }
        throw new TypeError('I dont know what this character is: '+char);
    }
    return tokens
}

export default tokenizer