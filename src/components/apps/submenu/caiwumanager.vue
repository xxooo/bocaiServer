<template>
  <div class="content-main">
    <div class="right">
      <div id="submenuDiv">
        <div class="box" id="caiwumanager">

          <div class="header">
            <p>财务管理</p>
          </div> 

          <div class="bank-info">
            <ul class="tab">
              <a class="active bankInfo" @click="bankInfo">银行信息</a> 
              <a class="rechargeInfo" @click="rechargeInfo">充值</a> 
              <a class="forwardInfo" @click="forwardInfo">申请提现</a> 
              <a class="historyInfo" @click="historyInfo">历史记录</a>
            </ul> 

            <div class="table"  v-if="tabNum == '1'">
              <table class="bank-table">
                <tr>
                  <th>银行名称：</th> 
                  <td>
                  <input type="text" v-model="bankInfoObj.bankName" placeholder="请输入银行名称"></td>
                </tr> 
                <tr>
                  <th>银行卡号：</th> 
                  <td>
                  <input type="text" v-model="bankInfoObj.bankNum" placeholder="请输入银行卡号"></td>
                </tr> 
                <tr>
                  <th>卡主姓名：</th> 
                  <td>
                  <input type="text" v-model="bankInfoObj.bankUserName" class="bankUserName" placeholder="请输入卡主姓名"> 
                  <span class="red">（设置后不能修改）</span>
                </td>
                </tr> 
                <tr>
                  <th>手机号码：</th> 
                  <td><input type="text" v-model="bankInfoObj.phone" placeholder="请输入手机号码"></td>
                </tr> 
                <tr>
                  <th>微信支付账号：</th> 
                  <td>
                  <input type="text" v-model="bankInfoObj.weixin" class="weixin" placeholder="请输入微信账号"> <span class="red">（设置后不能修改）</span>
                  </td>
                </tr> 
                <tr>
                  <th>支付宝账号：</th> 
                  <td>
                  <input type="text" v-model="bankInfoObj.zhifubao" class="zhifubao" placeholder="请输入支付宝账号"> <span class="red">（设置后不能修改）</span>
                  </td>
                </tr> 
                <tr>
                  <th>提现密码：</th>
                  <td v-if="bankInfoObj.putForwardPassword == ''">
                    <p>
                      <select v-model="newPass[0]">
                        <option v-for="item in mima" :value="item">{{item}}</option>
                      </select>
                      <select v-model="newPass[1]">
                        <option v-for="item in mima" :value="item">{{item}}</option>
                      </select> 
                      <select v-model="newPass[2]">
                        <option v-for="item in mima" :value="item">{{item}}</option>
                      </select> 
                      <select v-model="newPass[3]">
                        <option v-for="item in mima" :value="item">{{item}}</option>
                      </select>  
                    </p>
                  </td>
                  <td v-else-if="passType">
                    <p>
                      旧密码：
                      <select v-model="oldPass[0]">
                        <option v-for="item in mima" :value="item">{{item}}</option>
                      </select>
                      <select v-model="oldPass[1]">
                        <option v-for="item in mima" :value="item">{{item}}</option>
                      </select> 
                      <select v-model="oldPass[2]">
                        <option v-for="item in mima" :value="item">{{item}}</option>
                      </select> 
                      <select v-model="oldPass[3]">
                        <option v-for="item in mima" :value="item">{{item}}</option>
                      </select>  
                    </p>
                    <p>
                      新密码：
                      <select v-model="newPass[0]">
                        <option v-for="item in mima" :value="item">{{item}}</option>
                      </select>
                      <select v-model="newPass[1]">
                        <option v-for="item in mima" :value="item">{{item}}</option>
                      </select> 
                      <select v-model="newPass[2]">
                        <option v-for="item in mima" :value="item">{{item}}</option>
                      </select> 
                      <select v-model="newPass[3]">
                        <option v-for="item in mima" :value="item">{{item}}</option>
                      </select>  
                    </p> 
                  </td>
                  <td v-else><a @click="chanPassType">修改密码</a></td>
                </tr>
              </table> 
              <i class="icon-credit-card"></i> 
            </div>

            <div class="table" v-if="tabNum == '2'">
              <div class="pay" v-if="!chongzhiHisOp">
                <p class="contact">
                  <a class="payRecord r" @click="toChongzhiHis('0',1,10)">
                    <i class="icon-credit-card"></i> 
                    充值记录
                  </a>
                </p> 
                <table class="recharge-type">
                  <tr>
                    <th width="250">充值方式</th> 
                    <th>收款人信息</th>
                  </tr> 
                  <tr>
                    <td>
                      <el-radio v-model="chongzhiType" label="1" @change="getchongzhiType"><img src="../../../../static/img/WXPAY.6f192a3.png" alt=""></el-radio>
                      <el-radio v-model="chongzhiType" label="2" @change="getchongzhiType"><img src="../../../../static/img/alipay.8999215.jpg" alt=""></el-radio>
                      <el-radio v-model="chongzhiType" label="3" @change="getchongzhiType"><img src="../../../../static/img/unionpay.a124865.jpg" alt=""></el-radio>

                    </td> 
                    <td v-if="chongzhiType == ''">
                      <p>
                        <a>如充值异常，请刷新二维码</a>
                      </p> 
                      <img src="../../../../static/img/onError.gif" alt="" width="120" height="120" title="点击图片刷新" style="cursor: pointer;">
                    </td>
                    <td v-else-if="chongzhiType == '3'">
                      <div class="kahaoclass" v-for="item in caiwuYinhangzhuanzhangList">
                        <el-row>
                          <el-col :span="12"><h3 class="grid-content bg-purple-light">{{item.yinhangLeixing}}</h3></el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="16" class="labelStep">
                            <span class="grid-content bg-purple">卡号:{{item.yinhangZhanghao}}</span>
                          </el-col>
                          <el-col :span="8"><span class="grid-content bg-purple-light">收款人:{{item.shoukuanXingming}}</span></el-col>
                        </el-row>
                      </div>
                    </td>
                    <td v-else>
                      <img :src="chongzhiImgSrc" alt="" width="120" height="120" title="充值" >
                    </td>
                  </tr> 
                  <tr>
                    <td style="border-right: none;">
                      <p>
                        <span class="red">*</span>
                        充值金额：
                      </p> 
                      <input type="text" v-model="paymoney" placeholder="请输入金额" style="height: 30px;">
                    </td> 
                    <td class="remark" style="border-left: none;">
                      <span><i class="red">*</i>备注：</span> 
                      <span style="color: rgb(157, 157, 157); font-size: 11px;">(付款账号,姓名等信息)</span>
                      <br> 
                      <textarea v-model="payremark" placeholder="格式如：账号 123，张三" cols="30"></textarea>
                    </td>
                  </tr>
                </table>
              </div>

              <div class="pay" v-else>
                <p class="contact">
                  <a class="r" @click="returnChistory"><i class="icon-reply"></i> 返回</a>
                  <span>
                    状态：
                    <el-select v-model="rechargeHisType" size="mini" @change="changeRechHisType" placeholder="请选择">
                      <el-option key="1" value="1" label="已处理"></el-option> 
                      <el-option key="2" value="0" label="未处理"></el-option>
                    </el-select>
                  </span>
                </p> 
                <table v-if="rechargeObj.list" class="payRecord">
                  <tr>
                    <th>充值方式</th> 
                    <th>充值金额</th> 
                    <th>状态</th> 
                    <th>申请时间</th>
                  </tr> 
                  <tr v-if="rechargeObj.list.length*1 == '0'">
                    <td  colspan="5">暂无数据</td> 
                  </tr>
                  <tr v-else v-for="item in rechargeObj.list">
                    <td><span>{{item.type=='1'?'微信' : item.type=='2'? '支付宝' : '银行转帐'}}</span></td> 
                    <td>{{item.money}}</td> 
                    <td>{{item.status=='1'?'已通过' : item.status=='2'? '已拒绝' : '未处理'}}</span></td>
                    <td>{{$timestampToTime(item.createDate)}}</td>
                  </tr>
                </table>
                <div class="block" v-if="rechargeObj.totalPage > 1">
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="rechargeObj.pageSize"
                    layout="total, prev, pager, next"
                    :total="rechargeObj.totalCount*1">
                  </el-pagination>
                </div>

              </div>

            </div>

            <div class="table" v-if="tabNum == '3'">
              <div class="shqitixian">
                <p class="grey">* 当前可取余额：<b style="color: green;">{{useMoney}}</b></p> 
                <div>
                  <div class="r">
                    状态：
                    <el-select v-model="forwardType" size="mini" @change="changeForwardType" placeholder="请选择">
                      <el-option key="1" value="1" label="已处理"></el-option> 
                      <el-option key="0" value="0" label="未处理"></el-option>
                    </el-select>
                  </div>
                  提现金额： 
                  <input type="text" v-model="forwardCash" placeholder="请输入金额" style="width: 80px;"> 
                  <el-select v-model="forwardFaction" size="mini" placeholder="请选择">
                    <el-option v-for="item in payType" :key="item.value" :value="item.value" :label="item.label"></el-option> 
                  </el-select>
                  <span style="margin-right: 5px;">
                    提现密码：<input type="text" v-model="forwardPass" style="width: 50px;">
                  </span> 
                  <el-button type="primary" size="mini" @click="forwardSubmit">确定</el-button>
                </div> 
                <table v-if="forwardObj.list" class="ask-table">
                  <tr>
                    <th>提现方式</th> 
                    <th>提现金额</th> 
                    <th>状态</th> 
                    <th>申请时间</th>
                  </tr> 
                  <tr v-if="forwardObj.list.length*1 == '0'">
                    <td  colspan="5">暂无数据</td> 
                  </tr>
                  <tr v-else v-for="item in forwardObj.list">
                    <td><span>{{item.type=='1'?'微信' : item.type=='2'? '支付宝' : '银行转帐'}}</span></td> 
                    <td>{{item.money}}</td> 
                    <td>{{item.status=='1'?'已通过' : item.status=='2'? '已拒绝' : '未处理'}}</span></td>
                    <td>{{$timestampToTime(item.createDate)}}</td>
                  </tr>
                </table>
                <div class="block" v-if="forwardObj.totalPage > 1">
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="forwardObj.pageSize"
                    layout="total, prev, pager, next"
                    :total="forwardObj.totalCount*1">
                  </el-pagination>
                </div>

              </div>

            </div>

            <div class="table" v-if="tabNum == '4'">
              <div class="cash-history">
                筛选:
                <el-select class="duanSelect" v-model="historyType" size="mini" @change="changeHistoryType" placeholder="请选择">
                  <el-option key="0" value="0" label="全部"></el-option>
                  <el-option key="1" value="1" label="充值"></el-option> 
                  <el-option key="2" value="2" label="提现"></el-option>
                </el-select>
                日期区间：
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  v-model="histDate"
                  size="mini"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  @change="getHisDate"
                  end-placeholder="结束日期"
                  >
                </el-date-picker>
                <el-button type="primary" size="mini" @click="gethistory(1)">查询</el-button>
                <table class="ask-table" v-if="historyDataList.list">
                  <tr>
                    <th width="40">方式</th> 
                    <th width="80">金额</th> 
                    <th width="80">余额</th> 
                    <th>备注</th> 
                    <th width="120">时间</th>
                  </tr> 
                  <tr v-if="historyDataList.list.length*1 == '0'">
                    <td  colspan="5">暂无数据</td> 
                  </tr>
                  <tr v-else v-for="item in historyDataList.list">
                    <td><span>{{item.type=='1'?'充值' : '提现'}}</span></td> 
                    <td>{{item.money}}</td> 
                    <td>{{item.totalMoney}}</span></td>
                    <td>{{item.remark}}</span></td>
                    <td>{{$timestampToTime(item.createDate)}}</td>
                  </tr>
                </table>
                <div class="block" v-if="historyDataList.totalPage > 1">
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="historyDataList.pageSize"
                    layout="total, prev, pager, next"
                    :total="historyDataList.totalCount*1">
                  </el-pagination>
                </div>
              </div> 

           </div>

          </div>
          <p class="btn-box" v-if="tabNum == '1' || (tabNum == '2' && !chongzhiHisOp)">
            <el-button type="primary" size="mini" @click="submit">确 定</el-button>
            <el-button type="primary" size="mini" @click="cancel">取 消</el-button>
          </p>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      historyDataList: {},
      historyType: '2',
      histDate: [],
      forwardPass: '',
      forwardFaction: '1',
      forwardCash: '0',
      useMoney: '',
      currentPage: 1,
      rechargeHisType: '0',
      paymoney: '',
      payremark: '',
      chongzhiImgSrc: '',
      chongzhiType: '',
      forwardType: '0',
      rechargeObj: {},
      forwardObj: {},
      chongzhiHisOp: false,
      bankInfoObj: {},
      caiwuYinhangzhuanzhangList: [],
      caiwuChongzhifangshi: {},
      newPass: ['--','--','--','--'],
      oldPass: ['--','--','--','--'],
      tabNum: '1',
      passType: false,
      mima: ['--','0','1','2','3','4','5','6','7','8','9'],
      payType: [
                {value: '1',label: '微信'},
                {value: '2',label: '支付宝'},
                {value: '3',label: '银行卡'},
                {value: '4',label: '现金'}
              ]

    }
  },
  created() {
    this.bankInfo();
  },
  computed: {
  },
  methods: {
    async gethistory(cur) {

      this.currentPage = cur;

      if(this.histDate.length == '0') {
        this.$alertMessage('日期不能为空!', '温馨提示');
      } else {
        let that = this;
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
            await that.$get(`${window.url}/api/hisRechargeForwardList?currentPage=`+cur+`&pageSize=10&createDateStart=`+this.histDate[0]+`&createDateEnd=`+this.histDate[1]+`&type=`+this.historyType).then((res) => {
              that.$handelResponse(res, (result) => {
          loading.close();
                if(result.code===200){
                  this.historyDataList = result.page;
                  that.$success('提交成功！');
                }
              })
            });
      }

    },
    getHisDate(data) {
      console.log(data);
    },
    async forwardSubmit() {

      if(this.forwardPass == '') {
        this.$alertMessage('提现密码不能为空!', '温馨提示');
      } else if(this.forwardPass != this.bankInfoObj.putForwardPassword) {
        this.$alertMessage('提现密码不正确!', '温馨提示');
      } else {
        let dataobj = {
          money: this.forwardCash*1,//提现金额
          type: this.forwardFaction*1,//提现方式,1:微信,2:支付宝,3:银行转账
          putForwardPassword: this.forwardPass//提现密码
        }

        let that = this;
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
            await that.$post(`${window.url}/api/forwardInfoSub`,dataobj).then((res) => {
              that.$handelResponse(res, (result) => {
          loading.close();
                if(result.code===200){
                  that.$success('提交成功！');
                  this.forwardList('0',1,10);
                }
              })
            });
      }

    },
    changeHistoryType(data) {
      this.gethistory(1);
    },
    changeForwardType(data) {
      this.forwardList(data,1,10);
    },
    changeRechHisType(data) {
      this.toChongzhiHis(data,1,10);
    },
    handleCurrentChange(cpage) {
      if(this.tabNum == '2') {
        this.toChongzhiHis(this.rechargeHisType,cpage,10);
      } else if(this.tabNum == '3') {
        this.forwardList(this.historyType,cpage,10);
      } else if(this.tabNum == '4') {
        this.gethistory(cpage);
      }
      
    },
    getchongzhiType(data) {
      console.log('data',data);

      this.chongzhiType = data;

      if(this.chongzhiType == '1') {
        if(this.caiwuChongzhifangshi.weixinEwma != '') {
          this.chongzhiImgSrc = this.caiwuChongzhifangshi.weixinEwma;
        } else if(this.caiwuChongzhifangshi.weixinEwmb != '') {
          this.chongzhiImgSrc = this.caiwuChongzhifangshi.weixinEwmb;
        } else if(this.caiwuChongzhifangshi.weixinEwmc != '') {
          this.chongzhiImgSrc = this.caiwuChongzhifangshi.weixinEwmc;
        } else if(this.caiwuChongzhifangshi.weixinEwmd != '') {
          this.chongzhiImgSrc = this.caiwuChongzhifangshi.weixinEwmd;
        } else if(this.caiwuChongzhifangshi.weixinEwme != '') {
          this.chongzhiImgSrc = this.caiwuChongzhifangshi.weixinEwme;
        }
      } else if(this.chongzhiType == '2') {
        if(this.caiwuChongzhifangshi.zhifubaoEwma != '') {
          this.chongzhiImgSrc = this.caiwuChongzhifangshi.zhifubaoEwma;
        } else if(this.caiwuChongzhifangshi.zhifubaoEwmb != '') {
          this.chongzhiImgSrc = this.caiwuChongzhifangshi.zhifubaoEwmb;
        } else if(this.caiwuChongzhifangshi.zhifubaoEwmc != '') {
          this.chongzhiImgSrc = this.caiwuChongzhifangshi.zhifubaoEwmc;
        } else if(this.caiwuChongzhifangshi.zhifubaoEwmd != '') {
          this.chongzhiImgSrc = this.caiwuChongzhifangshi.zhifubaoEwmd;
        } else if(this.caiwuChongzhifangshi.zhifubaoEwme != '') {
          this.chongzhiImgSrc = this.caiwuChongzhifangshi.zhifubaoEwme;
        }
      } else {

      }
    },
    returnChistory() {
      this.chongzhiHisOp = false;
    },
    async toChongzhiHis(rechType,cpage,pages) {
      this.chongzhiHisOp = true;

      let res = await this.$get(`${window.url}/api/rechargeList?status=`+rechType+`&currentPage=`+cpage+`&pageSize=`+pages);
      if(res.code===200){
        this.rechargeObj = res.page;
      }
    },
    async cancel() {
      if(this.tabNum == '1') {
        this.bankInfo();
      } else {
        this.payremark = '';
        this.chongzhiType = '';
        this.paymoney = '';
      }
    },
    async submit() {
      if(this.tabNum == '1') {
        let normal = true;
        let password = '';

        console.log('bankInfoObj',this.bankInfoObj);

        if(this.passType) {
          let oldpassword = '';
          for(let n in this.oldPass) {
            oldpassword += this.oldPass[n];
          }
          if(oldpassword != this.bankInfoObj.putForwardPassword) {
            normal = false;
            this.$alertMessage('旧密码不正确!', '温馨提示');
          } else {

            for(let n in this.newPass) {
              if(this.newPass[n] == '--') {
                normal = false;
                this.$alertMessage('请确认密码正确!', '温馨提示');
              }
            }
          }

        } else if(this.bankInfoObj.putForwardPassword == '') {
          for(let n in this.newPass) {
            if(this.newPass[n] == '--') {
              normal = false;
              this.$alertMessage('请确认密码正确!', '温馨提示');
            }
          }
        } else {
          password = this.bankInfoObj.putForwardPassword;
        }


        if(normal) {

          if(password == '') {
            for(let n in this.newPass) {
              password += this.newPass[n];
            }
          }

          let dataobj = {
            bankName: this.bankInfoObj.bankName,//银行名称
            bankNum: this.bankInfoObj.bankNum,//银行卡号
            bankUserName: this.bankInfoObj.bankUserName,//卡主姓名
            phone: this.bankInfoObj.phone,//手机号码
            weixin: this.bankInfoObj.weixin,//微信支付账号
            zhifubao: this.bankInfoObj.zhifubao,//支付宝账号
            putForwardPassword: password//提现密码
          }

          console.log('dataobj',dataobj);

          let that = this;
          const loading = this.$loading({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
          await that.$post(`${window.url}/api/bankInfoSub`,dataobj).then((res) => {
            that.$handelResponse(res, (result) => {
          loading.close();
              if(result.code===200){
                //更新用户信息
                // bus.$emit('getcUserInfo', ''); 
                // that.orderDatas.list = [];
                that.$success('修改成功！');
                // that.reset();
                that.bankInfo();
              }
            })
          });

        }
        
      } else if(this.tabNum == '2') {
        if(this.chongzhiType == '') {
          this.$alertMessage('请确认充值方式!', '温馨提示');
        } else if(this.paymoney == '') {
          this.$alertMessage('请确认充值金额!', '温馨提示');
        } else if(this.payremark == '') {
          this.$alertMessage('请确认充值备注', '温馨提示');
        } else {
          let subobj = {
            type: this.chongzhiType*1,//充值方式,1:微信,2:支付宝,3:银行转账
            money: this.paymoney*1,//充值金额
            remark: this.payremark//充值备注
          }

          let res = await this.$post(`${window.url}/api/rechargeInfoSub`, subobj);

          if(res.code === 200) {
            this.$success('提交成功!');
          }
        }
      }
    },
    chanPassType() {
      this.passType = true;
      this.oldPass = ['--','--','--','--'];
      this.newPass = ['--','--','--','--'];
    },
    async historyInfo() {
      $('.historyInfo').addClass('active').siblings().removeClass('active');
      this.tabNum = '4';
    },
    async forwardList(rechType,cpage,pages) {

      this.currentPage = cpage;

      let res = await this.$get(`${window.url}/api/forwardList?status=`+rechType+`&currentPage=`+cpage+`&pageSize=`+pages);
      if(res.code===200){
        this.forwardObj = res.page;
        this.useMoney = res.useMoney;
      }
    },
    async forwardInfo() {
      if(this.bankInfoObj.putForwardPassword == '') {
        this.$alertMessage('请先设置提现密码，才能访问!', '温馨提示');
      } else {
        $('.forwardInfo').addClass('active').siblings().removeClass('active');

        this.forwardList('0',1,10);

        this.tabNum = '3';
      }
    },
    async rechargeInfo() {
      if(this.bankInfoObj.putForwardPassword == '') {
        this.$alertMessage('请先设置提现密码，才能访问!', '温馨提示');
      } else {
        $('.rechargeInfo').addClass('active').siblings().removeClass('active');

        let res = await this.$get(`${window.url}/api/rechargeInfo`);

        if(res.code===200){

          this.caiwuYinhangzhuanzhangList = res.caiwuYinhangzhuanzhangList;
          this.caiwuChongzhifangshi = res.caiwuChongzhifangshi;
        }

        this.tabNum = '2';
      }
      
    },
    async bankInfo() {
      $('.bankInfo').addClass('active').siblings().removeClass('active');

      let res = await this.$get(`${window.url}/api/bankInfo`);

      if(res.code===200){
        this.bankInfoObj = res.data;

        if(this.bankInfoObj.bankUserName != '') {
          $(".bankUserName").attr("disabled", true);
        }
        if(this.bankInfoObj.weixin != '') {
          $(".weixin").attr("disabled", true);
        }
        if(this.bankInfoObj.zhifubao != '') {
          $(".zhifubao").attr("disabled", true);
        }

        this.passType = false;
      }

      this.tabNum = '1';
    }
  },
  mounted() {
  },
  updated() {
  }
};
</script>
<style scoped>
</style>
<style lang="less">
.duanSelect {
  width: 12%;
}
</style>