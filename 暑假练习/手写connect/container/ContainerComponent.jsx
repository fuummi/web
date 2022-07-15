import UIcompoment from "../components/UIcompoment";
import {addAction,reduceAction} from '../redux/action'
import connect from '../redux/connect'

const mapStateToProps = (state)=>{
    console.log('容器组件mapStateToProps返回最新props');
    return {
        count:state
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        add:(num)=>dispatch(addAction(num)),
        reduce:(num)=>dispatch(reduceAction(num))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UIcompoment)