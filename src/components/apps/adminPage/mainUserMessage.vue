<template>
  <div id="youxishezhi" class="content-main">
    
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>在线管理</el-breadcrumb-item>
        <el-breadcrumb-item>会员消息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="portlet portlet-add">

      <div class="tab">
        <div class="nav">
          <div class="btn-ground">
            会员消息　 
          </div>
        </div>
        <table>
          <thead>
            <tr class="trBar">
              <th>编号</th>
                <th>日期</th>
                <th>会员</th>
                <th>发布者</th>
                <th>内容</th>
                <th>读/次</th>
                <th>功能</th>
            </tr>
          </thead> 
          <tbody>
            <tr v-for="message in messageList">
                <td>{{message.id}}</td>
                <td>{{$timestampToTime(message.updateDate)}}</td>
                <td>{{message.cUserUserName}}</td>
                <td>{{message.aUserUserName}}</td>
                <td>{{message.content}}</td>
                <td>{{message.readNum}}</td>
                <td>
                  <span>
                    <a class="tabBtn btnPurple green" @click="deleteMessageId(message.id)">删除</a> 
                  </span>
                  <span>
                    <a class="tabBtn btnPurple green" @click="messageInfo(message.cuserId)">消息</a> 
                  </span>
                  <span>
                    <a class="tabBtn btnPurple green" @click="messageStatus(message.id,message.status)">{{message.status == 1 ?'隐藏':'显示'}}</a> 
                  </span>
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
      huiyuanInfo: {},
      isBase: '',
      currentPage: 1,
      huiyuanAccout: '',
      startDate: '3',
      content: '',

      page: {
            totalPage: 1,
            currentPage: 1,
            pageSize: 10
        },
        showList: true,
        title: null,
        q: {
            username: "",
        },
        hyOnlineList: {},//会员列表
        totalCount: 0,//当前在线人数
        messageList: {},//短消息列表
        message: {
            cuserId: this.$route.params.id,
            content: ""
        },
        messageAuthority: 0,//单对单信息权限
        bettingAuthority: 0,//投注权限

        cUserId: this.$route.params.id
    }
  },
  computed: {
    ...mapGetters({
    })
  },
  created() {
    this.getmessageList();
  },
  mounted(){
  },
  methods: {
    messageInfo(id) {
      this.$router.push({
        name: 'messageInfo',
        params: {
          id: id
        }
      })
    },
    async messageStatus(id,status) {

      let tems = status == 1? 0 : 1;
      let res = await this.$get(`${window.url}/admin/system/messageStatus?id=`+ id+`&status=`+tems);

      if(res.code===200) {
        this.$success(res.msg);
        this.getmessageList();
      }
    },
    async deleteMessageId(id) {

      let that = this;

      this.$c_msgconfirm('是否确认删除此信息',async () => {

            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
            await that.$get(`${window.url}/admin/system/messageDelete?id=`+id).then((res) => {
            that.$handelResponse(res, (result) => {
          loading.close();
              if(result.code===200) {
                        this.$success('操作成功');
                        this.getmessageList();
                      } else {
                  }
            })
          });

      });

    },
    async sendMessage() {
      let res = await this.$post(`${window.url}/admin/system/sendMessage`,this.message);

      if(res.code===200) {
        this.$success('发送成功')
        this.getmessageList();
      } else {
      }

    },
    async getmessageList() {

      let res = await this.$get(`${window.url}/admin/system/messageList?cuserId=`);

      if(res.code===200) {
        this.messageList = res.page.list;
      }
    }

  }
}

</script>

<style scoped>
</style>
