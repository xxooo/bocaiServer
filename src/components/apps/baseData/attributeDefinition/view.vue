<template>
  <div>
    <div class="main-panel-wapper" id="rulePage">
      <template>
        <div class="tool-bar">
          <span class="bar-title" >{{$root.langs.baseData['smartspc.baseData.attributeDefinition']}}</span>
          <icon-font @click='exportFn' :iconClass='"icon-20"' :title="$root.langs.common['smartspc.common.exportTpl']"></icon-font>
          <el-upload ref="upload2" :headers="headers" :show-file-list="false" style="float:right"
                     :on-success='importFn'  :action="importUrl" multiple>
            <icon-font :iconClass='"icon-21"' :title="$root.langs.common['smartspc.common.import']"></icon-font>
          </el-upload>
          <icon-font @click='add' :iconClass='"icon-add"' :title="$root.langs.common['smartspc.common.add']"></icon-font>
        </div>
        <Card :title="$root.langs.baseData['smartspc.baseData.attributeDefinition']">
          <div slot="content">
            <div class="item margin basic-information">
              <div class="wraper">
                <div class="table-wrap">
                  <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col>
                      <el-table class="paramsTable" :data="data" style="width: 100%" :empty-text="$root.langs.common['smartspc.common.nodata']">
                        <el-table-column prop="project_name" sortable :label="$root.langs.analysis['smartspc.analysis.object']" min-width="100">
                          <template slot-scope="scope">
                            {{scope.row.project_name}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="project_code" sortable :label="$root.langs.baseData['smartspc.baseData.code']" min-width="100">
                          <template slot-scope="scope">
                            {{scope.row.project_code}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="level1" sortable :label="$root.langs.baseData['smartspc.baseData.level']+'1'" min-width="120">
                          <template slot-scope="scope">
                            {{scope.row.level1}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="level2" sortable :label="$root.langs.baseData['smartspc.baseData.level']+'2'" min-width="120">
                          <template slot-scope="scope">
                            {{scope.row.level2}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="level3" sortable :label="$root.langs.baseData['smartspc.baseData.level']+'3'" min-width="120">
                          <template slot-scope="scope">
                            {{scope.row.level3}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="level4" sortable :label="$root.langs.baseData['smartspc.baseData.level']+'4'" min-width="120">
                          <template slot-scope="scope">
                            {{scope.row.level4}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="level5" sortable :label="$root.langs.baseData['smartspc.baseData.level']+'5'" min-width="120">
                          <template slot-scope="scope">
                            {{scope.row.level5}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="level6" sortable :label="$root.langs.baseData['smartspc.baseData.level']+'6'" min-width="120">
                          <template slot-scope="scope">
                            {{scope.row.level6}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="level7" sortable :label="$root.langs.baseData['smartspc.baseData.level']+'7'" min-width="120">
                          <template slot-scope="scope">
                            {{scope.row.level7}}
                          </template>
                        </el-table-column>
                        <el-table-column :label="$root.langs.common['smartspc.common.op']" min-width='180' fixed="right">
                          <template slot-scope="scope">
                            <a @click="edit(scope.row)" :title="$root.langs.common['smartspc.common.modify']" class="options"><i class="iconfont icon-bianji2 bianji"></i>{{$root.langs.common['smartspc.common.modify']}}</a>
                            <a @click="handleDelete(scope.row.project_ID)" :title="$root.langs.common['smartspc.common.delete']" class="options"><i class="iconfont icon-dele shanchu"></i>{{$root.langs.common['smartspc.common.delete']}}</a>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-col>
                  </el-row>
                  <div class="pagination" v-if="pageCount>1">
                    <el-pagination layout="prev, pager, next" :total="totalPage" @current-change="handleCurrentChange" :current-page="currentPage" :background='true'>
                    </el-pagination>
                  </div>
                </div>
              </div>
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
        prjList: [],
        currentPage: 1,
        pageSize: 10,
        headers:this.$postHeaders(),
        importUrl:window.gatewayspc+'/infra/excel_preview',
      }
    },
    components: {
      Card: resolve => require(['../components/card.vue'], resolve),
      IconFont: resolve => require(['common/iconfont.vue'], resolve)
    },
    computed: {
      totalPage: function() {
        return this.prjList.length;
      },
      pageCount: function() {
        return Math.ceil(this.totalPage / this.pageSize)
      },
      data: function() {
        let that = this;
        let data = this.prjList;
        data = _.slice(data, (that.currentPage - 1) * that.pageSize, that.currentPage * that.pageSize);
        return data;
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      //删除
      async handleDelete(id) {
        let that = this;

        this.$c_confirm(async () => {

          NProgress.start();

          await that.$post(`${window.gatewayspc}/infra/prjd/`+id).then((res) => {
            that.$handelResponse(res, (result) => {
              NProgress.done();
              if(result.code == 0) {
                that.$success(result.msg);
                 that.fetchData();
              } else {
                  //that.$error(result.msg);
                }

            })
          });
        });

      },
      //初始化，调取方法
      async fetchData() {

        let prjData = await this.$get(`${window.gatewayspc}/infra/prj_mod`);

        if(prjData.code == '0') {this.prjList = prjData.data;};
      },
      add: function() {
        let that = this;
        router.push({
            name: 'addAttribute'
        })
      },
      importFn:function(res){
        router.push({name:'reviewAttribute',params:{
          data:res.data,
          title: this.$root.langs.baseData['smartspc.baseData.attributeDefinition'],
          name:'attributeDefinition'
          }});
      },
      exportFn: function(){
          //创建隐藏from
          var eleForm = document.createElement('form');
          eleForm.method = 'get';
          eleForm.action=`${window.gatewayspc}/infra/download_template`;
          eleForm.style.display = 'none';
          // 触发点击
          document.body.appendChild(eleForm);
          eleForm.submit();
          // 然后移除
          document.body.removeChild(eleForm);
      },
      edit: function(item) {
        store.commit('updateproInfo',item);

        let that = this;
        router.push({
          name: 'editAttribute',
          params: {
            id: item.project_ID
          }
        })
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      }
    },
    watch: {
      'pageCount': function() {
        //搜索的时候重置到第一页
        this.currentPage = 1
      }
    }
  }
</script>
<style lang="less" scoped>
  i {
    cursor: pointer;
  }

  h1 {
    padding: 1em
  }

  .basic-information {
    label {
      color: #162134;
    }
    span {
      color: #6a6e70;
    }
  }

  .wraper {
    padding: 20px;
  }

  .basic-information {
    .el-row~.el-row {
      margin-top: 8px;
    }
  }

  .pagination {
    margin: 30px 0px;
    text-align: center;
  }

  .table-wrap {
    min-height: 528px;
    margin-top: 10px;
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


</style>

<style lang="less">
  #rulePage .el-button--default {
    height: 28px;
    line-height: 0;
  }

  .paramsTable {
    th,
    td {
      cursor: default;
    }
  }
</style>
