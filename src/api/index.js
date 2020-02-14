//该文件用于保存所有的发送ajax请求的方法； 
import myAxios from "./myAxios"
import { BASE_URL } from "../config"
export const reqLogin =(username,password)=> myAxios.post(BASE_URL,{username,password})


