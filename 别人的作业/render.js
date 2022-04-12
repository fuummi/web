//渲染函数
function render(visualDom) {
    const element = document.createElement(visualDom.tagName);
    
    for (let key in visualDom.attributes) {
        element.setAttribute(key, visualDom.attributes[key])
    }

    visualDom.children.forEach(now => {
        if (typeof (now) === 'object') {
            let child = render(now)
            element.appendChild(child)
        }
        if (typeof (now) === 'string') {
            element.append(now)
        }
    })
    return element
}
export default function(visualDom){
    return document.body.append(render(visualDom));
}


