<template>
  <div id="youxishezhi" class="content-main">
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>子帐号管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="nav">
        <button class="btn btn-blue" @click="add()">新增子帐号</button>
    </div>

    <div class="portlet portlet-add">

      <div class="tab" v-if="showList">

        <table class="main-tables">
            <tr>
              <th>账号</th>
                <th>名称</th>
                <th>密码</th>
                <th>登录</th>
                <th>盘势管理</th>
                <th>查看账号</th>
                <th>重置密码</th>
                <th>注单查询</th>
                <th>财务管理</th>
                <th>报表</th>
                <th>新增时间</th>
                <th>操作</th>
            </tr>
            <tr v-for="auser in auserList">
                <td>{{auser.username}}</td>
                <td>{{auser.nickname}}</td>
                <td>{{auser.password}}</td>

                <td v-if="auser.loginFunction ==1">开启</td><td v-else>未开启</td>
                <td v-if="auser.panshiFunction ==1">开启</td><td v-else>未开启</td>
                <td v-if="auser.chakanFunction ==1">开启</td><td v-else>未开启</td>
                <td v-if="auser.chongzhiFunction ==1">开启</td><td v-else>未开启</td>
                <td v-if="auser.zhudanFunction ==1">开启</td><td v-else>未开启</td>
                <td v-if="auser.caiwuFunction ==1">开启</td><td v-else>未开启</td>
                <td v-if="auser.baobiaoFunction ==1">开启</td><td v-else>未开启</td>

                <td><i>{{$timestampToTime(auser.createDate)}}</i></td>
                <td>
                    <button class="btn" @click="update(auser.id)" type="button">修改资料</button>
                    <button class="btn" @click="deleteChild(auser.id)" type="button">删除</button>
                </td>
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

      <div class="tab" v-if="!showList">

        <h3 class="form-cards-title">
            会员账号　　
        </h3>
        <table class="main-tables coinfo-card">
            <tr>
                <td colspan="3" class="coheader">基本资料设定</td>
            </tr>

            <tr>
                <th>会员名称</th>
                <td><input type="text" v-model="auser.nickname" placeholder="请输入名称"></td>
                <td>请输入名称。</td>
            </tr>
            <tr>
                <th>会员账号</th>
                <td v-if="auser.id!=null && auser.id!=''"><input type="text" v-model="auser.username" placeholder="请输入账号" disabled="disabled"></td>
                <td v-else><input type="text" v-model="auser.username" placeholder="请输入账号">
                </td>
                <td>帐号仅可接受英数字元, 长度限制4~12码</td>
            </tr>
            <tr>
                <th>设置密码</th>
                <td><input type="password" v-model="auser.password" placeholder="请输入密码"></td>
                <td>密码长度不小于6位,且需数字字母混用(不可接受!#$&*+.=@|等特殊字符)同组密码限用30天。</td>
            </tr>
            <tr>
                <th>重新输入密码</th>
                <td><input type="password" v-model="auser.repassword" placeholder="请输入密码"></td>
                <td>密码长度不小于6位,且需数字字母混用(不可接受!#$&*+.=@|等特殊字符)同组密码限用30天。</td>
            </tr>
            <tr>
                <th>基础功能设置</th>
                <td>
                    <span v-for="functions in functionList">
                        <input type="checkbox" :value="functions.id" v-model="auser.functionIdList">{{functions.functionName}}
                    </span>
                </td>
                <td>请选择功能</td>
            </tr>

        </table>

        <p class="table-btngroup">
            <button class="btn btn-common btn-primary" @click="saveOrUpdate" type="button">保存修改</button>
            　　　　　
            <button class="btn btn-common btn-danger" @click="reload" type="button">取消修改</button>
        </p>

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
      routerName: this.$route.name,
      dialogvisible: false,

      page: {
            totalPage: 1,
            currentPage: 1,
            pageSize: 10
        },
        showList: true,
        title: null,
        auser: {
            id: "",
            functionIdList: [],
        },
        auserList: {},
        functionList: {},
        password:"",//查看密码
        passwordAuthority:0,//查看密码权限
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
  },
  mounted(){
  },
  methods: {

    reload: function () {
            this.showList = true;
            this.userList();
        },
        query: function () {
            this.reload();
        },
        add: function () {
            this.showList = false;
            this.title = "新增";
            this.getMenuList();
        },
        async update(userId) {
            this.showList = false;
            this.title = "修改";

            let res = await this.$get(`${window.url}/admin/auser/childUserInfo?userId=` + userId);

            if(res.code===200){
              this.auser = res.auser;
              this.auser.repassword = res.auser.password;

            }

            this.getMenuList();

        }, 
        async getMenuList() {

            let res = await this.$get(`${window.url}/admin/menu/childfunction`);

            if(res.code===200){
              this.functionList = res.list;

            }

        }, 
        async viewPassword(userId){

            let res = await this.$get(`${window.url}/admin/auser/viewPassword?userId=`+userId);

            if(res.code===200){
              this.password = res.password;

            }
        },
        async deleteChild(id){

          let that = this;

          this.$c_msgconfirm("是否确认删除,删除后无法还原",async () => {

            await that.$get(`${window.url}/admin/auser/deleteChild?userId=`+id).then((res) => {
                that.$handelResponse(res, (result) => {
                    if (result.code == 200) {
                            that.$success('删除成功');
                            that.reload();
                        }
                })
              });
            });

        },
        async saveOrUpdate() {

          console.log('this.auser',this.auser);

           let that = this;

           let flag = true;
           let reg = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{4,12})$/;

          if (!this.auser.nickname || this.auser.nickname == '') {
                that.$alertMessage("子账号名称不能为空");
                return;
            }

            if (that.auser.password == '') {
                  that.$alertMessage('密码不能为空!', '温馨提示');
                    return;
                }
            if (!reg.test(that.auser.password)) {
                  that.$alertMessage('密码只能是字母加数字!', '温馨提示');
                    return;
                }
            if (that.auser.password != that.auser.repassword) {
                  that.$alertMessage('两次密码不一致!', '温馨提示');
                    return;
            }


          if(!this.auser.id || this.auser.id == "") {
            console.log('new');
            if (this.auser.username == '') {
                that.$alertMessage("子账号账号不能为空");
                return;
            }

            if (!reg.test(that.auser.username)) {
                  that.$alertMessage('帐号仅可接受英数字元, 长度限制4~12码!', '温馨提示');
                    return;
                }

            //帐户名已存在这个接口，有问题


            let res = await this.$get(`${window.url}/admin/auser/checkUsername?username=`+ this.auser.username + "&id=");

              if(res.code===200){
                flag = true;

              } else {
                flag = false;
                that.$alertMessage('用户名存在!', '温馨提示');
                return;
              }


          } else {
            console.log('update');

          }

            


          if(flag) {
            let url = this.auser.id == "" ? "admin/auser/addChildUser" : "admin/auser/editChildUser";


            let data = await this.$post(`${window.url}/`+ url,this.auser);
              if(+data.code===200) {
                that.$success('操作成功');
                that.showList = true;
                that.userList();
              } else {
                that.$error(data.msg);
              }
          }


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
              if (res.auser.functionIdList[index] == 7) {//绑定IP权限
                  that.passwordAuthority = 1;
              }
            });

        }


        let url = 'admin/auser/childUser?1=1';


        let data = await this.$get(`${window.url}/`+ url +`&currentPage=`+this.page.currentPage+`&pageSize=`+this.page.pageSize);
            if(+data.code===200) {

              this.auserList = data.page.list;
                if (data.page.totalPage == 0) {
                    that.page.totalPage = 1;
                } else {
                    that.page.totalPage = data.page.totalPage;
                    that.page.totalCount = data.page.totalCount;
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

.table-btngroup {
    margin-top: 20px;
  }
</style>
