<template>
  <div id="youxishezhi" class="content-main">
    <div class="nav">
      <span>游戏类型:
        <select class="mgr10">
          <option value="0">——请选择游戏——</option> 
          <option value="幸运飞艇">幸运飞艇</option>
          <option value="六合彩">六合彩</option>
          <option value="重庆时时彩">重庆时时彩</option>
          <option value="PC蛋蛋">PC蛋蛋</option>
          <option value="北京PK拾">北京PK拾</option>
        </select> 
        <div class="btn-ground">
          <button class="tabBtn btn btn-blue mgr10 router-link-active">基本设置</button> 
          <button class="tabBtn btn btn-blue mgr10">赔率设置</button> 
          <button class="tabBtn btn btn-blue mgr10">赔率差设置</button> 
          <button class="tabBtn btn btn-blue mgr10">赔率浮动设置</button>
        </div>
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
  <td width="40%"><input type="text"></td> 
  <td width="40%"><div><i class="icon-exclamation-sign"></i>
              金额仅可输入整数，并且不可小于0
            </div>
            </td>
            </tr> 
            <tr>
            <td class="tar td-bg">最高派彩:</td> <td><input type="text"></td> 
            <td><div><i class="icon-exclamation-sign"></i>
               仅可输入整数，并且不可小于0
             </div></td></tr> <tr><td class="tar td-bg">开奖时间:</td> 
             <td><input type="text"></td>
             <td><div><i class="icon-exclamation-sign"></i>
               用于调整开盘时间，实际开奖时间以官方为准
             </div>
             </td>
             </tr>
             <tr>
             <td class="tar td-bg">封盘时间:</td> 
             <td><input type="text"> 秒 </td> 
             <td><div><i class="icon-exclamation-sign"></i>
               提前多少秒封盘
             </div>
             </td>
             </tr> 
             <tr><td width="0%" class="tar">开关游戏:</td> <td><label><input type="radio" value="true"> 开启
            </label> <label><input type="radio" value="false"> 关闭
            </label></td> <td width="20%"><i class="icon-exclamation-sign"></i> 请选择开启或关闭
          </td></tr></table> <div class="inner"><button class="btn-submit">保存</button> <button class="btn-cancel">取消</button></div></div></div>

  </div>
</template>



<script>
import { mapGetters } from 'vuex';

export default {
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      ruleId:'getruleId',
      userInfo: 'getuserInfo'
    })
  },
  created() {
    this.getoddsCategory();

    this.getadminBocaiInfo();

    this.isBase = this.ruleId == 1 ? 1 : this.ruleId == 3 ? 2 : '';

  },
  mounted(){
  },
  methods: {
    handleCurrentChange(cpage) {
      this.currentPage = cpage;
      this.getoddInfo(this.curOddsId);
    },

    qingkong() {
      $('.bet_box .orders td').removeClass('selected');
      this.updateList = [];
    },
    async getoddInfo(oddsId) {

      this.curOddsId = oddsId;

      let res = await this.$get(`${window.url}/admin/bocai/oddsOrder?bocaiOddsId=`+oddsId+`&currentPage=`+this.currentPage+`&pageSize=10`);

      if(res.code===200){
        this.jiangliMoneyTotal = res.jiangliMoneyTotal;
        this.betsMoneyTotal = res.betsMoneyTotal;
        this.orderInfo = res.page;

        for(let n in this.orderInfo.list) {
          this.curPageBetTotal += this.orderInfo.list[n].betsMoney*1;
          this.curPageJangliTotal += this.orderInfo.list[n].winnerMoney*1;
        }
      }

      this.orderOddsVisible = true;
    },
    async savebet() {

      let that = this;

      console.log('updateList',this.updateList);

      let arr = [];

      for(let n in this.updateList) {
        let obj = {};

        obj.bocaiId = this.updateList[n].oddsId;
        obj.odds = this.updateList[n].odds;

        arr.push(obj);
      }

      let objdata = {
        userId: this.userInfo.id,
        bocaiTypeId: this.curBocaiTypeId,
        isBase: this.isBase,
        list: arr
      }


      NProgress.start();
          await that.$post(`${window.url}/admin/bocai/oddsSub`,objdata).then((res) => {
            that.$handelResponse(res, (result) => {
              NProgress.done();
              if(result.code===200){

                this.bocaiCategoryId(this.bocaiCategory);

              }
            })
      });



    },
    async getadminBocaiInfo() {
      
      let res = await this.$get(`${window.url}/admin/bocai/adminBocaiInfo?bocaiTypeId=`+this.curBocaiTypeId);

      if(res.code===200){
        this.adminBocaiInfo = res.data;


        this.adminBocaiInfo.hisResult = this.adminBocaiInfo.hisResult.split(","); 

        for(let n in this.adminBocaiInfo.hisResult) {

          //this.adminBocaiInfo.hisResult[n] = parseInt(this.adminBocaiInfo.hisResult[n]);

          //this.hisResultAll = parseInt(this.hisResultAll);

          this.hisResultAll = this.hisResultAll*1 + this.adminBocaiInfo.hisResult[n]*1;
        }

      }
    },
    async getoddsCategory() {

      this.isBase = this.ruleId == 1 ? 1 : this.ruleId == 3 ? 2 : '';
      
      let res = await this.$get(`${window.url}/admin/bocai/oddsCategory?bocaiTypeId=`+this.curBocaiTypeId+`&isBase=`+this.isBase);

      if(res.code===200){
        this.bocaiCategoryList = res.typeList;
        this.oddsList = res.oddsList;

        this.shuaiXuanDatas(res.oddsList);

        //bus.$emit('curactiveIndex', this.curactiveIndex);
        this.showOdds = this.bocaiCategoryList[0].name;
        this.bocaiCategory = this.bocaiCategoryList[0];
        this.activeIndex = this.bocaiCategoryList[0].name;
        this.shuaiXuanDatas(res.oddsList);

        //bus.$emit('getbocaiTypeId', that.curBocaiTypeId); 
        //bus.$emit('getbocaiTypeName', that.curactiveIndex); 


      let parms = {
        bocaiCategoryId: this.bocaiCategory.id,
        isBase: this.isBase,
        curBocaiTypeId: this.curBocaiTypeId
      }

      bus.$emit('getRefreshTime', parms);

      }
    },
    orderTd(item,ids,opbet) {

      //console.log('opbet',opbet);

      $('.'+ids+item.oddsId).addClass('selected');

      let num = 0;

      if(opbet == 'add') {

        item.odds = parseFloat(item.odds);

        this.betfudu = parseFloat(this.betfudu);

        console.log('this.betfudu',this.betfudu);

        console.log('item.odds',item.odds);

        item.odds += this.betfudu;

        item.odds = (item.odds).toFixed(3)*1;

        console.log('item.odds2222',item.odds);

      } else {

        item.odds = parseFloat(item.odds);

        this.betfudu = parseFloat(this.betfudu);

        item.odds = item.odds - this.betfudu;

        item.odds = (item.odds).toFixed(3)*1;

      }

      let ifhas = false;

      for(let n in this.updateList) {
        if(this.updateList[n].oddsId == item.oddsId) {
          this.updateList[n].odds = item.odds;
          ifhas = true;
        }
      }

      if(!ifhas) {
        this.updateList.push(item);
      }

      // if(this.updateList.findIndex((n) => n == item.oddsId)>-1) {
      //   this.updateList.push(item);
      // } 
      
    },
    handleSelect(key, keyPath) {
        //console.log(key, keyPath);
    },
    childByReset(data) {
      console.log('fromchild');
      this.oddsList = data;

      this.shuaiXuanDatas(data);

      this.qingkong();
    },
    async bocaiCategoryId(item) {
      console.log('item',item);


      let that = this;

          NProgress.start();
          await that.$get(`${window.url}/admin/bocai/odds?bocaiCategoryId=`+item.id+`&isBase=`+this.isBase+`&bocaiTypeId=`+this.curBocaiTypeId).then((res) => {
            that.$handelResponse(res, (result) => {
              NProgress.done();
              that.showOdds = item.name;
              that.bocaiCategory = item;
              if(result.code===200){

                this.oddsList = res.oddsList;

                this.shuaiXuanDatas(res.oddsList);
                

                that.qingkong();

              }
            })
          });

      let parms = {
        bocaiCategoryId: item.id,
        isBase: this.isBase,
        curBocaiTypeId: this.curBocaiTypeId
      }

      bus.$emit('getRefreshTime', parms);

    },


    shuaiXuanDatas(dataList) {

      console.log('dataList',dataList);

      if(this.showOdds == 'PC蛋蛋') {

        for(let m in dataList) {
          if(dataList[m].name == '混合') {
            this.huiheData = dataList[m];
          }
          if(dataList[m].name == '波色') {
            this.boseData = dataList[m];
          }
          if(dataList[m].name == '特码') {
            this.temaData = dataList[m];
          }
        }
      }

    }

  }
}

</script>

<style scoped>
.nav {
    padding: 10px 15px;
}

</style>
