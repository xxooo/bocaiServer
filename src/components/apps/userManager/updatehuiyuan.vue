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
            <td class="tl">
              <label v-if="userType == 1">普通会员 </label> 
              <label v-if="userType == 2">直属会员 </label>
            </td> 
            <td class="tl" width="20%"></td>
          </tr> 
          <tr>
            <td class="tar">上级直属:</td> 
            <td class="tl">
              <p>{{pusername}}</p>
            </td> 
            <td class="tl"></td>
          </tr> 
          <tr>
            <td class="tar">会员帐号:</td> 
            <td class="tl">
              <p>{{username}}</p>
            </td> 
            <td class="tl"></td>
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
            </td>
          </tr>
        </table>

        <!-- 信用模式 -->
        <table v-if="cashCredit == 1">
          <thead>
            <tr>
              <th colspan="3">信用额度设置</th>
            </tr>
          </thead> 
          <tr>
            <td class="tar" width="20%">已有信用额度:</td> 
            <td class="tl"><input v-model="hascashBalance" type="text" placeholder="" disabled="true"></td> 
            <td class="tl" width="20%"> </td>
          </tr>
          <tr>
            <td width="20%" class="tar">额度类型:</td> 
            <td class="tl">
              <label><input v-model="creditType" type="radio" :value="1"> 第二天还原额度 </label> 
              <label><input v-model="creditType" type="radio" :value="0"> 正常交易 </label>
            </td> 
            <td width="20%" class="tl">
              <span>请选择充值额度类型</span>
            </td>
          </tr>
          <tr>
            <td class="tar" width="20%">充值信用额度:</td> 
            <td class="tl"><input v-model="quotaInfo.quotaAmount" type="text" placeholder=""></td> 
            <td class="tl" width="20%"> 设定信用额度</td>
          </tr>
          <tr>
            <td class="tar">充值备注:</td> 
            <td class="tl"><input v-model="quotaInfo.quotaRemark" type="text" placeholder=""></td> 
            <td class="tl"> 设定信用备注</td>
          </tr>
        </table>

        <table v-else>
          <thead>
            <tr>
              <th colspan="3">现金额度设置</th>
            </tr>
          </thead> 
          <tr>
            <td class="tar" width="20%">已有现金额度:</td> 
            <td class="tl"><input v-model="hascashBalance" type="text" placeholder="" disabled="true"></td> 
            <td class="tl" width="20%"> </td>
          </tr>
          <tr>
            <td width="20%" class="tar">充值现金类型:</td> 
            <td class="tl">
              <label><input v-model="quotaInfo.quotaAccount" type="radio" :value="1"> 微信 </label> 
              <label><input v-model="quotaInfo.quotaAccount" type="radio" :value="2"> 支付宝 </label>
              <label><input v-model="quotaInfo.quotaAccount" type="radio" :value="3"> 银行卡 </label>
            </td> 
            <td width="20%" class="tl">
              <span>请选择充值额度类型</span>
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
            <td class="tl" width="20%">请选择占成，不可超过上级占成<p class="red">(此项修改明天早上7:00才生效)</p></td>
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

              <label v-if="handicap == 'a'">A</label> 
              <label v-if="handicap == 'b'">B</label> 
              <label v-if="handicap == 'c'">C</label> 
              <label v-if="handicap == 'd'">D</label> 

            </td> 
            <td class="tl" width="20%">
              <span>此项不允许修改</span>
            </td>

          </tr>
        </table> 
          <p class="tac" style="margin-top: 8px;">
            <button class="tabBtn btn btn-blue mgr10" @click="updatehuiyuan()">确定</button> 
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
      hascashBalance: '',//已有额度
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


      pusername: '',
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
      fuPankou: []

    }
  },
  computed: {
    ...mapGetters({
      furuleId:'getruleId',
      fuuserInfo: 'getuserInfo',
      upUserInfo: 'getupUserInfo'
    }),
    onlyzhanchengList() {
      let arr = [];
      for(let n in this.zhanchengList) {
        if(this.zhanchengList[n].value < this.pzhancheng) {
          arr.push(this.zhanchengList[n]);
        }
      }
      return arr;
    }
  },
  created() {
      console.log('this.fuuserInfo',this.fuuserInfo);
      this.getupdatehuiyuan();
  },
  mounted(){
  },
  methods: {
    async getCzhangcheng(data) {
      console.log('zhangc',data);

      if(data > this.pzhancheng) {
        this.$alertMessage('不可超过上级占成!', '温馨提示');
      } else {
        this.aUserOccupied.cChangeAllotOccupied = +this.pzhancheng - (+data);
      }

    },
    async getupdatehuiyuan() {

      let res = await this.$get(`${window.url}/admin/cuser/userInfo?userId=`+this.upUserInfo.id+`&ruleId=`+this.upUserInfo.ruleId);

      if(+res.code===200) {

        this.cuser = res.cuser;

        console.log('res',JSON.stringify(res));

        this.pusername = this.cuser.pusername;

        if(this.cuser.aUserOccupied) {
          this.aUserOccupied = {//当前用户占成数据
            cChangeAllotOccupied:this.cuser.aUserOccupied.cChangeAllotOccupied,//当前设置占成
            pChangeAllotOccupied:this.cuser.aUserOccupied.pChangeAllotOccupied//当前父类设置占成
          }
        }

        this.pzhancheng = this.cuser.aUserOccupied.pChangeAllotOccupied;

        this.hascashBalance = this.cuser.cashBalance;
        this.cashCredit = this.cuser.cashCredit;//0:现金模式，1：信用模式
        this.handicap = this.cuser.handicap;
        this.id = this.cuser.id;
        this.isFrozen= this.cuser.isFrozen;//冻结状态，0：否，1：是
        this.nickname = this.cuser.nickname;
        this.occupied= this.cuser.aUserOccupied.cOccupied;//当前用户选择占成
        this.password = this.cuser.password;
        this.repassword = this.password;
        this.pid= this.cuser.pid;//父类ID

        this.ruleId = this.cuser.ruleId;//角色ID
        this.status = this.cuser.status;//账号状态，0：停用，1：启用
        this.tingyaShouya = this.cuser.tingyaShouya;//停押/收押，0：停押，1：收押
        this.userType = this.cuser.userType;
        this.username = this.cuser.username;

      }

    },
    qingkong() {
      this.id = ""; //id
      this.nickname= "";
      this.password= "";
      this.repassword= "";
    },
    async updatehuiyuan() {

      let fujizhi = 0;

      fujizhi = this.cuser.pquota*1;

      console.log('fujizhi',fujizhi);


      if(this.username == '') {
        this.$alertMessage('用户名不能为空!', '温馨提示');
      } else if(this.nickname == '') {
        this.$alertMessage('名称不能为空!', '温馨提示');
      } else if(this.password == '') {
        this.$alertMessage('密码不能为空!', '温馨提示');
      } else if(this.password != this.repassword) {
        this.$alertMessage('两次密码输入不一致!', '温馨提示');
      } else if(+this.quotaInfo.quotaAmount > fujizhi) {
        this.$alertMessage('充值额度不能超过父级!', '温馨提示');
      } else if(this.handicap == '') {
        this.$alertMessage('盘口不能为空!', '温馨提示');
      } else {


          let dataobj = {
            aUserOccupied: {
              cChangeAllotOccupied : this.aUserOccupied.cChangeAllotOccupied,
              pChangeAllotOccupied : this.aUserOccupied.pChangeAllotOccupied
            },
            cashBalance: +this.quotaInfo.quotaAmount,
            cashCredit: this.cashCredit,
            handicap: this.handicap,
            id: this.id,
            isFrozen: this.isFrozen,
            nickname: this.nickname,
            occupied: this.occupied,
            password: this.password,
            pid: this.pid,
            quotaInfo: {
              quotaAccount : this.quotaInfo.quotaAccount,
              quotaAmount : this.quotaInfo.quotaAmount*1,
              quotaRemark : this.quotaInfo.quotaRemark,
              quotaType : this.quotaInfo.quotaType,
            },
            ruleId: this.ruleId,
            status: this.status,
            tingyaShouya: this.tingyaShouya,
            userType: this.userType,
            username: this.username,
            isHide: this.cuser.isHide,
            userClass: this.cuser.userClass
          }

          let that = this;
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
            await that.$post(`${window.url}/admin/cuser/editUser`,dataobj).then((res) => {
              that.$handelResponse(res, (result) => {
          loading.close();
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

