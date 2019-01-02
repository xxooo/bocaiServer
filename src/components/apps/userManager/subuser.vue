<template>
  <div id="youxishezhi" class="content-main">
    
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
        <el-breadcrumb-item>帐号管理</el-breadcrumb-item>
        <el-breadcrumb-item>子帐号</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="nav">
      <div class="btn-ground">
        <button class="tabBtn btn btn-blue mgr10" @click="$router.push({name:'addsubuser'})">新增子帐号</button> 
      </div>
    </div>

    <div class="portlet">
      <div class="tab">
        <table>
          <thead>
            <tr>
              <th>帐号</th> 
              <th>名称</th> 
              <th>密码</th> 
              <th>登陆</th> 
              <th>盘势管理</th> 
              <th>查看帐号</th> 
              <th>重置密码</th> 
              <th>注单查询</th> 
              <th>财务管理</th> 
              <th>报表</th> 
              <th>新增时间</th> 
              <th>功能</th>
            </tr>
          </thead> 
          <tbody>
            <tr v-for="(item,index) in childUserInfo.list">
              <td>{{item.username}}</td> 
              <td>{{item.nickname}}</td>
              <td>{{item.password}}</td> 
              <td class="red" :class="hasitem(item,1) ? 'green': ''">{{hasitem(item,1) ? '开启': '关闭'}}</td>
              <td class="red" :class="hasitem(item,2) ? 'green': ''">{{hasitem(item,2) ? '开启': '关闭'}}</td> 
              <td class="red" :class="hasitem(item,3) ? 'green': ''">{{hasitem(item,3) ? '开启': '关闭'}}</td> 
              <td class="red" :class="hasitem(item,4) ? 'green': ''">{{hasitem(item,4) ? '开启': '关闭'}}</td> 
              <td class="red" :class="hasitem(item,5) ? 'green': ''">{{hasitem(item,5) ? '开启': '关闭'}}</td> 
              <td class="red" :class="hasitem(item,6) ? 'green': ''">{{hasitem(item,6) ? '开启': '关闭'}}</td> 
              <td class="red" :class="hasitem(item,7) ? 'green': ''">{{hasitem(item,7) ? '开启': '关闭'}}</td> 
              <td>{{$timestampToTime(item.createDate)}}</td> 
              <td>
                <a @click="updateuser(item)" class="tabBtn btnPurple">修改资料</a>
                <a class="tabBtn btnRed" @click="deletesubuser(item)">删除</a>
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

  },
  mounted(){
  },
  methods: {
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
      this.$router.push({name:'updatesubuser'});
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

      let res = await this.$get(`${window.url}/admin/auser/childUser?currentPage=`+this.currentPage+`&pageSize=10`);


      if(res.code===200){

        this.childUserInfo = res.page;
      }
    }



  }
}

</script>

<style scoped>
</style>
