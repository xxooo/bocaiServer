<script>
import "../css/style.less"
import edit from './edit'
import {
  mapGetters
} from 'vuex'
export default {
  props: {
    editAble: {
      type: Boolean,
      default: false,
    },
  },
  data: function() {
    return {}
  },
  extends:edit,
  components: {
  },
  computed: {
    ...mapGetters({
    }),
  },
  created() {
    console.log('fullpagefullpagefullpagefullpagefullpagefullpagefullpagefullpagefullpage');
  },
  filters: {
  },
  watch: {
  },
};
</script>
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
@white: #fff;
@h2: #162134;
@border: #d5d8dc;
@movingColor: rgba(126, 123, 230, 0.14);
@editColor: #fb735c;
.toolBar {
  background: #fff;
  padding: 16px;
  border-bottom: 1px solid @gray;
  .iconfont {
    font-size: 18px;
    color: #abb4bc;
    cursor: pointer;
    margin: 0 4px;
    &:hover {
      color: @red;
    }
  }
}

.column {
  background: @white;
  border-bottom: 1px solid @border;
  border-right: 1px solid @border;
  width: 220px;
  padding: 10px;
  float: left;
  color: @h2;
  line-height: 46px;
  font-size: 14px;
  padding-bottom: 40px;
  .column-header {
    font-size: 16px;
    font-weight: bold;
    .icon-quanxuan1 {
      color: #c6cace
    }
  }
  position: absolute;
  top: 54px;
  bottom: 0;
  .components {
    height: 100%;
    &>ul {
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
  &.edit-pannel {
    right: 0;
    overflow-x: hidden;
    overflow-y: auto;
    width: 250px;
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
  min-height: calc(~"100vh - 220px");
  &.editorbg {
    border-left: 220px solid transparent;
    border-right: 250px solid transparent;
  }
  .vue-grid-layout.moving,
  .gridster {
    .vue-grid-item,
    .gridster-item {
      background: @movingColor
    }
    .vue-grid-item,
    .gridster-item {
      // border: 1px solid #fff;
      background: #fff;
      border-radius: 4px;
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
      box-shadow: 0px 5px 8px 0px rgba(249, 100, 34, 0.35)
    }
  }
  &.readonly {
    .gridster-item {
      box-shadow: none
    }
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
</style>
<style lang="less">
.el-message-box__wrapper {
  z-index: 99999 !important
}
</style>
