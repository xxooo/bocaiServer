<template>
  <div id="youxishezhi" class="content-main">
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>帐号管理</el-breadcrumb-item>
        <el-breadcrumb-item>运营管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="nav">
        <button class="btn btn-blue" @click="add()">新增运营</button>
    </div>

    <div class="portlet portlet-add">

      <div class="tab" v-if="showList">

        <table class="main-tables">
            <tr>
                <th>在线</th>
                <th>运营账号</th>
                <th>运营名称</th>
                <th>公司</th>
                <th>股东</th>
                <th>总代理人数</th>
                <th>代理人数</th>
                <th>会员人数</th>
                <th>增设日期</th>
                <th>账号状态</th>
                <th>操作</th>
            </tr>
            <tr v-for="auser in auserList">
                <td v-if="auser.isOnline==0">不在线</td><td v-else>在线</td>
                <td>{{auser.username}}</td>
                <td>{{auser.nickname}}</td>
                <td>{{auser.companyNum}}</td>
                <td>{{auser.partnerNum}}</td>
                <td>{{auser.generalAgentNum}}</td>
                <td class="text-success">{{auser.agentNum}}</td>
                <td class="text-success">{{auser.memberNum}}</td>
                <td class="text-success">{{$timestampToTime(auser.createDate)}}</td>
                <td v-if="auser.status==0">停用</td><td v-else>启用</td>
                <td>
                    <button class="btn" @click="update(auser.id)" type="button">修改资料</button>
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
            运营账号　　
        </h3>
        <table class="main-tables coinfo-card">
            <tr>
                <td colspan="3" class="coheader">基本资料设定</td>
            </tr>
            <tr>
                <th>运营名称</th>
                <td class="tl"><input type="text" v-model="auser.nickname" placeholder="请输入名称"></td>
                <td class="tl">请输入名称。</td>
            </tr>
            <tr>
                <th>运营账号</th>
                <td class="tl" v-if="auser.id!=null && auser.id!=''">
                    <input type="text" v-model="auser.username" placeholder="请输入账号" disabled="disabled">
                    <input type="button" @click="checkUsername(auser.id)" :value="'检查账号是否可用'"/></td>

                <td class="tl" v-else>
                    <input type="text" v-model="auser.username" placeholder="请输入账号">
                    <input type="button"  @click="checkUsername(auser.id)"  :value="'检查账号是否可用'"/>
                </td>
                <td class="tl">帐号仅可接受英数字元, 长度限制4~12码</td>
            </tr>
            <tr>
                <th>设置密码</th>
                <td class="tl"><input type="password" v-model="auser.password" placeholder="请输入密码"></td>
                <td class="tl">密码长度不小于6位,且需数字字母混用(不可接受!#$&*+.=@|等特殊字符)同组密码限用30天。</td>
            </tr>
            <tr>
                <th>重复密码</th>
                <td class="tl"><input type="password" v-model="auser.repassword" placeholder="请再次输入密码">
                </td>
                <td class="tl">再次输入密码</td>
            </tr>
            <tr>
                <th>账号状态</th>
                <td class="tl">
                    <label> <input type="radio" name="status" value="1" v-model="auser.status" checked id="status1"> 启用</label> 　
                    <label> <input type="radio" name="status" value="0" v-model="auser.status" id="status2"> 停用</label> 
                </td>
                <td class="tl">是否选择启用/停用账号</td>
            </tr>
            <tr>
                <th>功能显示</th>
                <td class="tl">
                    <label v-for="functions in functionList">
                        <input type="checkbox" :value="functions.id" v-model="auser.functionIdList">{{functions.authorityName}}
                    </label> 
                </td>
                <td class="tl">请选择权限</td>
            </tr>

        </table>

        <p class="table-btngroup">
            <button class="btn btn-common btn-primary" @click="saveOrUpdate" type="button">保存</button>
            　　　　　
            <button class="btn btn-common btn-danger" @click="reload" type="button">取消</button>
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
      dialogvisibletixi: false,
      modifyCreditLabel: false,

      page: {
            totalPage: 1,
            currentPage:1,
            pageSize: 10
        },
        q: {//查询条件
            id: "",
        },
        showList: true,
        title: null,
        auser: {//对象
            id: "",
            functionIdList: [],
            cashCredit: 0,
            tingyaShouya: 0,
            isReplenishment: 0,
            isFrozen: 0,
            status: 1,
            occupied: 0,
            handicapA: 1,
            handicapB: 1,
            handicapC: 1,
            handicapD: 1,
            ruleId: 3,
            quota: "",
            viewquota: "",
            quotaInfo: {//充值/提现明细
                quotaType: 1,
                quotaAccount: 1,
                quotaAmount: "",
                quotaRemark: "",
            },
            aUserOccupied: {//占成
                cChangeAllotOccupied: 0,
            },

        },
        systemList: {},//体系列表
        pAUserList: {},//父类列表
        functionList: {},//功能列表
        xinyongShow: false,
        auserList: {},//当前数据列表
        companyList: {},//公司列表
    }
  },
  computed: {
    ...mapGetters({
    })
  },
  created() {
    this.getgongsi();
    this.userList('');
  },
  mounted(){
  },
  methods: {
    async tuishuiset(item) {
      store.commit('updateupUserInfo', item);
      this.$router.push({name:'tuishuisetting'});
    },
    cunquxinyong() {

        this.modifyCreditLabel = true;
    },
    qingkong() {

            this.auser.id= "";
            this.auser.functionIdList= [];
            this.auser.cashCredit= 0;
            this.auser.tingyaShouya= 0;
            this.auser.isReplenishment= 0;
            this.auser.isFrozen= 0;
            this.auser.status= 1;
            this.auser.occupied= 0;
            this.auser.handicapA= 1;
            this.auser.handicapB= 1;
            this.auser.handicapC= 1;
            this.auser.handicapD= 1;
            this.auser.ruleId= 2;
            this.auser.quota= "";
            this.auser.viewquota= "";
            this.auser.quotaInfo.quotaType= 1;
            this.auser.quotaInfo.quotaAccount= 1;
            this.auser.quotaInfo.quotaAmount= "";
            this.auser.quotaInfo.quotaRemark= "";
            this.auser.aUserOccupied.cChangeAllotOccupied= 0;

            this.auser.nickname = '';
            this.auser.username = '';
            this.auser.password = '';
            this.auser.repassword = '';

    },

   reload() {
            this.showList = true;
            this.userList(this.q.id);
        },
        query() {
            this.reload();
        },
        async add() {
            this.showList = false;
            this.title = "新增";
            this.pid = "";
            this.qingkong();

            let data = await this.$get(`${window.url}/admin/auser/userInfo?ruleId=3`);
                if(+data.code===200) {
                    if (data.auser != null) {
                        this.auser.pid = data.auser.id;
                        this, auser.pusername = data.auser.username;
                    } else {
                        this.auser.pid = "";
                        this.pAUserList = data.pAUserList;
                    }
                } else {
                    //that.$error('data.msg');
                }

            this.getMenuList();
        },
        async update(userId) {

            this.showList = false;
            this.title = "修改";

            let data = await this.$get(`${window.url}/admin/auser/userInfo?userId=` + userId + "&ruleId=3");
                if(+data.code===200) {
                    this.auser = data.auser;
                    this.auser.quotaInfo = {
                        quotaType: 1,
                        quotaAccount: 1,
                        quotaAmount: "",
                        quotaRemark: "",
                    };
                    this.auser.viewquota = data.auser.quota;
                    this.auser.repassword = data.auser.password;
                    this.auser.quota = 0;
                    if (data.auser.cashCredit == 0) {
                        this.xinyongShow = false;
                    } else {
                        this.xinyongShow = true;
                    }
                } else {
                    //that.$error('data.msg');
                }

            this.getMenuList();
        },
        async saveOrUpdate() {

             let that = this;

               let flag = true;
               let reg = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{4,12})$/;

              if (!this.auser.nickname || this.auser.nickname == '') {
                    that.$alertMessage("运营名称不能为空");
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
                    that.$alertMessage("运营账号不能为空");
                    return;
                }

                if (!reg.test(that.auser.username)) {
                      that.$alertMessage('帐号仅可接受英数字元, 长度限制4~12码!', '温馨提示');
                        return;
                    }


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

                this.auser.status = this.auser.status*1;
                
                let url = this.auser.id == "" ? "admin/auser/addOperate" : "admin/auser/editOperate";

                let data = await this.$post(`${window.url}/`+ url,this.auser);
                  if(+data.code===200) {
                    that.$success('操作成功');
                    that.showList = true;
                    that.userList('');
                  } else {
                    that.$error(data.msg);
                  }
              }

        },
        async getMenuList() {

            let data = await this.$get(`${window.url}/admin/menu/function`);
                if(+data.code===200) {
                    this.functionList = data.list;
                } else {

                }

        },
        isShow(isShow) {
            if (isShow == 0) {
                this.xinyongShow = false;
            } else {
                this.xinyongShow = true;
            }
        }, 
        async checkUsername(userId) {
            let that = this;

            let reg = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{4,12})$/;
            if (this.auser.username == '') {
                this.$alertMessage('运营账号不能为空!', '温馨提示');
                return true;
            }
            if (!reg.test(this.auser.username)) {
                this.$alertMessage('帐号仅可接收数字加字母!', '温馨提示');
                return true;
            }

            let data = await this.$get(`${window.url}/admin/auser/checkUsername?username=` + this.auser.username + "&id=" + userId);
            if(+data.code===200) {
                that.$success('账号可用');

            } else {
                that.$error('data.msg');
            }
        },
        quotaSave() {//重新修改信用额度显示
            this.auser.viewquota = Number(this.auser.viewquota) + Number(this.auser.quota);

            this.modifyCreditLabel = false;
        },


    handleCurrentChange(cpage) {
      this.page.currentPage = cpage;
      this.userList('');
    },
    async userList(userId) {
        let that = this;

        let url = 'admin/auser/userList?ruleId=2';

        if (null != userId && '' != userId) {
            url = url + "&id=" + userId
        }

        let data = await this.$get(`${window.url}/`+ url +`&currentPage=`+this.page.currentPage+`&pageSize=`+this.page.pageSize);
            if(+data.code===200) {

                this.auserList = data.page.list;
                if (data.page.totalPage == 0) {
                    this.page.totalPage = 1;
                } else {
                    this.page.totalPage = data.page.totalPage;
                    this.page.totalCount = data.page.totalCount;
                }


            }
      },
      async getgongsi() {
        let data = await this.$get(`${window.url}/admin/auser/ruleList?ruleId=3&isUp=1`);
            if(+data.code===200) {

              this.companyList = data.userList;

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

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .table-btngroup {
    margin-top: 20px;
  }

</style>


