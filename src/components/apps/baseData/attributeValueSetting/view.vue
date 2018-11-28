<template>
  <div id="attributeValueSetting">
    <div class="main-panel-wapper"  id="rulePage">
      <template>
        <div class="tool-bar">
          <span class="bar-title" >{{$root.langs.baseData['smartspc.baseData.attributeValueSetting']}}</span>
          <icon-font @click='exportFn' :iconClass='"icon-20"' :title="$root.langs.common['smartspc.common.exportTpl']"></icon-font>
          <el-upload ref="upload2" :headers="headers" :show-file-list="false" style="float:right"
                     :on-success='importFn'  :action="importUrl" multiple>
            <icon-font :iconClass='"icon-21"' :title="$root.langs.common['smartspc.common.import']"></icon-font>
          </el-upload>
          <icon-font @click='addNew' :iconClass='"icon-add"' :title="$root.langs.common['smartspc.common.add']"></icon-font>
        </div>
        <Card :title="$root.langs.baseData['smartspc.baseData.attributeValueSetting']">
          <div slot="content">
            <div class="item margin basic-information">
              <div class="wraper">
                <div class="table-wrap">

                  <el-tabs v-model="activeName" @tab-click="handleClick">

                    <el-tab-pane v-for="(item,index) in tabTiList" :key="index" :label="item.project_name" :name="item.project_code">

                      <el-table class="paramsTable" :data="datasList" style="width: 100%" :empty-text="$root.langs.common['smartspc.common.nodata']">
                        <el-table-column v-if="level1" sortable prop="level1" :label="level1">
                          <template slot-scope="scope">
                            {{scope.row.level1}}
                          </template>
                        </el-table-column>
                        <el-table-column v-if="level2" sortable prop="level2" :label="level2">
                          <template slot-scope="scope">
                            {{scope.row.level2}}
                          </template>
                        </el-table-column>
                        <el-table-column v-if="level3" sortable prop="level3" :label="level3">
                          <template slot-scope="scope">
                            {{scope.row.level3}}
                          </template>
                        </el-table-column>
                        <el-table-column v-if="level4" sortable prop="level4" :label="level4">
                          <template slot-scope="scope">
                            {{scope.row.level4}}
                          </template>
                        </el-table-column>
                        <el-table-column v-if="level5" sortable prop="level5" :label="level5">
                          <template slot-scope="scope">
                            {{scope.row.level5}}
                          </template>
                        </el-table-column>
                        <el-table-column v-if="level6" sortable prop="level6" :label="level6">
                          <template slot-scope="scope">
                            {{scope.row.level6}}
                          </template>
                        </el-table-column>
                        <el-table-column v-if="level7" sortable prop="level7" :label="level7">
                          <template slot-scope="scope">
                            {{scope.row.level7}}
                          </template>
                        </el-table-column>
                        <el-table-column :label="$root.langs.common['smartspc.common.op']" width='180'>
                          <template slot-scope="scope">
                            <a @click="editTab(scope.row)" :title="$root.langs.common['smartspc.common.modify']" class="options"><i class="iconfont icon-bianji2 bianji"></i>{{$root.langs.common['smartspc.common.modify']}}</a>
                            <a @click="handleDelete(scope.row.project_value_ID)" :title="$root.langs.common['smartspc.common.delete']" class="options"><i class="iconfont icon-dele shanchu"></i>{{$root.langs.common['smartspc.common.delete']}}</a>
                          </template>
                        </el-table-column>
                      </el-table>

                </el-tab-pane>

              </el-tabs>

                </div>
              </div>
            </div>
          </div>
        </Card>
      </template>
    </div>

    <el-dialog class="add-user-dialog" :title="menuOption == 'add' ? $root.langs.common['smartspc.common.add'] : $root.langs.common['smartspc.common.modify']" :visible.sync="dialogAddParmas" width="40%">
      <el-form ref="form" :model="form" :rules="rule" label-width="200px">
                <el-form-item v-if="level1" :label="level1" prop="Level1">
                  <el-input v-model.trim="form.Level1" :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item v-if="level2" :label="level2" prop="Level2">
                  <el-input v-model.trim="form.Level2" :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item v-if="level3" :label="level3" prop="Level3">
                  <el-input v-model.trim="form.Level3" :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item v-if="level4" :label="level4" prop="Level4">
                  <el-input v-model.trim="form.Level4" :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item v-if="level5" :label="level5" prop="Level5">
                  <el-input v-model.trim="form.Level5" :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item v-if="level6" :label="level6" prop="Level6">
                  <el-input v-model.trim="form.Level6" :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item v-if="level7" :label="level7" prop="Level7">
                  <el-input v-model.trim="form.Level7" :maxlength="50"></el-input>
                </el-form-item>

                <div class="line text-right" style="margin-top:30px;">
                  <el-button  plain @click="dialogAddParmas = false" size="small">{{$root.langs.common['smartspc.common.cancel']}}</el-button>
                  <el-button type="primary" @click="submitForm('form')" size="small">{{$root.langs.common['smartspc.common.save']}}</el-button>
                </div>
          </el-form>
    </el-dialog>

  </div>
</template>
<script>
  export default {
    data() {
      let vm = this;
      return {
        headers:this.$postHeaders(),
        datasList: [],
        activeName: '',
        tabTiList: [],
        level1: '',
        level2: '',
        level3: '',
        level4: '',
        level5: '',
        level6: '',
        level7: '',
        dialogAddParmas: false,
        menuOption: 'add',
        form: {
          "project_ID": "",
          "project_value_ID": "",
          "Level1": '',
          "Level2": '',
          "Level3": '',
          "Level4": '',
          "Level5": '',
          "Level6": '',
          "Level7": ''
        },
        rule: {
          Level1: [{
            required: true,
            message: this.$root.langs.common['smartspc.common.required'],
            trigger: 'blur'
          },{
            validator:function(rule, value, callback){
              let reg = /(?!.*'|.*%|.*")^.*$/;
              if(!reg.test(value)){
                callback(new Error(vm.$root.langs.common['smartspc.common.noSpecialCharacters']));
              }
              callback();
            },
            trigger: 'blur'
          }],
          Level2: [{
            required: true,
            message: this.$root.langs.common['smartspc.common.required'],
            trigger: 'blur'
          },{
            validator:function(rule, value, callback){
              let reg = /(?!.*'|.*%|.*")^.*$/;
              if(!reg.test(value)){
                callback(new Error(vm.$root.langs.common['smartspc.common.noSpecialCharacters']));
              }
              callback();
            },
            trigger: 'blur'
          }],
          Level3: [{
            required: true,
            message: this.$root.langs.common['smartspc.common.required'],
            trigger: 'blur'
          },{
            validator:function(rule, value, callback){
              let reg = /(?!.*'|.*%|.*")^.*$/;
              if(!reg.test(value)){
                callback(new Error(vm.$root.langs.common['smartspc.common.noSpecialCharacters']));
              }
              callback();
            },
            trigger: 'blur'
          }],
          Level4: [{
            required: true,
            message: this.$root.langs.common['smartspc.common.required'],
            trigger: 'blur'
          },{
            validator:function(rule, value, callback){
              let reg = /(?!.*'|.*%|.*")^.*$/;
              if(!reg.test(value)){
                callback(new Error(vm.$root.langs.common['smartspc.common.noSpecialCharacters']));
              }
              callback();
            },
            trigger: 'blur'
          }],
          Level5: [{
            required: true,
            message: this.$root.langs.common['smartspc.common.required'],
            trigger: 'blur'
          },{
            validator:function(rule, value, callback){
              let reg = /(?!.*'|.*%|.*")^.*$/;
              if(!reg.test(value)){
                callback(new Error(vm.$root.langs.common['smartspc.common.noSpecialCharacters']));
              }
              callback();
            },
            trigger: 'blur'
          }],
          Level6: [{
            required: true,
            message: this.$root.langs.common['smartspc.common.required'],
            trigger: 'blur'
          },{
            validator:function(rule, value, callback){
              let reg = /(?!.*'|.*%|.*")^.*$/;
              if(!reg.test(value)){
                callback(new Error(vm.$root.langs.common['smartspc.common.noSpecialCharacters']));
              }
              callback();
            },
            trigger: 'blur'
          }],
          Level7: [{
            required: true,
            message: this.$root.langs.common['smartspc.common.required'],
            trigger: 'blur'
          },{
            validator:function(rule, value, callback){
              let reg = /(?!.*'|.*%|.*")^.*$/;
              if(!reg.test(value)){
                callback(new Error(vm.$root.langs.common['smartspc.common.noSpecialCharacters']));
              }
              callback();
            },
            trigger: 'blur'
          }]
        },
        importUrl:window.gatewayspc+'/infra/excel_preview',
      }
    },
    components: {
      Card: resolve => require(['../components/card.vue'], resolve),
      IconFont: resolve => require(['common/iconfont.vue'], resolve)
    },
    computed: {
    },
    created() {
      this.fetchData();
    },
    methods: {
      importFn:function(res){
        router.push({name:'reviewAttribute',params:{
          data:res.data,
          title: this.$root.langs.baseData['smartspc.baseData.attributeValueSetting'],
          name:'attributeValueSetting'
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
      async handleClick(tab, event) {

        this.activeName = tab.paneName;

        this.reshList();

      },
      async reshList() {

        let obj = {
          project_ID: ''
        }

        for(let n in this.tabTiList) {
            if(this.activeName == this.tabTiList[n].project_code) {
              this.level1 = this.tabTiList[n].level1;
              this.level2 = this.tabTiList[n].level2;
              this.level3 = this.tabTiList[n].level3;
              this.level4 = this.tabTiList[n].level4;
              this.level5 = this.tabTiList[n].level5;
              this.level6 = this.tabTiList[n].level6;
              this.level7 = this.tabTiList[n].level7;
              obj.project_ID = this.tabTiList[n].project_ID;

              this.form.project_ID = this.tabTiList[n].project_ID;
            }

          }

        let prgData = await this.$post(`${window.gatewayspc}/infra/get_project`,JSON.stringify(obj));

        this.datasList = prgData.data;
      },
      async handleDelete(id) {

        let that = this;

        let obj = {
          project_value_ID: id
        }

        this.$c_confirm(async () => {
                  let ret = await that.$post(`${window.gatewayspc}/infra/remove_project`,JSON.stringify(obj));
                  if(ret.code == '0') {
                        that.$success(ret.msg);
                        that.reshList();
                      } else {
                        //that.$error(ret.msg);
                  }
              });

      },
      async fetchData() {

        let proData = await this.$get(`${window.gatewayspc}/infra/tab_project`);


        if(proData.code == '0') {
          this.tabTiList = proData.data;
          this.activeName = proData.data[0].project_code;
          this.reshList();
        }

      },
      addNew() {
        this.menuOption = 'add';

        this.form.Level1 = '';
        this.form.Level2 = '';
        this.form.Level3 = '';
        this.form.Level4 = '';
        this.form.Level5 = '';
        this.form.Level6 = '';
        this.form.Level7 = '';

        this.dialogAddParmas = true;
      },
      editTab(item) {
        this.menuOption = 'edit';

        this.form.project_value_ID = item.project_value_ID;
        this.form.Level1 = item.level1;
        this.form.Level2 = item.level2;
        this.form.Level3 = item.level3;
        this.form.Level4 = item.level4;
        this.form.Level5 = item.level5;
        this.form.Level6 = item.level6;
        this.form.Level7 = item.level7;

        this.dialogAddParmas = true;
      },
      submitForm(formName) {
        let that = this;
        let ret;

        this.$refs[formName].validate(async (valid) => {
          if (valid) {

            if(this.menuOption == 'add') {
              ret = await this.$post(`${window.gatewayspc}/infra/add_project`, JSON.stringify(this.form));
            } else {
              ret = await this.$post(`${window.gatewayspc}/infra/edit_project`, JSON.stringify(this.form));
            }

            if(ret.code == '0') {
                  this.$success(ret.msg);
                  this.reshList();
                  this.dialogAddParmas = false;
              } else if(ret.code == '1') {
                //that.$warning(ret.msg);
              } else {
                  //that.$error(ret.msg);
              }

          } else {

            return false;
          }
        });

      }
    },
    watch: {
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

  #attributeValueSetting {
    .mailInvite-dialog .el-dialog__body{
      padding-top: 20px;
      padding-bottom: 60px;
      padding-right: 40px;
    }
    .mailInvite-dialog p {
      margin: 0px;
    }
    .mailInvite-dialog .el-button {
      padding: 7px 20px;
    }
    .add-user-dialog{
      .el-form-item__label {
        width: 140px !important;
        float: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
      }
      .el-form-item__content {
        margin-left: 150px !important;
      }
      .el-dialog__footer {
        text-align: center;
      }
      span{
        cursor: default;
      }
    }

    .tab-header .text-orange {
      color: #ff966a;
    }
    .el-input__inner {
      height: 30px;
    }

    .el-col {
      border-bottom: 1px solid #e6ebf5;
    }

    .dataArea {
      text-align: center;
    }

    .el-form-item {
      margin-bottom: 10px;
    }
  }
</style>
