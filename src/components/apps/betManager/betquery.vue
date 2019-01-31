<template>
  <div id="youxishezhi" class="content-main">
    
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>注单管理</el-breadcrumb-item>
        <el-breadcrumb-item>注单查询</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="nav">
      <div class="btn-ground">
        游戏类型 :
        <el-select v-model="q.bocaiTypeId" @change="selectBocaiType" placeholder="请选择" size="mini" style="width: 15%;">
          <el-option :value="''" key="null" label="全部"></el-option>
          <el-option v-for="(item,index) in bocaiMenu" :value="item.id" :key="item.id" :label="item.name"></el-option> 
        </el-select>
        游戏玩法 :
        <el-select v-model="q.dewaterId" @change="selectBocaiType" placeholder="请选择" size="mini" style="width: 15%;">
          <el-option :value="''" key="null" label="全部"></el-option>
          <el-option v-for="(item,index) in dewaterList" :value="item.id" :key="item.id" :label="item.name"></el-option> 
        </el-select>
        期数 :
        <el-select v-model="q.periodsId" @change="selectBocaiType" placeholder="请选择" size="mini" style="width: 15%;">
          <el-option :value="''" key="null" label="全部"></el-option>
          <el-option v-for="(item,index) in periodsList" :value="item.id" :key="item.id" :label="item.periods"></el-option> 
        </el-select>
        投注时间 :
        <el-date-picker
          style="width: 15%;"
          size="mini"
          v-model="q.dateStr"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <div class="btn-ground" style="margin-top: 10px;">
        查询条件 :
        <el-select v-model="q.searchType" @change="selectBocaiType" placeholder="请选择" size="mini" style="width: 15%;">
          <el-option :value="''" key="null" label="不指定"></el-option>
          <el-option :value="'1'" key="1" label="公司"></el-option>
          <el-option :value="'2'" key="2" label="股东"></el-option>
          <el-option :value="'3'" key="3" label="总代理"></el-option>
          <el-option :value="'4'" key="4" label="代理"></el-option>
          <el-option :value="'5'" key="5" label="会员"></el-option>
          <el-option :value="'6'" key="6" label="注单号"></el-option>
          <el-option :value="'7'" key="7" label="注单ID"></el-option>
        </el-select>

        <el-select v-model="q.status" @change="selectBocaiType" placeholder="请选择" size="mini" style="width: 15%;">
          <el-option :value="''" key="null" label="全部"></el-option>
          <el-option :value="1" key="1" label="已结算"></el-option>
          <el-option :value="0" key="0" label="未结算"></el-option>
        </el-select>

        <el-input v-model="q.keyword" placeholder="请输入关键字" size="mini" style="width: 15%;"></el-input>

        <button class="btn btn-blue" @click="childUser()">查询</button>
        <button class="btn btn-blue" @click="addgudong()">新增</button>


      </div>

    </div>

    <!-- <div class="portlet">
      <div class="tab">
        <table>
          <thead>
            <tr class="trBar">
              <th>在线</th> 
              <th>体系</th> 
              <th>代理帐号</th> 
              <th>名称</th> 
              <th>信用额度</th> 
              <th>代理数</th> 
              <th>会员数</th> 
              <th>新增日期</th> 
              <th>帐号</th> 
              <th>冻结</th> 
              <th>补货</th> 
              <th>收单/停押</th> 
              <th>功能</th>
            </tr>
          </thead> 
          <tbody>
            <tr v-for="(item,index) in childUserInfo.list">
              <td><i class="iconfont" :class="item.isOnline == 1 ? 'icon-yonghu-copy bule' : 'icon-yonghu'"></i></td> 
              <td>
                <div class="accountLevel">
                  <button class="btn-blue" @click="getUserzhangc(item)">查看</button> 
                </div>
              </td> 
              <td>{{item.username}}</td>
              <td><span>{{item.nickname}}</span></td> 
              <td>{{item.quota}}</td> 
              <td>{{item.agentNum}}</td> 
              <td>{{item.memberNum}}</td> 
              <td>{{$timestampToTime(item.createDate)}}</td> 
              <td :class="item.status == '1' ? 'green': 'red'">{{item.status == '1' ? '启用' : '关闭'}}</td> 
              <td :class="item.isFrozen == '0' ? 'green': 'red'">{{item.isFrozen == '1' ? '是' : '否'}}</td> 
              <td :class="item.isReplenishment == '1' ? 'green': 'red'">{{item.isFrozen == '1' ? '开启' : '关闭'}}</td> 
              <td :class="item.tingyaShouya == '1' ? 'green': 'red'">{{item.tingyaShouya == '1' ? '收单' : '停押'}}</td> 
              <td class="btnFeatures">
                <span>
                  <a class="tabBtn btnPurple" @click="updateuser(item)">修改资料</a> 
                  <a class="tabBtn btnPurple" @click="tuishuiset(item)">退水设定</a>
                  <a class="tabBtn btnPurple" @click="tuishuiset(item)">查看密码</a>
                  <a class="tabBtn btnPurple" @click="tuishuiset(item)">信用记录</a>
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="block" v-if="childUserInfo.totalPage > 1">
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="childUserInfo.pageSize"
                    layout="total, prev, pager, next"
                    :total="childUserInfo.totalCount*1">
                  </el-pagination>
        </div>
        
      </div>
    </div> -->

  </div>
</template>



<script>
import { mapGetters } from 'vuex';

export default {
  components: {
  },
  data () {
    return {
      currentPage: 1,
      showList: true,
        title: null,
        q: {//查询条件
            bocaiTypeId: "",
            dewaterId: "",
            periodsId: "",
            dateStr: "",
            startDateStr: "00:00",
            endDateStr: "23:59",
            status: 1,
            keyword: "",
            searchType: "",
            totalPage: 1,
            currentPage:1,
            pageSize:10
        },
        orderHisList: {},//历史订单列表
        dewaterList: [],//退水玩法列表
        periodsList: [],//期数列表
        betsMoneyTotal: 0,
        jiangliMoneyTotal: 0,
        dayList: {},//日期
        betsMoneyAllTotal: 0,
        jiangliMoneyAllTotal: 0,
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
  },
  mounted(){
  },
  methods: {
    async selectBocaiType() {

      let res = await this.$get(`${window.url}/admin/order/getSearchData?bocaiTypeId=`+this.q.bocaiTypeId);
      if(+res.code===200) {

        this.dewaterList = res.dewaterList;
        this.periodsList = res.periodsList;

      }
    },



  }
}

</script>

<style scoped>
</style>
