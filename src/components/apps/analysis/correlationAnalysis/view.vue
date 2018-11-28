<template>
  <div id="correlationAnalysis">
    <div class="main-panel-wapper" id="rulePage">
      <template>
        <div class="tool-bar toolLeft">
          <span class="bar-title" >{{$root.langs.analysis['smartspc.analysis.correlationAnalysis']}}</span>

            <span class="toolLeftDom labelC">{{$root.langs.analysis["smartspc.analysis.product"]}}</span>
            <el-select class="toolLeftDom" v-model="product" style="width:10%" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']" @change="ifAutoComput" size="mini" @visible-change="proParamData('col_product')">
                  <el-option  v-for="(item,index) in proValueList" :key="item.LevelValue" :label="item.LevelValue" :value="item.LevelValue"></el-option>
            </el-select>
            <!-- <label class="toolLeftDom" for="autofill">{{$root.langs.analysis["smartspc.analysis.wholeProcessCalculation"]}}</label>
            <el-checkbox class="toolLeftDom" v-model="searDatas.autofill" @change="ifAutoComput"></el-checkbox> -->
            <template>
              <span>{{$root.langs.analysis["smartspc.analysis.process"]}}</span>
              <el-select class="toolLeftDom" @change="ifAutoChange" v-model="process" style="width:10%" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']" size="mini" @visible-change="proParamData('col_process')">
                    <el-option  key="allProValueList" :label="$root.langs.common['smartspc.common.all']" value="all"></el-option>
                    <el-option  v-for="(item,index) in proValueList" :key="item.LevelValue" :label="item.LevelValue" :value="item.LevelValue"></el-option>
              </el-select>
              <el-button type="primary" size="mini" @click="getData()">{{$root.langs.common['smartspc.common.search']}}</el-button>
            </template>
        </div>

        <Card :title="$root.langs.analysis['smartspc.analysis.correlationAnalysis']">
          <div slot="content">
            <div class="item margin basic-information">
              <div class="wraper">
                <div class="table-wrap">
                  <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col>
                      <el-table class="paramsTable" :data="data" style="width: 100%" :empty-text="$root.langs.common['smartspc.common.nodata']">
                          <el-table-column prop="process" :label="$root.langs.analysis['smartspc.analysis.process']+1">
                            <template slot-scope="scope">
                              {{scope.row.process}}
                            </template>
                          </el-table-column>
                          <el-table-column v-if="searDatas.autofill" prop="process" :label="$root.langs.analysis['smartspc.analysis.process']+2">
                            <template slot-scope="scope">
                              {{scope.row.process2}}
                            </template>
                          </el-table-column>
                          <el-table-column prop="params1" :label="$root.langs.baseData['smartspc.baseData.params'] + 1">
                            <template slot-scope="scope">
                              {{scope.row.params1}}
                            </template>
                          </el-table-column>
                          <el-table-column prop="params2" :label="$root.langs.baseData['smartspc.baseData.params'] + 2">
                            <template slot-scope="scope">
                              {{scope.row.params2}}
                            </template>
                          </el-table-column>
                          <el-table-column prop="correlation" :label="$root.langs.analysis['smartspc.analysis.correlation']">
                            <template slot-scope="scope">
                              {{scope.row.correlation}}
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
        prjList: [],
        currentPage: 1,
        pageSize: 10,
        process:'',
        product: '',
        proValueList:[],
        searDatas: {
          autofill:false,
          dataSource:[
            {
              code: 'col_product',
              value: ''
            }
          ]
        }

      }
    },
    components: {
      Card: resolve => require(['../components/card.vue'], resolve),
      IconFont: resolve => require(['common/iconfont.vue'], resolve)
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
        if(!this.searDatas.autofill) {
          for(let n in this.prjList) {
            let obj = {
              process: this.prjList[n][0],
              params1: this.prjList[n][1],
              params2: this.prjList[n][2],
              correlation: this.prjList[n][3]
            }
            data.push(obj);
          }
        } else {
          for(let n in this.prjList) {
            let obj = {
              process: this.prjList[n][0],
              process2: this.prjList[n][1],
              params1: this.prjList[n][2],
              params2: this.prjList[n][3],
              correlation: this.prjList[n][4]
            }
            data.push(obj);
          }
        }

        data = _.slice(data, (that.currentPage - 1) * that.pageSize, that.currentPage * that.pageSize);
        return data;
      }
    },
    created() {
    },
    methods: {
      async ifAutoChange(data) {

        if(data == 'all'){
          this.searDatas.autofill = true;
        } else {
          this.searDatas.autofill = false;
        }
        this.prjList = [];
      },
      async ifAutoComput(data) {

          // this.prjList = [];
          // if(this.searDatas.autofill) {
          //   this.searDatas.dataSource[0].value = this.product;
          //   let obj = JSON.stringify(this.searDatas);
          //   let ret = await this.$post(`${window.gatewayspc}/corr/correlation`, obj);

          //   if(ret.code==0){
          //     this.prjList = ret.data;
          //   } else {
          //     this.prjList = [];
          //   }
          // }        
          
      },
      async getData() {

        let that = this;

          NProgress.start();

          this.searDatas.dataSource[0].value = this.product;

          if(this.searDatas.autofill) {
            let obj = JSON.stringify(this.searDatas);
            await this.$post(`${window.gatewayspc}/corr/correlation`, obj).then((res) => {
            that.$handelResponse(res, (result) => {
              NProgress.done();
              if(result.code == '0') {
                that.prjList = result.data;
              }else {
                that.prjList = [];
              }

            })
          });

        } else {
          let obj2 = {
            code: 'col_process',
            value: this.process
          }
          this.searDatas.dataSource.push(obj2);

          let obj = JSON.stringify(this.searDatas);
          let ret = await this.$post(`${window.gatewayspc}/corr/correlation`, obj).then((res) => {
            that.$handelResponse(res, (result) => {
              NProgress.done();
              if(result.code == '0') {
                that.prjList = result.data;
              }else {
                that.prjList = [];
              }

            })
          });

          this.searDatas.dataSource.pop();
        }
      },
      async proParamData(data) {
        if(data != '') {
        let prjData = await this.$get(`${window.gatewayspc}/infra/leafv/`+data);

        if(prjData.code==0){
          this.proValueList = prjData.data;
          }
        } else {
          this.proValueList = [];
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
  .toolLeftDom {
    line-height: 30px;
    margin-left: 10px;
  }
  .toolLeft span,.toolLeft button {
    margin-left:20px;
  }
  .toolLeft .el-checkbox {
    margin-left: 30px;
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

  .el-tabs__item {
    padding: 0;
  }

  .fold {
    display: inline-block;
    transition: .1s linear 0s;
    /* Opera */
    &.expend {
      transform: rotate(-90deg);
      -ms-transform: rotate(-90deg);
      /* IE 9 */
      -moz-transform: rotate(-90deg);
      /* Firefox */
      -webkit-transform: rotate(-90deg);
      /* Safari 和 Chrome */
      -o-transform: rotate(-90deg);
      /* Opera */
    }
  }

  .hand {
    cursor: pointer;
  }

  @keyframes pulse {
    from {
      transform: scale3d(1, 1, 1);
    }
    50% {
      transform: scale3d(1.05, 1.05, 1.05);
    }
    to {
      transform: scale3d(1, 1, 1);
    }
  }

  .pulse {
    animation-name: pulse;
  }

  @color5: #abb4bc;
  @colorBtnPrimary: #fb735c;
  .no-content {
    padding: 140px 0;
    p {
      color: @color5;
      margin: 34px auto 54px;
    }
    .el-button--primary {
      background: @colorBtnPrimary ;
      border: 1px solid @colorBtnPrimary ;
    }
    .icon-create {
      margin-top: 200px;
      font-size: 60px;
    }
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
</style>
