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
              <bet-quick :orderDataList="orderDataList" :bocaiCategory="bocaiCategory" v-on:childByReset="childByReset" v-on:childByChangePay="childByChangePay"></bet-quick>
            </div>

            <template v-if="showOdds == '两面盘'">

                <div class="oodsBodyDiv">
                  <div class="order-table">
                      <table>
                        <tr>
                          <th colspan="8">{{longhuhe_lmp.name}}</th>
                        </tr>
                          <tr>
                            <template v-for="(item,index) in longhuhe_lmp.list" v-if="index*1 < 4">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'longhuhe_lmp'+item.oddsId" @click="orderTd(longhuhe_lmp,item,'longhuhe_lmp')" @mouseenter="overShow(item,'longhuhe_lmp')" @mouseleave="outHide(item,'longhuhe_lmp')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'longhuhe_lmp'+item.oddsId" @click="orderTd(longhuhe_lmp,item,'longhuhe_lmp')" @mouseenter="overShow(item,'longhuhe_lmp')" @mouseleave="outHide(item,'longhuhe_lmp')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(longhuhe_lmp,item,'longhuhe_lmp',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in longhuhe_lmp.list" v-if="index*1 > 3">
                              <td class="tdLeft" width="8%" :class="'longhuhe_lmp'+item.oddsId" @click="orderTd(longhuhe_lmp,item,'longhuhe_lmp')" @mouseenter="overShow(item,'longhuhe_lmp')" @mouseleave="outHide(item,'longhuhe_lmp')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'longhuhe_lmp'+item.oddsId" @click="orderTd(longhuhe_lmp,item,'longhuhe_lmp')" @mouseenter="overShow(item,'longhuhe_lmp')" @mouseleave="outHide(item,'longhuhe_lmp')"> 
                                <ul>
                                  <li>
                                    <span class="odds-font">{{item.odds}}</span>
                                  </li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(longhuhe_lmp,item,'longhuhe_lmp',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                      </table>
                  </div>
                </div>

              <div class="qiu15_body">

                <div class="eball" v-for="(itemPa,index) in yiwuqiu_lmp">
                    <div class="order-table">
                      <table>
                        <tr>
                          <th colspan="2">{{itemPa.name}}</th>
                        </tr>
                        <tr v-for="(item,index) in itemPa.list">
                          <td class="tdLeft" :class="'yiwuqiu_lmp'+item.oddsId" @click="orderTd(itemPa,item,'yiwuqiu_lmp')" @mouseenter="overShow(item,'yiwuqiu_lmp')" @mouseleave="outHide(item,'yiwuqiu_lmp')">{{item.oddsName}}</td>
                          <td class="tdRight" :class="'yiwuqiu_lmp'+item.oddsId" @click="orderTd(itemPa,item,'yiwuqiu_lmp')" @mouseenter="overShow(item,'yiwuqiu_lmp')" @mouseleave="outHide(item,'yiwuqiu_lmp')">
                            <ul>
                              <li>
                                <span class="odds-font">{{item.odds}}</span>
                              </li>
                              <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(itemPa,item,'yiwuqiu_lmp',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                            </ul>
                          </td>
                        </tr>
                      </table>
                    </div>
                </div>

              </div>

            </template>


            <template v-if="showOdds == '单号'">
              <div class="qiu15_body lanqiu">
                <div class="order-table">
                  <table>
                    <tr>
                      <th colspan="10">{{shishiZiDatas.name}}</th>
                    </tr> 
                    <tr v-for="(itemPa,index) in yizhongyiList">
                      <template v-for="(item,index) in itemPa">
                        <td class="oddsNtd tdLeft" :class="'yizhongyi'+item.oddsId" @click="orderTdYiZi(item,'yizhongyi')" @mouseenter="overShow(item,'yizhongyi')" @mouseleave="outHide(item,'yizhongyi')"><div class="ball-icon" >{{item.oddsName}}</div></td>
                          <td class="oddsUltd" :class="'yizhongyi'+item.oddsId" @click="orderTdYiZi(item,'yizhongyi')" @mouseenter="overShow(item,'yizhongyi')" @mouseleave="outHide(item,'yizhongyi')">
                            <ul>
                              <li><span class="odds-font" >{{item.odds}}</span></li>
                              <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFuncYiZi(item,'yizhongyi',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/">
                              </li>
                            </ul>
                          </td>
                      </template>
                    </tr> 
                  </table>
                </div>

                <div>
                  <div class="nball" v-for="(itemPa,index) in yiwuqiu_lmp">
                    <div class="order-table">
                      <table>
                        <tr><th colspan="2">{{itemPa.name}}</th></tr>
                        <tr v-for="(item,index) in itemPa.list">
                          <td class="oddsNtd tdLeft" :class="'yiwuqiu_lmp'+item.oddsId" @click="orderTd(itemPa,item,'yiwuqiu_lmp')" @mouseenter="overShow(item,'yiwuqiu_lmp')" @mouseleave="outHide(item,'yiwuqiu_lmp')"><div class="ball-icon" >{{item.oddsName}}</div></td>
                          <td class="oddsUltd" :class="'yiwuqiu_lmp'+item.oddsId" @click="orderTd(itemPa,item,'yiwuqiu_lmp')" @mouseenter="overShow(item,'yiwuqiu_lmp')" @mouseleave="outHide(item,'yiwuqiu_lmp')">
                            <ul>
                              <li><span class="odds-font" >{{item.odds}}</span></li>
                              <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(itemPa,item,'yiwuqiu_lmp',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/">
                              </li>
                            </ul>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>

                </div>

              </div> 
            </template>

            <template v-if="['连码'].findIndex((n) => n == showOdds)>-1">
              <div class="order-table">
                <table>
                  <tr>
                    <th colspan="12">任选单选</th>
                  </tr> 

                     <!--  <th v-for="item in oddsList[0].list">
                      <label>
                        <input type="radio" :value="item">
                      </label>
                    </th> 
                    <td>
                        <label><input type="checkbox" :value="item"></label>
                      </td> -->

                  <tr>
                    <td :class="'lianma'+index" v-for="(item,index) in oddsList[0].list" @click="lianma(item,'lianma',index)">{{item.oddsName}}</td>
                  </tr>
                  <tr>
                    <td :class="'lianma'+index" v-for="(item,index) in oddsList[0].list" @click="lianma(item,'lianma',index)">
                      <label><span class="odds-font">{{item.odds}}</span></label>
                    </td> 
                  </tr>
                </table> 

                <table class="tab2 haoma">
                  <tr>
                    <th colspan="12">号码</th>
                  </tr> 
                  <tr>
                    <template v-for="(item,index) in renxuanhaoma1">
                      <td :class="'renxuanhaoma1'+index" class="renxuantd disTdClass" @click="orderRenXuan(item,'renxuanhaoma1',index)">{{item}}</td> 
                    </template>
                  </tr> 
                  <tr>
                    <template v-for="(item,index) in renxuanhaoma2">
                      <td :class="'renxuanhaoma2'+index" class="renxuantd disTdClass" @click="orderRenXuan(item,'renxuanhaoma2',index)">{{item}}</td> 
                    </template>
                  </tr>
                </table>
              </div>
            </template>

            <template v-if="['直选'].findIndex((n) => n == showOdds)>-1">
              <div class="order-table">
                <table>

                  <!-- <tr>
                    <th v-for="item in oddsList" class="cursorClass">
                      <label>
                        <input type="radio" :value="item.name">
                      </label>
                    </th> 
                  </tr> --> 
                  <tr>
                    <th colspan="12">前二、前三直选</th>
                  </tr> 
                  <tr>
                    <td :class="'zhixuan'+index" v-for="(item,index) in oddsList[0].list" @click="lianma(item,'zhixuan',index)">{{item.oddsName}}</td>
                  </tr>
                  <tr>
                    <td :class="'zhixuan'+index" v-for="(item,index) in oddsList[0].list" @click="lianma(item,'zhixuan',index)">
                      <label><span class="odds-font">{{item.odds}}</span></label>
                    </td> 
                  </tr>

                </table> 

                <table class="tab2 haoma">
                  <tr>
                    <th colspan="12">第一球</th>
                  </tr> 
                  <tr>
                    <!-- <td class="renxuantd diyiqiu1" @click="orderZhixuan(item,'diyiqiu1',index)">{{item}}</td>  -->

                    <template v-for="(item,index) in renxuanhaoma1">
                      <td :class="'zhixuandiyiqiu'+item" class="renxuantd disTdClass" @click="orderZhixuan(item,'zhixuandiyiqiu')">{{item}}</td> 
                    </template>
                  </tr> 
                  <tr>
                    <template v-for="(item,index) in renxuanhaoma2">
                      <td :class="'zhixuandiyiqiu'+item" class="renxuantd disTdClass" @click="orderZhixuan(item,'zhixuandiyiqiu')">{{item}}</td> 
                    </template>
                  </tr>
                </table>

                <table class="tab2 haoma">
                  <tr>
                    <th colspan="12">第二球</th>
                  </tr> 
                  <tr>
                    <template v-for="(item,index) in renxuanhaoma1">
                      <td :class="'zhixuandierqiu'+item" class="renxuantd disTdClass" @click="orderZhixuan(item,'zhixuandierqiu')">{{item}}</td> 
                    </template>
                  </tr> 
                  <tr>
                    <template v-for="(item,index) in renxuanhaoma2">
                      <td :class="'zhixuandierqiu'+item" class="renxuantd disTdClass" @click="orderZhixuan(item,'zhixuandierqiu')">{{item}}</td> 
                    </template>
                  </tr>
                </table>

                <table class="tab2 haoma" v-if="hasDiSanQiu">
                  <tr>
                    <th colspan="12">第三球</th>
                  </tr> 
                  <tr>
                    <template v-for="(item,index) in renxuanhaoma1">
                      <td :class="'zhixuandisanqiu'+item" class="renxuantd" @click="orderZhixuan(item,'zhixuandisanqiu')">{{item}}</td> 
                    </template>
                  </tr> 
                  <tr>
                    <template v-for="(item,index) in renxuanhaoma2">
                      <td :class="'zhixuandisanqiu'+item" class="renxuantd" @click="orderZhixuan(item,'zhixuandisanqiu')">{{item}}</td> 
                    </template>
                  </tr>
                </table>
              </div>
            </template>

          </div>

          <div class="order-info">
            <bet-quick :orderDataList="orderDataList" :bocaiCategory="bocaiCategory" v-on:childByReset="childByReset" v-on:childByChangePay="childByChangePay"></bet-quick>
          </div>

          <footer-Bocai :curBocaiTypeId="curBocaiTypeId"></footer-Bocai>

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


function combination(arr) {
  var sarr = [[]];
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    var tarr = [];
    for (var j = 0; j < sarr.length; j++){
      for (var k = 0; k < arr[i].length; k++){
        tarr.push(sarr[j].concat(arr[i][k]));
      }
    }
    sarr = tarr;
  }
  for(var m =0; m < sarr.length;m++) {
    result.push(sarr[m].join('.'));
  }
  return result;
}
var garr = [["a","b"],["1","2"]];
var result = combination(garr);
console.log(result);


export default {
  components: {
    ClockTime,
    BetQuick,
    FooterBocai
  },
  data () {
    return {
      curBocaiTypeId: '8374',
      curactiveIndex: '广东11选5',
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
      renxuanhaoma1: ['1','2','3','4','5','6'],
      renxuanhaoma2: ['7','8','9','10','11'],
      shishiZiDatas: {},
      yizhongyiList: [],
      shishiZiDatasList: [],
      kuaixuanTouList:[],
      kuaixuanWeiList:[],
      tempList:[],
      selectedZiTd:[],
      maxNum: 1,
      minNum: 0,
      renxuanOddsObj: {},
      renxuanList: [],
      //ifHege: false,
      kaishi: false,
      curSubMenu: '',
      canOrder: false,
      hasDiSanQiu: false,
      ersanDiYi: [],
      ersanDiEr: [],
      ersanDISan: [],
      orderDataTemp: {}
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
    combination(arr) {
      var sarr = [[]];
      var result = [];
      for (var i = 0; i < arr.length; i++) {
        var tarr = [];
        for (var j = 0; j < sarr.length; j++){
          for (var k = 0; k < arr[i].length; k++){
            tarr.push(sarr[j].concat(arr[i][k]));
          }
        }
        sarr = tarr;
      }
      for(var m =0; m < sarr.length;m++) {
        result.push(sarr[m].join(','));
      }
      return result;
    },
    orderZhixuan(item,odds) { 

      //console.log('this.renxuanList.length',this.renxuanList.length);

      if($('.'+odds+item).hasClass('disTdClass')) {
        //console.log('此td不能用');
      } else {
        if(this.isOpenOdds) {

            if($('.'+odds+item).hasClass('selected')){

                  // $('.'+odds+item).removeClass('selected');
                  //   _.remove(this.renxuanList, function(n) {
                  //   return n == item;
                  // });

                //同级别的能选状态
                if(odds == 'zhixuandiyiqiu') {
                  $('.zhixuandierqiu'+item).removeClass('disTdClass');
                  $('.zhixuandisanqiu'+item).removeClass('disTdClass');

                  $('.'+odds+item).removeClass('selected');
                    _.remove(this.ersanDiYi, function(n) {
                    return n == item;
                  });

                  //this.ersanDiYi = this.ersanDiYi-1;
                } else if(odds == 'zhixuandierqiu') {
                  $('.zhixuandiyiqiu'+item).removeClass('disTdClass');
                  $('.zhixuandisanqiu'+item).removeClass('disTdClass');

                  $('.'+odds+item).removeClass('selected');
                    _.remove(this.ersanDiEr, function(n) {
                    return n == item;
                  });
                  //this.ersanDiEr = this.ersanDiEr-1;
                } else {
                  $('.zhixuandiyiqiu'+item).removeClass('disTdClass');
                  $('.zhixuandierqiu'+item).removeClass('disTdClass');

                  $('.'+odds+item).removeClass('selected');
                    _.remove(this.ersanDISan, function(n) {
                    return n == item;
                  });
                  //this.ersanDISan = this.ersanDISan-1;
                }

            } else {

               $('.'+odds+item).addClass('selected');

               this.renxuanList.push(item);

               //同级别的能选状态
                if(odds == 'zhixuandiyiqiu') {
                  $('.zhixuandierqiu'+item).addClass('disTdClass');
                  $('.zhixuandisanqiu'+item).addClass('disTdClass');
                  this.ersanDiYi.push(item);
                } else if(odds == 'zhixuandierqiu') {
                  $('.zhixuandiyiqiu'+item).addClass('disTdClass');
                  $('.zhixuandisanqiu'+item).addClass('disTdClass');
                  this.ersanDiEr.push(item);
                  //this.ersanDiEr = this.ersanDiEr+1;
                } else {
                  $('.zhixuandiyiqiu'+item).addClass('disTdClass');
                  $('.zhixuandierqiu'+item).addClass('disTdClass');
                  this.ersanDISan.push(item);
                  //this.ersanDISan = this.ersanDISan+1;
                }

            }

            //console.log('this.orderDataList[0].bocaiOddName',this.orderDataList[0].bocaiOddName);



            //判断是否可以提交
            if(this.orderDataTemp.bocaiOddName == '前三直选') {
             // console.log(this.ersanDiYi,this.ersanDiEr,this.ersanDISan);
              if([this.ersanDiYi,this.ersanDiEr,this.ersanDISan].findIndex((n) => n.length == 0)>-1) {
                this.canOrder = false;
                bus.$emit('getcanOrder', false); 
              } else {
                this.canOrder = true;
                bus.$emit('getcanOrder', true); 
              }

              let dataArray = [this.ersanDiYi,this.ersanDiEr,this.ersanDISan];

              let result = this.combination(dataArray);

              console.log('result',result);

              let tempArray = [];

              for(let n in result) {

                let obj = {
                  bocaiCategory2Id: this.orderDataTemp.bocaiCategory2Id,//8225,//投注博彩分类2ID
                  bocaiCategory2Name: this.orderDataTemp.bocaiCategory2Name,//"混合",//投注博彩分类2名称
                  bocaiOddId: this.orderDataTemp.bocaiOddId,//5543,//投注博彩赔率ID
                  bocaiOddName: this.orderDataTemp.bocaiOddName,//"大",//投注博彩赔率名称
                  bocaiValue: result[n],//投注内容,六合彩连肖/连尾
                  normalMoney: this.orderDataTemp.normalMoney,//10000,//一般模式下，选择的金额
                  orderNormal: this.orderDataTemp.orderNormal,   //是快捷，还是一般投注
                  bocaiOdds: this.orderDataTemp.bocaiOdds,//1.90//赔率
                  dewaterId: this.orderDataTemp.dewaterId
                };

                tempArray.push(obj);
              }

              this.orderDataList  = tempArray;

            } else {
              console.log(this.ersanDiYi,this.ersanDiEr,this.ersanDISan);

              if([this.ersanDiYi,this.ersanDiEr].findIndex((n) => n.length  == 0)>-1) {
                this.canOrder = false;
                bus.$emit('getcanOrder', false); 
              } else {
                this.canOrder = true;
                bus.$emit('getcanOrder', true); 
              }


              let dataArray = [this.ersanDiYi,this.ersanDiEr];

              let result = this.combination(dataArray);

              //console.log('result',result);

              let tempArray = [];

              for(let n in result) {

                let obj = {
                  bocaiCategory2Id: this.orderDataTemp.bocaiCategory2Id,//8225,//投注博彩分类2ID
                  bocaiCategory2Name: this.orderDataTemp.bocaiCategory2Name,//"混合",//投注博彩分类2名称
                  bocaiOddId: this.orderDataTemp.bocaiOddId,//5543,//投注博彩赔率ID
                  bocaiOddName: this.orderDataTemp.bocaiOddName,//"大",//投注博彩赔率名称
                  bocaiValue: result[n],//投注内容,六合彩连肖/连尾
                  normalMoney: this.orderDataTemp.normalMoney,//10000,//一般模式下，选择的金额
                  orderNormal: this.orderDataTemp.orderNormal,   //是快捷，还是一般投注
                  bocaiOdds: this.orderDataTemp.bocaiOdds,//1.90//赔率
                  dewaterId: this.orderDataTemp.dewaterId
                };

                tempArray.push(obj);
              }

              this.orderDataList  = tempArray;


            }


        }

      }


    },  
    orderRenXuan(item,odds,index) { 

      console.log('this.renxuanList.length',this.renxuanList.length);

      if($('.'+odds+index).hasClass('disTdClass')) {
        //console.log('此td不能用');
      } else {
          if(this.isOpenOdds) {


            if($('.'+odds+index).hasClass('selected')){

                  $('.'+odds+index).removeClass('selected');
                    _.remove(this.renxuanList, function(n) {
                    return n == item;
                  });
                $('.bet_box .orders .haoma td').removeClass('disTdClass');
            } else {
                  $('.'+odds+index).addClass('selected');

                  this.renxuanList.push(item);
            }

            let str = '';

                  for (var i = 0; i < this.renxuanList.length; i++) {
                    str += this.renxuanList[i]+ ",";
                  }

                  if (str.length > 0) {
                    str = str.substr(0, str.length - 1);
                  }

                  //console.log('str',str);

            this.orderDataList[0].bocaiValue = str;


            if(this.renxuanList.length < this.maxNum) {
              //this.ifHege = true;
              this.canOrder = false;
              bus.$emit('getcanOrder', false); 
            } else if(this.renxuanList.length == this.maxNum) {
              //this.ifHege = false;
              this.canOrder = true;
              bus.$emit('getcanOrder', true); 
              $(".bet_box .orders .haoma td:not(.selected)").addClass('disTdClass');
            } else {
              //this.ifHege = false;
              this.canOrder = false;
              bus.$emit('getcanOrder', false); 
              $(".bet_box .orders .haoma td:not(.selected)").addClass('disTdClass');
            }

        }
      }
      
    },  
    lianma(item,odds,index) {

      //console.log('this.kaishi',this.kaishi);

      if(item.oddsName == '前三直选') {
        this.hasDiSanQiu = true;
      } else {
        this.hasDiSanQiu = false;
      }

      if(!this.kaishi) {
        this.kaishi = true;
        //this.ifHege = true;
        this.renxuanList = [];
        $('.bet_box .orders .haoma td').removeClass('disTdClass');
        this.ersanDiYi = [];
        this.ersanDiEr = [];
        this.ersanDISan = [];
        
      }
      $('.'+odds+index).addClass('selected').siblings().removeClass('selected');

      //console.log('item',item);
      //console.log('this.orderDataList[0]',this.orderDataList[0]);

      if(this.orderDataList[0]) {
        if(this.orderDataList[0].bocaiOddId != item.oddsId) {
          this.renxuanList = [];
          this.orderDataList = [];
          //$('.bet_box .orders .haoma td').removeClass('selected');
          //$('input[type=checkbox]').prop('checked', false);
          $('.bet_box .orders .haoma td').removeClass('disTdClass');
          $('.bet_box .orders .haoma td').removeClass('selected');
          this.ersanDiYi = [];
          this.ersanDiEr = [];
          this.ersanDISan = [];
          this.canOrder = false;
          bus.$emit('getcanOrder', false); 

          if(this.isOpenOdds) {

            this.renxuanOddsObj = this.oddsList[0];

              let obj = {
                  bocaiCategory2Id: this.renxuanOddsObj.id,//8225,//投注博彩分类2ID
                  bocaiCategory2Name: this.renxuanOddsObj.name,//"混合",//投注博彩分类2名称
                  bocaiOddId: item.oddsId,//5543,//投注博彩赔率ID
                  bocaiOddName: item.oddsName,//"大",//投注博彩赔率名称
                  bocaiValue:"",//投注内容,六合彩连肖/连尾
                  normalMoney: item.normalMoney,//10000,//一般模式下，选择的金额
                  orderNormal: this.normalPay,   //是快捷，还是一般投注
                  bocaiOdds: item.odds,//1.90//赔率
                  dewaterId: item.dewaterId
                };

              this.orderDataList[0] = obj;

              this.orderDataTemp = obj;

              this.kaishi = true;
              //this.ifHege = true;

          }
        }
      } else {
        if(this.isOpenOdds) {

          this.renxuanOddsObj = this.oddsList[0];

            let obj = {
                bocaiCategory2Id: this.renxuanOddsObj.id,//8225,//投注博彩分类2ID
                bocaiCategory2Name: this.renxuanOddsObj.name,//"混合",//投注博彩分类2名称
                bocaiOddId: item.oddsId,//5543,//投注博彩赔率ID
                bocaiOddName: item.oddsName,//"大",//投注博彩赔率名称
                bocaiValue:"",//投注内容,六合彩连肖/连尾
                normalMoney: item.normalMoney,//10000,//一般模式下，选择的金额
                orderNormal: this.normalPay,   //是快捷，还是一般投注
                bocaiOdds: item.odds,//1.90//赔率
                dewaterId: item.dewaterId
              };

            this.orderDataList[0] = obj;

            this.orderDataTemp = obj;

            this.kaishi = true;
            //this.ifHege = true;

        }

      }

      //console.log('this.orderDataList[0].oddsName',this.orderDataList[0].bocaiOddName);

      if(item.oddsName == '任选二') {
        this.maxNum = 2;
        this.minNum = 2;
      } else if(item.oddsName == '任选三') {
        this.maxNum = 3;
        this.minNum = 3;
      } else if(item.oddsName == '任选四') {
        this.maxNum = 4;
        this.minNum = 4;
      } else if(item.oddsName == '任选五') {
        this.maxNum = 5;
        this.minNum = 5;
      } else if(item.oddsName == '任选六') {
        this.maxNum = 6;
        this.minNum = 6;
      } else if(item.oddsName == '任选七') {
        this.maxNum = 7;
        this.minNum = 7;
      } else if(item.oddsName == '任选八') {
        this.maxNum = 8;
        this.minNum = 8;
      } else if(item.oddsName == '前二组选') {
        this.minNum = 2;
        this.maxNum = 5;
      } else if(item.oddsName == '前三组选') {
        this.minNum = 3;
        this.maxNum = 5;
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
      $('.bet_box .orders .haoma td').removeClass('disTdClass');
      //this.ifHege = true;
      this.canOrder = false;

      this.renxuanList = [];
      this.orderDataList = [];
          //$('.bet_box .orders .haoma td').removeClass('selected');
          //$('input[type=checkbox]').prop('checked', false);
      $('.bet_box .orders .haoma td').removeClass('selected');
      this.ersanDiYi = [];
      this.ersanDiEr = [];
      this.ersanDISan = [];

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
    orderTdYiZi(item,ids) {
      let oddsObj = this.shishiZiDatas;

      this.orderTd(oddsObj,item,ids);
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
                console.log('result.oddsList',result.oddsList);
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

      if(this.curSubMenu != item.name) {
        if(index*1 > 9) {
          this.submenu = item.name;
        } else {
          this.submenu = '更多';
        }

        if(item.name == '连码' || item.name == '直选') {
          this.kaishi = false;
          //this.ifHege = false;

          this.canOrder = false;
          bus.$emit('getcanOrder', false); 
        }

        this.resetOddsCategory(item);

        this.curSubMenu = item.name;
      }

      

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
        let yiwuqiuTemp = [];
        for(let m in dataList) {
          if(dataList[m].name == '总和') {
            this.longhuhe_lmp = dataList[m];
          }
          if(['第一球','第二球','第三球','第四球','第五球'].findIndex((n) => n == dataList[m].name)>-1) {
            yiwuqiuTemp.push(dataList[m]);
          }
        }
        this.yiwuqiu_lmp = yiwuqiuTemp;
      }

      if(['单号'].findIndex((n) => n == this.showOdds)>-1) {

        let yiwuqiuTemp = [];
        for(let m in dataList) {
          if(dataList[m].name == '一中一') {
            this.shishiZiDatas = dataList[m];
            let arry = [];

            for(var i=0;i<dataList[m].list.length;i=i+5){
              arry.push(dataList[m].list.slice(i,i+5));
            }

            this.yizhongyiList = arry;

            console.log('this.yizhongyiList',this.yizhongyiList);

          }
          if(['第一球','第二球','第三球','第四球','第五球'].findIndex((n) => n == dataList[m].name)>-1) {
            yiwuqiuTemp.push(dataList[m]);
          }
        }
        this.yiwuqiu_lmp = yiwuqiuTemp;
      }

      if(['连码','直选'].findIndex((n) => n == this.showOdds)>-1) {
        console.log('oddsList',this.oddsList);
      }

    }
  }
}

</script>

<style scoped>


</style>
