<template>
	<div class="title-content">
    <div class="wanfaBtn">
      <p class="rule" @click="$router.push({name: 'gameRule'})">玩法规则</p>
        <!-- <el-button type="primary" size="mini">玩法规则</el-button> -->
    </div>
    <div class="winCurrent">
      <span>当前彩种输赢:</span>
      <span class="red">{{bocaiInfoData.winnerMoneySum}}</span>
    </div>
    <div class="kaipangTime">
      <div class="qiciDiv">
        <!-- <p>第 <span class="qiciSpan">{{bocaiInfoData.bocaiPeriods}}</span> 期</p> -->
        <p>距离下期开盘</p>              
      </div>
      <div id="clockTimes">
        <center>
          <span id="clock">{{timeLeft}}</span>
        </center>
      </div>
    </div>    
  </div>
</template>


<script>
  //import { mapGetters } from 'vuex';

	export default {
		props: {
      orderDataList: {
        type: Array
      },
      bocaiCategory: {
        type: Object
      }
		},
		data() {
			return {
        timeLeft:'',
        t: null, //轮询
        bocaiInfoData: {},
        openPrizeTime: 0,
        closeTimeSet: 0
			}
		},
    components: {
		},
		created() {
      //this.refreshBocaiInfo();
      this.gettimeLeft();
    },
    computed:{
      totalMoney() {
        let totalMoney = 0;
        for(let n in this.orderList) {
          totalMoney += this.orderList[n].betsMoney*1;
        }
        return totalMoney;
      }
    },
    mounted(){
      bus.$on('getbocaiInfoData', (data) => {
        this.bocaiInfoData = data;
        this.openPrizeTime = data.openPrizeTime;
        this.closeTimeSet = data.closeTimeSet;
        //this.gettimeLeft();
      });
    },
    beforeDestroy: function() {
      if (this.t) {
        clearTimeout(this.t)
      }
    },
		methods: {
      getRefreshTime() {

      },
      gettimeLeft() {

        var now = new Date();
        var leftTime = this.openPrizeTime - now.getTime();

        var closeTime = leftTime - this.closeTimeSet*1000;

        var closeTimeSet = this.openPrizeTime - this.closeTimeSet*1000;
        //console.log('当前时间',this.timestampToTime(now.getTime()));
        //console.log('封盘时间',this.timestampToTime(closeTimeSet));

        if(closeTime<=0 && leftTime<=0) {
          //console.log('未开盘',this.timestampToTime(this.openPrizeTime));
          //console.log('this.bocaiInfoData.openPrizeTime',this.bocaiInfoData.openPrizeTime);
          this.timeLeft = '00' + ":" + '00' + ":" + '00';

          bus.$emit('isOpenOdds', false);

          $('#clock').addClass('red');

          //$('.bet_box .orders td').removeClass('selected');

          bus.$emit('getRefreshTime', '');

        } 

        if(closeTime<=0 && leftTime>0) {
          var ms = parseInt(leftTime % 1000).toString();
          leftTime = parseInt(leftTime / 1000); 
          var o = Math.floor(leftTime / 3600);
          var d = Math.floor(o / 24);
          var m = Math.floor(leftTime / 60 % 60);
          var s = leftTime % 60;

          this.timeLeft = (o*1> 9 ? o : '0'+ o) + ":" + (m*1> 9 ? m : '0'+ m) + ":" + (s*1 > 9 ? s : '0'+ s);
          //console.log('未开盘',this.timestampToTime(this.openPrizeTime));
          //console.log('this.bocaiInfoData.openPrizeTime',this.bocaiInfoData.openPrizeTime);
          bus.$emit('isOpenOdds', false);

          $('#clock').addClass('red');
        }
        if(closeTime>0) {

          var ms = parseInt(leftTime % 1000).toString();
          leftTime = parseInt(leftTime / 1000); 
          var o = Math.floor(leftTime / 3600);
          var d = Math.floor(o / 24);
          var m = Math.floor(leftTime / 60 % 60);
          var s = leftTime % 60;

          this.timeLeft = (o*1> 9 ? o : '0'+ o) + ":" + (m*1> 9 ? m : '0'+ m) + ":" + (s*1 > 9 ? s : '0'+ s);
          //console.log('开盘时间',this.timestampToTime(this.openPrizeTime));
          //console.log('this.bocaiInfoData.openPrizeTime',this.bocaiInfoData.openPrizeTime);
          bus.$emit('isOpenOdds', true);

          $('#clock').removeClass('red');
        }

        this.t = setTimeout(this.gettimeLeft, 1000);

      },
      timestampToTime(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate()*1 > 9 ? date.getDate() + ' ' : '0' + date.getDate() + ' ';
        var h = date.getHours()*1 > 9 ? date.getHours() + ':' : '0' + date.getHours() + ':';
        var m = date.getMinutes()*1 > 9 ? date.getMinutes() + ':' : '0' + date.getMinutes() + ':';
        var s = date.getSeconds()*1 > 9 ? date.getSeconds() : '0'+ date.getSeconds();
        return Y+M+D+h+m+s;
      }
		}
	}

</script>

<style scoped>
.betQuick {
    text-align: center;
    margin-bottom: 20px;
    margin-top: 14px;
    position: relative;
    height: 67px;
}

.betQuick div {
  display: inline-block;
  float: left;
  margin-left: 20px;
}

.beishu {
  width: 400px;
  height: 67px;
  background: url(./../../../../../static/img/casino-wt.png) bottom no-repeat transparent;
}

.betRight {
  width: 380px;
  margin-left: 50px;
}

.betRBottom label {
  color: #fff;
  float: left;
  padding: 5px 20px 0px 20px;
}

.betRBottom {
  margin-top: 10px;
}

.beishuBtn {
    width: 66.1px;
    height: 67px;
    margin: 0px !important;
    border-radius: 50px;
    cursor: pointer;
}

.beishuBtn a {
  height: 66px;
  line-height: 66px;
  font-weight: bold;
  padding-left: 2px;
}

.beishuBtn:hover {
  color: #ff9800;
}

.beishuBtn.selected {
  color: #ff9800;
  font-size: 16px;
}

.beishuBtn:last-child
{ 
  width: 68.8px;
}

.popup-body {
    overflow-y: auto;
    margin-left: 0px !important;
}

.default-list {
    padding: 8px 10px;
    margin-left: 0px !important;
}

.default-list table {
    margin-top: 5px;
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
}

.default-list table thead {
    background-color: #d6d4de;
    font-weight: 700;
    color: #261238;
}
.default-list table td, .default-list table th {
    text-align: center;
    line-height: 30px;
    border: 1px solid #aca6c2;
    padding: 0 6px;
    position: relative;
}
.default-list table td p, .default-list table th p {
    line-height: 18px;
}
.odds-font {
    color: #d63e35;
    font-weight: 700;
}
.betValue {
    height: 16px;
    width: 60px;
    padding: 0 3px;
    line-height: 16px;
}
button.btn-delete {
    margin-left: 8px;
    width: 50px;
    height: 24px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: #fff;
    outline: none;
}
button.btn-delete {
    line-height: 16px;
    background: #d63e35;
}
.default-list table tr.tab-footer {
    background-color: #d6d4de;
    font-weight: 700;
    color: #261238;
}

.wanfaBtn .rule {
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    width: 100px;
    text-align: center;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 5px;
    color: #efcc9f;
    cursor: pointer;
}
.wanfaBtn .rule:hover {
    background-color: #9b7547;
}
.qiciDiv {
  height: 42px;
  line-height: 42px;
}
</style>

<style lang="less">

</style>
