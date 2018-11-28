<template>
	<header id="header">
		<div class="float-left logo">
        <img src="./../../assets/img/logo.svg">
        <h3>Quality Cloud - SPC</h3>
        <span style="margin-left: 10px">{{version}}</span>
      </div>
      <div class="float-right user">
         <!--<router-link class="icon-msg" :to="{path:'/spc/alarmBoard'}">{{untreat}}</router-link>-->
         <message-notification></message-notification>
        <i class="iconfont icon-guojihua"></i>
        <el-dropdown class="lang"  @command="changeLang">
              <span class="el-dropdown-link">{{language}}<i class="el-icon-arrow-down el-icon--right"></i></span>
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(lang,index) in langCategories" :command="lang.code" :key="index">{{lang.languageName}}</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
        <span style="cursor: pointer" @click.stop="showSettingBox">{{$root.langs.common['smartspc.common.hi']}}, {{user.name}}</span>
        <img class="icon" :src="avatar" @click.stop="showSettingBox">
        <div class="settingBox" v-show="setting" :class="{flipInY}" @click.stop="">
          <div class="userInfoBox">
            <img :src="avatar">
            <div class="userInfo">
              <div v-text="user.name"></div>
              <div v-text="user.email"></div>
              <div v-text="user.mobile"></div>
            </div>
          </div>
          <div class="navList" @click="toSetting">
            <img src="./../../assets/img/setting.png"><span>{{$root.langs.common['smartspc.common.accountSetting']}}</span>
          </div>
          <div class="navList" @click="signOut">
            <img src="./../../assets/img/logout.png"><span>{{$root.langs.common['smartspc.common.logout']}}</span>
          </div>
        </div>
      </div>
	</header>
</template>


<script>
  import {
    mapGetters
  } from 'vuex'
	import {menus, setLang as setMenuLang} from './../../common/menu.js';
	import {setLang, getFirstLanguage} from './../../common/lang.js';
	import $cookie from './../../common/cookie.js';
	let defaultProps = {
	    children: 'children',
	    label: 'name'
	};

	export default {
		props: {
		},
		data() {
			return {
         untreat:0,//未处理
				 flipInY:false,
	             isCollapse: false,
	             menus: menus,
	             user:{},
	             username: '',
	             defaultProps,
	             pagesize: this.$cfg.pagesize,
               version: window.globalConfig.version,
	             setting:false,
	             langCategories: [],
	             treeOrgs: [],
	             users: {count: 0, rows: []},
	             isChooseUserDisplay: false,
	             selectedOrgId: null,
	             selectedUserIds: [],
	             confirm: null,
	             language: 'English'
			}
		},
    components: {
      messageNotification: resolve => require(['./messageNotification.vue'], resolve)
		},
		async created() {
	         let that = this;
	         // 获取当前用户
	         this.user = await this.$currUser();

           store.commit('updateavatarVuex', this.user.avatar);

	         // 初始化语言下拉列表
	         let categories= (await this.$get(`${window.i18n}/i18nLanguageSet/searchI18nLanguageSet`)).result;
	         categories.forEach(x => (x.code = x.languageCode + '-' + x.languageNation));
	         this.langCategories = categories;

	         let firstLangCode = getFirstLanguage();
	         this.language = categories.find(x => x.code == firstLangCode || x.languageCode == firstLangCode).languageName;

    },
    computed:{
          ...mapGetters({
            avatarVuex:'getavatarVuex'
          }),
         avatar(){
           let file;
           if (this.avatarVuex) {
             file = `${window.gateway}/storage/common/download?filename=${this.avatarVuex}`
           } else {
             let fileName = parseInt(this.user.gender) ? "avatar_male.png" : 'avatar_female.png';
             file = require('./../../assets/img/' + fileName)
           }
           return file;
         }
     },
    mounted(){
         let that=this;
         document.body.onclick=function(){
           that.setting=false;
         };
     },
		methods: {
			   async changeLang(code){
             await setLang(code);
             await setMenuLang(code);

             //en-US zh-CN 判断是中文还是英文
             if(code == 'en-US') {
                Lockr.set('locale', 'en-US');
             } else if(code == 'zh-CN') {
                Lockr.set('locale', 'zh-CN');
             } else {
                Lockr.set('locale', 'zh-TW');
             }

             let l = this.langCategories.find(x => x.code == code);
             this.language = l.languageName;

             this.$router.go(0);
         	},
          //设置
         toSetting(){
             this.$router.push({path:"/spc/setting"});
             this.setting=false;
         },
         //退出
         async signOut(){
             let data = await this.$post(`${window.account}/user/logout`);
             if(data.code === 0) {
                 let host = window.location.host;
                 let domain = host.substr(host.indexOf('.'));
                 $cookie.setCookie("token", '', -1, domain);
                 window.location.href = `${window.login}/index.html?redirect_url=${window.location.protocol}//${window.location.host}`;
             }
         },
         showSettingBox(){
           this.setting = !this.setting;
           this.flipInY = this.setting;
         }
		}
	}
</script>

<style scoped lang="less">
	@iconHover: #62b0ff;

	.avatar {
		width: auto;
	}

</style>
<style lang="less">
#header {

  .logo{
    height: 60px;
    overflow: hidden;
    padding-left: 15px;
  }

  .logo img {
    height: 35px;
    vertical-align: middle;
  }

  .logo h3{
    display: inline-block;
    margin: 0 0 0 5px;
    vertical-align: middle;
    font-size: 24px;
    line-height: 60px;
  }

  .logo.fullTitle h3{
      line-height: 45px;
    }

  .el-main{
    position: relative;
    display:block;
  }

  .el-menu{
    width: 100%;
  }

  .user{
    position: relative;
  }

  .icon {
    position: relative;
    display: inline-block;
    margin: 16px 0 0 7px;
    vertical-align: top;
    width: 30px;
    height: 30px;
    cursor: pointer;
    border-radius: 21px;
  }
  .settingBox {
    border-radius: 2px;
    box-shadow: 0 0 8px #383732;
    width: 320px;
    top: 66px;
    right: -20px;
    z-index: 10;
    position: absolute;
    background: #fff;
  }
  .userInfoBox {
    overflow: hidden;
    padding: 20px 15px;
    border-bottom: 1px solid #e2e2e2;
  }
  .userInfoBox img {
    width: 100px;
    height: 100px;
    border-radius: 5px;
    float: left;
  }
  .settingIcon img{
    width: 100%;
    height: 100%;
  }
  .userInfo {
    float: right;
    width: 175px;
    font-size: 12px;
    color: #999;
    text-align: left;
    line-height: 12px;
  }
  .userInfo div:first-child{
    font-size: 20px;
    color: #162134;
    line-height: 34px;
    margin-bottom: 10px;
  }
  .userInfo div{
    font-size: 14px;
    line-height: 24px;
  }
  .navList{
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #e2e2e2;
    padding: 0 25px;
    transition: all .5s;
    text-align: left;
  }
  .navList:last-child{
    border: 0;
    padding-left: 22px;
  }
  .navList:hover{
    cursor: pointer;
    background: #e2e2e2;
  }
  .navList img{
    width: 18px;
    height: 18px;
    vertical-align: middle;
    margin: -5px 20px 0 0;
  }
  .navList:last-child img{
    width: 22px;
    height: 22px;
  }
  @keyframes flipInY{
    0%{
      transform:perspective(400px) rotateY(90deg);
      animation-timing-function:ease-in;
      opacity:0
    }
    40%{
      transform:perspective(400px) rotateY(-20deg);
      animation-timing-function:ease-in
    }
    60%{
      transform:perspective(400px) rotateY(10deg);
      opacity:1
    }
    80%{
      transform:perspective(400px) rotateY(-5deg)
    }
    to{
      transform:perspective(400px)
    }
  }
  .flipInY{
    backface-visibility:visible!important;
    animation-name:flipInY;
    animation-duration: 1s;
    animation-fill-mode: both;
    transform:scale(1) rotate(0deg);
  }

 .lang{
     margin-right: 30px;
 }
 .lang.el-dropdown {
    cursor: pointer;
 }
 .float-right {
  float: right;
  line-height: 60px;
  padding-right:15px;
 }
}

</style>
