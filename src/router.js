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
        { path: '/gambling/chongqindubo', name: 'chongqindubo',
          meta: {                                
              requireAuth: true
          },
          component: r => require.ensure([], () => r(require('@/components/apps/bocai/chongqindubo')), 'chongqindubo'), meta: { requiresAuth: true }
        },
        { path: '/gambling/luckyairship', name: 'luckyairship',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/bocai/luckyairship')), 'luckyairship'), meta: { requiresAuth: true }
        },
        { path: '/gambling/beijingpk10', name: 'beijingpk10',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/bocai/beijingpk10')), 'beijingpk10'), meta: { requiresAuth: true }
        },
        { path: '/gambling/shandong11xuan5', name: 'shandong11xuan5',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/bocai/shandong11xuan5')), 'shandong11xuan5'), meta: { requiresAuth: true }
        },
        { path: '/gambling/guangdong11xuan5', name: 'guangdong11xuan5',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/bocai/guangdong11xuan5')), 'guangdong11xuan5'), meta: { requiresAuth: true }
        },
        { path: '/gambling/jiangxi11xuan5', name: 'jiangxi11xuan5',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/bocai/jiangxi11xuan5')), 'jiangxi11xuan5'), meta: { requiresAuth: true }
        },
        { path: '/gambling/pcdandan', name: 'pcdandan',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/bocai/pcdandan')), 'pcdandan'), meta: { requiresAuth: true }
        },
        { path: '/gambling/jiangsukuaisan', name: 'jiangsukuaisan',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/bocai/jiangsukuaisan')), 'jiangsukuaisan'), meta: { requiresAuth: true }
        },
        { path: '/gambling/beijingkuaile8', name: 'beijingkuaile8',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/bocai/beijingkuaile8')), 'beijingkuaile8'), meta: { requiresAuth: true }
        },
        { path: '/gambling/jisusaiche', name: 'jisusaiche',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/bocai/jisusaiche')), 'jisusaiche'), meta: { requiresAuth: true }
        },
        { path: '/gambling/jisudubo', name: 'jisudubo',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/bocai/jisudubo')), 'jisudubo'), meta: { requiresAuth: true }
        },

        
        
        
        { path: '/gambling/instantorder', name: 'instantorder',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/submenu/instantorder')), 'instantorder'), meta: { requiresAuth: true }
        },
        { path: '/gambling/bettingHistory', name: 'bettingHistory',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/submenu/bettingHistory')), 'bettingHistory'), meta: { requiresAuth: true }
        },
        { path: '/gambling/personalinfo', name: 'personalinfo',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/submenu/personalinfo')), 'personalinfo'), meta: { requiresAuth: true }
        },
        { path: '/gambling/caiwumanager', name: 'caiwumanager',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/submenu/caiwumanager')), 'caiwumanager'), meta: { requiresAuth: true }
        },
        { path: '/gambling/lotteryResults', name: 'lotteryResults',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/submenu/lotteryResults')), 'lotteryResults'), meta: { requiresAuth: true }
        },
        { path: '/gambling/gameRule', name: 'gameRule',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/submenu/gameRule')), 'gameRule'), meta: { requiresAuth: true }
        }
      ]
    }
  ]
});


router.beforeEach((to, from, next) => {

  let token = cookie.getCookie('accesstoken');

    if (to.matched.some(r => r.meta.requireAuth)) {
      NProgress.start();
        if (token) {
            next();
        }
        else {
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