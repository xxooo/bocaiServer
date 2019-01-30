<template>
  <div id="youxishezhi" class="content-main">
    
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>报表</el-breadcrumb-item>
        <el-breadcrumb-item>报表查询</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="report-content">
      <table class="report-search">
        <tr>
          <th>报表类型</th> 
          <td class="tl">
            <label><input type="radio" v-model="q.reportType" name="reportType" value="1"> 总账</label> 
            <label><input type="radio" v-model="q.reportType" name="reportType" value="2"> 分类账</label>
          </td>
        </tr>
        <tr v-if="!bocaiType">
                <th>博彩类型</th>
                <td class="tl">
                    <template v-for="bocaiType in bocaiMenu">
                        <label><input type="radio" :value="bocaiType" v-model="q.bocai"><span class="blue">{{bocaiType.name}}</span></label>
                    </template>
                </td>
        </tr>
        <tr>
          <th>日期区间</th> 
          <td class="tl">
            <el-date-picker
              size="mini"
              v-model="timesvalue"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </td>
        </tr> 
        <tr>
          <th>结算方式</th> 
          <td class="tl">
            <label><input type="radio" name="dealType" v-model="dealType"  value="1"> 现金</label>
          </td>
        </tr> 
        <tr>
          <th>结算状态</th> 
          <td class="tl">
            <label><input type="radio" v-model="q.cuserOrderStatus" name="hasResult" value="1"> 已结算</label> 
            <label><input type="radio" v-model="q.cuserOrderStatus" name="hasResult" value="0"> <span class="blue">未结算</span></label>
          </td>
        </tr>
      </table> 
      <p class="tac">
        <button class="tabBtn btn btn-blue mgr10" @click="query">查询</button> 
        <button class="tabBtn btn btn-red mgr10">取消</button>
      </p>
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
      gonggaoInfo: {},
      isBase: '',
      currentPage: 1,
      status: '',
      startDate: '3',
      content: '',

      bocaiTypeList: [],
      q: {//查询条件
            reportType: 1,
            cuserOrderStatus: 1,
            startTime:"",
            endTime:"",
            userId:"",
            bocai: {
              id: '',
              name: ''
            }
            
        },
      timesvalue: '',
      dealType: '1'
    }
  },
  computed: {
    ...mapGetters({
      bocaiMenu: 'getbocaiMenu',
      userInfo: 'getuserInfo'
    }),
    bocaiType() {
      return this.q.reportType == 1 ? true : false;
    }
  },
  created() {
    //this.childUser();
  },
  mounted(){
  },
  methods: {
    async query() {

      console.log('timesvalue',this.timesvalue);
      console.log('q',this.q);

      if(this.timesvalue == '' || this.timesvalue == null) {
        this.$alertMessage('请选择时间!', '温馨提示');
      } else if(this.q.reportType == 2 && this.q.bocai.id == '') {
        this.$alertMessage('请选择游戏类型!', '温馨提示');
      } else {
        this.q.startTime = this.timesvalue[0];
        this.q.endTime = this.timesvalue[1];
        this.q.userId = this.userInfo.id;

        store.commit('updatebaobiaoQinfo',this.q);

        this.$router.push({name:'baobiaolist'});
      }

      



      // q: {//查询条件
      //       reportType: 1,
      //       cuserOrderStatus: 1,
      //       startTime:"",
      //       endTime:"",
      //       bocaiTypeId:"",
      //       userId:"",
      //   },


      // let res = await this.$get(`${window.url}/admin/report/reportList?type=`+this.option+`&reportType=`+this.q.reportType+`&cuserOrderStatus=`+this.q.cuserOrderStatus+`&startTime=`+this.q.startTime+`&endTime=`+this.q.endTime+`&currentPage=`+this.currentPage+`&pageSize=10`+`&userId=`+this.userInfo.id+`&bocaiTypeId=`+this.q.bocaiTypeId);

      // if(res.code===200){
      // }


// GET
// 参数：

// 参数名 必选  类型  说明
// type  是 int 1往下操作，2返回操作
// userId  否 int 用户ID
// reportType  是 int 1总账，2分账
// bocaiTypeId 否 int 分账，博彩ID
// cuserOrderStatus  是 int 1已结算，2未结算
// startTime 否 string  开始时间
// endTime 否 string  结束时间
// currentPage 是 int 当前第几页
// pageSize  是 int 每页数量


    }

  }
}

</script>

<style scoped>
.report-search {
    width: 900px;
    margin: 10px auto;
}
.report-search tr {
    height: 30px;
}
.report-search th {
    background-color: #f8f8f8;
    border: 1px solid #bbb;
    text-align: center;
    font-weight: 700;
    width: 160px;
}
.report-search td {
    border: 1px solid #bbb;
    padding: 5px 20px;
}
.report-search input {
    vertical-align: middle;
}
.report-search .flatpickr-input {
    height: 20px;
    text-align: center;
}

</style>
