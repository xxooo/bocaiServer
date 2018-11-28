<template>
  <div>
    <header id="header">
      <div class="logo fullTitle">
        <router-link :to="{name:'home'}">
          <div :style="{'background-image':'url('+logo+')'}" class="logoContainor"></div>
          <h3>Quality Cloud SPC -- {{this.boradFullTitle}}</h3>
        </router-link>
      </div>
      <div class="top-bar">
        <i class="iconfont icon-icons64x6445 closeFont" @click="goback"></i>
      </div>
    </header>
    <div id="main" class="fullpage">
      <transition name="fade" mode="out-in" appear>
        <router-view v-loading="showLoading"></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
import "assets/less/common.less"

import $ from 'jquery'
import {
  mapGetters
} from 'vuex';

export default {
  components: {},
  data() {
    return {
      logo: 'static/img/logo_white.svg'
    }
  },
  computed: {
    ...mapGetters({
      boradFullTitle:'getboradFullTitle'
    }),
    showLoading() {
      return store.state.globalLoading
    },
  },
  methods: {
    // 退出全屏
    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    },
    goback() {
      this.exitFullscreen()
      router.go(-1)
    }
  },
  mounted() {
    let that =this
    $(document).keydown(function(event){
　　　　if(event.keyCode == 27){
          that.goback()
　　　　}
　　});
    //      this.toggleClass(document.body,'black');
    document.getElementsByTagName('html')[0].className='fullscreen'    
  },
  beforeDestroy() {
    document.getElementsByTagName('html')[0].className=''
  },
  updated() {
  },
  created() {
    console.log('外外外fullpage');
  },
};
</script>
<style lang="less" scoped>
.fullTitle H3{
  color: #fff;
}

.closeFont {
  font-size: 30px;
  position: absolute;
  top: 15px;
  right: 10px;
}

#header {
  background: #1B1B1B;
  .top-bar {
    background: #1B1B1B;
  }
}

#main {
  background: #f2f3f7;
  .top-bar {
    color: #c6cace;
  }
}


</style>
<style lang="less">
@import '../assets/less/biggerhome.less';
</style>
