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
      <div class="btn-ground" style="text-align: left;" v-if="[1,2,7,8].findIndex((n) => n==ruleId)>-1">
        公司 :
          <el-select v-model="q.userId" placeholder="请选择公司" size="mini">
            <el-option :value="''" key="null" :label="'默认'"></el-option> 
            <el-option v-for="company in companyList" :value="company.id" :key="company.id" :label="company.username"></el-option> 
          </el-select>
      </div>

      <table class="report-search">
        <tr>
          <th>报表类型</th> 
          <td class="tl">
            <label><input type="radio" v-model="q.reportType" name="reportType" value="1"> 总账</label> 
            <!-- <label><input type="radio" v-model="q.reportType" name="reportType" value="2"> 分类账</label> -->
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
              v-model="q.timesvalue"
              type="daterange"
              unlink-panels
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              >
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
      pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              const end = new Date();
              picker.$emit('pick', [end, end]);
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', [start, start]);
            }
          },{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
        },

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
            timesvalue:[],
            // startTime:"",
            // endTime:"",
            userId:"",
            bocai: {
              id: '',
              name: ''
            }
            
        },
      timesvalue: '',
      dealType: '1',

      companyId: '',

      companyList: {},//公司List
    }
  },
  computed: {
    ...mapGetters({
      ruleId:'getruleId',
      bocaiMenu: 'getbocaiMenu',
      userInfo: 'getuserInfo'
    }),
    bocaiType() {
      return this.q.reportType == 1 ? true : false;
    }
  },
  created() {
    //this.childUser();
    if([1,2,7,8].findIndex((n) => n==this.ruleId)>-1) {
      this.bocaiSetList();
    }
  },
  mounted(){
  },
  methods: {
    async bocaiSetList() {
      let res = await this.$get(`${window.url}/admin/gameManage/getBocaiSortSet`);

      if(res.code===200){
        this.companyList = res.data.companyList;
      }
    },
    async query() {

      console.log('timesvalue',this.timesvalue);
      console.log('q',this.q);

      if(this.q.timesvalue.length == 0) {
        this.$alertMessage('请选择时间!', '温馨提示');
      } else if(this.q.reportType == 2 && this.q.bocai.id == '') {
        this.$alertMessage('请选择游戏类型!', '温馨提示');
      } else {

        

        // let arr = [];

        // for(let n in this.timesvalue) {
        //   arr.push(this.timesvalue[n]);
        // }

        // this.q.startTime = arr[0];
        // this.q.endTime = arr[1];

        if([1,2,7,8].findIndex((n) => n==this.ruleId)>-1) {
          
        } else {
          this.q.userId = this.userInfo.id;
        }
        

        // let obj={}; 
        // obj=JSON.parse(JSON.stringify(this.q)); //this.templateData是父组件传递的对象 

        // let tem = '';

        // tem = this.timesvalue[0];

        // this.q.startTime = tem;
        // this.q.startTime = this.timesvalue[0];
        // this.q.endTime = this.timesvalue[1];

        

        console.log('this.q',this.q);

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
