<template>
  <div id="youxishezhi" class="content-main">
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>帐号管理</el-breadcrumb-item>
        <el-breadcrumb-item>公司管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="nav">
        <span>公司名:
        <el-select v-model="q.id" placeholder="请选择" size="mini">
          <el-option
            :key="'all'"
            :label="'全部'"
            :value="''">
          </el-option>
          <el-option
            v-for="item in companyList"
            :key="item.id"
            :label="item.username"
            :value="item.id">
          </el-option>
        </el-select>
      </span>
      <button class="btn btn-blue" @click="query()">查询</button>
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
                    <input @click="viewSystem(auser.id,auser.userClass)" type="button" class="btn" :value="'查看'">　
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
                    <button class="btn" @click="tuishuiset(auser)" >退水设定</button>
                    <button class="btn" @click="" >查看信用记录</button>
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
            <tr v-if="isshowpidlist">
                <th>运营名称</th>
               <!--  <td class="tl" v-if="ruleId == 2">{{yunyingFuji.username}}</td>
                <td class="tl" v-else-if="auser.id!=null && auser.id!='' ">{{auser.pusername}}</td> -->
                <td class="tl">
                    <el-select v-model="auser.pid" placeholder="请选择" size="mini" @change="getshangjidaili">
                      <el-option v-for="(item,index) in pAUserList" :value="item.id" :key="item.id" :label="item.username"></el-option> 
                    </el-select>
                </td>
                <td class="tl"></td>
            </tr>
            <tr>
                <th>公司名称</th>
                <td class="tl"><input type="text" v-model="auser.nickname" placeholder="请输入名称"></td>
                <td class="tl">请输入名称。</td>
            </tr>
            <tr>
                <th>公司账号</th>
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
            </tr>
            <tr>
                <th>账号状态</th>
                <td class="tl">
                    <label><input type="radio" name="status" value="1" v-model="auser.status" checked> 启用　</label> 
                    <label><input type="radio" name="status" value="0" v-model="auser.status" > 停用</label> 
                </td>
                <td class="tl">是否选择启用/停用账号</td>
            </tr>
            <tr>
                <th>冻结账号</th>
                <td class="tl">
                    <label> 
                    <input type="radio" name="isFrozen" value="1" v-model="auser.isFrozen" id="isFrozen1"> 是　</label> 
                    <label> 
                    <input type="radio" name="isFrozen" value="0" v-model="auser.isFrozen" id="isFrozen2" checked> 否</label> 
                </td>
                <td class="tl">请选择是否冻结</td>
            </tr>
            <!-- <tr>
                <th>允许补货</th>
                <td class="tl">
                    <label> 
                    <input type="radio" name="isReplenishment" value="1" v-model="auser.isReplenishment"
                           id="isReplenishment1"> 开启　</label> 
                    <label> 
                    <input type="radio" name="isReplenishment" value="0" v-model="auser.isReplenishment"
                           id="isReplenishment2" checked> 关闭</label> 
                </td>
                <td class="tl">请选择开启或关闭</td>
            </tr> -->
            <tr>
                <th>停押/收单</th>    
                <td class="tl">
                    <label> 
                    <input type="radio" name="tingyaShouya" value="1" v-model="auser.tingyaShouya" id="tingyaShouya1">
                    收单　</label> 
                    <label> 
                    <input type="radio" name="tingyaShouya" value="0" v-model="auser.tingyaShouya" id="tingyaShouya2"
                           checked> 停押</label> 
                </td>
                <td class="tl">请选择收单或停押</td>
            </tr>
            <tr>
                <td colspan="3" class="coheader">基础功能设置</td>
            </tr>
            <tr>
                <th>消费模式</th>
                <td class="tl" v-if="auser.id!=''">
                    <label> 
                    <input type="radio" name="cashCredit" value="0" @click="isShow('0')" v-model="auser.cashCredit"
                           disabled="disabled"> 现金模式　</label> 
                    <label> 
                    <input type="radio" name="cashCredit" value="1" @click="isShow('1')" v-model="auser.cashCredit"
                           disabled="disabled"> 信用模式</label> 
                </td>

                <td class="tl" v-else>
                    <label> 
                    <input type="radio" name="cashCredit" value="0" @click="isShow('0')" v-model="auser.cashCredit"
                           id="cashCredit0"> 现金模式　</label> 
                    <label> 
                    <input type="radio" name="cashCredit" value="1" @click="isShow('1')" v-model="auser.cashCredit"
                           id="cashCredit1"> 信用模式</label> 
                </td>

                <td class="tl">请选择结算方式</td>
            </tr>
            <tr>
                <th>功能显示</th>

                <!-- <td class="tl" v-if="auser.id!=null && auser.id!='' ">
                    {{auser.pusername}}
                </td>
                <td class="tl" v-else> -->

                <td class="tl">
                    <label v-for="functions in fujiFunctionList">
                        <input type="checkbox" :value="functions.id" v-model="auser.functionIdList">{{functions.authorityName}}
                    </label> 
                </td>
                <td class="tl">请选择权限</td>
            </tr>

            <tbody v-model="xinyongShow" v-if="xinyongShow">
            <tr>
                <td colspan="3" class="coheader">信用额度设定</td>
            </tr>
            <tr>
                <th>额度类型</th>
                <td class="tl">
                    <div class="btn-group">
                        <select v-model="auser.creditType">
                            <option value="1">第二天还原额度</option>
                            <option value="0">正常交易</option>
                        </select>
                    </div>
                </td>
                <td class="tl">请设定信用信息</td>
            </tr>

            <tr>
                <th>信用额度</th>
                <td class="tl">
                    {{auser.viewquota}}　
                    <input type="button" class="btn" @click="cunquxinyong()" value="存取信用额度">　
                </td>
                <td class="tl">请设定信用额度</td>
            </tr>
            </tbody>

            <tbody v-model="xinyongShow" v-else="!xinyongShow">
            <tr>
                <td colspan="3" class="coheader">现金设置</td>
            </tr>
            <tr>
                <th>现金</th>
                <td class="tl">
                    {{auser.viewquota}}<input type="text" v-model="auser.quota" placeholder="请输入金额">
                </td>
                <td class="tl">单次充值不能超过1千万</td>
            </tr>
            </tbody>

            <tr>
                <td colspan="3" class="coheader">占成分配</td>
            </tr>
            <tr>
                <th>公司占成</th>
                <td class="tl">
                    <div class="btn-group">
                        <select class="form-control" v-model="auser.aUserOccupied.cChangeAllotOccupied">
                            <option value="100">100%</option>
                            <!-- <option value="99">99%</option>
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
                            <option value="0">不占成</option> -->
                        </select>
                    </div>
                </td>
                <td class="tl"></td>
            </tr>
            <tr>
                <th>占成回收</th>
                <td class="tl">
                    <label><input v-model="auser.occupiedRecovery" type="radio" value="0"> 多余占成返回公司 </label> 
                    <label><input v-model="auser.occupiedRecovery" type="radio" value="1"> 多余占成返回直接上级 </label> 
                </td>
                <td class="tl"></td>
            </tr>
            <tr>
                <td colspan="3" class="coheader">游戏设置</td>
            </tr>
            <tr>
                <th>盘口设置</th>
                <td class="tl">
                    <label>
                        <input type="checkbox" v-model="auser.handicapA">盘口A
                    </label> 
                    <label>
                        <input type="checkbox" v-model="auser.handicapB">盘口B
                    </label> 
                    <label>
                        <input type="checkbox" v-model="auser.handicapC">盘口C
                    </label> 
                    <label>
                        <input type="checkbox" v-model="auser.handicapD">盘口D
                    </label> 
                </td>
                <td class="tl"></td>
            </tr>
        </table>

        <p class="table-btngroup">
            <button class="btn btn-common btn-primary" @click="saveOrUpdate" type="button">保存</button>
            　　　　　
            <button class="btn btn-common btn-danger" @click="reload" type="button">取消</button>
        </p>

      </div>


    </div>


    <el-dialog :visible.sync="dialogvisibletixi" width="40%" :title="'体系查询'">
      <el-table
        :data="systemList"
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

    <el-dialog :visible.sync="modifyCreditLabel" width="40%" :title="'提现存取信用额度'">
        <div class="portlet portlet-add">
            <div class="tab">
                <table class="main-tables">
                    <tr>
                    <th>类型</th>
                    <td v-if="auser.id!=''">
                        <input type="radio" name="optionsRadios3" v-model="auser.quotaInfo.quotaType" value="1" checked>
                        充值　
                    </td>
                    <td v-else>
                        <input type="radio" name="optionsRadios3" v-model="auser.quotaInfo.quotaType" value="1" checked>
                        充值　
                        </td>
                </tr>
                <tr >
                    <th v-if="auser.cashCredit == 0">
                        <select v-model="auser.quotaInfo.quotaAccount" style="width: 90%;">
                            <option value="1">微信</option>
                            <option value="2">支付宝</option>
                            <option value="3">银行卡</option>
                        </select>
                    </th>
                    <th v-else>
                        默认方式金额
                    </th>
                    <td><input type="text" v-model="auser.quota" style="width: 90%;"
                               placeholder="请输入金额"></td>
                </tr>
                <tr>
                    <th>备注</th>
                    <td><textarea rows="3" v-model="auser.quotaInfo.quotaRemark" style="width: 90%;"
                                  placeholder="请输入备注"></textarea></td>
                </tr>
                </table>
            </div>
        </div>
            <div class="layer-btngroup">
                <button class="btn btn-danger" @click="modifyCreditLabel = false">取消</button>
                　
                <button class="btn btn-primary" @click="quotaSave()">保存</button>
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
            pid: '',
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
                cChangeAllotOccupied: 100,
            },
            occupiedRecovery: 0

        },
        systemList: {},//体系列表
        pAUserList: {},//父类列表
        functionList: {},//功能列表
        xinyongShow: false,
        auserList: {},//当前数据列表
        companyList: {},//公司列表

        fujiUserInfo: {},
        fujiFunctionList: [],
        isshowpidlist: false,

        yunyingFuji:{}
    }
  },
  computed: {
    ...mapGetters({
        ruleId:'getruleId'
    })
  },
  created() {
    this.getgongsi();
    this.userList('');
    this.getMenuList();
  },
  mounted(){
  },
  methods: {
    async getshangjidaili(data) {
      // let res = await this.$get(`${window.url}/admin/auser/userInfo?userId=`+data+`&ruleId=6`);
      let res = await this.$get(`${window.url}/admin/auser/userInfo?userId=`+data);
      if(+res.code===200) {

        if (res.auser != null) {

          this.fujiUserInfo = res.auser;

          for(let n in this.functionList) {

            for(let x in this.fujiUserInfo.functionIdList) {
                if(this.fujiUserInfo.functionIdList[x] == this.functionList[n].id) {
                    this.fujiFunctionList.push(this.functionList[n]);
                }
            }

          }

        }
      }

    },

    async tuishuiset(item) {
      store.commit('updateupUserInfo', item);
      this.$router.push({name:'tuishuisetting'});
    },
    cunquxinyong() {

        this.modifyCreditLabel = true;
    },
    qingkong() {

            this.auser.id= "";
            this.auser.pid = '';
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
            this.auser.ruleId= 3;
            this.auser.quota= "";
            this.auser.viewquota= "";
            this.auser.quotaInfo.quotaType= 1;
            this.auser.quotaInfo.quotaAccount= 1;
            this.auser.quotaInfo.quotaAmount= "";
            this.auser.quotaInfo.quotaRemark= "";
            this.auser.aUserOccupied.cChangeAllotOccupied= 100;
            this.auser.occupiedRecovery= 0;

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
            this.isshowpidlist = false;
            this.title = "新增";
            this.pid = "";
            this.fujiFunctionList = [];
            this.qingkong();

            let data = await this.$get(`${window.url}/admin/auser/userInfo?ruleId=3`);
                if(+data.code===200) {
                    if (data.auser != null) {

                        console.log('this.ruleId',this.ruleId);
                        

                        if(this.ruleId == 2) {
                            this.yunyingFuji = data.auser;
                            this.auser.pid = data.auser.id;

                            console.log('this.yunyingFuji',this.yunyingFuji);
                            console.log('this.functionList',this.functionList);

                            for(let n in this.functionList) {

                                for(let x in this.yunyingFuji.functionIdList) {
                                    if(this.yunyingFuji.functionIdList[x] == this.functionList[n].id) {
                                        this.fujiFunctionList.push(this.functionList[n]);
                                    }
                                }

                              }

                        } else {
                            this.auser.pid = data.auser.id;
                            this.auser.pusername = data.auser.username;
                        }
                        
                    } else {
                        this.auser.pid = "";
                        this.pAUserList = data.pAUserList;
                        this.isshowpidlist = true;
                    }

                    console.log('this.auser',this.auser);

                } else {
                    //that.$error('data.msg');
                }

        },
        async update(userId) {
            this.isshowpidlist = false;
            this.showList = false;
            this.fujiFunctionList = [];
            this.title = "修改";

            let data = await this.$get(`${window.url}/admin/auser/userInfo?userId=` + userId + "&ruleId=3");
                if(+data.code===200) {
                    this.auser = data.auser;
                    this.auser.quotaInfo = {
                        quotaType: 1,
                        quotaAccount: 1,
                        quotaAmount: "",
                        quotaRemark: ""
                    };
                    this.auser.viewquota = data.auser.quota;
                    this.auser.repassword = data.auser.password;
                    this.auser.quota = 0;
                    if (data.auser.cashCredit == 0) {
                        this.xinyongShow = false;
                    } else {
                        this.xinyongShow = true;
                    }

                    for(let n in this.functionList) {

                                for(let x in this.auser.functionIdList) {
                                    if(this.auser.functionIdList[x] == this.functionList[n].id) {
                                        this.fujiFunctionList.push(this.functionList[n]);
                                    }
                                }

                              }

                              
                } else {
                    //that.$error('data.msg');
                }

        },
        async saveOrUpdate() {

             let that = this;

               let flag = true;
               let reg = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{4,12})$/;

              if (!this.auser.nickname || this.auser.nickname == '') {
                    that.$alertMessage("公司名称不能为空");
                    return;
                }

                if (+this.auser.quota > 10000000) {
                    that.$alertMessage("单次充值不能超过1千万");
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


                let numMatch = /^[0-9]*$/;
                if (!numMatch.test(this.auser.quota)) {
                    this.$alertMessage('额度不正确!', '温馨提示');
                    return;
                }
                if (!numMatch.test(this.auser.quotaInfo.quotaAmount)) {
                    this.$alertMessage('额度不正确!', '温馨提示');
                    return;
                }


              if(!this.auser.id || this.auser.id == "") {
                console.log('new');

                if (this.auser.username == '') {
                    that.$alertMessage("公司账号不能为空");
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

            
            if (this.auser.handicapA == true) {
                this.auser.handicapA = 1;
            } else if (this.auser.handicapA == false) {
                this.auser.handicapA = 0;
            }
            if (this.auser.handicapB == true) {
                this.auser.handicapB = 1;
            } else if (this.auser.handicapB == false) {
                this.auser.handicapB = 0;
            }
            if (this.auser.handicapC == true) {
                this.auser.handicapC = 1;
            } else if (this.auser.handicapC == false) {
                this.auser.handicapC = 0;
            }
            if (this.auser.handicapD == true) {
                this.auser.handicapD = 1;
            } else if (this.auser.handicapD == false) {
                this.auser.handicapD = 0;
            }


              if(flag) {

                this.auser.status = this.auser.status*1;
                this.auser.isFrozen = this.auser.isFrozen*1;
                this.auser.isReplenishment = this.auser.isReplenishment*1;
                this.auser.tingyaShouya = this.auser.tingyaShouya*1;
                this.auser.aUserOccupied.cChangeAllotOccupied = this.auser.aUserOccupied.cChangeAllotOccupied*1;

                let url = this.auser.id == "" ? "admin/auser/addCompany" : "admin/auser/editCompany";

                console.log('this.auser',JSON.stringify(this.auser));


                    const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                      });
                    await that.$post(`${window.url}/`+ url,this.auser).then((res) => {
                      that.$handelResponse(res, (result) => {
                        console.log('?????');
                        loading.close();

                        if(result.code===200){
                            that.$success('操作成功');
                            that.showList = true;
                            that.userList('');
                        } else {
                            that.$error(result.msg);
                        }
                      })
                    });

                // let data = await this.$post(`${window.url}/`+ url,this.auser);
                //   if(+data.code===200) {
                //     that.$success('操作成功');
                //     that.showList = true;
                //     that.userList('');
                //   } else {
                //     that.$error(data.msg);
                //   }
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
                this.$alertMessage('公司账号不能为空!', '温馨提示');
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
        async viewSystem(id, userClass) {//查看体系
            let data = await this.$get(`${window.url}/admin/auser/systemList?id=` + id + "&userClass=" + userClass);
            if(+data.code===200) {

              this.systemList = data.list;

              this.dialogvisibletixi = true;

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

        let url = 'admin/auser/userList?ruleId=3';

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


