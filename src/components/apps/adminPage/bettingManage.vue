<template>
  <div id="youxishezhi" class="content-main">
    
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>投注管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="nav">
      <div class="btn-ground">
        游戏类型 :
        <el-select v-model="q.bocaiTypeId" @change="selectBocaiType" placeholder="请选择博彩类型" size="mini" style="width: 15%;">
          <!-- <el-option :value="''" key="null" label="全部"></el-option> -->
          <el-option v-for="(item,index) in bocaiMenu" :value="item.id" :key="item.id" :label="item.name"></el-option> 
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
        <el-input v-model="q.username" placeholder="请输入会员帐号" size="mini" style="width: 15%;"></el-input>

        <button class="btn btn-blue" @click="query()">查询</button>
      </div>

    </div>

    <div class="nav">
        <div class="operate-btn">
            <button class="btn btn-blue" @click="batchIsShow(0)" type="button">批量显示</button>
            <button class="btn btn-blue" @click="batchIsShow(1)" type="button">批量隐藏</button>
            <button class="btn btn-blue" @click="batchDelete()" type="button">批量删除</button>
            <button class="btn btn-blue" @click="query()">刷新</button>
        </div>

    </div>

    <div class="portlet">
      <div class="tab">

        <table>
          <thead>
            <tr class="trBar">
                <th><input type="checkbox" value="" v-model='checked' @click='checkedAll'></th>
                <th> 注单号</th>
                <th>投注时间</th>
                <th>游戏类型</th>
                <th>游戏内容</th>
                <th>金额</th>
                <th>结果</th>
                <th>注单状态</th>
                <th>下注 IP</th>
                <th>功能</th>
            </tr>
          </thead> 
          <tbody>
            <tr v-for="betting in bettingManageList.list">
                <td><input type="checkbox" name="checkbox" v-model="cuserBocaiOrder.idList" :value="betting.id"></td>
                <td>{{betting.orderNum}}</td>
                <td>{{$timestampToTime(betting.createDate)}}</td>
                <td>{{betting.bocaiTypeName}}&nbsp;/&nbsp;{{betting.periods}}期</td>
                <td v-if="betting.bocaiValue!=null && betting.bocaiValue != ''">{{betting.bocaiCategory2Name}}&nbsp;#&nbsp;{{betting.bocaiValue}}&nbsp;@&nbsp;{{betting.odds}}</td>
                <td v-else>{{betting.bocaiCategory2Name}}&nbsp;#&nbsp;{{betting.bocaiOddName}}&nbsp;@&nbsp;{{betting.bocaiOdds}}</td>
                <td>{{betting.betsMoney}}</td>
                <td class="text-error" v-if="betting.winnerStatus == 0">未中奖&nbsp;|&nbsp;-{{betting.betsMoney}}</td>
                <td class="text-error" v-else>中奖&nbsp;{{betting.winnerMoney}}</td>
                <td v-if="betting.status == 0">未结算</td>
                <td v-else>已结算</td>
                <td v-if="betting.bindingIp != ''">{{betting.bindingIp}}</td>
                <td v-else>{{betting.loginIp}}</td>
                <td>
                    <button v-if="betting.status != 0" class="btn" type="button" @click="reOrder(betting.id,betting.orderNum)">改单</button>
                    <button class="btn" @click="deleteBetting(betting.id)" type="button">删除</button>
                    <button class="btn" type="button" @click="isShow(betting.id,0)" v-if="betting.isShow == 1">隐藏</button>
                    <button class="btn" type="button" @click="isShow(betting.id,1)" v-else>显示</button>
                </td>
            </tr>
          </tbody>
        </table>

        <div class="block" v-if="bettingManageList.totalPage > 1">
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="bettingManageList.pageSize"
                    layout="total, prev, pager, next"
                    :total="bettingManageList.totalCount*1">
                  </el-pagination>
        </div>
        
      </div>
    </div>


    <el-dialog class="add-user-dialog" :title="'注单 '+cuserBocaiOrder.orderNum +' 修改'" :visible.sync="dialogvisible" width="40%">
      <div class="portlet">
        <div class="tab">

          <table>
              <tr>
                  <th>帐号名称</th>
                  <td>{{cuserBocaiOrder.username}}</td>
              </tr>
              <tr>
                  <th>游戏类型</th>
                  <td>{{cuserBocaiOrder.bocaiTypeName}}</td>
              </tr>
              <tr>
                  <th>内容</th>
                  <td v-if="bettingFlag">
                      <select v-model="cuserBocaiOrder.bocaiOddId">
                          <option v-for="bocaiOdds in bocaiOddsList" :value="bocaiOdds.id">
                            {{bocaiOdds.bocaiCategory2Name}}&nbsp;#&nbsp;{{bocaiOdds.name}}&nbsp;@&nbsp;{{bocaiOdds.odds}}
                          </option>
                      </select>
                  </td>
                  <td v-else>{{cuserBocaiOrder.bocaiCategory2Name}}&nbsp;#&nbsp;{{cuserBocaiOrder.bocaiValue}}&nbsp;@&nbsp;{{cuserBocaiOrder.bocaiOdds}}</td>
              </tr>
              <tr>
                  <th>投注时间</th>
                  <td>
                    <el-date-picker
                      size="mini"
                      v-model="cuserBocaiOrder.createDateStr"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
                    <!-- <input type="text" v-model="cuserBocaiOrder.createDateStr" > -->
                  </td>
              </tr>
              <tr>
                  <th>投注IP</th>
                  <td v-if="cuserBocaiOrder.bindingIp != null"><input type="text" v-model="cuserBocaiOrder.bindingIp"></td>
                  <td v-else><input type="text" v-model="cuserBocaiOrder.loginIp"></td>
              </tr>
              <tr>
                  <th>金额</th>
                  <td><input type="text" v-model="cuserBocaiOrder.betsMoney"></td>
              </tr>
          </table>
        </div>
      </div>
      <div class="modal-footer">
          <button class="btn btn-primary" @click="reOrderSub">确认</button>
          <button class="btn" @click="dialogvisible = false">取消</button>
      </div>
    </el-dialog>

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
            username: "",
            searchType: "",
            totalPage: 1,
            currentPage:1,
            pageSize:10
        },
        orderHisList: {},//历史订单列表
        dewaterList: [],//退水玩法列表
        periodsList: [],//期数列表
        betsMoneyTotal: 0,
        jiangliMoneyTotal: 0,
        dayList: {},//日期
        betsMoneyAllTotal: 0,
        jiangliMoneyAllTotal: 0,

        dialogvisible: false,

        cuserBocaiOrder: {//对象
            id: null,
            isShow: "",
            idList: [],
            orderNum: "",
            username: "",
            bocaiTypeName: "",
            createDateStr: "",
            bindingIp: "",
            betsMoney: "",
            loginIp: ''
        },
        periodsList: {},//期数
        bettingManageList: {},//注单清理列表
        dayList: {},
        checked: false, //全选框
        bocaiOddsList: {},//菠菜类型列表
        bettingFlag: true,//投注下拉框开关，true为下拉框可用，false为不可用

        cUserId: ''
    }
  },
  computed: {
    ...mapGetters({
      ruleId:'getruleId',
      userInfo: 'getuserInfo',
      bocaiMenu: 'getbocaiMenu',
      betcUserid: 'getbetcUserid'
    })
  },
  created() {
    if(this.betcUserid != '') {
      this.query();
    }
  },
  mounted(){
    // bus.$on('getBetcUserid', (data) => {
    //     console.log('getBetcUserid',data);
    //     this.cUserId = data;

    //     this.nextTick(function(){
    //         console.log(nextTick) //可以得到'changed'

    //         this.query();
    //     })
        
    //   });
  },
  methods: {
    async reOrderSub() {
      let that = this;
      console.log('this.cuserBocaiOrder',this.cuserBocaiOrder);

      this.cuserBocaiOrder.createDateStr = this.$timestampToTime(this.cuserBocaiOrder.createDateStr); 
      // for(let n in this.bocaiOddsList) {
      //   if(this.cuserBocaiOrder.bocaiOddId == this.bocaiOddsList[n].id) {
      //     this.cuserBocaiOrder.bocaiOddName = this.bocaiOddsList[n].name;
      //   }
      // }
      //this.cuserBocaiOrder.betsMoney = this.cuserBocaiOrder.betsMoney*1;

      this.cuserBocaiOrder.bocaiCategory2Id = this.cuserBocaiOrder.bocaiCategory2Id+'';
      this.cuserBocaiOrder.bocaiOddId = this.cuserBocaiOrder.bocaiOddId+'';
      this.cuserBocaiOrder.cuserId = this.cuserBocaiOrder.cuserId+'';
      this.cuserBocaiOrder.id = this.cuserBocaiOrder.id+'';
      this.cuserBocaiOrder.periodsId = this.cuserBocaiOrder.periodsId+'';
      this.cuserBocaiOrder.periodsId = this.cuserBocaiOrder.periodsId+'';
      //this.cuserBocaiOrder.createDate = 1544952155000;


            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
            await that.$post(`${window.url}/admin/betting/bettingSub`,this.cuserBocaiOrder).then((res) => {
              that.$handelResponse(res, (result) => {
              loading.close();
                if(result.code===200){
                  that.$success('改单成功，系统将重新计算该订单结果!');
                  that.query();
                } else {
                  that.$error(result.msg);
                }
              })
            });

    },
    mustbe(id, isMustbe) {
    },
    async reOrder(id, orderNum) {

      let res = await this.$get(`${window.url}/admin/betting/betting?id=`+id);
      if(+res.code===200) {

        this.cuserBocaiOrder = res.data.cuserBocaiOrder;
        this.cuserBocaiOrder.orderNum = orderNum;
        //判断是否可以改单
        this.bettingFlag = true;
        isBetting(this.cuserBocaiOrder);
        this.cuserBocaiOrder.createDateStr = this.$timestampToTime(res.data.cuserBocaiOrder.createDate); 
       // fmtDate(res.data.cuserBocaiOrder.createDate, 2);
        this.bocaiOddsList = res.data.bocaiOddsList;

        console.log('this.cuserBocaiOrder',this.cuserBocaiOrder);

        this.dialogvisible = true;

      }

    },
    checkedAll() {
      let _this = this;
            if (!_this.checked) { //实现反选
                _this.cuserBocaiOrder.idList = [];
            } else { //实现全选
                _this.cuserBocaiOrder.idList = [];
                this.bettingManageList.forEach(function (item, index) {
                    _this.cuserBocaiOrder.idList.push(item.id);
                });
            }
    },
    batchDelete() {

      let that = this;

      this.$c_confirm(async () => {
                  let ret = await that.$post(`${window.url}/admin/betting/batchDelete`,this.cuserBocaiOrder);
                  if(ret.code===200) {
                        that.$success('删除成功');
                        that.cuserBocaiOrder.idList = [];
                        that.query();
                      } else {
                        //that.$error(ret.msg);
                  }
              });

    },
    async batchIsShow(isShow) {
      let that = this;
      this.cuserBocaiOrder.isShow = isShow;
      let ret = await that.$post(`${window.url}/admin/betting/batchIsShow`,this.cuserBocaiOrder);
                  if(ret.code===200) {
                        that.query();
                      } else {
                        //that.$error(ret.msg);
                  }

    },
    async isShow(id,isShow) {
      let that = this;
      this.cuserBocaiOrder.idList = [];
            this.cuserBocaiOrder.idList.push(id);
            this.cuserBocaiOrder.isShow = isShow;

            let ret = await that.$post(`${window.url}/admin/betting/batchIsShow`,this.cuserBocaiOrder);
                  if(ret.code===200) {
                        that.query();
                      } else {
                        //that.$error(ret.msg);
                  }

    },
    async deleteBetting(id) {
      let that = this;
      this.cuserBocaiOrder.idList = [];
            this.cuserBocaiOrder.idList.push(id);

            this.$c_confirm(async () => {
                  let ret = await that.$post(`${window.url}/admin/betting/batchDelete`,this.cuserBocaiOrder);
                  if(ret.code===200) {
                        that.$success('删除成功');
                        that.cuserBocaiOrder.idList = [];
                        that.query();
                      } else {
                        //that.$error(ret.msg);
                  }
              });

    },
    handleCurrentChange(cpage) {
      this.currentPage = cpage;
      this.query();
    },
    async query() {
            this.showList = true;

            let url = 'admin/betting/bettingList?1=1';
            if (null != this.q && null != this.q.bocaiTypeId && '' != this.q.bocaiTypeId) {
                url = url + "&bocaiTypeId=" + this.q.bocaiTypeId
            }
            if (null != this.q && null != this.q.periodsId && '' != this.q.periodsId) {
                url = url + "&periodsId=" + this.q.periodsId
            }
            if (null != this.q && null != this.q.dayStr && '' != this.q.dayStr) {
                url = url + "&dayStr=" + this.q.dayStr
            }
            if (null != this.q && null != this.q.username && '' != this.q.username) {
                url = url + "&username=" + this.q.username
            }

            if (null != this.cUserId && '' != this.cUserId) {
                url = url + "&cUserId=" + this.cUserId
            }


            let res = await this.$get(`${window.url}/`+ url +`&currentPage=`+this.currentPage+`&pageSize=`+this.q.pageSize);
            if(+res.code===200) {

              this.bettingManageList = res.page;
            }



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


function isBetting(cuserBocaiOrder) {
    switch (cuserBocaiOrder.bocaiTypeName) {
        case "六合彩":
            switch (cuserBocaiOrder.bocaiCategory1Name) {
                case "合肖":
                    this.bettingFlag = false;
                    break;
                case "自选不中":
                    this.bettingFlag = false;
                    break;
                case "连肖":
                    this.bettingFlag = false;
                    break;
                case "连尾":
                    this.bettingFlag = false;
                    break;
                case "连码":
                    this.bettingFlag = false;
                    break;
                case "过关":
                    this.bettingFlag = false;
                    break;
            }
            break;
        case "山东11选5":
            switch (cuserBocaiOrder.bocaiCategory1Name) {
                case "连码":
                    this.bettingFlag = false;
                    break;
                case "直选":
                    this.bettingFlag = false;
                    break;
            }
            break;
        case "广东11选5":
            switch (cuserBocaiOrder.bocaiCategory1Name) {
                case "连码":
                    this.bettingFlag = false;
                    break;
                case "直选":
                    this.bettingFlag = false;
                    break;
            }
            break;
        case "广东快乐10分":
            switch (cuserBocaiOrder.bocaiCategory1Name) {
                case "连码":
                    this.bettingFlag = false;
                    break;
            }
            break;
        case "江西11选5":
            switch (cuserBocaiOrder.bocaiCategory1Name) {
                case "连码":
                    this.bettingFlag = false;
                    break;
                case "直选":
                    this.bettingFlag = false;
                    break;
            }
            break;
        case "重庆幸运农村":
            switch (cuserBocaiOrder.bocaiCategory1Name) {
                case "连码":
                    this.bettingFlag = false;
                    break;
            }
            break;
    }
}

</script>

<style scoped>
</style>
