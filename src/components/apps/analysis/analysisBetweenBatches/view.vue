<template>
  <div>
    <div class="main-panel-wapper" id="analysisBetweenBatches">
      <template>
        <div class="tool-bar toolLeft">
          <span class="bar-title" >{{$root.langs.analysis["smartspc.analysis.analysisBetweenBatches"]}}</span>
            <span>{{$root.langs.analysis["smartspc.analysis.product"]}}</span>
            <el-select v-model="searDatas.product" class="batchSelect" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']" size="mini">
                <el-option
                        v-for="(item,index) in productList"
                        :key="index"
                        :label="item.LevelValue"
                        :value="item.LevelValue">
                </el-option>
            </el-select>
            <span>{{$root.langs.analysis['smartspc.analysis.timeRange']}}</span>
            <el-date-picker
                    class="batchPicker"
                    size="mini"
                    v-model="time"
                    type="datetimerange"
                    value-format="yyyy-M-d HH:mm:ss"
                    :start-placeholder= "$root.langs.analysis['smartspc.analysis.startDate']"
                    :end-placeholder= "$root.langs.analysis['smartspc.analysis.endDate']"
                    :default-time="['08:00:00','17:00:00']"
                    >
            </el-date-picker>
            <el-button type="primary" size="mini" @click="getWarmSta()">{{$root.langs.common['smartspc.common.search']}}</el-button>
        </div>

        <Card :title="$root.langs.analysis['smartspc.analysis.analysisBetweenBatches']">
          <div slot="content">
            <div class="item margin basic-information">
              <div class="wraper">
                <div class="table-wrap">
                  <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col>
                      <el-table class="paramsTable" :data="data" style="width: 100%" :empty-text="$root.langs.common['smartspc.common.nodata']">
                        <el-table-column prop="batch1" :label="$root.langs.analysis['smartspc.analysis.batch']+1">
                          <template slot-scope="scope">
                            {{scope.row.batch1}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="batch2" :label="$root.langs.analysis['smartspc.analysis.batch']+2">
                          <template slot-scope="scope">
                            {{scope.row.batch2}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="statistics" :label="$root.langs.analysis['smartspc.analysis.statisticalMethod']">
                          <template slot-scope="scope">
                            {{scope.row.statistics}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="itemname" :label="$root.langs.baseData['smartspc.baseData.parameterConfiguration']">
                          <template slot-scope="scope">
                            {{scope.row.itemname}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="i" :label="$root.langs.analysis['smartspc.analysis.batch']+1+ this.kongge +$root.langs.common['smartspc.common.value']">
                          <template slot-scope="scope">
                            {{scope.row.i}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="j" :label="$root.langs.analysis['smartspc.analysis.batch']+2+ this.kongge +$root.langs.common['smartspc.common.value']">
                          <template slot-scope="scope">
                            {{scope.row.j}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="percent" :label="$root.langs.analysis['smartspc.analysis.fallingRangeT3']">
                          <template slot-scope="scope">
                            {{scope.row.percent}}
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
  export default {
    data() {
      return {
        prjList: [],
        currentPage: 1,
        pageSize: 10,
        productList: [],
        searDatas: {
          start:'',
          end: '',
          product: ''
        },
        time:[]
      }
    },
    components: {
      Card: resolve => require(['../components/card.vue'], resolve),
      IconFont: resolve => require(['common/iconfont.vue'], resolve)
    },
    computed: {
      kongge() {
            let en = Lockr.get('locale') == 'en-US';
            return en ? ' ' : '';
          },
      totalPage: function() {
        return this.prjList.length;
      },
      pageCount: function() {
        return Math.ceil(this.totalPage / this.pageSize)
      },
      data: function() {
        let that = this;
        let data = [];

        for(let n in this.prjList) {
          let obj = {
            batch1: this.prjList[n].batch[0],
            batch2: this.prjList[n].batch[1],
            statistics: this.prjList[n].statistics,
            itemname: this.prjList[n].itemname,
            i: this.prjList[n].i,
            j: this.prjList[n].j,
            percent: this.prjList[n].percent
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
      async getWarmSta(){

          this.searDatas.start = this.time[0];
          this.searDatas.end = this.time[1];

          let obj = JSON.stringify(this.searDatas);

          let ret = await this.$post(`${window.gatewayspc}/corr/timeseriesbatch`, obj);

          if(ret.code==0){
            this.prjList = ret.data;
          } else {
            this.prjList = [];
          }

          console.log(this.prjList);
      },
      async fetchData() {

        let ret = await this.$get(`${window.gatewayspc}/infra/leafv/col_product`);

        if(ret.code == '0') {
          this.productList = ret.data;
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

</style>

<style lang="less">

#analysisBetweenBatches {
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

}
</style>
