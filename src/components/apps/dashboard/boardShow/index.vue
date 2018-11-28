<template>
  <div>
      <div class="tool-bar">
          <span class="bar-title" >{{$root.langs.dashboard["smartspc.dashboard.boardShow"]}}</span>
      </div>
      <div class="list itemInfoClass" v-if="tmpltData.length>0">
          <span class="itemBox" v-for="(item, i) in tmpltData" @click="goBoardInfo(item)">
              <div class="itemTitle">
                  <h6 :title="item.title">{{item.title}}</h6>
              </div>
              <div class="itemContent">
                  <img :src="icons[item.icon-1]">
                  <pre :title="item.desc">{{item.desc}}</pre>
              </div>
          </span>
      </div>
      <div v-else>
          <span class="noDate">{{$root.langs.common["smartspc.common.nodata"]}}</span>
      </div>
  </div>
</template>
<script>
import "../css/style.less"
import {
    mapGetters
} from 'vuex';

export default {
  data: function() {
      return {
          tmpltData:[],
          icons:[
            require('@/assets/img/report/1.png'),
            require('@/assets/img/report/2.png'),
            require('@/assets/img/report/3.png')
          ]
      }
  },
  components: {
      IconFont: resolve => require(['common/iconfont.vue'], resolve)
  },
  computed: {
      ...mapGetters({

      }),
  },
  async created() {
      let d= await this.$get(`${window.gatewayspc}/kb/tmplt`);
      if(+d.code === 0)this.tmpltData = d.data;
      //_g.closeGlobalLoading()
  },
  updated: function() {
      //_g.closeGlobalLoading()
  },
  mounted() {
  },
  watch: {
  },
  methods: {
      async goBoardInfo(item) {

        store.commit('updateeditAble',false);
        store.commit('updategridcolumns',item.gridcolumns);
        store.commit('updatewatermark',item.watermark);
            router.push({
              name: 'toBoardShow',
              params: {
                id: item.templateID
              }
            })
      }
  }
};
</script>
<style scoped lang='less'>
    ul, li {
        margin: 0;
        padding: 0;
    }
    .list{
        display: flex;
        padding: 0 20px;
        flex-wrap: wrap;
        .itemBox{
            width: calc(~"25% - 15px");
            background: #fff;
            border-radius: 3px;
            margin: 0 20px 20px 0;
            border:1px solid transparent;
            transition:all .3s;
            .itemTitle{
                border-bottom: 1px solid #eaeaea;
                padding: 0 20px;
                line-height: 40px;
                span{
                    float: right;
                    i{
                        color:#c7cdd4;
                        font-size: 18px;
                        vertical-align: top;
                    }
                }
                h6{
                    color: #65676b;
                    font-weight: normal;
                    font-size: 16px;
                }
            }
            .itemContent{
                padding: 30px 20px;
                display: flex;
                width: 100%;
                img{
                    width: 60px;
                    height: 60px;
                    border-radius: 10px;
                    margin-right: 30px;
                }
                pre{
                     flex: 1;
                     overflow: hidden;
                     text-overflow: ellipsis;
                     font-family: '微软雅黑'
                 }
            }
        }
        .itemBox:nth-child(4n + 4){
            margin-right: 0;
        }
        .itemBox:hover{
            border:1px solid #0486fe;
            cursor: pointer;
        }
    }
    .noDate{
        display: block;
        margin: 10px 20px;
        text-align: center;
        line-height: 200px;
        background: #fff;
        border-radius: 5px;
    }
    .but{
        text-align: right;
        span{
            display: inline-block;
            width: 80px;
            line-height: 28px;
            text-align: center;
            border-radius: 3px;
            background: #409eff;
            color:#fff;
            font-size: 14px;
            cursor: pointer;
        }
    }
</style>
<style lang="less">
.loadingMask {
  text-align: center;
  height: 400px;
}

.lazy-load {
  position: inherit !important;
}

</style>
