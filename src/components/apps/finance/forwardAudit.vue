<template>
  <div id="youxishezhi" class="content-main">
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>提现审核</el-breadcrumb-item>
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
                <th>提现方式</th>
                <th>提现账号</th>
                <th>提现金额</th>
                <th>姓名</th>
                <th>银行名称</th>
                <th>提现密码</th>
                <th>申请时间</th>
                <th>操作</th>
            </tr>

            <tr v-for="forwardAudit in forwardAuditList">
                <td>{{forwardAudit.username}}</td>
                <td v-if="forwardAudit.type == 1">微信</td><td v-else-if="forwardAudit.type == 2">支付宝</td><td v-else="forwardAudit.type == 3">银行转账</td>

                <td v-if="forwardAudit.type == 1">{{forwardAudit.weixin}}</td>
                <td v-else-if="forwardAudit.type == 2">{{forwardAudit.zhifubao}}</td>
                <td v-else>{{forwardAudit.bankNum}}</td>
                <td>{{forwardAudit.money}}</td>

                <td v-if="forwardAudit.type == 3">{{forwardAudit.bankUserName}}</td>
                <td v-else>--</td>

                <td v-if="forwardAudit.type == 3">{{forwardAudit.bankName}}</td>
                <td v-else>--</td>
                <td>{{forwardAudit.putForwardPassword}}</td>
                <td>{{$timestampToTime(forwardAudit.createDate)}}</td>
                <td v-if="forwardAudit.status == 0">
                    <button class="btn" @click="audit(forwardAudit.id,1,forwardAudit.type,forwardAudit.money,forwardAudit.remark,forwardAudit.userId)" type="button">通过</button>
                    <button class="btn" @click="translateAudit(forwardAudit.id,2,forwardAudit.type,forwardAudit.money,forwardAudit.remark,forwardAudit.userId)" type="button">拒绝</button>
                </td>
                <td v-else-if="forwardAudit.status == 1">
                    已通过
                </td>
                <td v-else>
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
            <textarea placeholder="请输入拒绝原因"  rows="3" v-model="forwardAudit.refuseReason" style="width: 90%;"></textarea>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary" @click="audit('','','','','','')">保存</button>
            <button class="btn" aria-hidden="true">取消</button>
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
        forwardAudit: {//对象
            refuseReason:""//拒绝原因
        },
        forwardAuditList:{},//注单清理列表
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
    this.getforwardAudit();
  },
  mounted(){
  },
  methods: {

    reload() {
            this.showList = true;
            this.getforwardAudit();
        },
        query() {
            this.reload();
        },
        changeStatus(){
            this.forwardAuditList = {};
        },
        audit(id,status,type,money,remark,userId) {
            let that = this;

             if(id!=""){
                this.forwardAudit.id = id;
            }
            if(status!=""){
                this.forwardAudit.status = status;
            }
            if(type!=""){
                this.forwardAudit.type = type;
            }
            if(money!=""){
                this.forwardAudit.money = money;
            }
            if(remark!=""){
                this.forwardAudit.remark = remark;
            }
            if(userId!=""){
                this.forwardAudit.userId = userId;
            }


            this.$c_msgconfirm("审核操作将立即生效且不可恢复,是否确定继续审核？",async () => {

              const loading = this.$loading({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });

                await that.$post(`${window.url}/admin/finance/forwardAudit`,this.forwardAudit).then((res) => {
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
            this.forwardAudit.id = id;
            this.forwardAudit.status = status;
            this.forwardAudit.type = type;
            this.forwardAudit.money = money;
            this.forwardAudit.remark = remark;
            this.forwardAudit.userId = userId;

            this.dialogvisible = true;
        },


    handleCurrentChange(cpage) {
      this.page.currentPage = cpage;
      this.getforwardAudit();
    },
    async getforwardAudit() {
        let that = this;


        let url = 'admin/finance/forwardAuditList?status='+this.q.status;
        if (null != this.q.username && '' != this.q.username) {
            url = url + "&username=" + this.q.username
        }


        let data = await this.$get(`${window.url}/`+ url +`&currentPage=`+this.page.currentPage+`&pageSize=`+this.page.pageSize);
            if(+data.code===200) {

              that.forwardAuditList = data.page.list;
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
