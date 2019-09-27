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
              <el-menu-item v-for="(item,index) in bocaiCategoryList" :key="index" :index="item.name" @click="bocaiCategoryId(item)">{{item.name}}</el-menu-item>
            </el-menu>
          </div>
          
    </div>

    <div class="portlet">
      <div class="bet_box">
          <div class="orders oodsBodyDiv">

            <template v-if="showOdds == 'PC蛋蛋'">

                <div>
                  <div class="order-table">
                      <table>
                        <tr>
                          <th colspan="8">{{huiheData.name}}</th>
                        </tr>
                          <tr>
                            <template v-for="(item,index) in huiheData.list" v-if="index*1 < 4">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'huiheData'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight selectTd" :class="'huiheData'+item.oddsId" @click="selectTd(item,'huiheData')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'huiheData'+item.oddsId" @click="orderTd(item,'huiheData','jian')"></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'huiheData'+item.oddsId" @click="orderTd(item,'huiheData','add')"></i>
                                  </li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in huiheData.list" v-if="index*1 > 3">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'huiheData'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight selectTd" :class="'huiheData'+item.oddsId" @click="selectTd(item,'huiheData')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'huiheData'+item.oddsId" @click="orderTd(item,'huiheData','jian')"></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'huiheData'+item.oddsId" @click="orderTd(item,'huiheData','add')"></i>
                                  </li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                      </table>

                      <table>
                        <tr>
                          <th colspan="8">{{boseData.name}}</th>
                        </tr>
                          <tr>
                            <template v-for="(item,index) in boseData.list">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'boseData'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight selectTd" :class="'boseData'+item.oddsId" @click="selectTd(item,'boseData')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'boseData'+item.oddsId" @click="orderTd(item,'boseData','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'boseData'+item.oddsId" @click="orderTd(item,'boseData','add')"></i>
                                  </li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                      </table>

                      <table>
                        <tr>
                          <th colspan="8">{{temaData.name}}</th>
                        </tr>
                          <tr>
                            <template v-for="(item,index) in temaData.list.slice(0,4)" >
                              <td class="tdLeft ordersTdOver" width="8%" :class="'temaData'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight selectTd" :class="'temaData'+item.oddsId" @click="selectTd(item,'temaData')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'temaData'+item.oddsId" @click="orderTd(item,'temaData','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'temaData'+item.oddsId" @click="orderTd(item,'temaData','add')"></i>
                                  </li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in temaData.list.slice(4,8)" >
                              <td class="tdLeft ordersTdOver" width="8%" :class="'temaData'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight selectTd" :class="'temaData'+item.oddsId" @click="selectTd(item,'temaData')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'temaData'+item.oddsId" @click="orderTd(item,'temaData','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'temaData'+item.oddsId" @click="orderTd(item,'temaData','add')"></i>
                                  </li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in temaData.list.slice(8,12)" >
                              <td class="tdLeft ordersTdOver" width="8%" :class="'temaData'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight selectTd" :class="'temaData'+item.oddsId" @click="selectTd(item,'temaData')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'temaData'+item.oddsId" @click="orderTd(item,'temaData','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'temaData'+item.oddsId" @click="orderTd(item,'temaData','add')"></i>
                                  </li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in temaData.list.slice(12,16)" >
                              <td class="tdLeft ordersTdOver" width="8%" :class="'temaData'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight selectTd" :class="'temaData'+item.oddsId" @click="selectTd(item,'temaData')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'temaData'+item.oddsId" @click="orderTd(item,'temaData','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'temaData'+item.oddsId" @click="orderTd(item,'temaData','add')"></i>
                                  </li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in temaData.list.slice(16,20)" >
                              <td class="tdLeft ordersTdOver" width="8%" :class="'temaData'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight selectTd" :class="'temaData'+item.oddsId" @click="selectTd(item,'temaData')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'temaData'+item.oddsId" @click="orderTd(item,'temaData','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'temaData'+item.oddsId" @click="orderTd(item,'temaData','add')"></i>
                                  </li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in temaData.list.slice(20,24)" >
                              <td class="tdLeft ordersTdOver" width="8%" :class="'temaData'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight selectTd" :class="'temaData'+item.oddsId" @click="selectTd(item,'temaData')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'temaData'+item.oddsId" @click="orderTd(item,'temaData','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'temaData'+item.oddsId" @click="orderTd(item,'temaData','add')"></i>
                                  </li>
                                </ul>
                              </td>
                            </template>
                          </tr>
                          <tr>
                            <template v-for="(item,index) in temaData.list.slice(24,28)" >
                              <td class="tdLeft ordersTdOver" width="8%" :class="'temaData'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight selectTd" :class="'temaData'+item.oddsId" @click="selectTd(item,'temaData')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'temaData'+item.oddsId" @click="orderTd(item,'temaData','jian')" ></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'temaData'+item.oddsId" @click="orderTd(item,'temaData','add')"></i>
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
import MenuBtn from '@/components/apps/youxiguanli/components/menuBtn';

export default {
  components: {
      MenuBtn
  },
  data () {
    return {
      curBocaiTypeId: 8223,
      curactiveIndex: 'PC蛋蛋',
      bocaiCategoryList: [],
      oddsList: [],
      activeIndex: '',
      showOdds: '',
      bocaiCategory: {},

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

    //this.getadminBocaiInfo();

  },
  mounted(){
  },
  methods: {
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

                this.bocaiCategoryId(this.bocaiCategory);

              }
            })
      });



    },
    async getoddsCategory() {

      this.qingkong();

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

      if(opbet == 'add') {

        item.odds = parseFloat(item.odds);

        this.betfudu = parseFloat(this.betfudu);

        //console.log('this.betfudu',this.betfudu);

        //console.log('item.odds',item.odds);

        item.odds += this.betfudu;

        item.odds = (item.odds).toFixed(3)*1;

        //console.log('item.odds2222',item.odds);

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
      //console.log('item',item);


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

      //console.log('dataList',dataList);

      if(this.showOdds == 'PC蛋蛋') {

        for(let m in dataList) {
          if(dataList[m].name == '混合') {
            this.huiheData = dataList[m];
          }
          if(dataList[m].name == '波色') {
            this.boseData = dataList[m];
          }
          if(dataList[m].name == '特码') {
            this.temaData = dataList[m];
          }
        }
      }

    }

  }
}

</script>

<style scoped>
</style>
