<template>
  <div id="youxishezhi" class="content-main">
    
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>游戏管理</el-breadcrumb-item>
        <el-breadcrumb-item>开盘设置</el-breadcrumb-item>
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
        <table>
          <thead>
            <tr>
              <th>期数</th> 
              <th>开盘时间</th> 
              <th>封盘时间</th> 
              <th>状态</th> 
              <th>基本操作</th>
            </tr>
          </thead> 
          <tbody>
            <tr v-for="(item,index) in kaipanList">
              <td>{{item.periods}}</td> 
              <td>{{$timestampToTime(item.opentime)}}</td> 
              <td>{{$timestampToTime(item.openPrizetime)}}</td> 

              <!-- <td class="green">{{item.status==0?'已删除':item.status==1?'封盘中':item.status==2?'开盘中':'过期'}}</td> 
              <td>
                <a v-if="item.status==2" class="tabBtn btnRed" @click="fengpan(item)">封盘</a>
                <a v-if="item.status==1" class="tabBtn btnRed" @click="fengpan(item)">开盘</a>
                <a v-if="item.status!=0" class="tabBtn btnRed" @click="fengpan(item)">删除</a>
              </td> -->

              <td class="text-success green" v-if="item.status == 2 && index == 0">正在开盘</td>
                <td class="text-success" v-else-if="item.status == 1">已封盘</td>
                <td class="text-success" v-else-if="item.status == 0">已删除</td>
                <td class="text-success" v-else>等待开盘</td>
                <td>
                    <template v-if="index == 0 && item.status == 2">
                        <button class="btn btn-danger" type="button" @click="fengpan(item,1)" >封盘</button>
                    </template>
                    <template v-if="index != 0 && item.status != 1 && item.status != 0">
                        <button class="btn btn-danger" type="button" @click="fengpan(item,2)" >开盘</button>
                    </template>
                    <template v-if="item.status == 2 && index != 0">
                        <button class="btn" type="button" @click="fengpan(item,0)">删除</button>
                    </template>
                    <template v-else-if="item.status == 0">
                        <button class="btn" type="button" @click="fengpan(item,4)">恢复</button>
                    </template>
                </td>

            </tr>
          </tbody>
        </table>
      </div>
      <div class="c"></div>
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
      kaipanList: [],
      isBase: 1
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
    this.childUser();
  },
  mounted(){
  },
  methods: {
    async fengpan(item,status) {

      let that = this;

       let msg = "";
            if(status == 1){
                msg = "该游戏正在进行下注，是否立即封盘";
            }else if(status == 0){
                msg = "是否确认删除";
            }else if(status == 4){
                msg = "是否确认恢复";
                status = 2;
            }else {
                msg = "是否确认开盘";
            }

          console.log('status',status);

            let obj = {
              isBase: this.isBase,
              status: status,
              id: item.id,
              bocaiTypeId: this.bocaiId
            }

      this.$c_msgconfirm(msg,async () => {

            NProgress.start();
            await that.$post(`${window.url}/admin/gameManage/handicapSet`,obj).then((res) => {
            that.$handelResponse(res, (result) => {
              NProgress.done();
              if(result.code===200) {
                        that.$success('修改成功');
                        that.childUser();
                      } else {
                        that.$warning(result.msg);
                  }
            })
          });

      });

    },
    async childUser() {
      let res = await this.$get(`${window.url}/admin/gameManage/handicap?bocaiTypeId=`+this.bocaiId);

      if(res.code===200){
        this.kaipanList = res.list;
      }
    }

  }
}

</script>

<style scoped>
</style>
