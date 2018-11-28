<template>
  <div id="parameterConfiguration">
    <div class="main-panel-wapper"  id="rulePage">
      <template>
        <div class="tool-bar">
          <span class="bar-title" >{{$root.langs.baseData['smartspc.baseData.parameterConfiguration']}}</span>
          <icon-font @click='exportFn' :iconClass='"icon-20"' :title="$root.langs.common['smartspc.common.exportTpl']"></icon-font>
          <el-upload ref="upload2" :headers="headers" :show-file-list="false" style="float:right"
                     :on-success='importFn' class="importbtn" :action="importUrl" multiple>
            <icon-font :iconClass='"icon-21"' :title="$root.langs.common['smartspc.common.import']"></icon-font>
          </el-upload>
          <icon-font @click='isSetPro = true' :iconClass='"icon-xiangmuguanli"' :title="$root.langs.baseData['smartspc.baseData.projectSetting']"></icon-font>
          <icon-font @click='addParams' :iconClass='"icon-jia"' :title="$root.langs.baseData['smartspc.baseData.addParams']"></icon-font>
        </div>

        <Card v-if="!isSetPro" :title="$root.langs.baseData['smartspc.baseData.parameterConfiguration']">
          <div slot="content">
            <div class="item margin basic-information">
              <div class="wraper">
                <div class="table-wrap">
                  <el-row type="flex" class="row-bg" justify="space-around">
                    <el-col>
                      <el-table class="paramsTable" :data="data" style="width: 100%" :empty-text="$root.langs.common['smartspc.common.nodata']">
                        <el-table-column prop="condCopy"
                        sortable
                        :label="$root.langs.baseData['smartspc.baseData.condition']"
                         width="200">
                          <template slot-scope="scope">
                            <p v-for="(item,index) in scope.row.condCopy">{{item}}</p>
                          </template>
                        </el-table-column>
                        <el-table-column prop="parameterConfiguration"
                        sortable
                        :label="$root.langs.baseData['smartspc.baseData.parameterConfiguration']" min-width="150">
                          <template slot-scope="scope">
                            {{scope.row.item_name}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="LSL" sortable :label="$root.langs.baseData['smartspc.baseData.LSL']" min-width="100">
                          <template slot-scope="scope">
                            {{scope.row.LSL}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="target" sortable :label="$root.langs.baseData['smartspc.baseData.target']" min-width="100">
                          <template slot-scope="scope">
                            {{scope.row.target}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="USL" sortable :label="$root.langs.baseData['smartspc.baseData.USL']" min-width="100">
                          <template slot-scope="scope">
                            {{scope.row.USL}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="psize" sortable :label="$root.langs.baseData['smartspc.baseData.packetSize']" min-width="120">
                          <template slot-scope="scope">
                            {{scope.row.psize}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="units" sortable :label="$root.langs.baseData['smartspc.baseData.units']" min-width="80">
                          <template slot-scope="scope">
                            {{scope.row.units}}
                          </template>
                        </el-table-column>
                        <el-table-column :label="$root.langs.common['smartspc.common.op']" width='190'  fixed="right">
                          <template slot-scope="scope">
                            <a @click="edititem(scope.row)" :title="$root.langs.common['smartspc.common.modify']" class="options"><i class="iconfont icon-bianji2 bianji"></i>{{$root.langs.common['smartspc.common.modify']}}</a>
                            <a @click="handleDelete(scope.row.Item_ID)" :title="$root.langs.common['smartspc.common.delete']" class="options"><i class="iconfont icon-dele shanchu"></i>{{$root.langs.common['smartspc.common.delete']}}</a>
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
    <el-dialog class="mailInvite-dialog" :title="$root.langs.baseData['smartspc.baseData.projectSetting']" :visible.sync="isSetPro" width="40%">
      <el-checkbox-group v-model="checkPerList" class="el-row">
        <div v-for="(item,index) in proList" :key="index" style="width: 50%;float: left">
          <el-checkbox :label="item.project_code" :key="item.project_code">{{item.project_name}}</el-checkbox>
        </div>
      </el-checkbox-group>
      <div class="proSetTip"><label>{{$root.langs.baseData['smartspc.baseData.proSetTipPart1']+this.kongge +$root.langs.baseData['smartspc.baseData.proSetTipPart2']}}</label></div>
      <div slot="footer" class="dialog-footer" >
        <el-button plain @click="cancelSetPro" size="small">{{$root.langs.common['smartspc.common.cancel']}}</el-button>
        <el-button type="primary" size="small" @click="addproConfig">{{$root.langs.common['smartspc.common.save']}}</el-button>
      </div>
    </el-dialog>
    <!---->
    <el-dialog class="add-user-dialog" :title="$root.langs.common['smartspc.common.add']+this.kongge +$root.langs.baseData['smartspc.baseData.params']" :visible.sync="dialogAddParmas" width="40%">
      <el-form ref="formProN" :model="formProN" :rules="ruleProN">

        <el-form-item :label="$root.langs.baseData['smartspc.baseData.params']" prop="itemname">
            <el-input v-model.trim="formProN.itemname" :maxlength="15" key="itemname"></el-input>
        </el-form-item>
        <el-form-item :label="$root.langs.baseData['smartspc.baseData.LSL']" prop="LSL">
          <el-input v-model="formProN.LSL" :maxlength="10" key="LSL"></el-input>
          <div class="el-form-item__error" v-if="usllsltarget">
            {{$root.langs.baseData['smartspc.baseData.sizeRule2']}}
          </div>
        </el-form-item>
        <el-form-item :label="$root.langs.baseData['smartspc.baseData.target']" prop="target">
            <el-input v-model="formProN.target" :maxlength="10" key="target"></el-input>
            <div class="el-form-item__error" v-if="usllsltarget">
              {{$root.langs.baseData['smartspc.baseData.sizeRule2']}}
            </div>
        </el-form-item>
        <el-form-item :label="$root.langs.baseData['smartspc.baseData.USL']" prop="USL">
            <el-input v-model="formProN.USL" :maxlength="10" key="USL"></el-input>
            <div class="el-form-item__error" v-if="usllsltarget">
              {{$root.langs.baseData['smartspc.baseData.sizeRule2']}}
            </div>
        </el-form-item>
        <el-form-item :label="$root.langs.baseData['smartspc.baseData.packetSize']" prop="psize">
            <el-input v-model="formProN.psize" :maxlength="6" key="psize"></el-input>
        </el-form-item>
        <el-form-item :label="$root.langs.baseData['smartspc.baseData.units']" prop="units">
            <el-input v-model.trim="formProN.units" :maxlength="10" key="units"></el-input>
        </el-form-item>

        <el-form-item v-for="(item,index) in copyProList" :key="index" :label="item.name" :title="item.name">
          <el-select @change="selectVmode" v-model="item.vmode" filterable style="width: 100%;">
            <el-option  v-for="(itemsub,index) in item.value" :key="index" :label="itemsub" :value="itemsub"></el-option>
          </el-select>
          <div class="el-form-item__error" v-if="requiredVmode">
            {{$root.langs.baseData['smartspc.baseData.conditionRequired']}}
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button plain @click="dialogAddParmas = false" size="mini">{{$root.langs.common['smartspc.common.cancel']}}</el-button>
        <el-button type="primary" @click="saveRowData('formProN')" size="mini" >{{$root.langs.common['smartspc.common.save']}}</el-button>
      </div>
    </el-dialog>

    <el-dialog class="add-user-dialog" :title="$root.langs.common['smartspc.common.modify']" :visible.sync="dialogAddParmasM" width="40%">
      <el-form ref="formProV" :model="formProV" :rules="ruleProV">

        <el-form-item :label="$root.langs.baseData['smartspc.baseData.params']" prop="itemname">
            <el-input v-model.trim="formProV.itemname" :maxlength="15" :disabled="isDisInput"></el-input>
        </el-form-item>
        <el-form-item :label="$root.langs.baseData['smartspc.baseData.LSL']" prop="LSL">
          <el-input v-model="formProV.LSL" :maxlength="10" ></el-input>
          <div class="el-form-item__error" v-if="usllsltarget">
            {{$root.langs.baseData['smartspc.baseData.sizeRule2']}}
          </div>
        </el-form-item>
        <el-form-item :label="$root.langs.baseData['smartspc.baseData.target']" prop="target">
            <el-input v-model="formProV.target" :maxlength="10"></el-input>
            <div class="el-form-item__error" v-if="usllsltarget">
              {{$root.langs.baseData['smartspc.baseData.sizeRule2']}}
            </div>
        </el-form-item>
        <el-form-item :label="$root.langs.baseData['smartspc.baseData.USL']" prop="USL">
            <el-input v-model="formProV.USL" :maxlength="10" ></el-input>
            <div class="el-form-item__error" v-if="usllsltarget">
              {{$root.langs.baseData['smartspc.baseData.sizeRule2']}}
            </div>
        </el-form-item>
        <el-form-item :label="$root.langs.baseData['smartspc.baseData.packetSize']" prop="psize">
            <el-input v-model="formProV.psize" :maxlength="6" ></el-input>
        </el-form-item>
        <el-form-item :label="$root.langs.baseData['smartspc.baseData.units']" prop="units">
            <el-input v-model.trim="formProV.units" :maxlength="10" ></el-input>
        </el-form-item>

        <el-form-item v-for="(item,index) in copyProList" :key="index" :label="item.name" :title="item.name">
          <el-select @change="selectVmode" v-model="item.vmode" filterable style="width: 100%;" :disabled="isDisInput">
            <el-option  v-for="(itemsub,index) in item.value" :key="index" :label="itemsub" :value="itemsub"></el-option>
          </el-select>
          <div class="el-form-item__error" v-if="requiredVmode">
            {{$root.langs.baseData['smartspc.baseData.conditionRequired']}}
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button plain @click="dialogAddParmasM = false" size="small" style="margin-left: 70%;">{{$root.langs.common['smartspc.common.cancel']}}</el-button>
        <el-button type="primary" size="small" @click="saveRowData('formProV')">{{$root.langs.common['smartspc.common.save']}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  export default {
    data() {
      let vm = this;
      return {
        headers:this.$postHeaders(),
        prjList: [],
        proList: [],
        groupid: '',
        itemid: '',
        currentPage: 1,
        pageSize: 10,
        searchQuery: '',
        optionList: [],
        copyProList: [],
        form:{
          parVList:[]
        },
        isSetPro: false,
        checkPerList: [],
        dialogAddParmas: false,
        dialogAddParmasM: false,
        paramsList: [],
        menuOption: 'add',
        proparList:'',
        newParVa:[],
        autoctrl:false,
        requiredVmode:false,
        usllsltarget: false,
        formProV: {
          datasource:[],
          itemname:'',
          USL:'',
          LSL:'',
          target:'',
          units:'',
          psize:''
        },
        formProN: {
          datasource:[],
          itemname:'',
          USL:'',
          LSL:'',
          target:'',
          units:'',
          psize:''
        },
        ruleProN: {
          itemname: [{
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
          USL: [{
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
          LSL: [{
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
          }
          ],
          target: [{
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
          units: [{
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
          psize: [{
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
              if (parseInt(value) != value || value<2) {
                callback(new Error(this.$root.langs.baseData['smartspc.baseData.mustBeAPositiveIntegerandno2']));
              }
              callback();
            },
            trigger: 'blur'
          }],
          vmode: [{
            required: true,
            message: this.$root.langs.common['smartspc.common.required'],
            trigger: 'blur'
          }]
        },
        ruleProV: {
          itemname: [{
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
          USL: [{
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
          LSL: [{
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
          target: [{
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
          units: [{
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
          psize: [{
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
              if (parseInt(value) != value || value<2) {
                callback(new Error(this.$root.langs.baseData['smartspc.baseData.mustBeAPositiveIntegerandno2']));
              }
              callback();
            },
            trigger: 'blur'
          }],
          vmode: [{
            required: true,
            message: this.$root.langs.common['smartspc.common.required'],
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
      kongge() {
            let en = Lockr.get('locale') == 'en-US';
            return en ? ' ' : '';
          },
      isDisInput: function() {
        return true;
      },
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
    created() {
      this.fetchData();
      this.fetchParamList();
    },
    mounted(){
    },
    methods: {
        importFn:function(res){
          router.push({name:'reviewAttribute',params:{
            data:res.data,
            title: this.$root.langs.baseData['smartspc.baseData.parameterConfiguration'],
            name:'parameterConfiguration'
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
        selectVmode(data) {
          this.requiredVmode = false;
        },
        async saveRowData(formName){

          console.log('this.formProV',this.formProV);

          let that = this;

          this.$refs[formName].validate(async (valid) => {

          if (valid) {

              let dataArr = [];
              for(let n in this.copyProList) {
                let ss = this.copyProList[n].code;
                let obj = {};

                if(this.copyProList[n].vmode == '') {
                  this.requiredVmode = true;
                  return false;
                } else {
                  obj[ss] = this.copyProList[n].vmode;
                  dataArr.push(obj);
                }

              }

              this.formProV.datasource = dataArr;
              this.formProN.datasource = dataArr;

              this.formProN.USL = this.formProN.USL*1;
              this.formProN.target = this.formProN.target*1;
              this.formProN.psize = this.formProN.psize*1;
              this.formProN.LSL = this.formProN.LSL*1;
              
              this.formProV.USL = this.formProV.USL*1;
              this.formProV.target = this.formProV.target*1;
              this.formProV.psize = this.formProV.psize*1;
              this.formProV.LSL = this.formProV.LSL*1;

            if(this.menuOption == 'add') {

              if(this.formProN.target>this.formProN.USL || this.formProN.target<this.formProN.LSL) {

                  this.usllsltarget = true;
                  return false;
              }

              let subdata = JSON.stringify(this.formProN);

              let ret = await this.$post(`${window.gatewayspc}/infra/add_params`, subdata);
              if(ret.code == '0') {
                    this.$success(ret.msg);
                    this.dialogAddParmas = false;
                    this.fetchData();
                  } else {
                    //this.$error(ret.msg);
                }
            } else {

              if(this.formProV.target>this.formProV.USL || this.formProV.target<this.formProV.LSL) {
                  this.usllsltarget = true;
                  return false;
              }

              this.formProV.groupid = this.groupid;
              this.formProV.itemid = this.itemid;

              let subdata = JSON.stringify(this.formProV);
              let ret = await this.$post(`${window.gatewayspc}/infra/update_params`, subdata);
              if(ret.code == '0') {
                    this.$success(ret.msg);
                    this.dialogAddParmasM = false;
                    this.fetchData();
                  } else {
                    //this.$error(ret.msg);
              }
            }

          } else {

            return false;
          }
        });

      },
      async proParamData(code) {
        let parVList = await this.$get(`${window.gatewayspc}/infra/leafv/`+code);
        this.optionList = parVList.data;
      },
      addParams() {
        this.usllsltarget = false;
        this.menuOption = 'add';
        this.setCopyProList();
        this.dialogAddParmas = true;
      },
      setNewPrjList() {
        this.newPrjList = [];

        let arr = this.form.parVList;
          for(let n in arr) {
            let arr1 = [];
            for(let key in arr[n]) {
              if(key != "group_ID") {
                let obj1 = {
                  key: key,
                  value: arr[n][key]
                };
                arr1.push(obj1);
              }

            }
            let obj2 = {
                pvobj: arr1,
                group_ID: arr[n].group_ID
              }
            this.newPrjList.push(obj2);
          }
          for(let n in this.newPrjList) {
             this.newPrjList[n].pvobj = _.sortBy(this.newPrjList[n].pvobj, function(item) {
                    return item.key;
                  });
          }

      },
      setCopyProList() {

        this.copyProList = [];
        let arr = this.proparList;
        for(let n in arr) {
          let obj = {
            value: arr[n].value,
            code: arr[n].code,
            name: arr[n].name,
            vmode: ''
          }
          this.copyProList.push(obj);
        }

        this.formProN.itemname = '';
        this.formProN.USL = '';
        this.formProN.LSL = '';
        this.formProN.target = '';
        this.formProN.units = '';
        this.formProN.psize = '';

      },
      async fetchParamList() {

        let parData = await this.$get(`${window.gatewayspc}/infra/iprj`);

        this.paramsList = parData.data;

        this.paramsList = _.sortBy(this.paramsList, function(item) {
          return item.code;
        });

        this.setpro();
        this.setCopyProList();

      },
      async addproConfig() {

        let subdata = JSON.stringify(this.checkPerList);
        let ret = await this.$post(`${window.gatewayspc}/infra/iprj`, subdata);

        if(ret.code == 0) {
          this.$success(ret.msg);
          this.isSetPro = false;
        }

      },
      cancelSetPro() {
        this.isSetPro = false;
      },
      setpro() {
        //this.isSetPro = true;
        for(let n in this.paramsList) {
          this.checkPerList.push(this.paramsList[n].code);
        }
      },


      async handleDelete(id) {

        let that = this;

        let objId = {
          itemid: id
        }

        this.$c_confirm(async () => {
                  let ret = await that.$post(`${window.gatewayspc}/infra/remove_params`,JSON.stringify(objId));
                  if(ret.code == '0') {
                        that.$success(ret.msg);
                        that.fetchData();
                      } else {
                        //that.$error(ret.msg);
                  }
              });

      },
      async fetchData() {
        let proData = await this.$get(`${window.gatewayspc}/infra/prj_mod`);
        let prjData = await this.$get(`${window.gatewayspc}/infra/get_params`);

        if(proData.code == '0') {this.proList = proData.data;}
        if(prjData.code == '0') {this.prjList = prjData.data;}

        let pajVList = await this.$get(`${window.gatewayspc}/infra/prj_params`);

          let list = pajVList.data;

          let arr = [];

          for(let n in list) {
            let obj = {};

            for(let key in list[n]) {
              if(key != "value") {
                obj.code = key;
                obj.name = list[n][key]
              }
            }
            obj.value = list[n].value;
            arr.push(obj);
          }

        this.proparList = arr;

        let parvData = await this.$get(`${window.gatewayspc}/infra/iprjv`);

        if(parvData.code==0){
          this.form.parVList = parvData.data;
          this.form.parVList.length>0?(this.showAddBox = false):(this.showAddBox = true);

          this.setNewPrjList();
        }

      },
      add: function() {
        let that = this;
        router.push({
          name: 'addAttributeValue'
        })
      },
      edititem: function(item) {
        this.usllsltarget = false;
        this.setCopyProList();
        this.menuOption = 'edit';

        let dataArr = [];
            for(let n in this.copyProList) {
              let ss = this.copyProList[n].code;
              let obj = {};
              obj[ss] = this.copyProList[n].vmode;
              dataArr.push(obj);
            }

        for(let n in this.copyProList) {

          let code = this.copyProList[n].code;

          for(let m in item.condition) {

            for(let key in item.condition[m]) {
              if(key == code) {
                this.copyProList[n].vmode = item.condition[m].value;
              }
            }
          }
        }

        this.formProV.itemname = item.item_name;
        this.formProV.USL = item.USL;
        this.formProV.LSL = item.LSL;
        this.formProV.units = item.units;
        this.formProV.psize = item.psize;
        this.formProV.target = item.target;
        this.groupid = item.group_ID;
        this.itemid = item.Item_ID;

        this.dialogAddParmasM = true;
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


  .subTdRole div {
    padding-right: 60px;
    min-width: 220px;
    padding: 2px 0;
    margin-bottom: 0;
    font-weight: 400;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
  }

.table.table-bordered {
    border-spacing: 0px !important;
    text-align: center;
    width: 100%;
  }


  .edit-data-class {
    margin: 5% 10%;
  }

  .add-data-role-btn {
    text-align: center
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

  #parameterConfiguration {
    .mailInvite-dialog .el-dialog__body{
      padding-top: 20px;
      padding-bottom: 40px;
      padding-right: 40px;
    }
    .proSetTip {
      padding-top: 20px;
    }
    .mailInvite-dialog p {
      margin: 0px;
    }
    .mailInvite-dialog .el-button {
      padding: 7px 20px;
    }
    .add-user-dialog{
      .el-form-item__label {
        width: 110px !important;
        float: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
      }
      .el-form-item__content {
        margin-left: 120px !important;
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
