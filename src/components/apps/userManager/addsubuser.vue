<template>
  <div id="youxishezhi" class="content-main">
    
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
        <el-breadcrumb-item>帐号管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'subuser' }">子帐号</el-breadcrumb-item>
        <el-breadcrumb-item>新增子帐号</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="portlet portlet-add">
      <div class="tab">
        <table>
          <thead>
            <tr>
              <th colspan="3">基本资料</th>
            </tr>
          </thead> 
          <tr>
            <td width="20%" class="tar"><span class="red">*</span> 帐号:</td> 
            <td class="tl"><p><input v-model="username" type="text" placeholder="请输入帐号"> <button @click="checkRepte()">帐号是否可用</button></p></td> 
            <td width="20%" class="tl">
              <p><i class="icon-exclamation-sign"></i> 帐号仅可接受英数字元, 长度限制4~12码</p>
            </td>
          </tr> 
          <tr>
            <td class="tar"><span class="red">*</span> 名称:</td> 
            <td class="tl"><input type="text" v-model="nickname" placeholder="请输入名称"></td> 
            <td class="tl"><i class="icon-exclamation-sign"></i> 请输入名称。</td>
          </tr> 
          <tr>
            <td class="tar"><span class="red">*</span> 密码:</td> 
            <td class="tl"><input type="password" v-model="password" placeholder="请输入密码"></td> 
            <td class="tl"><i class="icon-exclamation-sign"></i>
              密码长度不小于6位,且需数字字母混用(不可接受!#$&amp;*+.=@|等特殊字符)同组密码限用30天。
            </td>
          </tr>
        </table> 
        <table>
          <thead>
            <tr>
              <th colspan="3">权限设置</th>
            </tr>
          </thead> 
          <tr>
            <td width="20%" class="tar">权限:</td> 
            <td class="tl checkbox">
              <el-checkbox-group v-model="functionIdList">
                <el-checkbox :label="'1'" >{{'登陆'}}</el-checkbox>
                <el-checkbox :label="'2'" >{{'盘势管理'}}</el-checkbox>
                <el-checkbox :label="'3'" >{{'查看帐号'}}</el-checkbox>
                <el-checkbox :label="'4'" >{{'重置密码'}}</el-checkbox>
                <el-checkbox :label="'5'" >{{'注单查询'}}</el-checkbox>
                <el-checkbox :label="'6'" >{{'财务管理'}}</el-checkbox>
                <el-checkbox :label="'7'" >{{'报表'}}</el-checkbox>
              </el-checkbox-group>

            </td> 
            <td width="20%" class="tl">
              <i class="icon-exclamation-sign"></i> <span>请选择权限</span>
            </td>
          </tr>
        </table> 
        <p class="tac" style="margin-top: 8px;">
          <button class="tabBtn btn btn-blue mgr10" @click="addsubUser()">确定</button> 
          <button class="tabBtn btn btn-red" @click="$router.push({name:'subuser'})">取消</button>
        </p>
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
      isNew: this.$route.name == 'addsubuser' ? true : false,
      childUserInfo: {},
      currentPage: 1,
      functionIdList:[],//权限ID列表
      id:"", //id
      nickname:"",//昵称
      password:"",//密码
      repassword:"",//重复密码
      username:""//用户名
    }
  },
  computed: {
    ...mapGetters({
      upUserInfo: 'getupUserInfo'
    })
  },
  created() {
      console.log('this.upUserInfo',this.upUserInfo);

      if(!this.isNew) {

        this.id = this.upUserInfo.id;
        this.username = this.upUserInfo.username;
        this.nickname = this.upUserInfo.nickname;
        this.password = this.upUserInfo.password;
        for(let n in this.upUserInfo.functionIdList) {
          this.functionIdList.push(this.upUserInfo.functionIdList[n]+'');
        }
      }
  },
  mounted(){
  },
  methods: {
    qingkong() {
      this.functionIdList =[],//权限ID列表
      this.id = "", //id
      this.nickname= "",
      this.password= "",
      this.repassword= "",
      this.username= ""
    },
    async checkRepte() {

      let res = await this.$get(`${window.url}/admin/auser/checkUsername?username=`+this.username+`&id=`+this.id);

      if(+res.code===500){
        this.$alertMessage(res.msg, '温馨提示');
      } else if(+res.code===200) {
        this.$alertMessage('此帐号可用', '温馨提示');
      }

    },
    async addsubUser() {
      if(this.username == '') {
        this.$alertMessage('用户名不能为空!', '温馨提示');
      } else if(this.nickname == '') {
        this.$alertMessage('名称不能为空!', '温馨提示');
      } else if(this.password == '') {
        this.$alertMessage('密码不能为空!', '温馨提示');
      } else {

        if(this.isNew) {
          let dataobj = {
            id: this.id,
            username: this.username,
            nickname: this.nickname,
            password: this.password,
            repassword: this.password,
            functionIdList: this.functionIdList
          }

          let that = this;
            NProgress.start();
            await that.$post(`${window.url}/admin/auser/addChildUser`,dataobj).then((res) => {
              that.$handelResponse(res, (result) => {
                NProgress.done();
                if(result.code===200){
                  that.$success('提交成功!');
                  that.$router.push({name:'subuser'});
                }
              })
            });
        } else {

        }
      }
    }



  }
}

</script>

<style scoped>

</style>

