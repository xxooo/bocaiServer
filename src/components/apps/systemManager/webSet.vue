<template>
  <div id="youxishezhi" class="content-main webSet">
    
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>网站设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="portlet">
      <div class="tab portlet-add">
        <table class="main-tables coinfo-card">
            <tr>
                <th colspan="3" class="coheader">网站信息 (多个网址用英文逗号,分割)</th>
            </tr>

            <tr>
                <td width="30%">网站名</td>
                <td class="tl"><input type="text" v-model="webSet.name" placeholder="请输入网站名" ></td>
            </tr>

            <tr>
                <td>网站Title</td>
                <td class="tl"><input type="text" v-model="webSet.title" placeholder="请输入网站Title" ></td>
            </tr>

            <tr>
                <td>网站关键字</td>
                <td class="tl"><input type="text" v-model="webSet.keyword" placeholder="请输入网站关键字" ></td>
            </tr>

            <tr>
                <td>网站描述</td>
                <td class="tl"><input type="text" v-model="webSet.remark" placeholder="请输入网站描述" ></td>
            </tr>

            <tr>
                <td>Logo(尺寸: 250 x 90大小: 200K)</td>
                <td>
                    <div class="imgdiv">
                        <img  :class="'index1logo'" :src="webSet.logo" org="" alt="" width="148" height="148" onerror="">
                    </div>
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl"
                        :headers="customHeader"
                        :before-upload="beforeUpload"
                        :on-success="handleAvatarSuccess"
                        :show-file-list="false">
                        <el-button class="tabBtn btn btn-blue" size="small" type="primary" @click="shangchuan('logo')">{{'上传'}}</el-button>
                    </el-upload>
                </td>
            </tr>

            <tr>
                <td>绑定网站域名</td>
                <td class="tl">
                    <input type="text" v-model="webSet.domain" placeholder="请输入网站域名" >
                </td>
            </tr>

            <tr>
                <td>公司后缀</td>
                <td class="tl">
                    <input type="text" v-model="webSet.companySuffix" placeholder="请输入公司后缀" >
                </td>
            </tr>

            <tr>
                <td>代理后缀</td>
                <td class="tl">
                    <input type="text" v-model="webSet.agentSuffix" placeholder="请输入代理后缀" >
                </td>
            </tr>
            <tr>
                <th colspan="3" class="coheader">试用/注册设置 (如果没有绑定域名和使用推广码, 设置无效)</th>
            </tr>

            <tr>
                <td width="30%">会员试用初始金额</td>
                <td class="tl">
                    <input type="text" v-model="webSet.initUserMoney" placeholder="金额只能输入数字" >
                </td>
            </tr>

            <tr>
                <td>会员注册初始盘口</td>
                <td class="tl">
                    <label><input class="inputRadio" type="radio" name="handicap" v-model="webSet.initUserHandicap" value="a"> A盘</label>
                    <label><input class="inputRadio" type="radio" name="handicap" v-model="webSet.initUserHandicap"  value="b"> B盘</label>
                    <label><input class="inputRadio" type="radio"  name="handicap" v-model="webSet.initUserHandicap"  value="c"> C盘</label>
                    <label><input class="inputRadio" type="radio"  name="handicap" v-model="webSet.initUserHandicap"  value="d"> D盘</label>
                </td>
            </tr>

            <tr>
                <th colspan="3" class="coheader">客服设置 (如果没有绑定域名和使用推广码, 设置无效)</th>
            </tr>

            <tr>
                <td width="30%">web客服只需要输入网址(http://xxx.xxx/xxx/xxx?xxx=xxx)</td>
                <td class="tl">
                    <input type="text" placeholder="请输入web客服" v-model="webSet.webService" ></input>
                </td>
            </tr>

            <tr>
                <td>QQ客服</td>
                <td class="tl">
                    <input type="text" v-model="webSet.qqService" placeholder="请输入QQ客服号码" >
                </td>
            </tr>

            <tr>
                <td>微信客服</td>
                <td>
                    <div class="imgdiv">
                        <img  :class="'index1logo'" :src="webSet.weixinService" org="" alt="" width="148" height="148" onerror="">
                    </div>
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl"
                        :headers="customHeader"
                        :before-upload="beforeUpload"
                        :on-success="handleAvatarSuccess"
                        :show-file-list="false">
                        <el-button class="tabBtn btn btn-blue" size="small" type="primary" @click="shangchuan('weixinService')">{{'上传'}}</el-button>
                    </el-upload>
                </td>
            </tr>
            <tr>
                <th colspan="3" class="coheader">报警设置</th>
            </tr>

            <tr>
                <td width="30%">邮箱帐号</td>
                <td class="tl">
                    <input type="text" v-model="webSet.email" placeholder="请输入邮箱帐号" >
                </td>
            </tr>

            <tr>
                <td>密码</td>
                <td class="tl">
                    <input type="text" v-model="webSet.emailPassword" placeholder="请输入邮箱密码" >
                </td>
            </tr>

            <tr>
                <td>发件服务器</td>
                <td class="tl">
                    <input type="text" v-model="webSet.emailSend" placeholder="请输入发件服务器" >
                </td>
            </tr>

            <tr>
                <td>收件服务器(多个邮箱用英文分号 ; 分隔)</td>
                <td class="tl">
                    <input type="text" v-model="webSet.emailPut" placeholder="请输入收件服务器" >
                </td>
            </tr>

            <tr>
                <td>手动发送邮件</td>
                <td class="tl">
                    <textarea rows="3" placeholder="请输入手动发送邮件" v-model="webSet.emailContent" class="textarea-std"></textarea>
                </td>
            </tr>
        </table>
            <p class="table-btngroup">
                <button class="btn btn-common btn-primary" @click="save()" type="button">保存</button>　　　　　
            </p>
      </div>

    </div>

  </div>
</template>



<script>
import { mapGetters } from 'vuex';
import cookieParser from './../../../assets/js/cookie';

export default {
  components: {
  },
  data () {
    return {
      bocaiId: 1,
      gonggaoInfo: {},
      isBase: '',
      currentPage: 1,
      status: '',
      startDate: '3',
      content: '',

      showList: true,
        title: null,
        webSet: {//对象
            id: "",
            name: "",//网站名称
            title: "",//网站TITLE
            keyword: "",//网站关键字
            logo: "",//网站LOGO
            domain: "",//网站域名
            companySuffix: "",//公司后缀
            agentSuffix: "",//代理后缀
            initUserMoney: "",//初始试用会员金额
            initUserHandicap: "",//初始会员盘口
            webService: "",//web客服
            qqService: "",//qq客服
            weixinService: "",//微信客服，二维码
            email: "",//邮箱密码
            emailPassword: "",//邮箱密码
            emailPut: "",//收件人邮箱
            emailSend: "",//发件人邮箱
            emailContent: "",//手动发送邮件内容
            createId: '',//创建人ID
            createName: "",//创建人名称
            remark: ""//网站描述
        },
        templtStr: '',
        token: ''
    }
  },
  computed: {
    ...mapGetters({
        userInfo: 'getuserInfo',
    }),
    customHeader(){
          return {
            'token': this.token
          }
    },
    uploadUrl: function () {
        return `${window.url}/admin/system/updateFile`;
    }
  },
  created() {
    this.userList();
    this.token = cookieParser.getCookie("accesstoken");
  },
  mounted(){
  },
  methods: {
    shangchuan(item) {

        this.templtStr = item;
        
    },
    handleAvatarSuccess(res, file) {

        let name = `${file.name}`;
        this.imgname =  name.match(/[^-]+$/)[0];

        if(this.templtStr == 'logo') {
            this.webSet.logo = res.imgUrl;
        } else if(this.templtStr == 'weixinService') {
            this.webSet.weixinService = res.imgUrl;
        }

      },
    beforeUpload(file){
                let {size,name} = file;


                if(!/\.png?|\.jpf?|\.bmp?|\.gif|\.svg|\.psd$/.test(name)){
                    this.$error('文档类型错误');
                    this.loading = false;
                    return false
                }else if(size>5*1024*1024){
                    this.$error('超出大小');
                    this.loading = false;
                    return false
                }
      },
    reload() {
            this.showList = true;
            this.userList();
        },
        query() {
            this.reload();
        },
        async save() {

          let that = this;

          this.webSet.createId = this.userInfo.id;
          this.webSet.createName = this.userInfo.username;


          for(let n in this.webSet) {
            if(this.webSet[n] == null) {
                this.webSet[n] = '';
            }
          }


            let num = /^[0-9]*$/;//数字
            if(!num.test(this.webSet.initUserMoney)){
              that.$alertMessage('会员试用初始金额只能输入数字!', '温馨提示');
                return;
            }
            // if(!num.test(this.webSet.qqService)){
            //    that.$alertMessage('QQ客服只能输入数字!', '温馨提示');
            //     return;
            // }


            //let url = this.webSet.id == "" ? "admin/system/addCompany" : "admin/system/editCompany";
            let url = 'admin/system/editCompany';


                let data = await this.$post(`${window.url}/`+ url,this.webSet);
                  if(+data.code===200) {
                    that.$success('保存成功');
                    that.reload();
                  } else {
                    that.$error(data.msg);
                  }

        },
        logoUpload(value){
            if(value == 1){//logo

            }else if(value ==2){//微信客服

            }
        },
      // async changeImage(type) {//预览图片
      //     let that = this;

      //       let img1 = event.target.files[0];

      //       if (img1.type != 'image/png' && img1.type != 'image/jpg' && img1.type != 'image/jpge' && img1.type != 'image/JPGE' && img1.type != 'image/jpeg') {
      //         that.$alertMessage('图片格式不正确!', '温馨提示');
      //           return false;
      //       }

      //       //将图片上传到后台
      //       let formData = new FormData();
      //       formData.append('file', img1); // 文件数据

      //       let res = await this.$post(`${window.url}/admin/system/updateFile`,formData);

      //       if(res.code===200){
      //         if(type==1){
      //                   that.webSet.logo = res.imgUrl;
      //               }else{
      //                   that.webSet.weixinService = res.imgUrl;
      //               }
      //       }

      //       // $.ajax({
      //       //     type: "POST",
      //       //     url: baseURL + "admin/system/updateFile",
      //       //     dataType: 'JSON',
      //       //     processData: false,
      //       //     contentType: false,
      //       //     data: formData,
      //       //     success(r) {
      //       //         if(type==1){
      //       //             this.webSet.logo = r.imgUrl;
      //       //         }else{
      //       //             this.webSet.weixinService = r.imgUrl;
      //       //         }
      //       //     }
      //       // });


      //   },

       async userList() {

        let data = await this.$get(`${window.url}/admin/system/company`);
            if(+data.code===200) {

               if (data.data != null) {
                          this.webSet = data.data;
                      }

            }


      }


  }
}

</script>

<style scoped>
.webSet input:not(.inputRadio) {
    width: 300px;
}
.webSet textarea {
    width: 500px;
}
</style>
