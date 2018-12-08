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
              <el-menu-item v-for="(item,index) in bocaiCategoryList" :key="index" :index="item.name" @click="getOddsCategory(item,index)">{{item.name}}</el-menu-item>
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
              <span>20181204091 期</span>
                    距封盘：
                    <b class="red"><span>00:02:20</span></b></b> 
              <span>距下期开盘：<b><span class="green">00:03:20</span></b></span> 
                <span>今天输赢 : <b class="green win">0.00</b></span> 
                <span class="last">20181204090 期 :</span> 
              <div class="game-result">
                <ul class="result-list">
                    <li class="ball-icon">6</li>
                    <li class="ball-icon">6</li>
                    <li class="ball-icon">5</li>
                    <li class="ball-icon">2</li>
                    <li class="ball-icon">3</li>
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
                                    <span class="odds-font">{{item.odds}}</span>
                                    <i class="iconfont icon-jia1" :class="'huiheData'+item.oddsId" @click="orderTd(item,'huiheData','add')"></i>
                                  </li>
                                  <li ><span class="odds-font">{{xushihuo == '1' ? item.shBetMoneySum : item.shWinnerMoneySum}}</span></li>
                                  <li ><span class="odds-font">{{xushihuo == '1' ? item.betMoneySum : item.winnerMoneySum}}</span></li>
                                </ul>


                                <!-- "oddsName": "总和大",//赔率名称
                    "shWinnerMoneySum": 2,//实货可赢合计
                    "winnerMoneySum": 10,//虚货可赢合计
                    "shBetMoneySum": 1,//实货下注合计
                    "oddsId": 1,//赔率ID
                    "normalMoney": "",
                    "odds": 2,//赔率
                    "dewaterId": 5,
                    "betMoneySum": 5//虚货可赢合计 -->

                    
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in huiheData.list" v-if="index*1 > 3">
                              <td class="tdLeft" width="8%" :class="'huiheData'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'huiheData'+item.oddsId"> 
                                <ul>
                                  <li>
                                    <span class="odds-font">{{item.odds}}</span>
                                  </li>
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
                                  <li><span class="odds-font">{{item.odds}}</span></li>
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
                              <td class="tdLeft ordersTdOver" width="8%" :class="'temaData'+item.oddsId" @click="orderTd(temaData,item,'temaData')" @mouseenter="overShow(item,'temaData')" @mouseleave="outHide(item,'temaData')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'temaData'+item.oddsId" @click="orderTd(temaData,item,'temaData')" @mouseenter="overShow(item,'temaData')" @mouseleave="outHide(item,'temaData')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(temaData,item,'temaData',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in temaData.list.slice(4,8)" >
                              <td class="tdLeft ordersTdOver" width="8%" :class="'temaData'+item.oddsId" @click="orderTd(temaData,item,'temaData')" @mouseenter="overShow(item,'temaData')" @mouseleave="outHide(item,'temaData')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'temaData'+item.oddsId" @click="orderTd(temaData,item,'temaData')" @mouseenter="overShow(item,'temaData')" @mouseleave="outHide(item,'temaData')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(temaData,item,'temaData',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in temaData.list.slice(8,12)" >
                              <td class="tdLeft ordersTdOver" width="8%" :class="'temaData'+item.oddsId" @click="orderTd(temaData,item,'temaData')" @mouseenter="overShow(item,'temaData')" @mouseleave="outHide(item,'temaData')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'temaData'+item.oddsId" @click="orderTd(temaData,item,'temaData')" @mouseenter="overShow(item,'temaData')" @mouseleave="outHide(item,'temaData')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(temaData,item,'temaData',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in temaData.list.slice(12,16)" >
                              <td class="tdLeft ordersTdOver" width="8%" :class="'temaData'+item.oddsId" @click="orderTd(temaData,item,'temaData')" @mouseenter="overShow(item,'temaData')" @mouseleave="outHide(item,'temaData')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'temaData'+item.oddsId" @click="orderTd(temaData,item,'temaData')" @mouseenter="overShow(item,'temaData')" @mouseleave="outHide(item,'temaData')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(temaData,item,'temaData',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in temaData.list.slice(16,20)" >
                              <td class="tdLeft ordersTdOver" width="8%" :class="'temaData'+item.oddsId" @click="orderTd(temaData,item,'temaData')" @mouseenter="overShow(item,'temaData')" @mouseleave="outHide(item,'temaData')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'temaData'+item.oddsId" @click="orderTd(temaData,item,'temaData')" @mouseenter="overShow(item,'temaData')" @mouseleave="outHide(item,'temaData')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(temaData,item,'temaData',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in temaData.list.slice(20,24)" >
                              <td class="tdLeft ordersTdOver" width="8%" :class="'temaData'+item.oddsId" @click="orderTd(temaData,item,'temaData')" @mouseenter="overShow(item,'temaData')" @mouseleave="outHide(item,'temaData')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'temaData'+item.oddsId" @click="orderTd(temaData,item,'temaData')" @mouseenter="overShow(item,'temaData')" @mouseleave="outHide(item,'temaData')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(temaData,item,'temaData',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in temaData.list.slice(24,28)" >
                              <td class="tdLeft ordersTdOver" width="8%" :class="'temaData'+item.oddsId" @click="orderTd(temaData,item,'temaData')" @mouseenter="overShow(item,'temaData')" @mouseleave="outHide(item,'temaData')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'temaData'+item.oddsId" @click="orderTd(temaData,item,'temaData')" @mouseenter="overShow(item,'temaData')" @mouseleave="outHide(item,'temaData')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(temaData,item,'temaData',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
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
                <td><button class="btn btn-blue" @click="">还原赔率</button></td> 
                <td>设置调动幅度 :<input v-model="betfudu" width="80px" placeholder="请输入数字"></td>
              </tr>
            </table>
          </div>


        </div>
      </div>
    </div>
    <p style="clear: both;"></p>
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
      xushihuo: '1'
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

  },
  mounted(){
      bus.$on('isOpenOdds', (data) => {
        this.isOpenOdds = data;
      });
  },
  methods: {
    addbet(item) {
      console.log('addbet',item);
    },
    jianbet(item) {
      console.log('jianbet',item);
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
    qingkong() {
      $('.bet_box .orders td').removeClass('selected');
      this.orderDataList = [];
    },
    allQingkong() {
      $('.bet_box .orders td').removeClass('selected');
      this.orderDataList = [];
      $('.kuaixuanTable td').removeClass('active');
      this.kuaixuanTouList = [];
      this.kuaixuanWeiList = [];
    },
    childByChangePay(data) {
      if(this.normalPay != data) {
        this.orderDataList = [];
        $('.bet_box .orders td').removeClass('selected');
        this.allQingkong();
      }
      this.normalPay = data;
    },
    childByReset(data) {
      this.resetOddsCategory(this.bocaiCategory);
      this.allQingkong();
    },
    outHide(item,ids) {
      $('.'+ids+item.oddsId).removeClass('overTd');
    },
    overShow(item,ids) {
      $('.'+ids+item.oddsId).addClass('overTd');
    },
    inputFuncYiZi(item,ids,pay) {
      let oddsObj = this.shishiZiDatas;

      this.inputFunc(oddsObj,item,ids,pay);
    },
    inputFunc(oddsObj,item,ids,pay) {

      let reg = /^[\u2E80-\u9FFF]+$/;
      if(reg.test(this.moneyOrder)){
        this.$alertMessage('请确认注单!', '温馨提示');
      } else {
        if(this.normalPay) {
          if(pay == '') {
            $('.'+ids+item.oddsId).removeClass('selected');
            _.remove(this.orderDataList, function(n) {
                    return n.bocaiOddName == item.oddsName;
                  });
          } else {

            $('.'+ids+item.oddsId).addClass('selected');
                let ifHas = false;
                for(let n in this.orderDataList) {
                  if(this.orderDataList[n].bocaiOddId == item.oddsId) {
                    ifHas = true;
                    let obj = {
                      bocaiCategory2Id: oddsObj.id,//8225,//投注博彩分类2ID
                      bocaiCategory2Name: oddsObj.name,//"混合",//投注博彩分类2名称
                      bocaiOddId: item.oddsId,//5543,//投注博彩赔率ID
                      bocaiOddName: item.oddsName,//"大",//投注博彩赔率名称
                      bocaiValue:"",//投注内容,六合彩连肖/连尾
                      normalMoney: item.normalMoney,//10000,//一般模式下，选择的金额
                      orderNormal: this.normalPay,   //是快捷，还是一般投注
                      bocaiOdds: item.odds,//1.90//赔率
                      dewaterId: item.dewaterId
                    };

                    this.orderDataList[n] = obj;
                  }
                }

                if(!ifHas) {
                  let obj = {
                    bocaiCategory2Id: oddsObj.id,//8225,//投注博彩分类2ID
                    bocaiCategory2Name: oddsObj.name,//"混合",//投注博彩分类2名称
                    bocaiOddId: item.oddsId,//5543,//投注博彩赔率ID
                    bocaiOddName: item.oddsName,//"大",//投注博彩赔率名称
                    bocaiValue:"",//投注内容,六合彩连肖/连尾
                    normalMoney: item.normalMoney,//10000,//一般模式下，选择的金额
                    orderNormal: this.normalPay,   //是快捷，还是一般投注
                    bocaiOdds: item.odds,//1.90//赔率
                    dewaterId: item.dewaterId
                  };

                  this.orderDataList.push(obj);
                }
          }
        }
      }

      
    },
    orderTd(item,ids,opbet) {

      console.log('opbet',opbet);

      $('.'+ids+item.oddsId).addClass('selected');

      let num = 0;

      if(opbet == 'add') {

        item.odds = item.odds*1 + this.betfudu*1;

        item.odds = Math.floor(item.odds*1000)/1000;

        // console.log('item.odds',item.odds);
        // console.log('this.betfudu',this.betfudu);


        // item.odds = Math.floor((item.odds + this.betfudu)*1000)/1000;

        // console.log('num',num);

        // item.odds = Math.floor(num*1000)/1000;

        //console.log('item.odds22',item.odds);
      } else {

        item.odds = item.odds*1 - this.betfudu*1;

        item.odds = Math.floor(item.odds*1000)/1000;

        // console.log('item.odds',item.odds);
        // console.log('this.betfudu',this.betfudu);

        // num = item.odds*1 - this.betfudu*1;

        // item.odds = Math.floor(num*1000)/1000;
        // console.log('num',num);
        //  console.log('item.odds22',item.odds);
      }
      
    },
    handleSelect(key, keyPath) {
        //console.log(key, keyPath);
    },
    async resetOddsCategory(item) {

      let that = this;

          NProgress.start();
          await that.$get(`${window.url}/api/getOdds?bocaiTypeId=`+this.curBocaiTypeId+`&bocaiCategoryId=`+item.id).then((res) => {
            that.$handelResponse(res, (result) => {
              NProgress.done();
              that.showOdds = item.name;
              that.bocaiCategory = item;
              if(result.code===200){
                that.oddsList = result.oddsList;
                
                that.orderDataList = [];
                that.normalPay = false;
                bus.$emit('getnormalPay', false); 

                that.shuaiXuanDatas(result.oddsList);

              }
            })
          });
    },
    async getOddsCategory(item,index) {
      this.submenu = item.name;

      // if(index*1 > 9) {
      //   this.submenu = item.name;
      // } else {
      //   this.submenu = '更多';
      // }

      this.resetOddsCategory(item);

    },
    async getOdds(id) {

      let that = this;
          //NProgress.start();
          await that.$get(`${window.url}/api/getOdds?bocaiTypeId=`+id).then((res) => {
            that.$handelResponse(res, (result) => {
              //NProgress.done();
              if(result.code===200){
                bus.$emit('curactiveIndex', this.curactiveIndex);
                that.bocaiCategoryList = result.bocaiCategoryList;
                that.oddsList = result.oddsList;
                that.showOdds = result.bocaiCategoryList[0].name;
                that.bocaiCategory = result.bocaiCategoryList[0];
                that.activeIndex = that.bocaiCategoryList[0].name;
                that.shuaiXuanDatas(result.oddsList);

                bus.$emit('getbocaiTypeId', that.curBocaiTypeId); 
                bus.$emit('getbocaiTypeName', that.curactiveIndex); 

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
