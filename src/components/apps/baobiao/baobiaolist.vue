<template>
  <div id="youxishezhi" class="content-main">
    
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>报表</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'baobiaoquery' }">报表查询</el-breadcrumb-item>
        <el-breadcrumb-item>报表汇总</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="nav">
      <a class="mgr10" v-if="ruleId != 3" @click="returnPage()">返回</a> 
      <span class="mgr10">公司：{{userName}}</span> 
      <span class="mgr10">
        日期：{{baobiaoQinfo.startTime}} 至 {{baobiaoQinfo.endTime}}
      </span> 
      <span class="mgr10">
        游戏类型：{{baobiaoQinfo.bocai.name == '' ? '全部' : baobiaoQinfo.bocai.name}}
      </span> 
      <!-- <span class="mgr10">
        结算方式：信用额度
      </span> --> 
      <span class="mgr10">
        结算状态：{{baobiaoQinfo.cuserOrderStatus == 1 ? '已结算' : '未结算'}}
      </span> 
      <span class="mgr10">
        注单类型：正常注单
      </span>
    </div>

    <div class="portlet">

      <div class="tab" v-if="showList">
        <table>
          <caption style="text-align: left;">会员列表</caption> 
          <thead>
            <tr>
                <th v-if="ruleId == 3">股东名称</th>
                <th v-if="ruleId == 4">总代理名称</th>
                <th v-if="ruleId == 5">代理名称</th>
                <th v-if="ruleId == 6">会员名称</th>
                <th>下注金额</th>
                <th>有效金额</th>
                <th>注数</th>
                <th v-if="ruleId != 6">会员结果</th>
                <th>上级退水</th>
                <th>上级退水金额</th>
                <th v-if="ruleId != 6">退水差</th>
                <th v-if="ruleId == 3">股东</th>
                <th v-if="ruleId == 4">总代理</th>
                <th v-if="ruleId == 5">代理</th>
                <th v-if="ruleId == 6">会员</th>
                <th v-if="ruleId == 3">股东结果</th>
                <th v-if="ruleId == 4">总代理结果</th>
                <th v-if="ruleId == 5">代理结果</th>
                <th v-if="ruleId == 6">会员结果</th>
                <th v-if="ruleId == 3">股东占成</th>
                <th v-if="ruleId == 4">总代理占成</th>
                <th v-if="ruleId == 5">代理占成</th>
                <th>应收下级</th>
                <th v-if="ruleId != 3">应交上级</th>
                <th v-if="ruleId == 3">公司结果</th>
                <th v-if="ruleId == 4">股东结果</th>
                <th v-if="ruleId == 5">总代理结果</th>
                <th v-if="ruleId == 6">代理结果</th>
                <th v-if="ruleId == 3">公司占成</th>
                <th v-if="ruleId == 4">股东占成</th>
                <th v-if="ruleId == 5">总代理占成</th>
                <th v-if="ruleId == 6">代理占成</th>

            </tr>
          </thead> 
          <tr v-for="aUserReport in aUserPage.list">
                <td>{{aUserReport.userName}}</td>
                <td v-if="ruleId == 6"><a style="cursor:pointer;color: #eee;" v-on:click="cUserOrderList(aUserReport.userId,aUserReport.userName)">{{aUserReport.betMoney}}</a></td>
                <td v-else><a style="cursor:pointer;color: #03A9F4;" v-on:click="reportList(aUserReport.userId,aUserReport.userName)">{{aUserReport.betMoney}}</a></td>
                <td>{{aUserReport.effectiveMoney}}</td>
                <td>{{aUserReport.orderNo}}</td>
                <td v-if="ruleId != 6">{{aUserReport.cuserResult}}</td>
                <td>{{aUserReport.dewater | hundredPercentage}}</td>
                <td>{{aUserReport.upLevelDewaterMoney}}</td>
                <td v-if="ruleId != 6">{{aUserReport.dewaterDiss}}</td>
                <td>{{aUserReport.money}}</td>
                <td>{{aUserReport.moneyResult}}</td>
                <td v-if="ruleId != 6">{{aUserReport.occupied | hundredPercentage}}</td>
                <td>{{aUserReport.downLevelIncome}}</td>
                <td v-if="ruleId != 3">{{aUserReport.upLevelPay}}</td>
                <td>{{aUserReport.upMoneyResult}}</td>
                <td>{{aUserReport.upOccupied | hundredPercentage}}</td>
          </tr>
        </table>
      </div>

      <div class="tab" v-if="showList && (cUserPage.list && cUserPage.list.length !=0)">
        <table>
          <caption style="text-align: left;">直属会员</caption> 
          <thead>
            <tr>
                <th>直属会员</th>
                <th>下注金额</th>
                <th>有效金额</th>
                <th>注数</th>
                <th v-if="ruleId != 6">会员结果</th>
                <th>上级退水</th>
                <th>退水金额</th>
                <th v-if="ruleId != 6">退水差</th>
                <th v-if="ruleId == 3">股东</th>
                <th v-if="ruleId == 4">总代理</th>
                <th v-if="ruleId == 5">代理</th>
                <th v-if="ruleId == 6">会员</th>
                <th v-if="ruleId == 3">股东结果</th>
                <th v-if="ruleId == 4">总代理结果</th>
                <th v-if="ruleId == 5">代理结果</th>
                <th v-if="ruleId == 6">会员结果</th>
                <th v-if="ruleId == 3">股东占成</th>
                <th v-if="ruleId == 4">总代理占成</th>
                <th v-if="ruleId == 5">代理占成</th>
                <th v-if="ruleId == 6">会员占成</th>
                <th>应收下级</th>
                <th>应交上级</th>
                <th v-if="ruleId == 3">股东结果</th>
                <th v-if="ruleId == 4">总代理结果</th>
                <th v-if="ruleId == 5">代理结果</th>
                <th v-if="ruleId == 6">会员结果</th>
                <th v-if="ruleId == 3">股东占成</th>
                <th v-if="ruleId == 4">总代理占成</th>
                <th v-if="ruleId == 5">代理占成</th>
                <th v-if="ruleId == 6">会员占成</th>
            </tr>
          </thead> 
          <tr v-for="cUserReport in cUserPage.list">
                <td>{{cUserReport.userName}}</td>
                <td>{{cUserReport.betMoney}}</td>
                <td>{{cUserReport.effectiveMoney}}</td>
                <td>{{cUserReport.orderNo}}</td>
                <td v-if="ruleId != 6">{{cUserReport.cuserResult}}</td>
                <td>{{cUserReport.dewater | hundredPercentage}}</td>
                <td>{{cUserReport.upLevelDewaterMoney}}</td>
                <td v-if="ruleId != 6">{{cUserReport.dewaterDiss}}</td>
                <td>{{cUserReport.money}}</td>
                <td>{{cUserReport.moneyResult}}</td>
                <td>{{cUserReport.occupied | hundredPercentage}}</td>
                <td>{{cUserReport.downLevelIncome}}</td>
                <td>{{cUserReport.upLevelPay}}</td>
                <td>{{cUserReport.upMoneyResult}}</td>
                <td>{{cUserReport.upOccupied | hundredPercentage}}</td>
          </tr>
        </table>
      </div>

      <div class="tab" v-if="!showList">
        <table>
          <caption style="text-align: left;">直属会员</caption> 
          <thead>
            <tr>
                <th>直属会员</th>
                <th>下注金额</th>
                <th>有效金额</th>
                <th>注数</th>
                <th v-if="ruleId != 6">会员结果</th>
                <th>上级退水</th>
                <th>退水金额</th>
                <th v-if="ruleId != 6">退水差</th>
                <th v-if="ruleId == 3">股东</th>
                <th v-if="ruleId == 4">总代理</th>
                <th v-if="ruleId == 5">代理</th>
                <th v-if="ruleId == 6">会员</th>
                <th v-if="ruleId == 3">股东结果</th>
                <th v-if="ruleId == 4">总代理结果</th>
                <th v-if="ruleId == 5">代理结果</th>
                <th v-if="ruleId == 6">会员结果</th>
                <th v-if="ruleId == 3">股东占成</th>
                <th v-if="ruleId == 4">总代理占成</th>
                <th v-if="ruleId == 5">代理占成</th>
                <th v-if="ruleId == 6">会员占成</th>
                <th>应收下级</th>
                <th>应交上级</th>
                <th v-if="ruleId == 3">股东结果</th>
                <th v-if="ruleId == 4">总代理结果</th>
                <th v-if="ruleId == 5">代理结果</th>
                <th v-if="ruleId == 6">会员结果</th>
                <th v-if="ruleId == 3">股东占成</th>
                <th v-if="ruleId == 4">总代理占成</th>
                <th v-if="ruleId == 5">代理占成</th>
                <th v-if="ruleId == 6">会员占成</th>
            </tr>
          </thead> 
          <tr v-for="cUserReport in cUserPage.list">
                <td>{{cUserReport.userName}}</td>
                <td>{{cUserReport.betMoney}}</td>
                <td>{{cUserReport.effectiveMoney}}</td>
                <td>{{cUserReport.orderNo}}</td>
                <td v-if="ruleId != 6">{{cUserReport.cuserResult}}</td>
                <td>{{cUserReport.dewater | hundredPercentage}}</td>
                <td>{{cUserReport.upLevelDewaterMoney}}</td>
                <td v-if="ruleId != 6">{{cUserReport.dewaterDiss}}</td>
                <td>{{cUserReport.money}}</td>
                <td>{{cUserReport.moneyResult}}</td>
                <td>{{cUserReport.occupied | hundredPercentage}}</td>
                <td>{{cUserReport.downLevelIncome}}</td>
                <td>{{cUserReport.upLevelPay}}</td>
                <td>{{cUserReport.upMoneyResult}}</td>
                <td>{{cUserReport.upOccupied | hundredPercentage}}</td>
          </tr>
        </table>
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
      option: 1,
      aUserPage: {},
      cUserPage: {},
      ruleId: '',
      userId: '',
      userName: '',
      currentPage: 1,
      showList: true
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'getuserInfo',
      baobiaoQinfo: 'getbaobiaoQinfo'
    })
  },
  created() {

    this.getbaobiaoList();
  },
  mounted(){
  },
  filters: {
        valueSubstring: function (value) {
            if (value.length > 10) {
                return value.substring(0, 10) + "..";
            } else {
                return value;
            }
        },
        timeTurn: function (value) {
            return fmtDate(value, 2);
        },
        price: function (value) {
            value = Number(value);
            return value.toFixed(2);
        },
        hundredPercentage:function(value){
            return (value*1000*100/1000)+"%";
        }
    },
  methods: {
    reportList(userId,userName) {
      console.log('reportList');

      this.baobiaoQinfo.choiseUserName = userName;
      this.baobiaoQinfo.userId = userId;
      this.showList = true;
      this.option = 1;
      this.getbaobiaoList();
    },
    cUserOrderList(userId,userName) {

      console.log('cUserOrderList');

      this.baobiaoQinfo.choiseUserName = userName;
      this.baobiaoQinfo.userId = userId;
      this.showList = false;
      this.getbaobiaoList();
    },
    returnPage() {
      this.showList = true;
      this.option = 2;
      this.getbaobiaoList();
    },
    async getbaobiaoList() {

      let res = await this.$get(`${window.url}/admin/report/reportList?type=`+this.option+`&reportType=`+this.baobiaoQinfo.reportType+`&cuserOrderStatus=`+this.baobiaoQinfo.cuserOrderStatus+`&startTime=`+this.baobiaoQinfo.startTime+`&endTime=`+this.baobiaoQinfo.endTime+`&currentPage=`+this.currentPage+`&pageSize=10`+`&userId=`+this.baobiaoQinfo.userId+`&bocaiTypeId=`+this.baobiaoQinfo.bocai.id);

      if(res.code===200){
        this.aUserPage = res.aUserPage;
        this.cUserPage = res.cUserPage;
        this.ruleId = res.ruleId;
        this.userId = res.userId;
        this.userName = res.userName;
      }
    }


  }
}

</script>

<style scoped>
</style>
