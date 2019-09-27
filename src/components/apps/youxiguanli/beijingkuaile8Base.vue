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
              <el-menu-item v-for="(item,index) in bocaiCategoryList" :key="index" :index="item.name" @click="bocaiCategoryIdMenu(item)">{{item.name}}</el-menu-item>
            </el-menu>
          </div>
          
    </div>

    <div class="portlet">


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
                              <td class="tdRight selectTd" :class="'zongheguoguan'+item.oddsId" @click="selectTd(item,'zongheguoguan')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'zongheguoguan'+item.oddsId" @click="orderTd(item,'zongheguoguan','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'zongheguoguan'+item.oddsId" @click="orderTd(item,'zongheguoguan','add')"></i>
                                  </li>
                                </ul>
                              </td>
                            </template>
                          </tr>

                          <tr>
                            <template v-for="(item,index) in zongheguoguan.list.slice(4,5)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'zongheguoguan'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight selectTd" :class="'zongheguoguan'+item.oddsId" @click="selectTd(item,'zongheguoguan')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'zongheguoguan'+item.oddsId" @click="orderTd(item,'zongheguoguan','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'zongheguoguan'+item.oddsId" @click="orderTd(item,'zongheguoguan','add')"></i>
                                  </li>
                                </ul>
                              </td>
                            </template>
                            <td colspan="6">&nbsp;</td>
                          </tr>

                          <tr>
                            <template v-for="(item,index) in zongheguoguan.list.slice(5,9)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'zongheguoguan'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight selectTd" :class="'zongheguoguan'+item.oddsId" @click="selectTd(item,'zongheguoguan')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'zongheguoguan'+item.oddsId" @click="orderTd(item,'zongheguoguan','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'zongheguoguan'+item.oddsId" @click="orderTd(item,'zongheguoguan','add')"></i>
                                  </li>
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
                              <td class="tdRight selectTd" :class="'qianhouhe'+item.oddsId" @click="selectTd(item,'qianhouhe')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'qianhouhe'+item.oddsId" @click="orderTd(item,'qianhouhe','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'qianhouhe'+item.oddsId" @click="orderTd(item,'qianhouhe','add')"></i>
                                  </li>
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
                              <td class="tdRight selectTd" :class="'danshuanghe'+item.oddsId" @click="selectTd(item,'danshuanghe')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'danshuanghe'+item.oddsId" @click="orderTd(item,'danshuanghe','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'danshuanghe'+item.oddsId" @click="orderTd(item,'danshuanghe','add')"></i>
                                  </li>
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
                              <td class="tdRight selectTd" :class="'wuxing'+item.oddsId" @click="selectTd(item,'wuxing')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'wuxing'+item.oddsId" @click="orderTd(item,'wuxing','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'wuxing'+item.oddsId" @click="orderTd(item,'wuxing','add')"></i>
                                  </li>
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
                              <td class="tdLeft ordersTdOver" width="8%" :class="'zhengma'+item.oddsId">
                                <div :class="item.oddsName*1 > 40 ? 'ballda' : 'ballxiao'">{{item.oddsName}}</div>
                              </td>
                              <td class="tdRight selectTd" :class="'zhengma'+item.oddsId" @click="selectTd(item,'zhengma')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'zhengma'+item.oddsId" @click="orderTd(item,'zhengma','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'zhengma'+item.oddsId" @click="orderTd(item,'zhengma','add')"></i>
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
      curBocaiTypeId: 8266,
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

      guanyajunhe: {},
      yidaoshi: {},
      guanyaZonghe: {},
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



    }

  }
}

</script>

<style scoped>
</style>
