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

              <el-menu-item v-for="(item,index) in bocaiCategoryList" :key="index" :index="item.name" @click="getOddsCategory(item,index)" v-if="!(['连码'].findIndex((n) => n==item.name)>-1)">{{item.name}}</el-menu-item>
              <!-- <el-menu-item v-for="(item,index) in bocaiCategoryList" :key="index" :index="item.name" @click="getOddsCategory(item,index)" v-if="index*1 < 11">{{item.name}}</el-menu-item> -->
              <!-- <el-submenu v-if="bocaiCategoryList.length*1 > 11" key="submenu" index="submenu">
                <template slot="title">{{submenu}}</template>
                <el-menu-item v-for="(item,index) in bocaiCategoryList" :key="index" :index="item.name" @click="getOddsCategory(item,index)" v-if="index*1 > 10">{{item.name}}</el-menu-item>
              </el-submenu> -->
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
                          <th colspan="8">{{zongheData.name}}</th>
                        </tr>
                          <tr v-for="(itemPa,indexPa) in zongheData.list"> 
                            <template v-for="(item,index) in itemPa" v-if="item">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'zongheData'+item.oddsId" @click="orderTd(zongheData,item,'zongheData')" @mouseenter="overShow(item,'zongheData')" @mouseleave="outHide(item,'zongheData')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'zongheData'+item.oddsId" @click="orderTd(zongheData,item,'zongheData')" @mouseenter="overShow(item,'zongheData')" @mouseleave="outHide(item,'zongheData')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(zongheData,item,'zongheData',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                          </tr>

                      </table>

                  </div>
                </div>

                <div class="">

                <div class="eball_shi" v-for="(itemPa,index) in yidaoshi">
                    <div class="order-table">
                      <table>
                        <tr>
                          <th colspan="2">{{itemPa.name}}</th>
                        </tr>
                        <tr v-for="(item,index) in itemPa.list">
                          <td class="tdLeft" width="30%" :class="'yidaoshi'+item.oddsId" @click="orderTd(itemPa,item,'yidaoshi')" @mouseenter="overShow(item,'yidaoshi')" @mouseleave="outHide(item,'yidaoshi')">{{item.oddsName}}</td>
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


            <template v-if="['第一球','第二球','第三球','第四球','第五球','第六球','第七球','第八球'].findIndex((n) => n == showOdds)>-1">
              <div class="order-table">
                      <table>
                        <tr>
                          <th colspan="8">{{guanyaZonghe.name}}</th>
                        </tr>
                          <tr>
                            <template v-for="(item,index) in guanyaZonghe.list.slice(0,4)">
                              <td class="tdLeft oddsNtd ordersTdOver" width="8%" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(guanyaZonghe,item,'guanyaZonghe')" @mouseenter="overShow(item,'guanyaZonghe')" @mouseleave="outHide(item,'guanyaZonghe')"><div class="ball-icon" >{{item.oddsName}}</div></td>
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
                              <td class="tdLeft oddsNtd ordersTdOver" width="8%" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(guanyaZonghe,item,'guanyaZonghe')" @mouseenter="overShow(item,'guanyaZonghe')" @mouseleave="outHide(item,'guanyaZonghe')"><div class="ball-icon" >{{item.oddsName}}</div></td>
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
                              <td class="tdLeft oddsNtd ordersTdOver" width="8%" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(guanyaZonghe,item,'guanyaZonghe')" @mouseenter="overShow(item,'guanyaZonghe')" @mouseleave="outHide(item,'guanyaZonghe')"><div class="ball-icon" >{{item.oddsName}}</div></td>
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
                              <td class="tdLeft oddsNtd ordersTdOver" width="8%" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(guanyaZonghe,item,'guanyaZonghe')" @mouseenter="overShow(item,'guanyaZonghe')" @mouseleave="outHide(item,'guanyaZonghe')"><div class="ball-icon" >{{item.oddsName}}</div></td>
                              <td class="tdRight" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(guanyaZonghe,item,'guanyaZonghe')" @mouseenter="overShow(item,'guanyaZonghe')" @mouseleave="outHide(item,'guanyaZonghe')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(guanyaZonghe,item,'guanyaZonghe',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in guanyaZonghe.list.slice(16,20)">
                              <td class="tdLeft oddsNtd ordersTdOver" width="8%" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(guanyaZonghe,item,'guanyaZonghe')" @mouseenter="overShow(item,'guanyaZonghe')" @mouseleave="outHide(item,'guanyaZonghe')"><div class="ball-icon" >{{item.oddsName}}</div></td>
                              <td class="tdRight" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(guanyaZonghe,item,'guanyaZonghe')" @mouseenter="overShow(item,'guanyaZonghe')" @mouseleave="outHide(item,'guanyaZonghe')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(guanyaZonghe,item,'guanyaZonghe',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                          </tr>

                          <tr>
                            <template v-for="(item,index) in guanyaZonghe.list.slice(20,24)">
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
                            <template v-for="(item,index) in guanyaZonghe.list.slice(24,28)">
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
                            <template v-for="(item,index) in guanyaZonghe.list.slice(28,32)">
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
                            <template v-for="(item,index) in guanyaZonghe.list.slice(32,35)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(guanyaZonghe,item,'guanyaZonghe')" @mouseenter="overShow(item,'guanyaZonghe')" @mouseleave="outHide(item,'guanyaZonghe')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(guanyaZonghe,item,'guanyaZonghe')" @mouseenter="overShow(item,'guanyaZonghe')" @mouseleave="outHide(item,'guanyaZonghe')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(guanyaZonghe,item,'guanyaZonghe',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                            <td class="tdLeft ordersTdOver" colspan="2"></td>
                          </tr>

                          <tr v-if="['第一球','第二球','第三球','第四球'].findIndex((n) => n == showOdds)>-1">
                            <template v-for="(item,index) in guanyaZonghe.list.slice(35,37)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(guanyaZonghe,item,'guanyaZonghe')" @mouseenter="overShow(item,'guanyaZonghe')" @mouseleave="outHide(item,'guanyaZonghe')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(guanyaZonghe,item,'guanyaZonghe')" @mouseenter="overShow(item,'guanyaZonghe')" @mouseleave="outHide(item,'guanyaZonghe')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(guanyaZonghe,item,'guanyaZonghe',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                                </ul>
                              </td>
                            </template>
                            <td class="tdLeft ordersTdOver" colspan="4"></td>
                          </tr>

                      </table>
              </div>

            </template>

            <template v-if="showOdds == '正码'">


              <div class="order-table">
                <table>
                  <tr>
                    <th colspan="8">{{zhengmaObj.name}}</th>
                  </tr>
                  <tr>
                    <template v-for="(item,index) in zhengmaObj.list.slice(0,4)">
                      <td class="tdLeft oddsNtd ordersTdOver" width="8%" :class="'zhengmaObj'+item.oddsId" @click="orderTd(zhengmaObj,item,'zhengmaObj')" @mouseenter="overShow(item,'zhengmaObj')" @mouseleave="outHide(item,'zhengmaObj')"><div class="ball-icon" >{{item.oddsName}}</div></td>
                      <td class="tdRight" :class="'zhengmaObj'+item.oddsId" @click="orderTd(zhengmaObj,item,'zhengmaObj')" @mouseenter="overShow(item,'zhengmaObj')" @mouseleave="outHide(item,'zhengmaObj')">
                        <ul>
                          <li ><span class="odds-font">{{item.odds}}</span></li>
                          <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(zhengmaObj,item,'zhengmaObj',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                        </ul>
                      </td>
                    </template>
                  </tr>
                  <tr>
                    <template v-for="(item,index) in zhengmaObj.list.slice(4,8)">
                      <td class="tdLeft oddsNtd ordersTdOver" width="8%" :class="'zhengmaObj'+item.oddsId" @click="orderTd(zhengmaObj,item,'zhengmaObj')" @mouseenter="overShow(item,'zhengmaObj')" @mouseleave="outHide(item,'zhengmaObj')"><div class="ball-icon" >{{item.oddsName}}</div></td>
                      <td class="tdRight" :class="'zhengmaObj'+item.oddsId" @click="orderTd(zhengmaObj,item,'zhengmaObj')" @mouseenter="overShow(item,'zhengmaObj')" @mouseleave="outHide(item,'zhengmaObj')">
                        <ul>
                          <li ><span class="odds-font">{{item.odds}}</span></li>
                          <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(zhengmaObj,item,'zhengmaObj',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                        </ul>
                      </td>
                    </template>
                  </tr>
                  <tr>
                    <template v-for="(item,index) in zhengmaObj.list.slice(8,12)">
                      <td class="tdLeft oddsNtd ordersTdOver" width="8%" :class="'zhengmaObj'+item.oddsId" @click="orderTd(zhengmaObj,item,'zhengmaObj')" @mouseenter="overShow(item,'zhengmaObj')" @mouseleave="outHide(item,'zhengmaObj')"><div class="ball-icon" >{{item.oddsName}}</div></td>
                      <td class="tdRight" :class="'zhengmaObj'+item.oddsId" @click="orderTd(zhengmaObj,item,'zhengmaObj')" @mouseenter="overShow(item,'zhengmaObj')" @mouseleave="outHide(item,'zhengmaObj')">
                        <ul>
                          <li ><span class="odds-font">{{item.odds}}</span></li>
                          <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(zhengmaObj,item,'zhengmaObj',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                        </ul>
                      </td>
                    </template>
                  </tr>
                  <tr>
                    <template v-for="(item,index) in zhengmaObj.list.slice(12,16)">
                      <td class="tdLeft oddsNtd ordersTdOver" width="8%" :class="'zhengmaObj'+item.oddsId" @click="orderTd(zhengmaObj,item,'zhengmaObj')" @mouseenter="overShow(item,'zhengmaObj')" @mouseleave="outHide(item,'zhengmaObj')"><div class="ball-icon" >{{item.oddsName}}</div></td>
                      <td class="tdRight" :class="'zhengmaObj'+item.oddsId" @click="orderTd(zhengmaObj,item,'zhengmaObj')" @mouseenter="overShow(item,'zhengmaObj')" @mouseleave="outHide(item,'zhengmaObj')">
                        <ul>
                          <li ><span class="odds-font">{{item.odds}}</span></li>
                          <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(zhengmaObj,item,'zhengmaObj',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                        </ul>
                      </td>
                    </template>
                  </tr>
                  <tr>
                    <template v-for="(item,index) in zhengmaObj.list.slice(16,20)">
                      <td class="tdLeft oddsNtd ordersTdOver" width="8%" :class="'zhengmaObj'+item.oddsId" @click="orderTd(zhengmaObj,item,'zhengmaObj')" @mouseenter="overShow(item,'zhengmaObj')" @mouseleave="outHide(item,'zhengmaObj')"><div class="ball-icon" >{{item.oddsName}}</div></td>
                      <td class="tdRight" :class="'zhengmaObj'+item.oddsId" @click="orderTd(zhengmaObj,item,'zhengmaObj')" @mouseenter="overShow(item,'zhengmaObj')" @mouseleave="outHide(item,'zhengmaObj')">
                        <ul>
                          <li ><span class="odds-font">{{item.odds}}</span></li>
                          <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(zhengmaObj,item,'zhengmaObj',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
                        </ul>
                      </td>
                    </template>
                  </tr>
                </table>

              </div>

              <div>
                  <div class="order-table">
                      <table>
                        <tr>
                          <th colspan="8">{{zongheData.name}}</th>
                        </tr>
                          <tr v-for="(itemPa,indexPa) in zongheData.list"> 
                            <template v-for="(item,index) in itemPa" v-if="item">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'zongheData'+item.oddsId" @click="orderTd(zongheData,item,'zongheData')" @mouseenter="overShow(item,'zongheData')" @mouseleave="outHide(item,'zongheData')">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'zongheData'+item.oddsId" @click="orderTd(zongheData,item,'zongheData')" @mouseenter="overShow(item,'zongheData')" @mouseleave="outHide(item,'zongheData')">
                                <ul>
                                  <li ><span class="odds-font">{{item.odds}}</span></li>
                                  <li v-if="normalPay"><input type="text" v-model="item.normalMoney" v-on:input ="inputFunc(zongheData,item,'zongheData',item.normalMoney)" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></li>
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
import { mapGetters } from 'vuex';

export default {
  components: {
    ClockTime,
    BetQuick,
    FooterBocai
  },
  data () {
    return {
      curBocaiTypeId: '8809',
      curactiveIndex: '广东快乐十分',
      bocaiCategoryList: [],
      oddsList: [],
      activeIndex: '',
      showOdds: '',
      submenu: '更多',
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

      longhuhe_lmp: {},
      yiwuqiu_lmp: [],
      yizhiwu_lmp: {},
      qianhousan_lmp: [],

      liangmianpan_lmp: [],

      zongheData: {},
      yidaosiqiu: [],
      sidaobaqiu: [],
      qidaobaqiuObjL: [],
      zhengmaObj: {}
    }
  },
  computed: {
    ...mapGetters({
        userInfo: 'getuserInfo',
        isOpenOdds: 'getisOpenOdds'
      })
  },
  created() {
    this.getOdds(this.curBocaiTypeId);
  },
  mounted(){
      bus.$on('setNewOddsList', (data) => {
        this.normalPay = false;
        this.oddsList = data;
        this.shuaiXuanDatas(data);
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

      if(this.isOpenOdds) {

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

          const loading = this.$loading({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
          await that.$get(`${window.url}/api/getOdds?bocaiTypeId=`+this.curBocaiTypeId+`&bocaiCategoryId=`+item.id).then((res) => {
            that.$handelResponse(res, (result) => {
          loading.close();
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
    async getnotice() {
      let res = await this.$get(`${window.url}/api/notice`);

          if(res.code===200){

            bus.$emit('getmessage', res.data);
          } else {
          }

    },
    async getOddsCategory(item,index) {

      bus.$emit('getbocaiCategoryId', item.id);

      this.getnotice();

      if(index*1 > 9) {
        this.submenu = item.name;
      } else {
        this.submenu = '更多';
      }

      this.resetOddsCategory(item);

    },
    async getOdds(id) {

      let that = this;
          const loading = this.$loading({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
          await that.$get(`${window.url}/api/getOdds?bocaiTypeId=`+id).then((res) => {
            that.$handelResponse(res, (result) => {
          loading.close();
              if(result.code===200){
                bus.$emit('curactiveIndex', this.curactiveIndex);
                that.bocaiCategoryList = result.bocaiCategoryList;
                that.oddsList = result.oddsList;
                that.showOdds = result.bocaiCategoryList[0].name;
                that.bocaiCategory = result.bocaiCategoryList[0];

                bus.$emit('getbocaiCategoryId', result.bocaiCategoryList[0].id);

                that.activeIndex = that.bocaiCategoryList[0].name;
                that.shuaiXuanDatas(result.oddsList);

                store.commit('updatebocaiTypeId',that.curBocaiTypeId);
                bus.$emit('getbocaiTypeName', that.curactiveIndex); 

              }
            })
          });

    },
    async getOddsFromBet(id) {

      let that = this;
          const loading = this.$loading({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
          await that.$get(`${window.url}/api/getOdds?bocaiTypeId=`+id).then((res) => {
            that.$handelResponse(res, (result) => {
          loading.close();
              if(result.code===200){
                bus.$emit('curactiveIndex', this.curactiveIndex);
                that.bocaiCategoryList = result.bocaiCategoryList;
                that.oddsList = result.oddsList;
                that.showOdds = result.bocaiCategoryList[0].name;
                that.bocaiCategory = result.bocaiCategoryList[0];

                bus.$emit('getbocaiCategoryId', result.bocaiCategoryList[0].id);
                that.activeIndex = that.bocaiCategoryList[0].name;
                that.shuaiXuanDatas(result.oddsList);

                store.commit('updatebocaiTypeId',that.curBocaiTypeId);
                bus.$emit('getbocaiTypeName', that.curactiveIndex); 

              }
            })
          });

    },
    shuaiXuanDatas(dataList) {

      if(this.showOdds == '两面盘') {
        let qianhousanTemp = [];
        for(let m in dataList) {
          if(dataList[m].name == '总和') {

            dataList[m].list = _.chunk(dataList[m].list,2);
            let arr1 = [];
            let arr2 = [];

            for(let n in dataList[m].list) {
              arr1.push(dataList[m].list[n][0]);
              arr2.push(dataList[m].list[n][1]);
            }

            this.zongheData.id = dataList[m].id;
            this.zongheData.name = dataList[m].name;
            this.zongheData.list = [];
            this.zongheData.list.push(arr1);
            this.zongheData.list.push(arr2);
          }
          if(['第一球','第二球','第三球','第四球','第五球','第六球','第七球','第八球'].findIndex((n) => n == dataList[m].name)>-1) {
            qianhousanTemp.push(dataList[m]);
          }
        }
        this.yidaoshi = qianhousanTemp;
      } else if(['第一球','第二球','第三球','第四球','第五球','第六球','第七球','第八球'].findIndex((n) => n == this.showOdds)>-1) {
        this.guanyaZonghe = this.oddsList[0];
      } else if(this.showOdds == '正码') {
        for(let m in dataList) {
          if(dataList[m].name == '总和') {

            dataList[m].list = _.chunk(dataList[m].list,2);
            let arr1 = [];
            let arr2 = [];

            for(let n in dataList[m].list) {
              arr1.push(dataList[m].list[n][0]);
              arr2.push(dataList[m].list[n][1]);
            }

            this.zongheData.id = dataList[m].id;
            this.zongheData.name = dataList[m].name;
            this.zongheData.list = [];
            this.zongheData.list.push(arr1);
            this.zongheData.list.push(arr2);
          }
          if(['正码'].findIndex((n) => n == dataList[m].name)>-1) {
            this.zhengmaObj = dataList[m];
          }
        }
      }

    }

  }
}

</script>

<style scoped>


</style>
