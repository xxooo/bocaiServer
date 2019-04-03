<template>
  <div class="content-main" id="home">
    <div class="portlet">
      <div class="tab tab1">
        <table>
          <thead>
            <tr><th colspan="2">账户概要</th></tr>
          </thead> 
          <tbody>
            <tr>
              <td class="tar">{{homeInfo.cashCredit == 0 ? '现金余额' : '信用余额'}}</td> 
              <td><span>{{homeInfo.quota}}</span></td>
            </tr> 
            <tr>
              <td class="tar">线上会员</td> 
              <td><a href="../../../../static/html/member.online.html?uuid=d49736f6-f7d7-4730-8ae1-11cdf3335acd" target="_blank">{{homeInfo.cUserOnlineCount}}</a></td>
            </tr> 
            <tr>
              <td class="tar">今日新增会员</td> 
              <td>{{homeInfo.todayNewCUserCount}}</td>
            </tr> 
            <tr>
              <td class="tar">最后登陆日期</td> 
              <td>{{$timestampToTime(homeInfo.loginDate)}}</td>
            </tr> 
            <tr>
              <td width="160" class="tar">密码最后更新日期</td> 
              <td>{{homeInfo.passwordFixDate ? $timestampToTime(homeInfo.passwordFixDate) : ''}}</td>
            </tr>
          </tbody>
        </table>
      </div> 
      <div class="tab tab2">
        <table>
          <thead>
            <tr>
              <th>帐号状态</th> 
              <th>启用</th> 
              <th>停用</th> 
              <th>冻结</th>
            </tr>
          </thead> 
          <tbody>
            <tr v-if="ruleId == 1 || ruleId == 2" v-for="(item,index) in homeInfo.userListuserList">
              <td>{{item.ruleName}}</td> 
              <td>{{item.qiyong}}</td> 
              <td>{{item.tingyong}}</td> 
              <td>{{item.dongjie}}</td>
            </tr>
            <tr v-else v-for="(item,index) in homeInfo.userList">
              <td>{{item.ruleName}}</td> 
              <td>{{item.qiyong}}</td> 
              <td>{{item.tingyong}}</td> 
              <td>{{item.dongjie}}</td>
            </tr>
            <tr class="tab-footer">
              <td>总计</td> 
              <td>{{qiyongAll}}</td> 
              <td>{{tingyongAll}}</td> 
              <td>{{dongjieAll}}</td>
            </tr>
          </tbody>
        </table>
      </div> 
      <div class="tab tab3">
        <table>
          <thead>
            <tr><th colspan="2">最新公告</th></tr>
          </thead> 
          <tbody>

            <tr v-if="gonggaoList.list && gonggaoList.list.length*1 != 0" v-for="(item,index) in gonggaoList.list">
              <td>{{item.content}}</td>
            </tr>

            <tr v-else>
              <td>暂无数据</td>
            </tr>
          </tbody>
        </table>
        <div class="block" v-if="gonggaoList.totalPage > 1">
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="gonggaoList.pageSize"
                    layout="total, prev, pager, next"
                    :total="gonggaoList.totalCount*1">
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
  data() {
    return {
      bocaiTypeList: [],
      bocaiTypeId: '1',
      currentPage: 1,
      cbocai: '重庆时时彩',
      cUserdeList: [],
      homeInfo: {},
      qiyongAll: '',
      tingyongAll: '',
      dongjieAll: '',
      gonggaoList: []
    }
  },
  created() {

    console.log('this.ruleId',this.ruleId);

    //this.cUserdewater(this.bocaiTypeId);

    //if(this.ruleId != 1 && this.ruleId != 2) {
      this.gethomepage();

      this.getnoticeList(this.currentPage);
   // }
    

    

  },
  computed: {
    ...mapGetters({
      ruleId:'getruleId',
      userInfo: 'getuserInfo'
    })
  },
  methods: {
    handleCurrentChange(cpage) {
      this.toChongzhiHis(cpage);
      
    },
    async getnoticeList(cpage) {
      let res = await this.$get(`${window.url}/admin/noticeList?currentPage=`+cpage+`&pageSize=10`);

      if(res.code===200){
        this.gonggaoList = res.page;

        //console.log(this.gonggaoList.list.length);

        //console.log((this.gonggaoList.list.length*1 != 0));

      } 
    },
    async gethomepage() {
      let res = await this.$get(`${window.url}/admin/homePage`);

      if(res.code===200){
        this.homeInfo = res.data;

        for(let n in res.data.userList) {
          this.qiyongAll = this.qiyongAll*1 + res.data.userList[n].qiyong*1;
          this.tingyongAll = this.tingyongAll*1 + res.data.userList[n].tingyong*1;
          this.dongjieAll = this.dongjieAll*1 + res.data.userList[n].dongjie*1;

        }

      } 
    },
    // getcuserInfo(item) {
    //   this.cbocai = item.bocaiName;
    //   this.cUserdewater(item.bocaiId);
    //   $('.bocai'+item.bocaiId).addClass('active').siblings().removeClass('active');
    // },
    // changeboType(data) {
    //   this.cUserdewater(data);
    // },
    // async cUserdewater(id) {

    //   let res = await this.$get(`${window.url}/api/cUserdewater?bocaiTypeId=`+id);

    //     if(res.code===200){
    //         this.cUserdeList = res.data;

    //     } 
    // }
  },
  mounted() {
  },
  updated() {
  }
};
</script>
<style scoped>
.portlet {
    text-align: center;
}

.portlet {
    width: 100%;
}
.portlet .tab1, .portlet .tab2 {
    width: 47%;
    display: inline-block;
    vertical-align: top;
}
.portlet .tab {
    padding: 15px;
}
.portlet .tab table {
    width: 100%;
    border-collapse: collapse;
}
.portlet .tab table tbody tr {
    height: 24px;
}
.portlet .tab table tr {
    height: 34px;
}
caption, th {
    text-align: left;
}
.portlet .tab table th {
    font-weight: 700;
    padding: 8px;
    text-align: center;
    background: #507ea4;
    color: #f0f0f0;
    border: 1px solid #bbb;
}
.portlet .tab table thead th {
    border: 1px solid #999;
}
.portlet .tab table td, .portlet .tab table th {
    text-align: center;
}
.tar {
    text-align: right;
}
.portlet .tab table td {
    padding: 1px 5px;
    border: 1px solid #bbb;
}
.portlet .tab table td.tar, .portlet .tab table th.tar {
    text-align: right;
}
a {
    text-decoration: none;
    color: #007bbb;
    outline: none;
}
.portlet .tab table tbody tr:nth-child(2n) {
    background-color: #f8f8f8;
}

.portlet .tab table tr {
    height: 34px;
}
.portlet .tab-footer {
    background-color: #ddd;
    font-weight: 700;
}
.portlet .tab table tbody tr.tab-footer {
    background-color: #ddd;
    font-weight: 700;
}

</style>
<style lang="less">
  
</style>