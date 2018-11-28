<template>
  <div style="height:100%;display: table;width: 100%;" @contextmenu.prevent="ctxMenu.open" v-if="data">
    <template v-if="hasRight">

      <div v-if="data.field.type=='label'"  class="form-group">
        <section v-show="data.field.title" class="item-title" :title="data.field.title">{{ data.field.title }}</section>
        <div :id="data.id" class="field table-cell" :style="{'border':'1px solid '+data.field.borderColor}">
          <div v-if="data.field.value" style=" width: 100%; word-break: break-all;word-wrap: break-word; position: absolute; top: 40%;" :style="{'font-weight':data.field.fontWeight,'color':data.field.color,'background-color':data.field.backgroundColor,'text-indent':data.field.textIndent+'px','font-size':data.field.fontsize}"  class="cell">{{ data.field.value }}</div>
          <div v-else class="widget-placeholder cell"><i class="iconfont icon-reportform1"></i></div>
        </div>
      </div>

      <div v-else-if="['controlChart','controlChart2','histogram','boxplot','plato','cpk','scatter','running','figure'].findIndex((n) => n==data.field.type)>-1" class="form-group">
        <input type="hidden" v-model="data.field.title">
        <input type="hidden" v-model.number="data.field.width">
        <input type="hidden" v-model.number="data.field.height">
        <input type="hidden" v-model.number="data.field.showLastPointToolip">
        <div :id="data.id" class="hchartContainer" style="height:100%;">
          <section v-show="data.field.title" class="item-title">{{ data.field.title }}</section>
          <div class="item-content-histogram table-cell" :class="{'no-title':!data.field.title.length}">
            <div class="cell">
              <hchart ref="chart" :data="data"></hchart>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="data.field.type=='img'" class="form-group" style="height:100%">
        <input type="hidden" v-model.number="data.field.width">
        <input type="hidden" v-model.number="data.field.height">
        <div :id="data.id" class="field table-cell" style="height:100%">
          <section v-show="data.field.title" class="item-header-img item-title" :title="data.field.title">{{ data.field.title }}</section>
          <div class="item-content-img table-cell" :class="{'no-title':!data.field.title.length}">
            <div v-if="data.field.src" class="cell" :style="{'background-image':'url('+data.field.src+')'}" style="background-size:contain; background-repeat: no-repeat;background-position:center center"></div>
            <div v-else class="widget-placeholder cell"><i class="iconfont icon-reportform1"></i></div>
          </div>
        </div>
      </div>
      <div v-else-if="data.field.type=='defined'"  class="form-group" style="height:100%">
        <input type="hidden" v-model.number="data.field.width">
        <input type="hidden" v-model.number="data.field.height">
        <div :id="data.id" class="field table-cell" style="height:100%">
          <section v-show="data.field.title" class="item-header-img item-title" :title="data.field.title">{{ data.field.title }}</section>
          <div class="item-content-img table-cell" :class="{'no-title':!data.field.title.length}" ref="defined">
            <iframe :src="data.field.url" width="100%" height="100%" scrolling ="no"></iframe>
            <div v-if="editAble" style="position: absolute;width:100%;height:100%;top:0"></div>
          </div>
        </div>
      </div>
      <div v-else-if="data.field.type=='table'" class="form-group">
        <input type="hidden" v-model="data.field.title">
        <input type="hidden" v-model="data.field.subtitle">
        <input type="hidden" v-model.number="data.field.width">
        <input type="hidden" v-model.number="data.field.height">
        <div :id="data.id" class="form">
          <section v-show="data.field.title" class="item-title" :title="data.field.title">{{ data.field.title }}</section>
          <div class="item-content-form table-cell" :class="{'no-title':!data.field.title.length}">
            <div class=" formcontainer scrollbar" style="padding:0 20px;width:100%;">
              <table class="table" cellspacing="0" cellpadding="0" width="100%">
                <thead>
                <tr>
                  <th v-for="item in data.field.hChartDatas.header" @click.stop="sortTable(item)">
                    {{item}}
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in data.field.hChartDatas.realdata" >
                  <td v-for="subItem in item">
                    {{subItem}}
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="data.field.type=='indicator'" class="form-group">
        <input type="hidden" v-model.number="data.field.backgroundColor">
        <input type="hidden" v-model.number="data.field.borderColor">
        <input type="hidden" v-model.number="data.field.width">
        <input type="hidden" v-model.number="data.field.title">
        <div :id="data.id" class="block">
          <div>
            <section v-show="data.field.title" class="item-title" :title="data.field.title">{{ data.field.title }}</section>
            <div class="item-content-block table-cell">
              <svg class="quan" :class="data.field.exceptionNum == '' ? '' : 'hasExcepNum'">
                <circle class="quan-big breath-item" cx="50%" cy="50%" r="20%" :fill="data.field.backgroundColor"></circle>
                <circle cx="50%" cy="50%" r="8%" :fill="data.field.backgroundColor"></circle>
              </svg>
              <div class="exceDiv" v-if="data.field.exceptionNum != ''">
                <div class="exceContent">
                  <h4>异常告警次数</h4>
                  <p>{{data.field.exceptionNum}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="data.field.type=='line'" class="form-group">
        <div :id="data.id" class="block">
          <div>
            <section v-show="data.field.title" class="item-title">{{ data.field.title }}</section>
            <div class="item-content-block table-cell">
              <line x1="0" y1="0" x2="50" y2="50"
                    style="stroke:rgb(255,0,0);stroke-width:2"/>
            </div>
          </div>
        </div>
      </div>

    </template>
    <div v-else class="cell">
      spc Unauthorized
    </div>
  </div>
</template>
<script>
  import "../css/style.less"
  //import mock from '../mock'
  import {
    mapGetters
  } from 'vuex';
  var app;
  export default {
    props: ['data', 'editAble', 'ctxMenu'],
    components: {
      hchart: resolve => require(['./hchart'], resolve) //懒加载
    },
    created: function() {
      app = this.$parent;
    },
    computed: {
      hasRight: function() {
        let that = this;
        let result = true;

        return result;
      }
    },
    mounted: function() {
      var that = this;
      var id = this.data.id;
      var field = this.data.field;
      var type = field.type;
      var obj = $(that.$el);
      var widgetWraper = obj.parents('.widgetWraper');
      // window.console && console.log('widget-item mounted');
      //单击组件编辑
      obj.click(function() {
        let index = $(that.$el).parents('.widgetWraper').attr('id').replace('widgetWraper', '');
        that.$emit('edit', index)
      }).mousedown(function(e) {
        var index = $(that.$el).parents('.widgetWraper').attr('id').replace('widgetWraper', '');
        if (e.button == 2) {
          that.$emit('edit', index)
        }
      })
    },
    updated: function() {
      var that = this;
      var id = this.data.id;
      var field = this.data.field;
      var type = field.type;
      var obj = $(that.$el);
      var widgetWraper = obj.parents('.widgetWraper');
      // window.console && console.log('widget-item updated', type);
      if (field.lockWH) {
        field.height = field.width;
      }
      // this.$emit('toLocalStorage')
    },
    methods: {
      select: function(list, index, obj) {
        app.select(list, index, obj);
      },
      check: function(list, index, selected) {
        app.check(list, index, selected);
      },
      sortTable(item) {
        console.log(item);
      }
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .item-content-block.table-cell .quan {
    float: left;
    width: 100%;
    height: 100%;
  }
  .item-content-block.table-cell .quan.hasExcepNum {
    width: 50% !important;
  }

  .item-content-block.table-cell .exceDiv {
    float: right;
    height: 100%;
    width: 50%;
    position: relative;
  }

  .item-content-block.table-cell .exceDiv .exceContent {
    position: absolute;
    width: 100%;
    height: 50%;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
  }

  .item-content-block.table-cell .exceDiv .exceContent h4 {
    text-align: center;
  }

  .item-content-block.table-cell .exceDiv .exceContent p {
    text-align: center;
    margin-top: 20%;
  }

  ul,
  li {
    margin: 0;
    padding: 0;
  }

  p {
    margin-bottom: 0
  }

  .iconfont {
    min-width: 20px;
    display: inline-block;
    text-align: center;
  }

  .block {
    // border-radius: 50%
  }

  .form-group {
    height: 100%;
    padding-bottom: 0;
  }

  .formcontainer {
    overflow-y: auto;
    overflow-x: auto;
    height: 100%;
  }

  .item-title {
    color: #292f2e;
    background: #fff;
    font-size: 14px;
    padding: 10px;
    text-align: center;
    position: absolute;
    width: 100%;
    z-index: 2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-shadow: inset 0 -1px 0 0 rgba(213, 213, 213, 0.50);
  }

  .item-content-attributes,
  .item-content-histogram,
  .item-content-map,
  .item-content-table,
  .item-content-form,
  .item-content-block,
  .item-content-img {
    box-sizing: border-box;
    border-top: 36px solid transparent;
    position: absolute;
    top: 0;
    &.no-title {
      border-top-width: 0 !important;
    }
  }

  .item-content-img {
    border-top-width: 46px;
  }

  .table {
    // background-color: #fff;
    // border: 1px solid #dfe6ec;
    th{
      color:#9ea0a5;
    }  td{
         color:#494949;
       }
    th,td {
      // background-color: #F3F3F7;
      border-bottom: 1px solid #dfe6ec;
      text-align: left;
      line-height: 52px;
      height: 52px;
      padding:0 1em;
      font-weight: normal;
    }
    tbody {
      tr:nth-child(even) {
        td {
          background: #F3F3F7
        }
      }
    }
  }

  .table-cell {
    display: table;
    width: 100%;
    height: 100%;
  }

  .cell {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }

  //占位图
  .widget-placeholder {
    color: #c8c8c8;
    .iconfont {
      font-size: 30px;
    }
  }

  .breath-item {
    opacity: 0.5;
  }

  @keyframes warn {
    0% {
      r: 8%;
      opacity: 0.0;
    }
    25% {
      r: 15%;
      opacity: 0.5;
    }
    100% {
      r: 20%;
      opacity: 0.0;
    }
  }

</style>
