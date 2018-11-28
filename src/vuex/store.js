import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import state from './state';
import mutations from './mutations';
import getters from './getters';
import actions from './actions';

//自动加载components/apps/*./vuex
let modules = {}
let apps = require.context('components/apps', true, /vuex.js$/)
apps.keys().map(generateVuexFromApps)

// 编译
function generateVuexFromApps(item) {
  let module = apps(item).default
  let name = item.split('/')[1]
  // window.console && console.log('正在添加vuex', name, module)
  modules[name] = module
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules
})
