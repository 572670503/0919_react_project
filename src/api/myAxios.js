import axios from "axios"
//引入querystring,用于转换请求的参数
import qs from "querystring"
//引入Nprogress ,用于实现进度条效果；
import Nprogress from "nprogress";
//引入Nprogress 样式；
import "nprogress/nprogress.css"
//使用axious的请求拦截器
import {message} from "antd"

axios.defaults.baseURL=""
 axios.interceptors.request.use((config)=>{
     Nprogress.start()
  //config是配置对象，里面包含着所有本次请求的所有信息
  //比如请求的方式，参数。地址
  //如果发送的是post请求，并且是json形式的参数；那就转换为urlencoded;
   const{method,data}=config
   if(method.toLowerCase()==="post" & data instanceof Object){
       config.data = qs.stringify(data)
   }
   return config
})
//使用axios的响应拦截器
axios.interceptors.response.use( 
        (response)=>{
            Nprogress.done()
            return response.data},
        (err)=>{
            Nprogress.done()
            message.error("请求错误，请联系管理员")
           // return  Promise.reject(error.message) }   
           return new Promise(()=>{})} //终断Promise链
    )
export default axios  