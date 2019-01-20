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
        <el-breadcrumb-item :to="{ name: 'huiyuan' }">会员</el-breadcrumb-item>
        <el-breadcrumb-item>{{isNew?'新增会员':'修改资料'}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="portlet portlet-add">
      <div class="tab">
        <table>
          <thead>
            <tr>
              <th colspan="3">基本资料设定</th>
            </tr>
          </thead> 
          <tr>
            <td width="20%" class="tar">会员类型:</td> 
            <td class="tl">
              <label><input v-model="userType" type="radio" :value="1"> 普通会员 </label> 
              <label><input v-model="userType" type="radio" :value="2"> 直属会员 </label>
            </td> 
            <td class="tl" width="20%">请选择会员类型</td>
          </tr> 
          <tr v-if="userType == 1">
            <td class="tar">上级代理:</td> 
            <td class="tl">
              <el-select v-model="pid" placeholder="请选择" size="mini" @change="getshangjidaili">
                <el-option v-for="(item,index) in allDailiList" :value="item.id" :key="item.id" :label="item.username"></el-option> 
              </el-select>
            </td> 
            <td class="tl"><p>请选择代理</p></td>
          </tr>

          <template v-if="userType == 2">
            <tr>
              <td class="tar">上级直属:</td> 
              <td class="tl">
                <label><input v-model="zhishuPji" type="radio" :value="1" @click="zhishugongsi()"> 直属公司 </label> 
                <label><input v-model="zhishuPji" type="radio" :value="2" @click="zhishugudong()"> 直属股东 </label>
                <label><input v-model="zhishuPji" type="radio" :value="3" @click="zhishuzongdaili()"> 直属总代理 </label>
              </td> 
              <td class="tl" width="20%">请选择直属上级</td>
            </tr>
            <tr v-if="zhishuPji == 1">
              <td class="tar">上级公司:</td> 
              <td class="tl">
                <el-select v-model="pid" placeholder="请选择" size="mini">
                  <el-option v-for="(item,index) in zhishugongsiList" :value="item.id" :key="item.id" :label="item.username"></el-option> 
                </el-select>
              </td> 
              <td class="tl"><p>请选择上级公司</p></td>
            </tr>
            <tr v-if="zhishuPji == 2">
              <td class="tar">上级股东:</td> 
              <td class="tl">
                <el-select v-model="pid" placeholder="请选择" size="mini">
                  <el-option v-for="(item,index) in zhishugudongList" :value="item.id" :key="item.id" :label="item.username"></el-option> 
                </el-select>
              </td> 
              <td class="tl"><p>请选择上级股东</p></td>
            </tr>
            <tr v-if="zhishuPji == 3">
              <td class="tar">上级总代理:</td> 
              <td class="tl">
                <el-select v-model="pid" placeholder="请选择" size="mini">
                  <el-option v-for="(item,index) in zhishuzongdailiList" :value="item.id" :key="item.id" :label="item.username"></el-option> 
                </el-select>
              </td> 
              <td class="tl"><p>请选择上级总代理</p></td>
            </tr>
          </template> 
          
          <tr>
            <td class="tar">会员帐号:</td> 
            <td class="tl">
              <p><input type="text" v-model="username" placeholder="请输入帐号"> <button @click="checkRepte()">帐号是否可用</button></p>
            </td> 
            <td class="tl"><p>帐号仅可接受英数字元, 长度限制4~12码</p></td>
          </tr> 
          <tr>
            <td class="tar">会员名称:</td> 
            <td class="tl"><input v-model="nickname" type="text" placeholder="请输入名称"></td> 
            <td class="tl"> 请输入名称。</td>
          </tr>
          <tr>
            <td class="tar">密码:</td> 
            <td class="tl"><input v-model="password" type="password" placeholder="请输入密码"></td> 
            <td class="tl">密码长度不小于6位,且需数字字母混用(不可接受!#$&amp;*+.=@|等特殊字符) 同组密码限用30天。
            </td>
          </tr>
          <tr>
            <td class="tar"><span class="red">*</span> 重新输入密码:</td> 
            <td class="tl"><input type="password" v-model="repassword" placeholder="请输入密码"></td> 
            <td class="tl"><i class="icon-exclamation-sign"></i>
              密码长度不小于6位,且需数字字母混用(不可接受!#$&amp;*+.=@|等特殊字符)同组密码限用30天。
            </td>
          </tr>
          <tr>
            <td class="tar">帐号状态:</td> 
            <td class="tl">
              <label><input v-model="status" type="radio" value="1"> 启用 </label> 
              <label><input v-model="status" type="radio" value="0"> 停用 </label>
            </td> 
            <td class="tl"> 请选择开启或关闭 </td>
          </tr> 
          <tr>
            <td class="tar">冻结:</td>
            <td class="tl">
                <label><input v-model="isFrozen" type="radio" value="1">是</label>
                <label><input v-model="isFrozen" type="radio" value="0"> 否 </label>
            </td> 
            <td class="tl">请选择是否冻结</td>
          </tr> 
          <tr>
            <td class="tar">收单/停押:</td> 
            <td class="tl">
              <label><input v-model="tingyaShouya" type="radio" value="1"> 收单 </label> 
              <label><input v-model="tingyaShouya" type="radio" value="0"> 停押 </label>
            </td> 
            <td class="tl">请选择收单或停押</td>
          </tr> 
        </table>
        <table>
          <thead>
            <tr>
              <th colspan="3">基础功能设置</th>
            </tr>
          </thead> 
          <tr>
            <td width="20%" class="tar">消费模式:</td> 
            <td class="tl">
              <label><input v-model="cashCredit" type="radio" :value="0" disabled="true"> 现金模式 </label> 
              <label><input v-model="cashCredit" type="radio" :value="1" disabled="true"> 信用模式 </label>
            </td> 
            <td width="20%" class="tl">
              <span>请选择消费模式</span>
            </td>
          </tr>
        </table>

        <table v-if="cashCredit == 1">
          <thead>
            <tr>
              <th colspan="3">信用额度设置</th>
            </tr>
          </thead> 
          <tr>
            <td width="20%" class="tar">额度类型:</td> 
            <td class="tl">
              <label><input v-model="creditType" type="radio" :value="1"> 第二天还原额度 </label> 
              <label><input v-model="creditType" type="radio" :value="0"> 正常交易 </label>
            </td> 
            <td width="20%" class="tl">
              <span>请选择额度类型, 设定后不能修改</span>
            </td>
          </tr>
          <tr>
            <td class="tar" width="20%">信用额度:</td> 
            <td class="tl"><input v-model="quotaInfo.quotaAmount" type="text" placeholder=""></td> 
            <td class="tl" width="20%"> 设定信用额度</td>
          </tr>
          <tr>
            <td class="tar">信用备注:</td> 
            <td class="tl"><input v-model="quotaInfo.quotaRemark" type="text" placeholder=""></td> 
            <td class="tl"> 设定信用备注</td>
          </tr>
        </table>
        <table>
          <thead>
            <tr>
              <th colspan="3">占成分配</th>
            </tr>
          </thead> 

          <!-- 要不要填的，还是直接用上级的占成 -->

          <tr>
            <td width="20%" class="tar">上级占成:</td> 
            <td class="tl">
              <el-select v-model="cselectPzhancheng" placeholder="请选择" size="mini" @change="getCzhangcheng">
                <el-option v-for="(item,index) in zhanchengList" :value="item.value" :key="item.value" :label="item.label"></el-option> 
              </el-select>

            </td> 
            <td class="tl" width="20%">请选择占成，不可超过上级占成</td>
          </tr> 
        </table> 
        <table>
          <thead>
            <tr>
              <th colspan="3">游戏设置</th>
            </tr>
          </thead> 
          <tr>
            <td width="20%" class="tar">盘口:</td> 
            <td class="tl">
              <label v-if="fujiUserInfo.handicapA == 1"><input type="radio" v-model="handicap" value="a">A</label> 
              <label v-if="fujiUserInfo.handicapB == 1"><input type="radio" v-model="handicap" value="b">B</label> 
              <label v-if="fujiUserInfo.handicapC == 1"><input type="radio" v-model="handicap" value="c">C</label>
              <label v-if="fujiUserInfo.handicapD == 1"><input type="radio" v-model="handicap" value="d">D</label>

             <!-- <el-checkbox v-model="checked">备选项</el-checkbox>

              <el-checkbox-group v-model="handicap">
                <el-checkbox v-if="fujiUserInfo.handicapA == 1" :label="'a'" >{{'A'}}</el-checkbox>
                <el-checkbox v-if="fujiUserInfo.handicapB == 1" :label="'b'" >{{'B'}}</el-checkbox>
                <el-checkbox v-if="fujiUserInfo.handicapC == 1" :label="'c'" >{{'C'}}</el-checkbox>
                <el-checkbox v-if="fujiUserInfo.handicapD == 1" :label="'d'" >{{'D'}}</el-checkbox>
              </el-checkbox-group> -->

            </td> 
            <td class="tl" width="20%">
              <span>请选择盘口</span>
            </td>

          </tr>
        </table> 
          <p class="tac" style="margin-top: 8px;">
            <button class="tabBtn btn btn-blue mgr10" @click="addsubUser()">确定</button> 
            <button class="tabBtn btn btn-red" @click="$router.push({name:'huiyuan'})">取消</button>
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
      isNew: this.$route.name == 'addhuiyuan' ? true : false,
      childUserInfo: {},
      currentPage: 1,
      functionIdList:[],//权限ID列表
      repassword:"",//重复密码
      duanusername:"",//用户名,

      aUserOccupied: {//占成对象
          cChangeAllotOccupied: 0,
          pChangeAllotOccupied: 0//上级占成
      },
      cashBalance: 0,//现金余额，1，信用余额
      cashCredit: 0,//0:现金模式，1：信用模式
      handicap: '',//盘口
      isFrozen: 0,//冻结状态，0：否，1：是
      nickname: "",//昵称
      password: "",//密码
      pid: "",//上级ID
      ruleId: 13,//角色ID
      status: 1,//账号状态，0：停用，1：启用
      tingyaShouya: 0,//停押/收押，0：停押，1：收押
      userType: 1,//会员类型,1:普通,2:直属
      username: "",//用户名
      creditType:0,//信用模式才有,1,第二天还原额度。0，正常交易
      quotaInfo: {//充值数据
          quotaAccount: 1,//金额账户,1:微信,2:支付宝,3:银行卡
          quotaAmount: "",//信用金额
          quotaRemark: "",//备注
          quotaType: 1//1,充值,2,提现
      },

      zhishuPji: 1,


      fuusername: '',
      futaitou: '',
      auser: {},
      companyUser: {},
      allDailiList: [],
      zhishugongsiList: [],
      zhishugudongList: [],
      zhishuzongdailiList: [],
      zhanchengList: [
        {label: '99%',value: 99},
        {label: '98%',value: 98},
        {label: '97%',value: 97},
        {label: '96%',value: 96},
        {label: '95%',value: 95},
        {label: '94%',value: 94},
        {label: '93%',value: 93},
        {label: '92%',value: 92},
        {label: '91%',value: 91},
        {label: '90%',value: 90},
        {label: '89%',value: 89},
        {label: '88%',value: 88},
        {label: '87%',value: 87},
        {label: '86%',value: 86},
        {label: '85%',value: 85},
        {label: '84%',value: 84},
        {label: '83%',value: 83},
        {label: '82%',value: 82},
        {label: '81%',value: 81},
        {label: '80%',value: 80},
        {label: '75%',value: 75},
        {label: '70%',value: 70},
        {label: '65%',value: 65},
        {label: '60%',value: 60},
        {label: '55%',value: 55},
        {label: '50%',value: 50},
        {label: '45%',value: 45},
        {label: '40%',value: 40},
        {label: '35%',value: 35},
        {label: '30%',value: 30},
        {label: '25%',value: 25},
        {label: '20%',value: 20},
        {label: '15%',value: 15},
        {label: '10%',value: 10},
        {label: '5%',value: 5},
        {label: '不占成',value: 0},
      ],

      fujiUserInfo: {},

      pzhancheng: 0,
      cselectPzhancheng: 0,
      fuPankou: []

    }
  },
  computed: {
    ...mapGetters({
      furuleId:'getruleId',
      fuuserInfo: 'getuserInfo',
      upUserInfo: 'getupUserInfo'
    }),
    ifxinyong() {
      return this.cashCredit == '1' ? true : false;
    },
    czhancheng() {
      return this.pzhancheng*1 - this.cselectPzhancheng*1;
    }
  },
  created() {
      console.log('this.fuuserInfo',this.fuuserInfo);

      this.fuusername = this.fuuserInfo.username;
      //this.futaitou = this.fuusername.substring(0,1);
      this.cashCredit = this.fuuserInfo.cashCredit;


      if(!this.isNew) {

        this.getupdategudong();

      }


      this.getAlldaili();
  },
  mounted(){
  },
  methods: {
    async getCzhangcheng(data) {
      console.log('zhangc',data);

      if(data > this.pzhancheng) {
        this.$alertMessage('不可超过上级占成!', '温馨提示');

        this.cselectPzhancheng = 0;
      }

      // if(data*1 > this.fujiUserInfo.aUserOccupied.cOccupied*1) {
      //   this.$alertMessage('上级占成，不能超过原有占成!', '温馨提示');


      // } else {
      //   let num = this.fujiUserInfo.aUserOccupied.cOccupied*1 - data*1;

      //   if(num > this.fujiUserInfo.aUserOccupied.cOccupied) {
      //     this.$alertMessage('不可超过上级占成!', '温馨提示');
      //   }
      // }

      
    },
    async getshangjidaili(data) {
      let res = await this.$get(`${window.url}/admin/auser/userInfo?userId=`+data+`&ruleId=6`);
      if(+res.code===200) {

        this.fujiUserInfo = res.auser;

        console.log('this.fujiUserInfo',this.fujiUserInfo);

        this.pzhancheng = res.auser.aUserOccupied.cOccupied;



//         auser: {currentPage: 0, pageSize: 10, startDate: null, endDate: null, id: 11, pid: 10,…}
// aUserOccupied: {id: 9, userId: 11, cChangeAllotOccupied: 20, cOccupied: 20, pid: 10, pChangeAllotOccupied: 20,…}
// allotOccupied: null
// cChangeAllotOccupied: 20
// cOccupied: 20
// id: 9
// occupiedRecovery: null
// pChangeAllotOccupied: 20
// pOccupied: 20
// pid: 10
// ruleId: null
// status: 0
// userId: 11

      }
    },
    async zhishuzongdaili() {
      let res = await this.$get(`${window.url}/admin/auser/ruleList?ruleId=5&isUp=1`);
      if(+res.code===200) {
        this.zhishuzongdailiList = res.list;
      }
    },
    async zhishugudong() {
      let res = await this.$get(`${window.url}/admin/auser/ruleList?ruleId=4&isUp=1`);
      if(+res.code===200) {
        this.zhishugudongList = res.list;
      }
    },
    async zhishugongsi() {
      let res = await this.$get(`${window.url}/admin/auser/ruleList?ruleId=3&isUp=1`);
      if(+res.code===200) {
        this.zhishugongsiList = res.list;
      }
    },
    async getAlldaili() {
      let res = await this.$get(`${window.url}/admin/auser/ruleList?ruleId=6&isUp=1`);
      if(+res.code===200) {
        this.allDailiList = res.userList;
      }

    },
    async getupdategudong() {

      let res = await this.$get(`${window.url}/admin/auser/userInfo?userId=`+this.upUserInfo.id+`&ruleId=`+this.upUserInfo.ruleId);

      if(+res.code===200) {

        this.auser = res.auser;
        this.companyUser = res.companyUser;

        if(this.auser.aUserOccupied) {
          this.aUserOccupied = {//当前用户占成数据
            cChangeAllotOccupied:this.auser.aUserOccupied.cChangeAllotOccupied,//当前设置占成
            pChangeAllotOccupied:this.auser.aUserOccupied.pChangeAllotOccupied,//当前父类设置占成
            pid:this.auser.aUserOccupied.pid//父ID
          }
        }

        this.cashCredit= this.auser.cashCredit;//0:现金模式，1：信用模式
       
        this.isFrozen= this.auser.isFrozen;//冻结状态，0：否，1：是
        this.isReplenishment= this.auser.isReplenishment;//允许补货，0：关闭，1：开启
        this.occupied= this.auser.occupied;//当前用户选择占成
        this.pid= this.auser.pid;//父类ID
        this.quota= this.auser.quota;//充值金额，股东/总代理/代理信用模式才传

        if(this.auser.quotaInfo) {
          this.quotaInfo= {//股东/总代理/代理只有信用模式才有充值数据
                quotaType: this.auser.quotaInfo.quotaType,//1,充值,2,提现，公司只有充值
                quotaAccount: this.auser.quotaInfo.quotaAccount,//金额账户,1:微信,2:支付宝,3:银行卡，公司默认微信
                quotaAmount: this.auser.quotaInfo.quotaAmount,//提现充值金额
                quotaRemark: this.auser.quotaInfo.quotaRemark//备注
          }
        }
        
        this.ruleId= this.auser.ruleId;//角色ID
        this.status= this.auser.status;//账号状态，0：停用，1：启用
        this.tingyaShouya= this.auser.tingyaShouya;//停押/收押，0：停押，1：收押
        this.occupiedRecovery=  this.auser.occupiedRecovery;

        this.creditType = this.auser.creditType;

        this.id = this.auser.id;
        //this.username = this.auser.username;
        this.duanusername = this.auser.username.substring(1,this.auser.username.length);
        this.nickname = this.auser.nickname;
        this.password = this.auser.password;
        this.repassword = this.auser.password;

        if(this.auser.handicapA == 1) {
          this.functionIdList.push('A');
        }
        if(this.auser.handicapB == 1) {
          this.functionIdList.push('B');
        }
        if(this.auser.handicapC == 1) {
          this.functionIdList.push('C');
        }
        if(this.auser.handicapD == 1) {
          this.functionIdList.push('D');
        }
      }

    },
    qingkong() {
      this.id = ""; //id
      this.nickname= "";
      this.password= "";
      this.repassword= "";
    },
    async checkRepte() {

      if(!this.isNew) {
        this.id = this.upUserInfo.id;
      } else {
        this.id = '';
      }

      let res = await this.$get(`${window.url}/admin/cuser/checkUsername?username=`+this.username+`&id=`+this.id);

      if(+res.code===500){
        this.$alertMessage(res.msg, '温馨提示');
      } else if(+res.code===200) {
        this.$alertMessage('此帐号可用', '温馨提示');
      }

    },
    async addsubUser() {


      if(this.username == '') {
        this.$alertMessage('用户名不能为空!', '温馨提示');
      } else if(this.nickname == '') {
        this.$alertMessage('名称不能为空!', '温馨提示');
      } else if(this.password == '') {
        this.$alertMessage('密码不能为空!', '温馨提示');
      } else if(this.password != this.repassword) {
        this.$alertMessage('两次密码输入不一致!', '温馨提示');
      } else {


        //this.aUserOccupied.cChangeAllotOccupied = this.occupied;

        // for(let n in this.functionIdList) {
        //   if(this.functionIdList[n] == 'A') {
        //     this.handicapA = '1';
        //   }
        //   if(this.functionIdList[n] == 'B') {
        //     this.handicapB = '1';
        //   }
        //   if(this.functionIdList[n] == 'C') {
        //     this.handicapC = '1';
        //   }
        //   if(this.functionIdList[n] == 'D') {
        //     this.handicapD = '1';
        //   }
        // }

        if(this.isNew) {

          // if(this.ifxinyong) {
          //     this.quota = this.quotaInfo.quotaAmount;//充值金额，股东/总代理/代理信用模式才传
          // } else {
          //   this.quota = '';
          // }

          let dataobj = {
             aUserOccupied: {//占成对象
                  cChangeAllotOccupied: this.czhancheng,
                  pChangeAllotOccupied: this.cselectPzhancheng,//上级占成
              },
              cashBalance: 0,//现金余额，1，信用余额
              cashCredit: 0,//0:现金模式，1：信用模式
              handicap: this.handicap,//盘口
              isFrozen: this.isFrozen,//冻结状态，0：否，1：是
              nickname: this.nickname,//昵称
              password: this.password,//密码
              pid: this.pid,//上级ID
              ruleId: 13,//角色ID
              status: this.status,//账号状态，0：停用，1：启用
              tingyaShouya: this.tingyaShouya,//停押/收押，0：停押，1：收押
              userType: this.userType,//会员类型,1:普通,2:直属
              username: this.username,//用户名
              creditType: this.creditType,//信用模式才有,1,第二天还原额度。0，正常交易
              quotaInfo: {//充值数据
                  quotaAccount: 1,//金额账户,1:微信,2:支付宝,3:银行卡
                  quotaAmount: this.quotaInfo.quotaAmount,//提现充值金额
                  quotaRemark: this.quotaInfo.quotaRemark,//备注
                  quotaType: 1//1,充值,2,提现
              }
            }


          console.log('dataobj',dataobj);

          let that = this;
            NProgress.start();
            await that.$post(`${window.url}/admin/cuser/addUser`,dataobj).then((res) => {
              that.$handelResponse(res, (result) => {
                NProgress.done();
                if(result.code===200){
                  that.$success('提交成功!');
                  that.$router.push({name:'huiyuan'});
                  that.qingkong();
                }
              })
            });
        } else {
          let dataobj = {
            id: this.id,
            username: this.username,
            nickname: this.nickname,
            password: this.password,
            repassword: this.repassword,
            functionIdList: this.functionIdList
          }

          let that = this;
            NProgress.start();
            await that.$post(`${window.url}/admin/auser/editChildUser`,dataobj).then((res) => {
              that.$handelResponse(res, (result) => {
                NProgress.done();
                if(result.code===200){
                  that.$success('提交成功!');
                  that.$router.push({name:'huiyuan'});
                  that.qingkong();
                }
              })
            });
        }
      }
    }



  }
}

</script>

<style scoped>

</style>

