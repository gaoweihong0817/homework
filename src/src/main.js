import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入的element插件
import './plugins/element.js'
//挂载http/http
import http from "@/http/http"
Vue.prototype.$axios = http

//面包屑
router.beforeEach((to, from, next) => {
  // console.log(to.meta.Bread)
  store.commit("BREAD", to.meta.Bread)
  next()
})

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')