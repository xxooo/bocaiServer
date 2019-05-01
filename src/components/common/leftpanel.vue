<template>
  <div id="leftpanel" class="betQuick">
    <div class="leftList">
      <div id="userInfo" class="userInfo">
        <p class="title">
          账户信息
          <a title="刷新" class="refresh" @click="getcUserInfo()">
            <i class="icon-refresh"></i>
          </a>
        </p> 
        <div class="info">
          <div class="info-box">
            <p><label>账户：</label><span>{{userInfo.username}}</span>({{userInfo.handicap}}盘)</p> 
            <p><label>现金余额：</label>{{userInfo.cashBalance}}</p> 
            <p><label>锁定金额：</label><span style="color: #f42222;">{{userInfo.lockBalance}}</span></p> 
            <p><label>已下金额：</label><span style="color: #f42222;">{{userInfo.alreadyBalance}}</span></p>
          </div> 
          <div class="login-out">
            <div><el-button class="loginoutbtn" type="primary" size="mini" @click="$router.push({name: 'login'})">登出</el-button></div>
            <div><el-button class="changepassbtn" type="primary" size="mini" @click="toUpdatePass">修改密码</el-button></div>
          </div>
          <div class="jinbibg"></div>
        </div>
      </div>
      <div class="long-dragon">
        <div class="gonggaotab">
          <a>公告</a>
        </div>
        <div class="cont">
          <div class="gonggaocont">
            <p v-if="userInfo.notice">{{userInfo.notice}}</p>
            <p v-else>暂无公告</p>
          </div>
        </div>
      </div>
      <div class="long-dragon">
        <div class="tabmenuPa  active">
          <a>长龙排行榜</a>
        </div>
        <!-- <div class="tabmenu">
          <a>最近注单</a>
        </div> -->
        <div @click="openPrize" class="tabmenu openPrize active">
          <a>连续开奖</a>
        </div>
        <div @click="noOpenPrize" class="tabmenu noOpenPrize">
          <a>连续未开</a>
        </div>
        <div class="cont">
          <div class="sum">
            <div class="table">
              <table v-if="showOpen">
                <tr v-for="(item,index) in openPrizeList">
                  <td class="type"></td> 
                  <td class="name"><a>{{item.content}}</a></td> 
                  <td class="period">{{item.num}} 期</td>
                </tr>
              </table>
              <table v-if="!showOpen">
                <tr v-for="(item,index) in noOpenPrizeList">
                  <td class="type"></td> 
                  <td class="name"><a>{{item.content}}</a></td> 
                  <td class="period">{{item.num}} 期</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      title="修改密码"
      :visible.sync="orderOddsVisible"
      center>
      
        <div class="popup-body" style="max-height: 300px;">
          <div class="default-list">
            <div class="table">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="旧密码：" prop="oldPassWrod">
                  <el-input size="mini" type="password" v-model="ruleForm.oldPassWrod"></el-input>
                </el-form-item>
                <el-form-item label="新密码：" prop="newPassWord">
                  <el-input size="mini" type="password" v-model="ruleForm.newPassWord"></el-input>
                </el-form-item>
                <el-form-item label="确认密码：" prop="newPassWordDb">
                  <el-input size="mini" type="password" v-model="ruleForm.newPassWordDb"></el-input>
                </el-form-item>
                <el-form-item style="text-align: center;">
                  <el-button size="mini" @click="orderOddsVisible = false">取 消</el-button>
                  <el-button size="mini" type="primary" @click="updatePassWord('ruleForm')">确 定</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div> 

    </el-dialog>

  </div>
</template>
<script>
//import {mapGetters} from 'vuex';

export default {
  data() {
    let vm = this;
    return {
      bocaiTypeId: '',
      showOpen: true,
      noOpenPrizeList: [],
      openPrizeList: [],
      userInfo: {},
      orderOddsVisible: false,
      ruleForm: {
          oldPassWrod: '',
          newPassWord: '',
          newPassWordDb: ''
        },
        rules: {
          oldPassWrod: [
            { required: true, message: '请输入您的旧密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          ],
          newPassWord: [
            { required: true, message: '请输入您的新密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
            {
              validator:function(rule, value, callback){
                let reg = /^[a-zA-Z]\w{5,15}$/;
                if(!reg.test(value)){
                  callback('密码以字母开头，长度在6~16之间，只能包含字母、数字和下划线');
                }
                callback();
              },
              trigger: 'blur'
            }
          ],
          newPassWordDb: [
            { required: true, message: '请再次输入新密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
            {
              validator:function(rule, value, callback){
                let reg = /^[a-zA-Z]\w{5,15}$/;
                if(!reg.test(value)){
                  callback('密码以字母开头，长度在6~16之间，只能包含字母、数字和下划线');
                }
                callback();
              },
              trigger: 'blur'
            },
            {
              validator:function(rule, value, callback){

                console.log('vm.ruleForm',vm.ruleForm);
                if(value != vm.ruleForm.newPassWord){
                  callback('新密码两次输入不一致!');
                }
                callback();
              },
              trigger: 'blur'
            }
          ]
        }

    };
  },
  computed: {
    // ...mapGetters({
    // })
  },
  async created() {
    this.getcUserInfo();
  },
  mounted(){
      bus.$on('getcUserInfo', (data) => {
        this.getcUserInfo();
      });
      bus.$on('getbocaiTypeId', (data) => {
        this.bocaiTypeId = data;
        this.getchanglong();
      });
  },
  methods: {
    openPrize() {
      this.showOpen = true;
      $('.openPrize').addClass('active').siblings().removeClass('active');
    },
    noOpenPrize() {
      this.showOpen = false;
      $('.noOpenPrize').addClass('active').siblings().removeClass('active');
    },
    async getchanglong() {

        this.openPrizeList = [];
        this.noOpenPrizeList = [];

          let that = this;
          const loading = this.$loading({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
          await that.$get(`${window.url}/api/changlong?bocaiTypeId=`+this.bocaiTypeId+'&showNum=10').then((res) => {
            that.$handelResponse(res, (result) => {
          loading.close();
              if(result.code===200){

                for(let n in result.openPrizeMap) {
                  let obj = {};
                  obj.content = n;
                  obj.num = result.openPrizeMap[n];
                  that.openPrizeList.push(obj);
                }

                for(let n in result.noOpenPrizeMap) {
                  let obj = {};
                  obj.content = n;
                  obj.num = result.noOpenPrizeMap[n];
                  that.noOpenPrizeList.push(obj);
                }

                //console.log('this.openPrizeMap',this.openPrizeMap);
                //更新用户信息
                // bus.$emit('getcUserInfo', ''); 
                // that.orderDatas.list = [];
                // that.$success('下注成功！');
                // that.reset();
              }
            })
          });

          console.log('that.openPrizeList',that.openPrizeList);
    },
    async updatePassWord(formName) {
        let that = this;

          this.$refs[formName].validate(async (valid) => {

          if (valid) {

              let obj = {
                oldPassWrod: this.ruleForm.oldPassWrod,
                newPassWord: this.ruleForm.newPassWord
              }

              let ret = await this.$post(`${window.url}/api/rePassWord`, obj);
              if(ret.code===200) {
                    this.$success('修改密码成功!');
                    this.orderOddsVisible = false;
                  } else {
              }

              this.$refs[formName].resetFields();

          } else {

            return false;
          }
        });
    },
    toUpdatePass() {
      this.orderOddsVisible = true;
    },
    handleClick(tab, event) {
      //console.log(tab, event);  notice
    },
    async getcUserInfo() {
      let res = await this.$get(`${window.url}/api/cUserInfo`);

      if(res.code===200){
        //store.commit('updatecashBalance',res.data.cashBalance);
        this.userInfo = res.data;
        bus.$emit('getcashBalance', res.data.cashBalance);
        bus.$emit('getcuserId', res.data.id);

        // "currentPage": 0,
        // "pageSize": 10,
        // "startDate": null,
        // "endDate": null,
        // "id": "51",//用户ID
        // "username": "aydwhuiyuan1",//用户注册名称
        // "nickname": "ydwhuiyuan1",//用户昵称
        // "password": "",
        // "cashBalance": 20421200,//可用金额
        // "lockBalance": 0,//锁定金额
        // "alreadyBalance": 800,//已下注金额
        // "ruleId": 13,
        // "bankName": "1111",
        // "bankNum": "1111",
        // "bankUserName": "1111",
        // "phone": "1111",
        // "weixin": "1111",
        // "zhifubao": "1111",
        // "putForwardPassword": "1234",
        // "cashCredit": 0,
        // "creditType": null,
        // "quota": 0,
        // "handicap": "a",//用户盘口：a,b,c,d
        // "companyid": "159",
        // "pid": "164",
        // "userClass": "1-2-159-160-163-164-51",
        // "isFrozen": 0,
        // "tingyaShouya": 0,
        // "userType": 1,
        // "status": 1,
        // "createDate": 1532001115000,
        // "updateDate": 1534748779000,
        // "lockingQuota": null,
        // "isOnline": 1,
        // "quotaInfo": null,
        // "aUserOccupied": null,
        // "isHide": 1,
        // "bindingIp": "192.168.1.75",
        // "loginIp": "0:0:0:0:0:0:0:1",
        // "loginWebsite": null,
        // "teamId": 1,
        // "loginTime": 1533883022000,
        // "systemStr": null,
        // "phandicapA": null,
        // "phandicapB": null,
        // "phandicapC": null,
        // "phandicapD": null,
        // "pAllotOccupied": null,
        // "pCashCredit": null,
        // "pnickname": null,
        // "pusername": null,
        // "pquota": null

      }
    }
  }
};
</script>
<style scoped>

#leftpanel {
    background-size: 100% auto;
    width: 240px;
    float: left;
    margin-top: 40px;
    margin-left: 10px;
}

#leftpanel .leftList .long-dragon {
    background-color: #f8f8f8;
}
.long-dragon, .quick-bet {
    margin-top: 10px;
}

#leftpanel .leftList .title {
    position: relative;
    text-align: center;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.2);
}

#userInfo {
  background: #80664b;
}

#leftpanel .leftList .userInfo .title {
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    font-weight: 700;
    position: relative;
}

#leftpanel .leftList .userInfo .info {
    background-size: 100% 100%;
    padding: 15px 5px;
    font-size: 13px;
    overflow-x: hidden;
    word-break: break-all;
    text-align: center;
}

#leftpanel .leftList .userInfo .info .info-box {
    width: 94%;
    text-align: left;
    margin: 0 auto 10px;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 5px;
    font-weight: 700;
    padding: 5px 0;
}

#leftpanel .leftList .userInfo .info .info-box p {
    line-height: 30px;
}

#leftpanel .leftList .userInfo .info .info-box p label {
    display: inline-block;
    width: 6em;
    text-align: right;
    line-height: 24px;
}

#leftpanel .leftList .long-dragon .cont {
    width: 240px;
}

.gonggaocont {
  height: 100px;
  background-color: #f6e9c7;
  color: #805933;
  padding: 10px;
}

.tabmenu {
  display: inline-block;
  float: left;
  color: #805933;
  width: 120px;
  height: 32px;
  background-color: #d3b281;
  cursor: pointer;
}

.tabmenu:hover {
  background-color: #fcefc2;
}
.tabmenu.active {
  background-color: #fcefc2;
}

.tabmenu a {
  width: 100%;
  height: 32px;
  line-height: 32px;
}

.tabmenuPa {
    color: #ebcb80;
    height: 32px;
    line-height: 32px;
    background-color: #80664b;
}

#leftpanel .leftList .long-dragon .cont .table {
    background: #f8f8f8;
    margin: 8px 0;
    padding-bottom: 1px;
}

#leftpanel .leftList .long-dragon .cont .table table {
    width: 100%;
    line-height: 26px;
}

#leftpanel .leftList .long-dragon .cont .table table tr {
    border-top: 1px solid #eee;
}

#leftpanel.leftList .long-dragon .cont .table table tr td {
    padding: 1px 0;
    font-size: 13px;
}

#leftpanel .leftList .long-dragon .cont .table table tr td.type {
    width: 6px;
}

#leftpanel .leftList .long-dragon .cont .table table tr td.name {
    width: 130px;
    padding-left: 6px;
}

#leftpanel .leftList .long-dragon .cont .table table tr td.name a {
    color: #694909;
    text-decoration: none;
    float: left;
}

#leftpanel .leftList .long-dragon .cont .table table tr td.period {
    width: 80px;
    padding-right: 12px;
    text-align: right;
    color: #f42222;
}

.login-out div {
  width: 80px;
  margin: 0px 0px 5px 5px;
  color: #805933;
}

.login-out .el-button--primary {
    color: #805933;
}
.login-out .loginoutbtn {
  width: 80px;
}
.login-out .changepassbtn {
  background: rgba(255, 255, 255, 0.2);
  border: 0px solid rgba(255, 255, 255, 0.5);
}
.login-out .changepassbtn:hover {
  background-color: #FCEFC2;
  border-color: #FCEFC2;
}
.jinbibg {
    height: 140px;
    width: 110px;
    top: 170px;
    position: absolute;
    left: 130px;
    background: url(../../../static/img/jinbibg.png) center no-repeat;
    background-size: 100% 100%;
}
.gonggaotab {
  width: 100%;
  height: 32px;
  line-height: 32px;
  background-color: #d3b281;
  color: #805933;
}
.popup-body {
    overflow-y: auto;
}
.default-list {
    padding: 8px 60px;
}
.default-list table {
    margin-top: 5px;
    width: 100%;
}
.default-list table tr {
    line-height: 30px;
    border-bottom: 1px solid #cecece;
}
.default-list table tr th {
    color: #f2f1f0;
}
.default-list .table table th {
    text-align: right;
    background-color: #e8bd84;
    color: #450400;
    padding: 0 10px;
    font-size: 13px;
    line-height: 30px;
    font-weight: 600;
}
.default-list table td.tar, .default-list table th.tar {
    text-align: right;
}
.default-list table td, .default-list table th {
    text-align: center;
    line-height: 30px;
    border: 1px solid #b89268;
}
.default-list .table table tr td {
    padding: 3px 8px;
    text-align: left;
}
.default-list .table table tr input {
    height: 20px;
    padding-left: 3px;
}
</style>
<style lang="less">

.betQuick {
  .el-input {
    width: 120px;
    margin-right: 20px;
  }

  .el-radio.is-bordered.is-checked {
    background-color: #805933;
  }

  .betRTop.onlybet {
    margin-top: 20px;
  }

  .el-dialog__header {
    padding: 20px 20px 10px;
    background-color: #80664b;
    border-radius: 5px 5px 0 0;
  }
  .el-dialog.el-dialog--center {
    width: 500px;
    color: #450400 !important;
    background-color: #fcfcfa;
    box-shadow: 0 2px 8px rgba(0,0,0,.33);
    font-family: Helvetica,Arial,sans-serif;
    border-radius: 5px;
  }
  .el-dialog--center .el-dialog__body {
    text-align: center;
    padding: 0px;
  }
  .betRTop button {
    height: 28px;
  }

  .el-button--primary.is-plain {
    color: #805933;
  }

  .el-form-item {
    margin-bottom: 0px;
  }

  .el-form-item__content {
    margin-left: 0px !important; 
  }
}

</style>
