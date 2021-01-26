import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: "admin",
    //面包屑
    break: []
  },
  mutations: {
    UserName(state, name) {
      state.username = name
    },
    Break(state, name) {
      state.break = name
    }
  },
  actions: {},
  modules: {}
})