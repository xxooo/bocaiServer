<template>
  <div id="main">
    <header id="header">
      <div class="float-left logo">
          <!-- <img src="./../../assets/img/logo.svg"> -->
          <h3>后台管理系统</h3>
      </div>
      <div class="float-right user">

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
    </header>
    
    <el-main>
      <div id="content">
        <router-view></router-view>
      </div>
    </el-main>

  </div>
</template>

<script>


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