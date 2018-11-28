<template>
	<div>
		<div class="main-panel-wapper devicerule">
			<div class="tool-bar">
        <el-breadcrumb class="bar-title" separator="/">
          <el-breadcrumb-item :to="{ path: '/baseData/attributeDefinition' }">{{$root.langs.baseData['smartspc.baseData.attributeDefinition']}}</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">{{isNew?$root.langs.common['smartspc.common.add']:$root.langs.common['smartspc.common.modify']}}</a></el-breadcrumb-item>
        </el-breadcrumb>
			  <!--<icon-font @click='goBack' :iconClass='"icon-tuichu2"' :title="$root.langs.common['smartspc.common.back']"></icon-font>
	    --></div>
			<Pannel :title="isNew?$root.langs.baseData['smartspc.baseData.addProjectAttribute']:$root.langs.baseData['smartspc.baseData.modifyProjectAttribute']" :center="true">
				<div slot="content" class="mineditbody">
					<el-form ref="form" :model="form" :rules="rule" label-width="200px">
						<el-row :gutter="20" style="margin-top:30px;">
							<el-col :span="12">
								<el-form-item :label="$root.langs.analysis['smartspc.analysis.object']" prop="name">
									<el-input v-model.trim="form.name" :maxlength="50" :disabled="isDisInput"></el-input>
								</el-form-item>
								<el-form-item :label="$root.langs.baseData['smartspc.baseData.code']" prop="code">
									<el-input v-model.trim="form.code" :maxlength="50" :disabled="isDisInput"></el-input>
								</el-form-item>
								<el-form-item :label="$root.langs.baseData['smartspc.baseData.level']+'1'" prop="Level1">
									<el-input v-model.trim="form.Level1" :maxlength="50"></el-input>
								</el-form-item>
								<el-form-item :label="$root.langs.baseData['smartspc.baseData.level']+'2'" prop="Level2">
									<el-input v-model.trim="form.Level2" :maxlength="50"></el-input>
								</el-form-item>
								<el-form-item :label="$root.langs.baseData['smartspc.baseData.level']+'3'" prop="Level3">
									<el-input v-model.trim="form.Level3" :maxlength="50"></el-input>
								</el-form-item>
								<el-form-item :label="$root.langs.baseData['smartspc.baseData.level']+'4'" prop="Level4">
									<el-input v-model.trim="form.Level4" :maxlength="50"></el-input>
								</el-form-item>
								<el-form-item :label="$root.langs.baseData['smartspc.baseData.level']+'5'" prop="Level5">
									<el-input v-model.trim="form.Level5" :maxlength="50"></el-input>
								</el-form-item>
								<el-form-item :label="$root.langs.baseData['smartspc.baseData.level']+'6'" prop="Level6">
									<el-input v-model.trim="form.Level6" :maxlength="50"></el-input>
								</el-form-item>
								<el-form-item :label="$root.langs.baseData['smartspc.baseData.level']+'7'" prop="Level7">
									<el-input v-model.trim="form.Level7" :maxlength="50"></el-input>
								</el-form-item>

								<div class="line text-center" style="margin-top:30px;margin-left: 120px">
                  <el-button plain @click="cancel" size="small">{{$root.langs.common['smartspc.common.cancel']}}</el-button>
                  <el-button type="primary" @click="submitForm('form')" size="small" :disabled="addDisabled" :loading="addLoading">{{$root.langs.common['smartspc.common.save']}}</el-button>
								</div>
							</el-col>
						</el-row>
					</el-form>
				</div>
			</Pannel>
		</div>
	</div>
</template>
<script>
	import {mapGetters} from 'vuex';
	import NProgress from 'nprogress'
	import 'nprogress/nprogress.css'
	export default {
		data() {
		  let vm = this;
      let validLevel = function (number,callback) {
           for(let i=1;i<number;i++){
             if(vm.formc['Level'+number] && !vm.formc['Level'+i]){
               vm.submitFlag = true;
               callback(new Error(vm.$root.langs.baseData['smartspc.baseData.validLevel']));
               break ;
             }
             if(i==number-1){vm.submitFlag = false;}
           }

          for(let i=number+1;i<8;i++){
            if(vm.formc['Level'+i]){
              vm.$refs.form.validateField('Level'+i);
            }
          }
      }

			return {
        submitFlag:false,
				rule: {
					name: [{
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
          code:[{
            required: true,
            message: this.$root.langs.common['smartspc.common.required'],
            trigger: 'blur'
          },{
					  validator:function(rule, value, callback){
              let reg=/^[a-zA-Z\$_][a-zA-Z\d_]*$/;
              if(!reg.test(value)){
                callback(new Error(vm.$root.langs.baseData['smartspc.baseData.codeRule']));
              }
              	callback();
            },
            trigger: 'blur'
            }],
          Level1: [{
            validator:function(rule, value, callback){
              for(let i=2;i<8;i++){
                if(vm.formc['Level'+i]){
                  console.log(this.$refs);
                  vm.$refs.form.validateField('Level'+i);
                }
              }
              let reg = /(?!.*'|.*%|.*")^.*$/;
              if(!reg.test(value)){
                callback(new Error(vm.$root.langs.common['smartspc.common.noSpecialCharacters']));
              }
              callback();
            },
            trigger: 'blur'
          }],
          Level2: [{
					  validator:function(rule, value, callback){
              validLevel(2,callback)
              let reg = /(?!.*'|.*%|.*")^.*$/;
              if(!reg.test(value)){
                callback(new Error(vm.$root.langs.common['smartspc.common.noSpecialCharacters']));
              }
              callback();
            },
            trigger: 'blur'
          }],
          Level3: [{
            validator:function(rule, value, callback){
              validLevel(3,callback)
              let reg = /(?!.*'|.*%|.*")^.*$/;
              if(!reg.test(value)){
                callback(new Error(vm.$root.langs.common['smartspc.common.noSpecialCharacters']));
              }
              callback();
            },
            trigger: 'blur'
          }],
          Level4: [{
            validator:function(rule, value, callback){
              validLevel(4,callback)
              let reg = /(?!.*'|.*%|.*")^.*$/;
              if(!reg.test(value)){
                callback(new Error(vm.$root.langs.common['smartspc.common.noSpecialCharacters']));
              }
              callback();
            },
            trigger: 'blur'
          }],
          Level5: [{
            validator:function(rule, value, callback){
              validLevel(5,callback)
              let reg = /(?!.*'|.*%|.*")^.*$/;
              if(!reg.test(value)){
                callback(new Error(vm.$root.langs.common['smartspc.common.noSpecialCharacters']));
              }
              callback();
            },
            trigger: 'blur'
          }],
          Level6: [{
            validator:function(rule, value, callback){
              validLevel(6,callback)
              let reg = /(?!.*'|.*%|.*")^.*$/;
              if(!reg.test(value)){
                callback(new Error(vm.$root.langs.common['smartspc.common.noSpecialCharacters']));
              }
              callback();
            },
            trigger: 'blur'
          }],
          Level7: [{
            validator:function(rule, value, callback){
              validLevel(7,callback)
              let reg = /(?!.*'|.*%|.*")^.*$/;
              if(!reg.test(value)){
                callback(new Error(vm.$root.langs.common['smartspc.common.noSpecialCharacters']));
              }
              callback();
            },
            trigger: 'blur'
          }],
				},
				isNew: !this.$route.params.id,
				formc: {
					"name": "",
					"code": '',
					"Level1": '',
					"Level2": '',
					"Level3": '',
					"Level4": '',
					"Level5": '',
					"Level6": '',
					"Level7": ''
				},
				addDisabled: false,
				addLoading: false
			}
		},
		computed: {
			...mapGetters({
		        proInfo: 'getproInfo'
		    }),
			id: function() {
				return this.$route.params.id
			},
			filterProInfo: function() {
			  let proObj = this.formc;
		        proObj.name=this.proInfo.project_name;
		        proObj.code=this.proInfo.project_code;
		        proObj.Level1=this.proInfo.level1;
		        proObj.Level2=this.proInfo.level2;
		        proObj.Level3=this.proInfo.level3;
		        proObj.Level4=this.proInfo.level4;
		        proObj.Level5=this.proInfo.level5;
		        proObj.Level6=this.proInfo.level6;
		        proObj.Level7=this.proInfo.level7;

				return proObj;
			},
			form: function() {
				return this.isNew ? this.formc : this.filterProInfo;
			},
			isDisInput: function() {
				return !this.isNew;
			}
		},
		components: {
			Pannel: resolve => require(['common/pannel.vue'], resolve),
			IconFont: resolve => require(['common/iconfont.vue'], resolve)
		},
		created() {
		},
		methods: {
			async submitForm(formName) {
				let ret;
				let that = this;
	        	if(this.submitFlag) return;


		      this.$refs[formName].validate(async(valid) =>  {
		        if (valid) {

		        	NProgress.start();


			          if(this.isNew) {
						let subdata = JSON.stringify(this.form);

						await that.$post(`${window.gatewayspc}/infra/prj`, subdata).then((res) => {
				            that.$handelResponse(res, (result) => {
				              NProgress.done();
				              if(result.code == '0') {
								    	that.$success(result.msg);
				              			that.$router.go(-1);

								    } else {
								    	//that.$error(result.msg);
								}
				            })
				          });

					} else {
						let moddata = {
							Level1: this.form.Level1,
							Level2: this.form.Level2,
							Level3: this.form.Level3,
							Level4: this.form.Level4,
							Level5: this.form.Level5,
							Level6: this.form.Level6,
							Level7: this.form.Level7
						};

						await that.$post(`${window.gatewayspc}/infra/prju/`+this.id, JSON.stringify(moddata)).then((res) => {
				            that.$handelResponse(res, (result) => {
				              NProgress.done();
				              if(result.code == '0') {
								    	that.$success(result.msg);
				              			that.$router.go(-1);

								    } else {
								    	//that.$error(result.msg);
								}

				            })
				          });

					}



		        } else {
		            console.log('error submit!!');
		            return false;

		          }

		      });


			},
			cancel() {
				this.$router.push({
					name: 'attributeDefinition'
				})
			},
			goBack: function() {
		      this.$router.go(-1);
		    }
		}
	}
</script>
<style lang="less" scoped>
	.mineditbody .el-col.el-col-12 {
		margin-left: 20%
	}

</style>
<style lang="less">
	.devicerule .el-select {
		display: block;
	}
	.devicerule {
		.cell {
			.shanchu,.addAction,.addParam {
				visibility: hidden;
			}
		}
		.el-table__row {
			&:hover{
				.shanchu,.addAction,.addParam {
					visibility: visible;
				}
			}
		}
	}
</style>
