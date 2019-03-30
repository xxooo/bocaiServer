<template>
  <div id="youxishezhi" class="content-main">
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>游戏管理</el-breadcrumb-item>
        <el-breadcrumb-item>补货设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="nav">
      <span>游戏类型:
        <el-select v-model="bocaiTypeId" @change="replenishment()" placeholder="请选择" size="mini">
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
          <table>
            <thead>
              <tr>
                <th>PC蛋蛋</th> 
                <th>补货类型</th> 
                <th>触发补货数值<p>* 如果补货数值设置大于0，将开启自动补货 *</p></th> 
                <th>触发补货报警数值<p>* 如果自动补货开启，报警将会失效 *</p></th>
              </tr>
            </thead> 
            <tr v-for="(item,index) in buhuoList">
              <td class="row-th">{{item.dewaterName}}</td> 
              <td>
                <label><input type="radio" v-model="item.replenishmentType" value="1">盈亏</label> 
                <label><input type="radio" v-model="item.replenishmentType" value="2">注单数</label> 
                <label><input type="radio" v-model="item.replenishmentType" value="3">下注总额</label>
              </td> 
              <td><input type="text" class="odds-font" v-model="item.triggerReplenishment"></td> 
              <td><input type="text" class="odds-font" v-model="item.triggerCall"></td>
            </tr>
          </table> 

          <div class="flyInput">
            <span>补货类型：</span> 

            <el-select v-model="buhuotype" @change="chbuhuotype()" placeholder="请选择" size="mini">
              <el-option key="0" label="请选择类型" value="0"></el-option>
              <el-option key="1" label="盈亏" value="1"></el-option>
              <el-option key="2" label="注单数" value="2"></el-option>
              <el-option key="3" label="下注总额" value="3"></el-option>
            </el-select>

            <span>批量设置：</span> 
            <label><input type="radio" value="0" v-model="tiantype"> 触发补货数值</label> 
            <label><input type="radio" value="1" v-model="tiantype"> 解发补货报警数值</label> 
            <input type="text" placeholder="请输入数值" v-model="tiannum"> 
            <button class="tabBtn btn-blue mgr10" @click="tianru()">填入</button>
          </div> 
          <div class="inner">
            <button class="btn-submit" @click="save">保存</button> 
            <button class="btn-cancel" @click="replenishment()">取消</button>
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
      auserId: '',
      bocaiTypeId: '',
      buhuoList: [],
      tiannum: '',
      tiantype: 0,
      buhuotype: '0'

    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'getuserInfo',
      bocaiMenu: 'getbocaiMenu'
    })
  },
  created() {
    if(this.bocaiMenu.length != 0) {
      this.bocaiTypeId = this.bocaiMenu[0].id;
    }

    console.log('userInfo',this.userInfo);

    this.auserId = this.userInfo.id;

    this.replenishment();
  },
  mounted(){
  },
  methods: {
    chbuhuotype() {
      console.log('buhuotype',this.buhuotype);

      if(this.buhuotype == 1) {
        for(let n in this.buhuoList) {
          this.buhuoList[n].replenishmentType = 1;
        }
      } else if(this.buhuotype == 2) {
        for(let n in this.buhuoList) {
          this.buhuoList[n].replenishmentType = 2;
        }
      } else if(this.buhuotype == 3) {
        for(let n in this.buhuoList) {
          this.buhuoList[n].replenishmentType = 3;
        }
      }
    },
    tianru() {
      if(this.tiantype == 0) {
        for(let n in this.buhuoList) {
          this.buhuoList[n].triggerReplenishment = this.tiannum*1;
        }
      } else if(this.tiantype == 1) {
        for(let n in this.buhuoList) {
          this.buhuoList[n].triggerCall = this.tiannum*1;
        }
      }
    },
    async replenishment() {

        let res = await this.$get(`${window.url}/admin/gameManage/replenishment?auserId=`+this.auserId+`&bocaiTypeId=`+this.bocaiTypeId);

        if (res.code == 200) {
          this.buhuoList = res.list;
        } else {
            this.$error(res.msg);
        }

    },
    async save() {
            let that = this;

            let obj = {
              list: this.buhuoList
            }

                await that.$post(`${window.url}/admin/gameManage/replenishmentSub`,obj).then((res) => {
                    that.$handelResponse(res, (result) => {
                        if (result.code == 200) {
                                that.$success('操作成功');
                                that.replenishment();
                            } else {
                              that.$error(result.msg);
                            }
                    })
                  });


    }


  }
}

</script>

<style scoped>
#modifyLoty .addLotyKj > input[type="text"] {
    width: 30px;
    height: 30px;
    margin-right: 8px;
}
.modal-body,.addLotyKj,.modal-footer {
    margin: 5px 0px;
}

.portlet thead p {
    font-size: 12px;
    color: #ffd900;
}
.portlet tr input {
    font-size: 14px;
    text-align: center;
}
</style>
