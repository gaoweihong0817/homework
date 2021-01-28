// 配置axios拦截 index.js文件
import axios from 'axios'

import {
  baseUrl
} from '@/config'

// 导入loading效果
import {
  Loading
} from 'element-ui';

let loadingInstance; // 创建loading变量

const instance = axios.create({
  baseURL:"/api",
  timeout: 3000,
  withCredentials: true // 允许携带cookie
})

//请求拦截器
instance.interceptors.request.use(
  config => {
    // 不传递默认开启loading /配置loading效果
    if (!config.hideloading) {
      loadingInstance = Loading.service({
        fullscreen: true
      });
    }
    // res.writeHead(200, {
    // "Access-Control-Allow-Origin": "http://192.168.1.102:8080/",
    // "Access-Control-Allow-Credentials": true
    // })
    // Access-Control-Allow-Origin
    // Cookie: JSESSIONID=6F6F8199B8D1C5BFFD408EAEC5282866
    //获取token
    // let token = 'Bearer ' + localStorage.getItem("admin")
    // if (token) {
    //   config.headers['authorization'] = token
    // }
    // let data = 'Bearer ' + localStorage.getItem("admin")
    // if (data) {
    //   config.headers['authorization'] = data
    // }
    // config.headers['authorization'] = data
    return config
  }, error => {
    return Promise.reject(error)
  }
)
//响应拦截器
instance.interceptors.response.use(
  response => {
    // 关闭loding效果
    loadingInstance.close();
    if (response.status == 0) {
      // return response.data
      return response.data
    }
  }, error => {
    return Promise.reject(error)
  }
)
export default instance