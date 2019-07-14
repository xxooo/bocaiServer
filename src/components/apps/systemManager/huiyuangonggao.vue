<template>
  <div id="youxishezhi" class="content-main">
    
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>会员公告</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="portlet">
      <div class="tab portlet-add">
        <table>
          <tr>
            <td width="20%">公告内容 : </td> 
            <td>
              <textarea placeholder="请输入公告内容" cols="150" rows="8" v-model="content"></textarea>
            </td>
          </tr>
        </table> 
        <p class="tac" style="margin-top: 8px;">
          <button class="tabBtn btn btn-blue" @click="savegonggao()">保存</button> 
          <button class="tabBtn btn btn-red" @click="content= ''">重填</button>
        </p>
      </div>

      <div class="tab">
        <div class="nav">
          <div class="btn-ground">
            时间 :
            <el-select v-model="startDate" placeholder="请选择" size="mini">
              <el-option value="1" key="1" label="昨天"></el-option> 
              <el-option value="2" key="2" label="今天"></el-option> 
              <el-option value="3" key="3" label="30天以内"></el-option>
            </el-select>
            状态 :
            <el-select v-model="status" placeholder="请选择" size="mini">
              <el-option value="1" key="1" label="显示"></el-option> 
              <el-option value="0" key="0" label="隐藏"></el-option> 
              <el-option value="" key="" label="全部"></el-option>
            </el-select>
            <button class="btn btn-blue" @click="childUser()">查询</button>
          </div>
        </div>
        <table>
          <thead>
            <tr class="trBar">
              <th width="100">编号</th> 
              <th width="150">日期</th> 
              <th width="150">发布者</th> 
              <th>内容</th> 
              <th width="150">状态</th> 
              <th width="150">功能</th>
            </tr>
          </thead> 
          <tbody>
            <tr v-for="(item,index) in gonggaoInfo.list">
              <td>{{item.id}}</td>
              <td>{{$timestampToTime(item.updateDate)}}</td>
              <td>{{item.createName}}</td>
              <td>{{item.content}}</td>
              <td>{{item.status == 0 ? '隐藏' : '显示'}}</td>
              <td class="btnFeatures" v-if="item.status == 0">
                <span>
                  <a class="tabBtn btnPurple red" @click="updateNotice(item,1)">显示</a> 
                </span>
              </td>
              <td class="btnFeatures" v-if="item.status == 1">
                <span>
                  <a class="tabBtn btnPurple green" @click="updateNotice(item,0)">隐藏</a> 
                </span>
              </td>
            </tr>

          </tbody>
        </table>
        <div class="block" v-if="gonggaoInfo.totalPage > 1">
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="gonggaoInfo.pageSize"
                    layout="total, prev, pager, next"
                    :total="gonggaoInfo.totalCount*1">
                  </el-pagination>
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
      bocaiId: 1,
      gonggaoInfo: {},
      isBase: '',
      currentPage: 1,
      status: '',
      startDate: '3',
      content: ''
    }
  },
  computed: {
    ...mapGetters({
    })
  },
  created() {
    this.childUser();
  },
  mounted(){
  },
  methods: {
    async updateNotice(item,st) {
      let obj = {
        id: item.id,
        status: st
      }

      let res = await this.$post(`${window.url}/admin/system/updateNotice`,obj);

      if(res.code===200){
        this.childUser();
      }
    },
    handleCurrentChange(cpage) {
      this.currentPage = cpage;
      this.childUser();
    },
    async savegonggao() {

      let that = this;

      let obj = {
        content: this.content
      }

      const loading = this.$loading({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
          await that.$post(`${window.url}/admin/system/addNotice`,obj).then((res) => {
            that.$handelResponse(res, (result) => {
          loading.close();
              if(result.code===200){
                that.$success(result.msg);
                that.childUser();
                that.content = '';
              }
            })
      });
    },
    async childUser() {
      let res = await this.$get(`${window.url}/admin/system/noticeList?currentPage=`+this.currentPage+`&status=`+this.status+`&startDate=`+this.startDate+`&pageSize=10`);

      if(res.code===200){
        this.gonggaoInfo = res.page;
      }
    }

  }
}

</script>

<style scoped>
</style>
