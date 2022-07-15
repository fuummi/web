import React from "react";

export default function UIcompoment(props) {
    const inputNode = React.useRef()
    console.log('UI render');
    return (
        <div>
            <h1>当前求和为{props.count}</h1>
            <input type="text" ref={inputNode}/>&nbsp;
            <button onClick={()=>props.add(inputNode.current.value*1)}>+</button>&nbsp;
            <button onClick={()=>props.reduce(inputNode.current.value*1)}>-</button>
        </div>
    );
}
