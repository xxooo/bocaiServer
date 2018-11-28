<template>
  <div id="sampleConfiguration">
    <div class="main-panel-wapper" id="rulePage">
      <template>
        <div class="tool-bar">
          <span class="bar-title" >{{$root.langs.baseData['smartspc.baseData.sampleConfiguration']}}</span>
          <el-button :plain="true" v-if="buttonType ==='edit'" type="danger" @click="cancelSampl" size="small">{{$root.langs.common['smartspc.common.cancel']}}</el-button>
          <el-button v-if="buttonType ==='edit'" type="primary" @click="saveSampl" size="small" >{{$root.langs.common['smartspc.common.save']}}</el-button>
          <el-button v-else plain  @click="buttonType = 'edit'" size="small" >
            <i data-v-54eb8ba0="" class="iconfont icon-bianji2"></i>
            {{$root.langs.common['smartspc.common.modify']}}
          </el-button>
        </div>
        <Card :title="$root.langs.baseData['smartspc.baseData.sampleConfiguration']">
          <div class="" slot='content' >
            <div class="data-role-list-content">
              <el-container>
                <el-main class="edit-data-class">
                      <el-form ref="form" :model="sesDatas" :rules="rule" label-width="200px">
                        <el-form-item :label="$root.langs.baseData['smartspc.baseData.samplingMethod']">
                          <el-select  :disabled="buttonType==='show'" class="toolLeftDom" v-model="sesDatas.sampling_method" style="width:220px" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']" @change="ifAllSampl">
                            <el-option :label="$root.langs.baseData['smartspc.baseData.thewholesample']" value="全样"></el-option>
                            <el-option :label="$root.langs.baseData['smartspc.baseData.systematicSample']" value="系统抽样"></el-option>
                          </el-select>
                        </el-form-item>

                        <template v-if="isAllSampl">

                          <el-form-item  :label="$root.langs.baseData['smartspc.baseData.samplingStartTime']" prop="sampling_date">
                            <el-date-picker :disabled="buttonType==='show'"
                              value-format="yyyy-M-d HH:mm:ss"
                              v-model="sesDatas.sampling_date"
                              type="datetime"
                              :placeholder="$root.langs.analysis['smartspc.common.pleaseChoose']">
                            </el-date-picker>
                          </el-form-item>

                          <el-form-item :label="$root.langs.baseData['smartspc.baseData.samplingPeriod']" prop="sampling_cycle">
                            <el-input :disabled="buttonType==='show'" v-model="sesDatas.sampling_cycle" :maxlength="5" min="0" style="width:220px" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></el-input>
                            <!-- <el-input :disabled="buttonType==='show'" v-model.trim="sesDatas.sampling_cycle" :maxlength="2" type="number" min="0" style="width:220px" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></el-input> -->
                            <label>{{$root.langs.common["smartspc.common.unit"]}}(s)</label>
                          </el-form-item>
                        </template>
                      </el-form>
                </el-main>
              </el-container>
            </div>
          </div>
        </Card>
      </template>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        currentPage: 1,
        pageSize: 10,
        buttonType:'edit',
        isAllSampl: true,
        sesDatas: {
          sampling_method: '',
          sampling_date: '',
          sampling_cycle: 0
        },
        rule:{
          sampling_cycle:[
            { required: true, message: this.$root.langs.common['smartspc.common.required'], trigger: 'blur' },
            { validator: (rule, value, callback) => {
                if(value<=0 || parseInt(value) != value){
                  callback(new Error(this.$root.langs.baseData['smartspc.baseData.mustBeAPositiveInteger']));
                }
                callback();
              }, trigger: 'blur' }
          ],
          sampling_date:[
            {required: true, message: this.$root.langs.common['smartspc.common.required'], trigger: 'change' }
          ]
        }
      }
    },
    components: {
      Card: resolve => require(['../components/card.vue'], resolve)
    },
    computed: {
    },
    created() {
      this.fetchData();
    },
    methods: {
      cancelSampl() {
        this.buttonType = 'show';
        this.fetchData();
      },
      ifAllSampl(data) {
        if(data == '全样') {
          this.isAllSampl = false;
          this.sesDatas.sampling_date = '';
          this.sesDatas.sampling_cycle = 0;
        } else {
          this.isAllSampl = true;
        }
      },
      async fetchData() {
        let ret = await this.$get(`${window.gatewayspc}/sampling/config`);
        if(ret.code == 0) {
          this.buttonType = 'show';
          this.sesDatas.sampling_method = ret.data.sampling_method;
          this.sesDatas.sampling_date = ret.data.sampling_date;
          this.sesDatas.sampling_cycle = ret.data.sampling_cycle;
          if(this.sesDatas.sampling_method == '全样') {
            this.isAllSampl = false;
          }
        }
      },
      async saveSampl() {
        let flag = true;
        this.$refs.form.validate((valid) => {
          if (!valid) {
            flag = false
            return false;
          }
        });

        if(flag){
            let subdata = JSON.stringify(this.sesDatas);
            let ret = await this.$post(`${window.gatewayspc}/sampling/config`, subdata);
            if(ret.code == 0) {
              this.buttonType = 'show';
              this.$success(ret.msg);
              this.fetchData();
            }else {
              return false;
            }
        }
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

.add-data-role-btn {
    text-align: center;
}
.edit-data-class{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.edit-data-class > form {
  margin-bottom: 10px;
  margin-left: -100px;
}

.edit-data-class .add-data-role-btn {
  margin-top: 50px;
  text-align: center;
}

.edit-data-class span {
    float: none;
    display: inline-block;
    text-align: left;
    padding: 0 0 10px;
    width: 120px;
}
.el-button .iconfont{
  font-size: 12px;
  color: #5a5e66;
}
.el-button:hover .iconfont,
.el-button:focus .iconfont{color: #3399ff}
</style>

<style lang="less">
  #sampleConfiguration .el-button--default {
    height: 28px;
    line-height: 0;
  }

</style>
