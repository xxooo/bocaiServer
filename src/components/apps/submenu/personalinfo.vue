<template>
  <div class="content-main">
    <div class="right">
      <div id="submenuDiv">
        <div class="box">

          <div class="header">
            <p>个人资讯</p>
          </div> 

          <div class="default-list">
            <ul class="game-list">
              <li v-for="item in bocaiTypeList" class="gameNav" :class="['bocai'+item.bocaiId,item.bocaiId == '1' ? 'active' : '']" @click="getcuserInfo(item)">{{item.bocaiName}}</li>
            </ul> 

            <div class="statement">
              <table>
                <thead>
                  <tr>
                    <th>{{cbocai}}</th> 
                    <th>退水</th> 
                    <th>单注限额</th> 
                    <th>单期限额</th>
                  </tr>
                </thead> 
                <tbody>
                  <tr v-if="cUserdeList.length*1 == '0'">
                    <td style="line-height: 26px;" colspan="4">{{"暂无数据"}}</td> 
                  </tr>
                  <tr v-for="item in cUserdeList">
                    <td style="line-height: 24px;">{{item.deWaterName}}</td>
                    <td style="line-height: 24px;">{{item.handicapDewaterRate}}</td> 
                    <td style="line-height: 24px;">{{item.danzhuXiane}}</td> 
                    <td style="line-height: 24px;">{{item.danqiXiane}}</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

        </div>
      </div>
    </div>
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