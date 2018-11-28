<template>
  <div>
    <div class="main-panel-wapper" id="CpkTrendAnalysis">
      <template>
        <div class="tool-bar toolLeft">
          <span class="bar-title" >{{$root.langs.analysis["smartspc.analysis.CpkTrendAnalysis"]}}</span>
            
        </div>

        <el-card class="box-card" id="queryCondition">
          <el-row class="firstRow">

            <el-col :span="7">
             <span class="short">{{$root.langs.analysis["smartspc.analysis.product"]}}</span>
              <el-select v-model="col_product" class="batchSelect" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']" size="mini">
                  <el-option
                          v-for="(item,index) in productList"
                          :key="index"
                          :label="item.LevelValue"
                          :value="item.LevelValue">
                  </el-option>
              </el-select>
            </el-col>

            <el-col :span="7">
              <span class="short">{{$root.langs.analysis["smartspc.analysis.process"]}}</span>
              <el-select class="toolLeftDom" v-model="col_process" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']" size="mini">
                      <el-option  v-for="(item,index) in proValueList" :key="item.LevelValue" :label="item.LevelValue" :value="item.LevelValue"></el-option>
              </el-select>
            </el-col>

            <el-col :span="10">
              <span class="short">{{$root.langs.dashboard["smartspc.dashboard.parameter"]}}</span>
              <el-select v-model="searDatas.Item_ID" @visible-change="getDateParmse()" size="mini" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']">
                  <el-option v-for="(item,index) in dataSParmsList" :key="index" :label="item.item" :value="item.Item_ID">
                  </el-option>
              </el-select>
            </el-col>


          </el-row>

          <el-row class="secondRow">

          <el-col :span="14">
             <span>{{$root.langs.analysis['smartspc.analysis.timeRange']}}</span>
              <el-date-picker
                      class="batchPicker"
                      size="mini"
                      v-model="time"
                      @change="gettime"
                      type="daterange"
                      value-format="yyyy-M-d HH:mm:ss"
                      :start-placeholder= "$root.langs.analysis['smartspc.analysis.startDate']"
                      :end-placeholder= "$root.langs.analysis['smartspc.analysis.endDate']"
                      >
              </el-date-picker>
            </el-col>


            <el-col :span="10">
              <span>{{$root.langs.analysis["smartspc.analysis.timeInterval"]}}</span>
              <el-select v-model="searDatas.cycle" class="batchSelect" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']" size="mini" @change="gettimeTitle">
                <el-option :label="$root.langs.common['smartspc.common.day']" value="day"></el-option>
                <el-option :label="$root.langs.common['smartspc.common.week']" value="week"></el-option>
                <el-option :label="$root.langs.common['smartspc.common.month']" value="month"></el-option>
              </el-select>
              <el-button type="primary" class="marginright" size="mini" @click="getWarmSta()">{{$root.langs.common['smartspc.common.search']}}</el-button>
              
            </el-col>

          </el-row>
          
        </el-card>

        <Card :title="$root.langs.analysis['smartspc.analysis.failureWarning']">
          <div slot="content">
            <div class="cell">
              <hchart ref="chart" :data="chartData"></hchart>
            </div>
          </div>
        </Card>

        <Card>
          <div slot="content">
            <div class="item margin basic-information">
              <div class="wraper">
                <div class="table-wrap">
                  <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col>
                      <el-table class="paramsTable" :data="data" style="width: 100%" :empty-text="$root.langs.common['smartspc.common.nodata']">
                        <el-table-column prop="batch1" :label="units">
                          <template slot-scope="scope">
                            {{scope.row.time}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="batch2" :label="$root.langs.common['smartspc.common.gross']">
                          <template slot-scope="scope">  
                            {{scope.row.total}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="statistics" :label="'Ca'">
                          <template slot-scope="scope">
                            {{scope.row.Ca | toFixed3}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="statistics" :label="'Cp'">
                          <template slot-scope="scope">
                            {{scope.row.Cp | toFixed3}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="statistics" :label="'Cpk'">
                          <template slot-scope="scope">
                            {{scope.row.Cpk | toFixed3}}
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-col>
                  </el-row>
                  <div class="pagination" v-if="pageCount>1">
                    <el-pagination layout="prev, pager, next" :total="totalPage" @current-change="handleCurrentChange" :current-page="currentPage" :background='true'>
                    </el-pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </template>
    </div>
  </div>
</template>
<script>
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

  export default {
    data() {
      return {
        time:[],
        prjList: [],
        currentPage: 1,
        pageSize: 10,
        productList: [],
        proValueList: [],
        dataSParmsList: [],
        units: '',
        chartData: {
          field: {
            type: 'cpkQualifi',
            lineColor: '#3289c7',
            dashStylesL: 'Solid',
            timeTitle: '',
            dataSource:[
              {
                code: '',
                value: ''
              }
            ],
            hChartDatas: {
              x: [],
              z: [],
              Cpk: [],
              Cp: [],
              Ca: []
            }
          }
        },
        col_product:'',
        col_process: '',
        searDatas: {
          Item_ID: '',
          timerange: {
            start: '',
            end: ''
          },
          cycle: ''
        },
        
      }
    },
    filters: {
       toFixed3(val){
         return val.toFixed(3)
       }
    },
    components: {
      Card: resolve => require(['../components/card.vue'], resolve),
      IconFont: resolve => require(['common/iconfont.vue'], resolve),
      hchart: resolve => require(['./../../dashboard/components/hchart'], resolve) //懒加载
    },
    computed: {
      totalPage: function() {
        return this.prjList.length;
      },
      pageCount: function() {
        return Math.ceil(this.totalPage / this.pageSize)
      },
      data: function() {
        let that = this;
        let data = [];

        for(let n in this.prjList.x) {
          let obj = {
            time: this.prjList.x[n],
            total: this.prjList.z[n],
            Cp: this.prjList.Cp[n],
            Cpk: this.prjList.Cpk[n],
            Ca: this.prjList.Ca[n]
          }
          data.push(obj);
        }

        data = _.slice(data, (that.currentPage - 1) * that.pageSize, that.currentPage * that.pageSize);
        return data;
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      async getDateParmse() {

        let dataobj = [{
            code: 'col_product',
            value: this.col_product
          },
          {
            code: 'col_process',
            value: this.col_process
          }
        ]

        if(dataobj[0].value != '') {
          let jsonData = JSON.stringify(dataobj);
          let prjData = await this.$post(`${window.gatewayspc}/kb/item`,jsonData);
          if(prjData.code==0){
            this.dataSParmsList = prjData.data;
          }
        } else {
          this.dataSParmsList = [];
        }

      },
      gettimeTitle(data) {
        this.chartData.field.hChartDatas.timeTitle = this.$root.langs.common['smartspc.common.cycle']+'('+this.$root.langs.common['smartspc.common.'+data] +')';

        this.units = this.$root.langs.common['smartspc.common.cycle']+'('+this.$root.langs.common['smartspc.common.'+data] +')';

      },
      gettime(data) { 
        data[1]= data[1].replace(/00:00:00/g, "23:59:59");
        this.time = data;
      },
      async getWarmSta(){

          this.searDatas.timerange.start = this.time[0];
          this.searDatas.timerange.end = this.time[1];

          let obj = JSON.stringify(this.searDatas);

          let ret = await this.$post(`${window.gatewayspc}/corr/cpk_trend`, obj);

          if(ret.code==0){
            this.prjList = ret.data;

            this.chartData.field.hChartDatas.x = ret.data.x;
            this.chartData.field.hChartDatas.z = ret.data.z;
            this.chartData.field.hChartDatas.Cp = ret.data.Cp;
            this.chartData.field.hChartDatas.Cpk = ret.data.Cpk;
            this.chartData.field.hChartDatas.Ca = ret.data.Ca;


            // for(let n in ret.data.y) {
            //   ret.data.y[n] = ret.data.y[n]*1;
            // }
            //this.chartData.field.hChartDatas.datay = ret.data.y;


          } else {
            this.prjList = [];
          }

      },
      async fetchData() {

        let ret = await this.$get(`${window.gatewayspc}/infra/leafv/col_product`);

        if(ret.code == '0') {
          this.productList = ret.data;
        }

        let res = await this.$get(`${window.gatewayspc}/infra/leafv/col_process`);

        if(res.code == '0') {
          this.proValueList = res.data;
        }

      },
      handleCurrentChange(val) {
        this.currentPage = val;
      }
    },
    watch: {
      'pageCount': function() {
        //搜索的时候重置到第一页
        this.currentPage = 1
      }
    }
  }
</script>
<style lang="less" scoped>
.toolLeft span,.toolLeft button {
    margin-left:20px;
  }
  i {
    cursor: pointer;
  }

  h1 {
    padding: 1em
  }

  .basic-information {
    label {
      color: #162134;
    }
    span {
      color: #6a6e70;
    }
  }

  .wraper {
    padding: 20px;
  }

  .basic-information {
    .el-row~.el-row {
      margin-top: 8px;
    }
  }

  .pagination {
    margin: 30px 0px;
    text-align: center;
  }

  .table-wrap {
    min-height: 528px;
    margin-top: 10px;
  }

  .paramsTable {
    .iconfont {
      color: #595959;
    }
  }
  .tool-bar {
    height: 60px;
  }
  .secondRow {
    margin-top: 10px;
  }

  span.short {
    margin-right: 28px;
  }

  .marginright {
    margin-left: 20px;
  }
</style>

<style lang="less">

#CpkTrendAnalysis {
  #rulePage .el-button--default {
    height: 28px;
    line-height: 0;
  }

  .paramsTable {
    th,
    td {
      cursor: default;
    }
  }

  .tool-bar .batchSelect {
    width: 10%;
  }
  .tool-bar .batchPicker {
    /*width: 30%;*/
  }

  .paramsTable {
    th,
    td {
      cursor: default;
    }
  }

  .el-card {
    margin: 0 20px 10px;
  }
  .el-row {
      margin-left: 5%;
  }

}
</style>
