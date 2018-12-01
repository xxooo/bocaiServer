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
              text-color="#ebcb80"
              active-text-color="#f6e9c7">
              <el-menu-item v-for="(item,index) in bocaiCategoryList" :key="index" :index="item.name" @click="getOddsCategory(item,index)" v-if="index*1 < 11">{{item.name}}</el-menu-item>
              <el-submenu v-if="bocaiCategoryList.length*1 > 11" key="submenu" index="submenu">
                <template slot="title">{{submenu}}</template>
                <el-menu-item v-for="(item,index) in bocaiCategoryList" :key="index" :index="item.name" @click="getOddsCategory(item,index)" v-if="index*1 > 10">{{item.name}}</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
          
          <clock-time></clock-time>
        </div>
        <div class="bet_box">
          <div class="orders oodsBodyDiv">
            <div class="order-info">
              <bet-quick :orderDataList="orderDataList" :canOrder="canOrder" :bocaiCategory="bocaiCategory" v-on:childByReset="childByReset" v-on:childByChangePay="childByChangePay"></bet-quick>
            </div>


            <template v-if="showOdds == 'PC蛋蛋'">

                <div>
                  <div class="order-table">
                      <table>
                        <tr>
                          <th colspan="8">{{huiheData.name}}</th>
                        </tr>
                          <tr>
                            <template v-for="(item,index) in huiheData.list" v-if="index*1 < 4">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'huiheData'+item.oddsId" @click="orderTd(huiheData,item,'huiheData')" @mouseenter="overShow(item,'huiheData')" @mouseleave="outHide(item,'huiheData')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'huiheData'+item.oddsId" @click="orderTd(huiheData,item,'huiheData')" @mouseenter="overShow(item,'huiheData')" @mouseleave="outHide(item,'huiheData')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(huiheData,item,'huiheData',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in huiheData.list" v-if="index*1 > 3">
                              <td class="tdLeft" width="8%" :class="'huiheData'+item.oddsId" @click="orderTd(huiheData,item,'huiheData')" @mouseenter="overShow(item,'huiheData')" @mouseleave="outHide(item,'huiheData')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'huiheData'+item.oddsId" @click="orderTd(huiheData,item,'huiheData')" @mouseenter="overShow(item,'huiheData')" @mouseleave="outHide(item,'huiheData')"> 
                                <ul>
                                  <li>
                                    <span class="odds-font">{{item.odds}}</span>
                                  </li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(huiheData,item,'huiheData',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
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
                              <td class="tdLeft ordersTdOver" width="8%" :class="'boseData'+item.oddsId" @click="orderTd(boseData,item,'boseData')" @mouseenter="overShow(item,'boseData')" @mouseleave="outHide(item,'boseData')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'boseData'+item.oddsId" @click="orderTd(boseData,item,'boseData')" @mouseenter="overShow(item,'boseData')" @mouseleave="outHide(item,'boseData')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(boseData,item,'boseData',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
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

            <div class="order-info">
              <bet-quick :orderDataList="orderDataList" :canOrder="canOrder" :bocaiCategory="bocaiCategory" v-on:childByReset="childByReset" v-on:childByChangePay="childByChangePay"></bet-quick>
            </div>


          </div>


        </div>
      </div>
    </div>
    <p style="clear: both;"></p>
  </div>
</template>

<script>
import BetQuick from '@/components/apps/bocai/components/betQuick';
import ClockTime from '@/components/apps/bocai/components/clockTime';
import FooterBocai from '@/components/apps/bocai/components/footerBocai';

export default {
  components: {
    ClockTime,
    BetQuick,
    FooterBocai
  },
  data () {
    return {
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
      temaData: {}
    }
  },
  computed: {
  },
  created() {
    this.getOdds(this.curBocaiTypeId);
  },
  mounted(){
      bus.$on('isOpenOdds', (data) => {
        this.isOpenOdds = data;
      });
  },
  methods: {
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
    orderTd(oddsObj,item,ids) {

      if(this.isOpenOdds) {

        if(!this.normalPay) {
          if($('.'+ids+item.oddsId).hasClass('selected')){

              $('.'+ids+item.oddsId).removeClass('selected');
              _.remove(this.orderDataList, function(n) {
                return n.bocaiOddName == item.oddsName;
              });

          } else {
            $('.'+ids+item.oddsId).addClass('selected');

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

      if(index*1 > 9) {
        this.submenu = item.name;
      } else {
        this.submenu = '更多';
      }

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
