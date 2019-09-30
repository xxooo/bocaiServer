<template>
  <div id="youxishezhi" class="content-main">
    
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>注单管理</el-breadcrumb-item>
        <el-breadcrumb-item>注单查询</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="nav">
      <div class="btn-ground" style="text-align: left;" v-if="[1,2,7,8].findIndex((n) => n==ruleId)>-1">
        公司 :
          <el-select v-model="q.companyid" placeholder="请选择公司" size="mini">
            <el-option :value="''" key="null" :label="'默认'"></el-option> 
            <el-option v-for="company in companyList" :value="company.id" :key="company.id" :label="company.username"></el-option> 
          </el-select>
      </div>

      <div class="btn-ground">
        游戏类型 :
        <el-select v-model="q.bocaiTypeId" @change="selectBocaiType" placeholder="请选择博彩类型" size="mini" style="width: 15%;">
          <!-- <el-option :value="''" key="null" label="全部"></el-option> -->
          <el-option v-for="(item,index) in bocaiMenu" :value="item.id" :key="item.id" :label="item.name"></el-option> 
        </el-select>
        游戏玩法 :
        <el-select v-model="q.dewaterId" @change="selectBocaiType" placeholder="请选择" size="mini" style="width: 15%;">
          <el-option :value="''" key="null" label="全部"></el-option>
          <el-option v-for="(item,index) in dewaterList" :value="item.id" :key="item.id" :label="item.name"></el-option> 
        </el-select>
        期数 :
        <el-select v-model="q.periodsId" @change="selectBocaiType" placeholder="请选择" size="mini" style="width: 15%;">
          <el-option :value="''" key="null" label="全部"></el-option>
          <el-option v-for="(item,index) in periodsList" :value="item.id" :key="item.id" :label="item.periods"></el-option> 
        </el-select>
        投注时间 :
        <el-date-picker
          style="width: 15%;"
          size="mini"
          v-model="q.dateStr"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <div class="btn-ground" style="margin-top: 10px;">
        查询条件 :
        <el-select v-model="q.searchType" @change="selectBocaiType" placeholder="请选择" size="mini" style="width: 15%;">
          <el-option :value="''" key="null" label="不指定"></el-option>
          <el-option :value="'1'" key="1" label="公司"></el-option>
          <el-option :value="'2'" key="2" label="股东"></el-option>
          <el-option :value="'3'" key="3" label="总代理"></el-option>
          <el-option :value="'4'" key="4" label="代理"></el-option>
          <el-option :value="'5'" key="5" label="会员"></el-option>
          <el-option :value="'6'" key="6" label="注单号"></el-option>
          <el-option :value="'7'" key="7" label="注单ID"></el-option>
        </el-select>

        <el-select v-model="q.status" @change="selectBocaiType" placeholder="请选择" size="mini" style="width: 15%;">
          <el-option :value="''" key="null" label="全部"></el-option>
          <el-option :value="1" key="1" label="已结算"></el-option>
          <el-option :value="0" key="0" label="未结算"></el-option>
        </el-select>

        <el-input v-model="q.keyword" placeholder="请输入关键字" size="mini" style="width: 15%;"></el-input>

        <button class="btn btn-blue" @click="query()">查询</button>
        <button class="btn btn-blue" @click="query()">刷新</button>


      </div>

    </div>

    <div class="portlet">
      <div class="tab">

        <table>
          <thead>
          <tr class="trBar">
                <th>注单号</th>
                <th>投注日期</th>
                <th>用户名称</th>
                <th>游戏类型</th>
                <th>游戏内容</th>
                <th>注单状态</th>
                <th>下注 IP</th>
                <th>金额</th>
                <th>结果</th>
            </tr>
          </thead> 
          <tbody>
            <tr v-for="orderHis in orderHisList.list">
                <td>{{orderHis.orderNum}}</td>
                <td>{{$timestampToTime(orderHis.createDate)}}</td>
                <td>{{orderHis.username}}</td>
                <td>
                    {{orderHis.bocaiTypeName}}
                    {{orderHis.periods}}期
                </td>
                <td>{{orderHis.bocaiCategory2Name}}&nbsp;&nbsp;{{orderHis.bocaiOddName}}@{{orderHis.odds}}</td>
                <td v-if="orderHis.status == 0">未结算</td>
                <td v-if="orderHis.status == 1">已结算</td>

                <td class="text-error" v-if="orderHis.bindingIp != null">{{orderHis.bindingIp}}</td>
                <td class="text-error" v-else>{{orderHis.loginIp}}</td>

                <td>{{orderHis.betsMoney}}</td>
                <td>{{orderHis.winnerMoneyResult}}</td>
            </tr>
            <tr>
                <td colspan=7 class="text-info" style="text-align: right; padding-right: 15px;">此页面统计：</td>
                <td class="text-info">{{betsMoneyTotal}}</td>
                <td class="text-info">{{jiangliMoneyTotal}}</td>
            </tr>
            <tr>
                <td colspan=7 class="text-info" style="text-align: right; padding-right: 15px;">总计：</td>
                <td class="text-info">{{betsMoneyAllTotal}}</td>
                <td class="text-info">{{jiangliMoneyAllTotal}}</td>
            </tr>
          </tbody>
        </table>

        <div class="block" v-if="orderHisList.totalPage > 1">
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="q.currentPage"
                    :page-size="orderHisList.pageSize"
                    layout="total, prev, pager, next"
                    :total="orderHisList.totalCount*1">
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
      currentPage: 1,
      showList: true,
        title: null,
        q: {//查询条件
            bocaiTypeId: "",
            dewaterId: "",
            periodsId: "",
            dateStr: "",
            startDateStr: "00:00",
            endDateStr: "23:59",
            status: 1,
            keyword: "",
            searchType: "",
            totalPage: 1,
            currentPage:1,
            pageSize:10,
            companyid: ''
        },
        orderHisList: [],//历史订单列表
        dewaterList: [],//退水玩法列表
        periodsList: [],//期数列表
        betsMoneyTotal: 0,
        jiangliMoneyTotal: 0,
        dayList: {},//日期
        betsMoneyAllTotal: 0,
        jiangliMoneyAllTotal: 0,

        companyId: '',

        companyList: {},//公司List
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
    if([1,2,7,8].findIndex((n) => n==this.ruleId)>-1) {
      this.bocaiSetList();
    }
  },
  mounted(){
  },
  methods: {
    async bocaiSetList() {
      let res = await this.$get(`${window.url}/admin/gameManage/getBocaiSortSet`);

      if(res.code===200){
        this.companyList = res.data.companyList;
      }
    },
    calTotal(){
      console.log('orderHisList',this.orderHisList);

        var totalJLPrice = 0;
        this.orderHisList.list.forEach(function (data) {
            totalJLPrice += data.winnerMoneyResult;
        })
        this.jiangliMoneyTotal = totalJLPrice;

        var totalPrice = 0;
        this.orderHisList.list.forEach(function (data) {
            totalPrice += data.betsMoney;
        })
        this.betsMoneyTotal = totalPrice;
    },
    handleCurrentChange(cpage) {
      this.currentPage = cpage;
      this.orderHisListQuery();
      this.orderHisTotalMoneyQuery();
    },
    async orderHisTotalMoneyQuery() {
      let that = this;
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
            await that.$post(`${window.url}/admin/order/orderHisTotalMoney`,this.q).then((res) => {
              that.$handelResponse(res, (result) => {
          loading.close();
                if(result.code===200){
                  that.betsMoneyAllTotal = result.betsMoneyTotal;
                  that.jiangliMoneyAllTotal = result.jiangliMoneyTotal;
                }
              })
            });
    },
    async orderHisListQuery() {

      console.log('JSON',JSON.stringify(this.q));

      let that = this;
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
            await that.$post(`${window.url}/admin/order/hisOrderList`,this.q).then((res) => {
              that.$handelResponse(res, (result) => {
          loading.close();
                if(result.code===200){
                  that.orderHisList = result.page;
                  that.calTotal();
                  console.log('orderHisList',this.orderHisList);
                }
              })
            });
    },
    query() {
      if (this.q.bocaiTypeId == "") {
          this.$alertMessage('请选择博彩类型!', '温馨提示');
                return false;
            }
            if (this.q.dateStr == "") {
                this.q.startDateStr = null,
                this.q.endDateStr = null
            }else{
                this.q.startDateStr = this.q.dateStr + " " + this.q.startDateStr;
                this.q.endDateStr = this.q.dateStr + " " + this.q.endDateStr;
            }
            this.showList = true;
            // this.q.bocaiTypeId = this.q.bocaiTypeId + '';
            this.orderHisListQuery();
            //获取订单合计
            this.orderHisTotalMoneyQuery();
    },
    async selectBocaiType() {

      let res = await this.$get(`${window.url}/admin/order/getSearchData?bocaiTypeId=`+this.q.bocaiTypeId);
      if(+res.code===200) {

        this.dewaterList = res.dewaterList;
        this.periodsList = res.periodsList;

      }
    }

  }
}

</script>

<style scoped>
</style>
