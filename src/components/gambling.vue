<template>
  <div id="main">
    <header id="header">
      <div class="float-left logo">
          <!-- <img src="./../../assets/img/logo.svg"> -->
          <h3>后台管理系统</h3>
      </div>

      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      
        <template v-if="[3,9].findIndex((n) => n==ruleId)>-1">
          <el-menu-item index="1" @click="$router.push({name:'home'})">我的首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">盘势管理</template>
            <el-menu-item v-for="(item,index) in bocaiMenu" :index="'2-'+index" @click="gotokaipan(item)" :key="index">{{item.name}}</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">账号管理</template>
            <el-menu-item index="3-1" @click="$router.push({name:'subuser'})">子帐号</el-menu-item>
            <el-menu-item index="3-2" @click="$router.push({name:'gudong'})">股东</el-menu-item>
            <el-menu-item index="3-3" @click="$router.push({name:'zongdaili'})">总代理</el-menu-item>
            <el-menu-item index="3-4" @click="$router.push({name:'daili'})">代理</el-menu-item>
            <el-menu-item index="3-5" @click="$router.push({name:'huiyuan'})">会员</el-menu-item>
            <el-menu-item index="3-6" @click="$router.push({name:'hidemember'})">隐单账号</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">注单管理</template>
            <el-menu-item index="4-1" @click="$router.push({name:'lineBet'})">流水注单</el-menu-item>
            <el-menu-item index="4-2" @click="$router.push({name:'replenishBet'})">补货注单</el-menu-item>
            <el-menu-item index="4-3" @click="$router.push({name:'betquery'})">注单查询</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">财务管理</template>
            <el-menu-item index="5-1" @click="$router.push({name:'prepaid'})">充值方式</el-menu-item>
            <el-menu-item index="5-2" @click="$router.push({name:'rechargeAudit'})">充值审核</el-menu-item>
            <el-menu-item index="5-3" @click="$router.push({name:'forwardAudit'})">提现审核</el-menu-item>
            <el-menu-item index="5-4" @click="$router.push({name:''})">推广</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">游戏管理</template>
            <el-menu-item index="6-1" @click="$router.push({name:'youxishezhi'})">游戏设置</el-menu-item>
            <el-menu-item index="6-2" @click="$router.push({name:'tuishuiset'})">退水设置</el-menu-item>  
            <el-menu-item index="6-3" @click="$router.push({name:'kaipanshezhi'})">开盘设置</el-menu-item>
            <el-menu-item index="6-4" @click="$router.push({name:'lotteryResults'})">开奖结果</el-menu-item>
            <el-menu-item index="6-5" @click="$router.push({name:'caidansetting'})">菜单设置</el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">系统管理</template>
            <el-menu-item index="7-1" @click="$router.push({name:'webSet'})">网站设置</el-menu-item>
            <el-menu-item index="7-2" @click="$router.push({name:'huiyuangonggao'})">会员公告</el-menu-item>
            <el-menu-item index="7-3" @click="$router.push({name:'huiyuanzaixian'})">会员在线</el-menu-item>
            <el-menu-item index="7-4" @click="$router.push({name:'dailiOnline'})">代理在线</el-menu-item>
          </el-submenu>
          <el-menu-item index="8" @click="$router.push({name:'settingIP'})">IP设置</el-menu-item>
          <el-menu-item index="9" @click="$router.push({name:'baobiaoquery'})">报表</el-menu-item>
        </template>

        <template v-if="[4,5,6,10,11,12].findIndex((n) => n==ruleId)>-1">
          <el-menu-item index="1" @click="$router.push({name:'home'})">我的首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">盘势管理</template>
            <el-menu-item v-for="(item,index) in bocaiMenu" :index="'2-'+index" @click="gotokaipan(item)" :key="index">{{item.name}}</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">账号管理</template>
            <el-menu-item index="3-1" @click="$router.push({name:'subuser'})">子帐号</el-menu-item>
            <el-menu-item index="3-3" @click="$router.push({name:'zongdaili'})" v-if="[4,10].findIndex((n) => n==ruleId)>-1">总代理</el-menu-item>
            <el-menu-item index="3-4" @click="$router.push({name:'daili'})" v-if="[4,5,10,11].findIndex((n) => n==ruleId)>-1">代理</el-menu-item>
            <el-menu-item index="3-5" @click="$router.push({name:'huiyuan'})">会员</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">注单管理</template>
            <el-menu-item index="4-1" @click="$router.push({name:''})">流水注单</el-menu-item>
            <el-menu-item index="4-2" @click="$router.push({name:''})">补货注单</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">游戏管理</template>
            <el-menu-item index="6-2" @click="$router.push({name:'tuishuiset'})">退水设置</el-menu-item>  
            <el-menu-item index="6-3" @click="$router.push({name:'buhuosetting'})">补货设置</el-menu-item>
            <el-menu-item index="6-4" @click="$router.push({name:'lotteryResults'})">开奖结果</el-menu-item>
          </el-submenu>
          <el-menu-item index="9" @click="$router.push({name:'baobiaoquery'})">报表</el-menu-item>
        </template>

        <template v-if="[1,2,7,8].findIndex((n) => n==ruleId)>-1">
          <el-menu-item index="1" @click="$router.push({name:'home'})">首页</el-menu-item>
          <el-menu-item index="10" @click="$router.push({name:'bettingManage'})">投注管理</el-menu-item>

          <el-submenu index="11">
            <template slot="title">游戏设置</template>
            <el-menu-item index="11-1" @click="$router.push({name:'caizhongsetting'})">彩种设置</el-menu-item>
            <el-menu-item index="11-2" @click="$router.push({name:'kaipansetting'})">开盘设置</el-menu-item>
            <el-menu-item index="11-3" @click="$router.push({name:'kaijiangsetting'})">开奖设置</el-menu-item>
          </el-submenu>

          <el-submenu index="12">
            <template slot="title">赔率设置</template>
            <el-menu-item v-for="(item,index) in bocaiMenu" :index="'2-'+index" @click="gotoOddSetting(item)" :key="index">{{item.name}}</el-menu-item>
          </el-submenu>

          <el-menu-item index="13" @click="$router.push({name:'orderClean'})">数据清理</el-menu-item>
          <el-menu-item index="14" @click="$router.push({name:'setip'})">绑定IP</el-menu-item>

          <el-submenu index="15">
            <template slot="title">帐号管理</template>
            <el-menu-item index="15-1" @click="$router.push({name:'childUserManage'})">子帐号管理</el-menu-item>
            <el-menu-item index="15-2" @click="$router.push({name:'company'})">公司管理</el-menu-item>
            <el-menu-item index="15-3" @click="$router.push({name:'yunyingmanager'})" v-if="[1,7].findIndex((n) => n==ruleId)>-1">运营管理</el-menu-item>
          </el-submenu>

          <el-submenu index="16">
            <template slot="title">在线管理</template>
            <el-menu-item index="16-1" @click="$router.push({name:'mainUserOnline'})">会员在线</el-menu-item>
            <el-menu-item index="16-2" @click="$router.push({name:'mainDailiOnline'})">代理在线</el-menu-item>
            <el-menu-item index="16-3" @click="$router.push({name:'huiyuangonggao'})">会员公告</el-menu-item>
          </el-submenu>

        </template>
        
      </el-menu>

      <div class="float-right user">

        <el-dropdown class="lang" @command="menuAction">
          <span class="el-dropdown-link">{{roleName}},{{userInfo.nickname}}<i class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="'修改密码'" key="1">{{'修改密码'}}</el-dropdown-item>
            <el-dropdown-item :command="'退出'" key="2">{{'退出'}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </div>
    </header>
    
    <el-main>
      <div id="content">
        <router-view></router-view>
      </div>
    </el-main>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import cookieParser from './../assets/js/cookie';

export default {
  components: {
  },
  data() {
    return {
      min : 0, //生成的最小的数字，比如200
      max : 9, //生成的最大的数字，比如500
      imgUrl: 0,
      t: null, //轮询
      activeIndex: '1',
      resultList: [],
      preBocaiPeriods: '',
      preResult: '',
      hasResult: false,
      bocaiTypeId: '1',
      bocaiTypeList: [],
      submenu: '更多',
      preResult: '',

      menuList: [],
      gsMenu: ['我的首页','盘势管理','账号管理','绑定IP','注单管理','财务管理','游戏管理','系统管理','报表'],
      glMenu: [],
      bocaiMenu: [{
            "id": "8223",
            "name": "PC蛋蛋",
            "pid": null,
            "dewaterId": null,
            "createDate": null,
            "updateDate": null
        }],
      roleName: '',
      ruleId22: '',

    }
  },
  async created() {

    let token = cookieParser.getCookie("accesstoken");

    if (this.token == '') {
      this.$router.push({name:"login"});
    } else if(this.ruleId == '') {
      this.getUserInfo();
      this.$router.push({name:"home"});
    } else {
      this.getUserInfo();
    }

  },
  computed: {
    ...mapGetters({
      ruleId:'getruleId',
      userInfo: 'getuserInfo'
    })
  },
  methods: {
    gotoOddSetting(item) {
      let path = '';
      switch (item.name) {
          case '重庆时时彩':
            path = 'chongqinduboBase';
            break;
          case '幸运飞艇':
            path = 'luckyairshipBase';
            break;
          case '北京PK拾':
            path = 'beijingpk10Base';
            break;
          case '山东11选5':
            path = 'shandong11xuan5Base';
            break;
          case '广东11选5':
            path = 'guangdong11xuan5Base';
            break;
          case '江西11选5':
            path = 'jiangxi11xuan5Base';
            break;
          case 'PC蛋蛋':
            path = 'pcdandanBase';
            break;
          case '江苏快3':
            path = 'jiangsukuaisanBase';
            break;
          case '北京快乐8':
            path = 'beijingkuaile8Base';
            break;
          case '极速赛车':
            path = 'jisusaicheBase';
            break;
          case '极速时时彩':
            path = 'jisuduboBase';
            break;
      }

      if(path != '') {
        this.$router.push({name: path});
      }
      
    },
    gotokaipan(item) {
      console.log('item',item);
      let path = '';
      switch (item.name) {
          case '重庆时时彩':
            path = 'chongqindubo';
            break;
          case '幸运飞艇':
            path = 'luckyairship';
            break;
          case '北京PK拾':
            path = 'beijingpk10';
            break;
          case '山东11选5':
            path = 'shandong11xuan5';
            break;
          case '广东11选5':
            path = 'guangdong11xuan5';
            break;
          case '江西11选5':
            path = 'jiangxi11xuan5';
            break;
          case 'PC蛋蛋':
            path = 'pcdandan';
            break;
          case '江苏快3':
            path = 'jiangsukuaisan';
            break;
          case '北京快乐8':
            path = 'beijingkuaile8';
            break;
          case '极速赛车':
            path = 'jisusaiche';
            break;
          case '极速时时彩':
            path = 'jisudubo';
            break;
      }

      this.$router.push({name: path});
    },
    async getOdds(id) {
      let res = await this.$get(`${window.url}/admin/bocai/getOdds?userId=`+id);

      if(res.code===200){
        this.bocaiMenu = res.list;

        store.commit('updatebocaiMenu', res.list);

      }
    },
    async getUserInfo() {
      let res = await this.$post(`${window.url}/admin/getSessionAUser`);

      if(res.code===200){
        store.commit('updateuserInfo', res.sessionAUser);

        console.log('userInfo',this.userInfo);

        store.commit('updateruleId', res.sessionAUser.ruleId);

        this.getOdds(res.sessionAUser.id);

        switch (res.sessionAUser.ruleId) {
          case 1:
            this.roleName = '超级管理员';
            break;
          case 2:
            this.roleName = '运营管理员';
            break;
          case 3:
            this.roleName = '公司';
            break;
          case 4:
            this.roleName = '股东';
            break;
          case 5:
            this.roleName = '总代理';
            break;
          case 6:
            this.roleName = '代理';
            break;
          case 7:
            this.roleName = '超级管理员子账号';
            break;
          case 8:
            this.roleName = '运营管理员子账号';
            break;
          case 9:
            this.roleName = '公司子账号';
            break;
          case 10:
            this.roleName = '股东子账号';
            break;
          case 11:
            this.roleName = '总代理子账号';
            break;
          case 12:
            this.roleName = '代理子账号';
            break;
          case 13:
            this.roleName = '会员';
            break;
        }

      }
    },
    async menuAction(menu) {

      if(menu == '退出') {

        this.$router.push({name:"login"});

        let res = await this.$get(`${window.url}/admin/exitLogin`);

        if(res.code===200){
          //this.$router.push({name:"login"});
        }
        
      }

    },
    handleSelect() {

    }

  },
  mounted() {

  },
  updated() {
  }
};


</script>
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
    display: inline-block;
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

 .el-menu.el-menu--horizontal {
    border-bottom: solid 0px #e6e6e6;
    float: left;
    margin-left: 20px;
  }

  .el-menu {
    position: initial;
  }
}

</style>