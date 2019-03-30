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
              <table v-if="bocaiTypeId == '1'">
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

            // for(let n in res.list) {

            // }
            this.resultList = res.list;
          }
    }


  }
}

</script>

<style scoped>
</style>
