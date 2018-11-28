<template>
  <div>
    <div class="main-panel-wapper" id="productQualification">
      <template>
        <div class="tool-bar toolLeft">
          <span class="bar-title" >{{$root.langs.analysis["smartspc.analysis.productQualification"]}}</span>
            <!-- <span>{{$root.langs.analysis["smartspc.analysis.product"]}}</span>
            <el-select v-model="searDatas.col_product" style="width:11%" class="batchSelect" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']" size="mini">
                <el-option
                        v-for="(item,index) in productList"
                        :key="index"
                        :label="item.LevelValue"
                        :value="item.LevelValue">
                </el-option>
            </el-select>
            <span>{{$root.langs.analysis["smartspc.analysis.process"]}}</span>
            <el-select class="toolLeftDom" v-model="searDatas.col_process" style="width:11%" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']" size="mini">
                    <el-option  v-for="(item,index) in proValueList" :key="item.LevelValue" :label="item.LevelValue" :value="item.LevelValue"></el-option>
            </el-select>
            <div>
              <span>{{$root.langs.analysis['smartspc.analysis.timeRange']}}</span>
              <el-date-picker
                      class="batchPicker"
                      size="mini"
                      v-model="time"
                      style="width:30%"
                      @change="gettime"
                      type="daterange"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      :default-time="['00:00:00', '24:00:00']"
                      :start-placeholder= "$root.langs.analysis['smartspc.analysis.startDate']"
                      :end-placeholder= "$root.langs.analysis['smartspc.analysis.endDate']"
                      >
              </el-date-picker>
              <span>{{$root.langs.analysis["smartspc.analysis.timeInterval"]}}</span>
              <el-select v-model="searDatas.cycle" style="width:11%" class="batchSelect" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']" size="mini" @change="gettimeTitle">
                <el-option :label="$root.langs.common['smartspc.common.day']" value="day"></el-option>
                <el-option :label="$root.langs.common['smartspc.common.week']" value="week"></el-option>
                <el-option :label="$root.langs.common['smartspc.common.month']" value="month"></el-option>
              </el-select>
              <el-button type="primary" size="mini" @click="getWarmSta()">{{$root.langs.common['smartspc.common.search']}}</el-button> 
            </div>-->
        </div>

        <el-card class="box-card" id="queryCondition">
          <el-row class="firstRow">

            <el-col :span="12">
             <span class="short">{{$root.langs.analysis["smartspc.analysis.product"]}}</span>
            <el-select v-model="searDatas.col_product" class="batchSelect" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']" size="mini">
                <el-option
                        v-for="(item,index) in productList"
                        :key="index"
                        :label="item.LevelValue"
                        :value="item.LevelValue">
                </el-option>
            </el-select>
            </el-col>

            <el-col :span="12">
              <span class="short">{{$root.langs.analysis["smartspc.analysis.process"]}}</span>
            <el-select class="toolLeftDom" v-model="searDatas.col_process" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']" size="mini">
                    <el-option  v-for="(item,index) in proValueList" :key="item.LevelValue" :label="item.LevelValue" :value="item.LevelValue"></el-option>
            </el-select>
            </el-col>

          </el-row>

          <el-row class="secondRow">

          <el-col :span="12">
             <span>{{$root.langs.analysis['smartspc.analysis.timeRange']}}</span>
              <el-date-picker
                      class="batchPicker"
                      size="mini"
                      v-model="time"
                      @change="gettime"
                      type="daterange"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      :default-time="['00:00:00', '24:00:00']"
                      :start-placeholder= "$root.langs.analysis['smartspc.analysis.startDate']"
                      :end-placeholder= "$root.langs.analysis['smartspc.analysis.endDate']"
                      >
              </el-date-picker>
            </el-col>


            <el-col :span="12">
              <span>{{$root.langs.analysis["smartspc.analysis.timeInterval"]}}</span>
              <el-select v-model="searDatas.cycle"  class="batchSelect" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']" size="mini" @change="gettimeTitle">
                <el-option :label="$root.langs.common['smartspc.common.day']" value="day"></el-option>
                <el-option :label="$root.langs.common['smartspc.common.week']" value="week"></el-option>
                <el-option :label="$root.langs.common['smartspc.common.month']" value="month"></el-option>
              </el-select>
              <el-button class="marginright" type="primary" size="mini" @click="getWarmSta()">{{$root.langs.common['smartspc.common.search']}}</el-button>
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
                        <el-table-column prop="statistics" :label="$root.langs.analysis['smartspc.analysis.percentOfPass']+'(%)'">
                          <template slot-scope="scope">
                            {{scope.row.hege}}
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
        units: '',
        chartData: {
          field: {
            type: 'productQualifi',
            lineColor: '#3289c7',
            dashStylesL: 'Solid',
            timeTitle: '',
            hChartDatas: {
              datax: [],
              datay: []
            }
          }
        },
        searDatas: {
          col_product:'',
          col_process: '',
          timerange: {
            start: '',
            end: ''
          },
          cycle: ''
        },
        
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
            hege: this.prjList.y[n]
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

          let ret = await this.$post(`${window.gatewayspc}/corr/passrate_trend`, obj);

          if(ret.code==0){
            this.prjList = ret.data;

            this.chartData.field.hChartDatas.datax = ret.data.x; 

            for(let n in ret.data.y) {
              ret.data.y[n] = ret.data.y[n]*1;
            }
            this.chartData.field.hChartDatas.datay = ret.data.y;



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

#productQualification {
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
