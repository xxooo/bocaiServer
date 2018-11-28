<template>
  <div>
    <div class="main-panel-wapper" id="measuredValueDistribution">
      <template>
        <div class="tool-bar toolLeft">
          <span class="bar-title" >{{$root.langs.analysis["smartspc.analysis.measuredValueDistribution"]}}</span>
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
              <el-select v-model="item" @visible-change="getDateParmse()" @change="getitemvlue" size="mini" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']">
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
              <span class="short2">{{$root.langs.analysis["smartspc.analysis.comparativeItem"]}}</span>
              <el-select v-model="searDatas.project_code" size="mini" @visible-change="getproNameList()" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']">
                  <el-option  v-for="(item,index) in proNameList" :key="item.project_code" :label="item.project_name" :value="item.project_code"></el-option>
              </el-select>
              <el-button type="primary" size="mini" class="marginright" @click="getWarmSta()">{{$root.langs.common['smartspc.common.search']}}</el-button>
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
        proNameList: [],
        chartData: {
          field: {
            boxColor: '#32c73c',
            sifenColor: '#32b8c7',
            dashStylesSi: 'Dash',
            type: "boxplot",
            dataSource:[
              {
                code: '',
                value: ''
              }
            ],
            timeTitle: '',
            hChartDatas: {
              excepdata: [],
              realdata: [],
              x: []
            }
          }
        },
        item: '',
        col_product:'',
        col_process: '',
        searDatas: {
          Item_ID: '',
          itemname: '',
          timerange: {
            start: '',
            end: ''
          },
          project_code: ''
        }
        
      }
    },
    components: {
      Card: resolve => require(['../components/card.vue'], resolve),
      IconFont: resolve => require(['common/iconfont.vue'], resolve),
      hchart: resolve => require(['./../../dashboard/components/hchart'], resolve) //懒加载
    },
    computed: {
    },
    created() {
      this.fetchData();
    },
    methods: {
      getitemvlue(data) {
        this.searDatas.Item_ID = data;
        for(let n in this.dataSParmsList) {
          if(this.dataSParmsList[n].Item_ID = data) {
            this.searDatas.itemname = this.dataSParmsList[n].item;
          }
        }
      },
      async getproNameList() {
        let ret = await this.$get(`${window.gatewayspc}/corr/selectprj`);

        if(ret.code == '0') {
          this.proNameList = ret.data;
        }
      },
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
        this.chartData.field.hChartDatas.timeTitle = this.$root.langs.common['smartspc.common.'+data];

       // console.log('this.chartData.field.hChartDatas.timeTitle',this.chartData.field.hChartDatas.timeTitle);
      },
      gettime(data) { 
        data[1]= data[1].replace(/00:00:00/g, "23:59:59");
        this.time = data;
      },
      async getWarmSta(){

          this.searDatas.timerange.start = this.time[0];
          this.searDatas.timerange.end = this.time[1];

          let obj = JSON.stringify(this.searDatas);

          //console.log(obj);

          let ret = await this.$post(`${window.gatewayspc}/corr/dimensional`, obj);

          if(ret.code==0){
            this.prjList = ret.data;

            this.chartData.field.hChartDatas.x = ret.data.x;
            this.chartData.field.hChartDatas.excepdata = ret.data.excepdata;
            this.chartData.field.hChartDatas.realdata = ret.data.realdata;

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
    },
    watch: {
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
  span.short2 {
    margin-right: 14px;
  }
  .marginright {
    margin-left: 20px;
  }
</style>

<style lang="less">

#measuredValueDistribution {
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
