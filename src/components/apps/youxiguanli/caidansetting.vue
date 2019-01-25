<template>
  <div id="caidansetting" class="content-main">
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>游戏管理</el-breadcrumb-item>
        <el-breadcrumb-item>菜单设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="portlet portlet-add">
      <div class="tab">

        <el-transfer
          :titles="['可分配菜单', '已分配菜单']"
          :button-texts="['移除', '添加']"
          target-order="push"
          v-model="value2"
          :data="data3">
        </el-transfer>

        <el-button size="mini" @click="savecaidan()">确定</el-button>
        <el-button size="mini" @click="baseSet()">取消</el-button>

        <!-- <button class="tabBtn btn btn-blue mgr10">确定</button> 
        <button class="tabBtn btn btn-red">取消</button> -->
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
    return {
      value2: [],
      caizhongList: [],
      companyId: '',
      allotList: [],  //可分配 
      choiseList: [], //已分配


      bocaiId: 1,
      baseBocaiInfo: {},
      routerName: this.$route.name
    }
  },
  computed: {
    ...mapGetters({
      ruleId:'getruleId',
      userInfo: 'getuserInfo',
    }),
    data3() {
      let data = [];
        this.choiseList.forEach((item, index) => {
          data.push({
            label: item.bocaiName,
            key: item.bocaiId
          });
        });
        this.allotList.forEach((item, index) => {
          data.push({
            label: item.bocaiTypeName,
            key: item.bocaiTypeId
          });
        });
        return data;
    }
  },
  created() {

    this.baseSet();

  },
  mounted(){
  },
  methods: {
    async baseSet() {
      this.value2 = [];

      let res = await this.$get(`${window.url}/admin/gameManage/getCompanyBocaiSet?companyId=`+this.companyId);

      if(res.code===200){
        this.allotList = res.data.allotList;
        this.choiseList = res.data.choiseList;


        this.choiseList.forEach((item, index) => {

          this.value2.push(
            item.bocaiId
          );
        });
      }
    },

    async savecaidan() {

      console.log('value2',this.value2);

      let that = this;

      let idlist = '';


      for(let n in this.value2){
        idlist += this.value2[n];
        if(n != this.value2.length-1){
            idlist += ",";
        }       
      }


      let obj = {
        companyId: '',
        bocaiTypeIds: idlist
      }

      NProgress.start();
          await that.$post(`${window.url}/admin/gameManage/bocaiSortSet`,obj).then((res) => {
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
<style lang="less">
#caidansetting {

  .el-checkbox__input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;
  }
  .el-checkbox {
    text-align: left;
  }
  .el-checkbox-group.el-transfer-panel__list .el-checkbox__input {
    position: absolute;
  }
  .el-transfer-panel {
    width: 400px;
  }

  .el-transfer {
    margin-bottom: 50px;
    margin-top: 50px;
  }
}
</style>