<template>
  <div id="youxishezhi" class="content-main tuishuiclass">
    
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>帐号管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'gudong' }">股东</el-breadcrumb-item>
        <el-breadcrumb-item>退水设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="nav">
      <span>游戏类型:
        <el-select v-model="bocaiId" @change="childUser()" placeholder="请选择" size="mini">
          <el-option
            v-for="item in bocaiMenu"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>

      </span>

    </div>

    <div class="portlet portlet-add">
      <div class="tab">
        <table class="tuishuitable">
          <thead>
            <tr>
              <th>勾选</th> 
              <th>重庆时时彩</th> 
              <th>退水设定 A</th> 
              <th>退水设定 B</th> 
              <th>退水设定 C</th> 
              <th>退水设定 D</th> 
              <th>单注限额</th> 
              <th>单期限额</th>
            </tr>
          </thead> 
          <tbody>
            <tr v-for="(item,index) in deWaterList">
              <td class="ifSelectTd"><i class="iconfont po icon-30xuanzhongyuanxingfill bule" @click="checkedOdd(item)" :class="'iconfont'+ item.dewaterId"></i></td> 
              <!-- <td><i class="iconfont po" @click="checkedOdd(item)" :class="'iconfont'+ item.checked ? 'icon-30xuanzhongyuanxingfill bule' : 'icon-30xuanzhongyuanxing'"></i></td>  -->
              <td>{{item.deWaterName}}</td> 
              <td><input type="text"  v-model="item.handicapaDewaterRate"></td> 
              <td><input type="text"  v-model="item.handicapbDewaterRate"></td> 
              <td><input type="text"  v-model="item.handicapcDewaterRate"></td> 
              <td><input type="text"  v-model="item.handicapdDewaterRate"></td> 
              <td><input type="text"  v-model="item.danzhuXiane"></td> 
              <td><input type="text"  v-model="item.danqiXiane"></td>
            </tr>
          </tbody>
        </table> 
        <div class="func">
          <div class="tabs">
            <fieldset>
              <legend>勾选</legend> 
              <button class="tabBtn btn-blue" @click="selectAll()">全选</button> 
              <button class="tabBtn btn-red" @click="cancelAll()">取消</button>
            </fieldset> 
            <fieldset>
              <legend>套用上层</legend> 
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全套用</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="checkedPan1" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="item in panOptions1" :label="item" :key="item">{{item}}</el-checkbox>
              </el-checkbox-group>
              <br> 
              <button class="tabBtn btn-blue" @click="taoyongshangchen()">套用上层</button>
            </fieldset> 
            <fieldset>
              <legend>退水</legend> 
              <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" @change="handleCheckAllChange2">全套用</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="checkedPan2" @change="handleCheckedCitiesChange2">
                <el-checkbox v-for="item in panOptions2" :label="item" :key="item">{{item}}</el-checkbox>
              </el-checkbox-group>

              <br> 
              <button class="tabBtn btn-blue" @click="tiaogao()">调高</button> 
              <button class="tabBtn btn-blue" @click="tiaodi()">调低</button> 
              <button class="tabBtn btn-blue" @click="zuida()">最大</button> 
              <button class="tabBtn btn-blue" @click="qinglin()">归零</button>
            </fieldset> 
            <fieldset>
              <legend>金额</legend> 
              <input type="text" class="inpText" v-model="jine">
              <br> 
              <button class="tabBtn btn-blue" @click="danzhujine()">单注限额</button> 
              <button class="tabBtn btn-blue" @click="danqijine()">单期限额</button>
            </fieldset> 
            <fieldset>
              <legend>下层上修</legend> 
              <label><input type="radio" v-model="xiashangxiu" value="1">保持不变</label> 
              <label><input type="radio" v-model="xiashangxiu" value="2">等量修改</label> 
              <label><input type="radio" v-model="xiashangxiu" value="3">套用本层</label>

            </fieldset> 
            <div>
              <button class="tabBtn btn btn-blue" @click="baocun()">保存</button> 
              <button class="tabBtn btn btn-red" @click="quxiao()">取消</button>
            </div>
          </div>
        </div>
      </div>
      <div class="c"></div>
    </div>

  </div>
</template>



<script>
import { mapGetters } from 'vuex';

const taoOptions = ['A', 'B', 'C', 'D', '单注限额', '单期限额'];
const taoOptions2 = ['A', 'B', 'C', 'D'];

export default {
  components: {
  },
  data () {
    return {
      isSubTuishui: this.$route.name == 'tuishuisheding' ? true : false,
      childUserList: [],
      childUserInfo: {},
      bocaiId: 1,
      userId: '',
      currentPage: 1,
      shuaixuanNum: '1',
      gudongAccout: '',

      userData: {},
      pDeWaterList: [],
      deWaterList: [],
      selectList: [],
      xiashangxiu: 1,

      panOptions1: taoOptions,
      checkedPan1: [],
      checkAll: false,
      isIndeterminate: true,

      panOptions2: taoOptions2,
      checkedPan2: [],
      checkAll2: false,
      isIndeterminate2: true,

      jine: '',
      baocunuserid: ''

      

    }
  },
  computed: {
    ...mapGetters({
      ruleId:'getruleId',
      userInfo: 'getuserInfo',
      upUserInfo: 'getupUserInfo',
      bocaiMenu: 'getbocaiMenu'
    })
  },
  created() {

    this.userId = this.isSubTuishui ? this.upUserInfo.id : '';

    this.baocunuserid = this.isSubTuishui ? this.upUserInfo.id : this.userInfo.id;

    this.childUser();

  },
  mounted(){
  },
  methods: {
    async baocun() {
      let that = this;

      let isdayu = false;

      for(let n in this.selectList) {
        for(let x in this.pDeWaterList) {
          if(this.selectList[n].dewaterId == this.pDeWaterList[x].dewaterId) {
              if(+this.selectList[n].handicapaDewaterRate > +this.pDeWaterList[x].handicapaDewaterRate){
                isdayu = true;
              }
              if(+this.selectList[n].handicapbDewaterRate > +this.pDeWaterList[x].handicapbDewaterRate){
                isdayu = true;
              }
              if(+this.selectList[n].handicapcDewaterRate > +this.pDeWaterList[x].handicapcDewaterRate){
                isdayu = true;
              }
              if(+this.selectList[n].handicapdDewaterRate > +this.pDeWaterList[x].handicapdDewaterRate){
                isdayu = true;
              }
              if(+this.selectList[n].danzhuXiane > +this.pDeWaterList[x].danzhuXiane){
                isdayu = true;
              }
              if(+this.selectList[n].danqiXiane > +this.pDeWaterList[x].danqiXiane){
                isdayu = true;
              }
          }
        }
      }

      if(!isdayu) {

        let arr = [];

        for(let n in this.selectList) {
          let obj = {};

          obj.handicapaDewaterRate = this.selectList[n].handicapaDewaterRate;
          obj.handicapbDewaterRate = this.selectList[n].handicapbDewaterRate;
          obj.handicapcDewaterRate = this.selectList[n].handicapcDewaterRate;
          obj.handicapdDewaterRate = this.selectList[n].handicapdDewaterRate;
          obj.danzhuXiane = this.selectList[n].danzhuXiane;
          obj.danqiXiane = this.selectList[n].danqiXiane;
          obj.userId = this.selectList[n].userId;
          obj.dewaterId = this.selectList[n].dewaterId;

          arr.push(obj);
        }

        let objdata = {
          userId: this.baocunuserid,
          bocaiTypeId: this.bocaiId,
          childSet: this.xiashangxiu, 
          list: arr
        }


        NProgress.start();
            await that.$post(`${window.url}/admin/bocai/dewaterSub`,objdata).then((res) => {
              that.$handelResponse(res, (result) => {
                NProgress.done();
                if(result.code===200){

                  that.childUser();

                }
              })
        });
      } else {
        this.$alertMessage('提交的退水数据不能大于父级退水数据!', '温馨提示');
      }

      
    },
    quxiao() {
      this.childUser();
    },
    danqijine() {
      for(let n in this.selectList) {
        this.selectList[n].danqiXiane = this.jine;
      }
    },
    danzhujine() {
      for(let n in this.selectList) {
        this.selectList[n].danzhuXiane = this.jine;
      }
    },
    qinglin() {
      for(let n in this.selectList) {
        for(let y in this.checkedPan2) {
              if(this.checkedPan2[y] == 'A') {
                this.selectList[n].handicapaDewaterRate = 0;
              }
              if(this.checkedPan2[y] == 'B') {
                this.selectList[n].handicapbDewaterRate = 0;
              }
              if(this.checkedPan2[y] == 'C') {
                this.selectList[n].handicapcDewaterRate = 0;
              }
              if(this.checkedPan2[y] == 'D') {
                this.selectList[n].handicapdDewaterRate = 0;
              }
            }
      }
    },
    zuida() {
      for(let n in this.selectList) {
        for(let x in this.pDeWaterList) {
          if(this.selectList[n].dewaterId == this.pDeWaterList[x].dewaterId) {
            for(let y in this.checkedPan2) {
              if(this.checkedPan2[y] == 'A') {
                this.selectList[n].handicapaDewaterRate = this.pDeWaterList[x].handicapaDewaterRate;
              }
              if(this.checkedPan2[y] == 'B') {
                this.selectList[n].handicapbDewaterRate = this.pDeWaterList[x].handicapbDewaterRate;
              }
              if(this.checkedPan2[y] == 'C') {
                this.selectList[n].handicapcDewaterRate = this.pDeWaterList[x].handicapcDewaterRate;
              }
              if(this.checkedPan2[y] == 'D') {
                this.selectList[n].handicapdDewaterRate = this.pDeWaterList[x].handicapdDewaterRate;
              }
            }
          }
        }
      }
    },
    tiaodi() {
      for(let n in this.selectList) {
        for(let y in this.checkedPan2) {
              if(this.checkedPan2[y] == 'A') {
                this.selectList[n].handicapaDewaterRate = parseFloat(this.selectList[n].handicapaDewaterRate);
                this.selectList[n].handicapaDewaterRate = +this.selectList[n].handicapaDewaterRate - 0.01;
                this.selectList[n].handicapaDewaterRate = (this.selectList[n].handicapaDewaterRate).toFixed(2)*1;
              }
              if(this.checkedPan2[y] == 'B') {
                this.selectList[n].handicapbDewaterRate = parseFloat(this.selectList[n].handicapbDewaterRate);
                this.selectList[n].handicapbDewaterRate = +this.selectList[n].handicapbDewaterRate - 0.01;
                this.selectList[n].handicapbDewaterRate = (this.selectList[n].handicapbDewaterRate).toFixed(2)*1;
              }
              if(this.checkedPan2[y] == 'C') {
                this.selectList[n].handicapcDewaterRate = parseFloat(this.selectList[n].handicapcDewaterRate);
                this.selectList[n].handicapcDewaterRate = +this.selectList[n].handicapcDewaterRate - 0.01;
                this.selectList[n].handicapcDewaterRate = (this.selectList[n].handicapcDewaterRate).toFixed(2)*1;
              }
              if(this.checkedPan2[y] == 'D') {
                this.selectList[n].handicapdDewaterRate = parseFloat(this.selectList[n].handicapdDewaterRate);
                this.selectList[n].handicapdDewaterRate = +this.selectList[n].handicapdDewaterRate - 0.01;
                this.selectList[n].handicapdDewaterRate = (this.selectList[n].handicapdDewaterRate).toFixed(2)*1;
              }

        }
      }
    },
    tiaogao() {
      for(let n in this.selectList) {
        for(let y in this.checkedPan2) {
              if(this.checkedPan2[y] == 'A') {
                this.selectList[n].handicapaDewaterRate = parseFloat(this.selectList[n].handicapaDewaterRate);
                this.selectList[n].handicapaDewaterRate = +this.selectList[n].handicapaDewaterRate + 0.01;
                this.selectList[n].handicapaDewaterRate = (this.selectList[n].handicapaDewaterRate).toFixed(2)*1;
              }
              if(this.checkedPan2[y] == 'B') {
                this.selectList[n].handicapbDewaterRate = parseFloat(this.selectList[n].handicapbDewaterRate);
                this.selectList[n].handicapbDewaterRate = +this.selectList[n].handicapbDewaterRate + 0.01;
                this.selectList[n].handicapbDewaterRate = (this.selectList[n].handicapbDewaterRate).toFixed(2)*1;
              }
              if(this.checkedPan2[y] == 'C') {
                this.selectList[n].handicapcDewaterRate = parseFloat(this.selectList[n].handicapcDewaterRate);
                this.selectList[n].handicapcDewaterRate = +this.selectList[n].handicapcDewaterRate + 0.01;
                this.selectList[n].handicapcDewaterRate = (this.selectList[n].handicapcDewaterRate).toFixed(2)*1;
              }
              if(this.checkedPan2[y] == 'D') {
                this.selectList[n].handicapdDewaterRate = parseFloat(this.selectList[n].handicapdDewaterRate);
                this.selectList[n].handicapdDewaterRate = +this.selectList[n].handicapdDewaterRate + 0.01;
                this.selectList[n].handicapdDewaterRate = (this.selectList[n].handicapdDewaterRate).toFixed(2)*1;
              }

        }
      }
    },
    handleCheckedCitiesChange2(value) {
        let checkedCount = value.length;
        this.checkAll2 = checkedCount === this.panOptions2.length;
        this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.panOptions2.length;
      },
    handleCheckAllChange2(val) {
        this.checkedPan2 = val ? taoOptions2 : [];
        this.isIndeterminate2 = false;
      },
    taoyongshangchen() {

      console.log('checkedPan1',this.checkedPan1);

      for(let n in this.selectList) {
        for(let x in this.pDeWaterList) {
          if(this.selectList[n].dewaterId == this.pDeWaterList[x].dewaterId) {
            for(let y in this.checkedPan1) {
              if(this.checkedPan1[y] == 'A') {
                this.selectList[n].handicapaDewaterRate = this.pDeWaterList[x].handicapaDewaterRate;
              }
              if(this.checkedPan1[y] == 'B') {
                this.selectList[n].handicapbDewaterRate = this.pDeWaterList[x].handicapbDewaterRate;
              }
              if(this.checkedPan1[y] == 'C') {
                this.selectList[n].handicapcDewaterRate = this.pDeWaterList[x].handicapcDewaterRate;
              }
              if(this.checkedPan1[y] == 'D') {
                this.selectList[n].handicapdDewaterRate = this.pDeWaterList[x].handicapdDewaterRate;
              }
              if(this.checkedPan1[y] == '单注限额') {
                this.selectList[n].danzhuXiane = this.pDeWaterList[x].danzhuXiane;
              }
              if(this.checkedPan1[y] == '单期限额') {
                this.selectList[n].danqiXiane = this.pDeWaterList[x].danqiXiane;
              }
            }
          }
        }
      }

    },
    handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.panOptions1.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.panOptions1.length;
      },
    handleCheckAllChange(val) {
        this.checkedPan1 = val ? taoOptions : [];
        this.isIndeterminate = false;
      },
    cancelAll() {
      $('.portlet .tuishuitable .ifSelectTd i').addClass('icon-30xuanzhongyuanxing');
      $('.portlet .tuishuitable .ifSelectTd i').removeClass('icon-30xuanzhongyuanxingfill bule');
        this.selectList = [];
    },
    selectAll() {
      $('.portlet .tuishuitable .ifSelectTd i').removeClass('icon-30xuanzhongyuanxing');
      $('.portlet .tuishuitable .ifSelectTd i').addClass('icon-30xuanzhongyuanxingfill bule');

      for(let n in this.deWaterList) {
        this.selectList.push(this.deWaterList[n]);
      }
    },
    checkedOdd(item){
      console.log('item',item);

      if($('.iconfont'+item.dewaterId).hasClass('icon-30xuanzhongyuanxing')){

              $('.iconfont'+item.dewaterId).removeClass('icon-30xuanzhongyuanxing');
              $('.iconfont'+item.dewaterId).addClass('icon-30xuanzhongyuanxingfill bule');

              this.selectList.push(item);

                // let ifHas = false;
                // for(let n in this.selectList) {
                //   if(this.selectList[n].dewaterId == item.dewaterId) {
                //     ifHas = true;
                //     let obj = {
                //       bocaiCategory2Id: oddsObj.id,//8225,//投注博彩分类2ID
                //       bocaiCategory2Name: oddsObj.name,//"混合",//投注博彩分类2名称
                //       bocaiOddId: item.oddsId,//5543,//投注博彩赔率ID
                //       bocaiOddName: item.oddsName,//"大",//投注博彩赔率名称
                //       bocaiValue:"",//投注内容,六合彩连肖/连尾
                //       normalMoney: item.normalMoney,//10000,//一般模式下，选择的金额
                //       orderNormal: this.normalPay,   //是快捷，还是一般投注
                //       bocaiOdds: item.odds,//1.90//赔率
                //       dewaterId: item.dewaterId
                //     };

                //     this.orderDataList[n] = obj;
                //   }
                // }

                // if(!ifHas) {
                //   let obj = {
                //     bocaiCategory2Id: oddsObj.id,//8225,//投注博彩分类2ID
                //     bocaiCategory2Name: oddsObj.name,//"混合",//投注博彩分类2名称
                //     bocaiOddId: item.oddsId,//5543,//投注博彩赔率ID
                //     bocaiOddName: item.oddsName,//"大",//投注博彩赔率名称
                //     bocaiValue:"",//投注内容,六合彩连肖/连尾
                //     normalMoney: item.normalMoney,//10000,//一般模式下，选择的金额
                //     orderNormal: this.normalPay,   //是快捷，还是一般投注
                //     bocaiOdds: item.odds,//1.90//赔率
                //     dewaterId: item.dewaterId
                //   };

                //   this.orderDataList.push(obj);
                // }
              

          } else {

            $('.iconfont'+item.dewaterId).addClass('icon-30xuanzhongyuanxing');
            $('.iconfont'+item.dewaterId).removeClass('icon-30xuanzhongyuanxingfill bule');

              _.remove(this.selectList, function(n) {
                return n.dewaterId == item.dewaterId;
              });
            
          }

    },
    async childUser() {

      let res = await this.$get(`${window.url}/admin/bocai/getDewater?userId=`+this.userId+`&bocaiTypeId=`+this.bocaiId);

      if(res.code===200){

        this.userData = res.data.userData;
        this.pDeWaterList = res.data.pDeWaterList;
        this.deWaterList = res.data.deWaterList;

        this.selectList = this.deWaterList;

        console.log('this.deWaterList',this.deWaterList);

        //this.childUserInfo = res.page;

    //     "data": {
    //     "userData": {//当前用户的盘口，退水数据要根据用户是否开通了这个盘口进行显示。
    //         "handicapD": 1,//盘口D，0为否，1为是
    //         "handicapC": 1,//盘口C，0为否，1为是
    //         "handicapB": 1,//盘口B，0为否，1为是
    //         "handicapA": 1 //盘口A，0为否，1为是
    //     },
    //     "pDeWaterList": [//父用户退水,当前用户设置不能超过父
    //         {
    //             "id": "40",
    //             "userId": "1",//用户ID
    //             "handicapaDewaterRate": 20,//盘口A退水
    //             "handicapbDewaterRate": 20,//盘口B退水
    //             "handicapcDewaterRate": 20,//盘口C退水
    //             "handicapdDewaterRate": 20,//盘口D退水
    //             "danzhuXiane": 20,//单注金额
    //             "danqiXiane": 20,//单期金额
    //             "createDate": 1528973935000,
    //             "updateDate": 1528986130000,
    //             "dewaterId": "1",//退水ID
    //             "deWaterName": "单码",//退水名称
    //             "bocaiTypeId": null,
    //             "userIds": null
    //         },
    //         }
    //     ]
    //     "deWaterList": [//当前用户退水设置
    //         {
    //             "id": "40",
    //             "userId": "1",//用户ID
    //             "handicapaDewaterRate": 20,//盘口A退水
    //             "handicapbDewaterRate": 20,//盘口B退水
    //             "handicapcDewaterRate": 20,//盘口C退水
    //             "handicapdDewaterRate": 20,//盘口D退水
    //             "danzhuXiane": 20,//单注金额
    //             "danqiXiane": 20,//单期金额
    //             "createDate": 1528973935000,
    //             "updateDate": 1528986130000,
    //             "dewaterId": "1",//退水ID
    //             "deWaterName": "单码",//退水名称
    //             "bocaiTypeId": null,
    //             "userIds": null
    //         },
    //         {
    //             "id": "60",
    //             "userId": "1",
    //             "handicapaDewaterRate": 20,
    //             "handicapbDewaterRate": 20,
    //             "handicapcDewaterRate": 20,
    //             "handicapdDewaterRate": 20,
    //             "danzhuXiane": 20,
    //             "danqiXiane": 20,
    //             "createDate": 1528973935000,
    //             "updateDate": 1528986130000,
    //             "dewaterId": "21",
    //             "deWaterName": "组选六",
    //             "bocaiTypeId": null,
    //             "userIds": null
    //         }
    //     ]
    // }


    
      }
    }

  }
}

</script>

<style scoped>
</style>
