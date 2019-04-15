<template>
  <div id="youxishezhi" class="content-main">
    
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>注单管理</el-breadcrumb-item>
        <el-breadcrumb-item>流水注单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="nav">
      <div class="btn-ground">
        游戏类型 :
        <el-select v-model="q.bocaiTypeId" @change="selectBocaiType" placeholder="请选择博彩类型" size="mini" style="width: 15%;">
          <!-- <el-option :value="''" key="null" label="全部"></el-option> -->
          <el-option v-for="(item,index) in bocaiMenu" :value="item.id" :key="item.id" :label="item.name"></el-option> 
        </el-select>
      </div>
      <div class="btn-ground" style="margin-top: 10px;">
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
            </tr>
          </thead> 
          <tbody>
            <tr v-for="order in orderList">
                <td>{{order.id}}</td>
                <td>
                    {{order.orderNum}}<br>
                    {{$timestampToTime(order.createDate)}}<br>
                    ({{order.handicap}}盘)
                </td>
                <td>{{order.bocaiTypeName}}</td>
                <td>「会员」{{order.username}}</td>
                <td>下注</td>
                <td>
                    {{order.periods}}期<br>
                    {{order.bocaiCategory2Name}}&nbsp;{{order.bocaiOddName}}@{{order.odds}}
                </td>
                <td>{{order.betsMoney}}</td>
                <td>{{(order.betsMoney * order.odds - order.betsMoney) | price}}</td>
            </tr>
            <tr>
                <td colspan=6 class="text-info" style="text-align: right; padding-right: 15px;">此页面统计：</td>
                <td class="text-info">{{betsMoneyTotal}}</td>
                <td class="text-info">{{jiangliMoneyTotal}}</td>
            </tr>
            <tr>
                <td colspan=6 class="text-info" style="text-align: right; padding-right: 15px;">总计：</td>
                <td class="text-info">{{betsMoneyAllTotal}}</td>
                <td class="text-info">{{jiangliMoneyAllTotal}}</td>
            </tr>

          </tbody>
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
            currentPage:1,
            pageSize:10
        },
        showList: true,
        title: null,
        q: {//查询条件
            bocaiTypeId: "",
        },
        orderList: {},
        betsMoneyTotal: 0,
        jiangliMoneyTotal: 0,

        betsMoneyAllTotal: 0,
        jiangliMoneyAllTotal: 0,
    }
  },
  computed: {
    ...mapGetters({
      ruleId:'getruleId',
    })
  },
  created() {
  },
  mounted(){
  },
  methods: {
    reload() {
      this.orderList();
      //获取订单合计
      this.orderTotalMoney();
    },
    query() {
      this.reload();
    },
    async orderTotalMoney() {

      let res = await this.$get(`${window.url}/admin/order/orderTotalMoney?bocaiTypeId=`+this.q.bocaiTypeId);
      if(+res.code===200) {

        this.betsMoneyAllTotal = data.betsMoneyTotal;
        this.jiangliMoneyAllTotal = data.jiangliMoneyTotal;

      }
    },
    calTotal(){
        var totalJLPrice = 0;
        this.orderList.forEach(function (data) {
            totalJLPrice += (data.betsMoney * data.odds) - data.betsMoney;
        })
        this.jiangliMoneyTotal = totalJLPrice.toFixed(2);

        var totalPrice = 0;
        this.orderList.forEach(function (data) {
            totalPrice += data.betsMoney;
        })
        this.betsMoneyTotal = totalPrice.toFixed(2);;
    },
    async orderList() {
        let url ='admin/order/nowOrder?bocaiTypeId=' + this.q.bocaiTypeId;


        let res = await this.$get(`${window.url}/`+ url +`&currentPage=`+this.page.currentPage+`&pageSize=`+this.page.pageSize);
            if(+res.code===200) {

                this.orderList = res.page.list;
                this.calTotal();

                if (res.page.totalPage == 0) {
                    this.page.totalPage = 1;
                } else {
                    this.page.totalPage = res.page.totalPage;
                    this.page.totalCount = res.page.totalCount;
                }

            }
    },
    handleCurrentChange(cpage) {
      this.page.currentPage = cpage;
      this.reload();
    }
  }
}

</script>

<style scoped>
</style>
