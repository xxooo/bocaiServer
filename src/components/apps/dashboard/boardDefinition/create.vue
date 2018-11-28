<template>
  <div id="createBoard">
    <div class="main-panel-wapper createDashboardForm">
      <Pannel :title="(isNew?$root.langs.common['smartspc.common.add']:$root.langs.common['smartspc.common.modify'])+$root.langs.dashboard['smartspc.dashboard.board']">
        <div slot="content">
          <el-form :model="form" :rules="rules" ref="ruleForm" label-position="top">
            <el-form-item :label="$root.langs.dashboard['smartspc.dashboard.boardName']" prop="title">
              <el-input v-model.trim="form.title" :placeholder="$root.langs.common['smartspc.common.pleaseInput']"></el-input>
            </el-form-item> 

            <el-form-item :label="$root.langs.common['smartspc.common.type']" prop="timeType">
              <el-select v-model="form.timeType" style="width: 100%;" >
                <el-option  value="0" :label="$root.langs.common['smartspc.common.staticTimeWindow']"></el-option>
                <el-option  value="1" :label="$root.langs.common['smartspc.common.dynamicTimeWindow']"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$root.langs.common['smartspc.common.timeWindowSize']" v-if="form.timeType == '1'" prop="timeSize">
              <el-input v-model="form.timeSize" class="x9" maxlength="2"/>
              <el-select v-model="form.timeUnit" class="x3">
                <el-option  value="day" :label="$root.langs.common['smartspc.common.day']"></el-option>
                <el-option  value="hour" :label="$root.langs.common['smartspc.common.hour']"></el-option>
                <el-option  value="minute" :label="$root.langs.common['smartspc.common.minute']"></el-option>
              </el-select>
            </el-form-item>
              <el-form-item :label="form.timeRange.label" v-else prop="timeRange">
                <el-date-picker
                  v-model="form.timeRange.value"
                  class="jingtaiTime"
                  type="datetimerange"
                  value-format="yyyy-M-d HH:mm:ss"
                  range-separator="-"
                  :start-placeholder="$root.langs.analysis['smartspc.analysis.startDate']"
                  :end-placeholder="$root.langs.analysis['smartspc.analysis.endDate']">
                </el-date-picker>
            </el-form-item>

            <el-form-item :label="$root.langs.dashboard['smartspc.dashboard.extentOfCompetence']" prop="permissType">
              <el-radio-group v-model="form.permissType" :fill="'#5bc995'">
                <el-radio :label="1">{{$root.langs.dashboard['smartspc.dashboard.all']}}</el-radio>
                <el-radio :label="2">{{$root.langs.dashboard['smartspc.dashboard.justMe']}}</el-radio>
                <!-- <el-radio :label="3">{{$root.langs.dashboard['smartspc.dashboard.partOfPeople']}}</el-radio> -->
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$root.langs.common['smartspc.common.des']" prop="desc">
              <el-input type="textarea" v-model.trim="form.desc" :rows="parseInt(4)"></el-input>
            </el-form-item>
            <el-form-item :label="$root.langs.dashboard['smartspc.dashboard.boardIcon']" prop="icon">
              <input type="hidden" v-model="form.icon">
              <img v-for="i in 3" :src="icons[i-1]" @click="form.icon=i" class="ico" :class="{active:i==form.icon}">
            </el-form-item>
            <el-form-item :label="$root.langs.dashboard['smartspc.dashboard.refreshFrequency']" prop="icon">
              <el-select v-model="form.refresh" style="width: 100%;">
                <el-option  v-for="(item,index) in timeList" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$root.langs.dashboard['smartspc.dashboard.waterMark']" prop="watermark">
              <el-input v-model.trim="form.watermark" maxlength="30" :placeholder="$root.langs.common['smartspc.common.pleaseInput']"></el-input>
            </el-form-item> 
            <el-form-item :label="$root.langs.dashboard['smartspc.dashboard.gridQuantity']" prop="icon">
              <el-select v-model="form.gridcolumns" style="width: 100%;" :disabled="!isNew">
                <el-option  v-for="(item,index) in columnsList" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <icon-font @click='addDomain' class="addDomain" :iconClass='"icon-add"' :title="$root.langs.dashboard['smartspc.dashboard.addDataSource']">{{$root.langs.dashboard['smartspc.dashboard.addDataSource']}}</icon-font>
            </el-form-item>
            
            <el-form-item v-if="hasDatasouce"
              v-for="(domain, index) in form.dataSource"
              :label="$root.langs.dashboard['smartspc.dashboard.dataSource'] + (index+1)"
              :key="domain.key"
              class="adddatas"
              >
              <el-select v-model="domain.code" style="width: 100%;" @change="changeFList(index)" :placeholder="$root.langs.dashboard['smartspc.dashboard.pleaseSelectPro']">
                <el-option  v-for="(item,index) in proNameList" :key="item.project_code" :label="item.project_name" :value="item.project_code"></el-option>
              </el-select>
                :  
              <el-select v-model="domain.value" @visible-change="proParamData(domain.code)" style="width: 100%;" :placeholder="$root.langs.dashboard['smartspc.dashboard.pleaseSelectValue']">
                <el-option  v-for="(item,index) in proValueList" :key="item.LevelValue" :label="item.LevelValue" :value="item.LevelValue"></el-option>
              </el-select>
              <icon-font @click="removeDomain(domain)" :iconClass='"icon-dele"' :title="''">{{''}}</icon-font>
            </el-form-item>

            <div class="line text-center margin-top">
              <el-button :plain="true" type="danger" @click="cancel" size="small">{{$root.langs.common['smartspc.common.cancel']}}</el-button>
              <el-button type="primary" @click="isNew ? submitForm('ruleForm') : submitSettingForm('ruleForm')" size="small" :disabled="addDisabled" :loading="addLoading">{{ $root.langs.common['smartspc.common.save'] }}</el-button>
            </div>
          </el-form>
        </div>
      </Pannel>
    </div>
  </div>
</template>
<script>
import "../css/style.less";
import {
  mapGetters
} from 'vuex'
export default {
  data: function() {
    let vm = this;
    return {
      isNew: this.$route.name == 'createBoard' ? true : false,
      addDisabled: false,
      addLoading: false,
      icons:[
        require('@/assets/img/report/1.png'),
        require('@/assets/img/report/2.png'),
        require('@/assets/img/report/3.png')
      ],
      form: {
        title: '',
        permissType: 1,
        timeType:"0",
        timeSize:"",
        timeUnit:"day",
        timeRange:{start:'',end:'',value:[]},
        desc: '',
        refresh: 30000,
        watermark: '',
        gridcolumns: 8,
        icon:1,
        dataSource:[
        ]
      },
      rules: {
        timeSize:[{
          required: true,
          message: this.$root.langs.common['smartspc.common.required'],
          trigger: 'blur'
        },{
            validator:function(rule, value, callback){
              let reg = /^[1-9]\d*$/;
              if(!reg.test(value)){
                callback(new Error(vm.$root.langs.baseData['smartspc.baseData.mustBeANumber']));
              }
              callback();
            },
            trigger: 'blur'
        }],
        timeRange:[{
          required: true,
          message: this.$root.langs.common['smartspc.common.required'],
          trigger: 'blur'
        }],
        timeType:[{
          required: true,
          message: this.$root.langs.common['smartspc.common.required'],
          trigger: 'blur'
        }],
        title: [{
          required: true,
          message: this.$root.langs.common['smartspc.common.required'],
          trigger: 'blur'
        }, {
          min: 1,
          max: 30,
          message: this.$root.langs.common['smartspc.common.NoMoreThan'] + ' 30 '+this.$root.langs.common['smartspc.common.characters'],
          trigger: 'blur'
        } ,{
            validator:function(rule, value, callback){
              let reg = /(?!.*'|.*%|.*")^.*$/;
              if(!reg.test(value)){
                callback(new Error(vm.$root.langs.common['smartspc.common.noSpecialCharacters']));
              }
              callback();
            },
            trigger: 'blur'
          }
            ],
        desc: [{
          required: false,
          message: this.$root.langs.common['smartspc.common.pleaseInput'],
          trigger: 'blur'
        }, {
          min: 1,
          max: 30,
          message: this.$root.langs.common['smartspc.common.NoMoreThan'] + ' 50 '+this.$root.langs.common['smartspc.common.characters'],
          trigger: 'blur'
        }],
        watermark: [{
            validator:function(rule, value, callback){
              let reg = /(?!.*@|.*%|.*#)^.*$/;
              if(!reg.test(value)){
                callback(new Error(vm.$root.langs.common['smartspc.common.noSpecialCharacters']));
              }
              callback();
            },
              trigger: 'blur'
              }
            ]
      },
      proValueList: [],
      proNameList: [],
      timeList: [
          {
          label: '10S',
          value:10000},
          {
          label: '20S',
          value:20000},
          {
          label: '30S',
          value:30000},
          {
          label: '60S',
          value:60000},
          {
          label: '120S',
          value:120000},
          {
          label: '300S',
          value:300000}
      ],
      columnsList: [
          {
          label: '4',
          value:4},
          {
          label: '8',
          value:8}
          // ,
          // {
          // label: '16',
          // value:16}
      ]
    }
  },
  components: {
    IconFont: resolve => require(['common/iconfont.vue'], resolve),
    Pannel: resolve => require(['common/pannel'], resolve) //懒加载
  },
  created() {
    this.getBoardInfo();
    this.getProNameList();
  },
  computed: {
    editId: function() {
      return this.$route.params.id
    },
    hasDatasouce: function() {
      return this.form.dataSource.length > 0 ? true : false;
    }
  },
  watch: {
    detail: function(val, oldValue) {
      if (val && val.id) {
        this.form.id = val.id
        this.form.name = val.name
        this.form.status = parseInt(val.type)
        this.form.desc = val.desc
        this.form.ico = val.icontype
      }
      this.addLoading = false
      this.addDisabled = false
    }
  },
  methods: {
    changeFList(index) {
      this.form.dataSource[index].value = '';
    },
    async getProNameList() {

          let prjData = await this.$get(`${window.gatewayspc}/infra/prj`);

          if(prjData.code==0){
            this.proNameList = prjData.data;
          }

    },
    async getBoardInfo() {
      if(!this.isNew) {
        let prjData = await this.$get(`${window.gatewayspc}/kb/tmpltmsg/`+this.editId);
          if(prjData.code==0){
            //this.form = prjData.data;

            //console.log('prjData.data', prjData.data);

            if(prjData.data.timetype == 1) {
              this.form.timeSize = prjData.data.arg1;
              this.form.timeUnit = prjData.data.arg2;
            } else {
              this.form.timeRange.start = prjData.data.arg1;
              this.form.timeRange.end = prjData.data.arg2;
              this.form.timeRange.value = [prjData.data.arg1 ||'',prjData.data.arg2 || ''];
            }

            this.form.timeType = prjData.data.timetype+'';
            this.form.title = prjData.data.title;
            this.form.permissType = prjData.data.permissType;
            this.form.desc = prjData.data.desc;
            this.form.refresh = prjData.data.refresh;
            this.form.watermark = prjData.data.watermark;
            this.form.gridcolumns = prjData.data.gridcolumns;
            this.form.icon = prjData.data.icon;
            this.form.dataSource = prjData.data.dataSource;

          }

          //console.log('this.form',this.form);
      }
      
    },
    async proParamData(data) {
      if(data != '') {
        let prjData = await this.$get(`${window.gatewayspc}/infra/leafv/`+data);

        if(prjData.code==0){
          this.proValueList = prjData.data;
        }
      } else {
        this.proValueList = [];
      }
    },
    removeDomain(item) {
        var index = this.form.dataSource.indexOf(item)
        if (index !== -1) {
          this.form.dataSource.splice(index, 1)
        }
    },
    addDomain() {
      let that = this;
      if(!(this.form.dataSource.length >= this.proNameList.length)) {
        this.form.dataSource.push({
          code: '',
          value: '',
          key: Date.now()
        });
      } else {
        that.$warning(that.$root.langs.common['smartspc.common.outOfLimit']);
      }

      console.log(this.form.dataSource);
        
    },
    async handleDelete(id) {

        let that = this;
        this.$c_confirm(async () => {
                  let ret = await that.$post(`${window.gatewayspc}/infra/prjd/`+id);
                  if(ret.code == '0') {
                        that.$success(ret.msg);
                        that.fetchData();
                      } else {
                        //that.$error(ret.msg);
                  }
              });

      },

    async submitForm(formName) {

      let that = this;

      console.log('this.form.timeRange.value',this.form.timeRange.value);

      let pass = true;

      if(this.form.timeType == '0') {
        if(this.form.timeRange.value.length == '0') {
          this.$warning(this.$root.langs.common['smartspc.common.timeHorizonRequred']);
          pass = false;
        }
      } else if(this.form.timeType == '1') {
        if(this.form.timeSize == '') {
          this.$warning(this.$root.langs.common['smartspc.common.timeHorizonRequred']);
          pass = false;
        }
      }

      if(this.form.timeRange.value) {
        this.form.timeRange.start = this.form.timeRange.value[0];
        this.form.timeRange.end = this.form.timeRange.value[1];
      }

      if(pass) {
        this.$refs[formName].validate(async(valid) =>  {
          if (valid) {

            let subdata = JSON.stringify(this.form);

            console.log(subdata);

            let ret = await this.$post(`${window.gatewayspc}/kb/tmplt`, subdata);

            if(ret.code == '0') {
                  this.$success(ret.msg);

                  store.commit('updateboradInfo',[]);
                  store.commit('updatewatermark',this.form.watermark);
                  store.commit('updategridcolumns',this.form.gridcolumns);
                  store.commit('updateeditAble',true);

                  router.push({
                    name: 'boardEdit',
                    params: {
                      id: ret.data
                    }
                  })

                } else {
                  //this.$error(ret.msg);
            }

          } else {
              console.log('error submit!!');
              return false;

            }

        });
      }
      
    },
    async submitSettingForm(formName) {

      //console.log('edit',this.form);

      let that = this;

      delete this.form.templateID;
      delete this.form.content;

      if(this.form.timeRange.value) {
        this.form.timeRange.start = this.form.timeRange.value[0];
        this.form.timeRange.end = this.form.timeRange.value[1];
      }

      this.$refs[formName].validate(async(valid) =>  {
        if (valid) {

          let subdata = JSON.stringify(this.form);

          let ret = await this.$post(`${window.gatewayspc}/kb/tmplt/`+this.editId,subdata);

          if(ret.code == '0') {
                this.$success(ret.msg);

                store.commit('updateboradInfo',[]);
                store.commit('updatewatermark',this.form.watermark);
                store.commit('updategridcolumns',this.form.gridcolumns);
                store.commit('updateeditAble',true);

                router.push({
                  name: 'boardEdit',
                  params: {
                    id: this.editId
                  }
                })

              } 

        } else {
            console.log('error submit!!');
            return false;

          }

      });

    },
    cancel() {
      this.$router.push({
        name: 'boardDefinition'
      })
    }
  }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
@colorBtnPrimary: #fb735c;
@color1: #162134;
@color3: #f8f5f4;
@btnWidth: 80px;

p {
  margin-bottom: 0
}

form {
  width: 695px;
  margin: 0 auto;
  .el-button {
    width: @btnWidth;
  }
  .ico{
    margin-right: 1em;
    border:3px solid #fff;
    border-radius: 10px;
    cursor: pointer;
    &.active{
      border-color:#dadada;
    }
  }
}

.addDomain {
    float: left !important;
    margin-left: 35%;
}

.jingtaiTime {
  margin-left: 36.9%;
}

</style>
<style lang="less">
#createBoard {
    .el-form--label-top .el-form-item__label {
      width: 180px;
    }
    .el-form-item__content {
        line-height: 60px;
        display: inline-block;
        width: 70% !important;
    }

    .el-form-item.adddatas .el-select {
      width:40% !important;
    }
    .el-form-item.adddatas {
      margin-bottom: 0px; 
    }
    .el-form--label-top .el-form-item__label {
        float: left;
    }

  }
</style>