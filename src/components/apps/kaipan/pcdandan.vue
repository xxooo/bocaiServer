<template>
  <div id="chongqindubo" class="content-main duboBodyClass">
    
    <div class="right">
      <div>
        <div>
          <div id="submenu">
            <el-menu
              :default-active="activeIndex"
              class="el-menu-subnav"
              mode="horizontal"
              @select="handleSelect"
              >
              <el-menu-item v-for="(item,index) in bocaiCategoryList" :key="index" :index="item.name" @click="bocaiCategoryId(item)">{{item.name}}</el-menu-item>
            </el-menu>
          </div>
          
        </div>

        <div class="period">
          <div>
            <span class="leftmenuHou">
              <span>
                <select v-model="xushihuo">
                  <option value="1">实货</option> 
                  <option value="2">虚货</option>
                </select>
              </span> 
              <b class="now">
              <span>{{adminBocaiInfo.nowPeriods}} 期</span>
                    距封盘：
                    <b class="red"><span>{{$timestampToTime(adminBocaiInfo.closeTime)}}</span></b></b> 
              <span>距下期开盘：<b><span class="green">{{$timestampToTime(adminBocaiInfo.closeTime)}}</span></b></span> 
                <span>今天输赢 : <b class="green win">{{adminBocaiInfo.winnerMoneySum}}</b></span> 
                <span class="last">{{adminBocaiInfo.hisPeriods}} 期 :</span> 
              <div class="game-result">
                <ul class="result-list">
                    <li class="ball-icon" v-for="(item,index) in adminBocaiInfo.hisResult">{{item}}</li>
                </ul>
              </div>
              <span>总和 : </span>
              <div class="game-result">
                <ul class="result-list">
                    <li class="ball-icon" v-if="curBocaiTypeId == '8223'">
                      {{hisResultAll}}
                    </li>
                </ul>
              </div>
            </span> 
            <!-- <div class="r">
                刷新频率 :
                <select class="mgr10">
                <option value="30">30秒</option> 
                <option value="60">60秒</option> 
                <option value="90">90秒</option>
                </select> 
              <button class="btn btn-blue">立即刷新</button>
            </div> -->
          </div>
        </div>

        <div class="bet_box">
          <div class="orders oodsBodyDiv">

            <template v-if="showOdds == 'PC蛋蛋'">

                <div>
                  <div class="order-table">
                      <table>
                        <tr>
                          <th colspan="8">{{huiheData.name}}</th>
                        </tr>
                          <tr>
                            <template v-for="(item,index) in huiheData.list" v-if="index*1 < 4">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'huiheData'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'huiheData'+item.oddsId">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'huiheData'+item.oddsId" @click="orderTd(item,'huiheData','jian')" ></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i class="iconfont icon-jia1" :class="'huiheData'+item.oddsId" @click="orderTd(item,'huiheData','add')"></i>
                                  </li>
                                  <li><span class="odds-font black">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in huiheData.list" v-if="index*1 > 3">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'huiheData'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'huiheData'+item.oddsId">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'huiheData'+item.oddsId" @click="orderTd(item,'huiheData','jian')" ></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i class="iconfont icon-jia1" :class="'huiheData'+item.oddsId" @click="orderTd(item,'huiheData','add')"></i>
                                  </li>
                                  <li ><span class="odds-font black">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li ><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                      </table>

                      <table>
                        <tr>
                          <th colspan="8">{{boseData.name}}</th>
                        </tr>
                          <tr>
                            <template v-for="(item,index) in boseData.list">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'boseData'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'boseData'+item.oddsId">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'boseData'+item.oddsId" @click="orderTd(item,'boseData','jian')" ></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i class="iconfont icon-jia1" :class="'boseData'+item.oddsId" @click="orderTd(item,'boseData','add')"></i>
                                  </li>
                                  <li ><span class="odds-font black">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li ><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                      </table>

                      <table>
                        <tr>
                          <th colspan="8">{{temaData.name}}</th>
                        </tr>
                          <tr>
                            <template v-for="(item,index) in temaData.list.slice(0,4)" >
                              <td class="tdLeft ordersTdOver" width="8%" :class="'temaData'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'temaData'+item.oddsId">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'temaData'+item.oddsId" @click="orderTd(item,'temaData','jian')" ></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i class="iconfont icon-jia1" :class="'temaData'+item.oddsId" @click="orderTd(item,'temaData','add')"></i>
                                  </li>
                                  <li ><span class="odds-font black">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li ><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in temaData.list.slice(4,8)" >
                              <td class="tdLeft ordersTdOver" width="8%" :class="'temaData'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'temaData'+item.oddsId">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'temaData'+item.oddsId" @click="orderTd(item,'temaData','jian')" ></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i class="iconfont icon-jia1" :class="'temaData'+item.oddsId" @click="orderTd(item,'temaData','add')"></i>
                                  </li>
                                  <li ><span class="odds-font black">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li ><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in temaData.list.slice(8,12)" >
                              <td class="tdLeft ordersTdOver" width="8%" :class="'temaData'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'temaData'+item.oddsId">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'temaData'+item.oddsId" @click="orderTd(item,'temaData','jian')" ></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i class="iconfont icon-jia1" :class="'temaData'+item.oddsId" @click="orderTd(item,'temaData','add')"></i>
                                  </li>
                                  <li ><span class="odds-font black">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li ><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in temaData.list.slice(12,16)" >
                              <td class="tdLeft ordersTdOver" width="8%" :class="'temaData'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'temaData'+item.oddsId">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'temaData'+item.oddsId" @click="orderTd(item,'temaData','jian')" ></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i class="iconfont icon-jia1" :class="'temaData'+item.oddsId" @click="orderTd(item,'temaData','add')"></i>
                                  </li>
                                  <li ><span class="odds-font black">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li ><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in temaData.list.slice(16,20)" >
                              <td class="tdLeft ordersTdOver" width="8%" :class="'temaData'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'temaData'+item.oddsId">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'temaData'+item.oddsId" @click="orderTd(item,'temaData','jian')" ></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i class="iconfont icon-jia1" :class="'temaData'+item.oddsId" @click="orderTd(item,'temaData','add')"></i>
                                  </li>
                                  <li ><span class="odds-font black">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li ><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in temaData.list.slice(20,24)" >
                              <td class="tdLeft ordersTdOver" width="8%" :class="'temaData'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'temaData'+item.oddsId">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'temaData'+item.oddsId" @click="orderTd(item,'temaData','jian')" ></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i class="iconfont icon-jia1" :class="'temaData'+item.oddsId" @click="orderTd(item,'temaData','add')"></i>
                                  </li>
                                  <li ><span class="odds-font black">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li ><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in temaData.list.slice(24,28)" >
                              <td class="tdLeft ordersTdOver" width="8%" :class="'temaData'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'temaData'+item.oddsId">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'temaData'+item.oddsId" @click="orderTd(item,'temaData','jian')" ></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i class="iconfont icon-jia1" :class="'temaData'+item.oddsId" @click="orderTd(item,'temaData','add')"></i>
                                  </li>
                                  <li ><span class="odds-font black">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li ><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                      </table>

                  </div>
                </div>

            </template>

          </div>

          <div class="tool">
            <table>
              <tr>
                <td><button class="btn btn-blue" @click="bocaiCategoryId(bocaiCategory)">还原赔率</button></td> 
                <td>设置调动幅度 :<input v-model="betfudu" width="80px" placeholder="请输入数字"></td>
                <td><button class="btn btn-blue" @click="savebet">保存赔率</button></td> 
              </tr>
            </table>
          </div>


        </div>
      </div>
    </div>
    <p style="clear: both;"></p>


    <el-dialog
      title="注单详情"
      :visible.sync="orderOddsVisible"
      center>

      <div class="popup-body" style="max-height: 300px;">
        <div class="default-list"><p class="tar"><button class="refresh">刷新</button>
            页数：
            <select><option value="1">1</option></select>
            / 1 页 共 1 条记录
          </p> 
          <table>
            <thead>
              <tr>
                <th>编号</th> 
                <th>注单号/投注日期</th> 
                <th>游戏类型</th> 
                <th>级别/名称</th> 
                <th>注单类型</th> 
                <th>内容</th> 
                <th>金额</th> 
                <th>盈亏</th>
              </tr>
            </thead> 
            <tbody>
              <tr class="">
              <td>1</td> 
              <td><p>31261323190</p> <p>2018-12-09 20:37:08</p> <p>(A 盘)</p></td> 
              <td><p>PC蛋蛋</p></td> 
              <td><p><b class="">「会员」alcy111</b></p></td> 
              <td><span>下注</span></td> 
              <td><p>925305 期</p> <span class="odds-font">大</span>@<span class="odds-font">1.983</span></td> 
              <td>11.00</td> 
              <td>10.81</td>
              </tr>
            </tbody> 
            <tr class="tab-footer">
              <td colspan="6" class="tar">此页面统计：</td> 
              <td>11.00</td> 
              <td>10.81</td>
            </tr> 
            <tr class="tab-footer">
              <td colspan="6" class="tar">总计：</td> 
              <td>11.00</td> 
              <td>10.81</td>
            </tr>
          </table>
        </div>

      </div> 

      <span slot="footer" class="dialog-footer">
        <el-button @click="orderOddsVisible = false" size="medium">关 闭</el-button>
      </span>
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
      betfudu: 0.001,
      curBocaiTypeId: '8223',
      curactiveIndex: 'PC蛋蛋',
      bocaiCategoryList: [],
      oddsList: [],
      activeIndex: '',
      showOdds: '',
      submenu: '更多',
      isOpenOdds: true,
      longhuhe_lmp: {},
      yiwuqiu_lmp: [],
      qianhousan_lmp: [],
      orderDataList: [],
      normalPay: false,
      bocaiCategory: {},
      kuaixuanList: ['0','1','2','3','4','5','6','7','8','9'],
      shishiZiDatas: {},
      shishiZiDatasList: [],
      kuaixuanTouList:[],
      kuaixuanWeiList:[],
      tempList:[],
      selectedZiTd:[],
      canOrder: true,

      huiheData: {},
      boseData: {},
      temaData: {},
      xushihuo: '1',
      updateList: [],
      adminBocaiInfo: {},
      hisResultAll: '',
      orderOddsVisible: false,
      oderInfo: {},
      jiangliMoneyTotal: '',
      betsMoneyTotal: ''
    }
  },
  computed: {
    ...mapGetters({
      ruleId:'getruleId',
      userInfo: 'getuserInfo'
    })
  },
  created() {
    //this.getOdds(this.curBocaiTypeId);

    this.getoddsCategory();

    this.getadminBocaiInfo();

    console.log('userInfo',this.userInfo);

  },
  mounted(){
      bus.$on('isOpenOdds', (data) => {
        this.isOpenOdds = data;
      });
  },
  methods: {
    qingkong() {
      $('.bet_box .orders td').removeClass('selected');
      this.updateList = [];
    },
    async getoddInfo(item) {

      let res = await this.$get(`${window.url}/admin/bocai/oddsOrder?bocaiOddsId=`+item.oddsId);

      if(res.code===200){
        this.jiangliMoneyTotal = res.jiangliMoneyTotal;
        this.betsMoneyTotal = res.betsMoneyTotal;
        this.oderInfo = res.page;
      }

      this.orderOddsVisible = true;
    },
    async savebet() {

      let isBase = this.ruleId == 1 ? 1 : this.ruleId == 3 ? 2 : '';

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
        isBase: isBase,
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
      let isBase = this.ruleId == 1 ? 1 : this.ruleId == 3 ? 2 : '';
      
      let res = await this.$get(`${window.url}/admin/bocai/oddsCategory?bocaiTypeId=`+this.curBocaiTypeId+`&isBase=`+isBase);

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
    async bocaiCategoryId(item) {
      console.log('item',item);

      let isBase = this.ruleId == 1 ? 1 : this.ruleId == 3 ? 2 : '';

      let that = this;

          NProgress.start();
          await that.$get(`${window.url}/admin/bocai/odds?bocaiCategoryId=`+item.id+`&isBase=`+isBase+`&bocaiTypeId=`+this.curBocaiTypeId).then((res) => {
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


</style>
