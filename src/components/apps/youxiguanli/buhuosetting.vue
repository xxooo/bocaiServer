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
        <div class="tab">
          <table>
            <thead>
              <tr>
                <th>PC蛋蛋</th> 
                <th>补货类型</th> 
                <th>触发补货数值<p>* 如果补货数值设置大于0，将开启自动补货 *</p></th> 
                <th>触发补货报警数值<p>* 如果自动补货开启，报警将会失效 *</p></th>
              </tr>
            </thead> 
            <tr>
              <td class="row-th">大小</td> 
              <td>
                <label><input type="radio" value="3">盈亏</label> 
                <label><input type="radio" value="0">注单数</label> 
                <label><input type="radio" value="1">下注总额</label>
              </td> 
              <td><input type="text" class="odds-font"></td> 
              <td><input type="text" class="odds-font"></td>
            </tr>
          </table> 

          <div class="flyInput">
            <span>补货类型：</span> 
            <select name="" id="" class="mgr10">
              <option value="-1">请选择类型</option> 
              <option value="3">盈亏</option> 
              <option value="0">注单数</option> 
              <option value="1">下注总额</option>
            </select> 
            <span>批量设置：</span> 
            <label><input type="radio" value="0"> 触发补货数值</label> 
            <label><input type="radio" value="1"> 解发补货报警数值</label> 
            <input type="text" placeholder="请输入数值"> 
            <button class="tabBtn btn-blue mgr10">填入</button>
          </div> 
          <div class="inner">
            <button class="btn-submit">保存</button> 
            <button class="btn-cancel">取消</button>
          </div>
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
      auserId: '',
      bocaiTypeId: ''

    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'getuserInfo',
    })
  },
  created() {
    this.replenishment();

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
    async replenishment() {

      //admin/gameManage/replenishment?auserId=163&bocaiTypeId=8223

        let res = await this.$get(`${window.url}/admin/gameManage/replenishment?auserId=`);

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

.portlet thead p {
    font-size: 12px;
    color: #ffd900;
}
.portlet tr input {
    font-size: 14px;
    text-align: center;
}
</style>
