<template>
  <div id="youxishezhi" class="content-main duboBodyClass">
    <div class="nav">
      <span>游戏类型:
        <el-select v-model="curBocaiTypeId" @change="gotobocaiSet" placeholder="请选择" size="mini">
          <el-option
            v-for="item in bocaiMenu"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>

        <div class="btn-ground">
          <button class="tabBtn btn btn-blue mgr10 router-link-active" @click="$router.push({name:'youxishezhi'})">基本设置</button> 
          <button class="tabBtn btn btn-blue mgr10" @click="$router.push({name:'pcdandanBase'})">赔率设置</button> 
          <button class="tabBtn btn btn-blue mgr10" @click="$router.push({name:'peilvchaset'})">赔率差设置</button> 
          <button class="tabBtn btn btn-blue mgr10" @click="$router.push({name:'peilvfudongset'})">赔率浮动设置</button>
        </div>
      </span>
    </div>

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

    <div class="portlet">



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
                              <td class="tdRight selectTd" :class="'longhuhe_lmp'+item.oddsId" @click="selectTd(item,'longhuhe_lmp')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'longhuhe_lmp'+item.oddsId" @click="orderTd(item,'longhuhe_lmp','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'longhuhe_lmp'+item.oddsId" @click="orderTd(item,'longhuhe_lmp','add')"></i>
                                  </li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in longhuhe_lmp.list" v-if="index*1 > 3">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'longhuhe_lmp'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight selectTd" :class="'longhuhe_lmp'+item.oddsId" @click="selectTd(item,'longhuhe_lmp')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'longhuhe_lmp'+item.oddsId" @click="orderTd(item,'longhuhe_lmp','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'longhuhe_lmp'+item.oddsId" @click="orderTd(item,'longhuhe_lmp','add')"></i>
                                  </li>
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
                              <td class="tdRight selectTd" :class="'yiwuqiu_lmp'+item.oddsId" @click="selectTd(item,'yiwuqiu_lmp')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'yiwuqiu_lmp'+item.oddsId" @click="orderTd(item,'yiwuqiu_lmp','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'yiwuqiu_lmp'+item.oddsId" @click="orderTd(item,'yiwuqiu_lmp','add')"></i>
                                  </li>
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
                              <td class="tdRight selectTd" :class="'qianhousan_lmp'+item.oddsId" @click="selectTd(item,'qianhousan_lmp')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'qianhousan_lmp'+item.oddsId" @click="orderTd(item,'qianhousan_lmp','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'qianhousan_lmp'+item.oddsId" @click="orderTd(item,'qianhousan_lmp','add')"></i>
                                  </li>
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
                            <td class="oddsUltd selectTd" :class="'item_yiwu'+item.oddsId" @click="selectTd(item,'item_yiwu')">
                              <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'index_yiwu'+item.oddsId" @click="orderTd(item,'index_yiwu','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'index_yiwu'+item.oddsId" @click="orderTd(item,'index_yiwu','add')"></i>
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
                      <td class="pointerDom selectTd" :class="'item_yizi'+item.oddsId" @click="selectTd(item,'item_yizi')">
                        <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'item_yizi'+item.oddsId" @click="orderTd(item,'item_yizi','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'item_yizi'+item.oddsId" @click="orderTd(item,'item_yizi','add')"></i>
                                  </li>
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
                        <td class="pointerDom selectTd" :class="'item_heshu'+item.oddsId" @click="selectTd(item,'item_heshu')">
                          <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'item_heshu'+item.oddsId" @click="orderTd(item,'item_heshu','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'item_heshu'+item.oddsId" @click="orderTd(item,'item_heshu','add')"></i>
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
            <button class="btn-cancel" @click="getoddsCategory">重置</button>
          </div>

        </div>


    </div>

  </div>
</template>



<script>
import { mapGetters } from 'vuex';

export default {
  components: {
  },
  data () {
    return {
      curBocaiTypeId: 1,
      curactiveIndex: '重庆时时彩',
      bocaiCategoryList: [],
      oddsList: [],
      activeIndex: '',
      showOdds: '',
      bocaiCategory: {},

      isOpenOdds: true,
      longhuhe_lmp: {},
      yiwuqiu_lmp: [],
      qianhousan_lmp: [],
      orderDataList: [],
      normalPay: false,
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
      isBase: '1',
      curPageBetTotal: 0,
      curPageJangliTotal: 0,
      currentPage: 1,
      curOddsId: '',

      selectListTd:[],
      setAllVlue: ''

    }
  },
  computed: {
    ...mapGetters({
      ruleId:'getruleId',
      userInfo: 'getuserInfo',
      bocaiMenu: 'getbocaiMenu'
    })
  },
  created() {

    this.getoddsCategory();


  },
  mounted(){
  },
  methods: {
    async getoddsCategory() {

      this.isBase = this.ruleId == 1 ? 1 : this.ruleId == 3 ? 2 : '';
      
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
    },

    selectTd(item,ids) {
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
    gotobocaiSet(data) {
      console.log('data',data);

      let path = '';

      switch (data) {
          case 1:
            path = 'chongqinduboBase';
            break;
          case 8555:
            path = 'luckyairshipBase';
            break;
          case 8806:
            path = 'beijingpk10Base';
            break;
          case 8811:
            path = 'shandong11xuan5Base';
            break;
          case 8374:
            path = 'guangdong11xuan5Base';
            break;
          case 8813:
            path = 'jiangxi11xuan5Base';
            break;
          case 8223:
            path = 'pcdandanBase';
            break;
          case 8498:
            path = 'jiangsukuaisanBase';
            break;
          case 8266:
            path = 'beijingkuaile8Base';
            break;
          case 9057:
            path = 'jisusaicheBase';
            break;
          case 8815:
            path = 'jisuduboBase';
            break;
      }

      this.$router.push({name:path});

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



    }

  }
}

</script>

<style scoped>
</style>
