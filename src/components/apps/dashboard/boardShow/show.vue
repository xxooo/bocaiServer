<template>
  <div>
  <div class="top-bar">
        <div class="header">
          <div class="x3 title">{{boradTitle}}</div>
          <div class="x8 float-right text-right tool-bar">
            <icon-font @click='goBack' :iconClass='"icon-tuichu1"' :title="$root.langs.common['smartspc.common.goBack']"></icon-font>
            <icon-font @click='fullpage' :iconClass='"icon-touping"' :title="$root.langs.dashboard['smartspc.dashboard.fullScreen']"></icon-font>
          </div>
        </div>        
      </div>

    <div class="main-panel-wapper"> 
        <div class="clearfix">
          <editor :editAble="false" :index="true"></editor>
        </div>     
    </div>
  </div>
</template>
<script>
import "../css/style.less";
// import mock from '../mock'
import {
  mapGetters
} from 'vuex'
export default {
  data: function() {
    return {
      loading: true,
    }
  },
  components: {
    editor: resolve => require(['./../boardDefinition/edit.vue'], resolve), //懒加载
    IconFont: resolve => require(['common/iconfont.vue'], resolve)
  },
  computed: {
    ...mapGetters({
      boradTitle:'getboradTitle'
    }),
    editId: function() {
      return this.$route.params.id
    },
  },
  created: function() {
    let that =this;
    if (this.token) {
      this.fetchData(this.editId);
    }
  },
  updated: function() {
    //_g.closeGlobalLoading();
  },
  mounted() {
    var that = this;
  },
  methods: {
    goBack: function() {
      this.$router.go(-1);
    },
    fetchData: function(id) {

    },
    fullscreen() {
      var docElm = document.documentElement;
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    },
    fullpage: function() {
      store.commit('updateboradFullTitle',this.boradTitle);
      router.push({
        name: 'fullDashboardView',
        id: this.editId
      })
      this.fullscreen()
    },
    loaded: function() {
      this.loading = false
    }
  },
  watch:{
    editId:function(val){
      this.fetchData(val)
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
ul,
li {
  margin: 0;
  padding: 0;
}

p {
  margin-bottom: 0
}

@gray: #d5d8dc;
@red: #fda89a;
@white: #fff;
@h2: #162134;
@border: #d5d8dc;
@movingColor: rgba(126, 123, 230, 0.14);
@editColor: #fb735c;
@editShadowColor: #f1d6cd;
@color1: #162134;
@color2: #abb4bc;
@color3: #6a6e70;
@color4: #fb735c;
@color5: #abb4bc;
@colorBtnPrimary: #fb735c;


@colorIcon: #b1b9c0;
@colorIconHover: #fb735c;
.header {
  height: 50px;
  padding: 10px;
  .title {
    line-height: 50px;
    margin-left: 12px;
    color: #606266;
    font-weight: bold;
    font-size: 16px;
    vertical-align: middle;

  }
  .tool-bar {
    a,
    .link {
      display: inline-block;
      background: #FFFFFF;
      border: 1px solid #D8D8D8;
      border-radius: 4px;
      padding: 0 8px;
      margin-left: 10px;
      height: 30px;
      line-height: 27px;
      font-size: 14px;
      cursor: pointer;
    }
  }
  .iconfont {
    color: #515866;
  }
}
</style>
<style lang="less">
.loadingMask {
  text-align: center;
  height: 400px;
}

.lazy-load {
  position: inherit !important;
}
</style>
