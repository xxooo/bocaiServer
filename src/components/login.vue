<template>
  <div id="loginDiv">

  <section id="login" data-htmltype="pc" class="section-wrap scroll-section-0" section_index="0">

    <div class="section dis_txt_high" name="scroll-section-0">
        <div class="login-main" id="login-content">
          <div class="fenghuang">凤凰后台管理系统</div>
            <div id="login_form" name="section-content" class="dis_txt_high login-form animated animate-bounceInDown">
                <div class="login-form-bg rel">
                    <div class="input-area dis_txt_high">
                      <p class="title">管理登录</p>
                      <div class="info">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                          <el-form-item label="帐　号：" prop="username">
                            <el-input v-model="ruleForm.username" size="mini" placeholder="请输入帐号"></el-input>
                          </el-form-item>
                            <el-form-item label="密　码：" prop="password">
                            <el-input v-model="ruleForm.password" type="password" size="mini" placeholder="请输入密码"></el-input>
                          </el-form-item>
                          <el-form-item label="验证码：" prop="yanzhengma">
                            <el-input v-model="ruleForm.yanzhengma" maxlength="5" size="mini" placeholder="验证码" @keyup.enter="login22()"></el-input>
                            <img class="yanzhengimg"  @click="getyanzheng" :src="'data:image/png;base64,'+tupian">
                          </el-form-item>
                          <el-form-item>
                            <el-button size="mini" @click="login('ruleForm')" @keyup.enter="login('ruleForm')">登录</el-button>
                          </el-form-item>
                        </el-form>
                      </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

  </div>
</template>

<script>
import cookieParser from './../assets/js/cookie';

export default {
  data () {
    let vm = this;
    return {
      password: '',
      username: '',
      securitycode: '',
      tupian: '',
      yanzhengma: '',
      ruleForm: {
          username: '',
          password: '',
          yanzhengma: ''
        },
        rules: {
          username: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          yanzhengma: [
            { required: true, message: '必填', trigger: 'blur' },
            {
              validator:function(rule, value, callback){

                console.log('value',value);
                console.log('this.yanzhengma',vm.yanzhengma);
                if(value != vm.yanzhengma){
                  callback('验证码输入不正确!');
                }
                callback();
              },
              trigger: 'blur'
            }
          ]
        }
    }
  },
  created() {
    this.getyanzheng();
    
    if (window.ENV == 'dev') {
      //console.log('研发自动登录');

      this.logindev();

    } else {
      //普通用户登录
       //this.$router.push({name: 'login'});
    }
  },
  methods: {
    login22() {
      console.log('login222');
    },
    async logindev() {
      let that = this;

               let obj = {
                // username: 'gsceshi1',  ydwgongsi1
                // username: 'gsceshi1',
                // password: 'a111111'
                // username: 'admin',
                // password: '123456'
                // username: 'testyunying2',
                // password: 'a111111'
                // username: 'gschaaa',
                // password: 'a111111'
                // username: 'ydwgongsi1',
                // password: 'a111111'
                // username: 'yaoyuny1',
                // password: 'a111111'
                // username: 'hih0759',
                // password: 'aaa888'


                // username: 'xuyunying718',
                // password: 'a111111'
                // username: 'xugongsi718',
                // password: 'a111111'
                // username: 'xgudong1',
                // password: 'a111111'
                // username: 'xgzdaili1',
                // password: 'a111111'
                // username: 'xgzdl11',
                // password: 'a111111'
                // username: 'dxuhuiiyuan1',
                // password: 'a111111'

                // username: '4m30d',
                // password: 'a123'
                username: '4m30dgs2',
                password: 'a123'


                // username: '4m30gd1',
                // password: 'a123'
                // username: '4m30zdl1',
                // password: 'a123'
                // username: '4m3dl1',
                // password: 'a123'

                // username: 'a4m3huiyuan1',
                // password: 'a123'


              };

              let ret = await this.$post(`${window.url}/admin/login`, obj);
              if(ret.code === 200) {
                cookieParser.setCookie("accesstoken", ret.token);

                //cookieParser.setCookie('ruleId', ret.ruleId);

                store.commit('updateruleId', ret.ruleId);

                this.$router.push({name: 'userAgreement'});
              }

              //this.$router.push({name: 'userAgreement'});

    },
    async getyanzheng() {
      let res = await this.$get(`${window.url}/admin/captcha.jpg`);

      if(res.code===200){
        this.tupian = res.tupian;
        this.yanzhengma = res.yanzhengma;
      }
    },
    async login(formName) {
      let that = this;

      console.log('login');

          this.$refs[formName].validate(async (valid) => {

          if (valid) {

              let obj = {
                username: this.ruleForm.username,
                password: this.ruleForm.password
              };

              let ret = await this.$post(`${window.url}/admin/login`, obj);
              if(ret.code === 200) {
                cookieParser.setCookie("accesstoken", ret.token);
                store.commit('updateruleId', ret.ruleId);
                this.$router.push({name: 'userAgreement'});
              }

          } else {

            return false;
          }
        });

    }
  }
}
</script>

<style scoped>
.fenghuang {
  top: 100px;
  left: 200px;
  font-family: SourceHanSansSC-Medium;
  font-size: 80px;
  color: #ebcb80;
  letter-spacing: 0;
  text-align: center;
  position: absolute;
}
#loginDiv {
    background: url(../../static/img/loginBg.jpg) 50% no-repeat fixed;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-size: 100% 100%;
}
#login {
    min-width: 1100px;
    position: relative;
    height: 100%;
    width: 100%;
    overflow: visible;
}
.section {
    position: relative;
    width: 100%;
    height: 100%;
}
.login-main {
    height: 100%;
    min-height: 700px;
    width: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.login-main .login-form {
    position: relative;
    margin: 0 auto;
    padding-top: 10%;
    width: 584px;
    min-height: 590px;
    text-align: left;
    white-space: normal;
    position: relative;
    z-index: 2;
}
.rel {
    position: relative;
}
.login-main .login-form .login-form-bg {
    width: 584px;
    height: 390px;
    padding-top: 20%;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 4px;
    background: url(../../static/img/middlebg.png) center no-repeat;
}
.login-main .login-form .input-area {
    width: 358px;
    height: 260px;
    border-radius: 6px;
    margin: 0 auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #80664b;
}
.title {
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    font-weight: 700;
    position: relative;
    text-align: center;
    overflow: hidden;
    background: hsla(0,0%,100%,.2);
}
.info {
    background-size: 100% 100%;
    padding: 15px 5px;
    font-size: 13px;
    overflow-x: hidden;
    word-break: break-all;
    text-align: center;
}

.yanzhengimg {
  height: 26px;
  top: 8px;
  position: absolute;
  cursor: pointer;
}
/*#login_box {
    z-index: 3;
    width: 320px;
    position: absolute;
    top: 50%;
    left: 56%;
    margin: -180px 0 0 -250px;
    box-shadow: 0 0px 10px 0 rgba(12, 12, 12, 0.63);
    border-radius: 7px;
}
#login_box .box {
    width: 250px;
    margin: 24px auto;
}
#login_box .box input {
}*/
</style>
<style lang="less">
#login {
  .el-form-item__label {
     color: #EBCB80 !important;
  }
  .el-form-item {
    padding: 0px 20px 0px 0px;
    margin-bottom: 10px;
  }
  .el-form-item__content {
    margin-left: 0px; 
  }
}
</style>

