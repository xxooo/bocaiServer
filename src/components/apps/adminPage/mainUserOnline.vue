<template>
  <div id="youxishezhi" class="content-main">
    
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>在线管理</el-breadcrumb-item>
        <el-breadcrumb-item>会员在线</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="portlet">
      <div class="tab">
        <div class="nav">
          <div class="btn-ground">
            在线查询   30 分钟内在线人数 : 
            <span class="green">{{huiyuanInfo.totalCount}}</span>
            <div style="margin-left: 100px;display: inline-block;">
              会员帐号 :
              <el-input v-model="huiyuanAccout" placeholder="请输入" size="mini" style="width: 30%;"></el-input>
              <button class="btn btn-blue" @click="childUser()">刷新</button>
            </div>
          </div>
        </div>
        <table>
          <thead>
            <tr class="trBar">
              <th width="100">公司/股东/总代理/代理</th> 
              <th width="120">会员帐号</th> 
              <th width="150">登录网址</th> 
              <th width="130">登录IP</th>
              <th width="150">最后活动时间</th> 
              <th width="200">功能</th>
            </tr>
          </thead> 
          <tbody>
            <tr v-for="(item,index) in huiyuanInfo.list">
              <td>{{item.systemStr}}</td>
              <td>{{item.username}}</td>
              <td>{{item.loginWebsite}}</td>
              <td>{{item.loginIp}}</td>
              <td>{{$timestampToTime(item.loginTime)}}</td>
              <td class="btnFeatures">
                <span>
                  <a class="tabBtn btnPurple green" @click="activiteInfo(item.id)">活动情况</a> 
                </span>
                <span>
                  <a class="tabBtn btnPurple red" @click="downline(item)">踢线</a> 
                </span>
                <span v-if="messageAuthority == 1">
                  <a class="tabBtn btnPurple green" @click="messageInfo(item.id)">消息</a> 
                </span>
                <span v-if="bettingAuthority == 1">
                  <a class="tabBtn btnPurple green" @click="gotoOrder(item)">投注</a> 
                </span>
              </td>
            </tr>

          </tbody>
        </table>
        <div class="block" v-if="huiyuanInfo.totalPage > 1">
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="huiyuanInfo.pageSize"
                    layout="total, prev, pager, next"
                    :total="huiyuanInfo.totalCount*1">
                  </el-pagination>
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
      huiyuanInfo: {},
      isBase: '',
      currentPage: 1,
      huiyuanAccout: '',
      startDate: '3',
      content: '',
      messageAuthority: 0,//单对单信息权限
      bettingAuthority: 0,//投注权限
    }
  },
  computed: {
    ...mapGetters({
    })
  },
  created() {
    this.childUser();
    this.huiyuanOnlineList();
  },
  mounted(){
  },
  methods: {
    async huiyuanOnlineList() {
      let that = this;
      
      let res = await this.$get(`${window.url}/admin/menu/userMenu`);

        if(res.code===200){
          res.auser.functionIdList.forEach(function (ele, index) {
              if (res.auser.functionIdList[index] == 3) {//单对单信息
                  that.messageAuthority = 1;
              }

              if (res.auser.functionIdList[index] == 4) {//投注功能
                  that.bettingAuthority = 1;
              }

            });

        }
    },
    gotoOrder(item) {
      this.$router.push({
        name: 'userBettingManage'
      })
      store.commit('updatebetcUser',item);
    },
    messageInfo(id) {
      this.$router.push({
        name: 'messageInfo',
        params: {
          id: id
        }
      })
    },
    activiteInfo(id) {
      this.$router.push({
        name: 'userActive',
        params: {
          id: id
        }
      })
    },
    async downline(item) {

      let that = this;

      this.$c_msgconfirm('是否确认将 '+item.username+' 踢线',async () => {

            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
            await that.$get(`${window.url}/admin/system/cuserDownline?cUserId=`+item.id).then((res) => {
            that.$handelResponse(res, (result) => {
          loading.close();
              if(result.code===200) {
                        that.$success('操作成功');
                        that.childUser();
                      } else {
                  }
            })
          });

      });

    },

    handleCurrentChange(cpage) {
      this.currentPage = cpage;
      this.childUser();
    },
    async childUser() {
      let res = await this.$get(`${window.url}/admin/system/hyOnline?currentPage=`+this.currentPage+`&username=`+this.huiyuanAccout+`&pageSize=10`);

      if(res.code===200){
        this.huiyuanInfo = res.page;
      }
    }

  }
}

</script>

<style scoped>
</style>
