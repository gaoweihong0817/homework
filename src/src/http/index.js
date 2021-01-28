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
  baseURL: baseUrl,
  // timeout: 3000
})

//请求拦截器
instance.interceptors.request.use(
  config => {
    // 不传递默认开启loading /配置loading效果
    // if (!config.hideloading) {
    //   loadingInstance = Loading.service({
    //     fullscreen: true
    //   });
    // }
    //获取token
    // let token = 'Bearer ' + localStorage.getItem("admin")
    // if (token) {
    //   config.headers['authorization'] = token
    // }
    let data = 'Bearer ' + localStorage.getItem("admin")
    if (data) {
      config.headers['authorization'] = data
    }
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
    // loadingInstance.close();
    if (response.status == 200) {
      return response.data
    }
  }, error => {
    return Promise.reject(error)
  }
)
export default instance