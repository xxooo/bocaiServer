<template>
  <div id="youxishezhi" class="content-main">
    <div class="nav">
      <span>游戏类型:
        <el-select v-model="bocaiId" @change="baseSet()" placeholder="请选择" size="mini">
          <el-option
            v-for="item in bocaiMenu"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        
        <div class="btn-ground">
          <button class="tabBtn btn btn-blue mgr10" @click="$router.push({name:'youxishezhi'})">基本设置</button> 
          <button class="tabBtn btn btn-blue mgr10" @click="$router.push({name:'pcdandanBase'})">赔率设置</button> 
          <button class="tabBtn btn btn-blue mgr10" @click="$router.push({name:'peilvchaset'})">赔率差设置</button> 
          <button class="tabBtn btn btn-blue mgr10" @click="$router.push({name:'peilvfudongset'})">赔率浮动设置</button>
        </div>
      </span>
    </div>

    <div class="portlet portlet-add">
        <div class="tab">
          <table>
            <thead>
            <!-- "isBhandicap": 1,//是否开通B盘,0:未开通,1:已开通
            "isChandicap": 1,//是否开通C盘,0:未开通,1:已开通
            "isDhandicap": 0//是否开通D盘,0:未开通,1:已开通 -->
              <tr>
                <th>{{curactiveIndex}}</th> 
                <th>B盘</th> 
                <th>C盘</th> 
                <th>D盘</th>
              </tr>
            </thead> 
            <tbody>
              <tr v-for="(item,index) in baseBocaiList">
                <td>{{item.dewaterName}}</td> 
                <td><input type="text" class="odds-font" v-model="item.bOddsBalance" v-on:input="inputFunc(item)"></td> 
                <td><input type="text" class="odds-font" v-model="item.cOddsBalance" v-on:input="inputFunc(item)"></td> 
                <td><input type="text" class="odds-font" v-model="item.dOddsBalance" v-on:input="inputFunc(item)"></td> 
              </tr>
            </tbody>
          </table> 
        <div>
          <div class="diffInput"><span>批量设置：</span> 
            <label><input type="radio" value="B" v-model="piliang"> B盘</label> 
            <label><input type="radio" value="C" v-model="piliang"> C盘</label> 
            <label><input type="radio" value="D" v-model="piliang"> D盘</label> 
            <input type="text" placeholder="请输入赔率差值" v-model="piliangValue"> 
            <button class="tabBtn btn-blue mgr10" @click="liliangset()">填入</button>
          </div> 
          <div class="inner">
            <button class="btn-submit" @click="saveoddCha()">保存</button> 
            <button class="btn-cancel" @click="baseSet()">取消</button>
          </div>
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
      bocaiId: 1,
      curactiveIndex: '',
      baseBocaiList: [],
      routerName: this.$route.name,
      piliang: 'B',
      piliangValue: '',
      selectList: []
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

    this.baseSet();

  },
  mounted(){
  },
  methods: {
    liliangset() {
      if(this.piliang == "B") {
        for(let n in this.baseBocaiList) {
          this.baseBocaiList[n].bOddsBalance = this.piliangValue;
          let obj = {
                      id: this.baseBocaiList[n].id,//8225,//投注博彩分类2ID
                      bOddsBalance: this.baseBocaiList[n].bOddsBalance,//"混合",//投注博彩分类2名称
                      cOddsBalance: this.baseBocaiList[n].cOddsBalance,//5543,//投注博彩赔率ID
                      dOddsBalance: this.baseBocaiList[n].dOddsBalance,//"大",//投注博彩赔率名称
                    };
          this.selectList.push(obj);
        }
      } else if(this.piliang == "C") {
        for(let n in this.baseBocaiList) {
          this.baseBocaiList[n].cOddsBalance = this.piliangValue;
          let obj = {
                      id: this.baseBocaiList[n].id,//8225,//投注博彩分类2ID
                      bOddsBalance: this.baseBocaiList[n].bOddsBalance,//"混合",//投注博彩分类2名称
                      cOddsBalance: this.baseBocaiList[n].cOddsBalance,//5543,//投注博彩赔率ID
                      dOddsBalance: this.baseBocaiList[n].dOddsBalance,//"大",//投注博彩赔率名称
                    };
          this.selectList.push(obj);
        }
      } else if(this.piliang == "D") {
        for(let n in this.baseBocaiList) {
          this.baseBocaiList[n].dOddsBalance = this.piliangValue;
          let obj = {
                      id: this.baseBocaiList[n].id,//8225,//投注博彩分类2ID
                      bOddsBalance: this.baseBocaiList[n].bOddsBalance,//"混合",//投注博彩分类2名称
                      cOddsBalance: this.baseBocaiList[n].cOddsBalance,//5543,//投注博彩赔率ID
                      dOddsBalance: this.baseBocaiList[n].dOddsBalance,//"大",//投注博彩赔率名称
                    };
          this.selectList.push(obj);
        }
      }
    },
    inputFunc(item) {
      console.log('item',item);

      let ifHas = false;
                for(let n in this.selectList) {
                  if(this.selectList[n].id == item.id) {
                    ifHas = true;
                    let obj = {
                      id: item.id,//8225,//投注博彩分类2ID
                      bOddsBalance: item.bOddsBalance,//"混合",//投注博彩分类2名称
                      cOddsBalance: item.cOddsBalance,//5543,//投注博彩赔率ID
                      dOddsBalance: item.dOddsBalance,//"大",//投注博彩赔率名称
                    };

                    this.selectList[n] = obj;
                  }
                }

                if(!ifHas) {
                  let obj = {
                    id: item.id,//8225,//投注博彩分类2ID
                      bOddsBalance: item.bOddsBalance,//"混合",//投注博彩分类2名称
                      cOddsBalance: item.cOddsBalance,//5543,//投注博彩赔率ID
                      dOddsBalance: item.dOddsBalance,//"大",//投注博彩赔率名称
                  };

                  this.selectList.push(obj);
                }

    },
    async baseSet() {
      if(this.routerName != 'peilvchaset') {
        this.$router.push({name:"peilvchaset"});
      } 

      for(let n in this.bocaiMenu) {
        if(this.bocaiId == this.bocaiMenu[n].id) {
          this.curactiveIndex = this.bocaiMenu[n].name;
        }
      }

      let res = await this.$get(`${window.url}/admin/gameManage/oddsBalance?bocaiTypeId=`+this.bocaiId);

      if(res.code===200){

        this.baseBocaiList = res.list;
      }
    },

    async saveoddCha() {

      console.log('selectList',this.selectList);

      let that = this;

      let listdata = {};
      listdata.list = this.selectList;

      NProgress.start();
          await that.$post(`${window.url}/admin/gameManage/oddsBalanceSub`,listdata).then((res) => {
            that.$handelResponse(res, (result) => {
              NProgress.done();
              if(result.code===200){
                that.$success(result.msg);
                that.selectList = [];
                that.baseSet();
              }
            })
      });
    }


  }
}

</script>

<style scoped>
</style>
