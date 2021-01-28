import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import createPersistedState from 'vuex-persistedstate'
export default new Vuex.Store({
  state: {
    it: {},
    //面包屑
    Bread:[]
  },
  mutations: {
    children(state, data) {
      state.it = data
    },
    BREAD(state,data){
      state.Bread=data
    }
  },
  actions: {},
  modules: {},
  // plugins: [createPersistedState({
  //   storage: sessionStorage,
  //   key: "it"
  // })] //会自动保存创建的状态。刷新还在
})