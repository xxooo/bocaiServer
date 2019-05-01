<template>
  <div id="youxishezhi" class="content-main">
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>开奖设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="nav">
      <span>游戏类型:
        <el-select v-model="q.bocaiTypeId" @change="bocaiTypeSelect()" placeholder="请选择" size="mini">
          <el-option
            v-for="item in bocaiMenu"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </span>
      投注时间 :
        <el-date-picker
          style="width: 15%;"
          size="mini"
          v-model="q.dateStr"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <button class="btn btn-blue" @click="getkaijiangList()">查询</button>
    </div>

    <div class="nav">
        <div class="operate-btn">
          <button class="btn btn-blue" @click="restartOpenPrize()">重启开奖</button>
        </div>

    </div>


    <div class="portlet portlet-add">
      <div class="tab">

        <table class="main-tables" v-if="q.bocaiTypeId == 1 || q.bocaiTypeId == 8815"><!-- 重庆时时彩/天津时时彩 -->
            <tr>
                <th>期数</th>
                <th>开奖时间</th>
                <th colspan="5">开奖号码</th>
                <th colspan="3">总和</th>
                <th>龙虎</th>
                <th>前三</th>
                <th>中三</th>
                <th>后三</th>
                <th v-if="ruleId == 1 || ruleId == 2">功能</th>
            </tr>
            <tr v-for="openPrize in openPrizeSetList">
                <td>{{openPrize.periods}}</td>
                <td>{{$timestampToTime(openPrize.openPrizetime)}}</td>
                <td v-if="null == openPrize.result" colspan="12">未开奖</td>
                <template v-else>
                <td >{{openPrize.num1}}</td>
                <td>{{openPrize.num2}}</td>
                <td>{{openPrize.num3}}</td>
                <td>{{openPrize.num4}}</td>
                <td>{{openPrize.num5}}</td>
                <td>{{openPrize.zonghe}}</td>
                <td>{{openPrize.zonghedaxiao}}</td>
                <td>{{openPrize.zonghedanshuang}}</td>
                <td>{{openPrize.longhu}}</td>
                <td>{{openPrize.qiansan}}</td>
                <td>{{openPrize.zhongsan}}</td>
                <td>{{openPrize.housan}}</td>
                </template>
                <td v-if="ruleId == 1 || ruleId == 2">
                    <button class="btn" type="button" data-toggle="modal" @click="manualSet(openPrize.id)" data-target="#modifyLoty">手动结算</button>
                    <button class="btn" type="button" @click="deleteId(openPrize.id)">删除</button>
                </td>
            </tr>
        </table>

        <table class="main-tables" v-if="q.bocaiTypeId == 8223"><!-- PC蛋蛋 -->
            <tr>
                <th>期数</th>
                <th>开奖时间</th>
                <th colspan="3">开奖号码</th>
                <th>总和</th>
                <th>大小</th>
                <th>单双</th>
                <th>极值</th>
                <th>色波</th>
                <th v-if="ruleId == 1 || ruleId == 2">功能</th>
            </tr>
            <tr v-for="openPrize in openPrizeSetList">
                <td>{{openPrize.periods}}</td>
                <td>{{$timestampToTime(openPrize.openPrizetime)}}</td>
                <td v-if="null == openPrize.result" colspan="8">未开奖</td>
                <template v-else>
                    <td >{{openPrize.num1}}</td>
                    <td>{{openPrize.num2}}</td>
                    <td>{{openPrize.num3}}</td>
                    <td>{{openPrize.zonghe}}</td>
                    <td>{{openPrize.daxiao}}</td>
                    <td>{{openPrize.danshuang}}</td>
                    <td>{{openPrize.jizhi}}</td>
                    <td>{{openPrize.sebo}}</td>
                </template>
                <td v-if="ruleId == 1 || ruleId == 2">
                    <button class="btn" type="button" data-toggle="modal" @click="manualSet(openPrize.id)" data-target="#modifyLoty">手动结算</button>
                    <button class="btn" type="button" @click="deleteId(openPrize.id)">删除</button>
                </td>
            </tr>
        </table>

        <table class="main-tables" v-if="q.bocaiTypeId == 8266"><!-- 北京快乐8 -->
            <tr>
                <th>期数</th>
                <th>开奖时间</th>
                <th>开奖号码</th>
                <th colspan="4">总和</th>
                <th colspan="2">比数量</th>
                <th v-if="ruleId == 1 || ruleId == 2">功能</th>
            </tr>
            <tr v-for="openPrize in openPrizeSetList">
                <td>{{openPrize.periods}}</td>
                <td>{{$timestampToTime(openPrize.openPrizetime)}}</td>
                <td v-if="null == openPrize.result" colspan="7">未开奖</td>
                <template v-else>
                    <td>{{openPrize.result}}</td>
                    <td>{{openPrize.zonghe}}</td>
                    <td>{{openPrize.zonghedaxiao}}</td>
                    <td>{{openPrize.zonghedanshuang}}</td>
                    <td>{{openPrize.wuxing}}</td>
                    <td>{{openPrize.bishulianghouqianhe}}</td>
                    <td>{{openPrize.bishuliangdanshuanghe}}</td>
                </template>
                <td v-if="ruleId == 1 || ruleId == 2">
                    <button class="btn" type="button" data-toggle="modal" @click="manualSet(openPrize.id)" data-target="#modifyLoty">手动结算</button>
                    <button class="btn" type="button" @click="deleteId(openPrize.id)">删除</button>
                </td>
            </tr>
        </table>

        <table class="main-tables" v-if="q.bocaiTypeId == 8374 || q.bocaiTypeId == 8811 || q.bocaiTypeId == 8813"><!-- 广东11选5 -->
            <tr>
                <th>期数</th>
                <th>开奖时间</th>
                <th colspan="5">开奖号码</th>
                <th colspan="4">总和</th>
                <th>龙虎</th>
                <th colspan="5">1~5大小</th>
                <th colspan="5">1~5单双</th>
                <th v-if="ruleId == 1 || ruleId == 2">功能</th>
            </tr>
            <tr v-for="openPrize in openPrizeSetList">
                <td>{{openPrize.periods}}</td>
                <td>{{$timestampToTime(openPrize.openPrizetime)}}</td>
                <td v-if="null == openPrize.result" colspan="20">未开奖</td>
                <template v-else>
                    <td>{{openPrize.num1}}</td>
                    <td>{{openPrize.num2}}</td>
                    <td>{{openPrize.num3}}</td>
                    <td>{{openPrize.num4}}</td>
                    <td>{{openPrize.num5}}</td>
                    <td>{{openPrize.zonghe}}</td>
                    <td>{{openPrize.zonghedaxiaohe}}</td>
                    <td>{{openPrize.zonghedanshuang}}</td>
                    <td>{{openPrize.zongheweidaweixiao}}</td>
                    <td>{{openPrize.longhu}}</td>
                    <td>{{openPrize.yidaxiaohe}}</td>
                    <td>{{openPrize.erdaxiaohe}}</td>
                    <td>{{openPrize.sandaxiaohe}}</td>
                    <td>{{openPrize.sidaxiaohe}}</td>
                    <td>{{openPrize.wudaxiaohe}}</td>
                    <td>{{openPrize.yidanshuang}}</td>
                    <td>{{openPrize.erdanshuang}}</td>
                    <td>{{openPrize.sandanshuang}}</td>
                    <td>{{openPrize.sidanshuang}}</td>
                    <td>{{openPrize.wudanshuang}}</td>
                </template>
                <td v-if="ruleId == 1 || ruleId == 2">
                    <button class="btn" type="button" data-toggle="modal" @click="manualSet(openPrize.id)" data-target="#modifyLoty">手动结算</button>
                    <button class="btn" type="button" @click="deleteId(openPrize.id)">删除</button>
                </td>
            </tr>
        </table>

        <table class="main-tables" v-if="q.bocaiTypeId == 8498 || q.bocaiTypeId == 8810"><!-- 江苏快3/安徽快速 -->
            <tr>
                <th>期数</th>
                <th>开奖时间</th>
                <th colspan="3">开奖号码</th>
                <th colspan="2">总和</th>
                <th v-if="ruleId == 1 || ruleId == 2">功能</th>
            </tr>
            <tr v-for="openPrize in openPrizeSetList">
                <td>{{openPrize.periods}}</td>
                <td>{{$timestampToTime(openPrize.openPrizetime)}}</td>
                <td v-if="null == openPrize.result" colspan="5">未开奖</td>
                <template v-else>
                    <td>{{openPrize.num1}}</td>
                    <td>{{openPrize.num2}}</td>
                    <td>{{openPrize.num3}}</td>
                    <td>{{openPrize.zonghe}}</td>
                    <td>{{openPrize.zonghedaxiao}}</td>
                </template>
                <td v-if="ruleId == 1 || ruleId == 2">
                    <button class="btn" type="button" data-toggle="modal" @click="manualSet(openPrize.id)" data-target="#modifyLoty">手动结算</button>
                    <button class="btn" type="button" @click="deleteId(openPrize.id)">删除</button>
                </td>
            </tr>
        </table>

        <table class="main-tables" v-if="q.bocaiTypeId == 8555 || q.bocaiTypeId == 8806 || q.bocaiTypeId == 9057"><!-- 幸运飞艇/北京PK10/极速赛车 -->
            <tr>
                <th>期数</th>
                <th>开奖时间</th>
                <th colspan="10">开奖号码</th>
                <th colspan="3">冠亚军和</th>
                <th colspan="5">1~5龙虎</th>
                <th v-if="ruleId == 1 || ruleId == 2">功能</th>
            </tr>
            <tr v-for="openPrize in openPrizeSetList">
                <td>{{openPrize.periods}}</td>
                <td>{{$timestampToTime(openPrize.openPrizetime)}}</td>
                <td v-if="null == openPrize.result" colspan="18">未开奖</td>
                <template v-else>
                    <td>{{openPrize.num1}}</td>
                    <td>{{openPrize.num2}}</td>
                    <td>{{openPrize.num3}}</td>
                    <td>{{openPrize.num4}}</td>
                    <td>{{openPrize.num5}}</td>
                    <td>{{openPrize.num6}}</td>
                    <td>{{openPrize.num7}}</td>
                    <td>{{openPrize.num8}}</td>
                    <td>{{openPrize.num9}}</td>
                    <td>{{openPrize.num10}}</td>
                    <td>{{openPrize.guanyajunhe}}</td>
                    <td>{{openPrize.guanyajundaxiao}}</td>
                    <td>{{openPrize.guanyajundanshuang}}</td>
                    <td>{{openPrize.yilonghu}}</td>
                    <td>{{openPrize.erlonghu}}</td>
                    <td>{{openPrize.sanlonghu}}</td>
                    <td>{{openPrize.silonghu}}</td>
                    <td>{{openPrize.wulonghu}}</td>
                </template>
                <td v-if="ruleId == 1 || ruleId == 2">
                    <button class="btn" type="button" data-toggle="modal" @click="manualSet(openPrize.id)" data-target="#modifyLoty">手动结算</button>
                    <button class="btn" type="button" @click="deleteId(openPrize.id)">删除</button>
                </td>
            </tr>
        </table>

        <table class="main-tables" v-if="q.bocaiTypeId == 8808"><!-- 六合彩 -->
            <tr>
                <th>期数</th>
                <th>开奖时间</th>
                <th colspan="7">开奖号码</th>
                <th colspan="4">总和</th>
                <th colspan="5">特码</th>
                <th v-if="ruleId == 1 || ruleId == 2">功能</th>
            </tr>
            <tr v-for="openPrize in openPrizeSetList">
                <td>{{openPrize.periods}}</td>
                <td>{{$timestampToTime(openPrize.openPrizetime)}}</td>
                <td v-if="null == openPrize.result" colspan="18">未开奖</td>
                <template v-else>
                    <td>{{openPrize.num1}} @ {{openPrize.num1Shengxiao}}</td>
                    <td>{{openPrize.num2}} @ {{openPrize.num2Shengxiao}}</td>
                    <td>{{openPrize.num3}} @ {{openPrize.num3Shengxiao}}</td>
                    <td>{{openPrize.num4}} @ {{openPrize.num4Shengxiao}}</td>
                    <td>{{openPrize.num5}} @ {{openPrize.num5Shengxiao}}</td>
                    <td>{{openPrize.num6}} @ {{openPrize.num6Shengxiao}}</td>
                    <td>{{openPrize.num7}} @ {{openPrize.num7Shengxiao}}</td>
                    <td>{{openPrize.zonghezongshu}}</td>
                    <td>{{openPrize.zonghedaxiao}}</td>
                    <td>{{openPrize.zonghedanshuang}}</td>
                    <td>{{openPrize.zongheqisebo}}</td>

                    <td>{{openPrize.temadaxiao}}</td>
                    <td>{{openPrize.temadanshuang}}</td>
                    <td>{{openPrize.temahedaxiao}}</td>
                    <td>{{openPrize.temahedanshuang}}</td>
                    <td>{{openPrize.temaweidaxiao}}</td>
                </template>
                <td v-if="ruleId == 1 || ruleId == 2">
                    <button class="btn" type="button" data-toggle="modal" @click="manualSet(openPrize.id)" data-target="#modifyLoty">手动结算</button>
                    <button class="btn" type="button" @click="deleteId(openPrize.id)">删除</button>
                </td>
            </tr>
        </table>

        <table class="main-tables" v-if="q.bocaiTypeId == 8809"><!-- 广东快乐10分 -->
            <tr>
                <th>期数</th>
                <th>开奖时间</th>
                <th colspan="8">开奖号码</th>
                <th colspan="4">总和</th>
                <th colspan="4">1~4龙虎</th>
                <th v-if="ruleId == 1 || ruleId == 2">功能</th>
            </tr>
            <tr v-for="openPrize in openPrizeSetList">
                <td>{{openPrize.periods}}</td>
                <td>{{$timestampToTime(openPrize.openPrizetime)}}</td>
                <td v-if="null == openPrize.result" colspan="16">未开奖</td>
                <template v-else>
                    <td>{{openPrize.num1}}</td>
                    <td>{{openPrize.num2}}</td>
                    <td>{{openPrize.num3}}</td>
                    <td>{{openPrize.num4}}</td>
                    <td>{{openPrize.num5}}</td>
                    <td>{{openPrize.num6}}</td>
                    <td>{{openPrize.num7}}</td>
                    <td>{{openPrize.num8}}</td>
                    <td>{{openPrize.zonghe}}</td>
                    <td>{{openPrize.zonghedaxiao}}</td>
                    <td>{{openPrize.zonghedanshuang}}</td>
                    <td>{{openPrize.zongheweidaweixiao}}</td>

                    <td>{{openPrize.onelonghu}}</td>
                    <td>{{openPrize.twolonghu}}</td>
                    <td>{{openPrize.threelonghu}}</td>
                    <td>{{openPrize.fourlonghu}}</td>
                </template>
                <td v-if="ruleId == 1 || ruleId == 2">
                    <button class="btn" type="button" data-toggle="modal" @click="manualSet(openPrize.id)" data-target="#modifyLoty">手动结算</button>
                    <button class="btn" type="button" @click="deleteId(openPrize.id)">删除</button>
                </td>
            </tr>
        </table>

        <div class="block" v-if="page.totalPage > 1">
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="page.currentPage"
                    :page-size="page.pageSize"
                    layout="total, prev, pager, next"
                    :total="page.totalCount*1">
                  </el-pagination>
        </div>

      </div>
    </div>

    <el-dialog class="add-user-dialog" :title="'手动结算'" id="modifyLoty" :visible.sync="dialogvisible" width="40%">
      <div class="modal-body">
        <p>请在下方录入开奖结果</p>
        <div class="addLotyKj">
            <template v-for="(result,index) in openPrize.resultArray">
                <input type="text" :key="index" v-model="openPrize.resultArray[index]"  />
            </template>
        </div>
      </div>
      <div class="modal-footer">
          <button class="btn btn-primary" @click="manualSetSub()">保存结算</button>
          <button class="btn" @click="dialogvisible = false">取消</button>
      </div>
    </el-dialog>

  </div>
</template>



<script>
import { mapGetters } from 'vuex';

export default {
  components: {
  },
  data () {
    return {
      bocaiId: 1,
      baseBocaiInfo: {},
      routerName: this.$route.name,
      dialogvisible: false,

      page: {
            totalPage: 1,
            currentPage: 1,
            pageSize: 10,
            totalCount: 1
        },

       showList: true,
        title: null,
        q: {//查询条件
            dayStr: "",
            bocaiTypeId: 1
        },
        openPrizeSetList: [],//开奖设置列表
        bocaiTypeListArr: [],//菠菜列表
        //ruleId: "",
        openPrize: {
            id: 0,
            resultArray: [],//输入答案框的个数
            result: ""
        },
        dayList: {},//日期
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

    this.baseSet();

    this.bocaiTypeList();
    this.getkaijiangList();

  },
  mounted(){
  },
  methods: {
    deleteId(id) {
        let that = this;

        this.$c_msgconfirm("是否确认删除",async () => {

            await that.$get(`${window.url}/admin/prize/deleteId?id=`+id).then((res) => {
                that.$handelResponse(res, (result) => {
                    if (result.code == 200) {
                            that.$success('删除成功');
                            that.getkaijiangList();
                        }
                })
              });

        });

    },
    async manualSetSub() {
        let that = this;

            for(var index in this.openPrize.resultArray){
                if(null == this.openPrize.resultArray[index] || '' == this.openPrize.resultArray[index]){
                    this.$alertMessage('请输入正确的博彩结果!', '温馨提示');
                    return false;
                }
            }
            this.openPrize.result = this.openPrize.resultArray.join(",");

            let ret = await that.$post(`${window.url}/admin/prize/manualSetSub`,this.openPrize);
                  if(ret.code===200) {
                        that.$success('保存成功');
                        that.dialogvisible = false;
                        that.getkaijiangList();
                      } else {
                        //that.$error(ret.msg);
                  }
    },
    manualSet (id) {
            this.openPrize.id = id;
            var bocaiTypeId = this.q.bocaiTypeId;
            //判断选择的是哪个菠菜判断输入框
            if (bocaiTypeId == 1) {//重庆时时彩
                this.openPrize.resultArray = ["", "", "", "", ""];
            } else if (bocaiTypeId == 8223) {//PC蛋蛋
                this.openPrize.resultArray = ["", "", ""];
            } else if (bocaiTypeId == 8266) {//北京快乐8
                this.openPrize.resultArray = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
            } else if (bocaiTypeId == 8374) {//广东11选5
                this.openPrize.resultArray = ["", "", "", "", ""];
            } else if (bocaiTypeId == 8498) {//江苏快3
                this.openPrize.resultArray = ["", "", ""];
            } else if (bocaiTypeId == 8555) {//幸运飞艇
                this.openPrize.resultArray = ["", "", "", "", "", "", "", "", "", ""];
            } else if (bocaiTypeId == 8806) {//北京PK拾
                this.openPrize.resultArray = ["", "", "", "", "", "", "", "", "", ""];
            } else if (bocaiTypeId == 8808) {//六合彩
                this.openPrize.resultArray = ["", "", "", "", "", "", ""];
            } else if (bocaiTypeId == 8809) {//广东快乐十分
                this.openPrize.resultArray = ["", "", "", "", "", "", "", ""];
            } else if (bocaiTypeId == 8810) {//安徽快3
                this.openPrize.resultArray = ["", "", ""];
            } else if (bocaiTypeId == 8811) {//山东11选5
                this.openPrize.resultArray = ["", "", "", "", ""];
            } else if (bocaiTypeId == 8813) {//江西11选5
                this.openPrize.resultArray = ["", "", "", "", ""];
            } else if (bocaiTypeId == 8814) {//重庆幸运农场
                this.openPrize.resultArray = ["", "", "", "", "", "", "", ""];
            } else if (bocaiTypeId == 8815) {//天津时时彩
                this.openPrize.resultArray = ["", "", "", "", ""];
            } else if (bocaiTypeId == 9057) {//极速赛车
                this.openPrize.resultArray = ["", "", "", "", "", "", "", "", "", ""];
            }

        this.dialogvisible = true;
    },
    async restartOpenPrize() {
        let that = this;

        this.$c_msgconfirm("重启开奖需要一些时间,请确认是否重启开奖",async () => {

            await that.$get(`${window.url}/admin/prize/restartOpenPrize?bocaiTypeId=`+that.q.bocaiTypeId).then((res) => {
                that.$handelResponse(res, (result) => {
                })
              });

            that.$alertMessage('重启开奖成功,重启开奖需要一些时间,请稍后查看...!', '温馨提示');
      });

    },
    bocaiTypeSelect() {
        this.openPrizeSetList = [];
    },
    handleCurrentChange(cpage) {
      this.page.currentPage = cpage;
      this.getkaijiangList();
    },
    async getkaijiangList() {
        let url ='admin/prize/bocaiPeriodsList?1=1';
        if (null != this.q && null != this.q.bocaiTypeId && '' != this.q.bocaiTypeId) {
            url = url + "&bocaiTypeId=" + this.q.bocaiTypeId
        }
        if (null != this.q && null != this.q.dayStr && '' != this.q.dayStr) {
            url = url + "&dayStr=" + this.q.dayStr
        }


        let res = await this.$get(`${window.url}/`+ url +`&currentPage=`+this.page.currentPage+`&pageSize=`+this.page.pageSize);
            if(+res.code===200) {

                this.openPrizeSetList = res.list;
                //this.ruleId = res.ruleId;  ````````问威，这个旧网站怎么有，新接口没有，接口一样，传参也一样

                this.page.totalPage = res.totalPage/this.page.pageSize;
                this.page.totalCount = res.totalPage;


                    // if (res.page.totalPage == 0) {
                    //     this.page.totalPage = 1;
                    //     this.page.totalCount = 
                    // } else {
                    //     this.page.totalPage = res.page.totalPage/this.page.pageSize;
                    // }

            }
    },
    async bocaiTypeList() {
      let res = await this.$get(`${window.url}/admin/bocai/getOdds`);

      if(res.code===200){
        this.bocaiTypeListArr = res.list;
      }
    },




    async baseSet() {
      let res = await this.$get(`${window.url}/admin/gameManage/getBocaiBaseSet?bocaiTypeId=`+this.bocaiId+`&userId=`+this.userInfo.id);

      if(res.code===200){

        this.baseBocaiInfo = res.data;
        this.baseBocaiInfo.isOpen = this.baseBocaiInfo.isOpen == 1 ? true : false;
      }
    },

    async saveoddInfo() {

      console.log('baseBocaiInfo',this.baseBocaiInfo);

      let that = this;

      let obj = {
        userId: this.baseBocaiInfo.userId,
        bocaiId: this.baseBocaiInfo.bocaiId,
        bocaiName: this.baseBocaiInfo.bocaiName,
        minimumBet: this.baseBocaiInfo.minimumBet,
        highestPayout: this.baseBocaiInfo.highestPayout,
        opentime: this.baseBocaiInfo.opentime,
        closetime: this.baseBocaiInfo.closetime,
        isOpen: this.baseBocaiInfo.isOpen ? 1 : 0,
        advanceTime: this.baseBocaiInfo.advanceTime
      }

      const loading = this.$loading({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
          await that.$post(`${window.url}/admin/gameManage/bocaiBaseSet`,obj).then((res) => {
            that.$handelResponse(res, (result) => {
          loading.close();
              if(result.code===200){
                that.$success(result.msg);
                that.baseSet();
              }
            })
      });
    }


  }
}

</script>

<style scoped>
#modifyLoty .addLotyKj > input[type="text"] {
    width: 30px;
    height: 30px;
    margin-right: 8px;
}
.modal-body,.addLotyKj,.modal-footer {
    margin: 5px 0px;
}
</style>
