//该文件用于保存所有的发送ajax请求的方法； 
import myAxios from "./myAxios"
import { BASE_URL } from "../config"
import {message} from "antd"
//引入jsonp
import jsonp from "jsonp"
import {WEATHER_BASE_URL,WEATHER_AK} from "../config/index"
//请求登录接口
export const reqLogin =(username,password)=> myAxios.post(BASE_URL,{username,password})
//请求天气接口
export const reqWeather =()=>{
    const url =`${WEATHER_BASE_URL}?location=北京&output=json&ak=${WEATHER_AK}`
    return new Promise((resolve,reject)=>{
        jsonp(url,(err,data)=>{
            if(!err){
                console.log(data)
                const {temperature}=data.results[0].weather_data[0]
                const {dayPictureUrl}=data.results[0].weather_data[0]
                const weatherObj ={temperature,dayPictureUrl}
                resolve(weatherObj)
            }else{
                message.error("请求失败，请联系管理员")
            }
        })
    })
}


