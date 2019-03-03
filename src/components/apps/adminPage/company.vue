<template>
  <div id="youxishezhi" class="content-main">
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>公司管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="nav">
        <span>公司名:
        <el-select v-model="q.id" placeholder="请选择" size="mini">
          <el-option
            v-for="item in companyList"
            :key="item.id"
            :label="item.username"
            :value="item.id">
          </el-option>
        </el-select>
      </span>
      <button class="btn btn-blue" @click="userList()">查询</button>
    </div>
    <div class="nav">
        <button class="btn btn-blue" @click="add()">新增公司</button>
    </div>

    <div class="portlet portlet-add">

      <div class="tab" v-if="showList">

        <table class="main-tables">
            <tr>
              <th>在线</th>
                <th>体系</th>
                <th>公司账号</th>
                <th>公司名称</th>
                <th>金额</th>
                <th>股东</th>
                <th>总代理人数</th>
                <th>代理人数</th>
                <th>会员人数</th>
                <th>增设日期</th>
                <th>账号</th>
                <th>冻结</th>
                <th>收单/停押</th>
                <th>操作</th>
            </tr>
            <tr v-for="auser in auserList">
                <td v-if="auser.isOnline==0">不在线</td><td v-else>在线</td>
                <td>
                    <input @click="viewSystem(auser.id,auser.userClass)" type="button" class="btn" data-toggle="modal" data-target="#systemList" value="查看">　
                </td>
                <td>{{auser.username}}</td>
                <td>{{auser.nickname}}</td>
                <td><span class="text-info">{{auser.quota}}</span></td>
                <td>{{auser.partnerNum}}</td>
                <td>{{auser.generalAgentNum}}</td>
                <td class="text-success">{{auser.agentNum}}</td>
                <td class="text-success">{{auser.memberNum}}</td>
                <td class="text-success">{{$timestampToTime(auser.createDate)}}</td>
                <td v-if="auser.status==0">停用</td><td v-else>启用</td>
                <td v-if="auser.isFrozen==0">否</td><td v-else>是</td>
                <td v-if="auser.tingyaShouya==0">停押</td><td v-else>收押</td>
                <td>
                    <button class="btn" @click="update(auser.id)" type="button">修改资料</button>
                    <button class="btn" @click="javascript:window.location.href='../../modules/bocai/dewaterSet2.html?userId='+auser.id" >退水设定</button>
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
            公司账号　　
        </h3>
        <table class="main-tables coinfo-card">
            <tr>
                <td colspan="3" class="coheader">基本资料设定</td>
            </tr>
            <tr>
                <th>运营名称</th>
                <td v-if="auser.id!=null && auser.id!='' ">{{auser.pusername}}</td>
                <td v-else>
                    <select v-model="auser.pid">
                        <option :value="pAUser.id" v-for="pAUser in pAUserList">{{pAUser.username}}</option>
                    </select>
                </td>
                <td></td>
            </tr>
            <tr>
                <th>公司名称</th>
                <td><input type="text" v-model="auser.nickname" placeholder="请输入名称"></td>
                <td>请输入名称。</td>
            </tr>
            <tr>
                <th>公司账号</th>
                <td v-if="auser.id!=null && auser.id!=''">
                    <input type="text" v-model="auser.username" placeholder="请输入账号" disabled="disabled">
                    <input type="button" @click="checkUsername(auser.id)" value="检查账号是否可用"/></td>

                <td v-else>
                    <input type="text" v-model="auser.username" placeholder="请输入账号">
                    <input type="button"  @click="checkUsername(auser.id)"  value="检查账号是否可用"/>
                </td>
                <td>帐号仅可接受英数字元, 长度限制4~12码</td>
            </tr>
            <tr>
                <th>设置密码</th>
                <td><input type="password" v-model="auser.password" v-value="auser.password" placeholder="请输入密码"></td>
                <td>密码长度不小于6位,且需数字字母混用(不可接受!#$&*+.=@|等特殊字符)同组密码限用30天。</td>
            </tr>
            <tr>
                <th>重复密码</th>
                <td><input type="password" v-model="auser.repassword" v-value="auser.password" placeholder="请再次输入密码">
                </td>
            </tr>
            <tr>
                <th>账号状态</th>
                <td>
                    <input type="radio" name="status" value="1" v-model="auser.status" id="status1"> 启用　
                    <input type="radio" name="status" value="0" v-model="auser.status" checked id="status2"> 停用
                </td>
                <td>是否选择启用/停用账号</td>
            </tr>
            <tr>
                <th>冻结账号</th>
                <td>
                    <input type="radio" name="isFrozen" value="1" v-model="auser.isFrozen" id="isFrozen1"> 是　
                    <input type="radio" name="isFrozen" value="0" v-model="auser.isFrozen" id="isFrozen2" checked> 否
                </td>
                <td>请选择是否冻结</td>
            </tr>
            <tr>
                <th>允许补货</th>
                <td>
                    <input type="radio" name="isReplenishment" value="1" v-model="auser.isReplenishment"
                           id="isReplenishment1"> 开启　
                    <input type="radio" name="isReplenishment" value="0" v-model="auser.isReplenishment"
                           id="isReplenishment2" checked> 关闭
                </td>
                <td>请选择开启或关闭</td>
            </tr>
            <tr>
                <th>停押/收单</th>
                <td>
                    <input type="radio" name="tingyaShouya" value="1" v-model="auser.tingyaShouya" id="tingyaShouya1">
                    收单　
                    <input type="radio" name="tingyaShouya" value="0" v-model="auser.tingyaShouya" id="tingyaShouya2"
                           checked> 停押
                </td>
                <td>请选择收单或停押</td>
            </tr>
            <tr>
                <td colspan="3" class="coheader">基础功能设置</td>
            </tr>
            <tr>
                <th>消费模式</th>
                <td v-if="auser.id!=''">
                    <input type="radio" name="cashCredit" value="0" @click="isShow('0')" v-model="auser.cashCredit"
                           disabled="disabled"> 现金模式　
                    <input type="radio" name="cashCredit" value="1" @click="isShow('1')" v-model="auser.cashCredit"
                           disabled="disabled"> 信用模式
                </td>

                <td v-else>
                    <input type="radio" name="cashCredit" value="0" @click="isShow('0')" v-model="auser.cashCredit"
                           id="cashCredit0"> 现金模式　
                    <input type="radio" name="cashCredit" value="1" @click="isShow('1')" v-model="auser.cashCredit"
                           id="cashCredit1"> 信用模式
                </td>

                <td>请选择结算方式</td>
            </tr>
            <tr>
                <th>功能显示</th>
                <td>
                    <span v-for="functions in functionList">
                        <input type="checkbox" :value="functions.id" v-model="auser.functionIdList">{{functions.authorityName}}
                    </span>
                </td>
                <td>请选择权限</td>
            </tr>

            <tbody v-model="xinyongShow" v-if="xinyongShow">
            <tr>
                <td colspan="3" class="coheader">信用额度设定</td>
            </tr>
            <tr>
                <th>额度类型</th>
                <td>
                    <div class="btn-group">
                        <select v-model="auser.creditType">
                            <option value="1">第二天还原额度</option>
                            <option value="0">正常交易</option>
                        </select>
                    </div>
                </td>
                <td>请设定信用信息</td>
            </tr>
            <tr>
                <th>信用额度</th>
                <td>
                    {{auser.viewquota}}　
                    <input type="button" class="btn" data-toggle="modal" data-target="#modifyCredit" value="存取信用额度">　
                    <input type="button" class="btn" onclick="javascript:window.location.href='../../modules/user/quotaInfo.html?userId='+vm.auser.id" value="查看信用记录">
                </td>
                <td>请设定信用额度</td>
            </tr>
            </tbody>

            <tbody v-model="xinyongShow" v-else="!xinyongShow">
            <tr>
                <td colspan="3" class="coheader">现金设置</td>
            </tr>
            <tr>
                <th>现金</th>
                <td>
                    {{auser.viewquota}}<input type="text" v-model="auser.quota" placeholder="请输入金额">
                </td>
                <td></td>
            </tr>
            </tbody>

            <tr>
                <td colspan="3" class="coheader">占成分配</td>
            </tr>
            <tr>
                <th>公司占成</th>
                <td>
                    <div class="btn-group">
                        <select class="form-control" v-model="auser.aUserOccupied.cChangeAllotOccupied">
                            <option value="100">100%</option>
                            <option value="99">99%</option>
                            <option value="98">98%</option>
                            <option value="97">97%</option>
                            <option value="96">96%</option>
                            <option value="95">95%</option>
                            <option value="94">94%</option>
                            <option value="93">93%</option>
                            <option value="92">92%</option>
                            <option value="91">91%</option>
                            <option value="90">90%</option>
                            <option value="89">89%</option>
                            <option value="88">88%</option>
                            <option value="87">87%</option>
                            <option value="86">86%</option>
                            <option value="85">85%</option>
                            <option value="84">84%</option>
                            <option value="83">83%</option>
                            <option value="82">82%</option>
                            <option value="81">81%</option>
                            <option value="80">80%</option>
                            <option value="75">75%</option>
                            <option value="70">70%</option>
                            <option value="65">65%</option>
                            <option value="60">60%</option>
                            <option value="55">55%</option>
                            <option value="50">50%</option>
                            <option value="45">45%</option>
                            <option value="40">40%</option>
                            <option value="35">35%</option>
                            <option value="30">30%</option>
                            <option value="25">25%</option>
                            <option value="20">20%</option>
                            <option value="15">15%</option>
                            <option value="10">10%</option>
                            <option value="5">5%</option>
                            <option value="0">不占成</option>
                        </select>
                    </div>
                </td>
                <td></td>
            </tr>
            <tr>
                <th>占成回收</th>
                <td>
                    <input type="radio" name="optionsRadios" value="0" v-mode="auser.occupiedRecovery"
                           id="occupiedRecovery1"> 多余占成返回公司　
                    <input type="radio" name="optionsRadios" value="1" v-mode="auser.occupiedRecovery"
                           id="occupiedRecovery2" checked="checked"> 多余占成返回直接上级
                </td>
                <td></td>
            </tr>

            <tr>
                <td colspan="3" class="coheader">游戏设置</td>
            </tr>
            <tr>
                <th>盘口设置</th>
                <td>
                    <span class="checkbox-inline">
                        <input type="checkbox" :value="auser.handicapA" v-model="auser.handicapA">盘口A
                    </span>
                    <span class="checkbox-inline">
                        <input type="checkbox" :value="auser.handicapB" v-model="auser.handicapB">盘口B
                    </span>
                    <span class="checkbox-inline">
                        <input type="checkbox" :value="auser.handicapC" v-model="auser.handicapC">盘口C
                    </span>
                    <span class="checkbox-inline">
                        <input type="checkbox" :value="auser.handicapD" v-model="auser.handicapD">盘口D
                    </span>
                </td>
                <td></td>
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
                that.$error('r.msg');
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
                    this.page.totalPage = 1;
                } else {
                    this.page.totalPage = data.page.totalPage;
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
