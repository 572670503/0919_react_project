import React, { Component } from 'react'
import {connect} from "react-redux"
import "./header.less"
import {Button,Icon,Modal} from "antd"
import screenfull from"screenfull"
import  dayjs  from "dayjs"
import {reqWeather} from "../../api/index"
import {createDeleteUserInfoAction} from "../../redux/actions/login"
import {createDeleteTitleAction} from "../../redux/actions/hearder"
const { confirm } = Modal;
@connect(
    (state)=>({userInfo:state.userInfo,title:state.headerTitle}),//映射状态

    {deleteUserInfo:createDeleteUserInfoAction,
     deleteTitle:createDeleteTitleAction
    }     //操作状态的方法
)
 class Header extends Component {
    state={
        isFull:false,
        date:dayjs().format('YYYY年 MM月DD日 HH:mm:ss A') ,
        weatherData:{pic:"",temp:""}
    }
    //退出登录方法
    logout=()=>{
       confirm({
        title: '确定退出吗？',
        content: '退出后需要重新登录',
        okText:'确定',
        cancelText:"取消",
        onOk:()=>{
           //操作redux状态  退出登录
          this.props.deleteUserInfo()
          //清空redux中的保存的title
          this.props.deleteTitle()
        }
      });
    }
     //发送ajax请求，获取天气数据
     getWeatherData = async()=>{
        let weatherData = await reqWeather()  
        const {temperature,dayPictureUrl}=weatherData
        this.setState({weatherData:{pic:dayPictureUrl,temp:temperature}})
     }
     componentDidMount(){
        screenfull.on('change', () => {
            let isFull = !this.state.isFull
            this.setState({isFull})
        })
        //更新时间(有开始定时器，就要有停止定时器)
        this.timeId = setInterval(() => {
            this.setState({date:dayjs().format('YYYY年 MM月DD日 HH:mm:ss A') })
        }, 1000);
         this.getWeatherData()  
    }
    componentWillUnmount(){
         clearInterval(this.timeId)
    }
    fullscreen=()=>{
        screenfull.toggle();
    }
    render() {
        const{username}=this.props.userInfo.user
        return (
            <div className="header">
                <div className="header-top">
                    <Button size="small" onClick={this.fullscreen}>
                       <Icon type={this.state.isFull?"fullscreen-exit":"fullscreen"}/>
                    </Button>
                    <span>欢迎,{username}</span>
                    <Button type="link" onClick={this.logout}>退出登录</Button>
                </div>
                <div className="header-bottom">
                    <div className="bottom-left">
                     <span>{this.props.title}</span> 
                    </div>
                    <div className="bottom-right">
                         <span>{this.state.date}</span>
                        <img src={this.state.weatherData.pic} alt="图片"/>
                        <span>温度：{this.state.weatherData.temp}</span>
                    </div>
                </div>
            </div>
        )
    }
}
  
export default Header