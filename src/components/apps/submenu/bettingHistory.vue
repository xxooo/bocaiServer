<template>
  <div class="content-main">
    <div class="right">
      <div id="submenuDiv">
        <div class="box">

          <div class="header">
            <p>下注历史概要</p>
          </div> 
          <div class="default-list">

            <div v-if="!ifshowBetInfo">
              <p>
                游戏：
                <el-select v-model="bocaiTypeId" placeholder="请选择" size="mini" @change="changeboType">
                  <el-option label="全部" :value="''"></el-option>
                  <el-option
                    v-for="item in bocaiTypeList"
                    :key="item.value"
                    :label="item.bocaiName"
                    :value="item.bocaiId">
                  </el-option>
                </el-select>
                <a class="refresh r">刷新</a>
              </p> 
              <table class="sum_tab">
                <caption><i class="icon-calendar"></i> 本周</caption> 
                <thead>
                  <tr>
                    <th>日期</th> 
                    <th>投注额</th> 
                    <th>派彩结果</th> 
                    <th>注数</th>
                  </tr>
                </thead> 
                <tbody>
                  <tr v-if="nowWeekPage.length*1 == '0'">
                    <td style="line-height: 26px;" colspan="4">{{"暂无数据"}}</td> 
                  </tr>
                  <tr v-else v-for="item in nowWeekPage">
                    <td style="line-height: 26px;"><a title="历史详情" class="link" @click="goBetInfo(item.createDateStr)">{{item.createDateStr}}</a></td>
                    <!-- <td style="line-height: 26px;"><span>{{item.createDateStr}}</span></td> --> 
                    <td style="line-height: 26px;">{{item.betsMoneySum}}</td> 
                    <td style="line-height: 26px;">{{item.winnerMoneySum}}</td> 
                    <td style="line-height: 26px;">{{item.orderCount}}</td>
                  </tr>
                </tbody> 
                <tr class="tab-footer">
                  <td>总计：</td> 
                  <td>{{betsAllNow}}</td> 
                  <td>{{winnerAllNow}}</td> 
                  <td>{{orderAllNow}}</td>
                </tr>
              </table>

              <table class="sum_tab">
                <caption><i class="icon-calendar"></i> 上周</caption> 
                <thead>
                  <tr>
                    <th>日期</th> 
                    <th>投注额</th> 
                    <th>派彩结果</th> 
                    <th>注数</th>
                  </tr>
                </thead> 
                <tbody>
                  <tr v-if="afterWeekPage.length*1 == '0'">
                    <td style="line-height: 26px;" colspan="4">{{"暂无数据"}}</td> 
                  </tr>
                  <tr v-else v-for="item in afterWeekPage">
                    <!-- <td style="line-height: 26px;"><span>{{item.createDateStr}}</span></td>  -->
                    <td style="line-height: 26px;"><a title="历史详情" class="link" @click="getbetInfo(item.createDateStr)">{{item.createDateStr}}</a></td>
                    <td style="line-height: 26px;">{{item.betsMoneySum}}</td> 
                    <td style="line-height: 26px;">{{item.winnerMoneySum}}</td> 
                    <td style="line-height: 26px;">{{item.orderCount}}</td>
                  </tr>
                </tbody> 
                <tr class="tab-footer">
                  <td>总计：</td> 
                  <td>{{betsAllAfter}}</td> 
                  <td>{{winnerAllAfter}}</td> 
                  <td>{{orderAllAfter}}</td>
                </tr>
              </table>
            </div>

            <div v-else>
              <p><a class="back" @click="ifshowBetInfo = false">返回</a></p> 
              <table>
                <thead>
                  <tr>
                    <th>编号</th> 
                    <th>注单号/投注日期</th> 
                    <th>投注类型</th> 
                    <th>内容</th> 
                    <th>投注额</th> 
                    <th>可赢金额</th> 
                    <th>派彩</th> 
                    <th>注单状态</th>
                  </tr>
                </thead> 
                <tbody>
                  <tr v-for="(item,index) in betInfo.list">
                    <td>{{index*1 +1}}</td> 
                    <td><p>{{item.orderNum}}</p> <p>{{$timestampToTime(item.createDate)}}</p></td> 
                    <td><p>{{item.bocaiTypeName}}</p> <p>{{item.periods}} 期</p></td> 
                    <td><p><span class="odds-font">{{item.bocaiCategory2Name}} {{item.bocaiOddName}}</span>@<span class="odds-font">{{item.bocaiOdds}}</span></p></td> 
                    <td>{{item.betsMoney}}</td> 
                    <td>{{item.winMoney}}</td> 
                    <td class="red">{{item.paicai}}</td> 
                    <td><span>{{item.status=='1'?'已结算' : '未结算'}}</span></td>
                  </tr>

                </tbody> 
                <tr class="tab-footer">
                  <td colspan="4" class="tar">此页面统计：</td> 
                  <td>{{totalbetsMoney}}</td> 
                  <td>{{totalwinMoney}}</td> 
                  <td>{{totalpaicai}}</td> 
                  <td>&nbsp;</td>
                </tr> 
                <tr class="tab-footer">
                  <td colspan="4" class="tar">总计：</td> 
                  <td>{{sumData.betsMoneySum}}</td> 
                  <td>{{sumData.winnerMoneySum}}</td> 
                  <td>{{sumData.winnerMoneyResultSum}}</td> 
                  <td>&nbsp;</td>
                </tr>
              </table> 

              <div class="block" v-if="betInfo.totalPage > 1">
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="betInfo.pageSize"
                    layout="total, prev, pager, next"
                    :total="betInfo.totalCount*1">
                  </el-pagination>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      betInfo: {},
      currentPage: 1,
      dayStr: '',
      ifshowBetInfo: false,
      totalbetsMoney: 0,
      totalwinMoney: 0,
      totalpaicai: 0,
      bocaiTypeList: [],
      bocaiTypeId: '',
      afterWeekPage: [],
      sumData: {},
      nowWeekPage: [],
      betsAllNow: '',
      winnerAllNow: '',
      orderAllNow: '',
      betsAllAfter: '',
      winnerAllAfter: '',
      orderAllAfter: ''
    }
  },
  created() {
    this.hisOrder(this.bocaiTypeId);
    this.getBocai();
  },
  computed: {
  },
  methods: {
    handleCurrentChange(cpage) {
      this.currentPage = cpage;
      this.getbetInfo();
    },
    goBetInfo(daytime) {
      this.dayStr = daytime;

      this.getbetInfo();
    },
    async getbetInfo() {

      let res = await this.$get(`${window.url}/api/hisOrderInfo?currentPage=`+this.currentPage+`&pageSize=10&dayStr=`+this.dayStr);
      if(res.code===200){
        this.betInfo = res.page;
        this.sumData = res.sumData[0];

        for(let n in this.betInfo.list) {
          this.betInfo.list[n].winMoney =  this.betInfo.list[n].betsMoney*this.betInfo.list[n].bocaiOdds*1 - this.betInfo.list[n].betsMoney*1;
          if(this.betInfo.list[n].winnerStatus == 0) {
            this.betInfo.list[n].paicai = this.betInfo.list[n].betsMoney*(-1);
          } else if(this.betInfo.list[n].winnerStatus == 0) {
            this.betInfo.list[n].paicai = this.betInfo.list[n].winMoney;
          } else {
            this.betInfo.list[n].paicai = 0;
          }
          this.totalbetsMoney += this.betInfo.list[n].betsMoney*1;
          this.totalwinMoney += this.betInfo.list[n].betsMoney*1*this.betInfo.list[n].bocaiOdds*1 - this.betInfo.list[n].betsMoney*1;
          this.totalpaicai += this.betInfo.list[n].paicai*1;
        }

      }

      this.ifshowBetInfo = true;

    },
    async getBocai() {
      let res = await this.$get(`${window.url}/api/getBocai`);

          if(res.code===200){
            this.bocaiTypeList = res.bocaiTypeList;
          }
    },
    changeboType(data) {
      this.hisOrder(data);
    },
    async hisOrder(id) {

      this.betsAllNow = '';
      this.winnerAllNow = '';
      this.orderAllNow = '';
      this.betsAllAfter = '';
      this.winnerAllAfter = '';
      this.orderAllAfter = '';

      let res = await this.$get(`${window.url}/api/hisOrder?bocaiTypeId=`+id);

        if(res.code===200){
            this.nowWeekPage = res.page.nowWeekPage;

            for(let n in res.page.nowWeekPage) {
              this.betsAllNow += res.page.nowWeekPage[n].betsMoneySum*1;
              this.winnerAllNow += res.page.nowWeekPage[n].winnerMoneySum*1;
              this.orderAllNow += res.page.nowWeekPage[n].orderCount*1;
            }

            this.afterWeekPage = res.page.afterWeekPage;

            for(let n in res.page.afterWeekPage) {
              this.betsAllAfter += res.page.afterWeekPage[n].betsMoneySum*1;
              this.winnerAllAfter += res.page.afterWeekPage[n].winnerMoneySum*1;
              this.orderAllAfter += res.page.afterWeekPage[n].orderCount*1;
            }

            console.log('afterWeekPage.length*1',this.afterWeekPage.length*1);
            console.log('nowWeekPage.length*1',this.nowWeekPage.length*1);
        } 
    }
  },
  mounted() {
  },
  updated() {
  }
};
</script>
<style scoped>
</style>
<style lang="less">
  
</style>