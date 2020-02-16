import React, { Component } from 'react'
import "./header.less"
import {Button,Icon} from "antd"
import screenfull from"screenfull"
export default class Header extends Component {
    fullscreen=()=>{
        screenfull.request();
    }
    render() {
        return (
            <div className="header">
                <div className="header-top">
                    <Button size="small" onClick={this.fullscreen}>
                       <Icon type="fullscreen" />
                    </Button>
                    <span>欢迎,xxx</span>
                    <Button type="link">
                        退出登录
                    </Button>
                </div>
                <div className="header-bottom">
                    <div className="bottom-left">
                       <span> 首页</span> 
                    </div>
                    <div className="bottom-right">
                        <span>2020年2月13日  xxxx</span>
                        <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2423891821,2759999798&fm=26&gp=0.jpg" alt="图片"/>
                        <span>温度：xxxxx</span>
                    </div>
                </div>
            </div>
        )
    }
}
  