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
          <button class="tabBtn btn btn-blue mgr10" @click="$router.push({name:'jisusaicheBase'})">赔率设置</button> 
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
              <el-menu-item v-for="(item,index) in bocaiCategoryList" :key="index" :index="item.name" @click="bocaiCategoryIdMenu(item)">{{item.name}}</el-menu-item>
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
                          <th colspan="8">{{guanyajunhe.name}}</th>
                        </tr>
                          <tr>
                            <template v-for="(item,index) in guanyajunhe.list" v-if="index*1 < 4">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'guanyajunhe'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight selectTd" :class="'guanyajunhe'+item.oddsId" @click="selectTd(item,'guanyajunhe')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'guanyajunhe'+item.oddsId" @click="orderTd(item,'guanyajunhe','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'guanyajunhe'+item.oddsId" @click="orderTd(item,'guanyajunhe','add')"></i>
                                  </li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in guanyajunhe.list" v-if="index*1 > 3">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'guanyajunhe'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight selectTd" :class="'guanyajunhe'+item.oddsId" @click="selectTd(item,'guanyajunhe')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'guanyajunhe'+item.oddsId" @click="orderTd(item,'guanyajunhe','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'guanyajunhe'+item.oddsId" @click="orderTd(item,'guanyajunhe','add')"></i>
                                  </li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                      </table>
                  </div>
                </div>

                <div class="qiu15_body">

                <div class="eball" v-for="(itemPa,index) in yidaoshi">
                    <div class="order-table">
                      <table>
                        <tr>
                          <th colspan="2">{{itemPa.name}}</th>
                        </tr>
                        <tr v-for="(item,index) in itemPa.list">
                          <td class="tdLeft" :class="'yidaoshi'+item.oddsId">{{item.oddsName}}</td>
                          <td class="tdRight selectTd" :class="'yidaoshi'+item.oddsId" @click="selectTd(item,'yidaoshi')">
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

            <template v-if="showOdds == '1~10名'">
              <div>
                <div class="qiu15_body yidaoshiming">
                  <div class="nball" v-for="(item_yishi,index_yishi) in oddsList">
                    <div class="order-table">
                      <table>
                        <tr><th colspan="2">{{item_yishi.name}}</th></tr>
                        <tr v-for="(item,index) in item_yishi.list">
                            <td class="oddsNtd tdLeft" :class="'item_yishi'+item.oddsId"><div class="ball-fang" :class="'ball-fang'+item.oddsName">{{item.oddsName}}</div></td> 
                            <td class="oddsUltd selectTd" :class="'item_yishi'+item.oddsId" @click="selectTd(item,'item_yishi')">
                              <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'item_yishi'+item.oddsId" @click="orderTd(item,'item_yishi','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'item_yishi'+item.oddsId" @click="orderTd(item,'item_yishi','add')"></i>
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


            <template v-if="showOdds == '冠亚组合'">
              <div class="order-table">
                      <table>
                        <tr>
                          <th colspan="8">{{guanyaZonghe.name}}</th>
                        </tr>
                          <tr>
                            <template v-for="(item,index) in guanyaZonghe.list.slice(0,4)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'guanyaZonghe'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight selectTd" :class="'guanyaZonghe'+item.oddsId" @click="selectTd(item,'guanyaZonghe')">
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
                              <td class="tdLeft ordersTdOver" width="8%" :class="'guanyaZonghe'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight selectTd" :class="'guanyaZonghe'+item.oddsId" @click="selectTd(item,'guanyaZonghe')">
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
                              <td class="tdLeft ordersTdOver" width="8%" :class="'guanyaZonghe'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight selectTd" :class="'guanyaZonghe'+item.oddsId" @click="selectTd(item,'guanyaZonghe')">
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
                              <td class="tdLeft ordersTdOver" width="8%" :class="'guanyaZonghe'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight selectTd" :class="'guanyaZonghe'+item.oddsId" @click="selectTd(item,'guanyaZonghe')">
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
                            <template v-for="(item,index) in guanyaZonghe.list.slice(16,17)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'guanyaZonghe'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight selectTd" :class="'guanyaZonghe'+item.oddsId" @click="selectTd(item,'guanyaZonghe')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(item,'guanyaZonghe','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'guanyaZonghe'+item.oddsId" @click="orderTd(item,'guanyaZonghe','add')"></i>
                                  </li>
                                </ul>
                              </td>
                            </template>
                            <td class="tdLeft ordersTdOver" colspan="6"></td>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in guanyaZonghe.list.slice(17)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'guanyaZonghe'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight selectTd" :class="'guanyaZonghe'+item.oddsId" @click="selectTd(item,'guanyaZonghe')">
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
                      </table>
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

export default {
  components: {
  },
  data () {
    return {
      curBocaiTypeId: 9057,
      curactiveIndex: '极速赛车',
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
      if(this.showOdds == '两面盘') {
        let qianhousanTemp = [];
        for(let m in dataList) {
          if(dataList[m].name == '冠、亚军和') {
            this.guanyajunhe = dataList[m];
          }
          if(['冠军','亚军','第三名','第四名','第五名','第六名','第七名','第八名','第九名','第十名'].findIndex((n) => n == dataList[m].name)>-1) {
            qianhousanTemp.push(dataList[m]);
          }
        }
        this.yidaoshi = qianhousanTemp;
      } else if(this.showOdds == '冠亚组合') {
        this.guanyaZonghe = this.oddsList[0];
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
