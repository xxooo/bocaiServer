<template>
  <div id="main">
    <div id="header">
      <el-header height="216">
        <div class="headerFather">
          <div class="fenghuangimg"></div>
          <div class="head-div">
            <div class="centerDiv">
              <!-- <div class="headImg">
                <img :src="icons[imgUrl]">
                <div class="preBocaiPeriods"><p class="qicip">-第 <span>{{preBocaiPeriods}}</span> 期-</p></div>
              </div> -->
              <div class="headLabel" :class="'headLabel'+preResult.length">
                <div class="activeIndex"><h3>{{activeIndex}}</h3></div>
                <div class="preResult">
                  <!-- <ul v-if="hasResult" class="result-list">
                    <li v-for="(item,index) in preResult" :class="'loadanimot'+index" class="bjpk-ran bjpk-ranNo-5 orangeShishiC bounce animated"></li>
                  </ul> -->
                  <ul class="result-list">
                    <li v-for="(item,index) in preResult" :class="['loadanimot'+index,'sizeNum'+preResult.length]" class="bjpk-ran bjpk-ranNo-5 orangeShishiC"></li>
                  </ul>
                </div>
              </div>
              <div class="history_num">
                <div class="btn-group">
                  <a id="show_history" class="active"><span>近期开奖</span></a>
                </div>
                <div class="history_run_num">
                  <ul>
                    <li v-for="item in resultList" :title="item.result">{{item.periods}}<span>{{item.result ? item.result : '暂未开奖'}}</span></li>
                  </ul>
                </div>                                 
              </div>
            </div>
          </div>
          <div class="rightMenu">
            <ul>
              <li @click="$router.push({name: 'instantorder'})">即时注单</li>
              <li @click="$router.push({name: 'bettingHistory'})">下注历史</li>
              <li @click="$router.push({name: 'personalinfo'})">个人资讯</li>
              <li @click="$router.push({name: 'caiwumanager'})">财务管理</li>
              <li @click="$router.push({name: 'lotteryResults'})">开奖结果</li>
              <li @click="$router.push({name: 'gameRule'})">游戏规则</li>
            </ul>
          </div>
        </div>
      </el-header>
      <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#1e140d"
          text-color="#ebcb80"
          active-text-color="#f6e9c7">

          <el-menu-item v-for="(item,index) in bocaiTypeList" :key="index" :index="item.bocaiName"  @click="getOdds(item,index)" v-if="index*1 < 8">{{item.bocaiName}}</el-menu-item>
          <el-submenu v-if="bocaiTypeList.length*1 > 8" key="submenu" index="submenu">
            <template slot="title">{{submenu}}</template>
            <el-menu-item v-for="(item,index) in bocaiTypeList" :key="index" :index="item.bocaiName"  @click="getOdds(item,index)" v-if="index*1 > 7">{{item.bocaiName}}</el-menu-item>
          </el-submenu>

      </el-menu>
    </div>
    
    <el-main>
      <div id="content">
      <left-panel></left-panel>
      <div id="routerMain">
        <router-view></router-view>
      </div>
      </div>
    </el-main>

    <el-footer height="97">
      <div>
        <p>
          <a href="javascript:;">游戏规则</a>
          <a href="javascript:;">关于我们</a>
          <a href="javascript:;">联络我们</a>
          <a href="javascript:;">合作伙伴</a>
          <a href="javascript:;">存款帮助</a>
          <a href="javascript:;">取款帮助</a>
          <a href="javascript:;">常见问题</a>
          <a href="javascript:;">责任博彩</a>
        </p> 
        <p class="golden">比特娱乐城所提供的产品和服务，是由澳门政府 Macau,China Special Economic Zone. 授权和监管</p>
        <p class="golden">Copyright © 比特娱乐城 Reserved</p>
      </div>
    </el-footer>
  </div>
</template>

<script>

import LeftPanel from '@/components/common/leftpanel';
import PageFooter from '@/components/common/pagefooter';

export default {
  components: {
    LeftPanel,
    PageFooter
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
      icons:[
            require('@/assets/img/chongqindubo.png'),
            require('@/assets/img/luckyairship.png'),
            require('@/assets/img/beijingpk10.png'),
            require('@/assets/img/shandong11xuan5.png'),
            require('@/assets/img/guangdong11xuan5.png'),
            require('@/assets/img/jiangxi11xuan5.png'),
            require('@/assets/img/pcdandan.png'),
            require('@/assets/img/jiangsukuaisan.png'),
            require('@/assets/img/beijingkuaile8.png'),
            require('@/assets/img/jisudubo.png'),
            require('@/assets/img/jisudubo.png')
          ]
    }
  },
  async created() {
    this.getBocai();
    this.openPrizeTime = this.$timestampToTimeRi(new Date());

    //this.getPrizeResult();

    this.myTimer();

    //console.log('bocaiName',this.bocaiName);

    this.getbocaoName();

  },
  computed: {
    bocaiName: function() {
      return this.$route.name
    }
  },
  beforeDestroy: function() {
      if (this.t) {
        clearTimeout(this.t)
      }
  },
  methods: {
    myTimer() {

      if(!this.hasResult) {
        for(let n in this.preResult) {
          let kk = parseInt(Math.random() * (this.max - this.min + 1) +this. min);
          $('.loadanimot'+n).html(kk);
          $('.loadanimot'+n).removeClass('bounce animated');
        }
      } else {
        //这里无限循环，不合适

        for(let n in this.preResult) {
          let kk = this.preResult[n];
          $('.loadanimot'+n).html(kk);
          $('.loadanimot'+n).addClass('bounce animated');
        }
      }
      this.t = setTimeout(this.myTimer, 100);
    },
    async getRefreshTime() {
      let res = await this.$get(`${window.url}/api/bocaiInfo?bocaiTypeId=`+this.bocaiTypeId);

      if(res.code===200){

              //if("companyIsOpenSet": "",//该会员上级公司对该期博彩的封盘状态。状态：0删除，1封盘，2开盘。只有开盘才能投注。)
               //if("isOpenSet": "",//管理员对于当期博彩的开关设置) 

              bus.$emit('getbocaiInfoData', res.data);

              if(res.data.preResult == '') {
                if([8555,8806,9057].findIndex((n) => n==this.bocaiTypeId)>-1) {
                  this.preResult = '等待开奖中等待开奖中';
                } else if([8223,8498].findIndex((n) => n==this.bocaiTypeId)>-1) {
                  this.preResult = '等待中';
                } else if([8266].findIndex((n) => n==this.bocaiTypeId)>-1) {
                  this.preResult = '等待开奖中等待开奖中等待开奖中等待开奖中';
                } else {
                  this.preResult = '等待开奖中';
                }
                
                this.hasResult = false;

                console.log('等待开奖中this.preResult',this.preResult);
              } else {
                this.preResult = res.data.preResult.split(',');
                this.hasResult = true;
              }

              this.preBocaiPeriods = res.data.preBocaiPeriods;  //"preBocaiPeriods": "30763817",//上期博彩期数    

            }

            console.log('getRefreshTime',window.refreshTime);
    },
    async refreshTime() {
      let res = await this.$get(`${window.url}/api/bocaiInfo?bocaiTypeId=`+this.bocaiTypeId);

            if(res.code===200){

              //if("companyIsOpenSet": "",//该会员上级公司对该期博彩的封盘状态。状态：0删除，1封盘，2开盘。只有开盘才能投注。)
               //if("isOpenSet": "",//管理员对于当期博彩的开关设置) 

              bus.$emit('getbocaiInfoData', res.data);

              if(res.data.preResult == '') {
                if([8555,8806,9057].findIndex((n) => n==this.bocaiTypeId)>-1) {
                  this.preResult = '等待开奖中等待开奖中';
                } else if([8223,8498].findIndex((n) => n==this.bocaiTypeId)>-1) {
                  this.preResult = '等待中';
                } else if([8266].findIndex((n) => n==this.bocaiTypeId)>-1) {
                  this.preResult = '等待开奖中等待开奖中等待开奖中等待开奖中';
                } else {
                  this.preResult = '等待开奖中';
                }
                this.hasResult = false;

              } else {

                this.preResult = res.data.preResult.split(',');
                this.hasResult = true;

              }

              //this.preResult = res.data.preResult == '' ? '等待开奖中' : res.data.preResult.split(',');   //"preResult": 
              this.preBocaiPeriods = res.data.preBocaiPeriods;  //"preBocaiPeriods": "30763817",//上期博彩期数    

            }

          console.log('refreshbocaiInfo',window.refreshTime);
          this.t = setTimeout(this.refreshTime, window.refreshTime);
    },
    async bocaiInfo() {

        let res = await this.$get(`${window.url}/api/bocaiInfo?bocaiTypeId=`+this.bocaiTypeId);

            if(res.code===200){

              //if("companyIsOpenSet": "",//该会员上级公司对该期博彩的封盘状态。状态：0删除，1封盘，2开盘。只有开盘才能投注。)
               //if("isOpenSet": "",//管理员对于当期博彩的开关设置) 

              bus.$emit('getbocaiInfoData', res.data);

              if(res.data.preResult == '') {

                if([8555,8806,9057].findIndex((n) => n==this.bocaiTypeId)>-1) {
                  this.preResult = '等待开奖中等待开奖中';
                } else if([8223,8498].findIndex((n) => n==this.bocaiTypeId)>-1) {
                  this.preResult = '等待中';
                } else if([8266].findIndex((n) => n==this.bocaiTypeId)>-1) {
                  this.preResult = '等待开奖中等待开奖中等待开奖中等待开奖中';
                } else {
                  this.preResult = '等待开奖中';
                }
                this.hasResult = false;

              } else {

                this.preResult = res.data.preResult.split(',');
                this.hasResult = true;
              }

              this.preBocaiPeriods = res.data.preBocaiPeriods;  //"preBocaiPeriods": "30763817",//上期博彩期数    

            }

    },
    handleSelect(key, keyPath) {
      this.activeIndex = key;
    },
    async getBocai() {
      let res = await this.$get(`${window.url}/api/getBocai`);

          if(res.code===200){
            this.bocaiTypeList = res.bocaiTypeList;
          }
    },
    async getPrizeResult() { 

      console.log('openPrizeTime',this.openPrizeTime);

      let res = await this.$get(`${window.url}/api/openPrizeResult?bocaiTypeId=`+this.bocaiTypeId+`&currentPage=1&pageSize=100&dayStr=`+this.openPrizeTime);
          if(res.code===200){
            this.resultList = res.list.slice(0,5);
            for(let n in this.resultList) {
              if(this.resultList[n].result) {
                this.resultList[n].result = this.resultList[n].result.replace(/,/g,'');   
              }
            }
          }

        this.t = setTimeout(this.getPrizeResult, window.refreshTime);
    },
    getbocaoName() {

      let path = '';
        switch (this.bocaiName) {
          case 'chongqindubo':
            this.bocaiTypeId = '1';
            this.imgUrl = 0;
            break;
          case 'luckyairship':
            this.bocaiTypeId = '8555';
            this.imgUrl = 1;
            break;
          case 'beijingpk10':
            this.bocaiTypeId = '8806';
            this.imgUrl = 2;
            break;
          case 'shandong11xuan5':
            this.bocaiTypeId = '8811';
            this.imgUrl = 3;
            break;
          case 'guangdong11xuan5':
            this.bocaiTypeId = '8374';
            this.imgUrl = 4;
            break;
          case 'jiangxi11xuan5':
            this.bocaiTypeId = '8813';
            this.imgUrl = 5;
            break;
          case 'pcdandan':
            this.bocaiTypeId = '8223';
            this.imgUrl = 6;
            break;
          case 'jiangsukuaisan':
            this.bocaiTypeId = '8498';
            this.imgUrl = 7;
            break;
          case 'beijingkuaile8':
            this.bocaiTypeId = '8266';
            this.imgUrl = 8;
            break;
          case 'jisusaiche':
            this.bocaiTypeId = '9057';
            this.imgUrl = 9;
            break;
          case 'jisudubo':
            this.bocaiTypeId = '8815';
            this.imgUrl = 9;
            break;
        }


        this.getPrizeResult();
        this.refreshTime();

    },
    async getOdds(item,index) {

      console.log('item',item);

      if(index*1 > 7) {
        console.log(item); 
        this.submenu = item.bocaiName;
      } else {
        this.submenu = '更多';
      }

      let path = '';
        switch (item.bocaiName) {
          case '重庆时时彩':
            path = 'chongqindubo';
            this.imgUrl = 0;
            break;
          case '幸运飞艇':
            path = 'luckyairship';
            this.imgUrl = 1;
            break;
          case '北京PK拾':
            path = 'beijingpk10';
            this.imgUrl = 2;
            break;
          case '山东11选5':
            path = 'shandong11xuan5';
            this.imgUrl = 3;
            break;
          case '广东11选5':
            path = 'guangdong11xuan5';
            this.imgUrl = 4;
            break;
          case '江西11选5':
            path = 'jiangxi11xuan5';
            this.imgUrl = 5;
            break;
          case 'PC蛋蛋':
            path = 'pcdandan';
            this.imgUrl = 6;
            break;
          case '江苏快3':
            path = 'jiangsukuaisan';
            this.imgUrl = 7;
            break;
          case '北京快乐8':
            path = 'beijingkuaile8';
            this.imgUrl = 8;
            break;
          case '极速赛车':
            path = 'jisusaiche';
            this.imgUrl = 9;
            break;
          case '极速时时彩':
            path = 'jisudubo';
            this.imgUrl = 10;
            break;
        }
      this.bocaiTypeId = item.bocaiId;
      this.bocaiInfo();
      this.$router.push({name: path});

      this.getPrizeResult();

      bus.$emit('getcUserInfo', '');
    }
  },
  mounted() {
    bus.$on('getRefreshTime', (data) => {
        this.getRefreshTime();
    });
    bus.$on('curactiveIndex', (data) => {
        this.activeIndex = data;
    });

  },
  updated() {
  }
};


</script>
<style scoped>
  #content {
    width: 1100px;
    margin: 0 auto;
    position: relative;
    background-color: #6c3092;
  }
  #routerMain {
    height: 100%;
  }

  .centerDiv >div {
    float: left;
    height: 136px;
  }
  .headLabel {
    color: #fff;
    width: 380px;
  }
  .headLabel.headLabel10 {
    width: 300px;
    margin: 0px 20px;
  }
  .headLabel h3 {
    color: #805933;
  }
  .headLabel .activeIndex,.headLabel .preBocaiPeriods {
    margin: 10px 0px 10px -20px;
  }
  .headLabel .preResult {
    margin: 20px 0;
  }

  .headLabel.headLabel10 .preResult {
    margin: 0;
  }

  .head-div {
    height: 140px;
    width: 800px;
    padding-top: 1.1%;
    margin: 0 auto;
    background: url(../../static/img/caibaobg.png) center no-repeat;
    background-size: 100% 100%;
    display:inline-block;
  }
  .centerDiv {
    height: 140px;
    width: 700px;
    margin: 0 auto;
    position: relative;
    background: url(../../static/img/kaijiangbg.png) center no-repeat;
    background-size: 100% 100%;
  }
  .history_num {
    width: 160px;
    text-align: left;
  }
  .history_num li {
    color: #ff9800;
  }
  .history_num li span {
    color: #805933;
    padding: 0 10px;
  }
  .history_num .btn-group {
    text-align: left;
    color: #805933;
    margin: 10px 5px 2px;
  }
  .fenghuangimg {
    height: 155px;
    width: 210px;
    position: absolute;
    margin-left: 2%;
    background: url(../../static/img/logo.png) center no-repeat;
    background-size: 100% 100%;
  }
  .rightMenu {
    background: #3d270d;
    border: 1px solid #8f541b;
    border-radius: 6px;
    margin-top: 5px;
    margin-left: 50px;
    float: right;
    height: 144px;
    width: 80px;
    display: inline-block;
    position: absolute;
  }
  .rightMenu li {
    margin: 2.7px;
  }
  .rightMenu li:hover {
    color: #f6e9c7;
  }
  .headImg >img {
    height: 70px;
    margin-top: 25px;
  }
  .headImg {
    margin-left: 10px;
    width: 146px;
  }
  .game-result ul {
    margin: 10px 10px 0;
  }
  /*.bjpk-ran {
    width: 60px;
    height: 60px;
    line-height: 60px;
    margin: 0px 3px;
  }*/
  .bjpk-ran.sizeNum5 {
    width: 60px;
    height: 60px;
    line-height: 60px;
    margin: 0px 3px;
  }
  .bjpk-ran.sizeNum10 {
    width: 45px;
    height: 45px;
    line-height: 45px;
    margin: 0px 3px;
  }
  .bjpk-ran.sizeNum3 {
    width: 80px;
    height: 80px;
    line-height: 80px;
    margin: 0px 3px;
  }
  .bjpk-ran.sizeNum20 {
    width: 30px;
    height: 30px;
    line-height: 30px;
    margin: 0px 3px;
    font-size: 18px !important;
  }
  .bjpk-ran, .bjpk-ran-s {
    display: inline-block;
    color: #fff;
    border-radius: 50px;
    font-family: Microsoft YaHei,Verdana,SimSun,Arial,Helvetica,sans-serif;
    font-size: 28px;
  }
  .bjpk-ranNo-1 {
    background-color: #ffd64c;
  }
  .orangeShishiC {
    background: url(../../static/img/num_bg.png) center no-repeat;
  }
  .game-result li {
    width: 24px;
    height: 26px;
    color: #fff;
    font-weight: 700;
    text-align: center;
    margin-left: 8px;
    display: inline-block;
    vertical-align: middle;
  }
  .preBocaiPeriods .qicip {
    color: #80664b;
  }
  .preBocaiPeriods .qicip span {
    color: #ff9800;
  }
  .headerFather {
    width: 1200px;
    margin: 0 auto;
  }
</style>
<style lang="less">
#main {
    width: 100%;
    height: 100%;
    position: relative;

  #header {
    border-bottom: solid 2px #ffd04b;

    .el-menu--horizontal {
      background-color: rgb(60, 37, 109);
      font-size: 14px;
      width: 1100px;
      margin: 0 auto;
      border-bottom: solid 0px #ffd04b;
    }

    .el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
      border-bottom: 0px solid #6C3092;
      font-size: 18px;
    }

    .el-menu-item.is-active {
      background-size: 100% 100%;
      color: #ffea00;
      cursor: point;
      border-bottom: 0px solid #6c3092;
    }

    .el-menu-item:hover {
      color: #f6e9c7 !important;
    }

    .el-menu-item {
      padding: 0 18px;
      font-family: SourceHanSansSC-Medium;
      font-size: 18px;
      letter-spacing: 0;
    }

  }

  .el-menu--horizontal>.el-menu-item {
    border-bottom: 0px solid transparent;
  }
      
    header {
        top: 0;
        left: 0;
        right: 0;
        height: 156px;
        background: url(../../static/img/header.png) center no-repeat;
        background-size: 100% 100%;
    }

    .el-header {
      padding: 0px;
    }


  footer {
    color: #fff;
    font-size: 12px;
    padding-bottom: 10px;
  }
  footer div {
      width: 1100px;
      text-align: center;
      margin: 0 auto;
      padding-top: 20px;
  }
  footer p {
      height: 24px;
      line-height: 24px;
      padding-bottom: 5px;
  }
  footer p a {
      color: #fff;
      padding: 0 10px;
      font-size: 13px;
  }

  .el-main {
    padding: 0px;
  }

}

</style>