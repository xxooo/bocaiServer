<template>
  <div id="chongqindubo" class="content-main duboBodyClass">
    
    <div class="right">
      <div>
        <div>
          <el-menu
              :default-active="activeIndex"
              class="el-menu-subnav"
              mode="horizontal"
              @select="handleSelect"
              >
              <el-menu-item v-for="(item,index) in bocaiCategoryList" :key="index" :index="item.name" @click="bocaiCategoryId(item)">{{item.name}}</el-menu-item>
            </el-menu>
          
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

            <template v-if="showOdds == '总行、比数、五行'">

                <div>
                  <div class="order-table">
                      <table>
                        <tr>
                          <th colspan="8">{{zongheguoguan.name}}</th>
                        </tr>
                          <tr>
                            <template v-for="(item,index) in zongheguoguan.list.slice(0,4)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'zongheguoguan'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'zongheguoguan'+item.oddsId">
                                <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'zongheguoguan'+item.oddsId" @click="orderTd(item,'zongheguoguan','jian')" ></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'zongheguoguan'+item.oddsId" @click="orderTd(item,'zongheguoguan','add')"></i>
                                  </li>
                                  <li><span class="odds-font black" @click="getoddInfo(item.oddsId)">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in zongheguoguan.list.slice(4,5)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'zongheguoguan'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'zongheguoguan'+item.oddsId">
                                <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'zongheguoguan'+item.oddsId" @click="orderTd(item,'zongheguoguan','jian')" ></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'zongheguoguan'+item.oddsId" @click="orderTd(item,'zongheguoguan','add')"></i>
                                  </li>
                                  <li><span class="odds-font black" @click="getoddInfo(item.oddsId)">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
                                </ul>
                              </td>
                            </template>
                            <td colspan="6">&nbsp;</td>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in zongheguoguan.list.slice(5,9)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'zongheguoguan'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'zongheguoguan'+item.oddsId">
                                <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'zongheguoguan'+item.oddsId" @click="orderTd(item,'zongheguoguan','jian')" ></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'zongheguoguan'+item.oddsId" @click="orderTd(item,'zongheguoguan','add')"></i>
                                  </li>
                                  <li><span class="odds-font black" @click="getoddInfo(item.oddsId)">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
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
                              <td class="tdLeft ordersTdOver" width="8%" :class="'qianhouhe'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'qianhouhe'+item.oddsId">
                                <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'qianhouhe'+item.oddsId" @click="orderTd(item,'qianhouhe','jian')" ></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'qianhouhe'+item.oddsId" @click="orderTd(item,'qianhouhe','add')"></i>
                                  </li>
                                  <li><span class="odds-font black" @click="getoddInfo(item.oddsId)">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
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
                              <td class="tdLeft ordersTdOver" width="8%" :class="'danshuanghe'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'danshuanghe'+item.oddsId">
                                <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'danshuanghe'+item.oddsId" @click="orderTd(item,'danshuanghe','jian')" ></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'danshuanghe'+item.oddsId" @click="orderTd(item,'danshuanghe','add')"></i>
                                  </li>
                                  <li><span class="odds-font black" @click="getoddInfo(item.oddsId)">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
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
                              <td class="tdLeft ordersTdOver" width="8%" :class="'wuxing'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'wuxing'+item.oddsId">
                                <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'wuxing'+item.oddsId" @click="orderTd(item,'wuxing','jian')" ></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'wuxing'+item.oddsId" @click="orderTd(item,'wuxing','add')"></i>
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
                              <td class="tdLeft ordersTdOver" width="8%" :class="'zhengma'+item.oddsId"><div :class="item.oddsName*1 > 40 ? 'ballda' : 'ballxiao'">{{item.oddsName}}</div></td>
                              <td class="tdRight" :class="'zhengma'+item.oddsId">
                                <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'zhengma'+item.oddsId" @click="orderTd(item,'zhengma','jian')" ></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'zhengma'+item.oddsId" @click="orderTd(item,'zhengma','add')"></i>
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
      zhengma: {},

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


      const loading = this.$loading({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
          await that.$post(`${window.url}/admin/bocai/oddsSub`,objdata).then((res) => {
            that.$handelResponse(res, (result) => {
          loading.close();
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

          const loading = this.$loading({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
          await that.$get(`${window.url}/admin/bocai/odds?bocaiCategoryId=`+item.id+`&isBase=`+this.isBase+`&bocaiTypeId=`+this.curBocaiTypeId).then((res) => {
            that.$handelResponse(res, (result) => {
          loading.close();
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
