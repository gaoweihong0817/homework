import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  //登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/login')
  }, {
    redirect: "/login",
    path: '/'
  },
  //进入首页
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/Index/index'),
    meta: {
      keepAlive: true
    },
    children: [
      //首页
      {
        path: '/hollerword',
        name: 'hollerword',
        component: () => import('@/views/HollerWord/hollerword'),
        meta: {
          keepAlive: false,
          break: [{
            name: "首页"
          }]
        }
      }, {
        redirect: "/hollerword",
        path: '/'
      },
      //商品管理
      {
        path: '/goods',
        name: 'goods',
        component: () => import('@/views/goods/goods'),
        meta: {
          keepAlive: true,
          break: [{
            name: "商品管理"
          }]
        }
      }
    ]
  },


]

const router = new VueRouter({
  routes
})

export default router