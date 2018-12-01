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

            <template v-if="showOdds == '两面盘'">

                <div>
                  <div class="order-table">
                      <table>
                        <tr>
                          <th colspan="8">{{guanyajunhe.name}}</th>
                        </tr>
                          <tr>
                            <template v-for="(item,index) in guanyajunhe.list" v-if="index*1 < 4">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'guanyajunhe'+item.oddsId" @click="orderTd(guanyajunhe,item,'guanyajunhe')" @mouseenter="overShow(item,'guanyajunhe')" @mouseleave="outHide(item,'guanyajunhe')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'guanyajunhe'+item.oddsId" @click="orderTd(guanyajunhe,item,'guanyajunhe')" @mouseenter="overShow(item,'guanyajunhe')" @mouseleave="outHide(item,'guanyajunhe')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(guanyajunhe,item,'guanyajunhe',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in guanyajunhe.list" v-if="index*1 > 3">
                              <td class="tdLeft" width="8%" :class="'guanyajunhe'+item.oddsId" @click="orderTd(guanyajunhe,item,'guanyajunhe')" @mouseenter="overShow(item,'guanyajunhe')" @mouseleave="outHide(item,'guanyajunhe')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'guanyajunhe'+item.oddsId" @click="orderTd(guanyajunhe,item,'guanyajunhe')" @mouseenter="overShow(item,'guanyajunhe')" @mouseleave="outHide(item,'guanyajunhe')"> 
                                <ul>
                                  <li>
                                    <span class="odds-font">{{item.odds}}</span>
                                  </li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(guanyajunhe,item,'guanyajunhe',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                      </table>
                  </div>
                </div>

                <div class="qiu15_body">

                <div class="eball" v-for="(itemPa,index) in yidaoshi">
                    <div class="order-table">
                      <table>
                        <tr>
                          <th colspan="2">{{itemPa.name}}</th>
                        </tr>
                        <tr v-for="(item,index) in itemPa.list">
                          <td class="tdLeft" :class="'yidaoshi'+item.oddsId" @click="orderTd(itemPa,item,'yidaoshi')" @mouseenter="overShow(item,'yidaoshi')" @mouseleave="outHide(item,'yidaoshi')">{{item.oddsName}}</td>
                          <td class="tdRight" :class="'yidaoshi'+item.oddsId" @click="orderTd(itemPa,item,'yidaoshi')" @mouseenter="overShow(item,'yidaoshi')" @mouseleave="outHide(item,'yidaoshi')">
                            <ul>
                              <li>
                                <span class="odds-font">{{item.odds}}</span>
                              </li>
                              <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(itemPa,item,'yidaoshi',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                            </ul>
                          </td>
                        </tr>
                      </table>
                    </div>
                </div>

              </div>

            </template>

            <template v-if="showOdds == '1~10名'">
              <div>
                <div class="qiu15_body yidaoshiming">
                  <div class="nball" v-for="(item_yishi,index_yishi) in oddsList">
                    <div class="order-table">
                      <table>
                        <tr><th colspan="2">{{item_yishi.name}}</th></tr>
                        <tr v-for="(item,index) in item_yishi.list">
                            <td v-if="isNaN(item.oddsName*1)" class="oddsNtd tdLeft" :class="'item_yishi'+item.oddsId" @click="orderTd(item_yishi,item,'item_yishi')" @mouseenter="overShow(item,'item_yishi')" @mouseleave="outHide(item,'item_yishi')">{{item.oddsName}}</td>
                            <td v-else class="oddsNtd tdLeft" :class="'item_yishi'+item.oddsId" @click="orderTd(item_yishi,item,'item_yishi')" @mouseenter="overShow(item,'item_yishi')" @mouseleave="outHide(item,'item_yishi')"><div class="ball-fang" :class="'ball-fang'+item.oddsName">{{item.oddsName}}</div></td> 
                            <td class="oddsUltd" :class="'item_yishi'+item.oddsId" @click="orderTd(item_yishi,item,'item_yishi')" @mouseenter="overShow(item,'item_yishi')" @mouseleave="outHide(item,'item_yishi')">
                              <ul>
                                <li><span class="odds-font" >{{item.odds}}</span></li>
                                <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(item_yishi,item,'item_yishi',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                              </ul>
                            </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div> 
            </template>


            <template v-if="showOdds == '冠亚组合'">
              <div class="order-table">
                      <table>
                        <tr>
                          <th colspan="8">{{guanyaZonghe.name}}</th>
                        </tr>
                          <tr>
                            <template v-for="(item,index) in guanyaZonghe.list.slice(0,4)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(guanyaZonghe,item,'guanyaZonghe')" @mouseenter="overShow(item,'guanyaZonghe')" @mouseleave="outHide(item,'guanyaZonghe')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(guanyaZonghe,item,'guanyaZonghe')" @mouseenter="overShow(item,'guanyaZonghe')" @mouseleave="outHide(item,'guanyaZonghe')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(guanyaZonghe,item,'guanyaZonghe',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in guanyaZonghe.list.slice(4,8)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(guanyaZonghe,item,'guanyaZonghe')" @mouseenter="overShow(item,'guanyaZonghe')" @mouseleave="outHide(item,'guanyaZonghe')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(guanyaZonghe,item,'guanyaZonghe')" @mouseenter="overShow(item,'guanyaZonghe')" @mouseleave="outHide(item,'guanyaZonghe')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(guanyaZonghe,item,'guanyaZonghe',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in guanyaZonghe.list.slice(8,12)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(guanyaZonghe,item,'guanyaZonghe')" @mouseenter="overShow(item,'guanyaZonghe')" @mouseleave="outHide(item,'guanyaZonghe')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(guanyaZonghe,item,'guanyaZonghe')" @mouseenter="overShow(item,'guanyaZonghe')" @mouseleave="outHide(item,'guanyaZonghe')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(guanyaZonghe,item,'guanyaZonghe',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in guanyaZonghe.list.slice(12,16)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(guanyaZonghe,item,'guanyaZonghe')" @mouseenter="overShow(item,'guanyaZonghe')" @mouseleave="outHide(item,'guanyaZonghe')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(guanyaZonghe,item,'guanyaZonghe')" @mouseenter="overShow(item,'guanyaZonghe')" @mouseleave="outHide(item,'guanyaZonghe')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(guanyaZonghe,item,'guanyaZonghe',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in guanyaZonghe.list.slice(16,17)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(guanyaZonghe,item,'guanyaZonghe')" @mouseenter="overShow(item,'guanyaZonghe')" @mouseleave="outHide(item,'guanyaZonghe')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(guanyaZonghe,item,'guanyaZonghe')" @mouseenter="overShow(item,'guanyaZonghe')" @mouseleave="outHide(item,'guanyaZonghe')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(guanyaZonghe,item,'guanyaZonghe',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                            <td class="tdLeft ordersTdOver" colspan="6"></td>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in guanyaZonghe.list.slice(17)">
                              <td class="tdLeft" width="8%" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(guanyaZonghe,item,'guanyaZonghe')" @mouseenter="overShow(item,'guanyaZonghe')" @mouseleave="outHide(item,'guanyaZonghe')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(guanyaZonghe,item,'guanyaZonghe')" @mouseenter="overShow(item,'guanyaZonghe')" @mouseleave="outHide(item,'guanyaZonghe')"> 
                                <ul>
                                  <li>
                                    <span class="odds-font">{{item.odds}}</span>
                                  </li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(guanyaZonghe,item,'guanyaZonghe',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                      </table>
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
      curBocaiTypeId: '9057',
      curactiveIndex: '极速赛车',
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

      guanyajunhe: {},
      yidaoshi: {},
      guanyaZonghe: {}
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
      if(this.showOdds == '两面盘') {
        let qianhousanTemp = [];
        for(let m in dataList) {
          if(dataList[m].name == '冠、亚军和') {
            this.guanyajunhe = dataList[m];
          }
          if(['冠军','亚军','第三名','第四名','第五名','第六名','第七名','第八名','第九名','第十名'].findIndex((n) => n == dataList[m].name)>-1) {
            qianhousanTemp.push(dataList[m]);
          }
        }
        this.yidaoshi = qianhousanTemp;
      } else if(this.showOdds == '冠亚组合') {
        this.guanyaZonghe = this.oddsList[0];
      }
    }

  }
}

</script>

<style scoped>


</style>
