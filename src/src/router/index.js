import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  //登录页面
  {
    path: '/login',
    name: 'login',
    component: () => import('views/登录/login')
  },
  //重定向到登录页面
  {
    path: '/',
    redirect: "/login"
  },
  //首页页面
  {
    path: '/Homepage',
    name: 'Homepage',
    component: () => import('views/首页/Homepage'),
    meta: {
      keepAlive: true
    },
    children: [
      // 用户列表
      {
        path: '/User',
        name: 'User',
        component: () => import('views/用户列表/User'),
        meta: {
          keepAlive: true
        },
        children: [
          //学院管理
          {
            path: '/Student',
            name: 'Student',
            component: () => import('views/右侧主体内容/Student'),
            meta: {
              keepAlive: false,
              Bread: [{
                name: "学员管理"
              }]
            },
          },
          //新增/编辑学员
          {
            path: '/student-edit',
            name: 'student-edit',
            component: () => import('views/右侧主体内容/student-edit'),
            meta: {
              keepAlive: false,
              Bread: [{
                path: '/Student',
                name: "学院管理"
              }, {
                name: "新增/编辑学员"
              }]
            }
          },
          //详情
          {
            path: '/details',
            name: 'details',
            component: () => import('views/右侧主体内容/details'),
            meta: {
              keepAlive: false,
              Bread: [{
                path: '/Student',
                name: "学院管理"
              }, {
                name: "学员详情"
              }]
            }
          },
          //讲师管理
          {
            path: '/teacher',
            name: 'teacher',
            component: () => import('views/右侧主体内容/teacher'),
            meta: {
              keepAlive: false,
              Bread: [{
                name: "讲师管理"
              }]
            },
          },
          //助教管理
          {
            path: '/AssistTeacher',
            name: 'AssistTeacher',
            component: () => import('views/右侧主体内容/AssistTeacher'),
            meta: {
              keepAlive: false,
              Bread: [{
                name: "助教管理"
              }]
            },
          },
          //重定向
          {
            path: '/',
            redirect: "/Student"
          }
        ]
      },
      //重定向
      {
        path: '/',
        redirect: "/User"
      },
      //教学
      {
        path: '/Teach',
        name: 'Teach',
        component: () => import('views/用户列表/Teach'),
        children: [
          //教学管理
          {
            path: '/CourseManage',
            name: 'CourseManage',
            component: () => import('views/右侧主体内容/教学/CourseManage'),
            meta: {
              keepAlive: true,
              Bread: [{
                name: "课程管理"
              }]
            },
          },
          //课程分类
          {
            path: '/CourseCatagory',
            name: 'CourseCatagory',
            component: () => import('views/右侧主体内容/教学/CourseCatagory'),
          },
          //分班计划
          {
            path: '/ClassPlan',
            name: 'ClassPlan',
            component: () => import('views/右侧主体内容/教学/ClassPlan'),
          },
          //班级管理
          {
            path: '/ClassManage',
            name: 'ClassManage',
            component: () => import('views/右侧主体内容/教学/ClassManage'),
          },
          // //作业管理
          {
            path: '/HomeworkManage',
            name: 'HomeworkManage',
            component: () => import('views/右侧主体内容/教学/HomeworkManage'),
          },
          //课程表
          {
            path: '/TeachOtoTable',
            name: 'TeachOtoTable',
            component: () => import('views/右侧主体内容/教学/TeachOtoTable'),
          },
          //重定向
          {
            path: '/',
            redirect: "/CourseManage"
          }
        ]
      },
      //题库
      {
        path: '/Question',
        name: 'Question',
        component: () => import('views/用户列表/Question')
      },
      //运营
      {
        path: '/Operation',
        name: 'Operation',
        component: () => import('views/用户列表/Operation')
      },
      //营销
      {
        path: '/Market',
        name: 'Market',
        component: () => import('views/用户列表/Market')
      },
      //商品Shop
      {
        path: '/Shop',
        name: 'Shop',
        component: () => import('views/用户列表/Shop')
      },
      //Finance 财务
      {
        path: '/Finance',
        name: 'Finance',
        component: () => import('views/用户列表/Finance')
      },
      //Statistics 统计
      {
        path: '/Statistics',
        name: 'Statistics',
        component: () => import('views/用户列表/Statistics')
      },
      //Setting 系统
      {
        path: '/Setting',
        name: 'Setting',
        component: () => import('views/用户列表/Setting')
      }
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router