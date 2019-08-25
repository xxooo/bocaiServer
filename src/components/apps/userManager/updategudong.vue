<template>
  <div id="youxishezhi" class="content-main">
    
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>帐号管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'gudong' }">股东</el-breadcrumb-item>
        <el-breadcrumb-item>{{'修改资料'}}</el-breadcrumb-item>
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
            <td width="20%" class="tar">公司名称:</td> 
            <td class="tl"><p><span>{{auser.pusername}}</span></p></td> 
            <td class="tl" width="20%"></td>
          </tr> 
          <tr>
            <td class="tar">股东帐号:</td> 
            <td class="tl">
              <p>{{auser.username}}</p>
            </td> 
            <td class="tl"></td>
          </tr> 
          <tr>
            <td class="tar">股东名称:</td> 
            <td class="tl"><input v-model="auser.nickname" type="text" placeholder="请输入名称"></td> 
            <td class="tl"> 请输入名称。</td>
          </tr>
          <tr>
            <td class="tar"><span class="red">*</span> 密码:</td> 
            <td class="tl"><input v-model="auser.password" type="password" placeholder="请输入密码"></td> 
            <td class="tl">密码长度不小于6位,且需数字字母混用(不可接受!#$&amp;*+.=@|等特殊字符) 同组密码限用30天。
            </td>
          </tr>
          <tr>
            <td class="tar"><span class="red">*</span> 重新输入密码:</td> 
            <td class="tl"><input type="password" v-model="auser.repassword" placeholder="请输入密码"></td> 
            <td class="tl"><i class="icon-exclamation-sign"></i>
              密码长度不小于6位,且需数字字母混用(不可接受!#$&amp;*+.=@|等特殊字符)同组密码限用30天。
            </td>
          </tr>
          <tr>
            <td class="tar">帐号状态:</td>
            <td class="tl">
                <label><input v-model="auser.status" type="radio" value="1">启用</label>
                <label><input v-model="auser.status" type="radio" value="0">停用</label>
            </td> 
            <td class="tl">请选择是否冻结</td>
          </tr> 
          <tr>
            <td class="tar">冻结:</td>
            <td class="tl">
                <label><input v-model="auser.isFrozen" type="radio" value="1">是</label>
                <label><input v-model="auser.isFrozen" type="radio" value="0"> 否 </label>
            </td> 
            <td class="tl">请选择是否冻结</td>
          </tr> 
          <tr>
            <td class="tar">补货:</td> 
            <td class="tl">
              <label><input v-model="auser.isReplenishment" type="radio" value="1"> 开启 </label> 
              <label><input v-model="auser.isReplenishment" type="radio" value="0"> 关闭 </label>
            </td> 
            <td class="tl"> 请选择开启或关闭 </td>
          </tr> 
          <tr>
            <td class="tar">收单/停押:</td> 
            <td class="tl">
              <label><input v-model="auser.tingyaShouya" type="radio" value="1"> 收单 </label> 
              <label><input v-model="auser.tingyaShouya" type="radio" value="0"> 停押 </label>
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
              <label><input v-model="auser.cashCredit" type="radio" :value="0" disabled="true"> 现金模式 </label> 
              <label><input v-model="auser.cashCredit" type="radio" :value="1" disabled="true"> 信用模式 </label>
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
            <td width="20%" class="tar">信用类型:</td> 
            <td class="tl">
              <label><input v-model="auser.creditType" type="radio" :value="1" disabled="true"> 第二天还原额度 </label> 
              <label><input v-model="auser.creditType" type="radio" :value="0" disabled="true"> 正常交易 </label>
            </td> 
            <td width="20%" class="tl">
              <span>请选择额度类型, 设定后不能修改</span>
            </td>
          </tr>
          <tr>
            <td class="tar" width="20%">已有额度:</td> 
            <td class="tl"><input v-model="auser.viewquota" type="text" placeholder="" disabled="true"></td> 
            <td class="tl" width="20%"> 设定信用额度</td>
          </tr>
          <tr>
            <td class="tar" width="20%">充值额度:</td> 
            <td class="tl"><input v-model="auser.quota" type="text" placeholder=""></td> 
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
            <td width="20%" class="tar">股东占成:</td> 
            <td class="tl">
              <el-select v-model="auser.aUserOccupied.cChangeAllotOccupied" placeholder="请选择" size="mini" @change="getCzhangcheng">
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
            <button class="tabBtn btn btn-blue mgr10" @click="updatesubUser()">确定</button> 
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
      childUserInfo: {},
      currentPage: 1,
      functionIdList:[],//权限ID列表
      password:"",//密码
      repassword:"",//重复密码
      duanusername:"",//用户名,
      repassword:"",//重复密码
      ruleId:4,//角色ID
      username:"",
      occupiedRecovery: '0',

      quotaInfo: {//充值/提现明细
        quotaType: 1,
        quotaAccount: 1,
        quotaAmount: "",
        quotaRemark: ""
      },
      fuusername: '',
      auser: {//对象
            id: "",
            functionIdList: [],
            cashCredit: 0,
            tingyaShouya: 0,
            isReplenishment: 0,
            isFrozen: 0,
            status: 0,
            occupied: 0,
            ruleId: 4,
            quota: 0,
            viewquota: 0,
            quotaInfo: {//充值/提现明细
                quotaType: 1,
                quotaAccount: 1,
                quotaAmount: "",
                quotaRemark: ""
            },
            aUserOccupied: {//占成
                cChangeAllotOccupied: 0,
            },
        },
      companyUser: {},

      ifxinyong: false,
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
      this.getupdategudong();
  },
  mounted(){
  },
  methods: {
    async getCzhangcheng(data) {
      console.log('zhangc',data);

      if(+data > +this.pzhancheng) {
        this.$alertMessage('不可超过上级占成:'+this.pzhancheng, '温馨提示');
      } else {
        this.auser.aUserOccupied.pChangeAllotOccupied = +this.pzhancheng - (+data);
      }

    },
    async getupdategudong() {

      let res = await this.$get(`${window.url}/admin/auser/userInfo?userId=`+this.upUserInfo.id+`&ruleId=`+this.upUserInfo.ruleId);

      if(+res.code===200) {

        this.auser = res.auser;
        this.companyUser = res.companyUser;

        this.auser.quotaInfo = {
          quotaType: 1,
          quotaAccount: 1,
          quotaAmount: "",
          quotaRemark: "",
        }
        this.auser.pquota = res.auser.pquota;//上级额度
        this.auser.pAllotOccupied = res.auser.pAllotOccupied;
        this.auser.viewquota = res.auser.quota;
        res.auser.quota = 0;
        this.auser.repassword = res.auser.password;
        if (res.auser.cashCredit == 0) {
          this.ifxinyong = false;
        } else {
          this.ifxinyong = true;
        }

        this.pzhancheng = res.auser.pAllotOccupied;


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
      this.functionIdList =[];//权限ID列表
    },
    async updatesubUser() {
      let that = this;
      //vm.auser.aUserOccupied.pChangeAllotOccupied = 0;//股东没有输入父占成 ??

      var reg = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{4,12})$/;
      var numMatch = /^[0-9]*$/;

      if(this.auser.nickname == '') {
        this.$alertMessage('名称不能为空!', '温馨提示');
      } else if(this.auser.password == '') {
        this.$alertMessage('密码不能为空!', '温馨提示');
      } else if(this.auser.password != this.auser.repassword) {
        this.$alertMessage('两次密码输入不一致!', '温馨提示');
      } else if(!reg.test(this.auser.password)) {
        this.$alertMessage('密码只能是字母加数字!', '温馨提示');
      } else if(!numMatch.test(this.auser.quota)) {
        this.$alertMessage('密码只能是字母加数字!', '温馨提示');
      } else if(this.ifxinyong && ((+this.auser.viewquota + this.auser.quota*1) > + this.auser.pquota)) {
        this.$alertMessage('充值额度不能超过父级:'+this.auser.pquota, '温馨提示');
      } else if(this.functionIdList.length == 0) {
        this.$alertMessage('盘口设置必须选择!', '温馨提示');
      } else {

        this.auser.quota = +this.auser.quota;

        console.log('edietList',this.functionIdList);

        this.auser.handicapA = '0';
        this.auser.handicapB = '0';
        this.auser.handicapC = '0';
        this.auser.handicapD = '0';

        for(let n in this.functionIdList) {
          if(this.functionIdList[n] == 'A') {
            this.auser.handicapA = '1';
          }
          if(this.functionIdList[n] == 'B') {
            this.auser.handicapB = '1';
          }
          if(this.functionIdList[n] == 'C') {
            this.auser.handicapC = '1';
          }
          if(this.functionIdList[n] == 'D') {
            this.auser.handicapD = '1';
          }
        }
          
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          await that.$post(`${window.url}/admin/auser/editUser`,this.auser).then((res) => {
            that.$handelResponse(res, (result) => {
              loading.close();
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

</script>

<style scoped>

</style>

