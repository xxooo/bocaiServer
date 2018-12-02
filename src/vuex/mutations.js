const mutations = {
  setMenus(state, menus) {
    state.menus = menus;
  },
  updateShowLeftMenu(state,v) {
  	state.showLeftMenu = v;
  },
  showLoading(state, status) {
    state.globalLoading = status
  },
  updateboradFullTitle(state,v) {
  	state.boradFullTitle = v;
  },
  updateUntreated(state,v){
    state.untreated = v;
  },
  updateavatarVuex(state,v) {
    state.avatarVuex = v;
  },
  updateruleId(state,v) {
    state.ruleId = v;
  },
  updateuserInfo(state,v) {
    state.userInfo = v;
  }
}

export default mutations
