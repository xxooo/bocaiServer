<template>
  <div id="youxishezhi" class="content-main tuishuiclass">
    
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>帐号管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'gudong' }">股东</el-breadcrumb-item>
        <el-breadcrumb-item>退水设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="nav">
      <span>游戏类型:
        <el-select v-model="bocaiId" @change="childUser()" placeholder="请选择" size="mini">
          <el-option
            v-for="item in bocaiMenu"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>

      </span>

    </div>

    <div class="portlet portlet-add">
      <div class="tab">
        <table>
          <thead>
            <tr>
              <th>勾选</th> 
              <th>重庆时时彩</th> 
              <th>退水设定 A</th> 
              <th>退水设定 B</th> 
              <th>退水设定 C</th> 
              <th>退水设定 D</th> 
              <th>单注限额</th> 
              <th>单期限额</th>
            </tr>
          </thead> 
          <tbody>
            <tr>
              <td><input type="checkbox" value="单码" style="width: 40px;"></td> 
              <td>单码</td> 
              <td><input type="text"></td> 
              <td><input type="text"></td> 
              <td><input type="text"></td> 
              <td><input type="text"></td> 
              <td><input type="text"></td> 
              <td><input type="text"></td>
            </tr>
          </tbody>
        </table> 
        <div class="func">
          <div class="tabs">
            <fieldset>
              <legend>勾选</legend> 
              <button class="tabBtn btn-blue">全选</button> 
              <button class="tabBtn btn-red">取消</button>
            </fieldset> 
            <fieldset>
              <legend>套用上层</legend> 
              <label style="float: right;">
              <input type="checkbox">全套用</label> 
              <label><input type="checkbox" value="A">A</label> 
              <label><input type="checkbox" value="B">B</label> 
              <label><input type="checkbox" value="C">C</label> 
              <label><input type="checkbox" value="D">D</label> 
              <br> 
              <label><input type="checkbox" value="item">单注限额</label> 
              <label><input type="checkbox" value="bet">单期限额</label> 
              <br> 
              <button class="tabBtn btn-blue">套用上层</button>
            </fieldset> 
            <fieldset>
              <legend>退水</legend> 
              <label style="float: right;"><input type="checkbox">全套用</label> 
              <label><input type="checkbox" value="A">A</label> 
              <label><input type="checkbox" value="B">B</label> 
              <label><input type="checkbox" value="C">C</label> 
              <label><input type="checkbox" value="D">D</label> 
              <br> 
              <button class="tabBtn btn-blue">调高</button> 
              <button class="tabBtn btn-blue">调低</button> 
              <button class="tabBtn btn-blue">最大</button> 
              <button class="tabBtn btn-blue">归零</button>
            </fieldset> 
            <fieldset>
              <legend>金额</legend> 
              <input type="text" class="inpText"> 
              <br> 
              <button class="tabBtn btn-blue">单注限额</button> 
              <button class="tabBtn btn-blue">单期限额</button>
            </fieldset> 
            <fieldset>
              <legend>下层上修</legend> 
              <label><input type="radio" value="0">保持不变</label> 
              <label><input type="radio" value="1">等量修改</label> 
              <label><input type="radio" value="2">套用本层</label>
            </fieldset> 
            <div>
              <button class="tabBtn btn btn-blue">保存</button> 
              <button class="tabBtn btn btn-red">取消</button>
            </div>
          </div>
        </div>
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
      isSubTuishui: this.$route.name == 'tuishuisheding' ? true : false,
      childUserList: [],
      childUserInfo: {},
      bocaiId: '',
      currentPage: 1,
      shuaixuanNum: '1',
      gudongAccout: ''
    }
  },
  computed: {
    ...mapGetters({
      ruleId:'getruleId',
      userInfo: 'getuserInfo',
      upUserInfo: 'getupUserInfo',
      bocaiMenu: 'getbocaiMenu'
    })
  },
  created() {

   //this.childUser();

  },
  mounted(){
  },
  methods: {
    async childUser() {
      let userId = '';

      if(isSubTuishui) {
        userId = this.upUserInfo.id;
      }

      let res = await this.$get(`${window.url}/admin/bocai/getDewater?userId=`+userId+`&bocaiTypeId=`+this.bocaiId);

      if(res.code===200){

        //this.childUserInfo = res.page;

    //     "data": {
    //     "userData": {//当前用户的盘口，退水数据要根据用户是否开通了这个盘口进行显示。
    //         "handicapD": 1,//盘口D，0为否，1为是
    //         "handicapC": 1,//盘口C，0为否，1为是
    //         "handicapB": 1,//盘口B，0为否，1为是
    //         "handicapA": 1 //盘口A，0为否，1为是
    //     },
    //     "pDeWaterList": [//父用户退水,当前用户设置不能超过父
    //         {
    //             "id": "40",
    //             "userId": "1",//用户ID
    //             "handicapaDewaterRate": 20,//盘口A退水
    //             "handicapbDewaterRate": 20,//盘口B退水
    //             "handicapcDewaterRate": 20,//盘口C退水
    //             "handicapdDewaterRate": 20,//盘口D退水
    //             "danzhuXiane": 20,//单注金额
    //             "danqiXiane": 20,//单期金额
    //             "createDate": 1528973935000,
    //             "updateDate": 1528986130000,
    //             "dewaterId": "1",//退水ID
    //             "deWaterName": "单码",//退水名称
    //             "bocaiTypeId": null,
    //             "userIds": null
    //         },
    //         }
    //     ]
    //     "deWaterList": [//当前用户退水设置
    //         {
    //             "id": "40",
    //             "userId": "1",//用户ID
    //             "handicapaDewaterRate": 20,//盘口A退水
    //             "handicapbDewaterRate": 20,//盘口B退水
    //             "handicapcDewaterRate": 20,//盘口C退水
    //             "handicapdDewaterRate": 20,//盘口D退水
    //             "danzhuXiane": 20,//单注金额
    //             "danqiXiane": 20,//单期金额
    //             "createDate": 1528973935000,
    //             "updateDate": 1528986130000,
    //             "dewaterId": "1",//退水ID
    //             "deWaterName": "单码",//退水名称
    //             "bocaiTypeId": null,
    //             "userIds": null
    //         },
    //         {
    //             "id": "60",
    //             "userId": "1",
    //             "handicapaDewaterRate": 20,
    //             "handicapbDewaterRate": 20,
    //             "handicapcDewaterRate": 20,
    //             "handicapdDewaterRate": 20,
    //             "danzhuXiane": 20,
    //             "danqiXiane": 20,
    //             "createDate": 1528973935000,
    //             "updateDate": 1528986130000,
    //             "dewaterId": "21",
    //             "deWaterName": "组选六",
    //             "bocaiTypeId": null,
    //             "userIds": null
    //         }
    //     ]
    // }


    
      }
    }

  }
}

</script>

<style scoped>
</style>
