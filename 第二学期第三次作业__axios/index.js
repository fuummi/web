const html = `<h1 id="title" name="hello"><span class="a">hello</span>world</h1>`;

//生成抽象语法树 语法分析
function parser(sourceCode) {
  const tokens = tokenizer(sourceCode);
  /**
   *
   * //生成的结果 词法分析
[
  { type: 'LeftParentheses', value: '<' },
  { type: 'JSXIdentifier', value: 'h1' },
  { type: 'AttributeKey', value: 'id' },
  { type: 'Equator', value: '=' },
  { type: 'AttributeStringValue', value: 'title' },
  { type: 'AttributeKey', value: 'name' },
  { type: 'Equator', value: '=' },
  { type: 'AttributeStringValue', value: 'hello' },
  { type: 'RightParentheses', value: '>' },
  { type: 'LeftParentheses', value: '<' },
  { type: 'JSXIdentifier', value: 'span' },
  { type: 'AttributeKey', value: 'class' },
  { type: 'Equator', value: '=' },
  { type: 'AttributeStringValue', value: 'a' },
  { type: 'RightParentheses', value: '>' },
  { type: 'JSXText', value: 'hello' },
  { type: 'LeftParentheses', value: '<' },
  { type: 'BackSlash', value: '/' },
  { type: 'JSXIdentifier', value: 'span' },
  { type: 'RightParentheses', value: '>' },
  { type: 'JSXText', value: 'world' },
  { type: 'LeftParentheses', value: '<' },
  { type: 'BackSlash', value: '/' },
  { type: 'JSXIdentifier', value: 'h1' },
  { type: 'RightParentheses', value: '>' }
]
   */
  function walk() {
    //your code
  }
  const ast = {
    type: nodeTypes.Program,
    body: [
      {
        type: nodeTypes.ExpressionStatement,
        expression: walk(),
      },
    ],
  };
  /**
   * ast 示例
   *{
  "type": "Program",
  "body": [
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "JSXElement",
        "openingElement": {
          "type": "JSXOpeningElement",
          "name": {
            "type": "JSXIdentifier",
            "name": "h1"
          },
          "attributes": [
            {
              "type": "JSXAttribute",
              "name": {
                "type": "JSXIdentifier",
                "name": "id"
              },
              "value": {
                "type": "Literal",
                "value": "title"
              }
            },
            {
              "type": "JSXAttribute",
              "name": {
                "type": "JSXIdentifier",
                "name": "name"
              },
              "value": {
                "type": "Literal",
                "value": "hello"
              }
            }
          ]
        },
        "closingElement": {
          "type": "JSXClosingElement",
          "name": {
            "type": "JSXIdentifier",
            "name": "h1"
          }
        },
        "children": [
          {
            "type": "JSXElement",
            "openingElement": {
              "type": "JSXOpeningElement",
              "name": {
                "type": "JSXIdentifier",
                "name": "span"
              },
              "attributes": [
                {
                  "type": "JSXAttribute",
                  "name": {
                    "type": "JSXIdentifier",
                    "name": "class"
                  },
                  "value": {
                    "type": "Literal",
                    "value": "a"
                  }
                }
              ]
            },
            "closingElement": {
              "type": "JSXClosingElement",
              "name": {
                "type": "JSXIdentifier",
                "name": "span"
              }
            },
            "children": [
              {
                "type": "JSXText",
                "value": "hello"
              }
            ]
          },
          {
            "type": "JSXText",
            "value": "world"
          }
        ]
      }
    }
  ]
}
   */
  return ast;
}

//词法分析
function tokenizer(sourceCode) {
  //your code
}

//ast转虚拟dom
function astToVisualDom(ast) {
  //your code
}

//渲染函数
function render(visualDom) {
  //your code
}

const ast = parser(html);
const visualDom = astToVisualDom(ast);
render(visualDom);