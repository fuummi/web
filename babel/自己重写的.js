const origin = `const fn = (a, b) => {
    const total = a + b;
    return total
}`
const ast = {
    "type": "Program",
    "start": 0,
    "end": 66,
    "body": [
        {
            "type": "VariableDeclaration",
            "start": 0,
            "end": 66,
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 66,
                    "id": {
                        "type": "Identifier",
                        "start": 6,
                        "end": 8,
                        "name": "fn"
                    },
                    "init": {
                        "type": "ArrowFunctionExpression",
                        "start": 11,
                        "end": 66,
                        "id": null,
                        "expression": false,
                        "generator": false,
                        "async": false,
                        "params": [
                            {
                                "type": "Identifier",
                                "start": 12,
                                "end": 13,
                                "name": "a"
                            },
                            {
                                "type": "Identifier",
                                "start": 15,
                                "end": 16,
                                "name": "b"
                            }
                        ],
                        "body": {
                            "type": "BlockStatement",
                            "start": 21,
                            "end": 66,
                            "body": [
                                {
                                    "type": "VariableDeclaration",
                                    "start": 27,
                                    "end": 47,
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "start": 33,
                                            "end": 46,
                                            "id": {
                                                "type": "Identifier",
                                                "start": 33,
                                                "end": 38,
                                                "name": "total"
                                            },
                                            "init": {
                                                "type": "BinaryExpression",
                                                "start": 41,
                                                "end": 46,
                                                "left": {
                                                    "type": "Identifier",
                                                    "start": 41,
                                                    "end": 42,
                                                    "name": "a"
                                                },
                                                "operator": "+",
                                                "right": {
                                                    "type": "Identifier",
                                                    "start": 45,
                                                    "end": 46,
                                                    "name": "b"
                                                }
                                            }
                                        }
                                    ],
                                    "kind": "const"
                                },
                                {
                                    "type": "ReturnStatement",
                                    "start": 52,
                                    "end": 64,
                                    "argument": {
                                        "type": "Identifier",
                                        "start": 59,
                                        "end": 64,
                                        "name": "total"
                                    }
                                }
                            ]
                        }
                    }
                }
            ],
            "kind": "const"
        }
    ],
    "sourceType": "script"
}

const AST_DEFINATIONS_MAP = new Map() //新建map类型数据存储各类型的visitor,管理各类型的遍历方式
AST_DEFINATIONS_MAP.set('Program', {
    visitor: ['body']
})
AST_DEFINATIONS_MAP.set('VariableDeclaration', {
    visitor: ['declarations']
})
AST_DEFINATIONS_MAP.set('VariableDeclarator', {
    visitor: ['id', 'init']
})
AST_DEFINATIONS_MAP.set('BlockStatement', {
    visitor: ['body']
})
AST_DEFINATIONS_MAP.set('ArrowFunctionExpression', {
    visitor: ['params', 'body']
})
AST_DEFINATIONS_MAP.set('FunctionExpression', {
    visitor: ['params', 'body']
})
AST_DEFINATIONS_MAP.set('ReturnStatement', {
    visitor: ['argument']
})
AST_DEFINATIONS_MAP.set('BinaryExpression', {
    visitor: ['left', 'right']
})
AST_DEFINATIONS_MAP.set('ExpressionStatement', {})
AST_DEFINATIONS_MAP.set('CallExpression', {})
AST_DEFINATIONS_MAP.set('MemberExpression', {})
AST_DEFINATIONS_MAP.set('Identifier', {})
AST_DEFINATIONS_MAP.set('Literal', {})

function traverse(node, visitors) {
    let defination = AST_DEFINATIONS_MAP.get(node.type) // 从map里拿出当前类型对应的visitor
    let visitorsFn = visitors[node.type]
    if (visitorsFn !== undefined || typeof (visitorsFn) === 'function') { //如果当前类型存在需要修改的东东
        visitors[node.type](node) //传入当前节点并执行修改
    }
    if (defination.visitor !== undefined) { //有visitor,需要进一步遍历
        defination.visitor.forEach(element => { //遍历visitor里的所有节点
            let prop = node[element] //当前遍历到的节点对象本身
            if (Array.isArray(prop)) { //如果节点还是数组
                prop.forEach(child => { //再遍历节点数组，每个子节点再执行函数
                    traverse(child, visitors)
                })
            } else {
                traverse(prop, visitors) //如果不是数组，不用再次遍历
            }
        });
    }
}

const visitors = {
    VariableDeclaration(node) { //const let转var
        if (node.kind === 'const' || node.kind === 'let') {
            node.kind = 'var'
        }
    },
    ArrowFunctionExpression(node) { //箭头函数转普通函数
        node.type = 'FunctionExpression'
    }
}

traverse(ast, visitors)

class Printer {
    constructor() {
        this.buf = '' //初始化一个存放代码的字符串
    }
    nextline() {
        this.buf += '\n' //换行函数
    }
    space() {
        this.buf += ' ' //空格函数
    }
    Program(node) {
        node.body.forEach(element => {
            this[element.type](element) //遍历body函数，执行对应类型的方法
        })
    }
    VariableDeclaration(node) {
        this.buf += node.kind //加上声明(const let)
        this.space() //空格
        node.declarations.forEach(element => {
            this[element.type](element) //遍历body数组，执行对应类型的方法
        })
    }
    VariableDeclarator(node) {
        this.buf += node.id.name //声明的变量名
        this.space()
        this.buf += '='
        this.space()
        this[node.init.type](node.init)
        this.buf += ';'
    }
    FunctionExpression(node) { //针对函数前半部分的解析(init)
        this.buf += 'function (';
        node.params.forEach((element, index) => {
            this[element.type](element)
            if (index !== node.params.length - 1) {
                this.buf += ','
            }
        })
        this.buf += ') {'
        this.nextline()
        this.buf += '   '
        this[node.body.type](node.body) //针对函数体的类型进一步处理
        this.nextline()
        this.buf += '}'
    }
    BlockStatement(node) {
        node.body.forEach(element => {
            this[element.type](element) //遍历body函数，执行对应类型的方法
        })
    }
    ExpressionStatement(node) {
        this[node.expression.type](node.expression)
    }
    CallExpression(node) {
        this[node.callee.type](node.callee)
        node.arguments.forEach(element => {
            this[element.type](element)
        })
        this.buf += ')'
    }
    MemberExpression(node) {
        this[node.object.type](node.object)
        this[node.property.type](node.property)
    }
    Literal(node) {
        this.buf += node.raw
    }
    Identifier(node) {
        this.buf += node.name
        if (node.name === "console") {
            this.buf += '.'
        }
        if (node.name === "log") {
            this.buf += '('
        }
    }
    BinaryExpression(node) { //二元表达式
        this[node.left.type](node.left)
        this.buf += node.operator
        this[node.right.type](node.right)
    }
    ReturnStatement(node) {
        this.nextline()
        this.buf += '   '
        this.buf += 'return'
        this.space()
        this[node.argument.type](node.argument)
        this.buf += ';'
    }
}

class Generator extends Printer {
    generate(node) {
        this[node.type](node); //从这里传入类型和节点，开始遍历
        return this.buf;
    }
}
function generate(node) {
    return new Generator().generate(node);
}
console.log(generate(ast));