import React, { Component } from 'react'
// import axios from "axios"
// import myAxios from "../../api/myAxios"
import { Form, Icon, Input, Button,message} from 'antd'
import logo from "./img/logo.png"
import "./css/login.less"
import {reqLogin} from "../../api/index"
import {connect} from "react-redux"
import {createSaveUserInfoAction} from "../../redux/actions/login"
// import {Redirect} from "react-router-dom"
import check from "../check/check"
const {Item}=Form

@connect(
    (state)=>({userInfo:state.userInfo}),
    {saveUserInfo:createSaveUserInfoAction}
)
@Form.create() 
@check
class Login extends Component {
    passwordValidator=(rule, value, callback)=>{
        //1.value 是用户的输入
        //2.callback何时调用？（1）当用户输入的东西不合法的时候返回
        //自定义表单验证
        if(!value){
           callback("密码必须填写")
        }else if(value.length > 12){
            callback("必须小于12位")
        }else if(value.length < 4){
           callback("必须大于4位")
        }else if(!(/^\w+$/).test(value)){
           callback("用户名必须是英文、数字或下划线组成")
        }else{
            callback()
        }
    }
    //相应表单提交时触发
    handleSubmit=(event)=>{
        //阻止表单的提交的默认行为（因为我们是通过ajax请求发送）
        event.preventDefault()
        //获取所有表单中的用户输入
        this.props.form.validateFields(async(err, values) => {
        //如果输入的密码和用户名都没有错误，就就发送请求
          if (!err) {
           const{username,password}=values
         let result = await reqLogin(username,password)
         const{status,data,msg}=result
          if(status===0){
              message.success("登录成功")
              //向redux中保存用户信息
              this.props.saveUserInfo(data)
              //跳转到admin页面
              this.props.history.replace("/admin")
          }else{
              message.error(msg)
          }
        // const{username,password}=values
        //如果没有错误就发送请求  values 说明 它是一个对象 里面包含了username 和 password
        //    myAxios.post("http://localhost:3000/login",values).then(
        //        response=>{
        //            const status = response.status
        //            const msg = response.msg
        //            if(status===0){
                     
        //            }else alert(msg)
        //        }
        //      )
          }
        });
    }
    render() {
        // const{isLogin}= this.props.userInfo
        // if(isLogin) return <Redirect to="/admin"/>
        const { getFieldDecorator } = this.props.form;
        return (
            <div id="login">
                <div className="header">
                    <img src={logo} alt="图片"/>
                    <h1>商品管理系统</h1>
                </div> 
                <div className="content">
                 <h1>用户登录</h1>
                 <Form onSubmit={this.handleSubmit} className="login-form">
                    <Item>
                    {getFieldDecorator('username', {
                    rules: [{ required: true, message: '请输入用户名!' },
                            {max:12,message:"用户名必须小于等于12位"},
                            {min:4,message:"用户名必须大于等于4位"}, 
                            {pattern:/^\w+$/,message:"用户名必须是英文、数字或下划线组成"}
                           ],
                     })(
                        <Input
                            prefix={<Icon type="username" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="用户名"
                            />,
                         )}
                    </Item>
                    <Item>
                    {getFieldDecorator('password', {
                    rules: [
                        {validator:this.passwordValidator}
                    ]
                     })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                            />,
                     )}
                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Item>
                 </Form>
                </div>
            </div>
        )
    }
}

export default Login