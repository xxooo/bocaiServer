import Vue from 'vue'
import App from './App'
import router from './router.js'
import store from './vuex/store'

import Lockr from 'lockr';
import _ from 'lodash';
import _g from './assets/js/global';
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import '../theme/index.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
import locale from 'element-ui/lib/locale'
import $ from 'jquery'
import LazyRender from 'vue-lazy-render'
Vue.use(LazyRender)
import config from './common/config.js'
Vue.use(config)
import util from './common/util.js'
Vue.use(util)
import cookie from './common/cookie'
import request from './common/request.js'
Vue.use(request)

Vue.config.productionTip = false;

axios.defaults.timeout = 1000 * 30;

window.router = router;
window.store = store;
window.axios = axios;
window._ = _;
window._g = _g;
window.Lockr = Lockr;
window.cookie = cookie;
const bus = new Vue();
window.bus = bus;

(async function () {

    router.beforeEach((to, from, next) => {
        NProgress.start();
        next();
    });

    let token = cookie.getCookie('token');

    if(!token) {
        window.location.href = `${window.login}/index.html?redirect_url=${window.location.href}`;
    }
    let opts = { headers: {token} };

    // access_token 每次都会写入
    let res = await axios.get(`${window.gateway}/account/common/access-token?appkey=${window.appkey}`,opts);
    cookie.setCookie("accesstoken", res.data.result);

    //获取用户信息
    let userRes = await axios.get(`${window.account}/user/profile`,{
              headers: {
                  accesstoken:res.data.result,
              }
    });
    cookie.setCookie("currUser", JSON.stringify(userRes.data.result))
    cookie.setCookie("account", userRes.data.result.account);
    await setLang();  // 页面首次加载，需要更新语言

    router.afterEach(transition => {
      NProgress.done()
    })

    // 视图必须在获取到access_token 和语言后渲染
    window.getVue = new Vue({
      el: '#app',
      router,
      store,
    /*  i18n,*/
      template: '<App/>',
      components: { App },
      data: {langs}
    });

  if(getFirstLanguage() == 'en-US') {
    locale.use(enLocale)
  } else if(getFirstLanguage() == 'zh-CN') {
    locale.use( zhLocale)
  } else if(getFirstLanguage() == 'zh-TW') {
    locale.use( tWLocale)
  }

  await setMenuLang();


})().catch(err => {
    console.error('geting access token error...', err);
});
