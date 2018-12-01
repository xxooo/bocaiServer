<template>
  <div class="content-main">
    <div class="right">
      <div id="submenuDiv">
        <div class="box">
          <div class="header">
            <p>即时注单</p>
          </div> 
          <div class="default-list">
            <p class="tar left">
              <a class="refresh l" @click="getnowOrder()"><i class="icon-refresh"></i>刷新</a>
            </p> 
            <table>
              <thead>
                <tr>
                  <th>编号</th> 
                  <th>注单号/投注日期</th> 
                  <th>投注类型</th> 
                  <th>内容</th> 
                  <th>投注额</th> 
                  <th>可赢金额</th>
                </tr>
              </thead> 

              <tbody v-for="(item,index) in nowOrder.list">
                <tr>
                  <td>{{index*1+1}}</td> 
                  <td>
                    <p>{{item.orderNum}}</p> 
                    <p>{{item.createDate}}</p>
                  </td> 
                  <td>
                    <p>{{item.bocaiTypeName}}</p> 
                    <p>{{item.periods}} 期</p>
                  </td> 
                  <td>
                    <p>
                    <span class="odds-font">{{item.bocaiOddName}}</span>
                              @
                    <span class="odds-font">{{item.odds}}</span>
                    </p>
                  </td> 
                  <td>{{item.betsMoney}}</td> 
                  <td>{{item.winMoney}}</td>
                </tr>
              </tbody> 

              <tr class="tab-footer">
                <td colspan="4" class="tar">此页面统计：</td> 
                <td>{{currentBetsMoney}}</td> 
                <td>{{currentWinMoney}}</td>
              </tr> 
              <tr class="tab-footer">
                <td colspan="4" class="tar">总计：</td> 
                <td>{{totalbetsMoney}}</td> 
                <td>{{totalwinMoney}}</td>
              </tr>
            </table>
            <div class="block" v-if="nowOrder.totalPage*1>1">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="nowOrder.pageSize"
                layout="total, prev, pager, next"
                :total="nowOrder.totalCount*1">
              </el-pagination>
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
      nowOrder: {},
      currentPage: 1,
      totalbetsMoney: 0,
      totalwinMoney: 0,
      currentBetsMoney: 0,
      currentWinMoney: 0
    }
  },
  created() {
      this.getnowOrder2(this.currentPage,10000);
      this.getnowOrder(this.currentPage,10);
  },
  computed: {
  },
  methods: {
    handleCurrentChange(data) {
      this.getnowOrder(data,10);
    },
    async getnowOrder(cpage,pages) { 
      this.currentBetsMoney = 0;
      this.currentWinMoney = 0;

      let res = await this.$get(`${window.url}/api/nowOrder?currentPage=`+cpage+`&pageSize=`+pages);

          if(res.code===200){
            this.nowOrder = res.page;

            for(let n in this.nowOrder.list) {
              console.log('this.nowOrder[n].createDate',this.nowOrder);
              this.nowOrder.list[n].createDate = this.$timestampToTime(this.nowOrder.list[n].createDate);
              this.nowOrder.list[n].winMoney = this.nowOrder.list[n].odds*this.nowOrder.list[n].betsMoney*1;

              this.currentBetsMoney += this.nowOrder.list[n].betsMoney*1;
              this.currentWinMoney += this.nowOrder.list[n].winMoney*1;
            }
          }
    },
    async getnowOrder2(cpage,pages) { 
      let res = await this.$get(`${window.url}/api/nowOrder?currentPage=`+cpage+`&pageSize=`+pages);

          if(res.code===200){

            for(let n in res.page.list) {
              let winMoney = res.page.list[n].odds*res.page.list[n].betsMoney*1;

              this.totalbetsMoney += res.page.list[n].betsMoney*1;
              this.totalwinMoney += winMoney*1;
            }
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