<template>
  <div class="icon-msg">
    <router-link :to="{ path:'/alarm/alarmBoard' }">
     <!-- {{$root.langs.common['smartspc.common.untreated']}}-->
      <el-badge :value="untreated" class="item">
          <a><i class="iconfont icon-xiaoxi"></i></a>
      </el-badge>
    </router-link>
  </div>
</template>

<script>
  import $ from 'jquery';
  import {
    mapState,
    mapGetters
    } from 'vuex';

  export default {
    data() {
    return {
      //messNum:0
    };
  },
  components: {
  },
  computed: {
    ...mapGetters({
      untreated:'getUntreated'
    }),
  },
  mounted: function() {
  },
  created() {
    this.getMessage1();
  },
  methods: {
    async getMessage1(){
      let res =  await this.$get(`${window.gatewayspc}/warm/warm_count`);
      if (res.code == 0){ store.commit('updateUntreated', res.data.count); }
      //setTimeout(this.getMessage1,30000);
    }
  },
  watch: {

  },
  }
</script>

<style lang="less" scoped>
.icon-msg{display: inline-block;margin-right: 30px;}
.icon-msg>a{color: #5a5e66}
.item{top:5px}
i{
    color: #727272;
    border: 1px solid #d8d8d8;
    border-radius: 50%;
    width: 33px;
    height: 33px;
    line-height: 33px;
    font-size: 20px;
    text-align: center;
}
</style>
<style>.icon-msg .el-badge__content{top:10px !important}</style>
