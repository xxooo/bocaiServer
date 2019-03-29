<template>
  <div id="youxishezhi" class="content-main">
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>游戏管理</el-breadcrumb-item>
        <el-breadcrumb-item>补货设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="nav">
    </div>

    <div class="portlet portlet-add">
        <div class="tab"><table><thead><tr><th>PC蛋蛋</th> <th>补货类型</th> <th>
            触发补货数值
            <p>* 如果补货数值设置大于0，将开启自动补货 *</p></th> <th>
            触发补货报警数值
            <p>* 如果自动补货开启，报警将会失效 *</p></th></tr></thead> <tr><td class="row-th">大小</td> <td><label><input type="radio" value="3">盈亏</label> <label><input type="radio" value="0">注单数</label> <label><input type="radio" value="1">下注总额</label></td> <td><input type="text" class="odds-font"></td> <td><input type="text" class="odds-font"></td></tr><tr><td class="row-th">单双</td> <td><label><input type="radio" value="3">盈亏</label> <label><input type="radio" value="0">注单数</label> <label><input type="radio" value="1">下注总额</label></td> <td><input type="text" class="odds-font"></td> <td><input type="text" class="odds-font"></td></tr><tr><td class="row-th">色波</td> <td><label><input type="radio" value="3">盈亏</label> <label><input type="radio" value="0">注单数</label> <label><input type="radio" value="1">下注总额</label></td> <td><input type="text" class="odds-font"></td> <td><input type="text" class="odds-font"></td></tr><tr><td class="row-th">半波</td> <td><label><input type="radio" value="3">盈亏</label> <label><input type="radio" value="0">注单数</label> <label><input type="radio" value="1">下注总额</label></td> <td><input type="text" class="odds-font"></td> <td><input type="text" class="odds-font"></td></tr><tr><td class="row-th">半特</td> <td><label><input type="radio" value="3">盈亏</label> <label><input type="radio" value="0">注单数</label> <label><input type="radio" value="1">下注总额</label></td> <td><input type="text" class="odds-font"></td> <td><input type="text" class="odds-font"></td></tr><tr><td class="row-th">豹子</td> <td><label><input type="radio" value="3">盈亏</label> <label><input type="radio" value="0">注单数</label> <label><input type="radio" value="1">下注总额</label></td> <td><input type="text" class="odds-font"></td> <td><input type="text" class="odds-font"></td></tr><tr><td class="row-th">特码</td> <td><label><input type="radio" value="3">盈亏</label> <label><input type="radio" value="0">注单数</label> <label><input type="radio" value="1">下注总额</label></td> <td><input type="text" class="odds-font"></td> <td><input type="text" class="odds-font"></td></tr></table> <div class="flyInput"><span>补货类型：</span> <select name="" id="" class="mgr10"><option value="-1">请选择类型</option> <option value="3">盈亏</option> <option value="0">注单数</option> <option value="1">下注总额</option></select> <span>批量设置：</span> <label><input type="radio" value="0"> 触发补货数值</label> <label><input type="radio" value="1"> 解发补货报警数值</label> <input type="text" placeholder="请输入数值"> <button class="tabBtn btn-blue mgr10">填入</button></div> <div class="inner"><button class="btn-submit">保存</button> <button class="btn-cancel">取消</button></div>
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
