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