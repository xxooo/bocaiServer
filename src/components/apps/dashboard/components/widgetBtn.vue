<template>
  <li :rel="data.type">
    <header>{{ data.label }}</header>
    <!-- <header>{{ enLange ? data.labelE : data.labelZ }}</header> -->
    <div class="btnIcon"><i class="iconfont" :class="data.icon" :style="{color:data.iconcolor}"></i></div>
  </li>
</template>
<script>
var dragui;
export default {
  props: ['data'],
  data: function() {
    return {
      locale: store.state.locale,
    }
  },
  computed: {
      enLange() {
        return Lockr.get('locale') == 'en-US';
      },
  },
  mounted: function() {
    var that = this;
    var obj = $(that.$el);
    obj.draggable({
      helper: 'clone',
      appendTo: ".editor",
      containment: '.editor',
      drag: function(event, ui) {
        that.$parent.showGrid=true;
        dragui = event.target;
      },
      stop: function(event, ui) {
        that.$parent.showGrid=false;
        let x, y, id;
        /*x = dragui.offset.left - ui.helper.parent().offset().left - ui.helper.parent().outerWidth();
        y = dragui.offset.top - ui.helper.parents('.column').offset().top;*/
        x = ui.offset.left - $(dragui).parent().offset().left - $(dragui).parent().outerWidth();
        y = ui.offset.top - 60;
        console.log(ui.offset.top,$(dragui).parents('.column').offset().top);
        id = generateUUID();
        let item = {
          x: x,
          y: y,
          w: that.data.w || 1,
          h: that.data.h || 1,
          type: $(this).attr('rel'),
          field: deepCopy(that.data),
          i: id,
          id: id,
          top:ui.offset.top
        };
        that.$emit('addGridItem', item);
      }
    });
  },
  methods: {}
};

function generateUUID() {
  var uuid = 'UUID_xxxxxxxx_xxxx_xxxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  // window.console && console.log(uuid);
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
  width: 128px;
  box-sizing: border-box;
  background: #fff;
  cursor: move;
  border: 1px solid #DDDDDD;
  border-radius: 4px;
  margin: 20px 10px;
  font-size: 14px;
  color: #515866;
  padding: 0 10px;
  line-height: 30px;
  header {
    padding: 0;
  }
  p {
    text-align: center;
    color: #606266;
  }
  div {
    margin: 10px auto 0;
    text-align: center;
    .iconfont {
      font-size: 40px;
    }
  }
  &.ui-draggable-dragging {
    z-index: 999;
    transform: rotate(-7deg);
    -ms-transform: rotate(-7deg);
    /* IE 9 */
    -moz-transform: rotate(-7deg);
    /* Firefox */
    -webkit-transform: rotate(-7deg);
    /* Safari 和 Chrome */
    -o-transform: rotate(-7deg);
    /* Opera */
  }
}

.btnIcon {
  margin-bottom: 20px;
}
</style>
