<template>
  <div id="youxishezhi" class="content-main">
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>充值审核</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="nav">
      <span>状态:
        <el-select v-model="q.status" @change="changeStatus" placeholder="请选择" size="mini">
          <el-option :key="0" :label="'未处理'" :value="0"></el-option>
          <el-option :key="1" :label="'已处理'" :value="1"></el-option>
        </el-select>
      </span>
        <el-input v-model="q.username" placeholder="请输入会员帐号" size="mini" style="width: 15%;"></el-input>
        <button class="btn btn-blue" @click="query()">查询</button>
    </div>

    <div class="portlet portlet-add">
      <div class="tab">

        <table class="main-tables">
            <tr>
              <th>会员帐号</th>
                <th>充值方式</th>
                <th>充值金额</th>
                <th>备注</th>
                <th>微信</th>
                <th>支付宝</th>
                <th>QQ钱包</th>
                <th>银行类型</th>
                <th>银行账号</th>
                <th>卡主</th>
                <th>申请时间</th>
                <th>操作</th>
            </tr>
            <tr v-for="rechargeAudit in rechargeAuditList">
                <td>{{rechargeAudit.username}}</td>
                <template v-if="q.status == 1">
                <td v-if="rechargeAudit.type == 1">微信</td><td v-else-if="rechargeAudit.type == 2">支付宝</td><td v-else="rechargeAudit.type == 3">银行转账</td>
                </template>
                <td v-else>
                    <select v-model="rechargeAudit.type">
                        <option value="1">微信</option>
                        <option value="2">支付宝</option>
                        <option value="3">银行转账</option>
                    </select>
                </td>

                <template v-if="q.status == 1">
                    <td>{{rechargeAudit.money}}</td>
                </template>
                <template v-else>
                    <td><input type="text" v-model="rechargeAudit.money" /></td>
                </template>

                <template v-if="q.status == 1">
                    <td>{{rechargeAudit.remark}}</td>
                </template>
                <template v-else>
                    <td><input type="text" v-model="rechargeAudit.remark" /></td>
                </template>

                <td>{{rechargeAudit.weixin}}</td>
                <td>{{rechargeAudit.zhifubao}}</td>
                <td>--</td>
                <td>{{rechargeAudit.bankName}}</td>
                <td>{{rechargeAudit.bankNum}}</td>
                <td>{{rechargeAudit.bankUserName}}</td>
                <td>{{$timestampToTime(rechargeAudit.createDate)}}</td>
                <td v-if="rechargeAudit.status == 0">
                    <button class="btn" @click="audit(rechargeAudit.id,1,rechargeAudit.type,rechargeAudit.money,rechargeAudit.remark,rechargeAudit.userId)" type="button">通过</button>
                    <button class="btn" @click="translateAudit(rechargeAudit.id,2,rechargeAudit.type,rechargeAudit.money,rechargeAudit.remark,rechargeAudit.userId)" data-target="#modifyAudit" type="button">拒绝</button>
                </td>
                <td v-else-if="rechargeAudit.status == 1">
                    已通过
                </td>
                <td v-else>
                    <!-- 已拒绝({{rechargeAudit.refuseReason}}) -->
                    已拒绝
                </td>
            </tr>

        </table>


        <div class="block" v-if="page.totalPage > 1">
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="page.currentPage"
                    :page-size="page.pageSize"
                    layout="total, prev, pager, next"
                    :total="page.totalCount*1">
                  </el-pagination>
        </div>

      </div>
    </div>

    <el-dialog class="add-user-dialog" :title="'请输入拒绝原因'" id="modifyLoty" :visible.sync="dialogvisible" width="40%">
      <div class="modal-body">
            <textarea placeholder="请输入拒绝原因"  rows="3" v-model="rechargeAudit.refuseReason" style="width: 90%;"></textarea>
        </div>
        <div class="modal-footer">
            <button class="btn" aria-hidden="true">取消</button>
            <button class="btn btn-primary" @click="audit('','','','','','')">保存</button>
        </div>
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
      bocaiId: 1,
      baseBocaiInfo: {},
      routerName: this.$route.name,
      dialogvisible: false,

       page: {
            totalPage: 1,
            currentPage:1,
            pageSize:10
        },
        showList: true,
        title: null,
        q: {//查询条件
            username: "",
            status:0,
        },
        rechargeAudit: {//对象
            refuseReason:""//拒绝原因
        },
        rechargeAuditList:{},//注单清理列表
    }
  },
  computed: {
    ...mapGetters({
      ruleId:'getruleId',
      userInfo: 'getuserInfo',
      bocaiMenu: 'getbocaiMenu'
    })
  },
  created() {
    this.getrecharge();
  },
  mounted(){
  },
  methods: {

    reload() {
            this.showList = true;
            this.getrecharge();
        },
        query() {
            this.reload();
        },
        changeStatus(){
            this.rechargeAuditList = {};
        },
        audit(id,status,type,money,remark,userId) {
            let that = this;

            if(id!=""){
                this.rechargeAudit.id = id;
            }
            if(status!=""){
                this.rechargeAudit.status = status;
            }
            if(type!=""){
                this.rechargeAudit.type = type;
            }
            if(money!=""){
                this.rechargeAudit.money = money;
            }
            if(remark!=""){
                this.rechargeAudit.remark = remark;
            }
            if(userId!=""){
                this.rechargeAudit.userId = userId;
            }


            this.$c_msgconfirm("审核操作将立即生效且不可恢复,是否确定继续审核？",async () => {

                const loading = this.$loading({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });

                await that.$post(`${window.url}/admin/finance/rechargeAudit`,this.rechargeAudit).then((res) => {
                    that.$handelResponse(res, (result) => {
                        loading.close();
                        if (result.code == 200) {
                                that.$success('操作成功');
                                that.reload();
                                that.dialogvisible = false;
                            } else {
                              that.$error(result.msg);
                            }
                    })
                  });

            });

        },
        translateAudit(id,status,type,money,remark,userId){
            this.rechargeAudit.id = id;
            this.rechargeAudit.status = status;
            this.rechargeAudit.type = type;
            this.rechargeAudit.money = money;
            this.rechargeAudit.remark = remark;
            this.rechargeAudit.userId = userId;

            this.dialogvisible = true;
        },

    handleCurrentChange(cpage) {
      this.page.currentPage = cpage;
      this.getrecharge();
    },
    async getrecharge() {
        let that = this;


        let url = 'admin/finance/rechargeAuditList?status='+this.q.status;
        if (null != this.q.username && '' != this.q.username) {
            url = url + "&username=" + this.q.username
        }

        let data = await this.$get(`${window.url}/`+ url +`&currentPage=`+this.page.currentPage+`&pageSize=`+this.page.pageSize);
            if(+data.code===200) {

              that.rechargeAuditList = data.page.list;
                if(data.page.totalPage == 0){
                    that.page.totalPage = 1;
                }else{
                    that.page.totalPage = data.page.totalPage;
                    that.page.totalCount = data.page.totalCount;
                }

            }

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
