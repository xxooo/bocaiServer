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
      <!-- <a class="mgr10" v-if="ruleId != 3" @click="returnPage()">返回</a>  -->
      <button class="tabBtn btn btn-blue mgr10" v-if="ruleId != 3" @click="returnPage">返回</button> 

      <span class="mgr10" v-if="ruleId == 3">公司：{{baobiaoQinfo.choiseUserName}}</span> 
      <span class="mgr10" v-if="ruleId == 4">股东：{{baobiaoQinfo.choiseUserName}}</span> 
      <span class="mgr10" v-if="ruleId == 5">总代理：{{baobiaoQinfo.choiseUserName}}</span> 
      <span class="mgr10" v-if="ruleId == 6">代理：{{baobiaoQinfo.choiseUserName}}</span> 
      <span class="mgr10" v-if="ruleId == 13">会员：{{baobiaoQinfo.choiseUserName}}</span> 

      <span class="mgr10" v-if="baobiaoQinfo.timesvalue.length != 0">
        日期：{{baobiaoQinfo.timesvalue[0]}} 至 {{baobiaoQinfo.timesvalue[1]}}
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
          <caption style="text-align: left;" v-if="ruleId == 3">股东名称</caption> 
          <caption style="text-align: left;" v-if="ruleId == 4">总代理名称</caption> 
          <caption style="text-align: left;" v-if="ruleId == 5">代理名称</caption> 
          <caption style="text-align: left;" v-if="ruleId == 6">会员名称</caption> 

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
          <tr v-for="aUserReport in aUserPage">
                <td>{{aUserReport.userName}}</td>
                <td v-if="ruleId == 6"><a style="cursor:pointer;color: #f56c6c;" v-on:click="cUserOrderList(aUserReport.userId,aUserReport.userName)">{{aUserReport.betMoney}}</a></td>
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
        <div class="block" v-if="page.totalPage > 1">
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="page.currentPage"
                    :page-size="page.pageSize"
                    layout="total, prev, pager, next"
                    :total="page.totalCount*1">
                  </el-pagination>
        </div>
      </div>

      <div class="tab" v-if="showList && ruleId != 6">
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
          <tr v-for="cUserReport in cUserPage">
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

        <div class="block" v-if="page.totalPage > 1">
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="page.currentPage"
                    :page-size="page.pageSize"
                    layout="total, prev, pager, next"
                    :total="page.totalCount*1">
                  </el-pagination>
        </div>
      </div>

      <div class="tab" v-if="!showList">
        <table>
          <caption style="text-align: left;"> 下单详情</caption> 
          <thead>
           <tr>
                <th>注单号/投注日期</th>
                <th>游戏类型</th>
                <th>用户名称</th>
                <th>内容</th>
                <th>下注金额</th>
                <th>可赢金额</th>
                <th>退水</th>
                <th>退水金额</th>
                <th>会员结果</th>
                <th>结果</th>
                <th>应交上级</th>
                <th>下注IP</th>
            </tr>
          </thead> 
          <tr v-for="cUserOrderReport in cUserOrderReportList">
                <td>{{cUserOrderReport.orderNum}}&nbsp;/&nbsp;{{$timestampToTime(cUserOrderReport.orderCreateDate)}}</td>
                <td>{{cUserOrderReport.bocaiTypeName}}&nbsp;({{cUserOrderReport.handicap}}盘)&nbsp;{{cUserOrderReport.periods}}</td>
                <td>{{cUserOrderReport.userName}}&nbsp;普通会员</td>
                <td>{{cUserOrderReport.bocaiCategory2Name}}&nbsp;{{cUserOrderReport.bocaiOddName}}&nbsp;@&nbsp;{{cUserOrderReport.bocaiOdds}}&nbsp;{{cUserOrderReport.bocaiValue}}</td>
                <td>{{cUserOrderReport.betsMoney}}</td>
                <td>{{cUserOrderReport.cuserWinnerMoney}}</td>
                <td>{{cUserOrderReport.dewater | hundredPercentage}}</td>
                <td>{{cUserOrderReport.dewaterMoney}}</td>
                <td>{{cUserOrderReport.cuserResult}}</td>
                <td>{{(cUserOrderReport.moneyResult)| price}}</td>
                <td>{{(0 - cUserOrderReport.moneyResult)| price}}</td>
                <td v-if="cUserOrderReport.bindingIp != ''">{{cUserOrderReport.bindingIp}}</td>
                <td v-else>{{cUserOrderReport.loginIp}}</td>
            </tr>
        </table>

        <div class="block" v-if="page2.totalPage > 1">
                  <el-pagination
                    @current-change="handleCurrentChange2"
                    :current-page.sync="page2.currentPage"
                    :page-size="page2.pageSize"
                    layout="total, prev, pager, next"
                    :total="page2.totalCount*1">
                  </el-pagination>
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
      page: {
            totalPage: 1,
            currentPage: 1,
            pageSize: 10,
            totalCount: 0
        },
        page2: {
            totalPage: 1,
            currentPage: 1,
            pageSize: 10,
            totalCount: 0
        },

      option: 1,
      aUserPage: {},
      cUserPage: {},
      ruleId: '',
      userId: '',
      userName: '',
      currentPage: 1,
      showList: true,

      aUserReportList: {},//代理LIST
        cUserReportList: {},//直属会员LIST
        ruleId: "",//用户角色ID
        bocaiTypeList: {},//博彩类型LIST
        cUserOrderReportList:{},//会员订单数据
        returnPageUserId:[],//记录之前点击过的userId

      cuserid: '',
      coption: ''

    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'getuserInfo',
      baobiaoQinfo: 'getbaobiaoQinfo'
    })
  },
  created() {

    this.reload();

    console.log('this.baobiaoQinfo',this.baobiaoQinfo);

    //this.getbaobiaoList();
    //this.baobiaoQinfo.bocai.name = '';

    if(!this.baobiaoQinfo.bocai) {
      this.baobiaoQinfo.bocai = {
        id: '',
        name: ''
      }

      this.baobiaoQinfo.timesvalue = ['',''];

    }


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
    handleCurrentChange(cpage) {
      this.page.currentPage = cpage;
      this.getbaobiaoList(this.cuserid,this.coption);
    },
    handleCurrentChange2(cpage) {
      this.page2.currentPage = cpage;
      this.reportCUserOrder(this.cuserid);
    },
    reload () {
            this.showList = true;
            this.cuserid = '';
            this.coption = 1;
            this.getbaobiaoList("",1);
      },

    reportList(userId,userName) {
      console.log('reportList');

      this.baobiaoQinfo.choiseUserName = userName;
      this.baobiaoQinfo.userId = userId;
      this.showList = true;
      //this.option = 1;

      this.cuserid = userId;
      this.coption = 1;
      this.getbaobiaoList(userId,1);
    },
    cUserOrderList(userId,userName) {

      console.log('cUserOrderList');

      this.baobiaoQinfo.choiseUserName = userName;
      this.baobiaoQinfo.userId = userId;
      this.showList = false;

      this.cuserid = userId;

      this.reportCUserOrder(userId);
    },
    returnPage() {
      this.showList = true;
      // this.option = 2;
      // this.getbaobiaoList();

      this.cuserid = this.baobiaoQinfo.userId;
      this.coption = 2;

      this.getbaobiaoList(this.baobiaoQinfo.userId,2);
    },
    async getbaobiaoList(userId,type) {

      let url = 'admin/report/reportList?type='+type;


      if (null != this.baobiaoQinfo && null != this.baobiaoQinfo.reportType && '' != this.baobiaoQinfo.reportType) {
        url = url + "&reportType=" + this.baobiaoQinfo.reportType
      }
      if (null != this.baobiaoQinfo && null != this.baobiaoQinfo.cuserOrderStatus && '' != this.baobiaoQinfo.cuserOrderStatus) {
          url = url + "&cuserOrderStatus=" + this.baobiaoQinfo.cuserOrderStatus
      }

      console.log('this.baobiaoQinfo.timesvalue',this.baobiaoQinfo.timesvalue);

      var startTime = '';
      if(this.baobiaoQinfo.timesvalue && this.baobiaoQinfo.timesvalue.length != 0) {
        startTime = this.baobiaoQinfo.timesvalue[0];
      }
      if (null != startTime && '' != startTime) {
          url = url + "&startTime=" + startTime
      }

      var endTime = '';
      if(this.baobiaoQinfo.timesvalue && this.baobiaoQinfo.timesvalue.length != 0) {
        endTime = this.baobiaoQinfo.timesvalue[1];
      }
      this.baobiaoQinfo.endTime = endTime;
      if (null != endTime && '' != endTime) {
          url = url + "&endTime=" + endTime
      }
      if (null != userId && '' != userId) {
          url = url + "&userId=" + userId
      }
      if (null != this.baobiaoQinfo.bocaiTypeId && '' != this.baobiaoQinfo.bocaiTypeId) {
          url = url + "&bocaiTypeId=" + this.baobiaoQinfo.bocaiTypeId
      }

      let data = await this.$get(`${window.url}/`+ url +`&currentPage=`+this.page.currentPage+`&pageSize=`+this.page.pageSize);
            if(+data.code===200) {


                if (null != data.aUserPage) {
                    this.aUserPage = data.aUserPage.list;
                }
                if (null != data.cUserPage) {
                    this.cUserPage = data.cUserPage.list;
                }
                this.baobiaoQinfo.choiseUserName = data.userName;
                this.baobiaoQinfo.userId = data.userId;
                this.ruleId = data.ruleId;
                if (data.aUserPage.totalPage == 0) {
                    this.page.totalPage = 1;
                } else {
                    this.page.currentPage = data.aUserPage.currPage;
                    this.page.totalPage = data.aUserPage.totalPage;
                    this.page.pageSize = data.aUserPage.pageSize;
                    this.page.totalCount = data.aUserPage.totalCount;
                }

                if(this.ruleId == 3) {
                  this.baobiaoQinfo.choiseUserName = this.userInfo.username;
                }

            }



    },

    async reportCUserOrder(userId) {

      let url = 'admin/report/reportCUserOrder?userId='+userId;


      if (null != this.baobiaoQinfo && null != this.baobiaoQinfo.reportType && '' != this.baobiaoQinfo.reportType) {
        url = url + "&reportType=" + this.baobiaoQinfo.reportType
      }
      if (null != this.baobiaoQinfo && null != this.baobiaoQinfo.cuserOrderStatus && '' != this.baobiaoQinfo.cuserOrderStatus) {
          url = url + "&cuserOrderStatus=" + this.baobiaoQinfo.cuserOrderStatus
      }
      var startTime = this.baobiaoQinfo.timesvalue[0];
      if (null != startTime && '' != startTime) {
          url = url + "&startTime=" + startTime
      }
      var endTime = this.baobiaoQinfo.timesvalue[1];
      if (null != endTime && '' != endTime) {
          url = url + "&endTime=" + endTime
      }
      if (null != userId && '' != userId) {
          url = url + "&userId=" + userId
      }
      if (null != this.bocaiTypeIds && '' != this.bocaiTypeIds) {
          url = url + "&bocaiTypeIds=" + this.bocaiTypeIds
      }

      let data = await this.$get(`${window.url}/`+ url +`&currentPage=`+this.page2.currentPage+`&pageSize=`+this.page2.pageSize);
            if(+data.code===200) {

                this.cUserOrderReportList = data.page.list;
                this.ruleId = data.ruleId;
                if (data.page.totalPage == 0) {
                    this.page2.totalPage = 1;
                } else {
                    this.page2.currentPage = data.page.currPage;
                    this.page2.totalPage = data.page.totalPage;
                    this.page2.pageSize = data.page.pageSize;
                    this.page2.totalCount = data.page.totalCount;
                }

            }


    }


  }
}

</script>

<style scoped>
</style>
