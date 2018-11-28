<template>
  <div id="controlLimitsManagement">
    <div class="main-panel-wapper" id="rulePage">
      <template>
        <div class="tool-bar">
          <span class="bar-title" >{{$root.langs.baseData['smartspc.baseData.controlLimitsManagement']}}</span>
          <span>{{$root.langs.baseData["smartspc.baseData.parameterConfiguration"]}}</span>
            <el-select v-model="condiItem" style="width:100px;margin-left: 10px;" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']" size="mini" @change="getWarmSta">
                <el-option  key="all" :label="$root.langs.common['smartspc.common.all']" value="all">
                </el-option>
                <el-option v-for="item in options" :key="item" :label="item" :value="item">
                </el-option>
          </el-select>
        </div>

        <Card :title="$root.langs.baseData['smartspc.baseData.controlLimitsManagement']">
          <div slot="content">
            <div class="item margin basic-information">
              <div class="wraper">
                <div class="table-wrap">
                  <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col>
                      <el-table class="paramsTable" :data="data" style="width: 100%" :empty-text="$root.langs.common['smartspc.common.nodata']">
                        <el-table-column prop="condCopy" sortable :label="$root.langs.baseData['smartspc.baseData.condition']"
                         width="200">
                          <template slot-scope="scope">
                            <p v-for="(item,index) in scope.row.condCopy">{{item}}</p>
                          </template>
                        </el-table-column>
                        <el-table-column prop="parameterConfiguration" sortable :label="$root.langs.baseData['smartspc.baseData.parameterConfiguration']">
                          <template slot-scope="scope">
                            {{scope.row.item_name}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="LCL" sortable :label="$root.langs.baseData['smartspc.baseData.LCL']">
                          <template slot-scope="scope">
                            {{scope.row.LCL | toFixed3}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="UCL" sortable :label="$root.langs.baseData['smartspc.baseData.UCL']">
                          <template slot-scope="scope">
                            {{scope.row.UCL | toFixed3}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="ctrl_type" sortable :label="$root.langs.dashboard['smartspc.dashboard.controlChartType']">
                          <template slot-scope="scope">
                            {{scope.row.ctrl_type}}
                          </template>
                        </el-table-column>
                        <el-table-column :label="$root.langs.common['smartspc.common.op']" width='180'>
                          <template slot-scope="scope">
                            <a @click="edititem(scope.row)" :title="$root.langs.common['smartspc.common.modify']" class="options"><i class="iconfont icon-bianji2 bianji"></i>{{$root.langs.common['smartspc.common.modify']}}</a>
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

    <el-dialog class="add-user-dialog" :title="$root.langs.common['smartspc.common.modify']" :visible.sync="dialogAddParmas" width="40%">
      <el-form ref="formProV" :model="formProV" :rules="ruleProV">

        <el-form-item :label="$root.langs.baseData['smartspc.baseData.params']+':'" prop="itemname">
            <label>{{formProV.itemname}}</label>
        </el-form-item>
        <el-form-item :label="$root.langs.dashboard['smartspc.dashboard.controlChartType']+':'" prop="ctrl_type">
            <label>{{formProV.ctrl_type}}</label>
        </el-form-item>
        <el-form-item>
            <label class="toolLeftDom" for="autofill">{{$root.langs.baseData['smartspc.baseData.controlAutomatic']}}</label>
            <el-checkbox class="toolLeftDom" v-model="autoctrl"></el-checkbox>
        </el-form-item>
        <template v-if="!autoctrl">
          <el-form-item :label="$root.langs.baseData['smartspc.baseData.LCL']" prop="LCL">
              <el-input v-model="formProV.LCL" :maxlength="10" key="LCL"></el-input>
          </el-form-item>
          <el-form-item :label="$root.langs.baseData['smartspc.baseData.UCL']" prop="UCL">
            <el-input v-model="formProV.UCL" :maxlength="10" key="UCL"></el-input>
          </el-form-item>
        </template>

        <el-form-item style="text-align: center;">
          <el-button plain @click="dialogAddParmas = false" style="margin-left: -30%;">{{$root.langs.common['smartspc.common.cancel']}}</el-button>
          <el-button type="primary" @click="saveRowData('formProV')">{{$root.langs.common['smartspc.common.save']}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>
<script>
  export default {
    data() {
      let vm = this;
      return {
        prjList: [],
        options: [],
        condiItem: 'all',
        currentPage: 1,
        pageSize: 10,
        searchQuery: '',
        dialogAddParmas: false,
        autoctrl:false,
        formProV: {
          itemname:'',
          Item_ID:'',
          auto_ctrl:1,
          LCL:0,
          UCL:0,
          ctrl_type:''
        },
        ruleProV: {
          UCL: [{
            required: true,
            message: this.$root.langs.common['smartspc.common.required'],
            trigger: 'blur'
          },{
            validator:function(rule, value, callback){
              let reg = /^(\-|\+)?\d+(\.\d+)?$/;
              if(!reg.test(value)) {
                callback(new Error(vm.$root.langs.baseData['smartspc.baseData.mustBeANumber']));
              }
              callback();
            },
            trigger: 'blur'
          }],
          LCL: [{
            required: true,
            message: this.$root.langs.common['smartspc.common.required'],
            trigger: 'blur'
          },{
            validator:function(rule, value, callback){
              let reg = /^(\-|\+)?\d+(\.\d+)?$/;
              if(!reg.test(value)) {
                callback(new Error(vm.$root.langs.baseData['smartspc.baseData.mustBeANumber']));
              }
              callback();
            },
            trigger: 'blur'
          },{
            validator: (rule, value, callback) => {
              if (value>this.formProV.UCL) {
                callback(new Error(this.$root.langs.baseData['smartspc.baseData.sizeRuleUCL1']));
              }
              callback();
            },
            trigger: 'blur'
            }]
        },
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
        let data = [];

        for(let n in that.prjList) {
          let arrStr = [];
          for(let m in that.prjList[n].condition) {

            let str = '';

            for(let key in that.prjList[n].condition[m]) {
              str += that.prjList[n].condition[m][key] + ' : ';
            }
            arrStr.push(str.slice(0,str.length-2));
            //arrStr += str.slice(0,str.length-2);
          }

          that.prjList[n].condCopy = arrStr;
        }

        data = that.prjList.filter(function(item) {
          return item.item_name && item.item_name.indexOf(that.searchQuery) !== -1
        });
        data = _.slice(data, (that.currentPage - 1) * that.pageSize, that.currentPage * that.pageSize);

        return data;
      }
    },
    filters: {
       toFixed3(val){
         return val.toFixed(3)
       }
    },
    created() {
      this.fetchData();
      this.fetchParamList();
    },
    methods: {
        async getWarmSta(data) {
          this.condiItem = data;
          this.fetchData();
        },
        async saveRowData(formName){

          let that = this;

          this.$refs[formName].validate(async (valid) => {

          if (valid) {

              this.formProV.LCL = this.formProV.LCL*1;
              this.formProV.UCL = this.formProV.UCL*1;

             if(this.autoctrl) {
                this.formProV.auto_ctrl = 0;
                this.formProV.LCL = 0;
                this.formProV.UCL = 0;
              } else {
                this.formProV.auto_ctrl = 1;
              }

              //console.log(JSON.stringify(this.formProV));

              let ret = await this.$post(`${window.gatewayspc}/infra/edit_ctrl_manage`, JSON.stringify(this.formProV));
              if(ret.code == '0') {
                    this.$success(ret.msg);
                    this.dialogAddParmas = false;
                    this.fetchData();
                  } else {
                    //this.$error(ret.msg);
              }

          } else {

            return false;
          }
        });

      },
      async fetchData() {

        let prjData;
        if(this.condiItem == 'all') {
          prjData = await this.$get(`${window.gatewayspc}/infra/get_ctrl`);
        } else {
          let obj = {
              item_name: this.condiItem
            }
          prjData = await this.$post(`${window.gatewayspc}/infra/get_ctrl_byitemname`, JSON.stringify(obj));
        }

        if(prjData.code==0){
          this.prjList = prjData.data;
        }else {
          //this.$error(prjData.msg);
        }

      },
      async fetchParamList() {

        let proData = await this.$get(`${window.gatewayspc}/infra/get_itemname`);

        if(proData.code==0){
          this.options = proData.data;
        }

      },
      edititem(item) {

        this.formProV.itemname = item.item_name;
        this.formProV.auto_ctrl = item.auto_ctrl;
        this.formProV.LCL = item.LCL.toFixed(3)*1;
        this.formProV.UCL = item.UCL.toFixed(3)*1;
        this.formProV.ctrl_type = item.ctrl_type;
        this.formProV.Item_ID = item.Item_ID;

        this.dialogAddParmas = true;

        this.autoctrl = item.auto_ctrl == 0 ? true : false;
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

  #controlLimitsManagement {
   .add-user-dialog .el-dialog__header,.mailInvite-dialog .el-dialog__header{
      border-bottom: 1px solid rgba(213,213,213,0.50);
      color: rgba(213,213,213,0.50);
    }
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
        width: 130px !important;
        float: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
      }
      .el-form-item__content {
        margin-left: 140px !important;
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
