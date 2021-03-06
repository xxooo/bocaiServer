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
  },
  updatebocaiMenu(state,v) {
    state.bocaiMenu = v;
  },
  updateupUserInfo(state,v) {
    state.upUserInfo = v;
  },
  updatebaobiaoQinfo(state,v) {
    state.baobiaoQinfo = v;
  },
  updatebetcUser(state,v) {
    state.betcUser = v;
  },
  updatecompanyList(state,v) {
    state.companyList = v;
  }
}

export default mutations
