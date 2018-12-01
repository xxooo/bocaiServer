<template>
	<div class="betQuick">
    <div class="beishu">
      <div class="beishuBtn beishuBtn10" @click="orderMul(10)"><a>10</a></div>
      <div class="beishuBtn beishuBtn50" @click="orderMul(50)"><a>50</a></div>
      <div class="beishuBtn beishuBtn100" @click="orderMul(100)"><a>100</a></div>
      <div class="beishuBtn beishuBtn500" @click="orderMul(500)"><a>500</a></div>
      <div class="beishuBtn beishuBtn1000" @click="orderMul(1000)"><a>1000</a></div>
      <div class="beishuBtn beishuBtn5000" @click="orderMul(5000)"><a>5000</a></div>
    </div>
    <div class="betRight">
      <div class="betRTop">
        <el-input v-model.number="moneyOrder" :disabled="!disableBtn" size="mini" placeholder="请输入金额" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"></el-input>
        <el-button type="primary"size="mini" plain @click="orderOdds()" :disabled="!isOpenOdds">下 注</el-button>
        <el-button type="danger" size="mini" @click="reset()">重 置</el-button>
      </div>
      <div class="betRBottom">
        <label>投注类型:</label>
        <el-radio-group v-model="normalPay" size="mini" @change="changePay">
          <el-radio :label="false" border>快捷</el-radio>
          <el-radio :label="true" border>一般</el-radio>
        </el-radio-group>
      </div>
    </div>


    <el-dialog
      title="下注明细(请确认注单)"
      :visible.sync="orderOddsVisible"
      center>

      <div class="popup-body" style="max-height: 300px;">
        <div class="default-list">
          <table>
            <thead>
              <th>号码</th> 
              <th width="20%">赔率</th> 
              <th width="20%">金额</th> 
              <th width="15%">操作</th>
            </thead> 
            <tr v-for="(item,index) in orderList">
              <td class="combine-td"><p>{{item.oddNames}}</p></td> 
              <td class="odds-font">{{item.bocaiOdds}}</td> 
              <td><input type="text" class="betValue" v-model="item.betsMoney"></td> 
              <td><button class="btn-delete" @click="deleteOdd(index)">删除</button></td>
            </tr>
            <tr class="tab-footer">
              <td>组数：<span>{{orderList.length}}</span></td> 
              <td colspan="3">总金额：<span>{{totalMoney}}</span></td>
            </tr>
          </table>
        </div>
      </div> 

      <span slot="footer" class="dialog-footer">
        <el-button @click="orderOddsVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="orderSub()" size="medium">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>


<script>
  //import { mapGetters } from 'vuex';

  $(document).ready(function(){
    $(".beishuBtn").mousedown(function(){
      console.log('onmousedown');
      $(this).addClass('addPayChouMa');

    });
    $(".beishuBtn").mouseup(function(){
      console.log('onmouseup');
      $(this).removeClass('addPayChouMa');
    });
  });

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
        moneyOrder: '',
        radio10: '1',
        orderOddsVisible: false,
        orderList: [],
        hahahaid: '',
        bocaiTypeId: '',
        bocaiTypeName: '',
        cuserId: '',
        bocaiInfoData: {},
        normalPay: false,
        isOpenOdds: true,
        canOrder: true,
        disableBtn: true,
        cashBalance: '',
        choumaPay: 0,
        orderDatas: {
          periodsId:'',//投注期数ID
          bocaiTypeId:'',//投注博彩ID
          bocaiTypeName:'',//投注博彩名称
          bocaiCategory1Id:'',//投注博彩分类1ID
          bocaiCategory1Name:'',//投注博彩分类1名称
          orderBetMoneySum:0,//投注总和
          cuserId:'',//当前登录ID
          list:[]
        }
			}
		},
    components: {
		},
		created() {
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
      bus.$on('getbocaiTypeId', (data) => {
        this.bocaiTypeId = data;
      });
      bus.$on('getbocaiTypeName', (data) => {
        this.bocaiTypeName = data;
      });
      bus.$on('getcuserId', (data) => {
        this.cuserId = data;
      });
      bus.$on('getbocaiInfoData', (data) => {
        this.bocaiInfoData = data;
      });
      bus.$on('isOpenOdds', (data) => {
        this.isOpenOdds = data;
      });
      bus.$on('getnormalPay', (data) => {
        this.normalPay = data;
      });
      bus.$on('getcashBalance', (data) => {
        this.cashBalance = data;
      });
      bus.$on('getcanOrder', (data) => {
        this.canOrder = data;

        console.log('this.canOrder',this.canOrder);
      });
    },
		methods: {
      changePay(data) {
        this.$emit('childByChangePay', data);
        this.moneyOrder = '';
      },
      reset() {
        this.moneyOrder = '';
        this.$emit('childByReset', 'reset');
      },
      deleteOdd(index) {
        this.orderList.splice(index,1);
        if(this.orderList.length == 0) {
          this.orderOddsVisible = false;
        }
      },
      async orderSub() {

        if(this.totalMoney > this.cashBalance) {
          this.$alertMessage('您的余额不足!', '温馨提示');
        } else {

          console.log('this.bocaiTypeName',this.bocaiTypeName);

          this.orderDatas.list = [];

          this.orderDatas.periodsId = this.bocaiInfoData.bocaiPeriodsId;
          this.orderDatas.bocaiTypeId = this.bocaiTypeId;
          this.orderDatas.bocaiTypeName = this.bocaiTypeName;
          this.orderDatas.bocaiCategory1Id = this.bocaiCategory.id;
          this.orderDatas.bocaiCategory1Name = this.bocaiCategory.name;
          this.orderDatas.orderBetMoneySum = this.totalMoney;
          this.orderDatas.cuserId = this.cuserId;

          for(let n in this.orderList) {
            let obj = {
              bocaiCategory2Id: this.orderDataList[n].bocaiCategory2Id,//8225,//投注博彩分类2ID
              bocaiCategory2Name: this.orderDataList[n].bocaiCategory2Name,//"混合",//投注博彩分类2名称
              bocaiOddId: this.orderDataList[n].bocaiOddId,//5543,//投注博彩赔率ID
              bocaiOddName: this.orderDataList[n].bocaiOddName,//"大",//投注博彩赔率名称
              bocaiValue: this.orderDataList[n].bocaiValue,//投注内容,六合彩连肖/连尾
              betsMoney: this.orderList[n].betsMoney,//10000,//一般模式下，选择的金额
              bocaiOdds: this.orderDataList[n].bocaiOdds,//1.90//赔率
              dewaterId: this.orderDataList[n].dewaterId //退水ID
            }
            this.orderDatas.list.push(obj);
          }

          console.log('this.orderDatas',this.orderDatas);

          this.orderOddsVisible = false;
          
          let that = this;
          NProgress.start();
          await that.$post(`${window.url}/api/orderSub`,this.orderDatas).then((res) => {
            that.$handelResponse(res, (result) => {
              NProgress.done();
              if(result.code===200){
                //更新用户信息
                bus.$emit('getcUserInfo', ''); 
                that.orderDatas.list = [];
                that.$success('下注成功！');
                that.reset();
              }
            })
          });
        }
      },
      orderOdds() {

        let reg = /^[\u2E80-\u9FFF]+$/;
        if(reg.test(this.moneyOrder)){
          this.$alertMessage('请确认注单!', '温馨提示');
        } else if(!this.disableBtn) {
          this.$alertMessage('请确认注单!', '温馨提示');
        } else {
          this.orderList = [];

          console.log('this.orderDataListthis.orderDataList',this.orderDataList);

          if(this.normalPay) {
            //console.log('正常');

            for(let n in this.orderDataList) {
              if(this.orderDataList[n].normalMoney != '') {

                let obj = {};

                if(this.orderDataList[n].bocaiValue == '') {
                    obj.oddNames = this.orderDataList[n].bocaiCategory2Name + '  ' + this.orderDataList[n].bocaiOddName,
                    obj.bocaiOdds = this.orderDataList[n].bocaiOdds,
                    obj.betsMoney = this.orderDataList[n].normalMoney
                } else {
                    obj.oddNames = this.orderDataList[n].bocaiOddName + '  ' + this.orderDataList[n].bocaiValue,
                    obj.bocaiOdds = this.orderDataList[n].bocaiOdds,
                    obj.betsMoney = this.orderDataList[n].normalMoney
                }

                this.orderList.push(obj);
              }
            }
            if(this.orderList.length == '0') {
              this.$alertMessage('请确认注单!', '温馨提示');
            } else {
              this.orderOddsVisible = true;
            }

            //console.log('this.orderList',this.orderList);

          } else {
            //console.log('快捷');

            if(this.orderDataList.length == 0) {
              this.$alertMessage('请确认注单!', '温馨提示');
            } else if(this.moneyOrder == ''){
              this.$alertMessage('请输入金额!', '温馨提示');
            } else {

              //console.log('this.orderDataList',this.orderDataList);
              for(let n in this.orderDataList) {

                let obj = {};

                if(this.orderDataList[n].bocaiValue == '') {
                    obj.oddNames = this.orderDataList[n].bocaiCategory2Name + '  ' + this.orderDataList[n].bocaiOddName,
                    obj.bocaiOdds = this.orderDataList[n].bocaiOdds,
                    obj.betsMoney = this.moneyOrder
                } else {
                    obj.oddNames = this.orderDataList[n].bocaiOddName + '  ' + this.orderDataList[n].bocaiValue,
                    obj.bocaiOdds = this.orderDataList[n].bocaiOdds,
                    obj.betsMoney = this.moneyOrder
                }

                this.orderList.push(obj);
              }
              //console.log('this.this.orderList',this.orderList);
              this.orderOddsVisible = true;
            }

            //console.log('this.orderList',this.orderList);

          }
        }

      },
      orderMul(pay) {

        if(this.disableBtn) {
          this.moneyOrder = pay*1 + this.moneyOrder*1;
        }

      }
		},
    watch: {
      canOrder: function(val, oldValue) {
        this.disableBtn = val;
      }
    }
	}

</script>

<style scoped>
.betQuick {
    text-align: center;
    margin-bottom: 10px;
    margin-top: 14px;
    position: relative;
    height: 67px;
}

.betQuick div {
  display: inline-block;
  float: left;
}

.betRTop div {
  font-size: 16px;
}

.betRTop {
  margin-left: 20px; 
}

.beishu {
  width: 400px;
  height: 67px;
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
    width: 54px;
    height: 52px;
    margin: 0px 2px !important;
    border-radius: 50px;
    color: #1b1b1b;
    font-family: Microsoft YaHei;
    font-size: 10px;
    font-weight: 700;
    cursor: pointer;
}

.beishuBtn a {
  height: 52px;
  line-height: 52px;
  font-weight: bold;
}

.beishuBtn.beishuBtn10 {
    background: url(../../../../../static/img/cm1.png) bottom no-repeat transparent;
    background-size: contain;
}
.beishuBtn.beishuBtn50 {
  background: url(../../../../../static/img/cm2.png) bottom no-repeat transparent;
    background-size: contain;
}
.beishuBtn.beishuBtn100 {
  background: url(../../../../../static/img/cm3.png) bottom no-repeat transparent;
    background-size: contain;
}
.beishuBtn.beishuBtn500 {
  background: url(../../../../../static/img/cm4.png) bottom no-repeat transparent;
    background-size: contain;
}
.beishuBtn.beishuBtn1000 {
  background: url(../../../../../static/img/cm5.png) bottom no-repeat transparent;
    background-size: contain;
}
.beishuBtn.beishuBtn5000 {
  background: url(../../../../../static/img/cm6.png) bottom no-repeat transparent;
    background-size: contain;
}

.beishuBtn:hover {
  color: #ff9800;
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
    background-color: #fcefc2;
    font-weight: 700;
    color: #261238;
}
.default-list table td, .default-list table th {
    text-align: center;
    line-height: 30px;
    border: 1px solid #dcdfe6;
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
    background-color: #fcefc2;
    font-weight: 700;
    color: #261238;
}

.beishuBtn.addPayChouMa a{
  color: #ff9800;
  font-size: 18px;
}



</style>

<style lang="less">

.betQuick {
  .el-input {
    width: 120px;
    margin-right: 20px;
  }

  .el-radio.is-bordered.is-checked {
    background-color: #805933;
  }

  .betRTop.onlybet {
    margin-top: 20px;
  }

  .el-dialog__header {
    padding: 20px 20px 10px;
    background-color: #80664b;
    border-radius: 5px 5px 0 0;
  }
  .el-dialog.el-dialog--center {
    width: 500px;
    color: #450400 !important;
    background-color: #fcfcfa;
    box-shadow: 0 2px 8px rgba(0,0,0,.33);
    font-family: Helvetica,Arial,sans-serif;
    border-radius: 5px;
  }
  .el-dialog--center .el-dialog__body {
    text-align: center;
    padding: 0px;
  }
  .betRTop button {
    height: 28px;
  }

  .el-button--primary.is-plain {
    color: #805933;
  }
}

</style>
