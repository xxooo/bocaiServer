<template>
  <div class="r">
    刷新频率 :
    <select v-model="resultTime" class="mgr10">
      <option value="30000">30秒</option> 
      <option value="60000">60秒</option> 
      <option value="90000">90秒</option>
    </select> 
    <button class="btn btn-blue" @click="getPrizeResult()">立即刷新</button>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      t: null, //轮询
      resultTime: '30000',
      parms: {}
    }
  },
  async created() {

    this.getPrizeResult();

  },
  computed: {
  },
  beforeDestroy: function() {
      if (this.t) {
        clearTimeout(this.t)
      }
  },
  methods: {
    async getPrizeResult() { 
      let that = this;

      this.openPrizeTime = this.$timestampToTime(new Date());

      //console.log('openPrizeTime',this.openPrizeTime);

      let res = await this.$get(`${window.url}/admin/bocai/odds?bocaiCategoryId=`+this.parms.bocaiCategoryId+`&isBase=`+this.parms.isBase+`&bocaiTypeId=`+this.parms.curBocaiTypeId);
          if(res.code===200){
            that.$emit('childByReset', res.oddsList);
          }   

      if (this.t) {
        clearTimeout(this.t)
      }

      this.t = setTimeout(this.getPrizeResult, this.resultTime*1);
    },
  },
  mounted() {
    bus.$on('getRefreshTime', (parms) => {
        console.log('parms',parms);

        this.parms = parms;
    });

  },
  updated() {
  }
};


</script>
<style scoped>
.mgr10 {
    margin-right: 10px;
}

.btn-blue {
    color: #fff;
    background-color: #0094c8;
    border-color: #2ca9e1;
}
.btn {
    display: inline-block;
    border-width: 1px;
    padding: 3px 16px;
    border-radius: 5px;
    box-shadow: 1px 1px 2px #ddd;
}
.btn, .tabBtn {
    cursor: pointer;
}

</style>
<style lang="less">

</style>