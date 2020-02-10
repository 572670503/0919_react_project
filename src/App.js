import React,{Component} from "react"
import Login from "./pages/login/login"
import Admin from "./pages/admin/admin"
import {Route,Switch} from "react-router-dom"
export default class App extends  Component{
    render(){
        return(
            <Switch>
                <Route path="/admin" component={Admin}/>
                <Route Path="/login" component={Login}/>
            </Switch>
        )
    }
}

