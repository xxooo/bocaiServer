<template>
  <div id="youxishezhi" class="content-main">
    
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>帐号管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'gudong' }">股东</el-breadcrumb-item>
        <el-breadcrumb-item>{{isNew?'新增股东':'修改资料'}}</el-breadcrumb-item>
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
            <td width="20%" class="tar">公司:</td> 
            <td class="tl"><p><span>{{fuusername}}</span></p></td> 
            <td class="tl" width="20%"></td>
          </tr> 
          <tr>
            <td class="tar">股东帐号:</td> 
            <td class="tl">
              <p>{{username}}</p>
            </td> 
            <td class="tl"></td>
          </tr> 
          <tr>
            <td class="tar">股东名称:</td> 
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
                <label><input v-model="status" type="radio" value="1">启用</label>
                <label><input v-model="status" type="radio" value="0">停用</label>
            </td> 
            <td class="tl">请选择是否冻结</td>
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
            <td class="tar">补货:</td> 
            <td class="tl">
              <label><input v-model="isReplenishment" type="radio" value="1"> 开启 </label> 
              <label><input v-model="isReplenishment" type="radio" value="0"> 关闭 </label>
            </td> 
            <td class="tl"> 请选择开启或关闭 </td>
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

        <table v-if="ifxinyong">
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
              <el-checkbox-group v-model="functionIdList">
                <el-checkbox :label="'A'" >{{'A'}}</el-checkbox>
                <el-checkbox :label="'B'" >{{'B'}}</el-checkbox>
                <el-checkbox :label="'C'" >{{'C'}}</el-checkbox>
                <el-checkbox :label="'D'" >{{'D'}}</el-checkbox>
              </el-checkbox-group>
            </td> 
            <td class="tl" width="20%">
              <span>请选择盘口</span>
            </td>
          </tr>
        </table> 
          <p class="tac" style="margin-top: 8px;">
            <button class="tabBtn btn btn-blue mgr10" @click="addsubUser()">确定</button> 
            <button class="tabBtn btn btn-red" @click="$router.push({name:'gudong'})">取消</button>
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
      isNew: this.$route.name == 'addgudong' ? true : false,
      childUserInfo: {},
      currentPage: 1,
      functionIdList:[],//权限ID列表
      password:"",//密码
      repassword:"",//重复密码
      duanusername:"",//用户名,

      aUserOccupied:{//当前用户占成数据
        cChangeAllotOccupied:0,//当前设置占成
        pChangeAllotOccupied:0,//当前父类设置占成
        pid:''//父ID
      },
      cashCredit:'0',//0:现金模式，1：信用模式
      creditType: '0',
      handicapA: '0',//盘口设置A,0:不设置，1：设置
      handicapB: '0',//盘口设置B,0:不设置，1：设置
      handicapC: '0',//盘口设置C,0:不设置，1：设置
      handicapD: '0',//盘口设置D,0:不设置，1：设置
      id:'',//id
      isFrozen:'0',//冻结状态，0：否，1：是
      isReplenishment:'1',//允许补货，0：关闭，1：开启
      nickname:"",//昵称
      occupied:'0',//当前用户选择占成
      password:"",//密码
      pid:"",//父类ID
      quota:0,//充值金额，股东/总代理/代理信用模式才传
      quotaInfo:{//股东/总代理/代理只有信用模式才有充值数据
              quotaType: 1,//1,充值,2,提现，公司只有充值
              quotaAccount: 1,//金额账户,1:微信,2:支付宝,3:银行卡，公司默认微信
              quotaAmount: '',//提现充值金额
              quotaRemark: ""//备注
          },
      repassword:"",//重复密码
      ruleId:4,//角色ID
      status:1,//账号状态，0：停用，1：启用
      tingyaShouya:'1',//停押/收押，0：停押，1：收押
      username:"",
      occupiedRecovery: '0',

      fuusername: '',
      auser: {},
      companyUser: {},

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
      ]

    }
  },
  computed: {
    ...mapGetters({
      furuleId:'getruleId',
      fuuserInfo: 'getuserInfo',
      upUserInfo: 'getupUserInfo'
    }),
    // username() {
    //   return this.futaitou + this.duanusername;
    // },
    ifxinyong() {
      return this.cashCredit == '1' ? true : false;
    }
  },
  created() {
      console.log('this.upUserInfo',this.upUserInfo);

      this.fuusername = this.fuuserInfo.username;
      this.cashCredit = this.fuuserInfo.cashCredit;

      this.getupdategudong();


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
    async getupdategudong() {

      let res = await this.$get(`${window.url}/admin/auser/userInfo?userId=`+this.upUserInfo.id+`&ruleId=`+this.upUserInfo.ruleId);

      if(+res.code===200) {

        this.auser = res.auser;
        this.companyUser = res.companyUser;

        if(this.auser.aUserOccupied) {
          this.aUserOccupied = {//当前用户占成数据
            cChangeAllotOccupied:this.auser.aUserOccupied.cChangeAllotOccupied,//当前设置占成
            cOccupied: this.auser.aUserOccupied.cOccupied,//当前设置占成
            id:this.auser.aUserOccupied.id,
            pChangeAllotOccupied:this.auser.aUserOccupied.pChangeAllotOccupied,//当前父类设置占成
            pid:this.auser.aUserOccupied.pid,//父ID
            userId:this.auser.aUserOccupied.userId
          }
        }

        this.cashCredit= this.auser.cashCredit;//0:现金模式，1：信用模式
        if(this.auser.handicapA == 1) {
          this.handicapA = 1;
          this.functionIdList.push('A');
        } else {
          this.handicapA = 0;
        }
        if(this.auser.handicapB == 1) {
          this.handicapB = 1;
          this.functionIdList.push('B');
        } else {
          this.handicapB = 0;
        }
        if(this.auser.handicapC == 1) {
          this.handicapC = 1;
          this.functionIdList.push('C');
        } else {
          this.handicapC = 0;
        }
        if(this.auser.handicapD == 1) {
          this.handicapD = 1;
          this.functionIdList.push('D');
        } else {
          this.handicapD = 0;
        }
        this.id= this.auser.id;
        this.isFrozen= this.auser.isFrozen;//冻结状态，0：否，1：是
        this.isReplenishment= this.auser.isReplenishment;//允许补货，0：关闭，1：开启
        this.occupied= this.auser.aUserOccupied.cOccupied;//当前用户选择占成, 不知道填哪个

        this.nickname = this.auser.nickname;
        this.password = this.auser.password;
        this.repassword = this.auser.password;
        this.phandicapA = this.auser.phandicapA;
        this.phandicapB = this.auser.phandicapB;
        this.phandicapC = this.auser.phandicapC;
        this.phandicapD = this.auser.phandicapD;


        this.pid= this.auser.pid;//父类ID
        this.quota= this.auser.quota;//充值金额，股东/总代理/代理信用模式才传
        this.creditType= this.auser.creditType;

        this.quotaInfo.quotaType = 1;
        this.quotaInfo.quotaAccount = 1;
        this.quotaInfo.quotaAmount = 1;
        this.quotaInfo.quotaRemark = '';

        this.ruleId = this.auser.ruleId;
        this.status = this.auser.status;
        this.tingyaShouya = this.auser.tingyaShouya;
        this.username = this.auser.username;
        this.occupiedRecovery = this.auser.occupiedRecovery;


      }

    },
    qingkong() {
      this.functionIdList =[];//权限ID列表
      this.id = ""; //id
      this.nickname= "";
      this.password= "";
      this.repassword= "";
      this.duanusername= "";
    },
    async checkRepte() {
      if(!this.isNew) {
        this.id = this.upUserInfo.id;
      }

      console.log('username',this.username);

      let res = await this.$get(`${window.url}/admin/auser/checkUsername?username=`+this.username+`&id=`+this.id);

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


        this.aUserOccupied.cChangeAllotOccupied = this.occupied;

        for(let n in this.functionIdList) {
          if(this.functionIdList[n] == 'A') {
            this.handicapA = '1';
          }
          if(this.functionIdList[n] == 'B') {
            this.handicapB = '1';
          }
          if(this.functionIdList[n] == 'C') {
            this.handicapC = '1';
          }
          if(this.functionIdList[n] == 'D') {
            this.handicapD = '1';
          }
        }

        if(this.isNew) {

          if(this.ifxinyong) {
              this.quota = this.quotaInfo.quotaAmount;//充值金额，股东/总代理/代理信用模式才传
          } else {
            this.quota = '';
          }

          let dataobj = {
            aUserOccupied:{//当前用户占成数据
              cChangeAllotOccupied:this.aUserOccupied.cChangeAllotOccupied,//当前设置占成
              pChangeAllotOccupied:this.aUserOccupied.pChangeAllotOccupied,//当前父类设置占成
              pid:this.fuuserInfo.id//父ID
            },  
            cashCredit:this.cashCredit,//0:现金模式，1：信用模式
            creditType: this.creditType,
            handicapA: this.handicapA,//盘口设置A,0:不设置，1：设置
            handicapB: this.handicapB,//盘口设置B,0:不设置，1：设置
            handicapC: this.handicapC,//盘口设置C,0:不设置，1：设置
            handicapD: this.handicapD,//盘口设置D,0:不设置，1：设置
            id:'',//id
            isFrozen:this.isFrozen,//冻结状态，0：否，1：是
            isReplenishment:this.isReplenishment,//允许补货，0：关闭，1：开启
            nickname:this.nickname,//昵称
            occupied:this.occupied,//当前用户选择占成
            password:this.password,//密码
            pid:this.fuuserInfo.id,//父类ID
            quota:this.quota,//充值金额，股东/总代理/代理信用模式才传
            quotaInfo:{//股东/总代理/代理只有信用模式才有充值数据
                      quotaType: 1,//1,充值,2,提现，公司只有充值
                      quotaAccount: 1,//金额账户,1:微信,2:支付宝,3:银行卡，公司默认微信
                      quotaAmount: this.quotaInfo.quotaAmount,//提现充值金额
                      quotaRemark: this.quotaInfo.quotaRemark//备注
            },
            ruleId:this.ruleId,//角色ID
            status:this.status,//账号状态，0：停用，1：启用
            tingyaShouya:this.tingyaShouya,//停押/收押，0：停押，1：收押
            username:this.username,//昵称
            occupiedRecovery: this.occupiedRecovery
          }


          console.log('dataobj',dataobj);

          let that = this;
            NProgress.start();
            await that.$post(`${window.url}/admin/auser/addUser`,dataobj).then((res) => {
              that.$handelResponse(res, (result) => {
                NProgress.done();
                if(result.code===200){
                  that.$success('提交成功!');
                  that.$router.push({name:'gudong'});
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
                  that.$router.push({name:'gudong'});
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

