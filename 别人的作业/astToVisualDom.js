//转虚拟dom
class Element {
    constructor(tagName, attributes, children) {
        this.tagName = tagName.name
        let realAttributes = {}
        attributes.forEach(element => {
            realAttributes[element.name.value] = element.value.value
        });
        this.attributes = realAttributes
        let realChildren = []
        children.forEach(element => {
            if (element.type === 'JSXElement') {
                let childrenElement = new Element(element.openingElement.name, element.attributes, element.children)
                realChildren.push(childrenElement)
            }
            if (element.type === 'JSXText') {
                realChildren.push(`${element.value}`)
            }
        });
        this.children = realChildren
    }
}

//ast转虚拟dom
function astToVisualDom(ast) {
    let nodeArr = []
    for (let key in ast.body[0].expression) { //先push到数组里方便用current遍历
        nodeArr.push(ast.body[0].expression[key])
    };
    if (nodeArr[1].type = 'JSXOpeningElement') {
        const tree = new Element(nodeArr[1].name, nodeArr[2], nodeArr[3])
        return tree
    }
}

export default astToVisualDom;
