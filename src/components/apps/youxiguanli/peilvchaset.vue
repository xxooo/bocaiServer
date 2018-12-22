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
              <tr>
                <th>PC蛋蛋</th> 
                <th>B盘</th> 
                <th>C盘</th> 
                <th>D盘</th>
              </tr>
            </thead> 
            <tbody>
              <tr>
                <td>大小</td> 
                <td><input type="text" class="odds-font"></td> 
                <td><input type="text" class="odds-font"></td> 
                <td><input type="text" class="odds-font"></td>
              </tr>
              <tr>
                <td>单双</td> 
                <td><input type="text" class="odds-font"></td> 
                <td><input type="text" class="odds-font"></td> 
                <td><input type="text" class="odds-font"></td>
              </tr
              ><tr><td>色波</td> <td><input type="text" class="odds-font"></td> <td><input type="text" class="odds-font"></td> <td><input type="text" class="odds-font"></td></tr><tr><td>半波</td> <td><input type="text" class="odds-font"></td> <td><input type="text" class="odds-font"></td> <td><input type="text" class="odds-font"></td></tr><tr><td>豹子</td> <td><input type="text" class="odds-font"></td> <td><input type="text" class="odds-font"></td> <td><input type="text" class="odds-font"></td></tr><tr><td>特码</td> <td><input type="text" class="odds-font"></td> <td><input type="text" class="odds-font"></td> <td><input type="text" class="odds-font"></td></tr>
            </tbody>
          </table> 
        <div>
          <div class="diffInput"><span>批量设置：</span> 
            <label><input type="radio" value="B"> B盘</label> 
            <label><input type="radio" value="C"> C盘</label> 
            <label><input type="radio" value="D"> D盘</label> 
            <input type="text" placeholder="请输入赔率差值"> 
            <button class="tabBtn btn-blue mgr10">填入</button>
          </div> 
          <div class="inner">
            <button class="btn-submit">保存</button> 
            <button class="btn-cancel">取消</button>
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
      baseBocaiInfo: {},
      routerName: this.$route.name
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
    async baseSet() {

      let res = await this.$get(`${window.url}/admin/gameManage/getBocaiBaseSet?bocaiTypeId=`+this.bocaiId+`&userId=`+this.userInfo.id);

      if(res.code===200){

        this.baseBocaiInfo = res.data;
        this.baseBocaiInfo.isOpen = this.baseBocaiInfo.isOpen == 1 ? true : false;
      }
    },

    async saveoddInfo() {

      console.log('baseBocaiInfo',this.baseBocaiInfo);

      let that = this;

      let obj = {
        userId: this.baseBocaiInfo.userId,
        bocaiId: this.baseBocaiInfo.bocaiId,
        bocaiName: this.baseBocaiInfo.bocaiName,
        minimumBet: this.baseBocaiInfo.minimumBet,
        highestPayout: this.baseBocaiInfo.highestPayout,
        opentime: this.baseBocaiInfo.opentime,
        closetime: this.baseBocaiInfo.closetime,
        isOpen: this.baseBocaiInfo.isOpen ? 1 : 0,
        advanceTime: this.baseBocaiInfo.advanceTime
      }

      NProgress.start();
          await that.$post(`${window.url}/admin/gameManage/bocaiBaseSet`,obj).then((res) => {
            that.$handelResponse(res, (result) => {
              NProgress.done();
              if(result.code===200){
                that.$success(result.msg);

              }
            })
      });
    }


  }
}

</script>

<style scoped>
</style>
