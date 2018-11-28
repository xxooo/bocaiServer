<template>
  <div>
      <div class="tool-bar">
          <span class="bar-title" >{{$root.langs.dashboard["smartspc.dashboard.boardDefinition"]}}</span>
          <icon-font @click='add' :iconClass='"icon-add"' :title="$root.langs.common['smartspc.common.add']"></icon-font>
      </div>
      <div class="list itemInfoClass" v-if="tmpltData.length>0">
          <span class="itemBox" v-for="(item, i) in tmpltData">
              <div class="itemTitle">
                  <span>
                      <i class="iconfont icon-shebeiguanli1" @click.stop="setBoard(item)"></i>
                      <i class="iconfont icon-bianji3" @click.stop="edit(item)"></i>
                      <i class="iconfont icon-dele" @click.stop="deleteKB(item,i)"></i>
                      <!-- <i class="iconfont icon-share" @click.stop="shareOpen(item)"></i> -->
                  </span>
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
      <el-dialog width="400px" :title="$root.langs.dashboard['smartspc.dashboard.shareTo']" :visible.sync="dialogTableVisible"  class="shareBox">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">{{$root.langs.common["smartspc.common.all"]}}</el-checkbox>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
          <div class="but">
              <span @click="share">{{$root.langs.common["smartspc.common.save"]}}</span>
          </div>
      </el-dialog>
  </div>
</template>
<script>
import "../css/style.less"
import {
    mapGetters
} from 'vuex'

export default {
  data: function() {
      return {
          tmpltData:[],
          checkAll: false,
          checkedCities: [],
          cities: ['张三', '李四', '王二'],
          isIndeterminate: true,
          dialogTableVisible:false,
          shareData:[],
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

      })
  },
  async created() {
      let d= await this.$get(`${window.gatewayspc}/kb/tmplt_design`);
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
      setBoard(item) {

        router.push({
              name: 'boardSetting',
              params: {
                id: item.templateID
              }
            })

      },
      add(){
          router.push({
              name: 'createBoard'
          });
      },
      async edit(item) {

        store.commit('updateeditAble',true);
        store.commit('updategridcolumns',item.gridcolumns);
        store.commit('updatewatermark',item.watermark);
            router.push({
              name: 'boardEdit',
              params: {
                id: item.templateID
              }
            })

      },
      deleteKB(item,i){
          let that = this;
          that.$c_confirm(async ()=>{
              let res = await that.$post(`${window.gatewayspc}/kb/tmpltd/${item.templateID}`);
              if(+res.code === 0) {
                that.$success();
                that.tmpltData.splice(i,1);
              }
          })
      },
      shareOpen(item){
          this.dialogTableVisible = true;
          this.shareData = item;
      },
      share(){
          let that = this;
          let {templateID} = this.shareData;
          let res = that.$post(`${window.gatewayspc}/kb/tmplt/${templateID}`,{
              data:that.checkedCities
          });
          if(+res.code === 0)that.$success();
      },
      handleCheckAllChange(val) {
          this.checkedCities = val ? this.cities : [];
          this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
          let checkedCount = value.length;
          this.checkAll = checkedCount === this.cities.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
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
                    i:hover{
                        color:#3399ff;
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
                    width: 16.822%;;
                    height: 16.822%;;
                    border-radius: 10px;
                    margin-right: 8.5%;;
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

.itemInfoClass h6,.itemInfoClass p {
          display: inline-block;
          max-width: 70%;
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: bottom;
          white-space: nowrap;
          word-wrap: break-word;
    }
</style>
