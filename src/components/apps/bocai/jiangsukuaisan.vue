<template>
  <div id="shaizibocai" class="content-main duboBodyClass">
    
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

            <div icontype="true">
              <div class="order-table">
                <table v-if="sanjundaxiao.list">
                  <tr>
                      <th colspan="8">{{sanjundaxiao.name}}</th>
                  </tr>
                  <tr>
                      <template v-for="(item,index) in sanjundaxiao.list.slice(0,3)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'sanjundaxiao'+item.oddsId" @click="orderTd(sanjundaxiao,item,'sanjundaxiao')" @mouseenter="overShow(item,'sanjundaxiao')" @mouseleave="outHide(item,'sanjundaxiao')">
                                <i :class="'jsk3-icon-'+item.oddsName"></i>
                              </td>
                              <td class="tdRight" :class="'sanjundaxiao'+item.oddsId" @click="orderTd(sanjundaxiao,item,'sanjundaxiao')" @mouseenter="overShow(item,'sanjundaxiao')" @mouseleave="outHide(item,'sanjundaxiao')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(sanjundaxiao,item,'sanjundaxiao',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                      </template>
                              <td class="tdLeft ordersTdOver" width="8%" :class="'sanjundaxiao'+sanjundaxiao.list[6].oddsId" @click="orderTd(sanjundaxiao,sanjundaxiao.list[6],'sanjundaxiao')" @mouseenter="overShow(sanjundaxiao.list[6],'sanjundaxiao')" @mouseleave="outHide(sanjundaxiao.list[6],'sanjundaxiao')">{{sanjundaxiao.list[6].oddsName}}
                              </td>
                              <td class="tdRight" :class="'sanjundaxiao'+sanjundaxiao.list[6].oddsId" @click="orderTd(sanjundaxiao,sanjundaxiao.list[6],'sanjundaxiao')" @mouseenter="overShow(sanjundaxiao.list[6],'sanjundaxiao')" @mouseleave="outHide(sanjundaxiao.list[6],'sanjundaxiao')">
                                <ul>
                                  <li ><span class="odds-font">{{sanjundaxiao.list[6].odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="sanjundaxiao.list[6].normalMoney" v-on:input ="inputFunc(sanjundaxiao,sanjundaxiao.list[6],'sanjundaxiao',sanjundaxiao.list[6].normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                  </tr>
                  <tr>
                      <template v-for="(item,index) in sanjundaxiao.list.slice(3,6)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'sanjundaxiao'+item.oddsId" @click="orderTd(sanjundaxiao,item,'sanjundaxiao')" @mouseenter="overShow(item,'sanjundaxiao')" @mouseleave="outHide(item,'sanjundaxiao')">
                                <i :class="'jsk3-icon-'+item.oddsName"></i>
                              </td>
                              <td class="tdRight" :class="'sanjundaxiao'+item.oddsId" @click="orderTd(sanjundaxiao,item,'sanjundaxiao')" @mouseenter="overShow(item,'sanjundaxiao')" @mouseleave="outHide(item,'sanjundaxiao')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(sanjundaxiao,item,'sanjundaxiao',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                      </template>
                              <td class="tdLeft ordersTdOver" width="8%" :class="'sanjundaxiao'+sanjundaxiao.list[7].oddsId" @click="orderTd(sanjundaxiao,sanjundaxiao.list[7],'sanjundaxiao')" @mouseenter="overShow(sanjundaxiao.list[7],'sanjundaxiao')" @mouseleave="outHide(sanjundaxiao.list[7],'sanjundaxiao')">{{sanjundaxiao.list[7].oddsName}}
                              </td>
                              <td class="tdRight" :class="'sanjundaxiao'+sanjundaxiao.list[7].oddsId" @click="orderTd(sanjundaxiao,sanjundaxiao.list[7],'sanjundaxiao')" @mouseenter="overShow(sanjundaxiao.list[7],'sanjundaxiao')" @mouseleave="outHide(sanjundaxiao.list[7],'sanjundaxiao')">
                                <ul>
                                  <li ><span class="odds-font">{{sanjundaxiao.list[7].odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="sanjundaxiao.list[7].normalMoney" v-on:input ="inputFunc(sanjundaxiao,sanjundaxiao.list[7],'sanjundaxiao',sanjundaxiao.list[7].normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                  </tr>
                </table>


                <table class="weiq" v-if="weishaiquanshai.list">
                  <tr>
                      <th colspan="8">{{weishaiquanshai.name}}</th>
                  </tr>
                  <tr>
                      <template v-for="(item,index) in weishaiquanshai.list.slice(0,3)">
                              <td class="tdLeft ordersTdOver sanshai" :class="'weishaiquanshai'+item.oddsId" @click="orderTd(weishaiquanshai,item,'weishaiquanshai')" @mouseenter="overShow(item,'weishaiquanshai')" @mouseleave="outHide(item,'weishaiquanshai')">
                                <i :class="'jsk3-icon-'+item.oddsName.slice(0,1)"></i>
                                <i :class="'jsk3-icon-'+item.oddsName.slice(2,3)"></i>
                                <i :class="'jsk3-icon-'+item.oddsName.slice(4,5)"></i>
                              </td>
                              <td class="tdRight w" :class="'weishaiquanshai'+item.oddsId" @click="orderTd(weishaiquanshai,item,'weishaiquanshai')" @mouseenter="overShow(item,'weishaiquanshai')" @mouseleave="outHide(item,'weishaiquanshai')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(weishaiquanshai,item,'weishaiquanshai',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                      </template>
                  </tr>
                  <tr>
                      <template v-for="(item,index) in weishaiquanshai.list.slice(3,6)">
                              <td class="tdLeft ordersTdOver sanshai" :class="'weishaiquanshai'+item.oddsId" @click="orderTd(weishaiquanshai,item,'weishaiquanshai')" @mouseenter="overShow(item,'weishaiquanshai')" @mouseleave="outHide(item,'weishaiquanshai')">
                                <i :class="'jsk3-icon-'+item.oddsName.slice(0,1)"></i>
                                <i :class="'jsk3-icon-'+item.oddsName.slice(2,3)"></i>
                                <i :class="'jsk3-icon-'+item.oddsName.slice(4,5)"></i>
                              </td>
                              <td class="tdRight w" :class="'weishaiquanshai'+item.oddsId" @click="orderTd(weishaiquanshai,item,'weishaiquanshai')" @mouseenter="overShow(item,'weishaiquanshai')" @mouseleave="outHide(item,'weishaiquanshai')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(weishaiquanshai,item,'weishaiquanshai',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                      </template>
                  </tr>
                  <tr>
                      <td class="tdLeft ordersTdOver sanshai" :class="'weishaiquanshai'+weishaiquanshai.list[6].oddsId" @click="orderTd(weishaiquanshai,weishaiquanshai.list[6],'weishaiquanshai')" @mouseenter="overShow(weishaiquanshai.list[6],'weishaiquanshai')" @mouseleave="outHide(weishaiquanshai.list[6],'weishaiquanshai')">{{weishaiquanshai.list[6].oddsName}}
                              </td>
                              <td class="tdRight" :class="'weishaiquanshai'+weishaiquanshai.list[6].oddsId" @click="orderTd(weishaiquanshai,weishaiquanshai.list[6],'weishaiquanshai')" @mouseenter="overShow(weishaiquanshai.list[6],'weishaiquanshai')" @mouseleave="outHide(weishaiquanshai.list[6],'weishaiquanshai')">
                                <ul>
                                  <li ><span class="odds-font">{{weishaiquanshai.list[6].odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="weishaiquanshai.list[6].normalMoney" v-on:input ="inputFunc(weishaiquanshai,weishaiquanshai.list[6],'weishaiquanshai',weishaiquanshai.list[6].normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                      </td>
                      <td colspan="4">&nbsp;</td>
                  </tr>
                </table>

                <table v-if="dianshu.list">
                        <tr>
                          <th colspan="8">{{dianshu.name}}</th>
                        </tr>
                        <tr>
                            <template v-for="(item,index) in dianshu.list.slice(0,4)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'dianshu'+item.oddsId" @click="orderTd(dianshu,item,'dianshu')" @mouseenter="overShow(item,'dianshu')" @mouseleave="outHide(item,'dianshu')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'dianshu'+item.oddsId" @click="orderTd(dianshu,item,'dianshu')" @mouseenter="overShow(item,'dianshu')" @mouseleave="outHide(item,'dianshu')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(dianshu,item,'dianshu',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                        </tr>
                        <tr>
                            <template v-for="(item,index) in dianshu.list.slice(4,8)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'dianshu'+item.oddsId" @click="orderTd(dianshu,item,'dianshu')" @mouseenter="overShow(item,'dianshu')" @mouseleave="outHide(item,'dianshu')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'dianshu'+item.oddsId" @click="orderTd(dianshu,item,'dianshu')" @mouseenter="overShow(item,'dianshu')" @mouseleave="outHide(item,'dianshu')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(dianshu,item,'dianshu',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                        </tr>
                        <tr>
                            <template v-for="(item,index) in dianshu.list.slice(8,12)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'dianshu'+item.oddsId" @click="orderTd(dianshu,item,'dianshu')" @mouseenter="overShow(item,'dianshu')" @mouseleave="outHide(item,'dianshu')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'dianshu'+item.oddsId" @click="orderTd(dianshu,item,'dianshu')" @mouseenter="overShow(item,'dianshu')" @mouseleave="outHide(item,'dianshu')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(dianshu,item,'dianshu',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                        </tr>
                        <tr>
                            <template v-for="(item,index) in dianshu.list.slice(12,14)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'dianshu'+item.oddsId" @click="orderTd(dianshu,item,'dianshu')" @mouseenter="overShow(item,'dianshu')" @mouseleave="outHide(item,'dianshu')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'dianshu'+item.oddsId" @click="orderTd(dianshu,item,'dianshu')" @mouseenter="overShow(item,'dianshu')" @mouseleave="outHide(item,'dianshu')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(dianshu,item,'dianshu',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                            <td colspan="4">&nbsp;</td>
                        </tr>

                </table>

                <table v-if="changpai.list">
                        <tr>
                          <th colspan="8">{{changpai.name}}</th>
                        </tr>
                        <tr>
                            <template v-for="(item,index) in changpai.list.slice(0,3)">
                              <td class="tdLeft ordersTdOver" width="16%" :class="'changpai'+item.oddsId" @click="orderTd(changpai,item,'changpai')" @mouseenter="overShow(item,'changpai')" @mouseleave="outHide(item,'changpai')">
                                <i :class="'jsk3-icon-'+item.oddsName.slice(0,1)"></i>
                                <i :class="'jsk3-icon-'+item.oddsName.slice(2,3)"></i>
                              </td>
                              <td class="tdRight" :class="'changpai'+item.oddsId" @click="orderTd(changpai,item,'changpai')" @mouseenter="overShow(item,'changpai')" @mouseleave="outHide(item,'changpai')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(changpai,item,'changpai',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                        </tr>
                        <tr>
                            <template v-for="(item,index) in changpai.list.slice(3,6)">
                              <td class="tdLeft ordersTdOver" width="16%" :class="'changpai'+item.oddsId" @click="orderTd(changpai,item,'changpai')" @mouseenter="overShow(item,'changpai')" @mouseleave="outHide(item,'changpai')">
                                <i :class="'jsk3-icon-'+item.oddsName.slice(0,1)"></i>
                                <i :class="'jsk3-icon-'+item.oddsName.slice(2,3)"></i>
                              </td>
                              <td class="tdRight" :class="'changpai'+item.oddsId" @click="orderTd(changpai,item,'changpai')" @mouseenter="overShow(item,'changpai')" @mouseleave="outHide(item,'changpai')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(changpai,item,'changpai',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                        </tr>
                        <tr>
                            <template v-for="(item,index) in changpai.list.slice(6,9)">
                              <td class="tdLeft ordersTdOver" width="16%" :class="'changpai'+item.oddsId" @click="orderTd(changpai,item,'changpai')" @mouseenter="overShow(item,'changpai')" @mouseleave="outHide(item,'changpai')">
                                <i :class="'jsk3-icon-'+item.oddsName.slice(0,1)"></i>
                                <i :class="'jsk3-icon-'+item.oddsName.slice(2,3)"></i>
                              </td>
                              <td class="tdRight" :class="'changpai'+item.oddsId" @click="orderTd(changpai,item,'changpai')" @mouseenter="overShow(item,'changpai')" @mouseleave="outHide(item,'changpai')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(changpai,item,'changpai',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                        </tr>
                        <tr>
                            <template v-for="(item,index) in changpai.list.slice(9,12)">
                              <td class="tdLeft ordersTdOver" width="16%" :class="'changpai'+item.oddsId" @click="orderTd(changpai,item,'changpai')" @mouseenter="overShow(item,'changpai')" @mouseleave="outHide(item,'changpai')">
                                <i :class="'jsk3-icon-'+item.oddsName.slice(0,1)"></i>
                                <i :class="'jsk3-icon-'+item.oddsName.slice(2,3)"></i>
                              </td>
                              <td class="tdRight" :class="'changpai'+item.oddsId" @click="orderTd(changpai,item,'changpai')" @mouseenter="overShow(item,'changpai')" @mouseleave="outHide(item,'changpai')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(changpai,item,'changpai',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                        </tr>
                        <tr>
                            <template v-for="(item,index) in changpai.list.slice(12,15)">
                              <td class="tdLeft ordersTdOver" width="16%" :class="'changpai'+item.oddsId" @click="orderTd(changpai,item,'changpai')" @mouseenter="overShow(item,'changpai')" @mouseleave="outHide(item,'changpai')">
                                <i :class="'jsk3-icon-'+item.oddsName.slice(0,1)"></i>
                                <i :class="'jsk3-icon-'+item.oddsName.slice(2,3)"></i>
                              </td>
                              <td class="tdRight" :class="'changpai'+item.oddsId" @click="orderTd(changpai,item,'changpai')" @mouseenter="overShow(item,'changpai')" @mouseleave="outHide(item,'changpai')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(changpai,item,'changpai',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                        </tr>
                </table>

                <table v-if="duanpai.list">
                        <tr>
                          <th colspan="8">{{duanpai.name}}</th>
                        </tr>
                        <tr>
                            <template v-for="(item,index) in duanpai.list.slice(0,3)">
                              <td class="tdLeft ordersTdOver" width="16%" :class="'duanpai'+item.oddsId" @click="orderTd(duanpai,item,'duanpai')" @mouseenter="overShow(item,'duanpai')" @mouseleave="outHide(item,'duanpai')">
                                <i :class="'jsk3-icon-'+item.oddsName.slice(0,1)"></i>
                                <i :class="'jsk3-icon-'+item.oddsName.slice(2,3)"></i>
                              </td>
                              <td class="tdRight" :class="'duanpai'+item.oddsId" @click="orderTd(duanpai,item,'duanpai')" @mouseenter="overShow(item,'duanpai')" @mouseleave="outHide(item,'duanpai')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(duanpai,item,'duanpai',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                        </tr>
                        <tr>
                            <template v-for="(item,index) in duanpai.list.slice(3,6)">
                             <td class="tdLeft ordersTdOver" width="16%" :class="'duanpai'+item.oddsId" @click="orderTd(duanpai,item,'duanpai')" @mouseenter="overShow(item,'duanpai')" @mouseleave="outHide(item,'duanpai')">
                                <i :class="'jsk3-icon-'+item.oddsName.slice(0,1)"></i>
                                <i :class="'jsk3-icon-'+item.oddsName.slice(2,3)"></i>
                              </td>
                              <td class="tdRight" :class="'duanpai'+item.oddsId" @click="orderTd(duanpai,item,'duanpai')" @mouseenter="overShow(item,'duanpai')" @mouseleave="outHide(item,'duanpai')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(duanpai,item,'duanpai',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                        </tr>
                </table>
              </div>
            </div>


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
      curBocaiTypeId: '8498',
      curactiveIndex: '江苏快3',
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
      guanyaZonghe: {},

      sanjundaxiao: {},
      weishaiquanshai: {},
      dianshu: {},
      changpai: {},
      duanpai: {}
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

      for(let m in dataList) {
        if(dataList[m].name == '三军、大小') {
            this.sanjundaxiao = dataList[m];
        }
        if(dataList[m].name == '围骰、全骰') {
            this.weishaiquanshai = dataList[m];
        }
        if(dataList[m].name == '点数') {
            this.dianshu = dataList[m];
        }
        if(dataList[m].name == '长牌') {
            this.changpai = dataList[m];
        }
        if(dataList[m].name == '短牌') {
            this.duanpai = dataList[m];
        }
      }

    }

  }
}

</script>

<style scoped>


</style>
