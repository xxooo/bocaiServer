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

            <template v-if="showOdds == '总行、比数、五行'">

                <div>
                  <div class="order-table">
                      <table>
                        <tr>
                          <th colspan="8">{{zongheguoguan.name}}</th>
                        </tr>
                          <tr>
                            <template v-for="(item,index) in zongheguoguan.list.slice(0,4)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'zongheguoguan'+item.oddsId" @click="orderTd(zongheguoguan,item,'zongheguoguan')" @mouseenter="overShow(item,'zongheguoguan')" @mouseleave="outHide(item,'zongheguoguan')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'zongheguoguan'+item.oddsId" @click="orderTd(zongheguoguan,item,'zongheguoguan')" @mouseenter="overShow(item,'zongheguoguan')" @mouseleave="outHide(item,'zongheguoguan')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(zongheguoguan,item,'zongheguoguan',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in zongheguoguan.list.slice(4,5)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'zongheguoguan'+item.oddsId" @click="orderTd(zongheguoguan,item,'zongheguoguan')" @mouseenter="overShow(item,'zongheguoguan')" @mouseleave="outHide(item,'zongheguoguan')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'zongheguoguan'+item.oddsId" @click="orderTd(zongheguoguan,item,'zongheguoguan')" @mouseenter="overShow(item,'zongheguoguan')" @mouseleave="outHide(item,'zongheguoguan')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(zongheguoguan,item,'zongheguoguan',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                            <td colspan="6">&nbsp;</td>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in zongheguoguan.list.slice(5,9)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'zongheguoguan'+item.oddsId" @click="orderTd(zongheguoguan,item,'zongheguoguan')" @mouseenter="overShow(item,'zongheguoguan')" @mouseleave="outHide(item,'zongheguoguan')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'zongheguoguan'+item.oddsId" @click="orderTd(zongheguoguan,item,'zongheguoguan')" @mouseenter="overShow(item,'zongheguoguan')" @mouseleave="outHide(item,'zongheguoguan')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(zongheguoguan,item,'zongheguoguan',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                      </table>

                      <table>
                        <tr>
                          <th colspan="8">{{qianhouhe.name}}</th>
                        </tr>
                          <tr>
                            <template v-for="(item,index) in qianhouhe.list">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'qianhouhe'+item.oddsId" @click="orderTd(qianhouhe,item,'qianhouhe')" @mouseenter="overShow(item,'qianhouhe')" @mouseleave="outHide(item,'qianhouhe')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'qianhouhe'+item.oddsId" @click="orderTd(qianhouhe,item,'qianhouhe')" @mouseenter="overShow(item,'qianhouhe')" @mouseleave="outHide(item,'qianhouhe')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(qianhouhe,item,'qianhouhe',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                      </table>

                      <table>
                        <tr>
                          <th colspan="8">{{danshuanghe.name}}</th>
                        </tr>
                          <tr>
                            <template v-for="(item,index) in danshuanghe.list">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'danshuanghe'+item.oddsId" @click="orderTd(danshuanghe,item,'danshuanghe')" @mouseenter="overShow(item,'danshuanghe')" @mouseleave="outHide(item,'danshuanghe')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'danshuanghe'+item.oddsId" @click="orderTd(danshuanghe,item,'danshuanghe')" @mouseenter="overShow(item,'danshuanghe')" @mouseleave="outHide(item,'danshuanghe')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(danshuanghe,item,'danshuanghe',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                      </table>

                      <table>
                        <tr>
                          <th colspan="10">{{wuxing.name}}</th>
                        </tr>
                          <tr>
                            <template v-for="(item,index) in wuxing.list">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'wuxing'+item.oddsId" @click="orderTd(wuxing,item,'wuxing')" @mouseenter="overShow(item,'wuxing')" @mouseleave="outHide(item,'wuxing')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'wuxing'+item.oddsId" @click="orderTd(wuxing,item,'wuxing')" @mouseenter="overShow(item,'wuxing')" @mouseleave="outHide(item,'wuxing')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(wuxing,item,'wuxing',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                      </table>
                  </div>
                </div>

            </template>

            <template v-if="showOdds == '正码'">

                <div>
                  <div class="order-table">
                      <table>
                        <tr>
                          <th colspan="8">{{zhengma.name}}</th>
                        </tr>
                        <tr v-for="(itemPa,indexPa) in zhengma.list">
                            <template v-for="(item,index) in itemPa">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'zhengma'+item.oddsId" @click="orderTd(zhengma,item,'zhengma')" @mouseenter="overShow(item,'zhengma')" @mouseleave="outHide(item,'zhengma')"><div :class="item.oddsName*1 > 40 ? 'ballda' : 'ballxiao'">{{item.oddsName}}</div></td>
                              <td class="tdRight" :class="'zhengma'+item.oddsId" @click="orderTd(zhengma,item,'zhengma')" @mouseenter="overShow(item,'zhengma')" @mouseleave="outHide(item,'zhengma')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(zhengma,item,'zhengma',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
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

            <footer-Bocai :curBocaiTypeId="curBocaiTypeId"></footer-Bocai>

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
      curBocaiTypeId: '8266',
      curactiveIndex: '北京快乐8',
      bocaiCategoryList: [],
      oddsList: [],
      activeIndex: '',
      showOdds: '',
      submenu: '更多',
      isOpenOdds: true,
      longhuhe_lmp: {},
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

      zongheguoguan: {},
      qianhouhe: {},
      danshuanghe: {},
      wuxing: {},
      zhengma: {}
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

      console.log('点了吗1');

      console.log('this.isOpenOdds',this.isOpenOdds);

      if(this.isOpenOdds) {

        if(!this.normalPay) {
          

          if($('.'+ids+item.oddsId).hasClass('selected')){

              $('.'+ids+item.oddsId).removeClass('selected');
              _.remove(this.orderDataList, function(n) {
                return n.bocaiOddName == item.oddsName;
              });

          } else {
            console.log('点了吗3');

            $('.'+ids+item.oddsId).addClass('selected');

            let obj = {
              bocaiCategory2Id: oddsObj.id,//8225,//投注博彩分类2ID
              bocaiCategory2Name: oddsObj.name,//"混合",//投注博彩分类2名称
              bocaiOddId: item.oddsId,//5543,//投注博彩赔率ID
              bocaiOddName: item.oddsName,//"大",//投注博彩赔率名称
              bocaiValue:"",//投注内容,六合彩连肖/连尾
              normalMoney: item.normalMoney,//10000,//一般模式下，选择的金额
              orderNormal: this.normalPay,   //是快捷，还是一般投注
              bocaiOdds: item.odds, //1.90//赔率
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

      if(this.showOdds == '总行、比数、五行') {
        for(let m in dataList) {
          if(dataList[m].name == '总和、总和过关') {
            this.zongheguoguan = dataList[m];
          }
          if(dataList[m].name == '前后和') {
            this.qianhouhe = dataList[m];
          }
          if(dataList[m].name == '单双和') {
            this.danshuanghe = dataList[m];
          }
          if(dataList[m].name == '五行') {
            this.wuxing = dataList[m];
          }
        }
      } else if(this.showOdds == '正码') {

        let arr = this.oddsList[0];

        this.zhengma.id = arr.id;
        this.zhengma.name = arr.name;
        this.zhengma.list = [];

        //console.log('arr.list',arr.list);

        this.zhengma.list.push([arr.list[0],arr.list[20],arr.list[40],arr.list[60]]);
        this.zhengma.list.push([arr.list[1],arr.list[21],arr.list[41],arr.list[61]]);
        this.zhengma.list.push([arr.list[2],arr.list[22],arr.list[42],arr.list[62]]);
        this.zhengma.list.push([arr.list[3],arr.list[23],arr.list[43],arr.list[63]]);
        this.zhengma.list.push([arr.list[4],arr.list[24],arr.list[44],arr.list[64]]);
        this.zhengma.list.push([arr.list[5],arr.list[25],arr.list[45],arr.list[65]]);
        this.zhengma.list.push([arr.list[6],arr.list[26],arr.list[46],arr.list[66]]);
        this.zhengma.list.push([arr.list[7],arr.list[27],arr.list[47],arr.list[67]]);
        this.zhengma.list.push([arr.list[8],arr.list[28],arr.list[48],arr.list[68]]);
        this.zhengma.list.push([arr.list[9],arr.list[29],arr.list[49],arr.list[69]]);
        this.zhengma.list.push([arr.list[10],arr.list[30],arr.list[50],arr.list[70]]);
        this.zhengma.list.push([arr.list[11],arr.list[31],arr.list[51],arr.list[71]]);
        this.zhengma.list.push([arr.list[12],arr.list[32],arr.list[52],arr.list[72]]);
        this.zhengma.list.push([arr.list[13],arr.list[33],arr.list[53],arr.list[73]]);
        this.zhengma.list.push([arr.list[14],arr.list[34],arr.list[54],arr.list[74]]);
        this.zhengma.list.push([arr.list[15],arr.list[35],arr.list[55],arr.list[75]]);
        this.zhengma.list.push([arr.list[16],arr.list[36],arr.list[56],arr.list[76]]);
        this.zhengma.list.push([arr.list[17],arr.list[37],arr.list[57],arr.list[77]]);
        this.zhengma.list.push([arr.list[18],arr.list[38],arr.list[58],arr.list[78]]);
        this.zhengma.list.push([arr.list[19],arr.list[39],arr.list[59],arr.list[79]]);

        //console.log('this.zhengma',this.zhengma);
        //this.zhengma = this.oddsList[0];
      }
    }

  }
}

</script>

<style scoped>


</style>
