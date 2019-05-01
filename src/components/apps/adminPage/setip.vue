<template>
  <div id="youxishezhi" class="content-main">
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>绑定IP</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="nav">
        <el-input v-model="cuser.username" placeholder="请输入会员帐号" size="mini" style="width: 15%;"></el-input>
        <button class="btn btn-blue" @click="userList()">查询</button>
    </div>

    <div class="portlet portlet-add">
      <div class="tab">

        <table class="main-tables">
            <tr>
              <th>公司/股东/总代理/代理</th>
                    <th>会员账号</th>
                    <th>登陆网址</th>
                    <th>登陆 IP</th>
                    <th v-if="ruleId == 1 || ruleId == 2">绑定 IP</th>
                    <th>最后活动时间</th>
                    <th v-if="ruleId == 1 || ruleId == 2">功能</th>
            </tr>
            <tr v-for="ipCUser in ipCUserList">
                    <td>{{ipCUser.systemStr}}</td>
                    <td>{{ipCUser.username}}</td>
                    <td>{{ipCUser.loginWebsite}}</td>
                    <td>{{ipCUser.loginIp}}</td>
                    <td v-if="ruleId == 1 || ruleId == 2">{{ipCUser.bindingIp}}</td>
                    <td>{{$timestampToTime(ipCUser.updateDate)}}</td>
                    <td v-if="ruleId == 1 || ruleId == 2"><button v-if="bindIpAuthority == 1" class="btn" type="button" @click="updateIp(ipCUser.id,ipCUser.bindingIp)">修改 IP</button></td>
                </tr>

        </table>


        <div class="block" v-if="page.totalPage > 1">
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="page.currentPage"
                    :page-size="page.pageSize"
                    layout="total, prev, pager, next"
                    :total="page.totalCount*1">
                  </el-pagination>
        </div>

      </div>
    </div>

    <el-dialog class="add-user-dialog" :title="'设置固定的 IP 地址'" id="modifyLoty" :visible.sync="dialogvisible" width="40%">
      <div class="modal-body">
            <input type="text" v-model="cuser.bindingIp" placeholder="请输入要固定显示的 IP 地址">
        </div>
        <div class="modal-footer">
            <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
            <button class="btn btn-primary" @click="save()">保存</button>
        </div>
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
      bocaiId: 1,
      baseBocaiInfo: {},
      routerName: this.$route.name,
      dialogvisible: false,

      page: {
            totalPage: 1,
            currentPage:1,
            pageSize:10
        },
        showList: true,
        title: null,
        q: {//查询条件
            username: "",
        },
        cuser: {//对象
            id: null,
            bindingIp: "",
        },
        ipCUserList: {},
        bindIpAuthority:0,//绑定IP权限
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
    this.userList();

    console.log('ruleId',this.ruleId);
  },
  mounted(){
  },
  methods: {
    async save() {
      let that = this;

      const loading = this.$loading({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
            await that.$post(`${window.url}/admin/cuser/updateCUser`,this.cuser).then((res) => {
              that.$handelResponse(res, (result) => {
          loading.close();
                if(result.code===200){
                  that.$success('绑定成功!');
                  that.userList();
                } else {
                  that.$error(result.msg);
                }
              })
            });

      this.dialogvisible = false;
    },
    updateIp(id,bindingIp) {
            this.cuser.id = id;
            this.cuser.bindingIp = bindingIp;

            this.dialogvisible = true;
    },
    handleCurrentChange(cpage) {
      this.page.currentPage = cpage;
      this.userList();
    },
    async userList() {
        let that = this;

        let res = await this.$get(`${window.url}/admin/menu/userMenu`);

        if(res.code===200){
          res.auser.functionIdList.forEach(function (ele, index) {
              if (res.auser.functionIdList[index] == 6) {//绑定IP权限
                  that.bindIpAuthority = 1;
              }
            });

        }


        let url = 'admin/cuser/getIPCUserList?1=1';
        if (null != this.q && null != this.q.username && '' != this.q.username) {
            url = url + "&username=" + this.q.username
        }


        let data = await this.$get(`${window.url}/`+ url +`&currentPage=`+this.page.currentPage+`&pageSize=`+this.page.pageSize);
            if(+data.code===200) {

                that.ipCUserList = data.page.list;

                if(data.page.totalPage == 0){
                    that.page.totalPage = 1;
                }else{
                    that.page.totalPage = data.page.totalPage;
                    this.page.totalCount = data.page.totalCount;
                }

            }
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
</style>
