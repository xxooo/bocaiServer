<template>
  <div id="youxishezhi" class="content-main">
    
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
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
            <td class="tl" v-if="!isshangji">
            <!-- 这里判断直属会员还有问题 -->
              <label v-if="!isshangji"><input v-model="userType" type="radio" :value="1" @click="getSessionAUser()"> 普通会员 </label> 
              <label v-if="!isshangji"><input v-model="userType" type="radio" :value="2" @click="zhishugongsi()"> 直属会员 </label>
            </td> 
            <td class="tl" width="20%">请选择会员类型</td>
          </tr> 
          <tr v-if="userType == 1 && !isshangji">
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
                <el-select v-model="pid" placeholder="请选择" size="mini" @change="getshangjidaili">
                  <el-option v-for="(item,index) in zhishugongsiList" :value="item.id" :key="item.id" :label="item.username"></el-option> 
                </el-select>
              </td> 
              <td class="tl"><p>请选择上级公司</p></td>
            </tr>
            <tr v-if="zhishuPji == 2">
              <td class="tar">上级股东:</td> 
              <td class="tl">
                <el-select v-model="pid" placeholder="请选择" size="mini" @change="getshangjidaili">
                  <el-option v-for="(item,index) in zhishugudongList" :value="item.id" :key="item.id" :label="item.username"></el-option> 
                </el-select>
              </td> 
              <td class="tl"><p>请选择上级股东</p></td>
            </tr>
            <tr v-if="zhishuPji == 3">
              <td class="tar">上级总代理:</td> 
              <td class="tl">
                <el-select v-model="pid" placeholder="请选择" size="mini" @change="getshangjidaili">
                  <el-option v-for="(item,index) in zhishuzongdailiList" :value="item.id" :key="item.id" :label="item.username"></el-option> 
                </el-select>
              </td> 
              <td class="tl"><p>请选择上级总代理</p></td>
            </tr>
          </template> 
          
          <tr>
            <td class="tar">会员帐号:</td> 
            <td class="tl">
              <p>{{pakoun}}<input type="text" v-model="username" placeholder="请输入帐号"> <button @click="checkRepte()">帐号是否可用</button></p>
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
              <span>消费模式</span>
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
            <td width="20%" class="tar">信用类型:</td> 
            <td class="tl">
              <label><input v-model="creditType" type="radio" :value="1"> 第二天还原额度 </label> 
              <label><input v-model="creditType" type="radio" :value="0"> 正常交易 </label>
            </td> 
            <td width="20%" class="tl">
              <span>请选择额度类型, 设定后不能修改</span>
            </td>
          </tr>
          <tr>
            <td class="tar" width="20%">充值信用额度:</td> 
            <td class="tl"><input v-model="quotaInfo.quotaAmount" type="text" placeholder=""></td> 
            <td class="tl" width="20%"> 设定充值信用额度</td>
          </tr>
          <tr>
            <td class="tar">充值备注:</td> 
            <td class="tl"><input v-model="quotaInfo.quotaRemark" type="text" placeholder=""></td> 
            <td class="tl"> 设定充值备注</td>
          </tr>
        </table>
        <table v-else>
          <thead>
            <tr>
              <th colspan="3">现金额度设置</th>
            </tr>
          </thead> 
          <tr>
            <td width="20%" class="tar">现金类型:</td> 
            <td class="tl">
              <label><input v-model="quotaInfo.quotaAccount" type="radio" :value="1"> 微信 </label> 
              <label><input v-model="quotaInfo.quotaAccount" type="radio" :value="2"> 支付宝 </label>
              <label><input v-model="quotaInfo.quotaAccount" type="radio" :value="3"> 银行卡 </label>
            </td> 
            <td width="20%" class="tl">
              <span>请选择额度类型, 设定后不能修改</span>
            </td>
          </tr>
          <tr>
            <td class="tar" width="20%">充值现金额度:</td> 
            <td class="tl"><input v-model="quotaInfo.quotaAmount" type="text" placeholder=""></td> 
            <td class="tl" width="20%"> 设定充值现金额度</td>
          </tr>
          <tr>
            <td class="tar">充值备注:</td> 
            <td class="tl"><input v-model="quotaInfo.quotaRemark" type="text" placeholder=""></td> 
            <td class="tl"> 设定充值备注</td>
          </tr>
        </table>

        <table>
          <thead>
            <tr>
              <th colspan="3">占成分配</th>
            </tr>
          </thead> 

          <tr>
            <td width="20%" class="tar">上级占成:</td> 
            <td class="tl">
              <el-select v-model="aUserOccupied.pChangeAllotOccupied" placeholder="请选择" size="mini" @change="getCzhangcheng">
                <el-option v-for="(item,index) in onlyzhanchengList" :value="item.value" :key="item.value" :label="item.label"></el-option> 
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
          quotaAccount: 3,//金额账户,1:微信,2:支付宝,3:银行卡
          quotaAmount: "",//信用金额
          quotaRemark: "",//备注
          quotaType: 1//1,充值,2,提现
      },

      zhishuPji: 1,


      futaitou: '',
      cuser: {},
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
      fuPankou: [],
      sessionAUser: {},
      isshangji: false,
      companyUser: {}

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
    onlyzhanchengList() {
      let arr = [];
      for(let n in this.zhanchengList) {
        if(this.zhanchengList[n].value < this.pzhancheng) {
          arr.push(this.zhanchengList[n]);
        }
      }
      return arr;
    },
    pakoun() {
      return this.handicap;
    }
  },
  created() {
      this.cashCredit = this.fuuserInfo.cashCredit;

      console.log('wwwww');

      this.getSessionAUser();

      //this.ifshangji(this.ruleId);
  },
  mounted(){
  },
  methods: {
    // async ifshangji(ruleid) {
    //   let res = await this.$get(`${window.url}/admin/auser/userInfo?ruleId=`+ruleid);
    //   if(+res.code===200) {
    //     if(res.auser) {
    //       // this.zhishugudongList.push(res.auser);
    //       // this.fujiUserInfo = res.auser;
    //       // this.pid = res.auser.id;

    //       // if(this.fujiUserInfo.aUserOccupied) {
    //       //   this.yzhancheng = this.fujiUserInfo.aUserOccupied.cChangeAllotOccupied;
    //       // } else {
    //       //   this.yzhancheng = 0;
    //       // }

    //       this.isshangji = true;
    //     } else {
    //       // this.zhishugudongList = res.pAUserList;
    //       this.isshangji = false;
    //     }
        
    //   }
    // },
    async getCzhangcheng(data) {
      console.log('zhangc',data);

      if(data > this.pzhancheng) {
        this.$alertMessage('不可超过上级占成!', '温馨提示');
      } else {
        this.aUserOccupied.cChangeAllotOccupied = +this.pzhancheng - (+data);
      }

    },
    async getSessionAUser() {
      console.log('ttttt');
      let res = await this.$get(`${window.url}/admin/getSessionAUser`);
      if(+res.code===200) {

        this.sessionAUser = res.sessionAUser;
                if (this.sessionAUser.ruleId == 6) {//如果是代理，则直接返回代理数据
                    this.isshangji = true;
                    this.allDailiList.push(res.sessionAUser);


                    this.getshangjidaili(res.sessionAUser.id);


                    // this.fujiUserInfo = res.sessionAUser;

                    // //this.companyUser = res.companyUser;

                    // this.pzhancheng = res.sessionAUser.allotOccupied;

                    // this.pid = res.sessionAUser.id;


                } else {
                    this.getAlldaili(6);//获取代理列表
                }


      }
    },
    async getshangjidaili(data) {
      // let res = await this.$get(`${window.url}/admin/auser/userInfo?userId=`+data+`&ruleId=6`);
      let res = await this.$get(`${window.url}/admin/auser/userInfo?userId=`+data);
      if(+res.code===200) {

        if (res.auser != null) {

          this.fujiUserInfo = res.auser;

          this.companyUser = res.companyUser;

          this.pzhancheng = res.auser.aUserOccupied.cChangeAllotOccupied;

          //this.aUserOccupied.pChangeAllotOccupied = res.auser.aUserOccupied.pChangeAllotOccupied;

          this.pid = res.auser.id;

        }
      }

    },
    async zhishuzongdaili() {
      this.pid = '';
      let res = await this.$get(`${window.url}/admin/auser/ruleList?ruleId=5&isUp=1`);
      if(+res.code===200) {
        this.zhishuzongdailiList = res.userList;
      }
    },
    async zhishugudong() {
      this.pid = '';

      let res = await this.$get(`${window.url}/admin/auser/ruleList?ruleId=4&isUp=1`);
      if(+res.code===200) {
        this.zhishugudongList = res.userList;
      }
    },
    async zhishugongsi() {
      this.pid = '';

      let res = await this.$get(`${window.url}/admin/auser/ruleList?ruleId=3&isUp=1`);
      if(+res.code===200) {
        this.zhishugongsiList = res.userList;
      }
    },
    async getAlldaili() {
      this.pid = '';

      let res = await this.$get(`${window.url}/admin/auser/ruleList?ruleId=6&isUp=1`);
      if(+res.code===200) {
        this.allDailiList = res.userList;
      }
    },
    qingkong() {
      this.id = ""; //id
      this.nickname= "";
      this.password= "";
      this.repassword= "";
    },
    async checkRepte() {

      if(this.username == '') {
        this.$alertMessage('用户名不能为空!', '温馨提示');
      } else {
        this.id = '';

        let res = await this.$get(`${window.url}/admin/cuser/checkUsername?username=`+this.username+`&id=`+this.id);

        if(+res.code===500){
          this.$alertMessage(res.msg, '温馨提示');
        } else if(+res.code===200) {
          this.$alertMessage('此帐号可用', '温馨提示');
        }
      }
      

    },
    async addsubUser() {

      console.log('this.companyUser',this.companyUser);

      let fujizhi = 0;

      if(this.cashCredit == 0) {
        fujizhi = this.companyUser.quota*1;
      } else {
        fujizhi = this.fujiUserInfo.quota*1;
      }

      console.log('fujizhi',fujizhi);

      if(this.username == '') {
        this.$alertMessage('用户名不能为空!', '温馨提示');
      } else if(this.nickname == '') {
        this.$alertMessage('名称不能为空!', '温馨提示');
      } else if(this.password == '') {
        this.$alertMessage('密码不能为空!', '温馨提示');
      } else if(this.password != this.repassword) {
        this.$alertMessage('两次密码输入不一致!', '温馨提示');
      } else if(this.quotaInfo.quotaAmount > fujizhi) {
        this.$alertMessage('充值额度不能超过父级!', '温馨提示');
      } else if(this.pid == '') {
        this.$alertMessage('上级不能为空!', '温馨提示');
      } else if(this.handicap == '') {
        this.$alertMessage('盘口不能为空!', '温馨提示');
      }  else {

          let dataobj = {
             aUserOccupied: {//占成对象
                cChangeAllotOccupied : this.aUserOccupied.cChangeAllotOccupied,
                pChangeAllotOccupied : this.aUserOccupied.pChangeAllotOccupied
              },
              cashBalance: this.quotaInfo.quotaAmount*1,
              cashCredit: this.cashCredit,
              handicap: this.handicap,//盘口
              isFrozen: this.isFrozen,//冻结状态，0：否，1：是
              nickname: this.nickname,//昵称
              password: this.password,//密码
              pid: this.pid,//上级ID
              ruleId: this.ruleId,//角色ID
              status: this.status,//账号状态，0：停用，1：启用
              tingyaShouya: this.tingyaShouya,//停押/收押，0：停押，1：收押
              userType: this.userType,//会员类型,1:普通,2:直属
              isHide: 1,
              username: this.pakoun + this.username,//用户名
              creditType: this.creditType,//信用模式才有,1,第二天还原额度。0，正常交易
              quotaInfo: {//充值数据
                  quotaAccount : this.quotaInfo.quotaAccount,
                  quotaAmount : this.quotaInfo.quotaAmount*1,
                  quotaRemark : this.quotaInfo.quotaRemark,
                  quotaType : this.quotaInfo.quotaType
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
      }
    }



  }
}

</script>

<style scoped>

</style>

