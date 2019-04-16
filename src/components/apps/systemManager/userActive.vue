<template>
  <div id="youxishezhi" class="content-main">
    
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>在线管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'huiyuanzaixian' }">会员在线</el-breadcrumb-item>
        <el-breadcrumb-item>活动情况</el-breadcrumb-item>
      </el-breadcrumb>

    </div>

    <div class="portlet portlet-add">

      <div class="tab">

        <div class="nav">
          <div class="btn-ground">
            <label>股东活跃情况 : </label>
            <button class="btn btn-blue" @click="getMore(gudongId)" size="mini">更多</button>
          </div>
        </div>

        <table>
          <thead>
            <tr class="trBar">
              <th>用户名</th> 
              <th>活动时间</th> 
              <th>活动内容</th> 
              <th>登录IP</th> 
            </tr>
          </thead> 
          <tbody>
            <tr v-for="(item,index) in gudongList">
              <td>{{item.username}}</td>
              <td>{{$timestampToTime(item.createDate)}}</td>
              <td>{{item.operationContent}}</td>
              <td>{{item.userIp}}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="tab">
        <div class="nav">
          <div class="btn-ground">
            <label>总代理活跃情况 : </label>
            <button class="btn btn-blue" @click="getMore(zongdailiId)" size="mini">更多</button>
          </div>
        </div>

        <table>
          <thead>
            <tr class="trBar">
              <th>用户名</th> 
              <th>活动时间</th> 
              <th>活动内容</th> 
              <th>登录IP</th> 
            </tr>
          </thead> 
          <tbody>
            <tr v-for="(item,index) in zongdailiList">
              <td>{{item.username}}</td>
              <td>{{$timestampToTime(item.createDate)}}</td>
              <td>{{item.operationContent}}</td>
              <td>{{item.userIp}}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="tab">
        <div class="nav">
          <div class="btn-ground">
            <label>代理活跃情况 : </label>
            <button class="btn btn-blue" @click="getMore(dailiId)" size="mini">更多</button>
          </div>
        </div>
        <table>
          <thead>
            <tr class="trBar">
              <th>用户名</th> 
              <th>活动时间</th> 
              <th>活动内容</th> 
              <th>登录IP</th> 
            </tr>
          </thead> 
          <tbody>
            <tr v-for="(item,index) in dailiList">
              <td>{{item.username}}</td>
              <td>{{$timestampToTime(item.createDate)}}</td>
              <td>{{item.operationContent}}</td>
              <td>{{item.userIp}}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>


    <el-dialog :visible.sync="dialogvisible" width="60%" :title="ruleId == 4 ?  '股东' : ruleId == 5 ? '总代理' : '代理' + '活跃情况'">
      <el-table
        :data="huiyuanList"
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

      <div class="block" v-if="page.totalPage > 1">
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="page.currentPage"
                    :page-size="page.pageSize"
                    layout="total, prev, pager, next"
                    :total="page.totalCount*1">
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
      bocaiId: 1,
      huiyuanInfo: {},
      isBase: '',
      currentPage: 1,
      huiyuanAccout: '',
      startDate: '3',
      content: '',
      cUserId: this.$route.params.id,
      gudongList: [],//股东列表
      zongdailiList: [],//总代理列表
      dailiList: [],//代理列表
      gudongId: "",//股东ID
      zongdailiId: "",//总代理ID
      dailiId: "",//代理ID

      dialogvisible: false,

        page: {
            totalPage: 1,
            currentPage:1,
            pageSize:10
        },
        huiyuanList: [],//股东列表
        cmoreId: '',
        ruleId: ''

    }
  },
  computed: {
    ...mapGetters({
    })
  },
  created() {
    this.huiyuanActiveList();
  },
  mounted(){
  },
  methods: {
    handleCurrentChange(cpage) {
      this.page.currentPage = cpage;
      this.getMore(this.cmoreId);
    },
    async huiyuanActiveList() {

      let res = await this.$get(`${window.url}/admin/system/hyActiveList?cUserId=`+this.cUserId);

      if(res.code===200){
            this.gudongList = res.gudongList;
                this.zongdailiList = res.zongdailiList;
                this.dailiList = res.dailiList;

                this.gudongId = res.gudongId;
                this.zongdailiId = res.zongdailiId;
                this.dailiId = res.dailiId;
      }

    },
    async getMore(id) {
      this.dialogvisible = true;
      this.cmoreId = id;

      let that = this;

        let url = 'admin/system/auserActiveList?userId=' + this.cmoreId;


        let data = await this.$get(`${window.url}/`+ url +`&currentPage=`+this.page.currentPage+`&pageSize=`+this.page.pageSize);
            if(+data.code===200) {

              that.huiyuanList = data.page.list;
              that.ruleId = data.ruleId;
                if (data.page.totalPage == 0) {
                    that.page.totalPage = 1;
                } else {
                    that.page.totalPage = data.page.totalPage;
                    that.page.totalCount = data.page.totalCount;
                }

            }
    }

  }
}

</script>

<style scoped>
</style>
