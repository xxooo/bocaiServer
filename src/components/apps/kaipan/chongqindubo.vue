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

                <div>
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
                          <td class="tdLeft ordersTdOver" width="8%" :class="'yiwuqiu_lmp'+item.oddsId">{{item.oddsName}}</td>
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

              <div>

                <div class="order-table" v-for="(itemPa,index) in qianhousan_lmp">
                    <table>
                      <tr>
                        <th colspan="10">{{itemPa.name}}</th>
                      </tr>
                      <tr>
                        <template v-for="(item,index) in itemPa.list">
                          <td class="tdLeft ordersTdOver" width="8%" :class="'qianhousan_lmp'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight" :class="'qianhousan_lmp'+item.oddsId">
                                <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'qianhousan_lmp'+item.oddsId" @click="orderTd(item,'qianhousan_lmp','jian')" ></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'qianhousan_lmp'+item.oddsId" @click="orderTd(item,'qianhousan_lmp','add')"></i>
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

            <template v-if="showOdds == '1~5'">
              <div>
                <div class="qiu15_body">
                  <div class="nball" v-for="(item_yiwu,index_yiwu) in oddsList">
                    <div class="order-table">
                      <table>
                        <tr><th colspan="2">{{item_yiwu.name}}</th></tr>
                        <tr v-for="(item,index) in item_yiwu.list">
                            <td class="oddsNtd tdLeft" :class="'item_yiwu'+item.oddsId">
                              <template v-if="isNaN(item.oddsName*1)">
                                {{item.oddsName}}
                              </template>
                              <template v-else>
                                <div class="ball-icon">{{item.oddsName}}</div>
                              </template>
                            </td>
                            <td class="oddsUltd" :class="'item_yiwu'+item.oddsId">
                              <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'index_yiwu'+item.oddsId" @click="orderTd(item,'index_yiwu','jian')" ></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'index_yiwu'+item.oddsId" @click="orderTd(item,'index_yiwu','add')"></i>
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

            <template v-if="['二字','一字','三字','二定位','三定位','组选三','组选六','跨度'].findIndex((n) => n == showOdds)>-1">
              <div class="order-table yiziType">
                <table class="title">
                  <tr>
                    <th v-for="(item,index) in oddsList" class="pointerDom yiziThAct" :class="['shishiZi'+index,index == '0' ? 'active' : '']" @click="shishiZiGet(item,index)">{{item.name}}</th> 
                  </tr>
                </table> 

                <table>
                  <tr>
                    <th>号码</th> 
                    <th>赔率</th>
                    <th>号码</th> 
                    <th>赔率</th>
                    <th>号码</th> 
                    <th>赔率</th>
                    <th>号码</th> 
                    <th>赔率</th>
                    <th>号码</th> 
                    <th>赔率</th>
                  </tr>     
                  <tr v-for="(itemPa,index) in shishiZiDatasList">
                    <template v-for="(item,index) in itemPa">
                      <td class="pointerDom" :class="'item_yizi'+item.oddsId">{{item.oddsName}}</td> 
                      <td class="pointerDom" :class="'item_yizi'+item.oddsId">
                        <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'item_yizi'+item.oddsId" @click="orderTd(item,'item_yizi','jian')" ></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'item_yizi'+item.oddsId" @click="orderTd(item,'item_yizi','add')"></i>
                                  </li>
                                  <li><span class="odds-font black" @click="getoddInfo(item.oddsId)">{{xushihuo == '1' ? item.shBetMoneySum : item.betMoneySum}}</span></li>
                                  <li><span class="odds-font red">{{xushihuo == '1' ? item.shWinnerMoneySum : item.winnerMoneySum}}</span></li>
                                </ul>
                      </td> 
                    </template>
                  </tr> 
                </table>

              </div>
            </template>

            <template v-if="['和数'].findIndex((n) => n == showOdds)>-1">
              <div>
                <div class="order-table">
                  <table>
                    <tr>
                      <th colspan="5">{{showOdds}}</th>
                    </tr> 
                    <tr v-for="(itemPa,index) in oddsList">
                      <td width="20%"><b>{{itemPa.name}}</b></td>
                      <template v-for="(item,index) in itemPa.list">
                        <td class="pointerDom" :class="'item_heshu'+item.oddsId">{{item.oddsName}}</td> 
                        <td class="pointerDom" :class="'item_heshu'+item.oddsId">
                          <ul>
                                  <li>
                                    <i v-if="isEdit" class="iconfont icon-jian" :class="'item_heshu'+item.oddsId" @click="orderTd(item,'item_heshu','jian')" ></i>
                                    <span class="odds-font betspan">{{item.odds}}</span>
                                    <i v-if="isEdit" class="iconfont icon-jia1" :class="'item_heshu'+item.oddsId" @click="orderTd(item,'item_heshu','add')"></i>
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
      curBocaiTypeId: '1',
      curactiveIndex: '重庆时时彩',
      bocaiCategoryList: [],
      oddsList: [],
      activeIndex: '',
      showOdds: '',
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




    kuaixuanOdd(item,type) {
      this.qingkong();
      let list = this.shishiZiDatas.list;

      //console.log('item',item,'type',type);

      if($('.kuaixuan'+type+item).hasClass('active')){
        $('.kuaixuan'+type+item).removeClass('active');

        if(type == 'tou') {
          _.remove(this.kuaixuanTouList, function(n) {
            let m = {type,item};
            return JSON.stringify(n) == JSON.stringify(m);
          });
        } else {
          _.remove(this.kuaixuanWeiList, function(n) {
            let m = {type,item};
            return JSON.stringify(n) == JSON.stringify(m);
          });
        }

      } else {
        $('.kuaixuan'+type+item).addClass('active');
        if(type == 'tou') {
          this.kuaixuanTouList.push({type,item});
        } else {
          this.kuaixuanWeiList.push({type,item});
        }
      }

      let temlist = [];
      let temlistSub = [];

      //console.log('this.kuaixuanTouList',this.kuaixuanTouList);
      //console.log('this.kuaixuanWeiList',this.kuaixuanWeiList);

      if(this.kuaixuanTouList.length != 0 && this.kuaixuanWeiList.length != 0) {

        console.log('item111',item,'type',type);
        for(let n in list) {
          for(let m in this.kuaixuanTouList) {
            if(list[n].oddsName.charAt(0) == this.kuaixuanTouList[m].item) {
              temlist.push(list[n]);
            } 
          }
        }

        for(let n in temlist) {
            for(let m in this.kuaixuanWeiList) {
              if(temlist[n].oddsName.charAt(list[n].oddsName.length*1 - 1) == this.kuaixuanWeiList[m].item) {
                temlistSub.push(temlist[n]);
              } 
            }
          }
          
      } 
      if(this.kuaixuanTouList.length != 0 && this.kuaixuanWeiList.length == 0) {

        //console.log('item222',item,'type',type);

        for(let n in list) {
          for(let m in this.kuaixuanTouList) {
            if(list[n].oddsName.charAt(0) == this.kuaixuanTouList[m].item) {
              temlistSub.push(list[n]);
            } 
          }
        }
      } 
      if(this.kuaixuanTouList.length == 0 && this.kuaixuanWeiList.length != 0) {

        //console.log('item333',item,'type',type);

        for(let n in list) {
            for(let m in this.kuaixuanWeiList) {
              if(list[n].oddsName.charAt(list[n].oddsName.length*1 - 1) == this.kuaixuanWeiList[m].item) {
                temlistSub.push(list[n]);
              } 
            }
          }
      } 

      this.selectedZiTd = temlistSub;

      //console.log('temlistSub',temlistSub);

      let oddsObj = this.shishiZiDatas;

      if(!this.normalPay) {
        for(let n in this.selectedZiTd ) {
          this.orderTd(oddsObj,this.selectedZiTd[n],'item_yizi');
        }
      } else {
        for(let n in this.shishiZiDatasList){
          for(let m in this.shishiZiDatasList[n]) {
            this.inputFuncYiZi(this.shishiZiDatasList[n][m],'item_yizi',this.shishiZiDatasList[n][m].normalMoney);
          }
        }
        for(let n in this.selectedZiTd ) {
          $('.item_yizi'+this.selectedZiTd[n].oddsId).addClass('selected');
        }
      }

      
          
    },
    shishiZiGet(item,index) {
      this.qingkong();
      $('.yiziThAct').removeClass('active');
      $('.shishiZi'+index).addClass('active');
      this.shishiZiDatas = item;

      if(['二字','一字','三字','二定位','三定位','组选三','组选六','跨度'].findIndex((n) => n == this.showOdds)>-1) {
        this.shishiZiDatasList = [];
        for(var i=0;i<item.list.length;i=i+5){
          this.shishiZiDatasList.push(item.list.slice(i,i+5));
        }
      }

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
    async getOddsCategory(item,index) {

      this.resetOddsCategory(item);

    },
    shuaiXuanDatas(dataList) {
      if(this.showOdds == '两面盘') {
        let yiwuqiuTemp = [];
        let qianhousanTemp = [];
        for(let m in dataList) {
          if(dataList[m].name == '总和-龙虎和') {
            this.longhuhe_lmp = dataList[m];
          }
          if(['第一球','第二球','第三球','第四球','第五球'].findIndex((n) => n == dataList[m].name)>-1) {
            yiwuqiuTemp.push(dataList[m]);
          }
          if(['前三','中三','后三'].findIndex((n) => n == dataList[m].name)>-1) {
            qianhousanTemp.push(dataList[m]);
          }
        }
        this.yiwuqiu_lmp = yiwuqiuTemp;
        this.qianhousan_lmp = qianhousanTemp;
      }

      if(['二字','一字','三字','二定位','三定位','组选三','组选六','跨度'].findIndex((n) => n == this.showOdds)>-1) {
          this.shishiZiDatas = dataList[0];

          let arry = [];

          for(var i=0;i<this.shishiZiDatas.list.length;i=i+5){
            arry.push(this.shishiZiDatas.list.slice(i,i+5));
          }

          this.shishiZiDatasList = arry;

          $('.yiziThAct').removeClass('active');
          $('.shishiZi0').addClass('active');
        }
    }

  }
}

</script>

<style scoped>


</style>
<style lang="less">
</style>



