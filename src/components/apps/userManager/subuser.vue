<template>
  <div id="youxishezhi" class="content-main">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="nav">
      <span>游戏类型:
        
        <div class="btn-ground">
          <button class="tabBtn btn btn-blue mgr10" @click="$router.push({name:'youxishezhi'})">新增子帐号</button> 
        </div>
      </span>
    </div>

    <div class="portlet">
      <div class="tab">
        <table>
          <thead>
            <tr>
              <th>帐号</th> 
              <th>名称</th> 
              <th>密码</th> 
              <th>登陆</th> 
              <th>盘势管理</th> 
              <th>查看帐号</th> 
              <th>重置密码</th> 
              <th>注单查询</th> 
              <th>财务管理</th> 
              <th>报表</th> 
              <th>新增时间</th> 
              <th>功能</th>
            </tr>
          </thead> 
          <tbody>
            <tr>
              <td>test2333</td> 
              <td>test66554</td> 
              <td>a111111</td> 
              <td class="green red">开启</td> 
              <td class="red">关闭</td> 
              <td class="red">关闭</td> 
              <td class="red">关闭</td> 
              <td class="red">关闭</td> 
              <td class="red">关闭</td> 
              <td class="red">关闭</td> 
              <td>2018-12-28 21:11:03</td> 
              <td><a href="#/account/sub/edit/5c2620e753cf78728979c778" class="tabBtn btnPurple"><i class="icon-pencil"></i>修改资料</a> <a class="tabBtn btnRed"><i class=" icon-trash"></i> 删除</a>
              </td>
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
      bocaiId: 1,
      curactiveIndex: '',
      baseBocaiList: [],
      routerName: this.$route.name,
      piliang: 'B',
      piliangValue: '',
      selectList: [],
      fudongtype: 0,
      fudongvalue: 0,
      fudongnum: ''
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

   // this.baseSet();

  },
  mounted(){
  },
  methods: {
    changefdtype(data) {
      for(let n in this.baseBocaiList) {
        this.baseBocaiList[n].floatType = data;
        let obj = {
                      id: this.baseBocaiList[n].id,
                      dewaterName: this.baseBocaiList[n].dewaterName,
                      floatType: this.baseBocaiList[n].floatType,
                      triggerFloat: this.baseBocaiList[n].triggerFloat,
                      floatValue: this.baseBocaiList[n].floatValue
                    };
            this.selectList.push(obj);
      }
    },
    setfudong() {
      if(+this.fudongvalue === 0) {
        for(let n in this.baseBocaiList) {
          this.baseBocaiList[n].triggerFloat = this.fudongnum;
          let obj = {
                        id: this.baseBocaiList[n].id,
                        dewaterName: this.baseBocaiList[n].dewaterName,
                        floatType: this.baseBocaiList[n].floatType,
                        triggerFloat: this.baseBocaiList[n].triggerFloat,
                        floatValue: this.baseBocaiList[n].floatValue
                      };
              this.selectList.push(obj);
        }
      } else {
        for(let n in this.baseBocaiList) {
          this.baseBocaiList[n].floatValue = this.fudongnum;
          let obj = {
                        id: this.baseBocaiList[n].id,
                        dewaterName: this.baseBocaiList[n].dewaterName,
                        floatType: this.baseBocaiList[n].floatType,
                        triggerFloat: this.baseBocaiList[n].triggerFloat,
                        floatValue: this.baseBocaiList[n].floatValue
                      };
              this.selectList.push(obj);
        }
      }
    },
    inputFunc(item) {
      console.log('item',item);

      let ifHas = false;
                for(let n in this.selectList) {
                  if(this.selectList[n].id == item.id) {
                    ifHas = true;
                    let obj = {
                      id: item.id,
                      dewaterName: item.dewaterName,
                      floatType: item.floatType,
                      triggerFloat: item.triggerFloat,
                      floatValue: item.floatValue
                    };

                    this.selectList[n] = obj;
                  }
                }

                if(!ifHas) {
                  let obj = {
                    id: item.id,
                      dewaterName: item.dewaterName,
                      floatType: item.floatType,
                      triggerFloat: item.triggerFloat,
                      floatValue: item.floatValue
                  };

                  this.selectList.push(obj);
                }

    },
    async baseSet() {
      if(this.routerName != 'peilvfudongset') {
        this.$router.push({name:"peilvfudongset"});
      } 

      for(let n in this.bocaiMenu) {
        if(this.bocaiId == this.bocaiMenu[n].id) {
          this.curactiveIndex = this.bocaiMenu[n].name;
        }
      }

      let res = await this.$get(`${window.url}/admin/gameManage/oddsFloat?bocaiTypeId=`+this.bocaiId);

      if(res.code===200){

        this.baseBocaiList = res.list;
      }
    },

    async saveoddCha() {

      console.log('selectList',this.selectList);

      let that = this;

      let listdata = {};
      listdata.list = this.selectList;

      NProgress.start();
          await that.$post(`${window.url}/admin/gameManage/oddsFloatSub`,listdata).then((res) => {
            that.$handelResponse(res, (result) => {
              NProgress.done();
              if(result.code===200){
                that.$success(result.msg);
                that.selectList = [];
                that.baseSet();
              }
            })
      });
    }


  }
}

</script>

<style scoped>
</style>
