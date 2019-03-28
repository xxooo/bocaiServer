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
            </span> 

            <auto-refresh v-on:childByReset="childByReset"></auto-refresh>

          </div>
        </div>

        <div class="bet_box">
          <div class="orders oodsBodyDiv">

            <template v-if="showOdds == '两面盘'">

                <div class="oodsBodyDiv">
                  <div class="order-table">
                      <table>
                        <tr>
                          <th colspan="8">{{longhuhe_lmp.name}}</th>
                        </tr>
                          <tr>
                            <template v-for="(item,index) in longhuhe_lmp.list" v-if="index*1 < 4">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'longhuhe_lmp'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'longhuhe_lmp'+item.oddsId">
                                <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'longhuhe_lmp'+item.oddsId" @click="orderTd(item,'longhuhe_lmp','jian')" ></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'longhuhe_lmp'+item.oddsId" @click="orderTd(item,'longhuhe_lmp','add')"></i>
                                  </li>
                                  <li><span class="odds-font black" @click="getoddInfo(item.oddsId)">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in longhuhe_lmp.list" v-if="index*1 > 3">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'longhuhe_lmp'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'longhuhe_lmp'+item.oddsId">
                                <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'longhuhe_lmp'+item.oddsId" @click="orderTd(item,'longhuhe_lmp','jian')" ></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'longhuhe_lmp'+item.oddsId" @click="orderTd(item,'longhuhe_lmp','add')"></i>
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

              <div class="qiu15_body">

                <div class="eball" v-for="(itemPa,index) in yiwuqiu_lmp">
                    <div class="order-table">
                      <table>
                        <tr>
                          <th colspan="2">{{itemPa.name}}</th>
                        </tr>
                        <tr v-for="(item,index) in itemPa.list">
                          <td class="tdLeft" :class="'yiwuqiu_lmp'+item.oddsId">{{item.oddsName}}</td>
                          <td class="tdRight" :class="'yiwuqiu_lmp'+item.oddsId">
                            <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'yiwuqiu_lmp'+item.oddsId" @click="orderTd(item,'yiwuqiu_lmp','jian')" ></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'yiwuqiu_lmp'+item.oddsId" @click="orderTd(item,'yiwuqiu_lmp','add')"></i>
                                  </li>
                                  <li><span class="odds-font black" @click="getoddInfo(item.oddsId)">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
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
                        <td class="oddsNtd tdLeft" :class="'yizhongyi'+item.oddsId"><div class="ball-icon" >{{item.oddsName}}</div></td>
                          <td class="oddsUltd" :class="'yizhongyi'+item.oddsId">
                            <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'yizhongyi'+item.oddsId" @click="orderTd(item,'yizhongyi','jian')" ></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'yizhongyi'+item.oddsId" @click="orderTd(item,'yizhongyi','add')"></i>
                                  </li>
                                  <li><span class="odds-font black" @click="getoddInfo(item.oddsId)">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
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
                          <td class="oddsNtd tdLeft" :class="'yiwuqiu_lmp'+item.oddsId"><div class="ball-icon" >{{item.oddsName}}</div></td>
                          <td class="oddsUltd" :class="'yiwuqiu_lmp'+item.oddsId">
                            <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'yiwuqiu_lmp'+item.oddsId" @click="orderTd(item,'yiwuqiu_lmp','jian')" ></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'yiwuqiu_lmp'+item.oddsId" @click="orderTd(item,'yiwuqiu_lmp','add')"></i>
                                  </li>
                                  <li><span class="odds-font black" @click="getoddInfo(item.oddsId)">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
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

                  <tr>
                    <td :class="'lianma'+index" v-for="(item,index) in oddsList[0].list.slice(0,5)">{{item.oddsName}}</td>
                  </tr>
                  <tr>
                    <td :class="'lianma'+index" v-for="(item,index) in oddsList[0].list.slice(0,5)">
                      <ul>
                        <li>
                          <i v-if="isEdit" class="iconfont icon-jian" :class="'lianma'+item.oddsId" @click="orderTd(item,'lianma','jian')" ></i>
                            <span class="odds-font betspan">{{item.odds}}</span>
                            <i v-if="isEdit" class="iconfont icon-jia1" :class="'lianma'+item.oddsId" @click="orderTd(item,'lianma','add')"></i>
                        </li>
                        <li><span class="odds-font black" @click="getoddInfo(item.oddsId)">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                        <li><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
                      </ul>
                    </td> 
                  </tr>

                  <tr>
                    <td :class="'lianma'+index" v-for="(item,index) in oddsList[0].list.slice(5,9)">{{item.oddsName}}</td>
                  </tr>
                  <tr>
                    <td :class="'lianma'+index" v-for="(item,index) in oddsList[0].list.slice(5,9)">
                      <ul>
                        <li>
                          <i v-if="isEdit" class="iconfont icon-jian" :class="'lianma'+item.oddsId" @click="orderTd(item,'lianma','jian')" ></i>
                            <span class="odds-font betspan">{{item.odds}}</span>
                            <i v-if="isEdit" class="iconfont icon-jia1" :class="'lianma'+item.oddsId" @click="orderTd(item,'lianma','add')"></i>
                        </li>
                        <li><span class="odds-font black" @click="getoddInfo(item.oddsId)">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                        <li><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
                      </ul>
                    </td> 
                  </tr>
                </table> 
              </div>
            </template>

            <template v-if="['直选'].findIndex((n) => n == showOdds)>-1">
              <div class="order-table">
                <table>

                  <tr>
                    <th colspan="12">前二、前三直选</th>
                  </tr> 
                  <tr>
                    <td :class="'zhixuan'+index" v-for="(item,index) in oddsList[0].list">{{item.oddsName}}</td>
                  </tr>
                  <tr>
                    <td :class="'zhixuan'+index" v-for="(item,index) in oddsList[0].list">
                      <ul>
                        <li>
                          <i v-if="isEdit" class="iconfont icon-jian" :class="'zhixuan'+item.oddsId" @click="orderTd(item,'zhixuan','jian')" ></i>
                            <span class="odds-font betspan">{{item.odds}}</span>
                            <i v-if="isEdit" class="iconfont icon-jia1" :class="'zhixuan'+item.oddsId" @click="orderTd(item,'zhixuan','add')"></i>
                        </li>
                        <li><span class="odds-font black" @click="getoddInfo(item.oddsId)">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                        <li><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
                      </ul>
                    </td> 
                  </tr>

                </table> 


              </div>
            </template>


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
      curBocaiTypeId: '8813',
      curactiveIndex: '江西11选5',
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
      orderDataTemp: {},


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

      this.curPageBetTotal = 0;
      this.curPageJangliTotal = 0;

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

        this.shuaiXuanDatas(res.oddsList);

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
