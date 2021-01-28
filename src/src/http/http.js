import instance from './index'
import api from './api'

//登录
function login(data) {
  return instance({
    url: api.login,
    method: "post",
    data: data
  })
}
//头部导航
function menuInfo(data) {
  return instance({
    url: api.menuInfo,
    method: "post",
    data: data
  })
}
//首页表格数据
function Table(params) {
  return instance({
    url: api.Table,
    method: "get",
    params: params
  })
}
// 删除
function drlDel(id) {
  return instance({
    url: `/user/${id}`,
    method: "DELETE"
  })
}
//启用禁用  user/on/1541039
function UpData(id) {
  return instance({
    url: `/user/on/${id}`,
    method: "put"
  })
}
//添加数据
function UPDATE(data) {
  return instance({
    url: api.UPDATE,
    method: "post",
    data: data
  })
}
//上传头像
function Img(data) {
  return instance({
    url: api.Img,
    method: "post",
    data: data
  })
}
//地址 sonArea
function sonArea() {
  return instance({
    url: "/sonArea/0",
    method: "get"
  })
}

function sonAreaId(id) {
  return instance({
    url: `/sonArea/${id}`,
    method: "get"
  })
}
//详情 /user/1541175 details
function details(id) {
  return instance({
    url: `/user/${id}`,
    method: "get"
  })
}
//教学页面 课程管理 course
function course() {
  return instance({
    url: api.course,
    method: "get"
  })
}

function Info() {
  return instance({
    url: api.Info,
    method: "get"
  })
}
//列表数据渲染
function List(data) {
  return instance({
    url: api.List,
    method: "post",
    data: data
  })
}
//排序
function Sort(id, data) {
  return instance({
    url: `/course/basis/sort/${id}`,
    method: "put",
    data: data
  })
}

function selves(data) {
  return instance({
    url: api.selves,
    method: "put",
    data: data
  })
}
//编辑
function PuTs(id) {
  return instance({
    url: `/user/${id}`,
    method: "get",
  })
}
function PuTData(id,data) {
  return instance({
    url: `/user/${id}`,
    method: "put",
    data:data
  })
}


export default {
  login,
  menuInfo,
  Table,
  drlDel,
  UpData,
  UPDATE,
  Img,
  sonArea,
  sonAreaId,
  details,
  course,
  Info,
  List,
  Sort,
  selves,
  PuTs,
  PuTData
}