// 导入封装好的axios
import insteace from './index'
//导入封装好得接口地址得api.js
import api from './api'

import qs from "qs"
//封装接口
//登录
function login(data) {
  return insteace({
    url: api.login,
    method: "post",
    data: qs.stringify(data)
  })
}
//退出登录
function Edit() {
  return insteace({
    url: api.Edit,
    method: "post"
  })
}
//注册接口
export default {
  login,
  Edit
}