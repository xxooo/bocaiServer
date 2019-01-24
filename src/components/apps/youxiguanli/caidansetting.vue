<template>
  <div id="youxishezhi" class="content-main">
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>游戏管理</el-breadcrumb-item>
        <el-breadcrumb-item>菜单设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="portlet portlet-add">
      <div class="tab">
        <el-transfer v-model="value1" :data="data"></el-transfer>

        <button class="tabBtn btn btn-blue mgr10">确定</button> 
        <button class="tabBtn btn btn-red">取消</button></p>
      </div>
    </div>

  </div>
</template>



<script>
import { mapGetters } from 'vuex';

export default {
  components: {
  },
  data () {
    const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };

    return {
      data: generateData(),
      value1: [2, 4,1],

      caizhongList: [],
      companyId: '',

      bocaiId: 1,
      baseBocaiInfo: {},
      routerName: this.$route.name
    }
  },
  computed: {
    ...mapGetters({
      ruleId:'getruleId',
      userInfo: 'getuserInfo',
      bocaiMenu: 'getbocaiMenu'
    })
  },
  created() {

    this.baseSet();

  },
  mounted(){
  },
  methods: {
    async baseSet() {

      let res = await this.$get(`${window.url}/admin/gameManage/getCompanyBocaiSet?companyId=`+this.companyId);

      if(res.code===200){

        this.caizhongList = res.data;
      }
    },

    async saveoddInfo() {

      console.log('baseBocaiInfo',this.baseBocaiInfo);

      let that = this;

      let obj = {
        userId: this.baseBocaiInfo.userId,
        bocaiId: this.baseBocaiInfo.bocaiId,
        bocaiName: this.baseBocaiInfo.bocaiName,
        minimumBet: this.baseBocaiInfo.minimumBet,
        highestPayout: this.baseBocaiInfo.highestPayout,
        opentime: this.baseBocaiInfo.opentime,
        closetime: this.baseBocaiInfo.closetime,
        isOpen: this.baseBocaiInfo.isOpen ? 1 : 0,
        advanceTime: this.baseBocaiInfo.advanceTime
      }

      NProgress.start();
          await that.$post(`${window.url}/admin/gameManage/bocaiBaseSet`,obj).then((res) => {
            that.$handelResponse(res, (result) => {
              NProgress.done();
              if(result.code===200){
                that.$success(result.msg);
                that.baseSet();
              }
            })
      });
    }


  }
}

</script>

<style scoped>
</style>
