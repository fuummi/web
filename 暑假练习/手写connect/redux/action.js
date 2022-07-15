export function addAction(data){
    return {type:'add',data:data};
}
export function reduceAction(data){
    return {type:'reduce',data:data};
}