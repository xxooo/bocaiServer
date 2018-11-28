<template>
  <div class="main">
      <div class="iconBox">
          <el-upload class="icon" :headers="customHeader" :action="uploadUrl" accept=".jpg,.png" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" v-loading="loadingAvatar">
              <img class="avatar" :src="avatar" v-loading="true"></img>
              <a href="javascript:void(0);">{{$root.langs.common["smartspc.common.modifyAvatar"]}}</a>
          </el-upload>
      </div>
      <div class="userInfoList">
          <div class="infoBox">
              <span>{{$root.langs.common["smartspc.common.user"]}}：</span>
              <span>{{this.userInfo.account}}</span>
          </div>
          <div class="infoBox">
              <span>{{$root.langs.common["smartspc.common.password"]}}：</span>
              <span><i class="tips">{{this.$root.langs.common["smartspc.common.existed"]}}</i></span>
              <span><a href="javascript:void(0)" @click="edit('password')">{{$root.langs.common["smartspc.common.modify"]}}</a></span>
          </div>
          <div class="infoBox">
              <span>{{$root.langs.common["smartspc.common.name"]}}：</span>
              <span>{{this.userInfo.name}}</span>
              <span><a href="javascript:void(0)" @click="edit('name')">{{$root.langs.common["smartspc.common.modify"]}}</a></span>
          </div>
          <div class="infoBox">
              <span>{{$root.langs.common["smartspc.common.mobilephone"]}}：</span>
              <span>{{this.userInfo.mobile}}</span>
              <span><a href="javascript:void(0)"@click="edit('mobile')">{{$root.langs.common["smartspc.common.modify"]}}</a></span>
          </div>
          <div class="infoBox">
              <span>{{$root.langs.common["smartspc.common.email"]}}：</span>
              <span>{{this.userInfo.email}}</span>
              <span><a href="javascript:void(0)"@click="edit('email')">{{$root.langs.common["smartspc.common.modify"]}}</a></span>
          </div>
      </div>
      <el-dialog :title="formTitle" :visible.sync="dialogTableVisible" class="dialogBox">
          <el-form :model="form" :rules="rules" ref="form">
              <el-form-item v-for="(item,index) in formList" :label="item.label" :prop="item.key" :key="index">
                  <el-input :type="item.type" v-model="form[item.key]" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item class="buttons">
                  <el-button type="primary" @click="save">{{$root.langs.common["smartspc.common.ok"]}}</el-button>
                  <el-button plain @click="dialogTableVisible=false">{{$root.langs.common["smartspc.common.cancel"]}}</el-button>
              </el-form-item>
          </el-form>
      </el-dialog>
  </div>
</template>
<script>
  import cookieParser from '../../common/cookie.js';
  export default {
      data(){
          return {
              token:cookieParser.getCookie('token'),
              userInfoData:[],
              dialogTableVisible:false,
              form:{},
              formTitle:"",
              formType:"",
              rules:{},
              formList:[],
              loadingAvatar:false,
              inResize: false,
              userInfo: {}
          }
      },
      props:{
          user:Object,
      },
      async created(){
          this.setUserInfo();
          this.getUserInfo();
      },
      methods:{
          async getUserInfo(){
            let res = await this.$get(`${window.account}/user/profile`);
            if(res.code == '0') {
              this.userInfo = res.result;
              store.commit('updateavatarVuex', this.userInfo.avatar);
            }
          },
          async handleAvatarSuccess(res, file) {
              let that = this;
              let imageUrl = `${res.result[0].servername}`;
              that.loadingAvatar = true;
              let data = await that.editUser({avatar: imageUrl});
              if (data.code === 0) {
                  that.$success(that.$root.langs.common["smartspc.common.modifiedAvatarSuccessfully"]+'!');
                  that.loadingAvatar = false;
                  that.getUserInfo();
              }

          },
          beforeAvatarUpload(file) {
              const isJPG = file.type === 'image/jpeg';
              const isPNG = file.type === 'image/png';
              const isLt2M = file.size / 1024 / 1024 < 2;
              if (!(isJPG || isPNG)) {
                  this.$Notice.warning({title: this.$root.langs.common["smartspc.common.onlySupportJPGorPNG"]});
              }
              if (!isLt2M) {
                  this.$Notice.warning({title: this.$root.langs.common["smartspc.common.maxSizeNoMoreThan2MB"]+'!'});
              }
              return (isJPG || isPNG) && isLt2M;
          },
          setUserInfo(){
              let that = this;
              Object.assign(that.form ,that.user);
              that.userInfoData=[];
              if(that.user.account){
                  for(let i=0;i<5;i++){
                      let obj={
                          showBut:true
                      };
                      let key;
                      switch(i){
                          case 0:
                              obj.label = this.$root.langs.common["smartspc.common.user"];
                              key = "account";
                              obj.showBut = false;
                              break;
                          case 1:
                              obj.label= this.$root.langs.common["smartspc.common.password"];
                              obj.value = "<i class='tips'>"+this.$root.langs.common["smartspc.common.existed"]+"</i>";
                              break;
                          case 2:
                              obj.label= this.$root.langs.common["smartspc.common.name"];
                              key = "name";
                              break;
                          case 3:
                              obj.label= this.$root.langs.common["smartspc.common.mobilephone"];
                              key = "mobile";
                              break;
                          case 4:
                              obj.label= this.$root.langs.common["smartspc.common.email"];
                              key = "email";
                              break;
                      }
                      if(key){
                          obj.key=key;
                          obj.value=that.user[key];
                      }else{
                          obj.key="password";
                      }
                      that.userInfoData.push(obj)
                  }
              }
          },
          edit(k){
              let that = this;
              that.formList = [];
              that.formType = k;
              switch (k){
                  case "name":
                      that.formTitle = this.$root.langs.common["smartspc.common.modify"] + this.kongge + this.$root.langs.common["smartspc.common.name"];
                      that.formList.push({
                          type:"text",
                          label: this.$root.langs.common["smartspc.common.name"],
                          key:"name"
                      });
                      that.rules={
                          name: [{
                              required: true,
                              message: this.$root.langs.common["smartspc.common.pleaseInput"] + this.kongge + this.$root.langs.common["smartspc.common.name"],
                              trigger: 'blur'
                          }, {
                              min: 3,
                              max: 20,
                              message: this.$root.langs.common["smartspc.common.between3and20characters"],
                              trigger: 'blur'
                          }]
                      };
                      break;
                  case "password":
                      that.formTitle = this.$root.langs.common["smartspc.common.modify"] + this.kongge + this.$root.langs.common["smartspc.common.password"];
                      that.formList=[{
                          type:"password",
                          label: this.$root.langs.common["smartspc.common.oldPassword"],
                          key:"passwordOld"
                      },{
                          type:"password",
                          label: this.$root.langs.common["smartspc.common.newPassword"],
                          key:"password"
                      },{
                          type:"password",
                          label: this.$root.langs.common["smartspc.common.confirmPassword"],
                          key:"checkPass"
                      }];
                      that.rules = {
                          passwordOld: [{
                              required: true,
                              message: this.$root.langs.common["smartspc.common.pleaseInput"] + this.kongge + this.$root.langs.common["smartspc.common.oldPassword"],
                              trigger: 'blur'
                          }, {
                              min: 3,
                              max: 20,
                              message: this.$root.langs.common["smartspc.common.between3and20characters"],
                              trigger: 'blur'
                          }],
                          password: [{
                              required: true,
                              validator: (rule, value, callback) => {
                                  if (value === '') {
                                      callback(new Error(this.$root.langs.common["smartspc.common.pleaseInput"] + this.kongge + this.$root.langs.common["smartspc.common.password"]));
                                  } else {
                                      if (this.form.checkPass !== '') {
                                          this.$refs.form.validateField('checkPass');
                                      }
                                      callback();
                                  }
                              },
                              trigger: 'blur'
                          }],
                          checkPass: [{
                              required: true,
                              validator: (rule, value, callback) => {
                                  if (value === '') {
                                      callback(new Error(this.$root.langs.common["smartspc.common.PleaseEnterPasswordAgain"]));
                                  } else if (value !== this.form.password) {
                                      callback(new Error(this.$root.langs.common["smartspc.common.thePasswordsNotMatch"]+'!'));
                                  } else {
                                      callback();
                                  }
                              },
                              trigger: 'blur'
                          }],
                      };
                      break;
                  case "mobile":
                      that.formTitle = this.$root.langs.common["smartspc.common.modify"] + this.kongge + this.$root.langs.common["smartspc.common.mobilephone"];
                      that.formList.push({
                          type:"text",
                          label: this.$root.langs.common["smartspc.common.mobilephone"],
                          key:"mobile"
                      });
                      that.rules = {
                          mobile: [{
                              required: true,
                              message: this.$root.langs.common["smartspc.common.pleaseInput"] + this.kongge + this.$root.langs.common["smartspc.common.mobilephone"],
                              trigger: 'blur'
                          }, {
                              min: 11,
                              max: 11,
                              message: this.$root.langs.common["smartspc.common.pleaseInput"] + this.kongge + this.$root.langs.common["smartspc.common.right"]+ " " +this.$root.langs.common["smartspc.common.mobilephone"],
                              trigger: 'blur'
                          }]
                      };
                      break;
                  case "email":
                      that.formTitle = this.$root.langs.common["smartspc.common.modify"] + this.kongge + this.$root.langs.common["smartspc.common.email"];
                      that.formList.push({
                          type:"text",
                          label: this.$root.langs.common["smartspc.common.email"],
                          key:"email"
                      });
                      that.rules ={
                          email: [{
                              type: 'email',
                              required: true,
                              message: this.$root.langs.common["smartspc.common.pleaseInput"] + this.kongge + this.$root.langs.common["smartspc.common.email"],
                              trigger: 'blur'
                          }]
                      };
                      break;
              }
              this.dialogTableVisible = true;
          },
          async editUser(obj){
              return await this.$post(`${window.gateway}/account/user/modify-profile`,obj);
          },
          save(){
              let that = this;
              that.$refs.form.validate(async (valid) => {
                  if (valid) {
                      if(that.formType === "password"){
                          let obj = {
                              oldPassword: that.form.passwordOld,
                              newPassword: that.form.password
                          };
                          let data = await that.$post(`${window.gateway}/account/user/modify-password`,obj);
                          if (data.code === 0) {
                              that.$success();
                              that.getUserInfo();
                          } else {
                              //that.$error(data.message)
                          }
                          that.dialogTableVisible = false;
                      }else{
                          let obj = {
                              [that.formType]: that.form[that.formType]
                          };
                          let data=await this.editUser(obj);
                          if(data.code===0){
                              that.$success();
                              that.dialogTableVisible = false;
                              that.getUserInfo();
                          }
                      }
                  } else {
                      that.$error('error submit!!');
                      return false;
                  }
              });
          }
      },
      computed:{
          kongge() {
            let en = Lockr.get('locale') == 'en-US';
            return en ? ' ' : '';
          },
          customHeader(){
              return {'token': this.token}
          },
          uploadUrl: function () {
              return `${window.gateway}/storage/common/upload?token=${this.token}`;
          },
          avatar: function () {
              let file;
              if (this.userInfo.avatar) {
                  file = `${window.gateway}/storage/common/download?filename=` + this.userInfo.avatar;
              } else {
                  let fileName = parseInt(this.user.gender) ? "avatar_male.png" : 'avatar_female.png';
                  file = require('../../assets/img/' + fileName)
              }
              return file;
          }
      },
      watch:{
          user(){
              this.setUserInfo();
          },
          dialogTableVisible(){
              if(!this.dialogTableVisible){
                  this.$refs.form.clearValidate();
              }
          }
      }
  }
</script>
<style scoped>
    .main{
        padding: 46px 35px 0;
        min-height: calc(100vh - 240px);
        display: flex;
        background: #fff;
    }
    .iconBox{
        width: 180px;
    }
    .icon{
        width: 120px;
        height: 120px;
    }
    .icon img{
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
    }
    .iconBox a{
        display: inline-block;
        width: 120px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #1989FA;
        border-radius: 4px;
        text-decoration: none;
        font-size: 14px;
        color: #FFFFFF;
    }
    .userInfoList{
        flex: 1;
    }
    .infoBox{
        display: flex;
        border-bottom: 1px solid #EBEEF5;
        padding: 35px 0 12px;
    }
    .infoBox:last-child{
        border-bottom: none;
    }
    .infoBox span{
        font-size: 14px;
        color: #909399;
        line-height: 48px;
    }
    .infoBox span:first-child{
        width: 100px;
    }
    .infoBox span:nth-child(2){
        color: #606266;
        flex: 1;
    }

    .infoBox span:last-child{
        width: 120px;
    }
    .infoBox span:last-child a{
        display: inline-block;
        width: 120px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #F5F5F5;
        border-radius: 4px;
        border:none;
        text-decoration: none;
        color: #c7cdd4;
        font-size: 14px;
    }
    .buttons{
        text-align: right;
    }
</style>
<style>
    .infoBox .tips{
        font-style: normal;
        color: #7ED321;
    }
    .dialogBox input{
        height: 42px;
    }
    .dialogBox .el-dialog{
        padding: 20px 35px 0 20px;
    }
    .dialogBox .el-dialog__body{
        padding-top: 10px;
    }
    .buttons .el-button{
        padding: 12px 35px;
    }
</style>
