<!-- 图表组件 -->
<template>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{$root.langs.report[(prop == 'top')?'smartspc.report.topFault':'smartspc.report.incontrollableAnalysis']}}</span>
      </div>
      <div>
        <highcharts  class="x7"  style="height:300px" :options="options" ref="highcharts">
        </highcharts>
        <el-table class="x5"  :data="tableTop.rows" max-height="280" style="border-bottom:solid 1px #f2f3f7" :empty-text="$root.langs.common['smartspc.common.nodata']">
          <el-table-column v-for="(label,filed) in tableTop.columns" style="color:red"
                           :key="filed"
                           :prop="filed"
                           :label="label">
            <template slot-scope="scope">
                  <span>
                    {{ scope.row[filed] }}
                  </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
</template>
<script>
  import Vue from 'vue'
  import VueHighcharts from 'vue-highcharts'
  import Highcharts from 'highcharts/highcharts'
  require ('highcharts/modules/exporting')(Highcharts);

  Highcharts.setOptions({
    global: {
      useUTC: false
    },
    credits: {
      enabled: false // 禁用版权信息
    },
    colors: ['#7CB5EF', '#FDB54C', '#FB725C', '#5AC995', '#7CCDF7', '#AFD574', '#6CD3BF', '#4EC7D5', '#9F97D1', '#F9B383']
  });

  Vue.use(VueHighcharts, {
    Highcharts,
  });
  var chart;
  export default {
      props: ['chartTop','tableTop','prop'],
      data(){
        return { 
          chart:{}
        }
      },
      components: {
        IconFont: resolve => require(['common/iconfont.vue'], resolve)
      },
      created: function() {
        this.chart = this.$refs.highcharts;
      },
      mounted: function() {
      },
      computed: {
        options: function() {
          let data = this.chartTop;
          return {
            chart: {
              zoomType: 'xy'
            },
            exporting: {
              enabled: false,   // 关闭导出按钮
              url: 'https://export.highcharts.com.cn'
            },
            title: {
              text: ''
            },
            xAxis: [{
              categories: data.itemname,
              crosshair: true
            }],
              yAxis: [{ // Primary yAxis
              title: {
                text: data.itemdata_name,
                /*style: {
                  color: Highcharts.getOptions().colors[0]
                }*/
              },
               labels: {
                   style: {
                     color: Highcharts.getOptions().colors[0]
                   }
               }
            }, { // Secondary yAxis
              title: {
                text: data.ratedata_name,
               /* style: {
                  color: Highcharts.getOptions().colors[0]
                }*/
              },
              max: 100,
              min: 0,
              labels: {
                format: '{value} %',
                style: {
                  color: Highcharts.getOptions().colors[1]
                }
              },
              opposite: true
            }],
            legend:{enabled:false},
            tooltip: {
              shared: true
            },
            series: [{
              name: data.itemdata_name,
              type: 'column',
              data:data.itemdata,
             /* tooltip: {
                valueSuffix: ' %'
              }*/
            }, {
              name: data.ratedata_name,
              type: 'spline',
              dashStyle:'ShortDot',
              data:data.ratedata,
              yAxis: 1,
              tooltip: {
                valueDecimals:2,
                valueSuffix: ' %'
              }
            }]
          }
        }
      },
      methods: {

      }
    }
</script>

<style scoped>


</style>
