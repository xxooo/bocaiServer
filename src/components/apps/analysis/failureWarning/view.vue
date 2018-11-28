<template>
  <div>
    <div class="main-panel-wapper" id="failureWarning">
      <template>
        <div class="tool-bar toolLeft">
          <span class="bar-title" >{{$root.langs.analysis["smartspc.analysis.failureWarning"]}}</span>
            <span>{{$root.langs.analysis["smartspc.analysis.forecastCycle"]}}</span>
            <el-select v-model="searDatas.D_OR_H" class="batchSelect" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']" size="mini">
                <el-option :label="$root.langs.common['smartspc.common.hour']" value="H"></el-option>
                <el-option :label="$root.langs.common['smartspc.common.day']" value="D"></el-option>
            </el-select>
            <span>{{$root.langs.analysis["smartspc.analysis.product"]}}</span>
            <el-select v-model="searDatas.product" class="batchSelect" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']" size="mini">
                <el-option
                        v-for="(item,index) in productList"
                        :key="index"
                        :label="item.LevelValue"
                        :value="item.LevelValue">
                </el-option>
            </el-select>
            <span>{{$root.langs.analysis["smartspc.analysis.historicalData"]}}</span>
            <el-select v-model="searDatas.historydata" class="batchSelect" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']" size="mini">
                <el-option :label="$root.langs.analysis['smartspc.analysis.nearly7days']" value="7"></el-option>
                <el-option :label="$root.langs.analysis['smartspc.analysis.nearly30days']" value="30"></el-option>
            </el-select>
            <el-button type="primary" size="mini" @click="getWarmSta()">{{$root.langs.common['smartspc.common.search']}}</el-button>
        </div>

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
        productList: [],
        searDatas: {
          D_OR_H:'',
          product: '',
          historydata: ''
        },
        chartData: {
          field: {
            type: 'failureChart',
            lineColor: '#3289c7',
            dashStylesL: 'Solid',
            hChartDatas: {
              datax: [],
              datay: []
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

    },
    created() {
      this.fetchData();
    },
    methods: {
      async getWarmSta(){

          let that = this;

          NProgress.start();

          let obj = JSON.stringify(this.searDatas);

          await that.$post(`${window.gatewayspc}/corr/passrate_forecast`, obj).then((res) => {
            that.$handelResponse(res, (result) => {
              NProgress.done();
              if(result.code == '0') {
                that.chartData.field.hChartDatas.datax = result.data.date;
                that.chartData.field.hChartDatas.datay = result.data.value;
              }

            })
          });
      },
      async fetchData() {

        let ret = await this.$get(`${window.gatewayspc}/infra/leafv/col_product`);

        if(ret.code == '0') {
          this.productList = ret.data;
        }

      }
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

.show-infor {
    position: relative;
    padding: 17px 30px;
    height: 83px;
    background: #ffffff;
    border-radius: 4px;
    cursor: default;
    .info-title {
      opacity: 0.6;
      font-size: 14px;
      color: #4c4a49;
      margin-bottom: 4px;
    }
    .info-desc1 {
      font-size: 30px;
      color: #4c4a49;
      line-height: 34px;
    }
    .info-desc2 {
      font-size: 18px;
      color: #4c4a49;
      max-width: 230px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .info-copy {
      position: absolute;
      right: 20px;
      top: 47%;
      width: 28px;
      height: 20px;
      font-size: 14px;
      color: #0087f3;
      cursor: pointer;
    }
  }
</style>

<style lang="less">
#failureWarning {
  #rulePage .el-button--default {
    height: 28px;
    line-height: 0;
  }

  .tool-bar .batchSelect {
    width: 10%;
  }

}
</style>
