import React, { Component } from 'react'
import { Menu, Icon} from 'antd';
import {Link,withRouter} from "react-router-dom"
import "./left_nav.less"
import {connect} from "react-redux"
import { createSaveTitleAction } from "../../redux/actions/hearder"
import menus from "../../config/menu-config"
import logo  from "../../static/imgs/logo.png"
const { SubMenu } = Menu;
const {Item} =Menu;
@connect(
    (state)=>({title:state.headerTitle}),//映射状态
    {saveTitle:createSaveTitleAction}//映射操作状态的方法
)
@withRouter
class LeftNav extends Component {
    createMenu=(menuArr)=>{
        return menuArr.map((menuObj)=>{
             if(!menuObj.children){
                 return (
                    <Item key={menuObj.key} onClick={()=>{this.props.saveTitle(menuObj.title)}}>
                       <Link to={menuObj.path}>
                            <Icon type={menuObj.icon} />
                            <span>{menuObj.title}</span>
                       </Link>
                    </Item>
                 )
             }else{
                return (
                    <SubMenu
                        key={menuObj.key}
                        title={
                        <span>
                            <Icon type={menuObj.icon}/>
                            <span>{menuObj.title}</span>
                        </span>
                        }
                    >
                       {this.createMenu(menuObj.children)}
                    </SubMenu>
                )
             }
         })
    }
    getTitle= ()=>{
       let title="首页"
       let {pathname} = this.props.location
       let currentKey = pathname.split("/").reverse()[0]
       menus.forEach((menuObj)=>{
          if(menuObj.children instanceof Array){
              let result = menuObj.children.find((childMenu)=>{
                  return childMenu.key === currentKey
              })
              if(result)title = result.title
          }else{
              if(menuObj.key===currentKey)title=menuObj.title
          }
       }) 
      this.props.saveTitle(title)
    }

    componentDidMount(){
        //如果state中没有title（初次登陆，或是刷新页面）
        if(!this.props.title){
            this.getTitle()
        }
    }
    render() {
        const{pathname}=this.props.location
        let selectedKey = pathname.split("/").reverse()[0] // 这个是一个字符串
        let openKey = pathname.split("/")//这个是一个数组 （字符串转数组）
        return (
            <div className="left-nav">
                <div className="nav-top">
                    <img src={logo} alt="图片"/>
                    <h1>商品管理系统</h1>    
                </div>
                <div>
                    <Menu
                    selectedKeys={[selectedKey]}//默认选中菜单
                    defaultOpenKeys={openKey}//默认展开那个菜单（该菜单有子菜单）
                     mode="inline"//菜单范围内展开
                    theme="dark"//主体
                    >
                    {this.createMenu(menus)}
                    </Menu>  
                </div>
            </div>
        )
    }
}

export default LeftNav