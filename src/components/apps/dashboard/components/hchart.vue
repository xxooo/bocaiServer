<!-- 图表组件 -->
<template>

<div id="highcharts" style="width:95%;height:95%">
  <highcharts style="width:95%;height:90%" :options="options" ref="highcharts">
  </highcharts>
</div>
</template>
<script>
import Vue from 'vue'
import VueHighcharts from 'vue-highcharts'
import Highcharts from 'highcharts/highcharts'
import Highcharts3d from 'highcharts/highcharts-3d'
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge'
import drilldown from 'highcharts/modules/drilldown'
Highcharts.setOptions({
  global: {
    useUTC: false
  },
  colors: ['#7CB5EF', '#FDB54C', '#FB725C', '#5AC995', '#7CCDF7', '#AFD574', '#6CD3BF', '#4EC7D5', '#9F97D1', '#F9B383']
});
Highcharts3d(Highcharts)
HighchartsMore(Highcharts)
HighchartsSolidGauge(Highcharts)
drilldown(Highcharts)
Vue.use(VueHighcharts, {
  Highcharts,
})
var chart

export default {
  props: ['data'],
  data: function() {
    var that = this
    return {
      t: null,
      timer: 0,
      figure:function(options,width,height){
          let circlePoint = (r,max,min)=>{
            var data=[],count=100,num=r/count;
            var a=(max-min)/2+min;

            for(var i=0;i<count;i++){
              var x = i*num+a,x1=(x-a).toFixed(3);
              var y =Math.sqrt(r*r-x1*x1)+a;
              data.push([x,y]);
            }
            for(var si=count;i>=0;i--){
              var x = i*num+a,x1=(x-a).toFixed(3);
              var y =-Math.sqrt(r*r-x1*x1)+a;
              data.push([x,y]);
            }
            for(var i=0;i<count;i++){
              var x = -i*num+a,x1=(x-a).toFixed(3);
              var y =-Math.sqrt(r*r-x1*x1)+a;
              data.push([x,y]);
            }
            for(var i=count;i>=0;i--){
              var x = -i*num+a,x1=(x-a).toFixed(3);;
              var y =Math.sqrt(r*r-x1*x1)+a;
              data.push([x,y]);
            }
            return data;
        }
          let minPx = (height>width?width : height) || 300;
          let series = [];
          let max = Math.ceil(options.hChartDatas.max);
          let min = Math.floor(options.hChartDatas.min);

          for(var key in options.dataCircle){
            let r = options.dataCircle[key].r;
            series.push({
              //name: '目标2',
              type: 'line',
              data: circlePoint(r,max,min),
              color: Highcharts.Color(options.lineColor).setOpacity(0.5).get(),
              enableMouseTracking: false
            });
          }
          series.push({
            name: ' ',
            type: 'scatter',
            color: options.pointColor,
            data: options.hChartDatas.xy
          });


          if (minPx<278){minPx = 278}
          return  {
            credits: {
              enabled: false // 禁用版权信息
            },
            chart:{
              height:minPx,width:minPx,
            },
            exporting: {   
              enabled: false  //设置导出按钮不可用    
            },  
            title: {
              text: ''
            },
            xAxis: {
              tickInterval:(max-min)/2,
              lineWidth:1,
              offset: -(minPx/2-27),
              title: {
                offset:minPx/2-15,
                text:options.hChartDatas.xAxis || 'x'
              },
              tickPositioner:function(){
                let positions = [],tick=min;
                for (tick; tick <= max; tick += (max-min)/2) {
                  positions.push(tick);
                }
                return positions;
              },
              min:min,
              max:max,
            },
            yAxis: {
              offset: -(minPx/2-34),
              min:min,
              max:max,
              tickPositioner:function(){
                let positions = [],tick=min;
                for (tick; tick <= max; tick += (max-min)/2) {
                  positions.push(tick);
                }
                return positions;
              },
              tickInterval:(max-min)/2,
              lineWidth:1,
              allowDecimals: true,
              title: {
                offset:minPx/2-5,
                text:options.hChartDatas.yAxis ||'y'
              },
              lineWidth: 1
            },
            legend: {
              enabled: false,
            },
            series: series,
            tooltip: {
              headerFormat: '<b>{series.name}</b><br>',
              pointFormat: '{point.x}, {point.y}'
            }
          }
      },
      controlChart: function(options) {
        return {
          credits: {
            enabled: false // 禁用版权信息
          },
          chart: {
            type:'line',//指定图表的类型，默认是折线图（line）
            panning: true,
            marginBottom: 20
          },
          exporting: {   
            enabled: false  //设置导出按钮不可用    
          },     
          title: {
            text: null
          },
          colors: [options.zheColor],
          xAxis: {
            visible: false
          },
          yAxis: {
            max: options.maxValue,
            min: options.minValue,
            // max: options.hChartDatas.UCL+(options.hChartDatas.UCL -options.hChartDatas.LCL)*0.05,
            // min: options.hChartDatas.LCL-(options.hChartDatas.UCL -options.hChartDatas.LCL)*0.05,
            allowDecimals: true,
            lineWidth: 1,
            gridLineWidth:0,
            title: {
                text: null, //指定y轴的标题
            },
            labels: options.type2 === "p" && options.type=="controlChart2"? {
              formatter: function () {
                if(this.value) {
                   return this.value.toFixed(2);
                }
              }
            }:{},
            plotLines:[
              {
                color: options.controlColor,
                dashStyle: options.dashStylesC,
                value: options.hChartDatas.UCL,
                width:2,
                // labels: {
                //   formatter: function () {
                //     console.log('options.hChartDatas.UCL',options.hChartDatas.UCL);
                //     console.log('options.hChartDatas.UCL',(options.hChartDatas.UCL));
                //     if(options.hChartDatas.UCL) {
                //       return "UCL11: "+options.hChartDatas.UCL.toFixed(3)
                //     } else {
                //       return "UCL11: "+options.hChartDatas.UCL
                //     }
                //     //return this.value + '%';
                //   }
                // }
                label: {
                    text: "UCL: "+options.hChartDatas.UCL
                }
              },{
                  color: options.controlColor,
                  dashStyle: options.dashStylesC,
                  value: options.hChartDatas.CL,
                  width:2,
                  label: {
                      text: "CL: "+options.hChartDatas.CL
                  }
              },{
                  color: options.controlColor,
                  dashStyle: options.dashStylesC,
                  value: options.hChartDatas.LCL,
                  width:2,
                  label: {
                      text: "LCL: "+options.hChartDatas.LCL
                  }
            }]
          },
          legend: {
            enabled: false
          },
          tooltip: {
            formatter: function () {

              let ifExP = false;
              let kk;
              for(let n in options.hChartDatas.points_except) {

                if(options.hChartDatas.points[this.key] == options.hChartDatas.points_except[n]) {

                  ifExP = true;
                  kk = n;
                }
              }

              if(ifExP) {
                let str = that.$root.langs.dashboard['smartspc.dashboard.outlier'] + ' : <p>' + this.y.toFixed(3);
                  for(let n in options.hChartDatas.except_reason[kk]) {
                    let num = parseInt(n)+1;
                    str += '</p><br/><p>'+that.$root.langs.dashboard['smartspc.dashboard.message']+num+' ： ' + options.hChartDatas.except_reason[kk][n] + '</p>'
                  }
                  return str;
              } else {
                if (options.type2 === "np" && options.type=="controlChart2") return this.y;
                else return this.y.toFixed(3)
              }
            }
        },
          series: (function() {

            let htmlp = '<tr><td style="padding:0"><b>{point.y:.3f}</b></td></tr>';
            let series = [];
            let obj = {
              turboThreshold:0,
              dashStyle: options.dashStylesZ,
              dataLabels:{
                format:"{point.y:.3f}"
              },
              data: []
            };

            if(options.hChartDatas.points) {
              options.hChartDatas.points.forEach(m => {
                if(options.hChartDatas.points_except && options.hChartDatas.points_except.find(x => x == m)) {
                  let obj2 = {
                          y: m,
                          color: options.dotColor
                        };
                        obj.data.push(obj2);
                } else if(options.hChartDatas.points_except == 0 && options.hChartDatas.points_except.find(x => x == m)) {
                  let obj2 = {
                          y: m,
                          color: options.dotColor
                        };
                        obj.data.push(obj2);
                } else {
                  let obj2 = {
                          y: m,
                          color: options.zheColor
                        };
                        obj.data.push(obj2);
                }
             });
            }

            series.push(obj);
            return series;

          }())
        }
      },
      failureChart: function(options) {
        return {
          credits: {
            enabled: false // 禁用版权信息
          },
          chart: {
            type: 'line'
          },
          exporting: {   
              enabled: false  //设置导出按钮不可用    
            },  
          title: {
            text: null
          },
          xAxis: {
            categories: options.hChartDatas.datax,
          },
          yAxis: {
            title: {
              text: that.$root.langs.analysis['smartspc.analysis.produceRate'],
              style: {
                color: '#333333',
                fill: '#333333',
                font: 'bold 12px "Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif'
              }
            },
            labels: {
              formatter: function () {
                return this.value + '%';
              }
            },
            lineWidth: 1
          },
          tooltip: {
            crosshairs: true,
            shared: true,
            valueDecimals:3
          },
          plotOptions: {
            spline: {
              marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
              }
            }
          },
          series: (function() {

            let htmlp = '<tr><td style="padding:0"><b>{point.y:.3f}%</b></td></tr>';
            let series = [];
            let obj = {
              name: that.$root.langs.dashboard['smartspc.dashboard.defectRate'],
              marker: {
                symbol: 'square'
              },
              tooltip: {
                  headerFormat: '<table>',
                  pointFormat: '<tr><td style="padding:0"><b>{point.y:.3f}%</b></td></tr>',
                  footerFormat: '</table>'
              },
              data: [],

            };

              for(let n in options.hChartDatas.datay){
                let num = parseInt(n)+1;
                if(num == options.hChartDatas.datay.length) {
                    let obj2 =   {
                      y: options.hChartDatas.datay[n],
                      marker: {
                        fillColor: '#FFFFFF',
                        lineWidth: 4,
                        lineColor: '#f44336'
                      }
                    }
                    obj.data.push(obj2);
                } else {
                      let obj2 = {
                          y: options.hChartDatas.datay[n]
                        };
                        obj.data.push(obj2);
                }
              }

            series.push(obj);
            return series;
          }())
        }
      },
      histogram: function(options) {
        return {
          credits: {
            enabled: false // 禁用版权信息
          },
          chart: {
            backgroundColor: 'rgba(0,0,0,0)',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 29,
            events: {},
            plotBorderWidth: 1,
            marginBottom: 20
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
          xAxis: [{
              max: (function() {
                        if(options.hChartDatas.normal) {
                          return   options.hChartDatas.UCL < options.hChartDatas.normal[options.hChartDatas.normal.length-1][0] ? options.hChartDatas.normal[options.hChartDatas.normal.length-1][0] :options.hChartDatas.UCL;
                        }
                          }()),
              min: (function() {
                          if(options.hChartDatas.normal) {
                            return   options.hChartDatas.LCL > options.hChartDatas.normal[0][0] ? options.hChartDatas.normal[0][0] :options.hChartDatas.LCL;
                          }
                          }()),
              visible: options.isShowCLine,
              crosshair: false,
              plotLines: [{
                  color: options.clColor,
                  dashStyle: options.dashStylesC,
                  width: 2,
                  value: options.hChartDatas.LCL,
                  label: {
                      rotation: 0,
                      y: 15,
                      style: {
                          fontStyle: 'italic'
                      },
                      text: 'LCL'
                  },
                  zIndex: 99
              },{
                  color: options.clColor,
                  dashStyle: options.dashStylesC,
                  width: 2,
                  value: options.hChartDatas.CL,
                  label: {
                      rotation: 0,
                      y: 15,
                      style: {
                          fontStyle: 'italic'
                      },
                      text: 'CL'
                  },
                  zIndex: 99
              },{
                  color: options.clColor,
                  dashStyle: options.dashStylesC,
                  width: 2,
                  value: options.hChartDatas.UCL,
                  label: {
                      rotation: 0,
                      y: 15,
                      style: {
                          fontStyle: 'italic'
                      },
                      text: 'UCL'
                  },
                  zIndex: 99
              }]
          }],
          yAxis: [ {
              gridLineWidth: 0,
              title: {
                  text: null,
              }
          }, {
              gridLineWidth: 0,
              title: {
                  text: null,
              },
              opposite: true
          }],
          tooltip: {
              shared: true
          },
          series: [{
              color: options.hisColor,
              type: 'column',
              pointWidth: 27,
              yAxis: 0,
              data: options.hChartDatas.hist,
              dataLabels:{
                format:"{point.y:.3f}"
              },
              tooltip: {
                headerFormat: '<span style="font-size:14px">{point.y}</b></span><br><table>',
                pointFormatter: function () {
                  return that.$root.langs.dashboard['smartspc.dashboard.scope'] + ':'+this.range;
                },
                footerFormat: '</table>',
              }
          }, {
              type: 'spline',
              color: options.lineColor,
              yAxis: 1,
              data: options.hChartDatas.normal,
              marker: {
                  enabled: false
              },
              dashStyle: options.dashStylesL,
              dataLabels:{
                format:"{point.y:.3f}"
              },
              tooltip: {
                headerFormat: '<table><tr><td>'+that.$root.langs.dashboard['smartspc.dashboard.meanValue']+':</td><td style="padding:0"><b>'+(function() {
                        if(options.hChartDatas.mean){
                          return options.hChartDatas.mean.toFixed(3);
                        }

                          }())+'</b><br/></td></tr>',
                pointFormat: '<tr><td>'+that.$root.langs.dashboard['smartspc.dashboard.std']+':</td><td style="padding:0"><b>'+(function() {
                        if(options.hChartDatas.std){
                          return options.hChartDatas.std.toFixed(3);
                        }
                          }())+'</b></td></tr>',
                footerFormat: '</table>',
              }
          }]
        }
      },
      boxplot: function(options) {
        return {
          credits: {
            enabled: false // 禁用版权信息
          },
          chart: {
            type: 'boxplot'
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
              categories: options.hChartDatas.x,
              title: {
                  text: null
              }
          },
          yAxis: {
              title: {
                  text: null
              },
            lineWidth: 1
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
                  stemColor: options.sifenColor,
                  stemDashStyle: options.dashStylesSi,
              }
          },
          series: [{
              name: that.$root.langs.dashboard['smartspc.dashboard.observation'],
              color: options.boxColor,
              data:options.hChartDatas.realdata,
              tooltip: {
                  headerFormat: '<em>'+that.$root.langs.analysis['smartspc.analysis.process']+'： {point.key}</em><br/>'
              },
              dataLabels:{
                format:"{point.y:.3f}"
              }
          }, {
              type: 'scatter',
              data: options.hChartDatas.excepdata,
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
      },
      plato: function(options) {
        return {
          credits: {
            enabled: false // 禁用版权信息
          },
          chart: {
            renderTo: 'container',
            type: 'column'
          },
          exporting: {   
              enabled: false  //设置导出按钮不可用    
            },  
          title: {
              text: null
          },
          xAxis: {
              categories: options.hChartDatas.itemname,
          },
          yAxis: [{
              title: {
                  text: ''
              },
            lineWidth: 1
          }, {
              title: {
                  text: ''
              },
              minPadding: 0,
              maxPadding: 0,
              max: 100,
              min: 0,
              opposite: true,
              labels: {
                  format: "{value}%"
              }
          }],
          legend: {
              enabled: false
          },
          series: [{
              type: 'spline',
              yAxis: 1,
              color: options.sifenColor,
              dashStyle: options.dashStylesSi,
              zIndex: 10,
              data: options.hChartDatas.ratedata,
              tooltip: {
                  pointFormat: '{point.y:.2f} %'
              },
              dataLabels:{
                format:"{point.y}"
              }
          }, {
              type: 'column',
              zIndex: 2,
              color: options.boxColor,
              tooltip: {
                  pointFormat: '{point.y}'
              },
              data: options.hChartDatas.itemdata,
              dataLabels:{
                format:"{point.y}"
              }
          }]
        }
      },
      cpk: function(options) {
        return {
          credits: {
            enabled: false // 禁用版权信息
          },
          chart: {
            type: 'gauge',
            marginLeft: 30,
            marginTop: 30
          },
          exporting: {   
              enabled: false  //设置导出按钮不可用    
            },  
          title: {
              text: null
          },
          pane: {
              startAngle: -100,
              endAngle: 100,
              background: [{
                  backgroundColor: '#fff',
                  className: 'inner-pane'
              }]
          },
          yAxis: {
              min: 0,
              max: 2,
              minorTickInterval: 'auto',
              minorTickLength: 10,
              minorTickPosition: 'inside',
              tickPixelInterval: 30,
              tickPosition: 'inside',
              tickLength: 10,
              labels: {
                  step: 2,
                  rotation: 'auto'
              },
              title: {
                  text: 'CPK'
              },
              plotBands: [{
                  from: 1.67,
                  to: 2,
                  className: 'green-band'
              }, {
                  from: 1,
                  to: 1.67,
                  className: 'yellow-band'
              }, {
                  from: 0,
                  to: 1,
                  className: 'red-band'
              }]
          },

          series: [{
              name: 'Cpk',
              data: [options.hChartDatas],
              tooltip: {
                  pointFormat: '{point.y:.3f}'
              },
              dataLabels:{
                format:"{point.y:.3f}"
              }
          }]
        }
      },
      scatter: function(options) {
        return {
          credits: {
            enabled: false // 禁用版权信息
          },
          chart: {
            type: 'scatter',
            zoomType: 'xy',
            marginBottom: 20
          },
          exporting: {   
              enabled: false  //设置导出按钮不可用    
            },  
          title: {
              text: null
          },
          xAxis: {
              title: {
                  enabled: true,
                  text: options.hChartDatas.xAxis
              },
              startOnTick: true,
              endOnTick: true,
              showLastLabel: true
          },
          yAxis: {
              title: {
                  text: options.hChartDatas.yAxis
              },
            lineWidth: 1
          },
          legend: {
              enabled: false
          },
          plotOptions: {
              scatter: {
                  marker: {
                      radius: 5,
                      states: {
                          hover: {
                              enabled: true,
                              lineColor: 'rgb(100,100,100)'
                          }
                      }
                  },
                  states: {
                      hover: {
                          marker: {
                              enabled: false
                          }
                      }
                  },
                  tooltip: {
                      headerFormat: '<b>{}</b><br>',
                      pointFormat: '{point.x}, {point.y}'
                  }
              }
          },
          series: [{
              color: 'rgba(223, 83, 83, .5)',
              data: options.hChartDatas.xy,
              turboThreshold:0,
              dataLabels:{
                format:"{point.y:.3f}"
              }
          }]
        }
      },
      running: function(options) {
        return {
          credits: {
            enabled: false // 禁用版权信息
          },
          chart: {
            type: 'line',
            marginBottom: 50
          },
          exporting: {   
              enabled: false  //设置导出按钮不可用    
            },  
          title: {
              text: null
          },
          xAxis: {
              categories: options.hChartDatas.realdate
          },
          legend: {
              enabled: false
          },
          yAxis: {
              title: {
                  text: options.hChartDatas.itemname
              },
            lineWidth: 1
          },
          plotOptions: {
          },
          series: [{
              color: options.lineColor,
              dashStyle: options.dashStylesL,
              tooltip: {
                  headerFormat: '<table>',
                  pointFormat: '<tr><td style="padding:0"><b>{point.y:.3f}</b></td></tr>',
                  footerFormat: '</table>'
              },
              data: options.hChartDatas.realvalue,
              dataLabels:{
                format:"{point.y:.3f}"
              }
          }]
        }
      },
      productQualifi: function(options) {
        return {
          credits: {
            enabled: false // 禁用版权信息
          },
          chart: {
            type: 'line'
          },
          exporting: {   
              enabled: false  //设置导出按钮不可用    
            },  
          title: {
            text: null
          },
          xAxis: {
            categories: options.hChartDatas.datax,
            title: { 
                text: options.hChartDatas.timeTitle
            }
          },
          yAxis: {
            title: {
              text: that.$root.langs.analysis['smartspc.analysis.percentOfPass'],
              style: {
                color: '#333333',
                fill: '#333333',
                font: 'bold 12px "Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif'
              }
            },
            labels: {
              formatter: function () {
                return this.value + '%';
              }
            },
            lineWidth: 1
          },
          tooltip: {
            crosshairs: true,
            shared: true,
            valueDecimals:3
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            spline: {
              marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
              }
            }
          },
          series: [{
            tooltip: {
                  headerFormat: '<table>',
                  pointFormat: '<tr><td style="padding:0"><b>{point.y:.2f}%</b></td></tr>',
                  footerFormat: '</table>'
              },
            data: options.hChartDatas.datay
          }]
        }
      },
      cpkQualifi: function(options) {
        return {
          credits: {
            enabled: false // 禁用版权信息
          },
          chart: {
            type: 'line'
          },
          exporting: {   
              enabled: false  //设置导出按钮不可用    
            },  
          title: {
            text: null
          },
          xAxis: {
            categories: options.hChartDatas.x,
            title: { 
                text: options.hChartDatas.timeTitle
            }
          },
          yAxis: {
            title: {
              text: null,
              style: {
                color: '#333333',
                fill: '#333333',
                font: 'bold 12px "Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif'
              }
            },
            labels: {
              formatter: function () {
                return this.value;
              }
            },
            lineWidth: 1
          },
          tooltip: {
            crosshairs: true,
            shared: true,
            valueDecimals:3
          },
          plotOptions: {
            spline: {
              marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
              }
            }
          },
          series: [{
            name: 'Ca',
            data: options.hChartDatas.Ca
          },{
            name: 'Cp',
            data: options.hChartDatas.Cp
          },{
            name: 'Cpk',
            data: options.hChartDatas.Cpk
          }]
        }
      }

    }
  },
  computed: {
    options: function() {
      let that = this,
        func
      switch (this.data.field.type) {
          case 'figure':
            func = this.figure;
            break;
          case 'histogram':
            func = this.histogram;
            break;
          case 'controlChart':
            func = this.controlChart;
            break;
          case 'controlChart2':
             func = this.controlChart;
             break;
          case 'failureChart':
             func = this.failureChart;
             break;
          case 'boxplot':
            func = this.boxplot;
            break;
          case 'plato':
            func = this.plato;
            break;
          case 'cpk':
            func = this.cpk;
            break;
          case 'scatter':
            func = this.scatter;
            break;
          case 'running':
            func = this.running;
            break;
          case 'productQualifi':
            func = this.productQualifi;
            break;
          case 'cpkQualifi':
            func = this.cpkQualifi;
            break;
        }
      var options = $.extend({}, this.data.field, {
        obj: that,
        chart: chart,
      });
      delete options.width
      delete options.height
      // window.console && console.log('hchart options:', options);

      if(this.data.field.type == 'boxplot') return func(options,this.data.width,this.data.height);
      return func(options,this.data.width,this.data.height) || {};
    }
  },
  created: function() {
    // window.console && console.log('hchart-component created');
  },
  mounted: function() {
    let that = this
    this.init()
      // window.console && console.log('hchart-component mounted');
    this.$nextTick(function() {
      chart = that.$refs.highcharts;
      if (this.data.type == 'map') {
        that.drarBaiduMap()
      }
    })
  },
  updated: function() {
    // window.console && console.log('hchart-component updated');
  },
  beforeDestroy: function() {
    // window.console && console.log('beforeDestroy');
  },
  destroyed: function() {
    // window.console && console.log('destroyed', this.t);
  },
  methods: {
    init: function() {
      // window.console && console.log('clearTimeout');
    },
    update: function(options) {

      //不显示点，半径
      // series: [{
      //   marker: {
      //       enabled: false
      //       //radius: 10
      //   },

      //动画时间设置
      // let animation= {
      //     //duration: 150,
      //     easing: 'easeOutBounce'
      // }
      // series.addPoint(newPoints[i], redraw, shfit,animation);


      let info = options.info || '',
        isActiveLastPointToolip = options.isActiveLastPointToolip
      var chart = this.$refs.highcharts;
      if (!chart) {
        return
      }
      chart = chart.chart;
      if (chart && chart.series && chart.series.length) {
        for (let i in options.data) {
          let series = chart.series[i],
            x = options.data[i].x || (new Date()).getTime(), //data.t,
            y = options.data[i].y || 0;
          y = isNaN(y) ? 0 : Number(y) //非数字会报错,统一处理为0
            // window.console && console.log(y, series);
          if (series && series.data) {
            var shift = series.data.length > 10; //10个点后才替换
            series.addPoint([x, y], false, shift);
            // window.console && console.log('series ' + i, x, y, info,series.data,shift);
          }
        }
        if (options.refresh) {
          console.log('44444444444444444444444444');
          chart.redraw()
        }
        isActiveLastPointToolip && activeLastPointToolip(chart);
      }
    },
    redraw: function() {
      var chart = this.$refs.highcharts;
      if (!chart) {
        return
      }
      chart.chart.redraw()
    },
    reflow: function() {
      var chart = this.$refs.highcharts;
      if (!chart) {
        return
      }
      chart.chart.reflow()
      window.currentHchart=chart
      //window.console && console.log('reflowed');
    },
    drarBaiduMap: function() {
      let that = this
      let id = 'map_' + this.data.id
      var lbl, map, zoom = that.data.field.zoom || 12,
        points = []
      map = new BMap.Map(id);
      // map.addControl(new BMap.NavigationControl()); // 添加平移缩放控件
      map.addControl(new BMap.ScaleControl()); // 添加比例尺控件
      map.addControl(new BMap.OverviewMapControl()); //添加缩略地图控件
      map.enableScrollWheelZoom(); //启用滚轮放大缩小
      // map.addControl(new BMap.MapTypeControl());          //添加地图类型控件放按
      map.disableDragging(); //禁止拖拽

      //深圳坐标
      //  "longitude":114.02597366,
      // "latitude":22.54605355
      for (let x in this.data.field.device) {
        let device = this.data.field.device[x]
        let lng = device.longitude
        let lat = device.latitude
        window.console && console.log('device', this.data.field.device[x].latitude)
        if (!lng || !lat) {
          continue
        }
        let point = new BMap.Point(lng, lat);
          //
        window.console && console.log('add point', point)
          //添加点
        that.addMarker(map, point);
        points.push(point)
          //设置label
        lbl = new BMap.Label(device.text, {
          offset: new BMap.Size(10, -35),
          position: point
        });
        lbl.setTitle(device.desc || device.text); //为label添加鼠标提示
        lbl.setStyle({ //给label设置样式，任意的CSS都是可以的
          border: "0", //边
          textAlign: "center", //文字水平居中显示
          border: "1px solid #ddd",
          padding: "4px",
          // background:"url(http://cdn1.iconfinder.com/data/icons/CrystalClear/128x128/actions/gohome.png)",    //背景图片，这是房产标注的关键！
          'background-size': 'cover',
          '-moz-background-size': 'cover',
          cursor: "pointer"
        });
        map.addOverlay(lbl); //把label添加到地图上
      }
      if (points.length) { //获得所有点的最佳视野
        map.setViewport(points);
      } else { //没坐标点则以深圳为中心
        map.centerAndZoom('深圳', zoom);
      }
    },
    // 编写自定义函数,创建标注
    addMarker(map, point) {
      var marker = new BMap.Marker(point);
      map.addOverlay(marker);
    }
  },
  watch: {
    'data': {
      handler: function(val, oldVal) {
        // window.console && console.info('hchart-component watch data updated');
        if (val && val.field && val.field.type == 'map') {
          // window.console && console.log(val.field.device[0].latitude)
          this.drarBaiduMap()
        }
      },
      // 深度观察
      deep: true
    }
  }
};

function activeLastPointToolip(chart) {
  if (!(chart && chart.series && chart.series.length)) {
    return;
  }
  var points = chart.series[0].points;
  if (chart && chart.tooltip) {
    chart.tooltip.refresh(points[points.length - 1]);
  }
}
var deepCopy = function(source) {
  var result = {};
  if (typeof source === 'string') {
    return source;
  }
  for (var key in source) {
    if (typeof source[key] === 'object') {
      if (source[key] instanceof Array) {
        result[key] = new Array();
        for (var i = 0; i < source[key].length; i++) {
          result[key].push(deepCopy(source[key][i]));
        }
      } else {
        result[key] = deepCopy(source[key]);
      }
    } else {
      result[key] = source[key];
    }
  }
  return result;
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
ul,
li {
  margin: 0;
  padding: 0;
}

p {
  margin-bottom: 0
}

li {
  cursor: move;
}

.iconfont {
  width: 20px;
  display: inline-block;
  text-align: center;
}

.outer-pane {
  fill: #EFEFEF;
}
.middle-pane {
  stroke-width: 1px;
  stroke: #AAA;
}
.inner-pane {
  fill: #DDDDDD;
}
.green-band {
  fill: #55BF3B;
  fill-opacity: 1;
}
.yellow-band {
  fill: #DDDF0D;
  fill-opacity: 1;
}
.red-band {
  fill: #DF5353;
  fill-opacity: 1;
}
.highcharts-gauge-series .highcharts-pivot {
  stroke-width: 1px;
  stroke: black;
  fill-opacity: 0.3;
}
.highcharts-gauge-series .highcharts-dial {
  fill: gray;
}
.highcharts-yaxis .highcharts-tick {
  stroke-width: 2px;
  stroke: #666666;
}
.highcharts-yaxis-grid .highcharts-grid-line,
.highcharts-yaxis-grid .highcharts-minor-grid-line {
  display: none;
}

.highcharts-yaxis .highcharts-minor-tick {
  stroke-width: 1px;
  stroke: #999999;
}
</style>
<style lang='less'>
//百度地图版权
.hchartContainer .anchorBL {
  display: none;
}

#highcharts {
  .outer-pane {
  fill: #EFEFEF;
}
.middle-pane {
  stroke-width: 1px;
  stroke: #AAA;
}
.inner-pane {
  fill: #DDDDDD;
}
.green-band {
  fill: #55BF3B;
  fill-opacity: 1;
}
.yellow-band {
  fill: #DDDF0D;
  fill-opacity: 1;
}
.red-band {
  fill: #DF5353;
  fill-opacity: 1;
}
.highcharts-gauge-series .highcharts-pivot {
  stroke-width: 1px;
  stroke: black;
  fill-opacity: 0.3;
}
.highcharts-gauge-series .highcharts-dial {
  fill: gray;
}
.highcharts-yaxis .highcharts-tick {
  stroke-width: 2px;
  stroke: #666666;
}
.highcharts-yaxis-grid .highcharts-grid-line,
.highcharts-yaxis-grid .highcharts-minor-grid-line {
  display: none;
}

.highcharts-yaxis .highcharts-minor-tick {
  stroke-width: 1px;
  stroke: #999999;
}
.inner-pane {
    fill: #fff;
    stroke-width: 0;
}
}

</style>
