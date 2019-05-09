import Vue from 'vue';
import Router from 'vue-router';
import cookie from './assets/js/cookie';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/', name: 'index', component: r => require.ensure([], () => r(require('./App')), 'index'),redirect: '/login'
    },
    {
      path: '/login', name: 'login', component: r => require.ensure([], () => r(require('@/components/login')), 'login')
    },
    {
      path: '/togambling', 
      name: 'userAgreement',
      meta: {
            requireAuth: true
        },
      component: r => require.ensure([], () => r(require('@/components/userAgreement')), 'userAgreement')
    },
    {
      path: '/gambling', name: 'gambling', component: r => require.ensure([], () => r(require('@/components/gambling')), 'gambling'),
      children: [
        { path: '/gambling/home', name: 'home',
          meta: {                                
              requireAuth: true
          },
          component: r => require.ensure([], () => r(require('@/components/apps/home')), 'home'), meta: { requiresAuth: true }
        },



        // -----------------开盘管理
        { path: '/gambling/kaipan/pcdandan', name: 'pcdandan',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/kaipan/pcdandan')), 'pcdandan'), meta: { requiresAuth: true }
        },
        { path: '/gambling/kaipan/chongqindubo', name: 'chongqindubo',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/kaipan/chongqindubo')), 'chongqindubo'), meta: { requiresAuth: true }
        },
        { path: '/gambling/kaipan/jisudubo', name: 'jisudubo',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/kaipan/jisudubo')), 'jisudubo'), meta: { requiresAuth: true }
        },
        { path: '/gambling/kaipan/shandong11xuan5', name: 'shandong11xuan5',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/kaipan/shandong11xuan5')), 'shandong11xuan5'), meta: { requiresAuth: true }
        },
        { path: '/gambling/kaipan/jiangxi11xuan5', name: 'jiangxi11xuan5',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/kaipan/jiangxi11xuan5')), 'jiangxi11xuan5'), meta: { requiresAuth: true }
        },
        { path: '/gambling/kaipan/guangdong11xuan5', name: 'guangdong11xuan5',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/kaipan/guangdong11xuan5')), 'guangdong11xuan5'), meta: { requiresAuth: true }
        },
        { path: '/gambling/kaipan/beijingpk10', name: 'beijingpk10',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/kaipan/beijingpk10')), 'beijingpk10'), meta: { requiresAuth: true }
        },
        { path: '/gambling/kaipan/jisusaiche', name: 'jisusaiche',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/kaipan/jisusaiche')), 'jisusaiche'), meta: { requiresAuth: true }
        },
        { path: '/gambling/kaipan/luckyairship', name: 'luckyairship',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/kaipan/luckyairship')), 'luckyairship'), meta: { requiresAuth: true }
        },
        { path: '/gambling/kaipan/beijingkuaile8', name: 'beijingkuaile8',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/kaipan/beijingkuaile8')), 'beijingkuaile8'), meta: { requiresAuth: true }
        },
        { path: '/gambling/kaipan/jiangsukuaisan', name: 'jiangsukuaisan',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/kaipan/jiangsukuaisan')), 'jiangsukuaisan'), meta: { requiresAuth: true }
        },
        

        // -----------------游戏管理
        { path: '/gambling/youxiguanli/youxishezhi', name: 'youxishezhi',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/youxiguanli/youxishezhi')), 'youxishezhi'), meta: { requiresAuth: true }
        },
        { path: '/gambling/youxiguanli/peilvchaset', name: 'peilvchaset',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/youxiguanli/peilvchaset')), 'peilvchaset'), meta: { requiresAuth: true }
        },
        { path: '/gambling/youxiguanli/peilvfudongset', name: 'peilvfudongset',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/youxiguanli/peilvfudongset')), 'peilvfudongset'), meta: { requiresAuth: true }
        },

        { path: '/gambling/youxiguanli/pcdandanBase', name: 'pcdandanBase',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/youxiguanli/pcdandanBase')), 'pcdandanBase'), meta: { requiresAuth: true }
        },
        { path: '/gambling/youxiguanli/chongqinduboBase', name: 'chongqinduboBase',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/youxiguanli/chongqinduboBase')), 'chongqinduboBase'), meta: { requiresAuth: true }
        },
        { path: '/gambling/youxiguanli/jisuduboBase', name: 'jisuduboBase',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/youxiguanli/jisuduboBase')), 'jisuduboBase'), meta: { requiresAuth: true }
        },
        { path: '/gambling/youxiguanli/beijingpk10Base', name: 'beijingpk10Base',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/youxiguanli/beijingpk10Base')), 'beijingpk10Base'), meta: { requiresAuth: true }
        },
        { path: '/gambling/youxiguanli/luckyairshipBase', name: 'luckyairshipBase',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/youxiguanli/luckyairshipBase')), 'luckyairshipBase'), meta: { requiresAuth: true }
        },
        { path: '/gambling/youxiguanli/shandong11xuan5Base', name: 'shandong11xuan5Base',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/youxiguanli/shandong11xuan5Base')), 'shandong11xuan5Base'), meta: { requiresAuth: true }
        },
        { path: '/gambling/youxiguanli/guangdong11xuan5Base', name: 'guangdong11xuan5Base',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/youxiguanli/guangdong11xuan5Base')), 'guangdong11xuan5Base'), meta: { requiresAuth: true }
        },
        { path: '/gambling/youxiguanli/jiangxi11xuan5Base', name: 'jiangxi11xuan5Base',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/youxiguanli/jiangxi11xuan5Base')), 'jiangxi11xuan5Base'), meta: { requiresAuth: true }
        },
        { path: '/gambling/youxiguanli/jiangsukuaisanBase', name: 'jiangsukuaisanBase',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/youxiguanli/jiangsukuaisanBase')), 'jiangsukuaisanBase'), meta: { requiresAuth: true }
        },
        { path: '/gambling/youxiguanli/beijingkuaile8Base', name: 'beijingkuaile8Base',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/youxiguanli/beijingkuaile8Base')), 'beijingkuaile8Base'), meta: { requiresAuth: true }
        },
        { path: '/gambling/youxiguanli/jisusaicheBase', name: 'jisusaicheBase',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/youxiguanli/jisusaicheBase')), 'jisusaicheBase'), meta: { requiresAuth: true }
        },
        { path: '/gambling/youxiguanli/tuishuiset', name: 'tuishuiset',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/youxiguanli/tuishuiset')), 'tuishuiset'), meta: { requiresAuth: true }
        },
        { path: '/gambling/youxiguanli/kaipanshezhi', name: 'kaipanshezhi',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/youxiguanli/kaipanshezhi')), 'kaipanshezhi'), meta: { requiresAuth: true }
        },
        { path: '/gambling/youxiguanli/kaijiangjieguo', name: 'kaijiangjieguo',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/youxiguanli/kaijiangjieguo')), 'kaijiangjieguo'), meta: { requiresAuth: true }
        },
        { path: '/gambling/youxiguanli/caidansetting', name: 'caidansetting',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/youxiguanli/caidansetting')), 'caidansetting'), meta: { requiresAuth: true }
        },
        { path: '/gambling/youxiguanli/buhuosetting', name: 'buhuosetting',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/youxiguanli/buhuosetting')), 'buhuosetting'), meta: { requiresAuth: true }
        },
        { path: '/gambling/youxiguanli/lotteryResults', name: 'lotteryResults',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/youxiguanli/lotteryResults')), 'lotteryResults'), meta: { requiresAuth: true }
        },


        // -----------------帐户管理
        { path: '/gambling/userManager/subuser', name: 'subuser',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/userManager/subuser')), 'subuser'), meta: { requiresAuth: true }
        },
        { path: '/gambling/userManager/addsubuser', name: 'addsubuser',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/userManager/addsubuser')), 'addsubuser'), meta: { requiresAuth: true }
        },
        { path: '/gambling/userManager/updatesubuser', name: 'updatesubuser',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/userManager/addsubuser')), 'updatesubuser'), meta: { requiresAuth: true }
        },
        { path: '/gambling/userManager/gudong', name: 'gudong',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/userManager/gudong')), 'gudong'), meta: { requiresAuth: true }
        },
        { path: '/gambling/userManager/addgudong', name: 'addgudong',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/userManager/addgudong')), 'addgudong'), meta: { requiresAuth: true }
        },
        { path: '/gambling/userManager/updategudong', name: 'updategudong',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/userManager/updategudong')), 'updategudong'), meta: { requiresAuth: true }
        },
        { path: '/gambling/userManager/:userlevel/tuishuisheding', name: 'tuishuisheding',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/userManager/tuishuisheding')), 'tuishuisheding'), meta: { requiresAuth: true }
        },
        { path: '/gambling/userManager/huiyuan', name: 'huiyuan',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/userManager/huiyuan')), 'huiyuan'), meta: { requiresAuth: true }
        },
        { path: '/gambling/userManager/addhuiyuan', name: 'addhuiyuan',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/userManager/addhuiyuan')), 'addhuiyuan'), meta: { requiresAuth: true }
        },
        { path: '/gambling/userManager/updatehuiyuan', name: 'updatehuiyuan',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/userManager/updatehuiyuan')), 'updatehuiyuan'), meta: { requiresAuth: true }
        },
        { path: '/gambling/userManager/zongdaili', name: 'zongdaili',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/userManager/zongdaili')), 'zongdaili'), meta: { requiresAuth: true }
        },
        { path: '/gambling/userManager/addzongdaili', name: 'addzongdaili',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/userManager/addzongdaili')), 'addzongdaili'), meta: { requiresAuth: true }
        },
        { path: '/gambling/userManager/updatezongdaili', name: 'updatezongdaili',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/userManager/updatezongdaili')), 'updatezongdaili'), meta: { requiresAuth: true }
        },
        { path: '/gambling/userManager/daili', name: 'daili',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/userManager/daili')), 'daili'), meta: { requiresAuth: true }
        },
        { path: '/gambling/userManager/adddaili', name: 'adddaili',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/userManager/adddaili')), 'adddaili'), meta: { requiresAuth: true }
        },
        { path: '/gambling/userManager/updatedaili', name: 'updatedaili',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/userManager/updatedaili')), 'updatedaili'), meta: { requiresAuth: true }
        },
        { path: '/gambling/userManager/hidemember', name: 'hidemember',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/userManager/hidemember')), 'hidemember'), meta: { requiresAuth: true }
        },
        { path: '/gambling/userManager/addhidemember', name: 'addhidemember',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/userManager/addhidemember')), 'addhidemember'), meta: { requiresAuth: true }
        },
        { path: '/gambling/userManager/updatehidemember', name: 'updatehidemember',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/userManager/updatehidemember')), 'updatehidemember'), meta: { requiresAuth: true }
        },


        // -----------------系统管理
        { path: '/gambling/systemManager/huiyuangonggao', name: 'huiyuangonggao',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/systemManager/huiyuangonggao')), 'huiyuangonggao'), meta: { requiresAuth: true }
        },
        { path: '/gambling/systemManager/huiyuanzaixian', name: 'huiyuanzaixian',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/systemManager/huiyuanzaixian')), 'huiyuanzaixian'), meta: { requiresAuth: true }
        },
        { path: '/gambling/systemManager/webSet', name: 'webSet',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/systemManager/webSet')), 'webSet'), meta: { requiresAuth: true }
        },
        { path: '/gambling/systemManager/dailiOnline', name: 'dailiOnline',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/systemManager/dailiOnline')), 'dailiOnline'), meta: { requiresAuth: true }
        },
        { path: '/gambling/systemManager/userActive', name: 'userActive2',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/systemManager/userActive')), 'userActive2'), meta: { requiresAuth: true }
        },

        // -----------------报表  绑定IP 
        { path: '/gambling/baobiao/baobiaoquery', name: 'baobiaoquery',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/baobiao/baobiaoquery')), 'baobiaoquery'), meta: { requiresAuth: true }
        },
        { path: '/gambling/baobiao/baobiaolist', name: 'baobiaolist',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/baobiao/baobiaolist')), 'baobiaolist'), meta: { requiresAuth: true }
        },

        { path: '/gambling/settingIP', name: 'settingIP',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/adminPage/setip')), 'settingIP'), meta: { requiresAuth: true }
        },

        // -----------------注单查询
        { path: '/gambling/betManager/betquery', name: 'betquery',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/betManager/betquery')), 'betquery'), meta: { requiresAuth: true }
        },
        { path: '/gambling/betManager/lineBet', name: 'lineBet',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/betManager/lineBet')), 'lineBet'), meta: { requiresAuth: true }
        },
        { path: '/gambling/betManager/replenishBet', name: 'replenishBet',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/betManager/replenishBet')), 'replenishBet'), meta: { requiresAuth: true }
        },
         // -----------------财务管理
        { path: '/gambling/finance/rechargeAudit', name: 'rechargeAudit',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/finance/rechargeAudit')), 'rechargeAudit'), meta: { requiresAuth: true }
        },
        { path: '/gambling/finance/forwardAudit', name: 'forwardAudit',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/finance/forwardAudit')), 'forwardAudit'), meta: { requiresAuth: true }
        },
        { path: '/gambling/finance/prepaid', name: 'prepaid',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/finance/prepaid')), 'prepaid'), meta: { requiresAuth: true }
        },



//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -----------------注单查询------------------------管理员页面
        { path: '/adminPage/bettingManage', name: 'bettingManage',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/adminPage/bettingManage')), 'bettingManage'), meta: { requiresAuth: true }
        },
        { path: '/adminPage/caizhongsetting', name: 'caizhongsetting',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/adminPage/caizhongsetting')), 'caizhongsetting'), meta: { requiresAuth: true }
        },
        { path: '/adminPage/kaipansetting', name: 'kaipansetting',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/adminPage/kaipansetting')), 'kaipansetting'), meta: { requiresAuth: true }
        },
        { path: '/adminPage/kaijiangsetting', name: 'kaijiangsetting',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/adminPage/kaijiangsetting')), 'kaijiangsetting'), meta: { requiresAuth: true }
        },
        { path: '/adminPage/orderClean', name: 'orderClean',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/adminPage/orderClean')), 'orderClean'), meta: { requiresAuth: true }
        },
        { path: '/adminPage/setip', name: 'setip',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/adminPage/setip')), 'setip'), meta: { requiresAuth: true }
        },
        { path: '/adminPage/childUserManage', name: 'childUserManage',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/adminPage/childUserManage')), 'childUserManage'), meta: { requiresAuth: true }
        },
        { path: '/adminPage/company', name: 'company',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/adminPage/company')), 'company'), meta: { requiresAuth: true }
        },
        { path: '/adminPage/yunyingmanager', name: 'yunyingmanager',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/adminPage/yunyingmanager')), 'yunyingmanager'), meta: { requiresAuth: true }
        },
        { path: '/adminPage/tuishuisetting', name: 'tuishuisetting',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/adminPage/tuishuisetting')), 'tuishuisetting'), meta: { requiresAuth: true }
        },
        { path: '/adminPage/mainDailiOnline', name: 'mainDailiOnline',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/adminPage/mainDailiOnline')), 'mainDailiOnline'), meta: { requiresAuth: true }
        },
        { path: '/adminPage/mainUserOnline', name: 'mainUserOnline',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/adminPage/mainUserOnline')), 'mainUserOnline'), meta: { requiresAuth: true }
        },
        { path: '/adminPage/userActive/:id', name: 'userActive',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/adminPage/userActive')), 'userActive'), meta: { requiresAuth: true }
        },
        { path: '/adminPage/messageInfo/:id', name: 'messageInfo',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/adminPage/messageInfo')), 'messageInfo'), meta: { requiresAuth: true }
        },
        { path: '/adminPage/mainUserMessage', name: 'mainUserMessage',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/adminPage/mainUserMessage')), 'mainUserMessage'), meta: { requiresAuth: true }
        },
        { path: '/adminPage/userBettingManage', name: 'userBettingManage',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/adminPage/userBettingManage')), 'userBettingManage'), meta: { requiresAuth: true }
        },
      ]
    }
  ]
});


router.beforeEach((to, from, next) => {

  let token = cookie.getCookie('accesstoken');

  //console.log('token',token);

    if (to.matched.some(r => r.meta.requireAuth)) {
      NProgress.start();
        if (token) {
            next();
        }
        else {
            //next();
            next({
                path: '/login'
            })
            NProgress.done();
        }
    }
    else {
        NProgress.start();  
        next();
    }
});

router.afterEach(transition => {
  NProgress.done()
})

export default router;