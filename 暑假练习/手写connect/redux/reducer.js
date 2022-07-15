const initState = 0;
export default function(preState=initState,action){
    const {type,data} = action;
    switch(type){
        case 'add':
            return preState+data;
        case 'reduce':
            return preState-data;
        default:
            return preState;
    }
}