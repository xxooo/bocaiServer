<template>
  <div id="youxishezhi" class="content-main">
    
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>帐号管理</el-breadcrumb-item>
        <el-breadcrumb-item>股东</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="nav">
      <div class="btn-ground">
        筛选 :
        <el-select v-model="shuaixuanNum" placeholder="请选择" size="mini" style="width:120px;">
          <el-option value="1" key="1" label="启用"></el-option> 
          <el-option value="0" key="0" label="停用"></el-option> 
          <el-option :value="''" key="null" label="全部"></el-option> 
        </el-select>
        股东帐号 :
        <el-input v-model="gudongAccout" placeholder="请输入内容" size="mini" style="width:120px;"></el-input>
        <button class="btn btn-blue" @click="childUser()">查询</button>
        <button class="btn btn-blue" @click="addgudong()">新增</button>
      </div>

    </div>

    <div class="portlet">
      <div class="tab">
        <table>
          <thead>
            <tr class="trBar">
              <th>在线</th> 
              <th>体系</th> 
              <th>股东帐号</th> 
              <th>名称</th> 
              <th>余额</th> 
              <th>总代理数</th> 
              <th>代理数</th> 
              <th>会员数</th> 
              <th>新增日期</th> 
              <th>帐号</th> 
              <th>冻结</th> 
              <th>补货</th> 
              <th>收单/停押</th> 
              <th>功能</th>
            </tr>
          </thead> 
          <tbody>
            <tr v-for="(item,index) in childUserInfo.list">
              <td><i class="iconfont" :class="item.isOnline == 1 ? 'icon-yonghu-copy bule' : 'icon-yonghu'"></i></td> 
              <td>
                <div class="accountLevel">
                  <button class="btn-blue" @click="getUserzhangc(item)">查看</button> 
                </div>
              </td> 
              <td style="font-weight: bold;">{{item.username}}</td> 
              <td>{{item.nickname}}</td>
              <td><span>{{item.quota}}</span></td> 
              <td>{{item.generalAgentNum}}</td> 
              <td>{{item.agentNum}}</td> 
              <td>{{item.memberNum}}</td> 
              <td>{{$timestampToTime(item.createDate)}}</td> 
              <td :class="item.status == '1' ? 'green': 'red'">{{item.status == '1' ? '启用' : '关闭'}}</td> 
              <td :class="item.isFrozen == '0' ? 'green': 'red'">{{item.isFrozen == '1' ? '是' : '否'}}</td> 
              <td :class="item.isReplenishment == '1' ? 'green': 'red'">{{item.isReplenishment == '1' ? '开启' : '关闭'}}</td> 
              <td :class="item.tingyaShouya == '1' ? 'green': 'red'">{{item.tingyaShouya == '1' ? '收单' : '停押'}}</td> 
              <td class="btnFeatures">
                <span>
                  <a class="tabBtn btnPurple" @click="updateuser(item)">修改资料</a> 
                  <a class="tabBtn btnPurple" @click="tuishuiset(item)">退水设定</a>
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="block" v-if="childUserInfo.totalPage > 1">
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="childUserInfo.pageSize"
                    layout="total, prev, pager, next"
                    :total="childUserInfo.totalCount*1">
                  </el-pagination>
        </div>
        
      </div>
    </div>

    <el-dialog :visible.sync="dialogAddParmasM" width="40%" :title="'体系查询'">
      <el-table
        :data="tixiinfo"
        style="width: 100%">
        <el-table-column
          prop="rulename"
          label="级别"
          width="180">
        </el-table-column>
        <el-table-column
          prop="username"
          label="帐号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="occupied"
          label="现金占成">
        </el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>



<script>
import { mapGetters } from 'vuex';

export default {
  components: {
  },
  data () {
    return {
      childUserList: [],
      childUserInfo: {},
      currentPage: 1,
      shuaixuanNum: '',
      gudongAccout: '',
      chaRuleid: 4,
      dialogAddParmasM: false,
      tixiinfo: [],

      gudongList: [],
      zongdlList: [],
      dailiList: [],
      gudongobj: {},
      zongdlobj: {},
      dailiobj: {},
      gudonguclass: '',
      zongdluclass: ''
    }
  },
  computed: {
    ...mapGetters({
      ruleId:'getruleId',
      userInfo: 'getuserInfo'
    })
  },
  created() {

   this.childUser();
   this.getfuji();
  },
  mounted(){
  },
  methods: {
    async getfuji() {
      let res = await this.$get(`${window.url}/admin/auser/selectByPid?pid=`+this.userInfo.id);

      if(res.code===200){

        this.gudongList = res.list;
      }
    },
    async tuishuiset(item) {
      store.commit('updateupUserInfo', item);
      //this.$router.push({name:'tuishuisheding'});

      this.$router.push({
              name: 'tuishuisheding',
              params: {
                userlevel: 'gudong'
              }
            })

    },
    async getUserzhangc(item) {
      let res = await this.$get(`${window.url}/admin/auser/systemList?id=`+item.id+`&userClass=`+item.userClass+`&ruleId=`+item.ruleId);

      if(res.code===200){

        this.tixiinfo = res.list;

        this.dialogAddParmasM = true;
      }

    },
    changeStats() {

    },
    addgudong() {
      this.$router.push({name:'addgudong'});
    },
    async deletesubuser(item) {
      let that = this;

        this.$c_confirm(async () => {
          let ret = await that.$get(`${window.url}/admin/auser/deleteChild?userId=`+item.id);
            if(ret.code===200){
                that.$success('删除成功!');
                that.childUser();
            } else {
            }
        });
    },
    updateuser(item) {
      store.commit('updateupUserInfo', item);

      this.$router.push({name:'updategudong'});
    },
    hasitem(item,num) {
      console.log('item.functionIdList',item.functionIdList);
      let has = false;

      for(let n in item.functionIdList) {
        if(num == item.functionIdList[n]) {
          has = true;
        }
      }

      return has;
    },
    handleCurrentChange(cpage) {
      this.currentPage = cpage;
      this.childUser();
    },
    async childUser() {

      let res = await this.$get(`${window.url}/admin/auser/userList?ruleId=4&status=`+this.shuaixuanNum+`&username=`+this.gudongAccout+`&pid=`+this.userInfo.id+`&currentPage=`+this.currentPage+`&pageSize=10`);

      if(res.code===200){

        this.childUserInfo = res.page;
      }

    }

  }
}

</script>

<style scoped>
</style>
