<template>
  <div id="main">
    <header id="header">
      <div class="float-left logo">
          <!-- <img src="./../../assets/img/logo.svg"> -->
          <h3>后台管理系统</h3>
      </div>

      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1" @click="$router.push({name:'home'})">我的首页</el-menu-item>
        <el-submenu index="2">
          <template slot="title">盘势管理</template>
          <el-menu-item v-for="(item,index) in bocaiMenu" :index="'2-'+index" @click="gotokaipan(item)" :key="index">{{item.name}}</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">账号管理</template>
          <el-menu-item index="3-1" @click="$router.push({name:'subuser'})">子帐号</el-menu-item>
          <el-menu-item index="3-2" @click="$router.push({name:'gudong'})">股东</el-menu-item>
          <el-menu-item index="3-3" @click="$router.push({name:''})">总代理</el-menu-item>
          <el-menu-item index="3-4" @click="$router.push({name:''})">代理</el-menu-item>
          <el-menu-item index="3-5" @click="$router.push({name:'huiyuan'})">会员</el-menu-item>
          <el-menu-item index="3-6" @click="$router.push({name:''})">隐单账号</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">注单管理</template>
          <el-menu-item index="4-1" @click="$router.push({name:''})">流水注单</el-menu-item>
          <el-menu-item index="4-2" @click="$router.push({name:''})">补货注单</el-menu-item>
          <el-menu-item index="4-3" @click="$router.push({name:''})">注单查询</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">财务管理</template>
          <el-menu-item index="5-1" @click="$router.push({name:''})">充值方式</el-menu-item>
          <el-menu-item index="5-2" @click="$router.push({name:''})">充值审核</el-menu-item>
          <el-menu-item index="5-3" @click="$router.push({name:''})">提现审核</el-menu-item>
          <el-menu-item index="5-4" @click="$router.push({name:''})">推广</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">游戏管理</template>
          <el-menu-item index="6-1" @click="$router.push({name:'youxishezhi'})">游戏设置</el-menu-item>
          <el-menu-item index="6-2" @click="$router.push({name:'tuishuiset'})">退水设置</el-menu-item>  
          <el-menu-item index="6-3" @click="$router.push({name:'kaipanshezhi'})">开盘设置</el-menu-item>
          <el-menu-item index="6-4" @click="$router.push({name:'kaijiangjieguo'})">开奖结果</el-menu-item>
          <el-menu-item index="6-5">菜单设置</el-menu-item>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title">系统管理</template>
          <el-menu-item index="7-1" @click="$router.push({name:''})">网站设置</el-menu-item>
          <el-menu-item index="7-2" @click="$router.push({name:'huiyuangonggao'})">会员公告</el-menu-item>
          <el-menu-item index="7-3" @click="$router.push({name:'huiyuanzaixian'})">会员在线</el-menu-item>
          <el-menu-item index="7-4" @click="$router.push({name:''})">代理在线</el-menu-item>
        </el-submenu>
        <el-menu-item index="8" @click="$router.push({name:''})">IP设置</el-menu-item>
        <el-menu-item index="9" @click="$router.push({name:''})">报表</el-menu-item>
      </el-menu>
      <!-- <el-dropdown class="lang" @command="menuAction">
          <span class="el-dropdown-link">{{'公司,徐瑶'}}<i class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="'修改密码'" key="1">{{'修改密码'}}</el-dropdown-item>
            <el-dropdown-item :command="'退出'" key="2">{{'退出'}}</el-dropdown-item>
          </el-dropdown-menu>



          <el-menu-item index="1">处理中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="3" disabled>消息中心</el-menu-item>
          <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>

      </el-dropdown> -->
      <div class="float-right user">

        <!-- <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#fff"
            text-color="#ebcb80"
            active-text-color="#f6e9c7">

            <el-menu-item v-for="(item,index) in menuList" :key="index" :index="item"  @click="getOdds(item,index)" v-if="index*1 < 8">{{item}}</el-menu-item>
            <el-submenu v-if="menuList.length*1 > 8" key="submenu" index="submenu">
              <template slot="title">{{submenu}}</template>
              <el-menu-item v-for="(item,index) in menuList" :key="index" :index="item"  @click="getOdds(item,index)" v-if="index*1 > 7">{{item}}</el-menu-item>
            </el-submenu>

        </el-menu> -->


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

export default {
  components: {
  },
  data() {
    return {
      min : 0, //生成的最小的数字，比如200
      max : 9, //生成的最大的数字，比如500
      imgUrl: 0,
      t: null, //轮询
      activeIndex: '重庆时时彩',
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
      roleName: ''
    }
  },
  async created() {
    console.log('ruleId',this.ruleId);

    if(this.ruleId == 3) {
      this.menuList = this.gsMenu;
    } else if(this.ruleId == '') {
      this.$router.push({name:"login"});
    }

    this.getUserInfo();

  },
  computed: {
    ...mapGetters({
      ruleId:'getruleId',
      userInfo: 'getuserInfo'
    })
  },
  methods: {
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
        let res = await this.$get(`${window.url}/admin/exitLogin`);

        if(res.code===200){
          this.$router.push({name:"login"});
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
    width: 1000px;
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
  }

  .el-menu {
    position: initial;
  }
}

</style>