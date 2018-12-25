<template>
  <div id="youxishezhi" class="content-main duboBodyClass shaizibocai">
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
          <button class="tabBtn btn btn-blue mgr10" @click="$router.push({name:'jiangxi11xuan5Base'})">赔率设置</button> 
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
                              <td class="tdRight selectTd" :class="'sanjundaxiao'+item.oddsId" @click="selectTd(item,'sanjundaxiao')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'sanjundaxiao'+item.oddsId" @click="orderTd(item,'sanjundaxiao','jian')"></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'sanjundaxiao'+item.oddsId" @click="orderTd(item,'sanjundaxiao','add')"></i>
                                  </li>
                                </ul>
                              </td>
                      </template>
                              <td class="tdLeft ordersTdOver" width="8%" :class="'sanjundaxiao'+sanjundaxiao.list[6].oddsId">{{sanjundaxiao.list[6].oddsName}}
                              </td>
                              <td class="tdRight selectTd" :class="'sanjundaxiao'+sanjundaxiao.list[6].oddsId" @click="selectTd(item,'sanjundaxiao')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'sanjundaxiao'+sanjundaxiao.list[6].oddsId" @click="orderTd(sanjundaxiao.list[6],'sanjundaxiao','jian')"></i>
                                    <input class="odds-font" type="text" v-model="sanjundaxiao.list[6].odds">
                                    <i class="iconfont icon-jia1" :class="'sanjundaxiao'+sanjundaxiao.list[6].oddsId" @click="orderTd(sanjundaxiao.list[6],'sanjundaxiao','add')"></i>
                                  </li>
                                </ul>
                              </td>
                  </tr>
                  <tr>
                      <template v-for="(item,index) in sanjundaxiao.list.slice(3,6)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'sanjundaxiao'+item.oddsId">
                                <i :class="'jsk3-icon-'+item.oddsName"></i>
                              </td>
                              <td class="tdRight selectTd" :class="'sanjundaxiao'+item.oddsId" @click="selectTd(item,'sanjundaxiao')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'sanjundaxiao'+item.oddsId" @click="orderTd(item,'sanjundaxiao','jian')"></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'sanjundaxiao'+item.oddsId" @click="orderTd(item,'sanjundaxiao','add')"></i>
                                  </li>
                                </ul>
                              </td>
                      </template>
                              <td class="tdLeft ordersTdOver" width="8%" :class="'sanjundaxiao'+sanjundaxiao.list[7].oddsId">{{sanjundaxiao.list[7].oddsName}}
                              </td>
                              <td class="tdRight selectTd" :class="'sanjundaxiao'+sanjundaxiao.list[7].oddsId" @click="selectTd(item,'sanjundaxiao')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'sanjundaxiao'+sanjundaxiao.list[7].oddsId" @click="orderTd(sanjundaxiao.list[7],'sanjundaxiao','jian')"></i>
                                    <input class="odds-font" type="text" v-model="sanjundaxiao.list[7].odds">
                                    <i class="iconfont icon-jia1" :class="'sanjundaxiao'+sanjundaxiao.list[7].oddsId" @click="orderTd(sanjundaxiao.list[7],'sanjundaxiao','add')"></i>
                                  </li>
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
                              <td class="tdRight w selectTd" :class="'weishaiquanshai'+item.oddsId" @click="selectTd(item,'weishaiquanshai')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'weishaiquanshai'+item.oddsId" @click="orderTd(item,'weishaiquanshai','jian')"></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'weishaiquanshai'+item.oddsId" @click="orderTd(item,'weishaiquanshai','add')"></i>
                                  </li>
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
                              <td class="tdRight w selectTd" :class="'weishaiquanshai'+item.oddsId" @click="selectTd(item,'weishaiquanshai')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'weishaiquanshai'+item.oddsId" @click="orderTd(item,'weishaiquanshai','jian')"></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'weishaiquanshai'+item.oddsId" @click="orderTd(item,'weishaiquanshai','add')"></i>
                                  </li>
                                </ul>
                              </td>
                      </template>
                  </tr>
                  <tr>
                      <td class="tdLeft ordersTdOver sanshai" :class="'weishaiquanshai'+weishaiquanshai.list[6].oddsId">{{weishaiquanshai.list[6].oddsName}}
                              </td>
                              <td class="tdRight selectTd" :class="'weishaiquanshai'+weishaiquanshai.list[6].oddsId" @click="selectTd(item,'weishaiquanshai')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'weishaiquanshai'+weishaiquanshai.list[6].oddsId" @click="orderTd(weishaiquanshai.list[6],'weishaiquanshai','jian')"></i>
                                    <input class="odds-font" type="text" v-model="weishaiquanshai.list[6].odds">
                                    <i class="iconfont icon-jia1" :class="'weishaiquanshai'+weishaiquanshai.list[6].oddsId" @click="orderTd(weishaiquanshai.list[6],'weishaiquanshai','add')"></i>
                                  </li>
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
                              <td class="tdRight selectTd" :class="'dianshu'+item.oddsId" @click="selectTd(item,'dianshu')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'dianshu'+item.oddsId" @click="orderTd(item,'dianshu','jian')"></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'dianshu'+item.oddsId" @click="orderTd(item,'dianshu','add')"></i>
                                  </li>
                                </ul>
                              </td>
                            </template>
                        </tr>
                        <tr>
                            <template v-for="(item,index) in dianshu.list.slice(4,8)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'dianshu'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight selectTd" :class="'dianshu'+item.oddsId" @click="selectTd(item,'dianshu')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'dianshu'+item.oddsId" @click="orderTd(item,'dianshu','jian')"></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'dianshu'+item.oddsId" @click="orderTd(item,'dianshu','add')"></i>
                                  </li>
                                </ul>
                              </td>
                            </template>
                        </tr>
                        <tr>
                            <template v-for="(item,index) in dianshu.list.slice(8,12)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'dianshu'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight selectTd" :class="'dianshu'+item.oddsId" @click="selectTd(item,'dianshu')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'dianshu'+item.oddsId" @click="orderTd(item,'dianshu','jian')"></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'dianshu'+item.oddsId" @click="orderTd(item,'dianshu','add')"></i>
                                  </li>
                                </ul>
                              </td>
                            </template>
                        </tr>
                        <tr>
                            <template v-for="(item,index) in dianshu.list.slice(12,14)">
                              <td class="tdLeft ordersTdOver" width="8%" :class="'dianshu'+item.oddsId">{{item.oddsName}}</td>
                              <td class="tdRight selectTd" :class="'dianshu'+item.oddsId" @click="selectTd(item,'dianshu')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'dianshu'+item.oddsId" @click="orderTd(item,'dianshu','jian')"></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'dianshu'+item.oddsId" @click="orderTd(item,'dianshu','add')"></i>
                                  </li>
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
                              <td class="tdRight selectTd" :class="'changpai'+item.oddsId" @click="selectTd(item,'changpai')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'changpai'+item.oddsId" @click="orderTd(item,'changpai','jian')"></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'changpai'+item.oddsId" @click="orderTd(item,'changpai','add')"></i>
                                  </li>
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
                              <td class="tdRight selectTd" :class="'changpai'+item.oddsId" @click="selectTd(item,'changpai')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'changpai'+item.oddsId" @click="orderTd(item,'changpai','jian')"></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'changpai'+item.oddsId" @click="orderTd(item,'changpai','add')"></i>
                                  </li>
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
                              <td class="tdRight selectTd" :class="'changpai'+item.oddsId" @click="selectTd(item,'changpai')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'changpai'+item.oddsId" @click="orderTd(item,'changpai','jian')"></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'changpai'+item.oddsId" @click="orderTd(item,'changpai','add')"></i>
                                  </li>
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
                              <td class="tdRight selectTd" :class="'changpai'+item.oddsId" @click="selectTd(item,'changpai')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'changpai'+item.oddsId" @click="orderTd(item,'changpai','jian')"></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'changpai'+item.oddsId" @click="orderTd(item,'changpai','add')"></i>
                                  </li>
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
                              <td class="tdRight selectTd" :class="'changpai'+item.oddsId" @click="selectTd(item,'changpai')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'changpai'+item.oddsId" @click="orderTd(item,'changpai','jian')"></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'changpai'+item.oddsId" @click="orderTd(item,'changpai','add')"></i>
                                  </li>
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
                              <td class="tdRight selectTd" :class="'duanpai'+item.oddsId" @click="selectTd(item,'duanpai')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'duanpai'+item.oddsId" @click="orderTd(item,'duanpai','jian')"></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'duanpai'+item.oddsId" @click="orderTd(item,'duanpai','add')"></i>
                                  </li>
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
                              <td class="tdRight selectTd" :class="'duanpai'+item.oddsId" @click="selectTd(item,'duanpai')">
                                <ul>
                                  <li>
                                    <i class="iconfont icon-jian" :class="'duanpai'+item.oddsId" @click="orderTd(item,'duanpai','jian')"></i>
                                    <input class="odds-font" type="text" v-model="item.odds">
                                    <i class="iconfont icon-jia1" :class="'duanpai'+item.oddsId" @click="orderTd(item,'duanpai','add')"></i>
                                  </li>
                                </ul>
                              </td>
                            </template>
                        </tr>
                </table>
              </div>
            </div>

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
      curBocaiTypeId: 8498,
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

          NProgress.start();
          await that.$get(`${window.url}/admin/bocai/odds?bocaiCategoryId=`+this.bocaiCategory.id+`&isBase=`+this.isBase+`&bocaiTypeId=`+this.curBocaiTypeId).then((res) => {
            that.$handelResponse(res, (result) => {
              NProgress.done();
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
