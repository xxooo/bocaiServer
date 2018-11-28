<template>
  <div class="main">
    <div class="row toolBar" v-if="editAble" :style="{'margin-right':mode==2?'250px':0}">
      <span>{{boradTitle}}</span>
      <div class=" float-right text-right tool-bar" v-if="detail">
        <icon-font @click='removeAll' :iconClass='"icon-qingkong"' :title="$root.langs.common['smartspc.common.clear']"></icon-font>
        <icon-font @click='goBack' :iconClass='"icon-tuichu1"' :title="$root.langs.common['smartspc.common.goBack']"></icon-font>
        <icon-font @click='save' :iconClass='"icon-baocun"' :title="$root.langs.common['smartspc.common.save']"></icon-font>
      </div>
    </div>

    <div  ref="editor" class="editor" :class="editAble?'editorbg':'readonly'">
      <div class="inner" :class="{half:currendEditModel===1}">
        <gridster ref="gridster" :options="grid" @gridster-resized="gridsterResized" @gridster-loaded="gridsterLoaded" @gridster-mobile-changed="gridsterMobileChanged" @gridster-draggable-changed="gridsterDaggableChanged" @gridster-resizable-changed="gridsterResizableChanged">

          <div class="topPage" id="topPageId" style="width:100%; height:100%;position: absolute;
            z-index: 99;pointer-events:none;">
            <svg width="100%" height="100%"
                 @click="addPoint"
            >
              <template v-for="(item,index) in lineDatas">
                <line v-if="item.field.points.length >= 2" :x1="item.field.points[0].x" :y1="item.field.points[0].y" :x2="item.field.points[1].x" :y2="item.field.points[1].y"
                      :style="'stroke:'+item.field.lineColor+';stroke-width:'+item.field.lineWeight"/>
                <circle v-if="isLine" v-for="(item,index) in item.field.points" :cx="item.x" :cy="item.y" r="4" stroke="#ff0000" stroke-width="2" fill="#fff" />
              </template>

            </svg>
            <template v-for="(item,index) in lineDatas">
              <i v-if="isLine && item.field.points.length==2" id="lineIconId" :style="computStyle(item)" class="iconfont icon-square_delete-copy" :title="$root.langs.common['smartspc.common.clear']" @click="clearPoints(item)"></i>
            </template>
          </div>

          <gridster-item v-for="(item, index) in computedDomwidgets" :key="item.id" :item="item" :id="'widgetWraper'+index" class="widgetWraper" :class="{active: editAble && item.active,remove:item.remove}" @gridster-item-resized="gridsterItemResized(item.id)" @gridster-item-initialized="gridsterItemInitialized(item.id)" @gridster-position-changed="gridsterPositionChanged(item.id)">
            <lazy-render :time="1000" :limit="50" tip="" v-loading="item.loading" @loaded="loaded(item)">
              <widget-item :ref="'widgetItem'+item.id" :data="item" :editAble="editAble" @edit="edit" :ctxMenu="$refs.ctxMenu"></widget-item>
            </lazy-render>
          </gridster-item>
        </gridster>
        <template v-if="showGrid">
          <template v-for="n in (gridColumns+1)">
            <div v-if="n<(gridColumns+1)" class="grid-col" :class="{border:n==1}" :style="{'left':((n-1)*grid.colWidth+190)+'px','height':(maxGridY*grid.rowHeight-grid.margins[1])+'px'}"></div>
            <div v-if="n>1" :class="{border:n==(gridColumns+1)}" class="grid-col" :style="{'left':((n-1)*grid.colWidth-grid.margins[0]+190)+'px','height':(maxGridY*grid.rowHeight-grid.margins[1])+'px'}"></div>
            <div v-if="n<(gridColumns+1)" v-for="m in maxGridY" class="grid-grid" :style="{'left':((n-1)*grid.colWidth+191)+'px','width':(grid.colWidth-grid.margins[0])+'px','height':(grid.rowHeight-grid.margins[1])+'px','top':((m-1)*grid.rowHeight+74)+'px'}"></div>
          </template>
          <template v-for="n in (maxGridY+1)">
            <div v-if="n<=maxGridY" :class="{border:n==1}" class="grid-row" :style="{'top':((n-1)*grid.rowHeight+74)+'px','width':(gridColumns*grid.colWidth-grid.margins[0])+'px'}"></div>
            <div v-if="n>1" :class="{border:n==maxGridY+1}" class="grid-row" :style="{'top':((n-1)*grid.rowHeight-grid.margins[1]+74)+'px','width':(gridColumns*grid.colWidth-grid.margins[0])+'px'}"></div>
          </template>
        </template>
      </div>
    </div>


    <div class="column scrollbar wid-btn-list" v-if="editAble" :class="fixed?'fixed':''">
      <div class="column-header">
        {{$root.langs.dashboard['smartspc.dashboard.components']}}
      </div>
      <div class="column-body components" >
        <el-collapse value="1" accordion>
          <el-collapse-item :title="$root.langs.dashboard['smartspc.dashboard.baseComponents']" name="1">
            <ul class="scrollbar">
              <widgetBtn :key="item.type" v-if="centerLabel('text',item)" v-for="(item, index) in widgetsBtns" v-bind:data="item" @addGridItem="addGridItem"></widgetBtn>
            </ul>
          </el-collapse-item>
          <el-collapse-item :title="$root.langs.dashboard['smartspc.dashboard.spcComponents']" name="2">
            <ul class="scrollbar">
              <widgetBtn :key="item.type" v-if="centerLabel('chart',item)" v-for="(item, index) in widgetsBtns" v-bind:data="item" @addGridItem="addGridItem"></widgetBtn>
            </ul>
          </el-collapse-item>
          <el-collapse-item :title="$root.langs.dashboard['smartspc.dashboard.distributionAnalysis']" name="3">
            <ul class="scrollbar">
              <widgetBtn :key="item.type" v-if="centerLabel('other',item)" v-for="(item, index) in widgetsBtns" v-bind:data="item" @addGridItem="addGridItem"></widgetBtn>
            </ul>
          </el-collapse-item>
          <el-collapse-item :title="$root.langs.dashboard['smartspc.dashboard.defined']" name="4">
            <ul class="scrollbar">
              <widgetBtn :key="item.type" v-if="centerLabel('defined',item)" v-for="(item, index) in widgetsBtns" v-bind:data="item" @addGridItem="addGridItem"></widgetBtn>
            </ul>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div v-show="editAble && mode==2 && currentEidtIndex!=null && domWidgets[currentEidtIndex]!=null" class="column edit-pannel scrollbar" :class="fixed?'fixed':''">
      <widget-edit-item :currentEidtIndex="currentEidtIndex" @filtedEventDomWidgets="filtedEventDomWidgets" @remove="remove"></widget-edit-item>
    </div>
    <context-menu id="context-menu" ref="ctxMenu" :class="editAble?'ctxMenuShow':'ctxMenuHide'">
      <li @click="copy()">{{$root.langs.common['smartspc.common.copy']}}</li>
      <li @click="remove()">{{$root.langs.common['smartspc.common.delete']}}</li>
      <template v-if="currentEidtIndex && domWidgets[currentEidtIndex] && domWidgets[currentEidtIndex].field.resize">
      </template>
    </context-menu>
    <div style="clear:both"></div>
  </div>
</template>
<script>
  import "../css/style.less";
  import jqueryui from '../vendors/jqueryui/install.js';

  import "../components/gridster/vue-gridster.css";
  import Gridster from "../components/gridster/vue-gridster.vue";
  import GridsterItem from "../components/gridster/vue-gridster-item.vue";

  import {
    mapState,
    mapGetters
  } from 'vuex';
  export default {
    props: {
      editAble: {
        type: Boolean,
        default: true
      },
      propDomWidgets: {
        type: Array
      },
      propGridColumns: {
        type: Number,
        default: 4
      },
      propGridMargins: {
        type: Number,
        default: 20
      },
      propGridratio: {
        type: Number,
        default: 0.7
      }
    },
    data: function() {
      let that = this;
      return {
        points: [],
        isLine: false,
        detail:'',
        hackReset: true,
        socketQueue: [], //socket队列,每个设备一个socket
        t: null, //轮询
        currentEidtIndex: null,
        mode: 1,
        tmpPcLayout:[],
        tmpMobileLayout:[],
        grid: {
          margins: [that.propGridMargins, that.propGridMargins],
          isMobile: false,
          pushing: true,
          floating: false, // false, //不自动合并
          swapping: true,
          mobileBreakPoint: 600,
          columns: 8,
          rowHeight: '110', //width*0.7
          draggable: {
            enabled: this.editAble,
            start: function(event, $element, widget) {
              that.showGrid = true
            },
            stop: function(event, $element, widget) {
              that.showGrid = false
            }
          },
          resizable: {
            enabled: this.editAble,
            handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
            start: function(event, $element, widget) {
              that.showGrid = true
            },
            stop: function(event, $element, widget) {
              that.showGrid = false
            }
          },
        },
        currendEditModel: 0, //编辑模式0pc端，1手机端
        showGrid: false, //显示网格，拖动时开启
        widgetsBtns: [{
          label: this.$root.langs.dashboard['smartspc.dashboard.text'],
          labelZ: '文本',
          labelE: 'text',
          labelT: '文本',
          iconcolor: '#5768D2',
          name: '',
          icon: "icon-wenbenkuai",
          type: "label",
          title: '',
          value: '',
          fontsize: 'large',
          lineHeight: 3,
          color: '#4372B4',
          backgroundColor: 'none',
          borderColor: 'none',
          w: 2,
          h: 2,
          mw: 1,
          mh: 1,
          width: '119',
          height: '33',
          textIndent: 0,
          fontWeight: 'normal',
          resize: [{
            w: 1,
            h: 1,
            text: '小'
          }, {
            w: 2,
            h: 1,
            text: '中'
          }, {
            w: 4,
            h: 2,
            text: '大'
          }, {
            w: 6,
            h: 3,
            text: '特大'
          }]
        },{
          label: this.$root.langs.dashboard['smartspc.dashboard.table'],
          labelZ: '表格',
          labelE: 'Table',
          labelT: '表格',
          name: '',
          title: '',
          icon: "icon-biaoge",
          iconcolor: '#67c23a',
          type: 'table',
          dataSParmsList:[],
          statistics:'',
          ifShowParms: true,
          hChartDatas: {},
          dataSParms: '',
          dataSourceList:[
            {
              code: '',
              value: [],
              key:'first'
            }
          ],
          dataSource:[
            {
              code: '',
              value: ''
            }
          ],
          newDatas: [],
          dataList: [],
          datalistLength: 1, //表格行数
          realTime: true,
          muiltData: true,
          w: 4,
          h: 2,
          mw: 2,
          mh: 1,
          width: 257,
          height: 80,
          resize: [{
            w: 5,
            h: 5,
            text: '小'
          }, {
            w: 8,
            h: 6,
            text: '中'
          }, {
            w: 12,
            h: 7,
            text: '大'
          }]
        },
          {
            label: this.$root.langs.dashboard['smartspc.dashboard.line'],
            labelZ: '直线',
            labelE: 'Line',
            labelT: '直線',
            name: '',
            title: '',
            icon: "icon-ico-linetool-qJ-u",
            iconcolor: '#fdab9d',
            type: 'line',
            iconPostion:{
              left:'0px',
              top:'0px'
            },
            lineWeight:2,
            lineColor: '#f67f3d',
            points:[],
            point1:{
              x:0,
              y:0
            },
            point2:{
              x:0,
              y:0
            },
            newData: {},
            newDatas: [],
            dataList: [],
            datalistLength: 1, //表格行数
            realTime: true,
            muiltData: true,
            w: 2,
            h: 2,
            mw: 1,
            mh: 1,
            width: 257,
            height: 80,
            resize: [{
              w: 5,
              h: 5,
              text: '小'
            }, {
              w: 8,
              h: 6,
              text: '中'
            }, {
              w: 12,
              h: 7,
              text: '大'
            }]
          },
          {
            label: this.$root.langs.dashboard['smartspc.dashboard.controlChart'],
            labelZ: '计量型控制图',
            labelE: 'Control Chart',
            iconcolor: '#cddc39',
            zheColor: '#3289c7',
            controlColor: '#32c741',
            dotColor: '#f0411a',
            name: '',
            icon: "icon-line-chart",
            type: "controlChart",
            maxValue: '',
            minValue: '',
            type2: '',
            title: '',
            dashStylesZ: 'Solid',
            dashStylesC: 'DashDot',
            newData: {},
            newDatas: [],
            realTime: true,
            muiltData: true,
            lockWH: false,
            pSize: 1,
            autofill: true,
            dataSParms: '',
            dataSParmsId: '',
            dataSource:[
              {
                code: '',
                value: ''
              }
            ],
            width: 580,
            height: 350,
            hChartDatas: {},
            LCL: '',
            UCL: '',
            w: 4,
            h: 4,
            mw: 2,
            mh: 2,
            resize: [{
              w: 5,
              h: 5,
              text: '小'
            }, {
              w: 8,
              h: 6,
              text: '中'
            }, {
              w: 12,
              h: 7,
              text: '大'
            }]
          },
          {
            label: this.$root.langs.dashboard['smartspc.dashboard.controlChart2'],
            labelZ: '计数型控制图',
            labelE: 'Counting Control Chart',
            iconcolor: '#e91e63',
            zheColor: '#3289c7',
            controlColor: '#32c741',
            dotColor: '#f0411a',
            name: '',
            icon: "icon-line-chart",
            type: "controlChart2",
            ifShowPSize: true,
            maxValue: '',
            minValue: '',
            type2: 'nP',
            title: '',
            dashStylesZ: 'Solid',
            dashStylesC: 'DashDot',
            ifShowParms: false,
            newData: {},
            newDatas: [],
            realTime: true,
            muiltData: true,
            lockWH: false,
            pSize: 50,
            autofill: true,
            dataSParms: '',
            dataSParmsId: '',
            dataSource:[
              {
                code: '',
                value: ''
              }
            ],
            width: 580,
            height: 350,
            hChartDatas: {},
            LCL: '',
            UCL: '',
            w: 4,
            h: 4,
            mw: 2,
            mh: 2,
            resize: [{
              w: 5,
              h: 5,
              text: '小'
            }, {
              w: 8,
              h: 6,
              text: '中'
            }, {
              w: 12,
              h: 7,
              text: '大'
            }]
          },
          {
            label: this.$root.langs.dashboard['smartspc.dashboard.histogram'],
            labelZ: '直方图',
            labelE: 'Histogram',
            iconcolor: '#eb9e05',
            hisColor: '#32b1c7',
            lineColor: '#32c73c',
            dashStylesL: 'Dash',
            isShowCLine: true,
            clColor: '#484f54',
            dashStylesC: 'Dot',
            name: '',
            icon: "icon-chart-column",
            type: "histogram",
            title: '',
            newData: {},
            newDatas: [],
            realTime: true,
            muiltData: true,
            lockWH: false,
            pSize: 1,
            autofill: true,
            dataSParms: '',
            dataSource:[
              {
                code: '',
                value: ''
              }
            ],
            width: 580,
            height: 420,
            hChartDatas: {},
            LCL: '',
            UCL: '',
            realTime: true,
            muiltData: true,
            showLastPointToolip: true,
            lockWH: false,
            w: 4,
            h: 4,
            mw: 2,
            mh: 2,
            width: 315,
            height: 213,
            resize: [{
              w: 5,
              h: 5,
              text: '小'
            }, {
              w: 8,
              h: 6,
              text: '中'
            }, {
              w: 12,
              h: 7,
              text: '大'
            }]
          },{
            label: this.$root.langs.dashboard['smartspc.dashboard.img'],
            labelZ: '图片',
            labelE: 'Img',
            name: '',
            title: '',
            icon: "icon-tupian-",
            iconcolor: "#06D3E6",
            type: "img",
            src: '', //require('assets/img/img2.png'),
            w: 2,
            h: 2,
            mw: 1,
            mh: 1,
            width: 93,
            height: 78,
            lockWH: false,
            resize: [{
              w: 5,
              h: 5,
              text: '小'
            }, {
              w: 8,
              h: 6,
              text: '中'
            }, {
              w: 12,
              h: 7,
              text: '大'
            }]
          },
          {
            label: this.$root.langs.dashboard['smartspc.dashboard.boxPlots'],
            labelZ: '箱线图',
            labelE: 'BoxPlot',
            iconcolor: '#d90cef',
            boxColor: '#32c73c',
            sifenColor: '#32b8c7',
            dashStylesSi: 'Dash',
            name: '',
            icon: "icon-barchart",
            type: "boxplot",
            title: '',
            newData: {},
            newDatas: [],
            realTime: true,
            muiltData: true,
            lockWH: false,
            comparaItem: '',
            dataSParms: '',
            dataSource:[
              {
                code: '',
                value: ''
              }
            ],
            width: 580,
            height: 420,
            hChartDatas: {},
            realTime: true,
            muiltData: true,
            showLastPointToolip: true,
            lockWH: false,
            w: 4,
            h: 4,
            mw: 2,
            mh: 2,
            width: 315,
            height: 213,
            resize: [{
              w: 5,
              h: 5,
              text: '小'
            }, {
              w: 8,
              h: 6,
              text: '中'
            }, {
              w: 12,
              h: 7,
              text: '大'
            }]
          },
          {
            label: this.$root.langs.dashboard['smartspc.dashboard.scatter'],
            labelZ: '散点图',
            labelE: 'Scatter',
            iconcolor: '#7dfc99',
            scatColor: '#c73255',
            name: '',
            icon: "icon-dotchart",
            type: "scatter",
            title: '',
            newData: {},
            newDatas: [],
            realTime: true,
            muiltData: true,
            lockWH: false,
            dataSParmsX: '',
            dataSParmsY: '',
            dataSource:[
              {
                code: '',
                value: ''
              }
            ],
            width: 580,
            height: 420,
            hChartDatas: {},
            realTime: true,
            muiltData: true,
            showLastPointToolip: true,
            lockWH: false,
            w: 4,
            h: 4,
            mw: 2,
            mh: 2,
            width: 315,
            height: 213,
            resize: [{
              w: 5,
              h: 5,
              text: '小'
            }, {
              w: 8,
              h: 6,
              text: '中'
            }, {
              w: 12,
              h: 7,
              text: '大'
            }]
          },
          {
            label: this.$root.langs.dashboard['smartspc.dashboard.plato'],
            labelZ: '柏拉图',
            labelE: 'Plato',
            iconcolor: '#4d05d4',
            boxColor: '#32c73c',
            sifenColor: '#32b8c7',
            dashStylesSi: 'Dash',
            name: '',
            icon: "icon-chart-timeline",
            type: "plato",
            title: '',
            newData: {},
            newDatas: [],
            realTime: true,
            muiltData: true,
            lockWH: false,
            pSize: 1,
            autofill: true,
            dataSParms: '',
            dataSource:[
              {
                code: '',
                value: ''
              }
            ],
            width: 580,
            height: 320,
            hChartDatas: {},
            LCL: '',
            UCL: '',
            realTime: true,
            muiltData: true,
            showLastPointToolip: true,
            lockWH: false,
            w: 4,
            h: 4,
            mw: 2,
            mh: 2,
            width: 315,
            height: 213,
            resize: [{
              w: 5,
              h: 5,
              text: '小'
            }, {
              w: 8,
              h: 6,
              text: '中'
            }, {
              w: 12,
              h: 7,
              text: '大'
            }]
          },
          {
            label: this.$root.langs.dashboard['smartspc.dashboard.figure'],
            labelZ: '靶图',
            labelE: 'Figure',
            iconcolor: '#05bfd4',
            pointColor: '#c73255',
            lineColor: '#32b8c7',
            isShowCLine: true,
            name: '',
            icon: "icon-radarchart",
            type: "figure",
            title: '',
            newData: {},
            newDatas: [],
            realTime: true,
            muiltData: true,
            lockWH: false,
            dataSParmsX: '',
            dataSParmsY: '',
            dataCircle:[{r:10}],//圆半径
            dataSource:[
              {
                code: '',
                value: ''
              }
            ],
            width: 300,
            height: 420,
            hChartDatas: {},
            realTime: true,
            muiltData: true,
            showLastPointToolip: true,
            lockWH: false,
            w: 4,
            h: 4,
            mw: 2,
            mh: 2,
            resize: [{
              w: 5,
              h: 5,
              text: '小'
            }, {
              w: 8,
              h: 6,
              text: '中'
            }, {
              w: 12,
              h: 7,
              text: '大'
            }]
          },
          {
            label: this.$root.langs.dashboard['smartspc.dashboard.running'],
            labelZ: '运行图',
            labelE: 'Running Chart',
            iconcolor: '#009688',
            lineColor: '#32b8c7',
            dashStylesL: 'Dash',
            name: '',
            icon: "icon-chart-line1",
            type: "running",
            title: '',
            newData: {},
            newDatas: [],
            realTime: true,
            muiltData: true,
            lockWH: false,
            pSize: 1,
            autofill: true,
            dataSParms: '',
            dataSource:[
              {
                code: '',
                value: ''
              }
            ],
            width: 580,
            height: 420,
            hChartDatas: {},
            LCL: '',
            UCL: '',
            realTime: true,
            muiltData: true,
            showLastPointToolip: true,
            lockWH: false,
            w: 4,
            h: 4,
            mw: 2,
            mh: 2,
            width: 315,
            height: 213,
            resize: [{
              w: 5,
              h: 5,
              text: '小'
            }, {
              w: 8,
              h: 6,
              text: '中'
            }, {
              w: 12,
              h: 7,
              text: '大'
            }]
          },
          {
            label: this.$root.langs.dashboard['smartspc.dashboard.indicator'],
            labelZ: '指示器',
            labelE: 'Indicator',
            iconcolor: '#e14d4d',
            hisColor: '#c73255',
            lineColor: '#32b8c7',
            dashStylesL: 'Dash',
            isShowCLine: true,
            clColor: '#55c732',
            dashStylesC: 'Dot',
            name: '',
            icon: "icon-deng1",
            type: "indicator",
            exceptionNum: '',
            title: '',
            newData: {},
            newDatas: [],
            realTime: true,
            muiltData: true,
            lockWH: false,
            pSize: 1,
            autofill: true,
            dataSParmsId: '',
            dataSParms: '',
            dataSource:[
              {
                code: '',
                value: ''
              }
            ],
            hChartDatas: {},
            LCL: '',
            UCL: '',
            realTime: true,
            muiltData: true,
            showLastPointToolip: true,
            lockWH: false,
            w: 2,
            h: 2,
            mw: 1,
            mh: 1,
            width: 42,
            color: '#000000',
            backgroundColor: '#wefefe',
            borderColor: '#dfdfdf',
            alarmSelectAbleEvent: ['backgroundColor', 'borderColor', 'width', 'height'],
            resize: [{
              w: 5,
              h: 5,
              text: '小'
            }, {
              w: 8,
              h: 6,
              text: '中'
            }, {
              w: 12,
              h: 7,
              text: '大'
            }]
          },
          {
            label: 'Cpk',
            labelZ: 'Cpk',
            labelE: 'Cpk',
            iconcolor: '#8c3b00',
            name: '',
            icon: "icon-oiltablechart",
            type: "cpk",
            title: '',
            newData: {},
            newDatas: [],
            realTime: true,
            muiltData: true,
            lockWH: false,
            pSize: 1,
            autofill: true,
            dataSParms: '',
            dataSource:[
              {
                code: '',
                value: ''
              }
            ],
            hChartDatas: {},
            LCL: '',
            UCL: '',
            realTime: true,
            muiltData: true,
            showLastPointToolip: true,
            lockWH: false,
            w: 2,
            h: 2,
            mw: 1,
            mh: 1,
            width: 315,
            height: 213,
            resize: [{
              w: 5,
              h: 5,
              text: '小'
            }, {
              w: 8,
              h: 6,
              text: '中'
            }, {
              w: 12,
              h: 7,
              text: '大'
            }]
          },
          {
            label: this.$root.langs.dashboard['smartspc.dashboard.defined'],
            labelZ: '自定义',
            labelE: 'Defined',
            iconcolor: '#5768D2',
            name: '',
            icon: "icon-zidingyibaobiao",
            type: "defined",
            title: '',
            url: '',
            w: 2,
            h: 2,
            mw: 1,
            mh: 1,
            width: '119',
            height: '33',
            resize: [{
              w: 1,
              h: 1,
              text: '小'
            }, {
              w: 2,
              h: 1,
              text: '中'
            }, {
              w: 4,
              h: 2,
              text: '大'
            }, {
              w: 6,
              h: 3,
              text: '特大'
            }]
          }],
        domWidgets: [],
        //需要实时数据的设备及其字段
        //结构:设备.属性1.[组件1,组件2]
        //         .属性2.[组件3,组件4]
        //注册时先删除再添加,保证一个组件最多注册一次
        // dynamicDatas: {},
        history: [],
        isExist: true, //当前组件是否存在
        fixed: false
      }
    },
    components: {
      IconFont: resolve => require(['common/iconfont.vue'], resolve),
      widgetBtn: resolve => require(['../components/widgetBtn.vue'], resolve),
      widgetItem: resolve => require(['../components/widgetItem.vue'], resolve),
      widgetEditItem: resolve => require(['../components/widgetEditItem.vue'], resolve),
      contextMenu: resolve => require(['vue-context-menu'], resolve),
      Gridster,
      GridsterItem
    },
    created: function() {
      //console.log('created--edit');
      this.pollingDataByRealData();
    },
    updated: function() {
    },
    mounted() {
      //console.log('mounted--edit');
      this.hackReset = false;

      var that = this;
      this.$nextTick(function() {
        //从LocalStorage获取
        // that.fromLocalStorage()
        that.hackReset = true;
        //console.log(this.hackReset);
        // 解决时间运行久了会卡·································
        setInterval(function() {
          /*window.console && console.log('forceUpdate')*/
          that.$forceUpdate()
        }, 60e3);

        /*console.log('propDomWidgets``````````````````',that.propDomWidgets);*/

        if (that.propDomWidgets) {
          // 作为组件传参进来
          that.domWidgets = _.clone(that.propDomWidgets);
          //console.log('作为组件传参进来');
          //that.pollingDataByRealData();
        } else {
          //从数据库获取
          /*this.$store.dispatch('getDashboardDetail', {
            id: this.$route.params.id
          })*/
          this.fetchData(this.editId);
        }

        //监听屏幕大小变化
        setTimeout(function() {
          window.onresize = function() {
            //console.log('监听屏幕大小变化');
            that.resetGrid();
            that.scalingPoint();
          }
        }, 0)
        that.resetGrid();

        window.onscroll = function(e) {
          if ($("body").scrollTop() > 60) {
            that.fixed = true
          } else {
            that.fixed = false
          }
        }
      })
    },
    // beforeRouteLeave (to, from, next) {

    //   // 导航离开该组件的对应路由时调用

    //   console.log('from, next');
    //   this.$destroy();
    //   next();
    //   // 可以访问组件实例 `this`

    // },
    watch: {
      detail: function(val, oldVal) {

        if (val) {
          this.fromJson(val);
        }
      },
      propDomWidgets: function() {
        let that = this
        that.domWidgets = _.clone(that.propDomWidgets)
      },
      editId: function() {
        this.reset()
      }
    },
    computed: {
      ...mapGetters({
        watermark: 'getwatermark',
        gridcolumns: 'getgridcolumns',
        boradTitle:'getboradTitle',
        refresh: 'getrefresh'
      }),
      editId: function() {
        return this.$route.params.id
      },
      isShowBF: function() {
        return (this.$route.name == 'toBoardShow' || this.$route.name == 'fullDashboardView') ? true : false
      },
      filtedEventDomWidgets: function() {
        return this.domWidgets.filter((item) => (item.field.alarmSelectAbleEvent != undefined))
      },
      computedDomwidgets: function() {

        let that = this;
        let domWidgets = that.domWidgets;
        domWidgets.forEach(function(v, i) {
          let item = domWidgets[i];
          //扩展出每个组件的最小尺寸
          let widget = that.widgetsBtns.find(n => n.type == item.type);
          item.minSizeX = widget.mw || widget.w;
          item.minSizeY = widget.mh || widget.h;
          that.initLayout(item, i);

        })
        return this.domWidgets.filter((item) => (item.type != 'line'));
      },
      lineDatas: function() {
        return this.domWidgets.filter((item) => (item.type == 'line'));
      },
      maxGridY: function() {
        let that = this
        let maxy = 1
        for (let x in that.domWidgets) {
          let y = that.domWidgets[x].row + that.domWidgets[x].sizeY
          if (!that.domWidgets[x].remove && y > maxy) {
            maxy = y
          }
        }
        return maxy
      },
      gridColumns: function() {
        return this.currendEditModel === 0 ? this.gridcolumns : 2
      }
    },
    methods: {
      computStyle(item){

        let left = item.field.points[1].x+4+'px';
        let top = item.field.points[1].y+4+'px';
        return 'position:absolute;color:#f67f3d;left:'+left+';top:'+top;
      },

      clearPoints(item) {
        item.field.points = [];

        if(!item.active) {
          for (let i in this.domWidgets) {
            if (this.domWidgets[i].id == item.id) {
              this.domWidgets.splice(i, 1);
              break;
            }
          }
        }

      },
      scalingPoint() {

        let that = this;
        let domObj = {};

        for(let i in that.computedDomwidgets) {
          domObj[that.computedDomwidgets[i].id] = 'widgetWraper'+i;
        }

        for(let m in this.domWidgets) {
          if(this.domWidgets[m].type == 'line') {
            for(let n in this.domWidgets[m].field.points) {
              let wid = domObj[this.domWidgets[m].field.points[n].uuId];
              let leftv = $('#'+wid).position().left;
              let topv = $('#'+wid).position().top;
              let odiv = document.getElementById(wid);
              let widthT = odiv.offsetWidth;
              let heightT = odiv.offsetHeight;
              this.domWidgets[m].field.points[n].x = leftv + this.domWidgets[m].field.points[n].wk*widthT;
              this.domWidgets[m].field.points[n].y = topv + this.domWidgets[m].field.points[n].hk*heightT;
            }
          }
        }


      },
      addPoint(evt) {

        let activeLine = this.domWidgets[this.currentEidtIndex];
        if(activeLine.field.points.length < 2) {

          let uuId,wk,hk = '';
          let widthT,heightT,pw,ph = 0;

          for(let n in this.computedDomwidgets) {
            let odiv = document.getElementById('widgetWraper'+n);
            let odid = 'widgetWraper'+n;
            let leftv = $('#'+odid).position().left;
            let topv = $('#'+odid).position().top;
            widthT = odiv.offsetWidth;
            heightT = odiv.offsetHeight;
            if((evt.offsetX - leftv) < widthT && (evt.offsetX - leftv) > 0) {
              if((evt.offsetY - topv) < heightT && (evt.offsetY - topv) > 0){
                uuId = this.computedDomwidgets[n].id;
                pw = evt.offsetX - leftv;
                ph = evt.offsetY - topv;
                wk = pw/widthT;
                hk = ph/heightT;
                activeLine.field.points.push(
                  {
                    x: evt.offsetX,
                    y: evt.offsetY,
                    wk: wk,
                    hk: hk,
                    uuId: uuId
                  }
                )
              }
            }

          }
        } else {
        }
      },
      async fetchData(id) {
        let that = this;
        let lmnData = await this.$get(`${window.gatewayspc}/kb/lmnta/`+id);
        console.log(lmnData);
        if(lmnData.code==0){

          that.detail = lmnData.data;

          store.commit('updatedataSource',lmnData.data.dataSource);
          _g.closeGlobalLoading();
        }

        let prjData = await that.$get(`${window.gatewayspc}/kb/tmpltmsg/`+this.editId);

          if(prjData.code==0){
            store.commit('updateboradTitle',prjData.data.title);
            store.commit('updaterefresh',prjData.data.refresh);
            store.commit('updatewatermark',prjData.data.watermark);
            createWaterMark(this.watermark);
          }

      },
      centerLabel(type,item){
        let arr;
        if(type === 'text'){
          arr=["label","table","img","line","indicator"];
        }else if(type === 'chart'){
          arr=["histogram","controlChart","boxplot","plato","cpk","controlChart2"];
        } else if(type === 'other'){
          arr=["scatter","running","figure"];
        }else{
          arr = ['defined']
        }
        return arr.findIndex(type => type === item.type)>-1;
      },
      initLayout: function(item, index) {
        if (!item.pcLayout) {
          item.pcLayout={
            col:item.col,
            row:item.row,
            sizeX:item.sizeX,
            sizeY:item.sizeY
          }
        }
        if (!item.mobileLayout) {
          item.mobileLayout={
            col:0,
            row:index,
            sizeX:1,
            sizeY:1,
          }
        }
      },
      setLayout: function() {
        let that =this
        for(let x in that.domWidgets){
          let item=that.domWidgets[x]
          if (that.currendEditModel==0) {
            item.pcLayout.col = item.col
            item.pcLayout.row = item.row
            item.pcLayout.sizeX = item.sizeX
            item.pcLayout.sizeY = item.sizeY
          }else{
            item.mobileLayout.col = item.col
            item.mobileLayout.row = item.row
            item.mobileLayout.sizeX = item.sizeX
            item.mobileLayout.sizeY = item.sizeY
          }
        }
      },
      resetGrid: function() {
        //console.log('调整尺寸');
        let that = this
        if (!that.$refs.gridster) {
          return
        }
        let totalWidth = that.$refs.gridster.$el.clientWidth
        let colWidth = (totalWidth - that.grid.margins[0] * 2) / that.gridcolumns
        let rowHeight = colWidth * that.propGridratio
        // window.console && console.log(222, colWidth)
        that.grid.rowHeight = rowHeight
        that.grid.colWidth = colWidth
      },
      //初始化后一直轮询app.dynamicDatas,并向数据库取数据
      async pollingDataByRealData() {

        var that = this;
        // window.console && console.log('pollingData', that.editId)
        // that.t = setTimeout(that.pollingData, 1000);
        // return;

        if (this.isShowBF) {

          for(let n in that.domWidgets) {

            if(!this.editAble) {

              let url = '';

              switch (that.domWidgets[n].field.type) {
                case 'controlChart2':
                  url = 'pchart/';
                  break;
                case 'controlChart':
                  url = 'cchart/';
                  break;
                case 'histogram':
                  url = 'hist/';
                  break;
                case 'boxplot':
                  url = 'boxplot/';
                  break;
                case 'plato':
                  url = 'ploat/';
                  break;
                case 'cpk':
                  url = 'cpk/';
                  break;
                case 'scatter':
                  url = 'scatter/';
                  break;
                case 'running':
                  url = 'runchart/';
                  break;
                case 'table':
                  url = 'table/';
                  break;
                case 'indicator':
                  url = 'indicator/';
                  break;
                case 'figure':
                  url = 'targetmap/';
                  break;
                case 'defined':
                  //url = 'defined/';
                  break;
              }

            if((['cpk/','runchart/','indicator/','hist/','cchart/'].findIndex((n) => n == url)>-1) && that.domWidgets[n].field.dataSParms != '') {

              //console.log('urlurlurlurlurlurl',url);

              let prjData = await this.$get(`${window.gatewayspc}/kb/`+url+that.domWidgets[n].id);

                if(prjData.code == 0) {
                  let a,b = '';
                  a = JSON.stringify(prjData.data);

                  if(that.domWidgets[n]) {
                    b = JSON.stringify(that.domWidgets[n].field.hChartDatas);
                  }

                  if(a == b) {
                    /*return;*/
                    console.log('a == b');

                    if(that.domWidgets[n].field.type == 'cchart') {

                      let min =eval("Math.min(" +prjData.data.points.toString()+")");　 // 1     采用字符串拼接

　　                  let max = eval("Math.max(" +prjData.data.points.toString()+")");;　 // 33

                      that.domWidgets[n].field.hChartDatas = prjData.data;
                      that.domWidgets[n].field.hChartDatas.CL = prjData.data.CL.toFixed(3)*1;
                      that.domWidgets[n].field.hChartDatas.LCL = prjData.data.LCL.toFixed(3)*1;
                      that.domWidgets[n].field.hChartDatas.UCL = prjData.data.UCL.toFixed(3)*1;

                      if(max > that.domWidgets[n].field.hChartDatas.UCL) {
                        that.domWidgets[n].field.maxValue = max;
                      } else {
                        that.domWidgets[n].field.maxValue = that.domWidgets[n].field.hChartDatas.UCL+(that.domWidgets[n].field.hChartDatas.UCL - that.domWidgets[n].field.hChartDatas.LCL)*0.05;
                      }

                      if(min < that.domWidgets[n].field.hChartDatas.LCL) {
                        that.domWidgets[n].field.minValue = min;
                      } else {
                        that.domWidgets[n].field.minValue = that.domWidgets[n].field.hChartDatas.LCL-(that.domWidgets[n].field.hChartDatas.UCL - that.domWidgets[n].field.hChartDatas.LCL)*0.05;
                      }



                      // that.domWidgets[n].field.hChartDatas = prjData.data;
                      // that.domWidgets[n].field.hChartDatas.CL = prjData.data.CL.toFixed(3)*1;
                      // that.domWidgets[n].field.hChartDatas.LCL = prjData.data.LCL.toFixed(3)*1;
                      // that.domWidgets[n].field.hChartDatas.UCL = prjData.data.UCL.toFixed(3)*1;
                    }
                  } else {
                    console.log('a != b');
                    if(url == 'indicator/') {
                      that.domWidgets[n].field.backgroundColor =  prjData.data.color === 'RED' ? '#d61111' : '#11d611';
                      that.domWidgets[n].field.exceptionNum =  prjData.data.total;
                    } else if(url == 'cchart/') {

                      let min =eval("Math.min(" +prjData.data.points.toString()+")");　 // 1     采用字符串拼接

　　                  let max = eval("Math.max(" +prjData.data.points.toString()+")");;　 // 33

                      that.domWidgets[n].field.hChartDatas = prjData.data;
                      that.domWidgets[n].field.hChartDatas.CL = prjData.data.CL.toFixed(3)*1;
                      that.domWidgets[n].field.hChartDatas.LCL = prjData.data.LCL.toFixed(3)*1;
                      that.domWidgets[n].field.hChartDatas.UCL = prjData.data.UCL.toFixed(3)*1;

                      if(max > that.domWidgets[n].field.hChartDatas.UCL) {
                        that.domWidgets[n].field.maxValue = max;
                      } else {
                        that.domWidgets[n].field.maxValue = that.domWidgets[n].field.hChartDatas.UCL+(that.domWidgets[n].field.hChartDatas.UCL - that.domWidgets[n].field.hChartDatas.LCL)*0.05;
                      }

                      if(min < that.domWidgets[n].field.hChartDatas.LCL) {
                        that.domWidgets[n].field.minValue = min;
                      } else {
                        that.domWidgets[n].field.minValue = that.domWidgets[n].field.hChartDatas.LCL-(that.domWidgets[n].field.hChartDatas.UCL - that.domWidgets[n].field.hChartDatas.LCL)*0.05;
                      }

                      // that.domWidgets[n].field.hChartDatas = prjData.data;
                      // that.domWidgets[n].field.hChartDatas.CL = prjData.data.CL.toFixed(3)*1;
                      // that.domWidgets[n].field.hChartDatas.LCL = prjData.data.LCL.toFixed(3)*1;
                      // that.domWidgets[n].field.hChartDatas.UCL = prjData.data.UCL.toFixed(3)*1;

                    } else {
                      that.domWidgets[n].field.hChartDatas = prjData.data;
                    }
                  }
                } else {
                  that.domWidgets[n].field.hChartDatas = {};
                }
            }

          if(url == 'pchart/' && (that.domWidgets[n].field.type2 != '' && that.domWidgets[n].field.dataSource[0].value))  {

            let indexData = that.domWidgets[n].field.dataSource.length*1 - 1;

            if(that.domWidgets[n].field.dataSource[indexData].value != '') {

              let prjData = await this.$get(`${window.gatewayspc}/kb/`+url+that.domWidgets[n].id);

                if(prjData.code == 0) {
                  let a,b = '';
                  a = JSON.stringify(prjData.data);

                  if(that.domWidgets[n]) {
                    b = JSON.stringify(that.domWidgets[n].field.hChartDatas);
                  }


                      let min =eval("Math.min(" +prjData.data.points.toString()+")");　 // 1     采用字符串拼接

　　                  let max = eval("Math.max(" +prjData.data.points.toString()+")");;　 // 33

                      that.domWidgets[n].field.hChartDatas = prjData.data;
                      that.domWidgets[n].field.hChartDatas.CL = prjData.data.CL.toFixed(3)*1;
                      that.domWidgets[n].field.hChartDatas.LCL = prjData.data.LCL.toFixed(3)*1;
                      that.domWidgets[n].field.hChartDatas.UCL = prjData.data.UCL.toFixed(3)*1;

                      if(max > that.domWidgets[n].field.hChartDatas.UCL) {
                        that.domWidgets[n].field.maxValue = max;
                      } else {
                        that.domWidgets[n].field.maxValue = that.domWidgets[n].field.hChartDatas.UCL+(that.domWidgets[n].field.hChartDatas.UCL - that.domWidgets[n].field.hChartDatas.LCL)*0.05;
                      }

                      if(min < that.domWidgets[n].field.hChartDatas.LCL) {
                        that.domWidgets[n].field.minValue = min;
                      } else {
                        that.domWidgets[n].field.minValue = that.domWidgets[n].field.hChartDatas.LCL-(that.domWidgets[n].field.hChartDatas.UCL - that.domWidgets[n].field.hChartDatas.LCL)*0.05;
                      }

                } else {
                  that.domWidgets[n].field.hChartDatas = {};
                }

            }

          }

          if(url == 'boxplot/' && (that.domWidgets[n].field.comparaItem != '' && that.domWidgets[n].field.dataSParms != '')) {
            let prjData = await this.$get(`${window.gatewayspc}/kb/`+url+that.domWidgets[n].id);

                if(prjData.code == 0) {
                  let a,b = '';
                  a = JSON.stringify(prjData.data);

                  if(that.domWidgets[n]) {
                    b = JSON.stringify(that.domWidgets[n].field.hChartDatas);
                  }

                  if(a == b) {
                    /*return;*/
                  } else {
                      that.domWidgets[n].field.hChartDatas = prjData.data;
                  }
                } else {
                  that.domWidgets[n].field.hChartDatas = {};
                }

          }

          if(url == 'ploat/' && that.domWidgets[n].field.dataSource[0].value) {
            let prjData = await this.$get(`${window.gatewayspc}/kb/`+url+that.domWidgets[n].id);

                if(prjData.code == 0) {
                  let a,b = '';
                  a = JSON.stringify(prjData.data);

                  if(that.domWidgets[n]) {
                    b = JSON.stringify(that.domWidgets[n].field.hChartDatas);
                  }

                  if(a == b) {
                    /*return;*/
                  } else {
                      that.domWidgets[n].field.hChartDatas = prjData.data;
                  }
                } else {
                  that.domWidgets[n].field.hChartDatas = {};
                }
          }

          if(['scatter/','targetmap/'].findIndex((n) => n == url)>-1  && (that.domWidgets[n].field.dataSParmsY != '' && that.domWidgets[n].field.dataSParmsX != '')) {
            let prjData = await this.$get(`${window.gatewayspc}/kb/`+url+that.domWidgets[n].id);

                if(prjData.code == 0) {
                  let a,b = '';
                  a = JSON.stringify(prjData.data);

                  if(that.domWidgets[n]) {
                    b = JSON.stringify(that.domWidgets[n].field.hChartDatas);
                  }

                  if(a == b) {
                    /*return;*/
                  } else {
                      that.domWidgets[n].field.hChartDatas = prjData.data;
                  }
                } else {
                  that.domWidgets[n].field.hChartDatas = {};
                }
          }

          if(url == 'table/') {


            let indexData = that.domWidgets[n].field.dataSourceList.length*1 - 1;

            if((that.domWidgets[n].field.statistics==='boardRate' || that.domWidgets[n].field.statistics==='boardTotal') && that.domWidgets[n].field.dataSourceList[indexData].value != '') {

              let prjData = await this.$get(`${window.gatewayspc}/kb/`+url+that.domWidgets[n].id);

                if(prjData.code == 0) {
                  let a,b = '';
                  a = JSON.stringify(prjData.data);

                  if(that.domWidgets[n]) {
                    b = JSON.stringify(that.domWidgets[n].field.hChartDatas);
                  }

                  if(a == b) {
                    /*return;*/
                  } else {
                      that.domWidgets[n].field.hChartDatas = prjData.data;
                  }
                } else {
                  that.domWidgets[n].field.hChartDatas = {};
                }

            }

            if(that.domWidgets[n].field.statistics != '' && that.domWidgets[n].field.dataSParmsList != '') {

              let prjData = await this.$get(`${window.gatewayspc}/kb/`+url+that.domWidgets[n].id);

                if(prjData.code == 0) {
                  let a,b = '';
                  a = JSON.stringify(prjData.data);

                  if(that.domWidgets[n]) {
                    b = JSON.stringify(that.domWidgets[n].field.hChartDatas);
                  }

                  if(a == b) {
                    /*return;*/
                  } else {
                      that.domWidgets[n].field.hChartDatas = prjData.data;
                  }
                } else {
                  that.domWidgets[n].field.hChartDatas = {};
                }
              
            }
          }



            }
          }

          that.t = setTimeout(that.pollingDataByRealData, this.refresh);

        }

        
      },
      loaded: function(item) {
        item.loading = false;
        //修复elementui loading层不自动关闭的bug
        setTimeout(function() {
          $('#' + item.id).parents('.lazy-load').find('.el-loading-mask').remove()
        }, 50);

      },
      reset: function() {
        this.domWidgets = [];
        if (this.t) {
          clearTimeout(this.t)
          this.t = undefined;
        }
      },
      addGridItem: function(item) {

        for(let i in this.domWidgets) {
          if(this.domWidgets[i].type == 'line') {
            console.log(this.domWidgets[i]);
            if (this.domWidgets[i].field.points.length<2) {
              this.domWidgets.splice(i, 1);
              break;
            }
          }
        }

        if(item.type == 'line') {
          this.isLine = true;
          $("#topPageId").css("pointer-events","auto");

          let that = this,
            width = $('.gridster').outerWidth(),
            maxy = _.maxBy(that.domWidgets, function(o) {
              return o.row + (o.sizeY - 1);
            });
          maxy = maxy ? (maxy.row + maxy.sizeY - 1) : 0
          // item.x = 0 //Math.floor(item.x * that.grid.col / width)
          // item.y = Math.floor(maxy)
          let colWidth = that.gridcolumns / width
          item.x = Math.floor(item.x * colWidth)
          item.y = Math.floor(item.y / that.grid.rowHeight) // + (item.type == 'table' || item.type == 'form' || item.type == 'dashboard' || item.type == 'map' ? 4 : 0)

          let gridItem = {
            row: item.y,
            col: item.x,
            sizeX: item.w,
            sizeY: item.h,
            type: item.type,
            field: item.field,
            i: item.id,
            id: item.id,
            loading: true,
          }
          that.domWidgets.push(gridItem);

          let numIndex = that.domWidgets.length-1;

          this.mode = 2;
          this.setActive(numIndex);
          this.currentEidtIndex = numIndex;

        } else {
          this.isLine = false;
          $("#topPageId").css("pointer-events","none");

          let that = this,
            width = $('.gridster').outerWidth(),
            maxy = _.maxBy(that.domWidgets, function(o) {
              return o.row + (o.sizeY - 1);
            });
          maxy = maxy ? (maxy.row + maxy.sizeY - 1) : 0
          // item.x = 0 //Math.floor(item.x * that.grid.col / width)
          // item.y = Math.floor(maxy)
          let colWidth = that.gridcolumns / width
          item.x = Math.floor(item.x * colWidth)
          item.y = Math.floor(item.y / that.grid.rowHeight) // + (item.type == 'table' || item.type == 'form' || item.type == 'dashboard' || item.type == 'map' ? 4 : 0)

          let gridItem = {
            row: item.y,
            col: item.x,
            sizeX: item.w,
            sizeY: item.h,
            type: item.type,
            field: item.field,
            i: item.id,
            id: item.id,
            loading: true
          }
          that.domWidgets.push(gridItem)
          setTimeout(function() {
            that.resize(item.w, item.h, that.domWidgets.length - 1)
          }, 30)
        }

      },
      edit: function(index) {
        //window.console && console.log('eidt', index);
        this.mode = 2;
        this.setActive(index);
        this.currentEidtIndex = index;
        this.resetGrid();
        this.scalingPoint();
      },
      setActive: function(index) {
        let data = this.domWidgets.filter((item) => (item.type != 'line'));
        data.forEach(function(item, i) {
          data[i].active = i == index;
        })
      },
      remove: function(index) {

        var that = this;
        // 询问框
        // window.console && console.log(222)  en == 'en-US' ? 'Tips'  : (en == 'zh-CN' ? '提示' : '提示'),
        const h = this.$createElement;  
        let en = Lockr.get('locale')
        this.$msgbox({
          title: en == 'en-US' ? 'Tips'  : (en == 'zh-CN' ? '提示' : '提示'),
          message: h('p', null, [
            h('span', null, (en == 'en-US' ? 'Are you sure you want to remove' : (en == 'zh-CN' ? '确定删除' : '確定刪除'))),
          ]),
          showCancelButton: true,
          confirmButtonText: en == 'en-US' ? 'Ok' : (en == 'zh-CN' ? '确认' : '確認'),
          cancelButtonText: en == 'en-US' ? 'No' : (en == 'zh-CN' ? '取消' : '取消'),


          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              if (!index) {
                index = that.currentEidtIndex;
              }
              if (that.domWidgets[index]) {
                window.console && console.log('remove', index);
                var obj = that.domWidgets[index];
                var type = obj.field.type;

                that.currentEidtIndex = null;
                console.log('lineDatas',JSON.stringify(that.lineDatas));
                let domWi = that.domWidgets;
                let domid;

                for (let i in that.domWidgets) {
                  if (that.domWidgets[i].active) {
                    domid = that.domWidgets[i].id;

                    that.domWidgets[i].remove = true;
                    for(let j in that.domWidgets) {
                      if(that.domWidgets[j].type == 'line') {
                        if((that.domWidgets[j].field.points[0].uuId == domid) || (that.domWidgets[j].field.points[1].uuId == domid)) {
                          that.domWidgets.splice(j, 1);
                        }
                      }
                    }

                    //break;
                  }
                }

              } else {
                window.console && console.log(that.domWidgets, index);
              }
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = 'clearing...';
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            } else {
              done();
            }
          }
        });
      },
      removeAll: function() {

        var that = this;
        //询问框
        const h = this.$createElement;
        let en = Lockr.get('locale')
        this.$msgbox({
          title: en == 'en-US' ? 'Tips'  : (en == 'zh-CN' ? '提示' : '提示'),
          message: h('p', null, [
            h('span', null, (en == 'en-US' ? 'Are you sure you want to remove' : (en == 'zh-CN' ? '确定删除' : '確定刪除'))),
          ]),
          showCancelButton: true,
          confirmButtonText: en == 'en-US' ? 'Ok' : (en == 'zh-CN' ? '确认' : '確認'),
          cancelButtonText: en == 'en-US' ? 'No' : (en == 'zh-CN' ? '取消' : '取消'),
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              that.domWidgets.splice(0, that.domWidgets.length)
              // that.dynamicDatas = {}
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = 'clearing...';
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            } else {
              done();
            }
          }
        });
      },
      //******待改BUG
      copy: function(index) {
        if (!index) {
          index = this.currentEidtIndex;
        }
        window.console && console.log('copy', index);
        var item = deepCopy(this.domWidgets[index])
        item.active = false
        if (item.field && item.field.title) {
          item.field.title += ' Copy'
        }
        // if (item.field.hasOwnProperty('device')) {
        //   let data = [{
        //     id: '',
        //     text: ''
        //   }]
        //   if (item.field.device[0].hasOwnProperty('showfield')) {
        //     data[0].showfield = {}
        //   }
        //   if (item.field.device[0].hasOwnProperty('showPropertyField')) {
        //     data[0].showPropertyField = {}
        //   }
        //   item.field.device = data
        // }
        item.id = generateUUID()
        item.i = item.id
        window.console && console.log(item);
        this.domWidgets.push(item);
      },
      async save() {

        let that = this;
        let obj = this.toJson();

        console.log('objobjobj',obj);

        let ret = await this.$post(`${window.gatewayspc}/kb/tmpltu/`+this.editId, obj);
        if(ret.code == '0') {
          this.$success(ret.msg);
          router.push({
            name: 'boardDefinition',
          })
        }

      },
      saveLayout:function(){
        let that =this
        //为解决切换模式渲染后错位，暂存布局，渲染完毕后还原
        that.tmpPcLayout=[]
        that.tmpMobileLayout=[]
        for(let x in that.domWidgets){
          that.tmpPcLayout.push({
            col:that.domWidgets[x].pcLayout.col,
            row:that.domWidgets[x].pcLayout.row,
            sizeX:that.domWidgets[x].pcLayout.sizeX,
            sizeY:that.domWidgets[x].pcLayout.sizeY,
          })
          that.tmpMobileLayout.push({
            col:that.domWidgets[x].mobileLayout.col,
            row:that.domWidgets[x].mobileLayout.row,
            sizeX:that.domWidgets[x].mobileLayout.sizeX,
            sizeY:that.domWidgets[x].mobileLayout.sizeY,
          })
        }
      },
      restoreLayout:function(){
        let that =this
        //为解决切换模式渲染后错位，暂存布局，渲染完毕后还原
        for(let x in that.domWidgets){
          that.domWidgets[x].pcLayout=deepCopy(that.tmpPcLayout[x])
          that.domWidgets[x].mobileLayout=deepCopy(that.tmpMobileLayout[x])
        }
      },
      goBack: function() {
        router.push({
          name: 'boardDefinition'
        });
      },
      resize: function(w, h, i) {
        let index = typeof i == 'undefined' ? this.currentEidtIndex : i,
          obj = this.domWidgets[index]
        // obj.w = w
        // obj.h = h
        obj.sizeX = w
        obj.sizeY = h
        let widget = $('#' + obj.id).parents('.widgetWraper')

        if (obj.field.type == 'form') { //表格列表中号的时候显示5行数据，最大化是显示10条数据，然后往下滚动
          if (w == 8) {
            obj.field.datalistLength = 5
          } else if (w == 12) {
            obj.field.datalistLength = 10
          }
        }

        //等待dom重新渲染完再获取宽高
        setTimeout(function() {
          let width = widget.width(),
            height = widget.height();
          obj.field.width = width
          obj.field.height = height
        }, 500)
      },
      afterGridsterItemReady: function(id) {
        let that =this
        //window.console && console.log('afterGridsterItemReady', id);
        let widget = getWidgetByUUID(this, id)
        //设置图片高度
        if (widget.type == 'img') {
          // window.console && console.log($('#' + id).length)
          widget.field.height = $('#' + id).outerHeight()
        }

        let chart = this.$refs['widgetItem' + id]
        if (chart && chart[0] && chart[0].$refs.chart) {
          let hchart = chart[0].$refs.chart
          setTimeout(function() {
            let dom = getWrapperByUUID(id)
            dom.find('.table-cell,.cell,.cell>div').width(dom.outerWidth()).height(dom.outerHeight())
            try {
              hchart.reflow()
            } catch (err) {}
          }, 1000)
        }
      },
      afterGridsterReady: function() {
        //window.console && console.log('afterGridsterReady');
        this.resetGrid();
        this.scalingPoint();

        for (let x in this.domWidgets) {
          //window.console && console.log(x, isChart(this.domWidgets[x]))
          if (isChart(this.domWidgets[x].field.type)) {
            let id = this.domWidgets[x].id
            this.afterGridsterItemReady(id)
          }
        }
      },
      gridsterPositionChanged: function(id) {
        let that =this
        //window.console && console.log('gridsterPositionChanged',id);
        that.setLayout()
      },
      gridsterItemInitialized: function(id) {
        //window.console && console.log('gridsterItemInitialized');
        this.afterGridsterItemReady(id);
        //看板初始化时，直线实例化
        this.resetGrid();
        this.scalingPoint();
      },
      gridsterItemResized: function(id) {
        //window.console && console.log('gridsterItemResized');
        this.afterGridsterItemReady(id)
        //this.scalingPoint();
      },
      gridsterResized: function() {
        //window.console && console.log('gridsterResized');
        this.afterGridsterReady()
        this.resetGrid();
      },
      gridsterLoaded: function() {
        //window.console && console.log('gridsterLoaded');
        this.afterGridsterReady()
      },
      gridsterMobileChanged: function() {
        //window.console && console.log('gridsterMobileChanged');
      },
      gridsterDaggableChanged: function() {
        //window.console && console.log('gridsterDaggableChanged');
        this.afterGridsterReady()
      },
      gridsterResizableChanged: function() {
        //window.console && console.log('gridsterResizableChanged');
        this.afterGridsterReady()
      },
      toJson: function() {
        let that = this;

        for(let i in this.domWidgets) {
          if(this.domWidgets[i].type == 'line') {
            //console.log(this.domWidgets[i]);
            if (this.domWidgets[i].field.points.length<2) {
              this.domWidgets.splice(i, 1);
              break;
            }
          }
        }

        let domWidgets2 = _.clone(that.domWidgets);

        let domWidgets = domWidgets2;

        let data = {

          domWidgets: domWidgets.filter(function(item) {
            item.field.hChartDatas = {};
            return item.remove != true
          }),
          // dynamicDatas: this.dynamicDatas,
          docSetting: this.docSetting || {},
          history: this.history || [],
          currendEditModel: this.currendEditModel || 0,
        }

        return JSON.stringify(data);

      },

      async fromJson(json) {

        var that = this;
        if (typeof json == 'string') {
          json = JSON.parse(json);
        }

        let newDom = [];
        for(let n in json.domWidgets) {
          //console.log(json.domWidgets[n]);
          let obj = JSON.parse(json.domWidgets[n]);
          newDom.push(obj);
        }

        json.domWidgets = newDom;

        for(let n in json.domWidgets) {

          if(json.domWidgets[n].field.dataSource) {

            let url = '';

            switch (json.domWidgets[n].field.type) {
              case 'controlChart2':
                url = 'pchart/';
                break;
              case 'controlChart':
                url = 'cchart/';
                break;
              case 'histogram':
                url = 'hist/';
                break;
              case 'boxplot':
                url = 'boxplot/';
                break;
              case 'plato':
                url = 'ploat/';
                break;
              case 'cpk':
                url = 'cpk/';
                break;
              case 'scatter':
                url = 'scatter/';
                break;
              case 'running':
                url = 'runchart/';
                break;
              case 'table':
                url = 'table/';
                break;
              case 'indicator':
                url = 'indicator/';
                break;
              case 'figure':
                url = 'targetmap/';
                break;
              case 'defined':
                url = 'defined/';
                break;

            }
            if(url != '') {
              let prjData = await this.$get(`${window.gatewayspc}/kb/`+url+json.domWidgets[n].id);

              if(prjData.code == 0) {

                //console.log('urlurl',url,'prjData.code ',prjData.code );

                if(url == 'cchart/' || url == 'pchart/') {

                      let min =eval("Math.min(" +prjData.data.points.toString()+")");　 // 1     采用字符串拼接

　　                  let max = eval("Math.max(" +prjData.data.points.toString()+")");;　 // 33

                      json.domWidgets[n].field.hChartDatas = prjData.data;
                      json.domWidgets[n].field.hChartDatas.CL = prjData.data.CL.toFixed(3)*1;
                      json.domWidgets[n].field.hChartDatas.LCL = prjData.data.LCL.toFixed(3)*1;
                      json.domWidgets[n].field.hChartDatas.UCL = prjData.data.UCL.toFixed(3)*1;

                      if(max > json.domWidgets[n].field.hChartDatas.UCL) {
                        json.domWidgets[n].field.maxValue = max;
                      } else {
                        json.domWidgets[n].field.maxValue = json.domWidgets[n].field.hChartDatas.UCL+(json.domWidgets[n].field.hChartDatas.UCL - json.domWidgets[n].field.hChartDatas.LCL)*0.05;
                      }

                      if(min < json.domWidgets[n].field.hChartDatas.LCL) {
                        json.domWidgets[n].field.minValue = min;
                      } else {
                        json.domWidgets[n].field.minValue = json.domWidgets[n].field.hChartDatas.LCL-(json.domWidgets[n].field.hChartDatas.UCL - json.domWidgets[n].field.hChartDatas.LCL)*0.05;
                      }

                      //console.log('json.domWidgets[n].field.hChartDatas',json.domWidgets[n].field.hChartDatas);
                } else {
                  json.domWidgets[n].field.hChartDatas = prjData.data;
                }
                
              } else {
                json.domWidgets[n].field.hChartDatas = {};
              }
            }

          }
        }

        if (that.propDomWidgets) {
          that.domWidgets = _.clone(that.propDomWidgets)
        } else if (json && json.domWidgets) {
          that.domWidgets = json.domWidgets || [];

          window.domWidgets = that.domWidgets;

          if (!that.editAble) {
            //在不同dashboard之间切换有时候会错位，下面代码进行修复
            let poses = []
            that.domWidgets.forEach(function(item) {
              poses.push({
                col: item.col,
                row: item.row
              })
            })
            setTimeout(function() {
              that.domWidgets.forEach(function(item, index) {
                item.col = poses[index].col
                item.row = poses[index].row
                //window.console && console.log('reset positions', poses[index])
              })
            }, 0)
          }
          // that.dynamicDatas = json.dynamicDatas || {};
          that.docSetting = json.docSetting || {};
          that.history = json.history;
          that.currendEditModel = json.currendEditModel;
          var domWidgets = that.domWidgets;
          var widgetsBtns = that.widgetsBtns;
          // console.log(domWidgets);
          //console.log(that.widgetsBtns);
          var widgetsBtnsMap = {};
          for (var i = widgetsBtns.length - 1; i >= 0; i--) {
            var key = widgetsBtns[i].type;
            widgetsBtnsMap[key] = widgetsBtns[i];
          }
          //console.log(widgetsBtnsMap);
          //该程序如果后续扩展了widgetsBtns的字段,通过下面扩展字段进行兼容
          for (var i = 0; i < domWidgets.length; i++) {
            domWidgets[i].field = $.extend({}, widgetsBtnsMap[domWidgets[i].field.type], domWidgets[i].field);
            domWidgets[i].active = false;
            domWidgets[i].loading = true;
            domWidgets[i].sizeX = domWidgets[i].sizeX ? domWidgets[i].sizeX : domWidgets[i].w || 0
            domWidgets[i].sizeY = domWidgets[i].sizeY ? domWidgets[i].sizeY : domWidgets[i].h || 0
            domWidgets[i].row = domWidgets[i].row ? domWidgets[i].row : domWidgets[i].y || 0
            domWidgets[i].col = domWidgets[i].col ? domWidgets[i].col : domWidgets[i].x || 0
          }
        } else {
          that.domWidgets = [];
          // that.dynamicDatas = {};
          that.docSetting = {};
          that.history = [];
        }
        //that.fromJsonCallback();
      },
      //从数据库读取数据后初始化
      // fromJsonCallback() {
      //   var that = this;
      //   //开始轮询实时数据
      //   //window.console && console.log('fromJsonCallback,开始轮询实时数据')
      //   //that.pollingDataByRealData();
      // }
    },
    destroyed() {
      this.reset();
      $(".watermark.tempMark").remove();
    }
  };

  function generateUUID() {
    var uuid = 'xxxxxxxx_xxxx_xxxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    window.console && console.log(uuid);
    return uuid;
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
  var isChart = function(type) {
    return ['dashboard', 'distribution', 'chart', 'trend'].findIndex((n) => n == type) > -1
  }
  var getWrapperByUUID = function(id) {
    return $('#' + id).parents('.widgetWraper');
  }
  var getWidgetByUUID = function(app, id) {
    return app.domWidgets.find((n) => n.id == id);
  }
  /**
   * Description: 数组存储
   */
  var storage = {
    maxLength: function() {
      return 10; //本地存储最大历史数
    },
    get: function(key, name) {
      return localStorage[key] ? JSON.parse(localStorage[key]) : [];
    },
    add: function(key, value) {
      var obj = this.get(key);
      obj.push(value);
      this.set(key, obj);
    },
    remove: function(key, id) {
      var obj = this.get(key);
      for (var i = obj.length - 1; i >= 0; i--) {
        if (obj[i].id == id) {
          obj.splice(i, 1);
          break;
        }
      }
      this.set(key, obj);
    },
    set: function(key, obj) {
      obj.splice(0, obj.length - storage.maxLength());
      for (var i = 0; i < obj.length; i++) {
        obj[i].id = i + 1;
      }
      localStorage[key] = JSON.stringify(obj);
    },
    clear: function(key) {
      localStorage.remove(key);
    }
  }



  function createWaterMark(name){

      if(!name){
          return ;
      }
      var width = document.body.clientWidth;
      var height = document.body.clientHeight;

      var len = width/80;
      len = len.toFixed(0);
      var hen = height/80;
      hen = hen.toFixed(0);
      var init_top = 30;
      var dif_heigth = 0;
      if(height<1000){
          dif_heigth = height/3;
      }else {
          dif_heigth = height/8;
      }
      for(var j=0;j<hen;j++){
          for(var i=0;i<4;i++){
              // var div = document.getElementById('editorDiv');
              // var p = document.getElementById('editorp');
              var div = document.createElement("div");
              var p = document.createElement("p");
              p.innerHTML = name+" "+getCurDate();
              div.setAttribute("class","watermark tempMark");
              div.style.marginLeft = (20+(i*width/4))+"px";
              div.style.top = (init_top+j*dif_heigth)+"px";

              div.appendChild(p);
              document.body.appendChild(div);
          }
      }
  }

  //获取当前日期
  function getCurDate() {
      var date = new Date();
      var seperator1 = "-";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
      return currentdate;
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

  @gray: #d5d8dc;
  @red: #fda89a;
  @blue: #0087F3;
  @white: #fff;
  @h2: #162134;
  @border: #d5d8dc;
  @movingColor: rgba(126, 123, 230, 0.14); //拖动的背景色在vue-gridster.css l47修改
  @editColor: #81BBE6;
  .toolBar {
    padding: 16px;
    margin-left: 170px;
    background: #F2F3F7;
    height: 54px;
    .iconfont {
      font-size: 18px;
      color: #abb4bc;
      cursor: pointer;
      margin: 0 4px;
      &:hover {
        color: @red;
      }
      &.active {
        color: @blue;
      }
    }
  }

  .column {
    background: @white;
    border-bottom: 1px solid @border;
    border-right: 1px solid @border;
    width: 170px;
    box-sizing: border-box;
    padding: 10px;
    float: left;
    color: @h2;
    line-height: 46px;
    font-size: 14px;
    padding-bottom: 60px;
    position: absolute;
    top: 0;
    bottom: 0;
    .column-header {
      font-size: 16px;
      text-align: center;
      font-weight: bold;
      .icon-quanxuan1 {
        color: #c6cace;
      }
    }
    .components {
      height: 100%;
      &>ul {
        overflow-x: hidden;
        overflow-y: auto;
      }
    }
    &.wid-btn-list{
      overflow-y: auto;
      position: fixed;
      top: 60px;
      overflow-x: hidden;
    }
    &.edit-pannel {
      right: 0;
      overflow-x: hidden;
      overflow-y: auto;
      width: 250px;
      position: fixed;
      margin-top: 60px;
    }
    &.fixed {
      position: fixed;
      top: 0;
      bottom: 0;
      border-left: 1px solid @border;
      border-right: none;
    }
  }
  .editor {
    float: left;
    width: 100%;
    // padding: 10px;
    min-height: calc(~"100vh - 170px");
    background: #F2F3F7;
    .half {
      width: 50%;
      display: inline-block;
      float: left;
    }
    &.editorbg {
      border-left: 170px solid transparent;
      border-right: 250px solid transparent;
    }
    .vue-grid-layout.moving,
    .gridster {
      .vue-grid-item,
      .gridster-item {
        background: @movingColor;
      }
      .vue-grid-item,
      .gridster-item {
        background: #fff;
        border-radius: 4px;
        // border: 1px solid #fff;
        // box-shadow: 0px 5px 8px 0px rgba(171, 180, 188, 0.35);
        // border: 1px solid #fff;
        &>div {
          height: 100%;
        }
      }
      .vue-grid-item:not(.vue-grid-placeholder),
      .gridster-item.active {
        background: #fff;
        border: 1px solid #fff;
      }
      .vue-grid-item.active,
      .gridster-item.active {
        border-color: @editColor;
        // box-shadow: 0px 5px 8px 0px rgba(249, 100, 34, 0.35)
      }
    }
    &.readonly {
      .gridster-item {
        box-shadow: none
      }
    }
  }

  .widgetWraper {
    overflow: hidden;
    &.remove {
      width: 0 !important;
      height: 0 !important;
      border: none !important;
      overflow: hidden !important;
    }
  }

  .ctxMenuHide {
    display: none!important
  }

  .grid-col {
    opacity: 0.5;
    border-right: 1px dotted #979797;
    width: 1px;
    height: 100%;
    position: absolute;
    top: 74px;
    &.border {
      border-style: solid;
    }
  }

  .grid-row {
    opacity: 0.5;
    border-bottom: 1px dotted #979797;
    width: 100%;
    height: 1px;
    position: absolute;
    left: 190px;
    &.border {
      border-style: solid;
    }
  }

  .grid-grid {
    background: #EDEDED;
    height: 100%;
    position: absolute;
    z-index: 0;
  }

  .tool-bar {
    a,
    .link,
    .mult-btn {
      display: inline-block;
      background: #FFFFFF;
      border: 1px solid #D8D8D8;
      border-radius: 4px;
      padding: 0 8px;
      margin-left: 10px;
      height: 30px;
      line-height: 27px;
      font-size: 14px;
      cursor: pointer;
    }
    .mult-btn {
      background: transparent;
      padding: 0;
      margin: 0;
      .bg {
        background: #fff;
        display: inline-block;
        width: 36px;
        text-align: center;
        height: 28px;
      }
      .bg:nth-child(1) {
        border-radius: 4px 0 0 4px;
        border-right: 1px solid #D8D8D8;
      }
      .bg:nth-child(2) {
        border-radius: 0 4px 4px 0;
      }
      .bg.active {
        background: transparent;
      }
    }
  }

  .row.toolBar >span {
    float: left !important;
    font-size: 16px;
  }
  .main .tool-bar {
    text-align: right;
    height: 14px;
    padding: 0px;

    .bar-title {
      float: left;
      margin-left: 12px;
      margin-top: 6px;
      color: #606266;
      cursor: default;
      font-weight: bold;
    }
  }

  .open>.ctx-menu {
  li {
    padding: 4px 10px;
    cursor: pointer;
  }
  .divider {
    background-color: #ddd;
    height: 1px;
    overflow: hidden;
    margin: 8px 0;
    padding: 0;
  }
}

  .icon-square_delete-copy:hover {
    color: #ff0000 !important;
  }
</style>
<style lang="less">
  .el-message-box__wrapper {
    z-index: 99999 !important
  }

  .el-dialog.transparent {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .el-collapse-item__header.is-active {
    background-color: #f2f3f7;
  }
  .el-collapse-item__header {
    padding: 0 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: bottom;
    white-space: nowrap;
    word-wrap: break-word;
  }

  .watermark{
    opacity: 0.4;
    position: fixed;
    height: 45px;
    z-index: 2;
    width: 160px;
    transform: rotate(315deg);
    -ms-transform: rotate(315deg);
    -moz-transform: rotate(315deg);
    -webkit-transform: rotate(315deg);
    -o-transform: rotate(315deg);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
     user-select: none;
     pointer-events: none;
}

.watermark p{
    color: #dcdcdc;
}


</style>


