import React, { Component } from 'react'
import { Form, Icon, Input, Button,} from 'antd'
import logo from "./img/logo.png"
import "./css/login.less"
const {Item}=Form
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
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    }
    render() {
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
export default Form.create()(Login); 