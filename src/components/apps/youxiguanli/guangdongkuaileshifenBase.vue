<template>
  <div id="youxishezhi" class="content-main duboBodyClass">
    <div class="nav" v-if="isAdminOdd">
      <menu-btn :curBocaiTypeId="curBocaiTypeId" :bocaiMenu="bocaiMenu"></menu-btn>
    </div>

    <div class="nav" v-else>
      <span>游戏类型: {{curactiveIndex}}</span>
    </div>

    <div>
          <div id="submenu">
            <el-menu
              :default-active="activeIndex"
              class="el-menu-subnav"
              mode="horizontal"
              @select="handleSelect"
              >
              <el-menu-item v-for="(item,index) in bocaiCategoryList" :key="index" :index="item.name" @click="bocaiCategoryIdMenu(item)" v-if="!(['连码'].findIndex((n) => n==item.name)>-1)">{{item.name}}</el-menu-item>
            </el-menu>
          </div>
          
    </div>

    <div class="portlet">

        <div class="bet_box">
          <div class="orders oodsBodyDiv">

            <template v-if="showOdds == '两面盘'">

                <div>
                  <div class="order-table">
                      <table>
                        <tr>
                          <th colspan="8">{{zongheData.name}}</th>
                        </tr>
                          <tr v-for="(itemPa,indexPa) in zongheData.list"> 
                            <template v-for="(item,index) in itemPa" v-if="item">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'zongheData'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'zongheData'+item.oddsId" @click="selectTd(item,'zongheData')">

                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'zongheData'+item.oddsId" @click="orderTd(item,'zongheData','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'zongheData'+item.oddsId" @click="orderTd(item,'zongheData','add')"></i>
                                  </li>
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
                          <td class="tdLeft" width="30%" :class="'yidaoshi'+item.oddsId">{{item.oddsName}}</td>
                          <td class="tdRight" :class="'yidaoshi'+item.oddsId" @click="selectTd(item,'yidaoshi')">
                            <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'yidaoshi'+item.oddsId" @click="orderTd(item,'yidaoshi','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'yidaoshi'+item.oddsId" @click="orderTd(item,'yidaoshi','add')"></i>
                                  </li>
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
                              <td class="tdLeft oddsNtd ordersTdOver" width="8%" :class="'guanyaZonghe'+item.oddsId"><div class="ball-icon" >{{item.oddsName}}</div></td>
                              <td class="tdRight" :class="'guanyaZonghe'+item.oddsId" @click="selectTd(item,'guanyaZonghe')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(item,'guanyaZonghe','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(item,'guanyaZonghe','add')"></i>
                                  </li>
                                </ul>
                              </td>
                            </template>
                          </tr>

                          <tr>
                            <template v-for="(item,index) in guanyaZonghe.list.slice(4,8)">
                              <td class="tdLeft oddsNtd ordersTdOver" width="8%" :class="'guanyaZonghe'+item.oddsId" ><div class="ball-icon" >{{item.oddsName}}</div></td>
                              <td class="tdRight" :class="'guanyaZonghe'+item.oddsId" @click="selectTd(item,'guanyaZonghe')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(item,'guanyaZonghe','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(item,'guanyaZonghe','add')"></i>
                                  </li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in guanyaZonghe.list.slice(8,12)">
                              <td class="tdLeft oddsNtd ordersTdOver" width="8%" :class="'guanyaZonghe'+item.oddsId" ><div class="ball-icon" >{{item.oddsName}}</div></td>
                              <td class="tdRight" :class="'guanyaZonghe'+item.oddsId" @click="selectTd(item,'guanyaZonghe')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(item,'guanyaZonghe','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(item,'guanyaZonghe','add')"></i>
                                  </li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in guanyaZonghe.list.slice(12,16)">
                              <td class="tdLeft oddsNtd ordersTdOver" width="8%" :class="'guanyaZonghe'+item.oddsId" ><div class="ball-icon" >{{item.oddsName}}</div></td>
                              <td class="tdRight" :class="'guanyaZonghe'+item.oddsId" @click="selectTd(item,'guanyaZonghe')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(item,'guanyaZonghe','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(item,'guanyaZonghe','add')"></i>
                                  </li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in guanyaZonghe.list.slice(16,20)">
                              <td class="tdLeft oddsNtd ordersTdOver" width="8%" :class="'guanyaZonghe'+item.oddsId" ><div class="ball-icon" >{{item.oddsName}}</div></td>
                              <td class="tdRight" :class="'guanyaZonghe'+item.oddsId" @click="selectTd(item,'guanyaZonghe')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(item,'guanyaZonghe','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(item,'guanyaZonghe','add')"></i>
                                  </li>
                                </ul>
                              </td>
                            </template>
                          </tr>

                          <tr>
                            <template v-for="(item,index) in guanyaZonghe.list.slice(20,24)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'guanyaZonghe'+item.oddsId" >{{item.oddsName}}</td>
                              <td class="tdRight" :class="'guanyaZonghe'+item.oddsId" @click="selectTd(item,'guanyaZonghe')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(item,'guanyaZonghe','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(item,'guanyaZonghe','add')"></i>
                                  </li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in guanyaZonghe.list.slice(24,28)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'guanyaZonghe'+item.oddsId" >{{item.oddsName}}</td>
                              <td class="tdRight" :class="'guanyaZonghe'+item.oddsId" @click="selectTd(item,'guanyaZonghe')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(item,'guanyaZonghe','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(item,'guanyaZonghe','add')"></i>
                                  </li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in guanyaZonghe.list.slice(28,32)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'guanyaZonghe'+item.oddsId" >{{item.oddsName}}</td>
                              <td class="tdRight" :class="'guanyaZonghe'+item.oddsId" @click="selectTd(item,'guanyaZonghe')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(item,'guanyaZonghe','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(item,'guanyaZonghe','add')"></i>
                                  </li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in guanyaZonghe.list.slice(32,35)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'guanyaZonghe'+item.oddsId" >{{item.oddsName}}</td>
                              <td class="tdRight" :class="'guanyaZonghe'+item.oddsId" @click="selectTd(item,'guanyaZonghe')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(item,'guanyaZonghe','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(item,'guanyaZonghe','add')"></i>
                                  </li>
                                </ul>
                              </td>
                            </template>
                            <td class="tdLeft ordersTdOver" colspan="2"></td>
                          </tr>

                          <tr v-if="['第一球','第二球','第三球','第四球'].findIndex((n) => n == showOdds)>-1">
                            <template v-for="(item,index) in guanyaZonghe.list.slice(35,37)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'guanyaZonghe'+item.oddsId" >{{item.oddsName}}</td>
                              <td class="tdRight" :class="'guanyaZonghe'+item.oddsId" @click="selectTd(item,'guanyaZonghe')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(item,'guanyaZonghe','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(item,'guanyaZonghe','add')"></i>
                                  </li>
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
                      <td class="tdLeft oddsNtd ordersTdOver" width="8%" :class="'zhengmaObj'+item.oddsId" ><div class="ball-icon" >{{item.oddsName}}</div></td>
                      <td class="tdRight" :class="'zhengmaObj'+item.oddsId" @click="selectTd(item,'zhengmaObj')">
                        <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'zhengmaObj'+item.oddsId" @click="orderTd(item,'zhengmaObj','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'zhengmaObj'+item.oddsId" @click="orderTd(item,'zhengmaObj','add')"></i>
                                  </li>
                                </ul>
                      </td>
                    </template>
                  </tr>
                  <tr>
                    <template v-for="(item,index) in zhengmaObj.list.slice(4,8)">
                      <td class="tdLeft oddsNtd ordersTdOver" width="8%" :class="'zhengmaObj'+item.oddsId" ><div class="ball-icon" >{{item.oddsName}}</div></td>
                      <td class="tdRight" :class="'zhengmaObj'+item.oddsId" @click="selectTd(item,'zhengmaObj')">
                        <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'zhengmaObj'+item.oddsId" @click="orderTd(item,'zhengmaObj','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'zhengmaObj'+item.oddsId" @click="orderTd(item,'zhengmaObj','add')"></i>
                                  </li>
                                </ul>
                      </td>
                    </template>
                  </tr>
                  <tr>
                    <template v-for="(item,index) in zhengmaObj.list.slice(8,12)">
                      <td class="tdLeft oddsNtd ordersTdOver" width="8%" :class="'zhengmaObj'+item.oddsId" ><div class="ball-icon" >{{item.oddsName}}</div></td>
                      <td class="tdRight" :class="'zhengmaObj'+item.oddsId" @click="selectTd(item,'zhengmaObj')">
                        <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'zhengmaObj'+item.oddsId" @click="orderTd(item,'zhengmaObj','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'zhengmaObj'+item.oddsId" @click="orderTd(item,'zhengmaObj','add')"></i>
                                  </li>
                                </ul>
                      </td>
                    </template>
                  </tr>
                  <tr>
                    <template v-for="(item,index) in zhengmaObj.list.slice(12,16)">
                      <td class="tdLeft oddsNtd ordersTdOver" width="8%" :class="'zhengmaObj'+item.oddsId" ><div class="ball-icon" >{{item.oddsName}}</div></td>
                      <td class="tdRight" :class="'zhengmaObj'+item.oddsId" @click="selectTd(item,'zhengmaObj')">
                        <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'zhengmaObj'+item.oddsId" @click="orderTd(item,'zhengmaObj','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'zhengmaObj'+item.oddsId" @click="orderTd(item,'zhengmaObj','add')"></i>
                                  </li>
                                </ul>
                      </td>
                    </template>
                  </tr>
                  <tr>
                    <template v-for="(item,index) in zhengmaObj.list.slice(16,20)">
                      <td class="tdLeft oddsNtd ordersTdOver" width="8%" :class="'zhengmaObj'+item.oddsId" ><div class="ball-icon" >{{item.oddsName}}</div></td>
                      <td class="tdRight" :class="'zhengmaObj'+item.oddsId" @click="selectTd(item,'zhengmaObj')">
                        <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'zhengmaObj'+item.oddsId" @click="orderTd(item,'zhengmaObj','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'zhengmaObj'+item.oddsId" @click="orderTd(item,'zhengmaObj','add')"></i>
                                  </li>
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
                          <th colspan="8">{{zhengmaObj.name}}</th>
                        </tr>
                          <tr v-for="(itemPa,indexPa) in zongheData.list"> 
                            <template v-for="(item,index) in itemPa" v-if="item">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'zongheData'+item.oddsId" >{{item.oddsName}}</td>
                              <td class="tdRight" :class="'zongheData'+item.oddsId" @click="selectTd(item,'zongheData')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'zongheData'+item.oddsId" @click="orderTd(item,'zongheData','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'zongheData'+item.oddsId" @click="orderTd(item,'zongheData','add')"></i>
                                  </li>
                                </ul>
                              </td>
                            </template>
                          </tr>

                      </table>

                  </div>
                </div>

            </template>

          </div>

          <div class="rateInput">
            <span>批量设置：</span> 
            <input type="text" v-model="setAllVlue" placeholder="请输入赔率值"> 
            <button class="tabBtn btn-blue mgr10" @click="setTedValue()">填入</button> 
            <button class="tabBtn btn-blue mgr10" @click="qingkong()">取消选中</button>
          </div>

          <div class="inner">
            <button class="btn-submit" @click="savebet">保存</button> 
            <button class="btn-cancel" @click="bocaiCategoryIdSub">重置</button>
          </div>

        </div>

    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MenuBtn from '@/components/apps/youxiguanli/components/menuBtn';

export default {
  components: {
      MenuBtn
  },
  data () {
    return {
      curBocaiTypeId: 8809,
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
      zhengmaObj: {},


      betfudu: 0.001,
      xushihuo: '1',
      adminBocaiInfo: {},
      orderOddsVisible: false,
      orderInfo: {},
      jiangliMoneyTotal: '',
      betsMoneyTotal: '',
      isBase: '2',
      curPageBetTotal: 0,
      curPageJangliTotal: 0,
      currentPage: 1,

      selectListTd:[],
      setAllVlue: ''
    }
  },
  computed: {
    ...mapGetters({
        ruleId:'getruleId',
      userInfo: 'getuserInfo',
      bocaiMenu: 'getbocaiMenu'
      }),
    isAdminOdd() {
      return this.ruleId == '1' ?  false : true;
    }
  },
  created() {
    this.getoddsCategory();
  },
  mounted(){
  },
  methods: {
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
    bocaiCategoryIdMenu(item) {
      this.bocaiCategory = item;
      this.bocaiCategoryIdSub();
    },
    async bocaiCategoryIdSub() {


      let that = this;

          const loading = this.$loading({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
          await that.$get(`${window.url}/admin/bocai/odds?bocaiCategoryId=`+this.bocaiCategory.id+`&isBase=`+this.isBase+`&bocaiTypeId=`+this.curBocaiTypeId).then((res) => {
            that.$handelResponse(res, (result) => {
          loading.close();
              that.showOdds = this.bocaiCategory.name;
              that.bocaiCategory = this.bocaiCategory;
              if(result.code===200){

                this.oddsList = res.oddsList;

                this.shuaiXuanDatas(res.oddsList);
                

                that.qingkong();

              }
            })
          });

      let parms = {
        bocaiCategoryId: this.bocaiCategory.id,
        isBase: this.isBase,
        curBocaiTypeId: this.curBocaiTypeId
      }

      bus.$emit('getRefreshTime', parms);

    },

    
    selectTd(item,ids) {
      console.log('item',item);
      console.log('ids',ids);
      $('.'+ids+item.oddsId).addClass('selected');
      
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

    },
    setTedValue() {
      for(let n in this.updateList) {
        this.updateList[n].odds = this.setAllVlue;
      }
    },

    qingkong() {
      $('.bet_box .orders td').removeClass('selected');
      this.updateList = [];
    },
    async savebet() {

      let that = this;

      console.log('updateList',this.updateList);

      let arr = [];

      for(let n in this.updateList) {
        let obj = {};

        obj.bocaiId = this.updateList[n].oddsId;
        obj.odds = this.updateList[n].odds;
obj.id = this.updateList[n].id;

        arr.push(obj);
      }

      let objdata = {
        userId: this.userInfo.id,
        bocaiTypeId: this.curBocaiTypeId,
        isBase: this.isBase,
        list: arr
      }

      const loading = this.$loading({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
          await that.$post(`${window.url}/admin/bocai/oddsSub`,objdata).then((res) => {
            that.$handelResponse(res, (result) => {
          loading.close();
              if(result.code===200){

                this.bocaiCategoryIdSub();

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
