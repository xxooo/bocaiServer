<template>
  <div id="pocIndex">
    <div class="main-panel-wapper"  id="rulePage">
      <template>
        <div class="tool-bar">
          <span class="bar-title" >{{'POC'}}</span>
        </div>

        <Card title="POC">
          <div slot="content">
            <div class="item margin basic-information">
              <div class="wraper">
                <div class="table-wrap">

                  <el-tabs v-model="activeName" @tab-click="handleClick">

                    <el-tab-pane key="test" label="试用" name="test">

                      <el-row>
                        <el-col :span="2" class="labelStep">
                          <label class="grid-content bg-purple">第一步:</label>
                        </el-col>
                        <el-col :span="12"><label class="grid-content bg-purple-light">数据库备份</label></el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="6" class="labelCotent">
                          <el-input  size="mini" maxlength="20" v-model="backupName" placeholder="请输入备份名称"></el-input>
                        </el-col>
                        <el-col :span="8"><el-button size="mini" @click="oneKeyBackup">备{{' '}}份</el-button></el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="2" class="labelStep">
                          <label class="grid-content bg-purple">第二步:</label>
                        </el-col>
                        <el-col :span="12"><label class="grid-content bg-purple-light">系统初始化</label></el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="6" class="labelCotent">
                          <label class="danhua">系统初始化</label>
                        </el-col>
                        <el-col :span="8"><el-button size="mini" @click="oneKeyReset">初始化</el-button></el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="2" class="labelStep">
                          <label class="grid-content bg-purple">第三步:</label>
                        </el-col>
                        <el-col :span="12"><label class="grid-content bg-purple-light">导入基础数据</label></el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="6" class="labelCotent">
                          <el-button size="mini" @click="exportFn">模版下载</el-button></el-col>
                        </el-col>
                        <el-upload ref="upload1" :headers="headers" :show-file-list="false" :on-success='importFn1'  :action="importUrl1" multiple style="  display: inline-block;">
                          <el-col :span="8"><el-button size="mini">导 入</el-button></el-col>
                        </el-upload>
                      </el-row>

                      <el-row>
                        <el-col :span="2" class="labelStep">
                          <label class="grid-content bg-purple">第四步:</label>
                        </el-col>
                        <el-col :span="12"><label class="grid-content bg-purple-light">导入数据</label></el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="6" class="labelCotent">
                          <el-button size="mini" @click="getDataTemplate">模版下载</el-button></el-col>
                        </el-col>
                        <el-upload ref="upload2" :headers="headers" :show-file-list="false" :on-success='importFn'  :action="importUrl" multiple style="  display: inline-block;">
                          <el-col :span="8"><el-button size="mini">导 入</el-button></el-col>
                        </el-upload>
                      </el-row>

                    </el-tab-pane>

                    <el-tab-pane key="restore" label="还原" name="restore">

                      <el-row>
                        <el-col :span="4" class="labelStep">
                          <el-select size="mini" v-model="dataTempName" placeholder="请选择还原的备份" @visible-change="getDataList()">
                            <el-option
                              v-for="item in dataList"
                              :key="item"
                              :label="item"
                              :value="item">
                            </el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="12"><el-button size="mini" @click="oneKeyGhost">还 原</el-button></el-col>
                      </el-row>


                    </el-tab-pane>

                  </el-tabs>

                </div>
              </div>
            </div>
          </div>
        </Card>

        <!-- <div class="pocContent">
            <div class="bodyBtn">
              <el-container>
                <el-main class="edit-data-class">
                  <el-button size="medium" @click="oneKeyBackup">一键备份</el-button>
                  <el-button size="medium" @click="oneKeyGhost" v-if="dataTempName != ''">一键还原-{{dataTempName}}</el-button>
                  <el-select v-else v-model="dataTempName" placeholder="一健还原">
                    <el-option
                      v-for="item in dataList"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>  
                  <el-button size="medium" @click="gotoDataImport">资料导入</el-button>
                  <el-button size="medium" @click="getDataTemplate" >数据模版下载</el-button>
                  <el-upload ref="upload2" :headers="headers" :show-file-list="false" :on-success='importFn'  :action="importUrl" multiple style="display: inline-block;">
                    <el-button size="medium">数据导入</el-button>
                  </el-upload>
                </el-main>
              </el-container>
            </div>
        </div> -->
      </template>
    </div>

  </div>
</template>
<script>
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

  export default {
    data() {
      let vm = this;
      return {
        backupName: '',
        activeName: 'test',
        headers:this.$postHeaders(),
        importUrl1:window.gatewayspc+'/infra/excel_preview',
        importUrl:window.gatewayspc+'/poc/excel_preview',
        dataList: [],
        dataTempName: ''
      }
    },
    components: {
      Card: resolve => require(['./components/card.vue'], resolve),
      IconFont: resolve => require(['common/iconfont.vue'], resolve) 
    },
    computed: {
    },
    created() {
      // this.getDataList();
    },
    methods: {
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
      async oneKeyReset() {
        let that = this;

          NProgress.start();

          await that.$get(`${window.gatewayspc}/poc/resetdb`).then((res) => {
            that.$handelResponse(res, (result) => {
              NProgress.done();
              if(result.code == '0') {
                that.$success('初始化成功');
              }

            })
          });
      },
      handleClick() {

      },
      importFn1:function(res){
          router.push({name:'pocBaseReview',params:{
            data:res.data,
            title: 'POC',
            name:'poc'
          }});
      },
      importFn:function(res){
          router.push({name:'pocReview',params:{
            data:res.data,
            title: 'POC',
            name:'poc'
          }});
      },
      getDataTemplate() {
        //创建隐藏from
          var eleForm = document.createElement('form');
          eleForm.method = 'get';
          eleForm.action=`${window.gatewayspc}/poc/download_template`;
          eleForm.style.display = 'none';
          // 触发点击
          document.body.appendChild(eleForm);
          eleForm.submit();
          // 然后移除
          document.body.removeChild(eleForm);
      },
      gotoDataImport() {
        router.push({
          name: 'parameterConfiguration',
          params: {
            content: 'dataImport'
          }
        })
      },
      async getDataList() {
        let res = await this.$get(`${window.gatewayspc}/poc/sqlfiles`);

        if(res.code == '0') {
          this.dataList = res.data;
        }

      },
      async oneKeyBackup() {

        let that = this;

          NProgress.start();

        if(this.backupName == '') {
          this.$warning('请填入备份名称!');
        } else {
          let res = await this.$get(`${window.gatewayspc}/poc/isexist/`+this.backupName);

          if(res.data == 1) {
            this.$warning('此名称已存在!');
          } else {

            await that.$get(`${window.gatewayspc}/poc/dumpdb/`+this.backupName).then((res) => {
              that.$handelResponse(res, (result) => {
                NProgress.done();
                if(result.code == '0') {
                  this.$success('备份成功:'+result.data);

                  this.backupName = '';
                }

              })
            });

          }
        }

      },    
      async oneKeyGhost() {

        let that = this;

          NProgress.start();

          await that.$post(`${window.gatewayspc}/poc/reductiondb/`+this.dataTempName).then((res) => {
            that.$handelResponse(res, (result) => {
              NProgress.done();
              if(result.code == '0') {
                that.$success('还原成功');
              }

            })
          });

          this.dataTempName = '';
      }
    },
    watch: {
    }
  }
</script>
<style scoped>

  .pocContent {
    background-color: #fff;
    border-radius: 5px;
    margin: 0 20px 10px;
  }
  .edit-data-class {
    text-align: center;
  }

  .labelStep {
    margin-left: 10%;
  }
  .labelCotent {
    margin-left: 18.33333%;
    margin-right: 8.33333%;
    min-width: 134px;
  }
  .wraper {
    padding: 20px;
  }
  .danhua {
    color: #d8dce5;
  }
</style>

<style lang="less">
#pocIndex {
  .el-row {
    margin: 10px 0px;
  }
}

</style>
