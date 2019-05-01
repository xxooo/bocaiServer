<template>
  <div id="youxishezhi" class="content-main">
    
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>注单管理</el-breadcrumb-item>
        <el-breadcrumb-item>补货注单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="nav">
      <div class="btn-ground">
        游戏类型 :
        <el-select v-model="q.bocaiTypeId" @change="selectBocaiType" placeholder="请选择博彩类型" size="mini" style="width: 18%;">
          <!-- <el-option :value="''" key="null" label="全部"></el-option> -->
          <el-option v-for="(item,index) in bocaiMenu" :value="item.id" :key="item.id" :label="item.name"></el-option> 
        </el-select>
        期数 :
        <el-select v-model="q.periodsId" @change="selectBocaiType" placeholder="请选择" size="mini" style="width: 18%;">
          <el-option :value="''" key="null" label="全部"></el-option>
          <el-option v-for="(item,index) in periodsList" :value="item.id" :key="item.id" :label="item.periods"></el-option> 
        </el-select>
        投注时间 :
        <el-date-picker
          style="width: 18%;"
          size="mini"
          v-model="q.dateStr"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <button class="btn btn-blue" @click="query()">查询</button>
      </div>

    </div>

    <div class="portlet">
      <div class="tab">

        <table>
          <thead>
          <tr class="trBar">
                <th>编号</th>
                <th>注单号/投注日期</th>
                <th>游戏类型</th>
                <th>级别/名称</th>
                <th>注单类型</th>
                <th>内容</th>
                <th>金额</th>
                <th>可赢金额</th>
                <th>结果</th>
            </tr>
          </thead> 
          <tbody>
            <tr v-for="orderHis in orderHisList.list">
                <td>{{orderHis.id}}</td>
                <td>
                    {{order.orderNum}}<br>
                    {{$timestampToTime(order.createDate)}}<br>
                    ({{order.handicap}}盘)
                </td>
                <td>「会员」{{order.username}}</td>
                <td>下注</td>
                <td>
                    {{order.periods}}期<br>
                    {{order.bocaiCategory2Name}}&nbsp;{{order.bocaiOddName}}@{{order.odds}}
                </td>
                <td>{{order.betsMoney}}</td>
                <td>{{(order.betsMoney * order.odds - order.betsMoney)}}</td>
                <td>{{order.winnerMoneyResult}}</td>
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
        title: null,
        q: {//查询条件
            bocaiTypeId: "",
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
        orderHisList: {},//历史订单列表
        dewaterList: [],//退水玩法列表
        periodsList: [],//期数列表
        betsMoneyTotal: 0,
        jiangliMoneyTotal: 0,
        dayList: {},//日期
        betsMoneyAllTotal: 0,
        jiangliMoneyAllTotal: 0,
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
  },
  mounted(){
  },
  methods: {
    handleCurrentChange(cpage) {
      this.q.currentPage = cpage;
      this.orderHisListQuery();
    },
    async orderHisListQuery() {
      let that = this;
           const loading = this.$loading({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
            await that.$post(`${window.url}/admin/order/replenishmentOrder`,this.q).then((res) => {
              that.$handelResponse(res, (result) => {
          loading.close();
                if(result.code===200){
                  that.orderHisList = result.page;
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
            // this.q.bocaiTypeId = this.q.bocaiTypeId + '';
            this.orderHisListQuery();
            //获取订单合计
            //this.orderHisTotalMoneyQuery();
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
