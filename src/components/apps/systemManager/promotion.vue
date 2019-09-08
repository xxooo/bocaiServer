<template>
  <div id="youxishezhi" class="content-main">
    
    <div class="nav">
      <div class="curweizhi">当前位置：</div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>推广</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="portlet">
      <div class="tab">
        <div class="nav">
        </div>
        <table>
          <tr>
            <th colspan="3" class="coheader">推广信息</th>
          </tr>
          <tr>
            <td class="height25">推广链接1</td>
            <td class="tl">{{url1}}</td>
          </tr>
          <tr>
            <td class="height25">推广链接2</td>
            <td class="tl">{{url2}}</td>
          </tr>
          <tr>
            <td class="height25">推广链接3</td>
            <td class="tl">{{url3}}</td>
          </tr>
          <tr>
            <td class="height25">推广链接4</td>
            <td class="tl">{{url4}}</td>
          </tr>
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
      extensionList: [],
      url1: '',
      url2: '',
      url3: '',
      url4: ''
    }
  },
  computed: {
    ...mapGetters({
    })
  },
  created() {
    this.extension();
  },
  mounted(){
  },
  methods: {
    async extension() {
      let res = await this.$get(`${window.url}/admin/finance/extension`);

      if(res.code===200){
        this.url1 = res.data.url1 || '';
        this.url2 = res.data.url2 || '';
        this.url3 = res.data.url3 || '';
        this.url4 = res.data.url4 || '';
      }
    }

  }
}

</script>

<style scoped>
.height25 {
  height: 25px;
}
</style>
