<template>
  <div id="youxishezhi" class="content-main">
    
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>在线管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'mainUserOnline' }">会员在线</el-breadcrumb-item>
        <el-breadcrumb-item>会员消息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="portlet portlet-add">
      <div class="nav">
          <div class="btn-ground">
            会员消息　　 
          </div>
        </div>
      <div class="tab">
        <table>
          <tr>
            <td width="20%">新增会员消息 : </td> 
            <td>
              <textarea placeholder="请输入会员消息内容" cols="150" rows="8" v-model="message.content"></textarea>
            </td>
          </tr>
        </table> 
        <p class="tac" style="margin-top: 8px;">
          <button class="tabBtn btn btn-blue" @click="sendMessage()">保存</button> 
          <button class="tabBtn btn btn-red" @click="message.content= ''">重填</button>
        </p>
      </div>



      <div class="tab">
        <div class="nav">
          <div class="btn-ground">
            会员消息查询　　 
          </div>
        </div>
        <table>
          <thead>
            <tr class="trBar">
              <th>编号</th>
                <th>日期</th>
                <th>会员</th>
                <th>发布者</th>
                <th>内容</th>
                <th>读/次</th>
                <th>功能</th>
            </tr>
          </thead> 
          <tbody>
            <tr v-for="message in messageList">
                <td>{{message.id}}</td>
                <td>{{$timestampToTime(message.updateDate)}}</td>
                <td>{{message.cUserUserName}}</td>
                <td>{{message.aUserUserName}}</td>
                <td>{{message.content}}</td>
                <td>{{message.readNum}}</td>
                <td>
                  <span>
                    <a class="tabBtn btnPurple green" @click="deleteMessageId(message.id)">删除</a> 
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
      content: ''，


      page: {
            totalPage: 1,
            currentPage: 1,
            pageSize: 10
        },
        showList: true,
        title: null,
        q: {
            username: "",
        },
        hyOnlineList: {},//会员列表
        totalCount: 0,//当前在线人数
        messageList: {},//短消息列表
        message: {
            cuserId: "",
            content: ""
        },
        messageAuthority: 0,//单对单信息权限
        bettingAuthority: 0,//投注权限

        cUserId: this.$route.params.id,
    }
  },
  computed: {
    ...mapGetters({
    })
  },
  created() {
    this.getmessageList();
  },
  mounted(){
  },
  methods: {
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
    async downline(id) {

      let res = await this.$get(`${window.url}/admin/system/cuserDownline?cUserId=`+id);

      if(res.code===200){
        this.$success('操作成功');
      }
    },

    handleCurrentChange(cpage) {
      this.currentPage = cpage;
      this.childUser();
    },
    async getmessageList() {

      let res = await this.$get(`${window.url}/admin/system/messageList?cuserId=`+ );

      if(res.code===200){
        this.$success('操作成功');
      }

/admin/system/messageList?cuserId=4

vm.showList = false;
            vm.message.cuserId = id;
            $.ajax({
                url: baseURL + '/admin/system/messageList',
                async: true,
                dataType: 'json',//服务器返回json格式数据
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: 'get',//HTTP请求类型
                success: function (data) {
                    if (data.code == 200) {
                        vm.messageList = data.page.list;
                    }
                }
            });




      let res = await this.$get(`${window.url}/admin/system/hyOnline?currentPage=`+this.currentPage+`&username=`+this.huiyuanAccout+`&pageSize=10`);

      if(res.code===200){
        this.huiyuanInfo = res.page;
      }








       $.get("../../admin/menu/userMenu", function (data) {
        data.auser.functionIdList.forEach(function (ele, index) {
            if (data.auser.functionIdList[index] == 3) {//单对单信息
                vm.messageAuthority = 1;
            }
            if (data.auser.functionIdList[index] == 4) {//投注功能
                vm.bettingAuthority = 1;
            }
        });
    });

    var url = baseURL + '/admin/system/hyOnline?1=1';
    if (null != vm.q.username && '' != vm.q.username) {
        url += "&username=" + vm.q.username
    }
    $.ajax({
        url: url + "&currentPage=" + vm.page.currentPage + "&pageSize=" + vm.page.pageSize,
        async: true,
        dataType: 'json',//服务器返回json格式数据
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        type: 'get',//HTTP请求类型
        success: function (data) {
            if (data.code == 200) {
                vm.hyOnlineList = data.page.list;
                if (data.page.totalPage == 0) {
                    vm.page.totalPage = 1;
                } else {
                    vm.page.totalPage = data.page.totalPage;
                }


    }

  }
}

</script>

<style scoped>
</style>
