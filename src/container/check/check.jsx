// check组件是一个高阶组件 
//1.接受一个组件    2. 返回一个新组建
import React,{Component} from "react"
import {connect} from "react-redux"//一个组件要和redux产生交互，就要引入它
import {Redirect} from "react-router-dom"

 export default function(ReceiveComponent) {
    @connect(
        (state)=>({isLogin:state.userInfo.isLogin}),//映射状态
        {}//映射操作状态的方法
    )
    class NewComponent extends Component{
        //check检查的规则
        //1.用户如果没有登录，用户还想看admin页面，不能让看，跳转到login 让用户登录
        // 2. 用户如果登录了，用户还想看login页面，不让看，跳转到admin页面
        render(){
            const{isLogin} = this.props
            const{pathname}= this.props.location//当前的页面    
            if(!isLogin && pathname!=="/login"){
                return  <Redirect to="/login"/>
            }
            if(isLogin && pathname==="/login"){
                return  <Redirect to="/admin"/>
            }
            return  <ReceiveComponent {...this.props}/> 
        }
    }
    return NewComponent
}      