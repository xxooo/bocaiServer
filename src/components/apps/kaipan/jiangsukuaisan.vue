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
            </span> 

            <auto-refresh v-on:childByReset="childByReset"></auto-refresh>

          </div>
        </div>

        <div class="bet_box">
          <div class="orders oodsBodyDiv">

            <div icontype="true">
              <div class="order-table">
                <table v-if="sanjundaxiao.list">
                  <tr>
                      <th colspan="8">{{sanjundaxiao.name}}</th>
                  </tr>
                  <tr>
                      <template v-for="(item,index) in sanjundaxiao.list.slice(0,3)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'sanjundaxiao'+item.oddsId">
                                <i :class="'jsk3-icon-'+item.oddsName"></i>
                              </td>
                              <td class="tdRight" :class="'sanjundaxiao'+item.oddsId">
                                <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'sanjundaxiao'+item.oddsId" @click="orderTd(item,'sanjundaxiao','jian')"></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'sanjundaxiao'+item.oddsId" @click="orderTd(item,'sanjundaxiao','add')"></i>
                                  </li>
                                  <li><span class="odds-font black" @click="getoddInfo(item.oddsId)">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
                                </ul>
                              </td>
                      </template>
                              <td class="tdLeft ordersTdOver" width="8%" :class="'sanjundaxiao'+sanjundaxiao.list[6].oddsId">{{sanjundaxiao.list[6].oddsName}}
                              </td>
                              <td class="tdRight" :class="'sanjundaxiao'+sanjundaxiao.list[6].oddsId">
                                <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'sanjundaxiao'+sanjundaxiao.list[6].oddsId" @click="orderTd(sanjundaxiao.list[6],'sanjundaxiao','jian')"></i>
                                    <span class="odds-font betspan">{{sanjundaxiao.list[6].odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'sanjundaxiao'+sanjundaxiao.list[6].oddsId" @click="orderTd(sanjundaxiao.list[6],'sanjundaxiao','add')"></i>
                                  </li>
                                  <li><span class="odds-font black" @click="getoddInfo(sanjundaxiao.list[6].oddsId)">{{xushihuo == '1' ? sanjundaxiao.list[6].shBetMoneySum : sanjundaxiao.list[6].betMoneySum}}</span></li>
                                  <li><span class="odds-font red">{{xushihuo == '1' ? sanjundaxiao.list[6].shWinnerMoneySum : sanjundaxiao.list[6].winnerMoneySum}}</span></li>
                                </ul>
                              </td>
                  </tr>
                  <tr>
                      <template v-for="(item,index) in sanjundaxiao.list.slice(3,6)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'sanjundaxiao'+item.oddsId">
                                <i :class="'jsk3-icon-'+item.oddsName"></i>
                              </td>
                              <td class="tdRight" :class="'sanjundaxiao'+item.oddsId">
                                <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'sanjundaxiao'+item.oddsId" @click="orderTd(item,'sanjundaxiao','jian')"></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'sanjundaxiao'+item.oddsId" @click="orderTd(item,'sanjundaxiao','add')"></i>
                                  </li>
                                  <li><span class="odds-font black" @click="getoddInfo(item.oddsId)">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
                                </ul>
                              </td>
                      </template>
                              <td class="tdLeft ordersTdOver" width="8%" :class="'sanjundaxiao'+sanjundaxiao.list[7].oddsId">{{sanjundaxiao.list[7].oddsName}}
                              </td>
                              <td class="tdRight" :class="'sanjundaxiao'+sanjundaxiao.list[7].oddsId">
                                <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'sanjundaxiao'+sanjundaxiao.list[7].oddsId" @click="orderTd(sanjundaxiao.list[7],'sanjundaxiao','jian')"></i>
                                    <span class="odds-font betspan">{{sanjundaxiao.list[7].odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'sanjundaxiao'+sanjundaxiao.list[7].oddsId" @click="orderTd(sanjundaxiao.list[7],'sanjundaxiao','add')"></i>
                                  </li>
                                  <li><span class="odds-font black" @click="getoddInfo(sanjundaxiao.list[7].oddsId)">{{xushihuo == '1' ? sanjundaxiao.list[7].shBetMoneySum : sanjundaxiao.list[7].betMoneySum}}</span></li>
                                  <li><span class="odds-font red">{{xushihuo == '1' ? sanjundaxiao.list[7].shWinnerMoneySum : sanjundaxiao.list[7].winnerMoneySum}}</span></li>
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
                              <td class="tdLeft ordersTdOver sanshai" :class="'weishaiquanshai'+item.oddsId">
                                <i :class="'jsk3-icon-'+item.oddsName.slice(0,1)"></i>
                                <i :class="'jsk3-icon-'+item.oddsName.slice(2,3)"></i>
                                <i :class="'jsk3-icon-'+item.oddsName.slice(4,5)"></i>
                              </td>
                              <td class="tdRight w" :class="'weishaiquanshai'+item.oddsId">
                                <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'weishaiquanshai'+item.oddsId" @click="orderTd(item,'weishaiquanshai','jian')"></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'weishaiquanshai'+item.oddsId" @click="orderTd(item,'weishaiquanshai','add')"></i>
                                  </li>
                                  <li><span class="odds-font black" @click="getoddInfo(item.oddsId)">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
                                </ul>
                              </td>
                      </template>
                  </tr>
                  <tr>
                      <template v-for="(item,index) in weishaiquanshai.list.slice(3,6)">
                              <td class="tdLeft ordersTdOver sanshai" :class="'weishaiquanshai'+item.oddsId">
                                <i :class="'jsk3-icon-'+item.oddsName.slice(0,1)"></i>
                                <i :class="'jsk3-icon-'+item.oddsName.slice(2,3)"></i>
                                <i :class="'jsk3-icon-'+item.oddsName.slice(4,5)"></i>
                              </td>
                              <td class="tdRight w" :class="'weishaiquanshai'+item.oddsId">
                                <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'weishaiquanshai'+item.oddsId" @click="orderTd(item,'weishaiquanshai','jian')"></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'weishaiquanshai'+item.oddsId" @click="orderTd(item,'weishaiquanshai','add')"></i>
                                  </li>
                                  <li><span class="odds-font black" @click="getoddInfo(item.oddsId)">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
                                </ul>
                              </td>
                      </template>
                  </tr>
                  <tr>
                      <td class="tdLeft ordersTdOver sanshai" :class="'weishaiquanshai'+weishaiquanshai.list[6].oddsId">{{weishaiquanshai.list[6].oddsName}}
                              </td>
                              <td class="tdRight" :class="'weishaiquanshai'+weishaiquanshai.list[6].oddsId">
                                <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'weishaiquanshai'+weishaiquanshai.list[6].oddsId" @click="orderTd(weishaiquanshai.list[6],'weishaiquanshai','jian')"></i>
                                    <span class="odds-font betspan">{{weishaiquanshai.list[6].odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'weishaiquanshai'+weishaiquanshai.list[6].oddsId" @click="orderTd(weishaiquanshai.list[6],'weishaiquanshai','add')"></i>
                                  </li>
                                  <li><span class="odds-font black" @click="getoddInfo(weishaiquanshai.list[6].oddsId)">{{xushihuo == '1' ? weishaiquanshai.list[6].shBetMoneySum : weishaiquanshai.list[6].betMoneySum}}</span></li>
                                  <li><span class="odds-font red">{{xushihuo == '1' ? weishaiquanshai.list[6].shWinnerMoneySum : weishaiquanshai.list[6].winnerMoneySum}}</span></li>
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
                              <td class="tdLeft ordersTdOver" width="8%" :class="'dianshu'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'dianshu'+item.oddsId">
                                <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'dianshu'+item.oddsId" @click="orderTd(item,'dianshu','jian')"></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'dianshu'+item.oddsId" @click="orderTd(item,'dianshu','add')"></i>
                                  </li>
                                  <li><span class="odds-font black" @click="getoddInfo(item.oddsId)">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
                                </ul>
                              </td>
                            </template>
                        </tr>
                        <tr>
                            <template v-for="(item,index) in dianshu.list.slice(4,8)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'dianshu'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'dianshu'+item.oddsId">
                                <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'dianshu'+item.oddsId" @click="orderTd(item,'dianshu','jian')"></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'dianshu'+item.oddsId" @click="orderTd(item,'dianshu','add')"></i>
                                  </li>
                                  <li><span class="odds-font black" @click="getoddInfo(item.oddsId)">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
                                </ul>
                              </td>
                            </template>
                        </tr>
                        <tr>
                            <template v-for="(item,index) in dianshu.list.slice(8,12)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'dianshu'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'dianshu'+item.oddsId">
                                <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'dianshu'+item.oddsId" @click="orderTd(item,'dianshu','jian')"></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'dianshu'+item.oddsId" @click="orderTd(item,'dianshu','add')"></i>
                                  </li>
                                  <li><span class="odds-font black" @click="getoddInfo(item.oddsId)">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
                                </ul>
                              </td>
                            </template>
                        </tr>
                        <tr>
                            <template v-for="(item,index) in dianshu.list.slice(12,14)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'dianshu'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'dianshu'+item.oddsId">
                                <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'dianshu'+item.oddsId" @click="orderTd(item,'dianshu','jian')"></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'dianshu'+item.oddsId" @click="orderTd(item,'dianshu','add')"></i>
                                  </li>
                                  <li><span class="odds-font black" @click="getoddInfo(item.oddsId)">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
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
                              <td class="tdLeft ordersTdOver kuaisan" width="16%" :class="'changpai'+item.oddsId">
                                <i :class="'jsk3-icon-'+item.oddsName.slice(0,1)"></i>
                                <i :class="'jsk3-icon-'+item.oddsName.slice(2,3)"></i>
                              </td>
                              <td class="tdRight" :class="'changpai'+item.oddsId">
                                <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'changpai'+item.oddsId" @click="orderTd(item,'changpai','jian')"></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'changpai'+item.oddsId" @click="orderTd(item,'changpai','add')"></i>
                                  </li>
                                  <li><span class="odds-font black" @click="getoddInfo(item.oddsId)">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
                                </ul>
                              </td>
                            </template>
                        </tr>
                        <tr>
                            <template v-for="(item,index) in changpai.list.slice(3,6)">
                              <td class="tdLeft ordersTdOver kuaisan" width="16%" :class="'changpai'+item.oddsId">
                                <i :class="'jsk3-icon-'+item.oddsName.slice(0,1)"></i>
                                <i :class="'jsk3-icon-'+item.oddsName.slice(2,3)"></i>
                              </td>
                              <td class="tdRight" :class="'changpai'+item.oddsId">
                                <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'changpai'+item.oddsId" @click="orderTd(item,'changpai','jian')"></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'changpai'+item.oddsId" @click="orderTd(item,'changpai','add')"></i>
                                  </li>
                                  <li><span class="odds-font black" @click="getoddInfo(item.oddsId)">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
                                </ul>
                              </td>
                            </template>
                        </tr>
                        <tr>
                            <template v-for="(item,index) in changpai.list.slice(6,9)">
                              <td class="tdLeft ordersTdOver kuaisan" width="16%" :class="'changpai'+item.oddsId">
                                <i :class="'jsk3-icon-'+item.oddsName.slice(0,1)"></i>
                                <i :class="'jsk3-icon-'+item.oddsName.slice(2,3)"></i>
                              </td>
                              <td class="tdRight" :class="'changpai'+item.oddsId">
                                <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'changpai'+item.oddsId" @click="orderTd(item,'changpai','jian')"></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'changpai'+item.oddsId" @click="orderTd(item,'changpai','add')"></i>
                                  </li>
                                  <li><span class="odds-font black" @click="getoddInfo(item.oddsId)">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
                                </ul>
                              </td>
                            </template>
                        </tr>
                        <tr>
                            <template v-for="(item,index) in changpai.list.slice(9,12)">
                              <td class="tdLeft ordersTdOver kuaisan" width="16%" :class="'changpai'+item.oddsId">
                                <i :class="'jsk3-icon-'+item.oddsName.slice(0,1)"></i>
                                <i :class="'jsk3-icon-'+item.oddsName.slice(2,3)"></i>
                              </td>
                              <td class="tdRight" :class="'changpai'+item.oddsId">
                                <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'changpai'+item.oddsId" @click="orderTd(item,'changpai','jian')"></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'changpai'+item.oddsId" @click="orderTd(item,'changpai','add')"></i>
                                  </li>
                                  <li><span class="odds-font black" @click="getoddInfo(item.oddsId)">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
                                </ul>
                              </td>
                            </template>
                        </tr>
                        <tr>
                            <template v-for="(item,index) in changpai.list.slice(12,15)">
                              <td class="tdLeft ordersTdOver kuaisan" width="16%" :class="'changpai'+item.oddsId">
                                <i :class="'jsk3-icon-'+item.oddsName.slice(0,1)"></i>
                                <i :class="'jsk3-icon-'+item.oddsName.slice(2,3)"></i>
                              </td>
                              <td class="tdRight" :class="'changpai'+item.oddsId">
                                <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'changpai'+item.oddsId" @click="orderTd(item,'changpai','jian')"></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'changpai'+item.oddsId" @click="orderTd(item,'changpai','add')"></i>
                                  </li>
                                  <li><span class="odds-font black" @click="getoddInfo(item.oddsId)">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
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
                              <td class="tdLeft ordersTdOver kuaisan" width="16%" :class="'duanpai'+item.oddsId">
                                <i :class="'jsk3-icon-'+item.oddsName.slice(0,1)"></i>
                                <i :class="'jsk3-icon-'+item.oddsName.slice(2,3)"></i>
                              </td>
                              <td class="tdRight" :class="'duanpai'+item.oddsId">
                                <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'duanpai'+item.oddsId" @click="orderTd(item,'duanpai','jian')"></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'duanpai'+item.oddsId" @click="orderTd(item,'duanpai','add')"></i>
                                  </li>
                                  <li><span class="odds-font black" @click="getoddInfo(item.oddsId)">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
                                </ul>
                              </td>
                            </template>
                        </tr>
                        <tr>
                            <template v-for="(item,index) in duanpai.list.slice(3,6)">
                             <td class="tdLeft ordersTdOver kuaisan" width="16%" :class="'duanpai'+item.oddsId">
                                <i :class="'jsk3-icon-'+item.oddsName.slice(0,1)"></i>
                                <i :class="'jsk3-icon-'+item.oddsName.slice(2,3)"></i>
                              </td>
                              <td class="tdRight" :class="'duanpai'+item.oddsId">
                                <ul>
                                  <li>
                                    <i v-if="isEdit"class="iconfont icon-jian" :class="'duanpai'+item.oddsId" @click="orderTd(item,'duanpai','jian')"></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit"class="iconfont icon-jia1" :class="'duanpai'+item.oddsId" @click="orderTd(item,'duanpai','add')"></i>
                                  </li>
                                  <li><span class="odds-font black" @click="getoddInfo(item.oddsId)">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
                                </ul>
                              </td>
                            </template>
                        </tr>
                </table>
              </div>
            </div>


          </div>

          <div class="tool" v-if="isEdit">
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

      <div class="popup-body">
        <div class="default-list">
          <!-- <p class="tar"><button class="refresh">刷新</button>
            页数：
            <select><option value="1">1</option></select>
            / 1 页 共 1 条记录
          </p>  -->
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
              <tr v-for="(item,index) in orderInfo.list">
                <td>{{index*1+1}}</td> 
                <td><p>{{item.orderNum}}</p> <p>{{$timestampToTime(item.createDate)}}</p> <p>({{item.handicap}} 盘)</p></td> 
                <td><p>{{item.bocaiTypeName}}</p></td> 
                <td><p><b class="">「会员」{{item.username}}</b></p></td> 
                <td><span>下注</span></td> 
                <td><p>{{item.periods}} 期</p> <span class="odds-font">{{item.bocaiOddName}}</span>@<span class="odds-font">{{item.odds}}</span></td> 
                <td>{{item.betsMoney}}</td> 
                <td>{{item.winnerMoney}}</td>
              </tr>
            </tbody> 
            <tr class="tab-footer">
              <td colspan="6" class="tar">此页面统计：</td> 
              <td>{{curPageBetTotal}}</td> 
              <td>{{curPageJangliTotal}}</td>
            </tr> 
            <tr class="tab-footer">
              <td colspan="6" class="tar">总计：</td> 
              <td>{{betsMoneyTotal}}</td> 
              <td>{{jiangliMoneyTotal}}</td>
            </tr>
          </table>

          <div class="block" v-if="orderInfo.totalPage > 1">
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="orderInfo.pageSize"
                    layout="total, prev, pager, next"
                    :total="orderInfo.totalCount*1">
                  </el-pagination>
          </div>

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
import AutoRefresh from '@/components/apps/kaipan/components/autoRefresh';

export default {
  components: {
    AutoRefresh
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
      duanpai: {},


      betfudu: 0.001,
      huiheData: {},
      boseData: {},
      temaData: {},
      xushihuo: '1',
      updateList: [],
      adminBocaiInfo: {},
      hisResultAll: '',
      orderOddsVisible: false,
      orderInfo: {},
      jiangliMoneyTotal: '',
      betsMoneyTotal: '',
      isBase: '2',
      curPageBetTotal: 0,
      curPageJangliTotal: 0,
      currentPage: 1,
      curOddsId: ''
    }
  },
  computed: {
    ...mapGetters({
      ruleId:'getruleId',
      userInfo: 'getuserInfo'
    }),
    isEdit() {
      let bo = true;

      if(this.ruleId == 3) {
        bo = true;
      } else {
        bo = false;
      }

      return bo;
    }
  },
  created() {
    this.getoddsCategory();

    this.getadminBocaiInfo();

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

      let res = await this.$get(`${window.url}/admin/bocai/oddsCategory?bocaiTypeId=`+this.curBocaiTypeId+`&isBase=`+this.isBase);

      if(res.code===200){
        this.bocaiCategoryList = res.typeList;
        this.oddsList = res.oddsList;

        //this.shuaiXuanDatas(res.oddsList);

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
