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
          <button class="tabBtn btn btn-blue mgr10" @click="$router.push({name:'chongqinduboBase'})">赔率设置</button> 
          <button class="tabBtn btn btn-blue mgr10" @click="$router.push({name:'peilvchaset'})">赔率差设置</button> 
          <button class="tabBtn btn btn-blue mgr10" @click="$router.push({name:'peilvfudongset'})">赔率浮动设置</button>
        </div>
      </span>
    </div>

    <div class="portlet portlet-add">
        <div class="tab">
          <table>
            <thead>
              <tr>
                <th>{{curactiveIndex}}</th> 
                <th>浮动类型</th> 
                <th>触发浮动值</th> 
                <th>每次浮动值</th>
              </tr>
            </thead> 

            <tbody>
              <tr v-for="(item,index) in baseBocaiList">
                <td>{{item.dewaterName}}</td> 
                <td>
                  <label><input type="radio" value="1" v-model="item.floatType"> 注单数</label> 
                  <label><input type="radio" value="2" v-model="item.floatType"> 下注总额</label>
                </td> 
                <td><input type="text" class="odds-font" v-model="item.triggerFloat" v-on:input="inputFunc(item)"></td> 
                <td><input type="text" class="odds-font" v-model="item.floatValue" v-on:input="inputFunc(item)"></td>
              </tr>
            </tbody>

          </table> 
          <div>
            <div class="floatInput"><span>浮动类型：</span> 
              <el-select v-model="fudongtype" @change="changefdtype" placeholder="请选择" size="mini">
                <el-option :key="0" :label="'请选择类型'" :value="0"></el-option>
                <el-option :key="1" :label="'注单数'" :value="1"></el-option>
                <el-option :key="2" :label="'下注总额'" :value="2"></el-option>
              </el-select>
              <span>批量设置：</span> 
              <label><input type="radio" value="0" v-model="fudongvalue"> 触发浮动值</label> 
              <label><input type="radio" value="1" v-model="fudongvalue"> 每次浮动值</label> 
              <input type="text" placeholder="请输入浮动值" v-model="fudongnum"> 
              <button class="tabBtn btn-blue mgr10" @click="setfudong()">填入</button>
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
      selectList: [],
      fudongtype: 0,
      fudongvalue: 0,
      fudongnum: ''
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
    changefdtype(data) {
      for(let n in this.baseBocaiList) {
        this.baseBocaiList[n].floatType = data;
        let obj = {
                      id: this.baseBocaiList[n].id,
                      dewaterName: this.baseBocaiList[n].dewaterName,
                      floatType: this.baseBocaiList[n].floatType,
                      triggerFloat: this.baseBocaiList[n].triggerFloat,
                      floatValue: this.baseBocaiList[n].floatValue
                    };
            this.selectList.push(obj);
      }
    },
    setfudong() {
      if(+this.fudongvalue === 0) {
        for(let n in this.baseBocaiList) {
          this.baseBocaiList[n].triggerFloat = this.fudongnum;
          let obj = {
                        id: this.baseBocaiList[n].id,
                        dewaterName: this.baseBocaiList[n].dewaterName,
                        floatType: this.baseBocaiList[n].floatType,
                        triggerFloat: this.baseBocaiList[n].triggerFloat,
                        floatValue: this.baseBocaiList[n].floatValue
                      };
              this.selectList.push(obj);
        }
      } else {
        for(let n in this.baseBocaiList) {
          this.baseBocaiList[n].floatValue = this.fudongnum;
          let obj = {
                        id: this.baseBocaiList[n].id,
                        dewaterName: this.baseBocaiList[n].dewaterName,
                        floatType: this.baseBocaiList[n].floatType,
                        triggerFloat: this.baseBocaiList[n].triggerFloat,
                        floatValue: this.baseBocaiList[n].floatValue
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
                      id: item.id,
                      dewaterName: item.dewaterName,
                      floatType: item.floatType,
                      triggerFloat: item.triggerFloat,
                      floatValue: item.floatValue
                    };

                    this.selectList[n] = obj;
                  }
                }

                if(!ifHas) {
                  let obj = {
                    id: item.id,
                      dewaterName: item.dewaterName,
                      floatType: item.floatType,
                      triggerFloat: item.triggerFloat,
                      floatValue: item.floatValue
                  };

                  this.selectList.push(obj);
                }

    },
    async baseSet() {
      if(this.routerName != 'peilvfudongset') {
        this.$router.push({name:"peilvfudongset"});
      } 

      for(let n in this.bocaiMenu) {
        if(this.bocaiId == this.bocaiMenu[n].id) {
          this.curactiveIndex = this.bocaiMenu[n].name;
        }
      }

      let res = await this.$get(`${window.url}/admin/gameManage/oddsFloat?bocaiTypeId=`+this.bocaiId);

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
          await that.$post(`${window.url}/admin/gameManage/oddsFloatSub`,listdata).then((res) => {
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
