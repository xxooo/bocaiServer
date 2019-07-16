<template>
  <div id="youxishezhi" class="content-main">
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>游戏管理</el-breadcrumb-item>
        <el-breadcrumb-item>开奖结果</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="nav">
          游戏类型：

              <el-select v-model="bocaiTypeId" @change="getPrizeResult()" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in bocaiMenu"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>

              <span>
                  日期：
                  <el-date-picker
                  size="mini"
                  value-format="yyyy-MM-dd"
                  @change="getPrizeResult()"
                  v-model="openPrizeTime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </span>
    </div>

    <div class="portlet portlet-add">
      <div class="tab">

        <!-- 重庆时时彩 -->
              <!-- <table v-if="bocaiTypeId == '1'">
                <thead>
                  <tr>
                    <th>期数</th> 
                    <th>开奖时间</th> 
                    <th colspan="5">开出号码</th> 
                    <th colspan="3">总和</th> 
                    <th>龙虎</th> 
                    <th>前三</th> 
                    <th>中三</th> 
                    <th>后三</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in resultList">
                    <td>{{item.periods}}</td> 
                    <td>{{$timestampToTime(item.openPrizetime)}}</td>
                    <template v-if="!item.result || item.result == ''">
                      <td colspan="12" >
                        <span>暂未开奖</span>
                      </td>
                    </template>
                    <template v-else>
                      <td><div class="ball-icon">{{item.num1}}</div></td>
                      <td><div class="ball-icon">{{item.num2}}</div></td>
                      <td><div class="ball-icon">{{item.num3}}</div></td>
                      <td><div class="ball-icon">{{item.num4}}</div></td>
                      <td><div class="ball-icon">{{item.num5}}</div></td> 
                      <td>{{item.zonghe}}</td> 
                      <td><span :class="item.zonghedaxiao == '大' ? 'red' : ''">{{item.zonghedaxiao}}</span></td> 
                      <td><span :class="item.zonghedanshuang == '双' ? 'red' : ''">{{item.zonghedanshuang}}</span></td> 
                      <td><span :class="item.longhu == '龙' ? 'red' : item.longhu == '虎' ? 'blue' : ''">{{item.longhu}}</span></td> 
                      <td><span>{{item.qiansan}}</span></td> 
                      <td><span>{{item.zhongsan}}</span></td> 
                      <td><span>{{item.housan}}</span></td>
                    </template>
                  </tr>
                </tbody>
              </table> -->

              <!-- 山东11选5 -->
              <!-- <table v-if="bocaiTypeId == '8811'">
                <thead>
                  <tr>
                    <th>期数</th> 
                    <th>开奖时间</th> 
                    <th colspan="5">开出号码</th> 
                    <th colspan="4">总和</th> 
                    <th>龙虎</th> 
                    <th colspan="5">1~5大小</th> 
                    <th colspan="5">1~5单双</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in resultList">
                    <td>{{item.periods}}</td> 
                    <td>{{$timestampToTime(item.openPrizetime)}}</td>
                    <template v-if="!item.result || item.result == ''">
                      <td colspan="20" >
                        <span>暂未开奖</span>
                      </td>
                    </template>
                    <template v-else>
                      <td><div class="ball-icon">{{item.num1}}</div></td>
                      <td><div class="ball-icon">{{item.num2}}</div></td>
                      <td><div class="ball-icon">{{item.num3}}</div></td>
                      <td><div class="ball-icon">{{item.num4}}</div></td>
                      <td><div class="ball-icon">{{item.num5}}</div></td> 
                      <td>{{item.zonghe}}</td> 
                      <td><span :class="item.zonghedaxiaohe == '大' ? 'red' : ''">{{item.zonghedaxiaohe}}</span></td> 
                      <td><span :class="item.zonghedanshuang == '双' ? 'red' : ''">{{item.zonghedanshuang}}</span></td> 
                      <td><span :class="item.zongheweidaweixiao == '尾大' ? 'red' : ''">{{item.zongheweidaweixiao}}</span></td> 
                      <td><span :class="item.longhu == '龙' ? 'red' : item.longhu == '虎' ? 'blue' : ''">{{item.longhu}}</span></td> 
                      <td><span :class="item.yidaxiaohe == '大' ? 'red' : item.yidaxiaohe == '小' ? 'blue' : ''">{{item.yidaxiaohe}}</span></td> 
                      <td><span :class="item.erdaxiaohe == '大' ? 'red' : item.erdaxiaohe == '小' ? 'blue' : ''">{{item.erdaxiaohe}}</span></td> 
                      <td><span :class="item.sandaxiaohe == '大' ? 'red' : item.sandaxiaohe == '小' ? 'blue' : ''">{{item.sandaxiaohe}}</span></td> 
                      <td><span :class="item.sidaxiaohe == '大' ? 'red' : item.sidaxiaohe == '小' ? 'blue' : ''">{{item.sidaxiaohe}}</span></td> 
                      <td><span :class="item.wudaxiaohe == '大' ? 'red' : item.wudaxiaohe == '小' ? 'blue' : ''">{{item.wudaxiaohe}}</span></td> 
                      <td><span :class="item.yidanshuang == '双' ? 'red' : item.yidanshuang == '单' ? 'blue' : ''">{{item.yidanshuang}}</span></td> 
                      <td><span :class="item.erdanshuang == '双' ? 'red' : item.erdanshuang == '单' ? 'blue' : ''">{{item.erdanshuang}}</span></td> 
                      <td><span :class="item.sandanshuang == '双' ? 'red' : item.sandanshuang == '单' ? 'blue' : ''">{{item.sandanshuang}}</span></td> 
                      <td><span :class="item.sidanshuang == '双' ? 'red' : item.sidanshuang == '单' ? 'blue' : ''">{{item.sidanshuang}}</span></td> 
                      <td><span :class="item.wudanshuang == '双' ? 'red' : item.wudanshuang == '单' ? 'blue' : ''">{{item.wudanshuang}}</span></td>
                    </template>
                  </tr>
                </tbody>
              </table> --> 


              <!-- 重庆时时彩 极速时时彩-->
              <table v-if="[1,8815].findIndex((n) => n==bocaiTypeId)>-1">
                <thead>
                  <tr>
                    <th>期数</th> 
                    <th>开奖时间</th> 
                    <th colspan="5">开出号码</th> 
                    <th colspan="3">总和</th> 
                    <th>龙虎</th> 
                    <th>前三</th> 
                    <th>中三</th> 
                    <th>后三</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in resultList">
                    <td>{{item.periods}}</td> 
                    <td>{{$timestampToTime(item.openPrizetime)}}</td>
                    <template v-if="!item.result || item.result == ''">
                      <td colspan="12" >
                        <span>暂未开奖</span>
                      </td>
                    </template>
                    <template v-else>
                      <td><div class="ball-icon">{{item.num1}}</div></td>
                      <td><div class="ball-icon">{{item.num2}}</div></td>
                      <td><div class="ball-icon">{{item.num3}}</div></td>
                      <td><div class="ball-icon">{{item.num4}}</div></td>
                      <td><div class="ball-icon">{{item.num5}}</div></td> 
                      <td>{{item.zonghe}}</td> 
                      <td><span :class="item.zonghedaxiao == '大' ? 'red' : ''">{{item.zonghedaxiao}}</span></td> 
                      <td><span :class="item.zonghedanshuang == '双' ? 'red' : ''">{{item.zonghedanshuang}}</span></td> 
                      <td><span :class="item.longhu == '龙' ? 'red' : item.longhu == '虎' ? 'blue' : ''">{{item.longhu}}</span></td> 
                      <td><span>{{item.qiansan}}</span></td> 
                      <td><span>{{item.zhongsan}}</span></td> 
                      <td><span>{{item.housan}}</span></td>
                    </template>
                  </tr>
                </tbody>
              </table>

              <!-- 山东11选5 -->
              <table v-if="bocaiTypeId == '8811'">
                <thead>
                  <tr>
                    <th>期数</th> 
                    <th>开奖时间</th> 
                    <th colspan="5">开出号码</th> 
                    <th colspan="4">总和</th> 
                    <th>龙虎</th> 
                    <th colspan="5">1~5大小</th> 
                    <th colspan="5">1~5单双</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in resultList">
                    <td>{{item.periods}}</td> 
                    <td>{{$timestampToTime(item.openPrizetime)}}</td>
                    <template v-if="!item.result || item.result == ''">
                      <td colspan="20" >
                        <span>暂未开奖</span>
                      </td>
                    </template>
                    <template v-else>
                      <td><div class="ball-icon">{{item.num1}}</div></td>
                      <td><div class="ball-icon">{{item.num2}}</div></td>
                      <td><div class="ball-icon">{{item.num3}}</div></td>
                      <td><div class="ball-icon">{{item.num4}}</div></td>
                      <td><div class="ball-icon">{{item.num5}}</div></td> 
                      <td>{{item.zonghe}}</td> 
                      <td><span :class="item.zonghedaxiaohe == '大' ? 'red' : ''">{{item.zonghedaxiaohe}}</span></td> 
                      <td><span :class="item.zonghedanshuang == '双' ? 'red' : ''">{{item.zonghedanshuang}}</span></td> 
                      <td><span :class="item.zongheweidaweixiao == '尾大' ? 'red' : ''">{{item.zongheweidaweixiao}}</span></td> 
                      <td><span :class="item.longhu == '龙' ? 'red' : item.longhu == '虎' ? 'blue' : ''">{{item.longhu}}</span></td> 
                      <td><span :class="item.yidaxiaohe == '大' ? 'red' : item.yidaxiaohe == '小' ? 'blue' : ''">{{item.yidaxiaohe}}</span></td> 
                      <td><span :class="item.erdaxiaohe == '大' ? 'red' : item.erdaxiaohe == '小' ? 'blue' : ''">{{item.erdaxiaohe}}</span></td> 
                      <td><span :class="item.sandaxiaohe == '大' ? 'red' : item.sandaxiaohe == '小' ? 'blue' : ''">{{item.sandaxiaohe}}</span></td> 
                      <td><span :class="item.sidaxiaohe == '大' ? 'red' : item.sidaxiaohe == '小' ? 'blue' : ''">{{item.sidaxiaohe}}</span></td> 
                      <td><span :class="item.wudaxiaohe == '大' ? 'red' : item.wudaxiaohe == '小' ? 'blue' : ''">{{item.wudaxiaohe}}</span></td> 
                      <td><span :class="item.yidanshuang == '双' ? 'red' : item.yidanshuang == '单' ? 'blue' : ''">{{item.yidanshuang}}</span></td> 
                      <td><span :class="item.erdanshuang == '双' ? 'red' : item.erdanshuang == '单' ? 'blue' : ''">{{item.erdanshuang}}</span></td> 
                      <td><span :class="item.sandanshuang == '双' ? 'red' : item.sandanshuang == '单' ? 'blue' : ''">{{item.sandanshuang}}</span></td> 
                      <td><span :class="item.sidanshuang == '双' ? 'red' : item.sidanshuang == '单' ? 'blue' : ''">{{item.sidanshuang}}</span></td> 
                      <td><span :class="item.wudanshuang == '双' ? 'red' : item.wudanshuang == '单' ? 'blue' : ''">{{item.wudanshuang}}</span></td>
                    </template>
                  </tr>
                </tbody>
              </table>

              <!-- 江苏快三 -->
              <table v-if="bocaiTypeId == '8498'">
                <thead>
                  <tr>
                    <th>期数</th> 
                    <th>开奖时间</th> 
                    <th colspan="3">开出号码</th> 
                    <th colspan="2">总和</th>
                  </tr>
                </thead> 
                <tbody>
                  <tr v-for="item in resultList">
                    <td>{{item.periods}}</td> 
                    <td>{{$timestampToTime(item.openPrizetime)}}</td>

                    <template v-if="!item.result || item.result == ''">
                      <td colspan="5">
                        <span>暂未开奖</span>
                      </td>
                    </template>
                    <template v-else>
                      <td><i :class="'jsk3-icon-'+item.num1" style="margin-top: 6px;"></i></td>
                      <td><i :class="'jsk3-icon-'+item.num2" style="margin-top: 6px;"></i></td>
                      <td><i :class="'jsk3-icon-'+item.num3" style="margin-top: 6px;"></i></td>
                      <td><span>{{item.zonghe}}</span></td> 
                      <td><span class="red">{{item.zonghedaxiao}}</span></td>
                    </template>
                  </tr>
                </tbody>
              </table>


              <!-- 北京PK10  幸运飞艇 急速赛车-->
              <table v-if="[8555,8806,9057].findIndex((n) => n==bocaiTypeId)>-1">
                <thead>
                  <tr>
                    <th>期数</th> 
                    <th>开奖时间</th> 
                    <th colspan="10">开出号码</th> 
                    <th colspan="3">冠亚军和</th> 
                    <th colspan="5">1~5龙虎</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in resultList">
                    <td>{{item.periods}}</td> 
                    <td>{{$timestampToTime(item.openPrizetime)}}</td>
                    <template v-if="!item.result || item.result == ''">
                      <td colspan="18">
                        <span>暂未开奖</span>
                      </td>
                    </template>
                    <template v-else>
                      <td><div :class="'ball-fang ball-fang'+item.num1">{{item.num1}}</div></td> 
                      <td><div :class="'ball-fang ball-fang'+item.num2">{{item.num2}}</div></td> 
                      <td><div :class="'ball-fang ball-fang'+item.num3">{{item.num3}}</div></td> 
                      <td><div :class="'ball-fang ball-fang'+item.num4">{{item.num4}}</div></td> 
                      <td><div :class="'ball-fang ball-fang'+item.num5">{{item.num5}}</div></td> 
                      <td><div :class="'ball-fang ball-fang'+item.num6">{{item.num6}}</div></td> 
                      <td><div :class="'ball-fang ball-fang'+item.num7">{{item.num7}}</div></td> 
                      <td><div :class="'ball-fang ball-fang'+item.num8">{{item.num8}}</div></td> 
                      <td><div :class="'ball-fang ball-fang'+item.num9">{{item.num9}}</div></td> 
                      <td><div :class="'ball-fang ball-fang'+item.num10">{{item.num10}}</div></td> 
                      <td>{{item.guanyajunhe}}</td> 
                      <td><span :class="item.guanyajundaxiao == '大' ? 'red' : ''">{{item.guanyajundaxiao}}</span></td> 
                      <td><span :class="item.guanyajundanshuang == '双' ? 'red' : ''">{{item.guanyajundanshuang}}</span></td> 
                      <td><span :class="item.yilonghu == '龙' ? 'red' : item.yilonghu == '虎' ? 'blue' : ''">{{item.yilonghu}}</span></td> 
                      <td><span :class="item.erlonghu == '龙' ? 'red' : item.erlonghu == '虎' ? 'blue' : ''">{{item.erlonghu}}</span></td> 
                      <td><span :class="item.sanlonghu == '龙' ? 'red' : item.sanlonghu == '虎' ? 'blue' : ''">{{item.sanlonghu}}</span></td> 
                      <td><span :class="item.silonghu == '龙' ? 'red' : item.silonghu == '虎' ? 'blue' : ''">{{item.silonghu}}</span></td> 
                      <td><span :class="item.wulonghu == '龙' ? 'red' : item.wulonghu == '虎' ? 'blue' : ''">{{item.wulonghu}}</span></td> 
                    </template>
                  </tr>
                </tbody>
              </table>


              <!-- 北京快乐8 -->
              <table v-if="[8266].findIndex((n) => n==bocaiTypeId)>-1">
                <thead>
                  <tr>
                    <th>期数</th> 
                    <th width="100px">开奖时间</th> 
                    <th>开出号码</th> 
                    <th colspan="4">总和</th> 
                    <th colspan="2">比数量</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in resultList">
                    <td>{{item.periods}}</td> 
                    <td>{{$timestampToTime(item.openPrizetime)}}</td>
                    <template v-if="!item.result || item.result == ''">
                      <td colspan="7">
                        <span>暂未开奖</span>
                      </td>
                    </template>
                    <template v-else>
                      <td width="360px">
                        <div v-for="(itemsub,index) in item.result.slice(0,11)" :class="itemsub*1 > 40 ? 'ballda' : 'ballxiao'">{{itemsub}}</div>
                        <br>
                        <div v-for="(itemsub,index) in item.result.slice(11)" :class="itemsub*1 > 40 ? 'ballda' : 'ballxiao'">{{itemsub}}</div>
                      </td> 
                      <td>{{item.zonghe}}</td> 
                      <td><span :class="item.zonghedaxiao == '大' ? 'red' : ''">{{item.zonghedaxiao}}</span></td> 
                      <td><span :class="item.zonghedanshuang == '双' ? 'red' : ''">{{item.zonghedanshuang}}</span></td> 
                      <td>{{item.wuxing}}</td>
                      <td><span :class="item.bishulianghouqianhe == '前(多)' ? 'red' : item.bishulianghouqianhe == '后(多)' ? 'blue' : ''">{{item.bishulianghouqianhe}}</span></td>
                      <td><span :class="item.bishuliangdanshuanghe == '双(多)' ? 'red' : item.bishuliangdanshuanghe == '单(多)' ? 'blue' : ''">{{item.bishuliangdanshuanghe}}</span></td>
                    </template>
                  </tr>
                </tbody>
              </table>



              <!-- PC蛋蛋 -->
              <table v-if="[8223].findIndex((n) => n==bocaiTypeId)>-1">
                <thead>
                  <tr>
                    <th>期数</th> 
                    <th>开奖时间</th> 
                    <th colspan="3">开出号码</th> 
                    <th>总和</th> 
                    <th>大小</th> 
                    <th>单双</th> 
                    <th>极值</th> 
                    <th>色波</th>
                  </tr>
                </thead> 
                <tbody>
                  <tr v-for="item in resultList">
                    <td>{{item.periods}}</td> 
                    <td>{{$timestampToTime(item.openPrizetime)}}</td>
                    <template v-if="!item.result || item.result == ''">
                      <td colspan="8">
                        <span>暂未开奖</span>
                      </td>
                    </template>
                    <template v-else>
                      <td><div class="ball-icon">{{item.num1}}</div></td>
                      <td><div class="ball-icon">{{item.num2}}</div></td>
                      <td><div class="ball-icon">{{item.num3}}</div></td>
                      <td>{{item.zonghe}}</td> 
                      <td><span :class="item.daxiao == '大' ? 'red' : ''">{{item.daxiao}}</span></td> 
                      <td><span :class="item.danshuang == '双' ? 'red' : ''">{{item.danshuang}}</span></td> 
                      <td>{{item.jizhi}}</td>
                      <td><span :class="item.sebo == '红波' ? 'red' : item.sebo == '绿波' ? 'green' : 'blue'">{{item.sebo}}</span></td>
                    </template>
                  </tr>

                </tbody>
              </table>


      </div>
    </div>

  </div>
</template>



<script>
import { mapGetters } from 'vuex';

export default {
  components: {
  },
  data () {
    return {
      bocaiTypeId: '1',
      bocaiTypeList: [],
      openPrizeTime: '',
      currentPage: 1,
      resultList: []
    }
  },
  computed: {
    ...mapGetters({
      ruleId:'getruleId',
      userInfo: 'getuserInfo',
      bocaiMenu: 'getbocaiMenu'
    })
  },
  created() {
    if(this.bocaiMenu.length != 0) {
      this.bocaiTypeId = this.bocaiMenu[0].id;
    }
    this.openPrizeTime = this.$timestampToTimeRi(new Date());
    this.getPrizeResult();

  },
  mounted(){
  },
  methods: {
    async getPrizeResult() { 

      console.log('openPrizeTime',this.openPrizeTime);

      let res = await this.$get(`${window.url}/admin/prize/bocaiPeriodsList?bocaiTypeId=`+this.bocaiTypeId+`&currentPage=1&pageSize=100&dayStr=`+this.openPrizeTime);
          if(res.code===200){

            if(this.bocaiTypeId == '8266') {
              
              for(let n in res.list) {

                if(res.list[n].result) {
                  console.log('res.list[n].result',res.list[n].result);

                  res.list[n].result = res.list[n].result.split(','); 
                }
              }
            }

            this.resultList = res.list;
          }
    }


  }
}

</script>

<style scoped>
</style>
