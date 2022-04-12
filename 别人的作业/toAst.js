//转ast
function walk(tokens) {
    let expression = {}
    let current = 0
    const total = tokens.length - 1
    while (current < tokens.length) {
        if (tokens[0].type === 'LeftParentheses' && tokens[total].type === 'RightParentheses') { //开头和结尾是<>，说明是一段html代码
            expression = {
                type: "JSXElement",
            }
            current++
            //判断标签名
            if (tokens[current].type === 'JSXIdentifier') { //下一个元素？是JSXIdentifier，说明是这个标签的头？
                expression.openingElement = {
                    type: "JSXOpeningElement",
                    name: {
                        type: tokens[current].type,
                        name: tokens[current].value
                    },
                }
            }
            current++
            //获取标签的属性
            expression.attributes = [] //存储属性的数组
            while (tokens[current].type === 'AttributeKey') { //如果是一个属性
                expression.attributes.push({ //往数组里push参数
                    type: "JSXAttribute",
                    name: {
                        type: "JSXIdentifier",
                        value: tokens[current].value //当前的代表键
                    },
                    value: {
                        type: "Literal",
                        value: tokens[current + 2].value //跳过等号(+2)的代表值
                    }
                })
                current = current + 3 //跳过=和值到下一个值
            }
            current++ //跳过前半段标签的 >
            //标签内的子元素或innertext
            expression.children = []
            if (tokens[current].type === 'LeftParentheses') { //子元素里有<,说明又是一个Html标签，再次进入循环
                expression.children.push(helper(current, expression))
            }
            while (tokens[current].value !== '/') { //跳过函数里的Html标签
                current++
            }
            current = current + 3
            if (tokens[current].type === 'JSXText') {
                expression.children.push({
                    type: "JSXText",
                    value: tokens[current].value
                })
            }
            expression.closingElement = expression.openingElement
        }
        if (current = tokens.length - 1) { break }//防止死循环
    }
    //处理子标签的函数
    function helper(current, father) {
        let newExpression = { type: "JSXElement" }
        current++
        //判断标签名
        if (tokens[current].type === 'JSXIdentifier') { //下一个元素？是JSXIdentifier，说明是这个标签的头？
            newExpression.openingElement = {
                type: "JSXOpeningElement",
                name: {
                    type: tokens[current].type,
                    name: tokens[current].value
                },
            }
        }
        current++
        newExpression.attributes = [] //存储属性的数组
        while (tokens[current].type === 'AttributeKey') { //如果是一个属性
            newExpression.attributes.push({ //往数组里push参数
                type: "JSXAttribute",
                name: {
                    type: "JSXIdentifier",
                    value: tokens[current].value //当前的代表键
                },
                value: {
                    type: "Literal",
                    value: tokens[current + 2].value //跳过等号(+2)的代表值
                }
            })
            current = current + 3 //跳过=和值到下一个值
        }
        current++ //跳过前半段标签的 >
        newExpression.children = []
        if (tokens[current].type === 'LeftParentheses') { //子元素里有<,说明又是一个Html标签，再次进入循环
            expression.children.push(helper(current))
        } else if (tokens[current].type === 'JSXText') {
            newExpression.children.push({
                type: "JSXText",
                value: tokens[current].value
            })
        }
        newExpression.closingElement = newExpression.openingElement
        return newExpression
    }
    return expression
}
export default walk