<template>
  <div id="youxishezhi" class="content-main">
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>游戏管理</el-breadcrumb-item>
        <el-breadcrumb-item>开奖结果</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="nav">
      <span>游戏类型:
        <el-select v-model="bocaiId" @change="baseSet()" placeholder="请选择" size="mini">
          <el-option
            v-for="item in bocaiMenu"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </span>
    </div>

    <div class="portlet portlet-add">
      <div class="tab">
        <table>
          <thead>
            <tr>
              <th colspan="3">游戏设置</th>
            </tr>
          </thead> 
          <tr>
            <td width="20%" class="tar td-bg">最低下注金额:</td> 
            <td width="40%" class="textleft">
              <input v-model="baseBocaiInfo.minimumBet" type="text">
            </td>  
            <td width="40%">
              <div><i class="icon-exclamation-sign"></i>金额仅可输入整数，并且不可小于0</div>
            </td>
          </tr> 
          <tr>
            <td class="tar td-bg">最高派彩:</td> 
            <td class="textleft">
              <input v-model="baseBocaiInfo.highestPayout" type="text">
            </td> 
            <td><div><i class="icon-exclamation-sign"></i>
                   仅可输入整数，并且不可小于0
                 </div>
            </td>
          </tr> 
          <tr>
            <td class="tar td-bg">开奖时间:</td> 
            <td class="textleft"><input v-model="baseBocaiInfo.opentime" type="text"></td>
            <td>
              <div>
              <i class="icon-exclamation-sign"></i>
                   用于调整开盘时间，实际开奖时间以官方为准
              </div>
            </td>
          </tr>
          <tr>
            <td class="tar td-bg">封盘时间:</td> 
            <td class="textleft"><input v-model="baseBocaiInfo.closetime" type="text"> 秒 </td> 
            <td>
              <div><i class="icon-exclamation-sign"></i>
                   提前多少秒封盘
              </div>
            </td>
          </tr> 
          <tr>                      
            <td width="0%" class="tar">开关游戏:</td> 
            <td class="textleft">
              <label><input v-model="baseBocaiInfo.isOpen" type="radio" value="true"> 开启 </label> 
              <label><input v-model="baseBocaiInfo.isOpen" type="radio" value="false"> 关闭</label>
            </td> 
            <td width="20%"><i class="icon-exclamation-sign"></i> 请选择开启或关闭
            </td>
          </tr>
        </table> 
        <div class="inner">
          <button class="btn-submit" @click="saveoddInfo()">保存</button> 
          <button class="btn-cancel" @click="baseSet()">取消</button>
        </div>
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
      let res = await this.$get(`${window.url}/admin/gameManage/getBocaiBaseSet?bocaiTypeId=`+this.bocaiId+`&userId=`+this.userInfo.id);

      if(res.code===200){

        this.baseBocaiInfo = res.data;
        this.baseBocaiInfo.isOpen = this.baseBocaiInfo.isOpen == 1 ? true : false;
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
