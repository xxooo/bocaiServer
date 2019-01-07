<template>
  <div id="youxishezhi" class="content-main">
    
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
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
              <th width="150">会员帐号</th> 
              <th width="150">登录网址</th> 
              <th width="150">登录IP</th>
              <th width="150">最后活动时间</th> 
              <th width="150">功能</th>
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
                  <a class="tabBtn btnPurple green" @click="updateNotice(item,1)">活动情况</a> 
                </span>
                <span>
                  <a class="tabBtn btnPurple red" @click="updateNotice(item,1)">踢线</a> 
                </span>
                <span>
                  <a class="tabBtn btnPurple green" @click="updateNotice(item,1)">消息</a> 
                </span>
                <span>
                  <a class="tabBtn btnPurple green" @click="updateNotice(item,1)">投注</a> 
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
      content: ''
    }
  },
  computed: {
    ...mapGetters({
    })
  },
  created() {
    this.childUser();
  },
  mounted(){
  },
  methods: {
    async updateNotice(item,st) {
      let obj = {
        id: item.id,
        status: st
      }

      let res = await this.$post(`${window.url}/admin/system/updateNotice`,obj);

      if(res.code===200){
        this.childUser();
      }
    },
    handleCurrentChange(cpage) {
      this.currentPage = cpage;
      this.childUser();
    },
    async savegonggao() {

      let that = this;

      let obj = {
        content: this.content
      }

      NProgress.start();
          await that.$post(`${window.url}/admin/system/addNotice`,obj).then((res) => {
            that.$handelResponse(res, (result) => {
              NProgress.done();
              if(result.code===200){
                that.$success(result.msg);
                that.childUser();
                that.content = '';
              }
            })
      });
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
