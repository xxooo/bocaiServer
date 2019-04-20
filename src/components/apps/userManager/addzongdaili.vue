<template>
  <div id="youxishezhi" class="content-main">
    
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>帐号管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'zongdaili' }">总代理</el-breadcrumb-item>
        <el-breadcrumb-item>{{isNew?'新增':'修改资料'}}</el-breadcrumb-item>
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

          <tr v-if="isshangji">
            <td width="20%" class="tar">股东:</td> 
              <td class="tl">
                <p>{{fujiUserInfo.username}}</p>
              </td> 
            <td width="20%" class="tl"><p>上级股东</p></td>
          </tr>
          <tr v-else isshangji>
            <td width="20%" class="tar">股东:</td> 
              <td class="tl">
                <el-select v-model="fujiUserInfodemo" placeholder="请选择" size="mini" @change="gettouname" value-key="username" :disabled="isshangji">
                  <el-option v-for="(item,index) in zhishugudongList" :value="item" :key="item.id" :label="item.username"></el-option> 
                </el-select>

              </td> 
            <td width="20%" class="tl"><p>请选择上级股东</p></td>
          </tr>
          <tr>
            <td width="20%" class="tar">总代理帐号:</td> 
            <td class="tl">
              <p>{{futaitou}}<input type="text" v-model="duanusername" placeholder="请输入帐号"> <button @click="checkRepte()">帐号是否可用</button></p>
            </td> 
            <td width="20%" class="tl"><p>帐号仅可接受英数字元, 长度限制4~12码</p></td>
          </tr> 
          <tr>
            <td width="20%" class="tar">总代理名称:</td> 
            <td class="tl"><input v-model="nickname" type="text" placeholder="请输入名称"></td> 
            <td width="20%" class="tl"> 请输入名称。</td>
          </tr>
          <tr>
            <td width="20%" class="tar">密码:</td> 
            <td class="tl"><input v-model="password" type="password" placeholder="请输入密码"></td> 
            <td width="20%" class="tl">密码长度不小于6位,且需数字字母混用(不可接受!#$&amp;*+.=@|等特殊字符) 同组密码限用30天。
            </td>
          </tr>
          <tr>
            <td width="20%" class="tar"><span class="red">*</span> 重新输入密码:</td> 
            <td class="tl"><input type="password" v-model="repassword" placeholder="请输入密码"></td> 
            <td width="20%" class="tl"><i class="icon-exclamation-sign"></i>
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
            <td width="20%" class="tar">冻结:</td>
            <td class="tl">
                <label><input v-model="isFrozen" type="radio" value="1">是</label>
                <label><input v-model="isFrozen" type="radio" value="0"> 否 </label>
            </td> 
            <td width="20%" class="tl">请选择是否冻结</td>
          </tr> 
          <tr>
            <td width="20%" class="tar">补货:</td> 
            <td class="tl">
              <label><input v-model="isReplenishment" type="radio" value="1"> 开启 </label> 
              <label><input v-model="isReplenishment" type="radio" value="0"> 关闭 </label>
            </td> 
            <td width="20%" class="tl"> 请选择开启或关闭 </td>
          </tr> 
          <tr>
            <td width="20%" class="tar">收单/停押:</td> 
            <td class="tl">
              <label><input v-model="tingyaShouya" type="radio" value="1"> 收单 </label> 
              <label><input v-model="tingyaShouya" type="radio" value="0"> 停押 </label>
            </td> 
            <td width="20%" class="tl">请选择收单或停押</td>
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
            <td class="tl"><input v-model="quota" type="text" placeholder=""></td> 
            <td class="tl" width="20%"> 设定充值信用额度</td>
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
            <td width="20%" class="tar">股东占成:</td> 
            <td class="tl">
              <el-select v-model="pzhancheng" placeholder="请选择" size="mini">
                <el-option v-for="(item,index) in zhanchengList" :value="item.value" :key="item.value" :label="item.label"></el-option> 
              </el-select>
            </td> 
            <td class="tl" width="20%">请选择占成，不可超过上级占成</td>
          </tr> 
          <tr>
            <td width="20%" class="tar">总代理占成:</td> 
            <td class="tl">
              <el-select v-model="mzhancheng" placeholder="请选择" size="mini">
                <el-option v-for="(item,index) in zhanchengList" :value="item.value" :key="item.value" :label="item.label"></el-option> 
              </el-select>
            </td> 
            <td class="tl" width="20%">请选择占成，不可超过上级占成</td>
          </tr> 
          <tr>
            <td class="tar">占成回收:</td> 
            <td class="tl">
              <label><input v-model="occupiedRecovery" type="radio" value="0"> 多余占成返回公司 </label> 
              <label><input v-model="occupiedRecovery" type="radio" value="1"> 多余占成返回直接上级 </label> 
            </td> 
            <td class="tl" width="20%"> 请选择现金占成回收方式 </td>
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
            <button class="tabBtn btn btn-red" @click="$router.push({name:'zongdaili'})">取消</button>
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
      isNew: this.$route.name == 'addzongdaili' ? true : false,
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
      quota:0,//充值金额，股东/总代理/代理信用模式才传
      quotaInfo:{//股东/总代理/代理只有信用模式才有充值数据
              quotaType: 1,//1,充值,2,提现，公司只有充值
              quotaAccount: 1,//金额账户,1:微信,2:支付宝,3:银行卡，公司默认微信
              quotaAmount: '',//提现充值金额
              quotaRemark: ""//备注
          },
      repassword:"",//重复密码
      ruleId:5,//角色ID
      status:1,//账号状态，0：停用，1：启用
      tingyaShouya:'1',//停押/收押，0：停押，1：收押
      //username:"",//昵称
      occupiedRecovery: '0',

      fuusername: '',
      auser: {},
      companyUser: {},
      zhishugudongList: [],

      fujiUserInfo: {},
      fujiUserInfodemo: {},
      isshangji: false,
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
      pzhancheng: 0,
      mzhancheng: 0,
      yzhancheng: 0,
      pquota: 0,
      pid: ''


    }
  },
  computed: {
    ...mapGetters({
      furuleId:'getruleId',
      fuuserInfo: 'getuserInfo',
      upUserInfo: 'getupUserInfo'
    }),
    username() {
      return this.futaitou + this.duanusername;
    },
    ifxinyong() {
      return this.cashCredit == '1' ? true : false;
    },
    futaitou() {
      return this.fujiUserInfo.username ? this.fujiUserInfo.username.substring(0,2) : '';
    },
    // yzhancheng() {
    //   console.log(' this.fujiUserInfo', this.fujiUserInfo);

    //   return this.fujiUserInfo.allotOccupied ? this.fujiUserInfo.allotOccupied : 0;
    // },
    // pid() {
    //   return this.fujiUserInfo.id ? this.fujiUserInfo.id : '';
    // },
    // pquota() {
    //   return this.fujiUserInfo.quota ? this.fujiUserInfo.quota : 0;
    // }
  },
  created() {

      this.cashCredit = this.fuuserInfo.cashCredit;

      this.ifshangji(this.ruleId);

  },
  mounted(){
  },
  methods: {
    async getuserInfo(item) {
      let res = await this.$get(`${window.url}/admin/auser/userInfo?userId=`+item.id);
      if(+res.code===200) {
        if(res.auser) {
          this.fujiUserInfo = res.auser;

          this.yzhancheng = res.auser.allotOccupied;
          this.pquota = res.auser.quota;
          this.pid = res.auser.id;

          console.log('this.fujiUserInfo',this.fujiUserInfo);


          // this.yzhancheng = res.auser.allotOccupied;
          // this.pquota = res.auser.quota;
        }
      }
    },
    // async getCzhangcheng(data) {
    //   console.log('zhangc',data);

    //   if(data > this.pzhancheng) {
    //     this.$alertMessage('不可超过上级占成!', '温馨提示');
    //   } else {
    //     this.aUserOccupied.cChangeAllotOccupied = +this.pzhancheng - (+data);
    //   }

    // },
    gettouname(item) {

      console.log('item',item);

      this.getuserInfo(item);

    },
    async ifshangji(ruleid) {
      let res = await this.$get(`${window.url}/admin/auser/userInfo?ruleId=`+ruleid);
      if(+res.code===200) {
        if(res.auser) {
          this.zhishugudongList.push(res.auser);
          this.fujiUserInfo = res.auser;

          if(res.auser.aUserOccupied) {
            this.yzhancheng = res.auser.aUserOccupied.cChangeAllotOccupied;
          } else {
            this.yzhancheng = 0;
          }

          this.pquota = res.auser.quota;
          this.pid = res.auser.id;

          this.isshangji = true;

        } else {
          this.zhishugudongList = res.pAUserList;
          this.isshangji = false;
        }
        
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
      this.id = '';

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
      } else if((+this.pzhancheng+this.mzhancheng) > +this.yzhancheng) {
        this.$alertMessage('总占成不能超过上级占成!', '温馨提示');
      } else if(this.ifxinyong && (this.quota > + this.pquota)) {
        this.$alertMessage('充值额度不能超过父级!', '温馨提示');
      } else if(this.functionIdList.length == 0) {
        this.$alertMessage('盘口设置必须选择!', '温馨提示');
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

          let dataobj = {
            aUserOccupied:{//当前用户占成数据
              cChangeAllotOccupied:this.mzhancheng,//当前设置占成
              pChangeAllotOccupied:this.pzhancheng,//当前父类设置占成
              pid:this.pid//父ID
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
            pid:this.pid,//父类ID
            quota:this.quota,//充值金额，股东/总代理/代理信用模式才传
            quotaInfo:{//股东/总代理/代理只有信用模式才有充值数据
                      quotaType: 1,//1,充值,2,提现，公司只有充值
                      quotaAccount: this.quotaInfo.quotaAccount,//金额账户,1:微信,2:支付宝,3:银行卡，公司默认微信
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
                  that.$router.push({name:'zongdaili'});
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

