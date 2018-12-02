<template>
  <div class="content-main" id="home">
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      bocaiTypeList: [],
      bocaiTypeId: '1',
      cbocai: '重庆时时彩',
      cUserdeList: []
    }
  },
  created() {
    this.cUserdewater(this.bocaiTypeId);
    this.getBocai();
  },
  computed: {
  },
  methods: {
    getcuserInfo(item) {
      this.cbocai = item.bocaiName;
      this.cUserdewater(item.bocaiId);
      $('.bocai'+item.bocaiId).addClass('active').siblings().removeClass('active');
    },
    async getBocai() {
      let res = await this.$get(`${window.url}/api/getBocai`);

          if(res.code===200){
            this.bocaiTypeList = res.bocaiTypeList;
          }
    },
    changeboType(data) {
      this.cUserdewater(data);
    },
    async cUserdewater(id) {

      let res = await this.$get(`${window.url}/api/cUserdewater?bocaiTypeId=`+id);

        if(res.code===200){
            this.cUserdeList = res.data;

        } 
    }
  },
  mounted() {
  },
  updated() {
  }
};
</script>
<style scoped>
</style>
<style lang="less">
  
</style>