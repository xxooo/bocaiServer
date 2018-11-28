<template>
  <aside id="left-panel">
    <div class="menu-toggler">
      <a href="javascript:;" @click="toggle"><i :class="['iconfont', status ? 'icon-shousuoshourukaobei' : 'icon-shousuodanchu' ]"></i></a>
    </div>
    <nav>
      <ul>
        <li v-for="item in menusData" v-if="item && item.name" v-show="item.isDisplay" :rel-code="item.code" :class="$route.fullPath.indexOf('app') !== -1 ? 'active' : '' ">
          <a :href="'#'+item.path" v-if="!item.children" :class="{active:isActive(item)}">
            <i class="iconfont" :class="item.icon"></i>
            <span class="title">{{item.name}}</span>
          </a>
          <p v-else @click="toggleExpend(item)" class="pointer" :class="{'expend':item.expend}">
            <i class="iconfont icon-jiantou-xia fl-right"></i>  
            <i class="iconfont" :class="item.icon"></i>
            <span class="title">{{item.name}}</span>
          </p>
          <ul v-show="!item.expend">
            <li v-for="item in item.children" v-if="item && item.name" :rel-code="item.code" v-show="item.isDisplay">
              <router-link :to="{path:item.path}" :class="{active:isActive(item)}">
                <i class="iconfont" :class="item.icon"></i>
                <span class="title">{{item.name}}</span>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>
</template>
<script>
import {menus, setLang as setMenuLang} from './../../common/menu.js';
import {setLang, getFirstLanguage} from './../../common/lang.js';
import {mapGetters} from 'vuex';

export default {
  name: 'leftPanel',
  data() {
    return {
      status: Lockr.get('sidebarClose'),
      menus: menus
    };
  },
  computed: {
    ...mapGetters({
        menusData: 'getMenus',
        showLeftMenu: 'getShowLeftMenu'
    })
  },
  async created() {
         // 过滤菜单
         let serverMenus = (await this.$get(`${window.gateway}/account/user/menus`)).result;

         if(serverMenus) {

            this.menus.forEach(m => {
               m.isDisplay = (serverMenus.find(x => x.code == m.code) != undefined);
               (m.code == 'home') && (m.isDisplay = true);
               if(m.children){
                   m.children.forEach(c => {
                       c.isDisplay = (serverMenus.find(x => x.code == c.code) != undefined);
                       c.isDisplay
                   });
               }
           });
           store.commit('setMenus', this.menus);
         }

    },
    methods: {
        //收缩菜单
        toggleExpend(item) {
          let menus = this.menusData;
          menus.forEach(function(n) {
            if (n.code == item.code) {
              bus.$set(n, 'expend', !n.expend)
            }
          })
          store.commit('setMenus', menus);
        },
        //切换状态
        toggle() {
          let sidebarClose = !Lockr.get('sidebarClose');
          this.status = sidebarClose;
          this.$emit('sidebarToggle', sidebarClose);
          Lockr.set('sidebarClose', sidebarClose);
          store.commit('updateShowLeftMenu', !this.showLeftMenu);
        },
        isActive(item) {
          return item.path == 'home' ? this.$route.path == '/home' : (item.path && (this.$route.path.indexOf(item.path) > -1 || (this.$route.path+'/').indexOf(item.path) > -1))
        }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.pointer {
  cursor: pointer;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}

.fl-right {
  float: right;
  position: absolute;
  right: 8px;
}

.expend {
  i.icon-jiantou-xia {
    transition: .1s linear 0s;
    transform: rotate(90deg); 
    -ms-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }
}

#left-panel nav>ul{height: calc(~"100vh - 120px");}
</style>

