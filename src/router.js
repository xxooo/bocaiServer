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

        
        { path: '/gambling/userManager/subuser', name: 'subuser',
          meta: {
              requireAuth: true,
          },
          component: r => require.ensure([], () => r(require('@/components/apps/userManager/subuser')), 'subuser'), meta: { requiresAuth: true }
        }

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
            next();
            // next({
            //     path: '/login'
            // })
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