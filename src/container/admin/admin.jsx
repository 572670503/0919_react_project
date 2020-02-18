import React, { Component } from 'react'
 import {Switch,Route,Redirect} from "react-router-dom"
import check from "../check/check"
import { Layout } from 'antd';
import "./admin.less"
import Header from "../header/header"
import LeftNav from "../left_nav/left_nav"
import Home from "../../components/home/home"
import Category from "../category/category"
import Product from "../product/product"
import Bar from "../../components/bar/bar"
import Line from "../../components/line/line"
import Pie from "../../components/pie/pie"
import Role from "../../container/role/role"
import User from "../../container/user/user"
const {Footer,Sider,Content} = Layout;
@check 
class Admin extends Component {
    render() {
        return (        
                <Layout className="layout">
                    <Sider>
                       <LeftNav/>
                    </Sider>
                    <Layout>
                    <Header/>
                    <Content className="content">
                       <Switch>
                           <Route path="/admin/home" component={Home}/>
                           <Route path="/admin/prod_about/category" component={Category}/>
                           <Route path="/admin/prod_about/product" component={Product}/>
                           <Route path="/admin/charts/bar" component={Bar}/>
                           <Route path="/admin/charts/line" component={Line}/>
                           <Route path="/admin/charts/pie" component={Pie}/>
                           <Route path="/admin/role" component={Role}/>
                           <Route path="/admin/user" component={User}/>
                           <Redirect to="/admin/home"/>
                       </Switch>
                   </Content>
                    <Footer className="footer">守住一方平安，尽力而为，问心无愧就好</Footer>
                    </Layout>
                </Layout>
        )
    }
}

export default Admin
   