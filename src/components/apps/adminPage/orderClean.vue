<template>
  <div id="youxishezhi" class="content-main">
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>数据清理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="nav">
      <span>游戏类型:
        <el-select v-model="q.bocaiTypeId" @change="bocaiTypeSelect()" placeholder="请选择" size="mini">
          <el-option
            v-for="item in bocaiMenu"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </span>
      日期 :
        <el-date-picker
          @change="changedate"
          style="width: 15%;"
          size="mini"
          v-model="q.dateStr"
          value-format="yyyy-MM-d"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <el-input v-model="q.username" placeholder="请输入会员帐号" size="mini" style="width: 15%;"></el-input>
        <button class="btn btn-blue" @click="userList()">查询</button>
    </div>

    <div class="nav">
        <div class="operate-btn">
          <el-date-picker
              v-model="mouthStr"
              type="month"
              style="width: 15%;"
              size="mini"
              value-format="yyyy-MM"
              placeholder="选择要批量删除的月份">
          </el-date-picker>
          <button class="btn btn-blue" @click="batchDelete()" type="button">批量删除</button>
          <button class="btn btn-blue" @click="userList()">刷新</button>
        </div>

    </div>


    <div class="portlet portlet-add">
      <div class="tab">

        <table class="main-tables">
            <tr>
               <th> 注单号</th>
                <th>投注时间</th>
                <th>用户名称</th>
                <th>游戏类型</th>
                <th>游戏内容</th>
                <th>金额</th>
                <th>结果</th>
                <th>注单状态</th>
                <th>下注 IP</th>
                <th>操作</th>
            </tr>
            <tr v-for="orderClean in orderCleanList">
                <td>{{orderClean.orderNum}}</td>
                <td>{{$timestampToTime(orderClean.createDate)}}</td>
                <td>{{orderClean.username}}</td>
                <td>{{orderClean.bocaiTypeName}}/{{orderClean.periods}}期</td>
                <td v-if="orderClean.bocaiValue!=null && orderClean.bocaiValue != ''">{{orderClean.bocaiValue}}@{{orderClean.odds}}</td>
                <td v-else>{{orderClean.bocaiOddName}}@{{orderClean.odds}}</td>
                <td>{{orderClean.betsMoney}}</td>
                <td class="text-error" v-if="orderClean.winnerStatus == 0">未中奖</td>
                <td class="text-error" v-else>中奖{{orderClean.winnerMoney}}</td>
                <td v-if="orderClean.status == 0">未结算</td>
                <td v-else>已结算</td>
                <td v-if="orderClean.bindingIp != ''">{{orderClean.bindingIp}}</td>
                <td v-else>{{orderClean.loginIp}}</td>
                <td><button class="btn" @click="idDelete(orderClean.id,orderClean.status)" type="button">删除</button></td>
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

      page: {
            totalPage: 1,
            currentPage:1,
            pageSize:10
        },
        mouthStr: '',
        showList: true,
        title: null,
        q: {//查询条件
            username: "",
            dateStr: '',
            dayStr:"",
            mouthStr:"",
            bocaiTypeId:""
        },
        cuser: {//对象
            id: null,
            bindingIp: "",
        },
        mouthList: {},//月份
        orderCleanList:{},//注单清理列表
        dayList:{},
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
    this.userList();
  },
  mounted(){
  },
  methods: {
    handleCurrentChange(cpage) {
      this.page.currentPage = cpage;
      this.userList();
    },
    changedate(date) {
        this.q.mouthStr = date.substring(0, 7);
        this.q.dayStr = date;
    },
    idDelete(id,status) {
        let that = this;
        if(status == 0){
            this.$alertMessage('该订单还没结算,禁止删除!', '温馨提示');
            return false;
        }

        this.$c_msgconfirm("是否确认删除",async () => {

            await that.$get(`${window.url}/admin/clear/deleteData?id=`+id).then((res) => {
                that.$handelResponse(res, (result) => {
                    if (result.code == 200) {
                            that.$success('删除成功');
                            that.userList();
                        } else {
                            that.$error(result.msg);
                        }
                })
              });

        });

    },
    async userList() {
        let that = this;
        let url = 'admin/clear/orderCleanList?1=1';

        if (null != this.q && null != this.q.bocaiTypeId && '' != this.q.bocaiTypeId) {
            url = url + "&bocaiTypeId=" + this.q.bocaiTypeId
        }
        if (null != this.q && null != this.q.mouthStr && '' != this.q.mouthStr) {
            url = url + "&mouthStr=" + this.q.mouthStr
        }
        if (null != this.q && null != this.q.dayStr && '' != this.q.dayStr) {
            url = url + "&dayStr=" + this.q.dayStr
        }
        if (null != this.q && null != this.q.username && '' != this.q.username) {
            url = url + "&username=" + this.q.username
        }


        let data = await this.$get(`${window.url}/`+ url +`&currentPage=`+this.page.currentPage+`&pageSize=`+this.page.pageSize);
            if(+data.code===200) {

                that.orderCleanList = data.page.list;

                //that.mouthList = data.mouthList;

                if(data.page.totalPage == 0){
                    that.page.totalPage = 1;
                }else{
                    that.page.totalPage = data.page.totalPage;
                    this.page.totalCount = data.page.totalCount;
                }

            }
    },
    batchDelete() {
        let that = this;
            let mouthStr = this.mouthStr;
            if(mouthStr==null || mouthStr == ""){
                this.$alertMessage('请先选择要删除的月份!', '温馨提示');
                return false;
            }

            this.$c_msgconfirm("是否确认删除"+mouthStr+"当月数据",async () => {

            await that.$get(`${window.url}/admin/clear/deleteData?mouthStr=`+mouthStr).then((res) => {
                that.$handelResponse(res, (result) => {
                    if (result.code == 200) {
                            that.$success('删除成功');
                            that.userList();
                        } else {
                            that.$error(result.msg);
                        }
                })
              });

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
