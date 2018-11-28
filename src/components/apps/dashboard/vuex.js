import Vue from 'vue';
import request from './../../../common/request.js';
Vue.use(request);

const state = {
  boradInfo:{},
  boradTitle: '',
  proNameList: [],
  dataSource: '',
  editAble: false,
  refresh: 30000,
  gridcolumns: 8,
  watermark: ''

};

const getters = {
  getboradInfo: state => state.boradInfo,
  getboradTitle: state => state.boradTitle,
  getproNameList: state => state.proNameList,
  getdataSource: state => state.dataSource,
  geteditAble: state => state.editAble,
  getrefresh: state => state.refresh,
  getgridcolumns: state => state.gridcolumns,
  getwatermark: state => state.watermark

};

const actions = {

  fetchboradInfo({commit,state},v) {
    commit('updateboradInfo',v);
  },

  fetchboradTitle({commit,state},v) {
    commit('updateboradTitle',v);
  },
  async fetchproNameList({commit,state}) {

    let prjData = await $get(`${window.gatewayspc}/infra/prj`);

          if(prjData.code==0){
            store.commit('updateproNameList',prjData.data);
          }

  },

};

// mutations负责修改state
const mutations = {
  updateboradInfo(state,v) {
    state.boradInfo = v;
  },
  updateboradTitle(state,v) {
    state.boradTitle = v;
  },
  updateproNameList(state,v) {
    state.proNameList = v;
  },
  updatedataSource(state,v) {
    state.dataSource = v;
  },
  updateeditAble(state,v) {
    state.editAble = v;
  },
  updaterefresh(state,v) {
    state.refresh = v;
  },
  updategridcolumns(state,v) {
    state.gridcolumns = v;
  },
  updatewatermark(state,v) {
    state.watermark = v;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
