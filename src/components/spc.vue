<template>
  <div :class="{ 'page-sidebar-closed' : !showLeftMenu }" id="subapp">
    <page-header ></page-header>
    <left-panel  ></left-panel>
    <div id="main">
      <transition name="fade" mode="out-in" appear>
        <router-view :user="user"></router-view>
      </transition>
      <page-footer></page-footer>
    </div>
  </div>
</template>

<script>

import PageHeader from 'components/common/pageheader';
import LeftPanel from 'components/common/leftpanel';
import PageFooter from 'components/common/pagefooter';
import {mapState,mapGetters} from 'vuex';

export default {
  components: {
    PageHeader,
    LeftPanel,
    PageFooter
  },
  data() {
    return {
      user:{}
    }
  },
  async created() {
         let that = this;
         // 获取当前用户
         this.user = await this.$currUser();
  },
  computed: {
    ...mapGetters({
        showLeftMenu: 'getShowLeftMenu'
    })
  },
  methods: {
  },
  mounted() {
  },
  updated() {
  }
};
</script>
<style lang="less">
@import "../assets/less/common.less";
</style>
