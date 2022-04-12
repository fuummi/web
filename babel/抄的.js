const ast = {
    "type": "Program",
    "start": 0,
    "end": 72,
    "body": [
        {
            "type": "VariableDeclaration",
            "start": 0,
            "end": 72,
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 72,
                    "id": {
                        "type": "Identifier",
                        "start": 6,
                        "end": 8,
                        "name": "fn"
                    },
                    "init": {
                        "type": "FunctionExpression",
                        "start": 11,
                        "end": 72,
                        "id": null,
                        "expression": false,
                        "generator": false,
                        "async": false,
                        "params": [
                            {
                                "type": "Identifier",
                                "start": 21,
                                "end": 22,
                                "name": "a"
                            },
                            {
                                "type": "Identifier",
                                "start": 24,
                                "end": 25,
                                "name": "b"
                            }
                        ],
                        "body": {
                            "type": "BlockStatement",
                            "start": 27,
                            "end": 72,
                            "body": [
                                {
                                    "type": "VariableDeclaration",
                                    "start": 33,
                                    "end": 53,
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "start": 39,
                                            "end": 52,
                                            "id": {
                                                "type": "Identifier",
                                                "start": 39,
                                                "end": 44,
                                                "name": "total"
                                            },
                                            "init": {
                                                "type": "BinaryExpression",
                                                "start": 47,
                                                "end": 52,
                                                "left": {
                                                    "type": "Identifier",
                                                    "start": 47,
                                                    "end": 48,
                                                    "name": "a"
                                                },
                                                "operator": "+",
                                                "right": {
                                                    "type": "Identifier",
                                                    "start": 51,
                                                    "end": 52,
                                                    "name": "b"
                                                }
                                            }
                                        }
                                    ],
                                    "kind": "const"
                                },
                                {
                                    "type": "ReturnStatement",
                                    "start": 58,
                                    "end": 70,
                                    "argument": {
                                        "type": "Identifier",
                                        "start": 65,
                                        "end": 70,
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

const AST_DEFINATIONS_MAP = new Map();

AST_DEFINATIONS_MAP.set('Program', {  //需要进一步遍历的类型设置visitor
    visitor: ['body']
});
AST_DEFINATIONS_MAP.set('VariableDeclaration', {
    visitor: ['declarations']
});
AST_DEFINATIONS_MAP.set('VariableDeclarator', {
    visitor: ['id', 'init']
});
AST_DEFINATIONS_MAP.set('FunctionExpression', {
    visitor: ['params', 'body']
});
AST_DEFINATIONS_MAP.set('BlockStatement', {
    visitor: ['body']
});
AST_DEFINATIONS_MAP.set('ExpressionStatement', {})
AST_DEFINATIONS_MAP.set('Identifier', {});
AST_DEFINATIONS_MAP.set('NumericLiteral', {});
AST_DEFINATIONS_MAP.set('ReturnStatement', {});
AST_DEFINATIONS_MAP.set('ArrowFunctionExpression', {});

function traverse(node, visitors) { //visitors是传入的对象？
    const defination = AST_DEFINATIONS_MAP.get(node.type);
    const visitorFunc = visitors[node.type]; //通过node.type取出该类型的visitors函数
    if (visitorFunc && typeof visitorFunc === 'function') {
        visitorFunc(node);
    }
    if (defination.visitor !== undefined) {
        defination.visitor.forEach(key => {
            const prop = node[key];
            if (Array.isArray(prop)) { // 如果该属性是数组
                prop.forEach(childNode => {
                    traverse(childNode, visitors);
                })
            } else {
                traverse(prop, visitors);
            }
        })
    }
}


const visitors = {
    VariableDeclaration(node) { //const let 转var
        if (node.kind === 'const' || node.kind === 'let') {
            node.kind = 'var';
        }
    },
    ArrowFunctionExpression(node) {
        node.type = 'FunctionExpression'
    }
}
traverse(ast, visitors);


class Printer { //一个类
    constructor() {
        this.buf = ''; //在类创建实例的时候创建一个空字符串
    }

    space() {
        this.buf += ' '; //增加一个空格
    }

    nextLine() {
        this.buf += '\n'; //换行
    }

    Program(node) { //对于主程序的方法，传入ast节点
        node.body.forEach(item => { //遍历body
            this[item.type](item) + ';'; //在body的每个子元素后加上分号
            this.nextLine(); //换行
        });

    }
    VariableDeclaration(node) { //对于变量声明的函数
        this.buf += node.kind; //VariableDeclaration的kind：const
        this.space(); //加空格
        node.declarations.forEach((declaration, index) => { //遍历该节点的declarations(主体)
            if (index != 0) {
                this.buf += ',';
            }
            this[declaration.type](declaration);
        });
        this.buf += ';';
    }
    VariableDeclarator(node) {
        this[node.id.type](node.id); //声明的变量名
        this.buf += ' = ';//加上=
        this[node.init.type](node.init);//
    }
    Identifier(node) {
        this.buf += node.name;
        if (node.name === 'console') {
            this.buf += '.'
        }
        if (node.name === 'log') {
            this.buf += '('
        }
    }
    NumericLiteral(node) {
        this.buf += node.value;
    }
    FunctionExpression(node) { //针对函数前半部分的解析(init)
        this.buf += 'function (';
        node.params.forEach((element, index) => {
            this.buf += element.name
            if (index !== node.params.length - 1) {
                this.buf += ','
            }
        })
        this.buf += ') {'
        this.nextLine()
        this[node.body.type](node.body) //针对函数体的类型进一步处理
        this.nextLine()
        this.buf += '}'
    }
    BlockStatement(node) {
        node.body.forEach((element, index) => {
            if (index !== 0) {
                this.nextLine()
            }
            this.buf += '    '
            if (element.type === 'ReturnStatement') {
                this.buf += 'return'
                this.space()
            }
            if (element.type === 'ExpressionStatement') {
                this[element.expression.type](element.expression)
            }
        })
    }
    BinaryExpression(node) { //二元表达式
        this[node.left.type](node.left)
        this.buf += node.operator
        this[node.right.type](node.right)
    }
    CallExpression(node) {
        this[node.callee.type](node.callee)
        node.arguments.forEach((element) => {
            this[element.type](element)
        })
        this.buf += ')' //？？？
        this.buf += ';'
    }
    MemberExpression(node) {
        this[node.object.type](node.object)
        this[node.property.type](node.property)
        this.space()
    }
    Literal(node) {
        this.buf += node.raw
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