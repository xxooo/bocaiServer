const state = {
  proInfo: {},
  attValueInfo: {},
  configProId:''
};

const getters = {
  getproInfo: state => state.proInfo,
  getattValueInfo: state => state.attValueInfo,
  getconfigProId: state => state.ConfigProId
};

const actions = {
  setproInfo({ commit , state}, v) {
    commit('updateproInfo', v)
  },
  setattValueInfo({ commit , state}, v) {
    commit('updateattValueInfo', v)
  },
  setconfigProId({ commit , state}, v) {
    commit('updateconfigProId', v)
  }
};

const mutations = {
  updateproInfo(state, v) {
    state.proInfo = v;
  },
  updateattValueInfo(state, v) {
    state.attValueInfo = v;
  },
  updateconfigProId(state, v) {
    state.configProId = v;
  }
  
};

export default {
  state,
  getters,
  actions,
  mutations,
};
