import Vue from 'vue';
import Router from 'vue-router';
import store from './vuex/store'
import _g from './assets/js/global'
import _ from 'lodash';

import {
  mapState,
  mapGetters
} from 'vuex'

Vue.use(Router);

let routers = {}

//自动加载components/apps/*./app_config.toml
let apps = require.context('components/apps', true, /app_config.toml$/)
apps.keys().map(generateRoutesFromApps)

// 编译路由
function generateRoutesFromApps(item) {
  let app = apps(item)
  let routes = app.route
  let module = app.module //所属模块
   //console.log('app.name,module',app,module)        
  // window.console && console.log('正在打包app', app.name, app.owner.name, app)
    routes.forEach(function(route) {
      const result = _.pick(route, ['path', 'name', 'meta', 'alias', 'redirect', 'module'])
      result.module = result.module || module

      if (!result.path) {
        return false
      }

      var getChildrenComponent = function(parent, route) {
        if (route.children) {
          parent.children = []
          route.children.forEach(function(item, index, arr) {
            const result = _.pick(item, ['path', 'name', 'meta', 'alias', 'redirect', 'module'])
            result.component = resolve => require(['apps/' + item.component], resolve)
            // result.component = r => require.ensure([], () => r(require('apps/' + item.component)), name)
            parent.children.push(result)
            getChildrenComponent(result, item)
          })
        }
      }

      result.component = resolve => {
          return require(['apps/' + route.component], resolve)
        }

      getChildrenComponent(result, route)
      //判断所属模块，优先判断子模块，再判断整个app模块
      if (result.module) {
        if (!routers[result.module]) {
          routers[result.module] = []
        }
        routers[result.module].push(result)
      }
    })
  }

//window.console && console.log('generate routes from apps,routers', routers)

export default new Router({
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  base: process.env.NODE_ENV === 'production' ? '/portal/' : '/', 
  routes: [
    { path: '/',name: 'index', component: r => require.ensure([], () => r(require('./App')), 'index'),redirect: '/dashboard/boardShow'},
    {
      path: '/dashboard',
      name: 'dashboard',
      component: r => require.ensure([], () => r(require('components/spc')), 'dashboard'),
      meta: { requiresAuth: true, module: 'dashboard' },
      children: [
        { path: '/dashboard/boardDefinition', name: 'boardDefinition', 
          component: r => require.ensure([], () => r(require('components/apps/dashboard/boardDefinition/index.vue')), 'boardDefinition'), meta: { requiresAuth: true }},
        { path: '/dashboard/boardShow', name: 'boardShow', 
          component: r => require.ensure([], () => r(require('components/apps/dashboard/boardShow/index.vue')), 'boardShow'), meta: { requiresAuth: true }},
          { path: '/dashboard/boardShow/show/:id', name: 'toBoardShow', 
          component: r => require.ensure([], () => r(require('components/apps/dashboard/boardShow/show.vue')), 'toBoardShow'), meta: { requiresAuth: true }},
          { path: '/dashboard/boardDefinition/create', name: 'createBoard', 
          component: r => require.ensure([], () => r(require('components/apps/dashboard/boardDefinition/create.vue')), 'createBoard'), meta: { requiresAuth: true }},
          { path: '/dashboard/boardDefinition/setting/:id', name: 'boardSetting', 
          component: r => require.ensure([], () => r(require('components/apps/dashboard/boardDefinition/create.vue')), 'boardSetting'), meta: { requiresAuth: true }},
          { path: '/dashboard/boardDefinition/edit/:id', name: 'boardEdit', 
          component: r => require.ensure([], () => r(require('components/apps/dashboard/boardDefinition/edit.vue')), 'boardEdit'), meta: { requiresAuth: true }}
      ]
    }, {    //报表 设置，菜单路由在spc里面
      path: '/spc',
      name: 'spc',
      component: r => require.ensure([], () => r(require('components/spc')), 'spc'),
      meta: { requiresAuth: true, module: 'spc' },
      children: [
      { path: '/spc/setting', name: 'setting', 
         component: r => require.ensure([], () => r(require('components/common/setting')), 'setting'), meta: { requiresAuth: true }},
        ...routers.spc,
      ]
    },
    {
      path: '/baseData',
      name: 'baseData',
      component: r => require.ensure([], () => r(require('components/spc')), 'baseData'),
      children: [
      { path: '/baseData/attributeDefinition', name: 'attributeDefinition',
        component: r => require.ensure([], () => r(require('components/apps/baseData/attributeDefinition/view.vue')), 'attributeDefinition'), meta: { requiresAuth: true }},
      { path: '/baseData/attributeDefinition/add', name: 'addAttribute',
        component: r => require.ensure([], () => r(require('components/apps/baseData/attributeDefinition/add.vue')), 'addAttribute'), meta: { requiresAuth: true }},
      { path: '/baseData/attributeDefinition/review', name: 'reviewAttribute',
        component: r => require.ensure([], () => r(require('components/apps/baseData/components/review.vue')), 'reviewAttribute'), meta: { requiresAuth: true }},
      { path: '/baseData/attributeDefinition/edit/:id', name: 'editAttribute',
        component: r => require.ensure([], () => r(require('components/apps/baseData/attributeDefinition/add.vue')), 'editAttribute'), meta: { requiresAuth: true }},
         { path: '/baseData/attributeValueSetting', name: 'attributeValueSetting',
        component: r => require.ensure([], () => r(require('components/apps/baseData/attributeValueSetting/view.vue')), 'attributeValueSetting'), meta: { requiresAuth: true }},
         { path: '/baseData/parameterConfiguration', name: 'parameterConfiguration',
        component: r => require.ensure([], () => r(require('components/apps/baseData/parameterConfiguration/view.vue')), 'parameterConfiguration'), meta: { requiresAuth: true }},
         { path: '/baseData/sampleConfiguration', name: 'sampleConfiguration',
        component: r => require.ensure([], () => r(require('components/apps/baseData/sampleConfiguration/view.vue')), 'sampleConfiguration'), meta: { requiresAuth: true }},
         { path: '/baseData/controlLimitsManagement', name: 'controlLimitsManagement',
        component: r => require.ensure([], () => r(require('components/apps/baseData/controlLimitsManagement/view.vue')), 'controlLimitsManagement'), meta: { requiresAuth: true }},
      ]
    },
    {
      path: '/analysis',
      name: 'analysis',
      component: r => require.ensure([], () => r(require('components/spc')), 'analysis'),
      children: [
      { path: '/analysis/correlationAnalysis', name: 'correlationAnalysis',
        component: r => require.ensure([], () => r(require('components/apps/analysis/correlationAnalysis/view.vue')), 'correlationAnalysis'), meta: { requiresAuth: true }},
      { path: '/analysis/analysisBetweenBatches', name: 'analysisBetweenBatches',
        component: r => require.ensure([], () => r(require('components/apps/analysis/analysisBetweenBatches/view.vue')), 'analysisBetweenBatches'), meta: { requiresAuth: true }},
      { path: '/analysis/analysisiInBatch', name: 'analysisiInBatch',
        component: r => require.ensure([], () => r(require('components/apps/analysis/analysisiInBatch/view.vue')), 'analysisiInBatch'), meta: { requiresAuth: true }},
      { path: '/analysis/failureWarning', name: 'failureWarning',
        component: r => require.ensure([], () => r(require('components/apps/analysis/failureWarning/view.vue')), 'failureWarning'), meta: { requiresAuth: true }},
        { path: '/analysis/productQualification', name: 'productQualification',
        component: r => require.ensure([], () => r(require('components/apps/analysis/productQualification/view.vue')), 'productQualification'), meta: { requiresAuth: true }},
        { path: '/analysis/CpkTrendAnalysis', name: 'CpkTrendAnalysis',
        component: r => require.ensure([], () => r(require('components/apps/analysis/CpkTrendAnalysis/view.vue')), 'CpkTrendAnalysis'), meta: { requiresAuth: true }},
        { path: '/analysis/measuredValueDistribution', name: 'measuredValueDistribution',
        component: r => require.ensure([], () => r(require('components/apps/analysis/measuredValueDistribution/view.vue')), 'measuredValueDistribution'), meta: { requiresAuth: true }},
      ]
    },
    {
      path: '/alarm',
      name: 'alarm',
      component: r => require.ensure([], () => r(require('components/spc')), 'alarm'),
      children: [
      { path: '/alarm/alarmBoard', name: 'alarmBoard',
        component: r => require.ensure([], () => r(require('components/apps/alarm/alarmBoard/view.vue')), 'alarmBoard'), meta: { requiresAuth: true }},
      { path: '/alarm/alarmBoardEdit/:warmID', name: 'alarmBoardEdit',
        component: r => require.ensure([], () => r(require('components/apps/alarm/alarmBoard/edit.vue')), 'alarmBoardEdit'), meta: { requiresAuth: true }},
      { path: '/alarm/alarmStatistics', name: 'alarmStatistics',
        component: r => require.ensure([], () => r(require('components/apps/alarm/alarmStatistics/view.vue')), 'alarmStatistics'), meta: { requiresAuth: true }},
      { path: '/alarm/alarmConfiguration', name: 'alarmConfiguration',
        component: r => require.ensure([], () => r(require('components/apps/alarm/alarmConfiguration/view.vue')), 'alarmConfiguration'), meta: { requiresAuth: true }},
      { path: '/alarm/alarmConfigurationEdit/:itemID', name: 'alarmConfigurationEdit',
        component: r => require.ensure([], () => r(require('components/apps/alarm/alarmConfiguration/edit.vue')), 'alarmConfigurationEdit'), meta: { requiresAuth: true }},
      { path: '/alarm/alarmProcess', name: 'alarmProcess',
        component: r => require.ensure([], () => r(require('components/apps/alarm/alarmProcess/view.vue')), 'alarmProcess'), meta: { requiresAuth: true }},
      ]
    },
    {
      path: '/fullpage',
      name: 'fullpage',
      component: r => require.ensure([], () => r(require('components/fullpage')), 'fullpage'),
      children: [
      { path: '/fullpage/dashboard/:id', name: 'fullDashboardView', 
          component: r => require.ensure([], () => r(require('components/apps/dashboard/boardDefinition/fullpage.vue')), 'fullDashboardView'), meta: { requiresAuth: true }}
      ]
    }
  ]
});
