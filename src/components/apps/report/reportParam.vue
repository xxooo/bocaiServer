<!-- 图表组件 -->
<template>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{$root.langs.report['smartspc.report.paramFluctuate']}}</span>
      </div>
      <div>
        <highcharts  style="height:280px" :options="options" ref="highcharts">
        </highcharts>
      </div>
    </el-card>
</template>
<script>
  import Vue from 'vue'
  import VueHighcharts from 'vue-highcharts'
  import Highcharts from 'highcharts/highcharts'
  import HighchartsMore from 'highcharts/highcharts-more'
  require ('highcharts/modules/exporting')(Highcharts);
  Highcharts.setOptions({
    global: {
      useUTC: false
    },
    colors: ['#7CB5EF', '#FDB54C', '#FB725C', '#5AC995', '#7CCDF7', '#AFD574', '#6CD3BF', '#4EC7D5', '#9F97D1', '#F9B383']
  });

  HighchartsMore(Highcharts)
  Vue.use(VueHighcharts, {
    Highcharts,
  });

  Vue.use(VueHighcharts, {
    Highcharts,
  });

  var chart;
  export default {
      props: ['chartParam',],
      data(){
        return {
          chart:{}
        }
      },
      components: {
        //hchart: resolve => require(['../dashboard/components/hchart.vue'], resolve)
      },
      created: function() {
        this.chart = this.$refs.highcharts;
      },
      mounted: function() {
      },
      computed: {
        options: function() {
          let options= this.chartParam,that = this;
          return {
            credits: {
              enabled: false // 禁用版权信息
            },
            chart: {
              type: 'boxplot',
              zoomType: 'xy',
            },
            exporting: {   
              enabled: false  //设置导出按钮不可用    
            },   
            title: {
              text: null
            },
            legend: {
              enabled: false
            },
            xAxis: {
              categories: options.x,
              title: {
                text: null
              }
            },
            yAxis: {
              title: {
                text: null
              }
            },
            tooltip: {
              pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {series.name}</b><br/>' + // eslint-disable-line no-dupe-keys
              that.$root.langs.dashboard['smartspc.dashboard.max']+': {point.high:.3f}<br/>' +
              'Q3\t: {point.q3:.3f}<br/>' +
              that.$root.langs.dashboard['smartspc.dashboard.median']+': {point.median:.3f}<br/>' +
              'Q1\t: {point.q1:.3f}<br/>' +
              that.$root.langs.dashboard['smartspc.dashboard.min']+': {point.low:.3f}<br/>'
            },
            plotOptions: {
              boxplot: {
               //stemColor: options.sifenColor,
                //stemDashStyle: options.dashStylesSi,
              }
            },
            series: [{
              name: that.$root.langs.dashboard['smartspc.dashboard.observation'],
             // color: options.boxColor,
              data:options.realdata,
              tooltip: {
                headerFormat: '<em>'+that.$root.langs.analysis['smartspc.analysis.process']+'： {point.key}</em><br/>'
              },
              dataLabels:{
                format:"{point.y:.3f}"
              }
            }, {
              type: 'scatter',
              data: options.excepdata,
              tooltip: {
                headerFormat: '<table>',
                pointFormat: '{point.y:.3f}',
                footerFormat: '</table>'
              },
              dataLabels:{
                format:"{point.y:.3f}"
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
