<template>
  <div>
    <div class="main-panel-wapper" id="analysisiInBatch">
      <template>
        <div class="tool-bar toolLeft">
          <span class="bar-title" >{{$root.langs.analysis['smartspc.analysis.analysisiInBatch']}}</span>

          <span>{{$root.langs.analysis["smartspc.analysis.batch"]}}</span>
          <el-input class="batchInput" v-model.trim="searDatas.batch" :placeholder="$root.langs.common['smartspc.common.pleaseInput']"></el-input>
          <span>{{$root.langs.analysis["smartspc.analysis.timeInterval"]}}</span>
          <el-select v-model="searDatas.dorh" class="batchSelect" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']" size="mini">
            <el-option  :label="$root.langs.common['smartspc.common.day']" value="d"></el-option>
            <el-option  :label="$root.langs.common['smartspc.common.hour']" value="h"></el-option>
          </el-select>
          <el-button type="primary" size="mini" @click="getData()">{{$root.langs.common['smartspc.common.search']}}</el-button>
        </div>

        <Card :title="$root.langs.analysis['smartspc.analysis.analysisiInBatch']">
          <div slot="content">
            <div class="item margin basic-information">
              <div class="wraper">
                <div class="table-wrap">
                  <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col>
                      <el-table class="paramsTable" :data="data" style="width: 100%" :empty-text="$root.langs.common['smartspc.common.nodata']">
                        <el-table-column prop="batch" :label="$root.langs.analysis['smartspc.analysis.batch']">
                          <template slot-scope="scope">
                            {{scope.row.batch}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="statistic" :label="$root.langs.analysis['smartspc.analysis.statisticalMethod']">
                          <template slot-scope="scope">
                            {{scope.row.statistic}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="item" :label="$root.langs.baseData['smartspc.baseData.parameterConfiguration']">
                          <template slot-scope="scope">
                            {{scope.row.item}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="max_value" :label="$root.langs.analysis['smartspc.analysis.highValue']">
                          <template slot-scope="scope">
                            {{scope.row.max_value}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="min_value" :label="$root.langs.analysis['smartspc.analysis.lowValue']">
                          <template slot-scope="scope">
                            {{scope.row.min_value}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="percent" :label="$root.langs.analysis['smartspc.analysis.fallingRangeT3']">
                          <template slot-scope="scope">
                            {{scope.row.percent}}
                          </template>
                        </el-table-column>
                        <el-table-column :label="$root.langs.common['smartspc.common.op']">
                          <template slot-scope="scope">
                            <a @click="getInfo(scope.row)" :title="$root.langs.common['smartspc.common.view']" class="options"><i class="iconfont icon-chart-line1 bianji"></i>{{$root.langs.common['smartspc.common.view']}}</a>
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


    <el-dialog class="add-user-dialog" :title="$root.langs.analysis['smartspc.analysis.runChart']" :visible.sync="dialogFormVisible" width="40%">
      <section class="itemTitle">
        <p v-for="(item,index) in diaTitle" style="padding:0px;margin:0px;">{{item}}</p>
      </section>
      <div class="cell">
        <hchart ref="chart" :data="chartData"></hchart>
      </div>
    </el-dialog>


  </div>
</template>
<script>
  export default {
    data() {
      return {
        prjList: [],
        currentPage: 1,
        pageSize: 10,
        searDatas: {
          batch:'',
          dorh: ''
        },
        diaTitle: [],
        dialogFormVisible: false,
        chartData: {
          field: {
            type: 'running',
            lineColor: '#3289c7',
            dashStylesL: 'Solid',
            hChartDatas: {
              realdate: [],
              realvalue: [],
              itemname: ''
            }
          }

        }

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

        for(let n in this.prjList.result) {
          let obj = {
            batch: this.prjList.batch,
            statistic: this.prjList.result[n].statistic,
            item: this.prjList.result[n].item,
            max_value: this.prjList.result[n].max_value,
            min_value: this.prjList.result[n].min_value,
            percent: this.prjList.result[n].percent,
            item_ID: this.prjList.result[n].item_ID
          }
          data.push(obj);
        }

        data = _.slice(data, (that.currentPage - 1) * that.pageSize, that.currentPage * that.pageSize);
        return data;
      }
    },
    created() {
    },
    methods: {
      async getInfo(data) {
        this.diaTitle = [
          this.$root.langs.analysis['smartspc.analysis.batch'] + " : " + data.batch,
          this.$root.langs.baseData['smartspc.baseData.parameterConfiguration'] + " : " + data.item,
          this.$root.langs.analysis['smartspc.analysis.statisticalMethod'] + " : " + data.statistic
        ];

        // this.dialogTitle = this.$root.langs.analysis['smartspc.analysis.batch'] + " : " + data.batch + '    ' + this.$root.langs.baseData['smartspc.baseData.parameterConfiguration'] + " : " + data.item + '    ' + this.$root.langs.analysis['smartspc.analysis.statisticalMethod'] + " : " + data.statistic;
        this.dialogFormVisible = true;

        let dataObj = {
          batch: data.batch,
          statistic: data.statistic,
          item_ID: data.item_ID,
          dorh: this.searDatas.dorh,
        }

        let obj = JSON.stringify(dataObj);


        let ret = await this.$post(`${window.gatewayspc}/corr/details`, obj);

        if(ret.code==0){
          this.chartData.field.hChartDatas.realvalue = ret.data.result;
          this.chartData.field.hChartDatas.realdate = ret.data.date;
        } else {
        }

      },
      async getData() {

        console.log(this.searDatas);

        let obj = JSON.stringify(this.searDatas);

        let ret = await this.$post(`${window.gatewayspc}/corr/timeseries`, obj);

        if(ret.code==0){
          this.prjList = ret.data;
        } else {
          this.prjList = [];
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
  .itemTitle {
    text-align: center;
    margin-bottom: 30px;
  }
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

  .bianji,
  .shanchu {
    margin: 0 10px;
  }
.create-btn{
  float: right;
}
</style>

<style lang="less">

#analysisiInBatch {
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
  .tool-bar .batchInput {
    width: 10%;
  }

  .tool-bar input {
    height: 28px;
  }

  .el-dialog__body {
    padding: 0px 20px 30px;
    color: #5a5e66;
    line-height: 24px;
    font-size: 14px;
  }
  .el-dialog__body .cell {
    padding-left: 4%;
  }



}

</style>
