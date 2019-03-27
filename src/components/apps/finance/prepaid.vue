<template>
  <div id="youxishezhi" class="content-main">
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>充值方式</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="nav">
    </div>

    <div class="portlet portlet-add">
        <div class="tab">
            <table>
                <thead>
                    <tr>
                      <th colspan="3">充值方式</th>
                    </tr>
                </thead> 
                <tr>    
                    <td width="20%" class="tar">充值限额</td> 
                    <td class="tl"><input v-model="chongzhiXiane" type="text" placeholder="请填写金额" class="mgr10"> <b class="red">* 0 代表不限制</b></td>
                </tr> 
                <tr>
                    <td width="20%" class="tar">提现限额</td> 
                    <td class="tl"><input v-model="tixianXiane" type="text" placeholder="请填写金额" class="mgr10"> <b class="red">* 0 代表不限制</b></td>
                </tr> 
                <tr>
                    <td width="20%" class="tar">提现次数</td> 
                    <td class="tl"><input v-model="tixianCishu" type="text" placeholder="请填写整数" class="mgr10"> <b class="red">* 0 代表不限制</b></td>
                </tr> 
                <tr>
                    <td width="20%" class="tar">银行转账</td> 
                    <td class="tl">
                        <table>
                            <tr>
                                <th>银行类型</th> 
                                <th>银行账号</th> 
                                <th>收款人姓名</th> 
                                <th width="80">操作</th>
                            </tr>  
                            <tr v-if="caiwuYinhangzhuanzhangList.length != 0" v-for="item in caiwuYinhangzhuanzhangList">
                                <td>{{item.yinhangLeixing}}</td> 
                                <td>{{item.yinhangZhanghao}}</td> 
                                <td>{{item.shoukuanXingming}}</td> 
                                <td class="btnFeatures">
                                    <button class="tabBtn btn btn-blue" @click="deleteka(item)">删除</button>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4" style="text-align: right;">
                                    <button class="tabBtn btn btn-blue" @click="dialogvisible = true">新增银行卡</button>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr> 
                <tr>
                    <td width="20%" class="tar">手机</td> 
                    <td class="tl"><input v-model="shouji" type="text"></td>
                </tr> 
                <tr>
                    <td width="20%" class="tar">QQ</td> 
                    <td class="tl"><input v-model="qq" type="text"></td>
                </tr> 
                <tr>
                    <td width="20%" class="tar">
                        支付宝二维码 1
                        <br> <span class="red">上传多个二维码时随机显示一个</span> 
                        <div class="gray">
                            尺寸: 120 x 120
                            <br>
                            大小: 200K
                        </div>
                    </td> 
                    <td>
                    </td>
                </tr>
            </table> 

            <p class="tac" style="margin-top: 8px;">
                <button class="tabBtn btn btn-blue" @click="save">保存</button>
            </p>
        </div>

    </div>


    <el-dialog
      title="新增银行卡"
      :visible.sync="dialogvisible"
      center>
      <el-form label-width="100px" class="demo-ruleForm" size="mini">
              <el-form-item label="银行类型" prop="">
                <el-input v-model="yinhangLeixing"></el-input>
              </el-form-item>
              <el-form-item label="银行账号" prop="">
                <el-input v-model="yinhangZhanghao"></el-input>
              </el-form-item>
              <el-form-item label="收款人姓名" prop="">
                <el-input v-model="shoukuanXingming"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="medium" type="primary" @click="saveka">提 交</el-button>
                <el-button size="medium" @click="dialogvisible = false">取 消</el-button>
              </el-form-item>
            </el-form>

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
      dialogvisible: false,
        id: '',
        chongzhiXiane: 0,
        tixianXiane: 0,
        tixianCishu: 0,
        shouji: '',
        qq: '',
        zhifubaoEwma: '',
        zhifubaoEwmb: '',
        zhifubaoEwmc: '',
        zhifubaoEwmd: '',
        zhifubaoEwme: '',
        weixinEwma: '',
        weixinEwmb: '',
        weixinEwmc: '',
        weixinEwmd: '',
        weixinEwme: '',
        auserId: '',
        caiwuYinhangzhuanzhangList: [],

        yinhangLeixing:"",//银行类型
        yinhangZhanghao:"",//银行账号
        shoukuanXingming:"",//收款姓名
        chongzhifangshiId:''//充值方式ID

    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'getuserInfo',
    })
  },
  created() {
    this.getmethod();

    console.log('userInfo',this.userInfo);
  },
  mounted(){
  },
  methods: {
    async deleteka(item) {
        let that = this;
        this.$c_msgconfirm("确认删除此银行卡吗？",async () => {

                await that.$get(`${window.url}/admin/finance/deleteBankCard?caiwuYinhangzhuanzhangId=`+item.id).then((res) => {
                    that.$handelResponse(res, (result) => {
                        if (result.code == 200) {
                                that.$success('删除成功');
                                that.getmethod();
                            } else {
                              that.$error(result.msg);
                            }
                    })
                  });

            });
    },
    async saveka() {
        let that = this;
            let obj = {
                yinhangLeixing: this.yinhangLeixing,
                yinhangZhanghao: this.yinhangZhanghao,
                shoukuanXingming: this.shoukuanXingming,
                chongzhifangshiId: this.chongzhifangshiId,
            }


                await that.$post(`${window.url}/admin/finance/bankCardSub`,obj).then((res) => {
                    that.$handelResponse(res, (result) => {
                        if (result.code == 200) {
                                that.$success('操作成功');
                                that.getmethod();
                                that.dialogvisible = false;
                            } else {
                              that.$error(result.msg);
                              that.dialogvisible = false;
                            }
                    })
                  });
    },
    async getmethod() {
        let res = await this.$get(`${window.url}/admin/finance/finance`);

        if (res.code == 200) {
            this.chongzhiXiane = res.caiwuChongzhifangshi.chongzhiXiane;
            this.tixianXiane = res.caiwuChongzhifangshi.tixianXiane;
            this.tixianCishu = res.caiwuChongzhifangshi.tixianCishu;
            this.shouji = res.caiwuChongzhifangshi.shouji;
            this.qq = res.caiwuChongzhifangshi.qq;
            this.zhifubaoEwma= res.caiwuChongzhifangshi.zhifubaoEwma;
            this.zhifubaoEwmb= res.caiwuChongzhifangshi.zhifubaoEwmb;
            this.zhifubaoEwmc= res.caiwuChongzhifangshi.zhifubaoEwmc;
            this.zhifubaoEwmd= res.caiwuChongzhifangshi.zhifubaoEwmd;
            this.zhifubaoEwme= res.caiwuChongzhifangshi.zhifubaoEwme;
            this.weixinEwma= res.caiwuChongzhifangshi.weixinEwma;
            this.weixinEwmb= res.caiwuChongzhifangshi.weixinEwmb;
            this.weixinEwmc= res.caiwuChongzhifangshi.weixinEwmc;
            this.weixinEwmd= res.caiwuChongzhifangshi.weixinEwmd;
            this.weixinEwme= res.caiwuChongzhifangshi.weixinEwme;
            this.auserId= res.caiwuChongzhifangshi.auserId;
            this.caiwuYinhangzhuanzhangList = res.caiwuYinhangzhuanzhangList;

            this.chongzhifangshiId = res.caiwuChongzhifangshi.id;
            this.id = res.caiwuChongzhifangshi.id;

        } else {
            this.$error(res.msg);
        }

    },
    async save() {
            let that = this;

            let obj = {
                id: this.id,
                auserId: this.auserId,
                chongzhiXiane: this.chongzhiXiane*1,
                tixianXiane: this.tixianXiane*1,
                tixianCishu: this.tixianCishu*1,
                shouji: this.shouji,
                qq: this.qq,
                zhifubaoEwma: this.zhifubaoEwma,
                zhifubaoEwmb: this.zhifubaoEwmb,
                zhifubaoEwmc: this.zhifubaoEwmc,
                zhifubaoEwmd: this.zhifubaoEwmd,
                zhifubaoEwme: this.zhifubaoEwme,
                weixinEwma: this.weixinEwma,
                weixinEwmb: this.weixinEwmb,
                weixinEwmc: this.weixinEwmc,
                weixinEwmd: this.weixinEwmd,
                weixinEwme: this.weixinEwme
            }


                await that.$post(`${window.url}/admin/finance/financeSub`,obj).then((res) => {
                    that.$handelResponse(res, (result) => {
                        if (result.code == 200) {
                                that.$success('操作成功');
                                that.getmethod();
                            } else {
                              that.$error(result.msg);
                            }
                    })
                  });


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
