const acorn = require("acorn");

const Parser = acorn.Parser;

const ast = Parser.parse(`const fn = (a, b) => {
    const total = a + b;
    return total
}`);

console.log(JSON.stringify(ast, null, 2));

