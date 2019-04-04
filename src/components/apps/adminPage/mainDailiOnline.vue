<template>
  <div id="youxishezhi" class="content-main">
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>在线管理</el-breadcrumb-item>
        <el-breadcrumb-item>代理在线</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="nav">
        <el-select v-model="q.ruleId" placeholder="请选择" size="mini">
              <el-option key="0" label="请选择级别" value="0"></el-option>
              <el-option key="2" label="运营" value="2"></el-option>
              <el-option key="3" label="公司" value="3"></el-option>
              <el-option key="4" label="股东" value="4"></el-option>
              <el-option key="5" label="总代理" value="5"></el-option>
              <el-option key="6" label="代理" value="6"></el-option>
        </el-select>

      </span>
      <button class="btn btn-blue" @click="query()">查询</button>
    </div>

    <div class="portlet portlet-add">

      <div class="tab" v-if="showList">

        <table class="main-tables">
            <tr>
                <th v-if="q.ruleId == 4">股东名称</th><th v-else-if="q.ruleId == 5">总代理名称</th><th v-else-if="q.ruleId == 6">代理名称</th><th v-else>名称</th>
                <th>活动时间</th>
                <th>活动内容</th>
                <th>登陆 IP</th>
                <th>功能</th>
            </tr>
            <tr v-for="dailiOnline in dailiOnlineList">
                <td>{{dailiOnline.username}}</td>
                <td>{{$timestampToTime(dailiOnline.createDate)}}</td>
                <td>{{dailiOnline.operationContent}}</td>
                <td class="text-error">{{dailiOnline.loginIp}}</td>
                <td>
                    <button class="btn" type="button" @click="searchTimely(dailiOnline.id)">查即</button>
                    <button class="btn" type="button" @click="searchAll(dailiOnline.id)">查全</button>
                    <button class="btn" type="button" @click="downline(dailiOnline)">踢线</button>
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


    <el-dialog :visible.sync="dialogvisibletixi" width="60%" :title="'用户24小时活跃情况'">
      <el-table
        :data="yonghuSearchTielyList"
        style="width: 100%">
        <el-table-column
          prop="username"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          label="活动时间">
          <template slot-scope="scope">
              {{$timestampToTime(scope.row.createDate)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="operationContent"
          label="活动内容">
        </el-table-column>
        <el-table-column
          prop="userIp"
          label="登录IP">
        </el-table-column>
      </el-table>

      <div class="block" v-if="page2.totalPage > 1">
                  <el-pagination
                    @current-change="handleCurrentChange2"
                    :current-page.sync="page2.currentPage"
                    :page-size="page2.pageSize"
                    layout="total, prev, pager, next"
                    :total="page2.totalCount*1">
                  </el-pagination>
        </div>

    </el-dialog>


    <el-dialog :visible.sync="dialogvisibletixi3" width="60%" :title="'用户活跃情况'">
      <el-table
        :data="yonghuSearchAllList"
        style="width: 100%">
        <el-table-column
          prop="username"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          label="活动时间">
          <template slot-scope="scope">
              {{$timestampToTime(scope.row.createDate)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="operationContent"
          label="活动内容">
        </el-table-column>
        <el-table-column
          prop="userIp"
          label="登录IP">
        </el-table-column>
      </el-table>

      <div class="block" v-if="page3.totalPage > 1">
                  <el-pagination
                    @current-change="handleCurrentChange3"
                    :current-page.sync="page3.currentPage"
                    :page-size="page3.pageSize"
                    layout="total, prev, pager, next"
                    :total="page3.totalCount*1">
                  </el-pagination>
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
      page: {
            totalPage: 1,
            currentPage: 1,
            pageSize: 10
        },
        q: {
            ruleId: "",
        },
        showList: true,
        title: null,
        dailiOnlineList: {},

        dialogvisibletixi: false,
        dialogvisibletixi3: false,

        page2: {
            totalPage: 1,
            currentPage:1,
            pageSize:10
        },
        yonghuSearchTielyList: [],//用户查即列表

        page3: {
            totalPage: 1,
            currentPage:1,
            pageSize:10
        },
        yonghuSearchAllList: [],//用户查全列表

        optionid: ''
    }
  },
  computed: {
    ...mapGetters({
    })
  },
  created() {
    //this.dailiOnline();
  },
  mounted(){
  },
  methods: {
    handleCurrentChange3(cpage) {
      this.page3.currentPage = cpage;
      this.dailiOnline3();
    },
    handleCurrentChange2(cpage) {
      this.page2.currentPage = cpage;
      this.dailiOnline2();
    },
    handleCurrentChange(cpage) {
      this.page.currentPage = cpage;
      this.dailiOnline();
    },
    reload: function () {
            this.showList = true;
            this.dailiOnline();
        },
        query: function () {
            if (this.q.ruleId == "") {
                this.$alertMessage('先选择一个代理级别!', '温馨提示');
                return;
            } else {
                this.reload();
            }
            
        },
        searchTimely: function (id) {
           this.dialogvisibletixi = true;
           this.optionid = id;
           this.dailiOnline2();
        }, 
        searchAll: function (id) {
           this.dialogvisibletixi3 = true;
           this.optionid = id;
           this.dailiOnline3();
        }, 
        async downline(item) {

          let that = this;

          this.$c_msgconfirm('是否确认将 '+item.username+' 踢线',async () => {

                NProgress.start();
                await that.$get(`${window.url}/admin/system/auserDownline?aUserId=`+item.id).then((res) => {
                that.$handelResponse(res, (result) => {
                  NProgress.done();
                  if(result.code===200) {
                            that.$success('操作成功');
                            that.reload();
                          } else {
                      }
                })
              });

          });

        },


    async dailiOnline() {
        let that = this;

        let url = 'admin/system/dlOnline?ruleId=' + this.q.ruleId;


        let data = await this.$get(`${window.url}/`+ url +`&currentPage=`+this.page.currentPage+`&pageSize=`+this.page.pageSize);
            if(+data.code===200) {

              this.dailiOnlineList = data.page.list;
                if (data.page.totalPage == 0) {
                    that.page.totalPage = 1;
                } else {
                    that.page.totalPage = data.page.totalPage;
                    that.page.totalCount = data.page.totalCount;
                }


            }
      },
      async dailiOnline2() {

        let that = this;

        let url = 'admin/system/auserSearchTimelyList?userId=' + this.optionid;


        let data = await this.$get(`${window.url}/`+ url +`&currentPage=`+this.page2.currentPage+`&pageSize=`+this.page2.pageSize);
            if(+data.code===200) {

              this.yonghuSearchTielyList = data.page.list;
                if (data.page.totalPage == 0) {
                    that.page2.totalPage = 1;
                } else {
                    that.page2.totalPage = data.page.totalPage;
                    that.page2.totalCount = data.page.totalCount;
                }

            }
      },
      async dailiOnline3() {

        let that = this;

        let url = 'admin/system/auserSearchAllList?userId=' + this.optionid;


        let data = await this.$get(`${window.url}/`+ url +`&currentPage=`+this.page3.currentPage+`&pageSize=`+this.page3.pageSize);
            if(+data.code===200) {

              this.yonghuSearchAllList = data.page.list;
                if (data.page.totalPage == 0) {
                    that.page3.totalPage = 1;
                } else {
                    that.page3.totalPage = data.page.totalPage;
                    that.page3.totalCount = data.page.totalCount;
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

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .table-btngroup {
    margin-top: 20px;
  }

</style>


