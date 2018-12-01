<template>
  <div class="box">
    <div class="header">
    <p>即时注单</p>
    </div> 
    <div class="default-list">
    <p class="tar">
    <a class="refresh l"><i class="icon-refresh"></i>刷新</a>
      页数：
      <select><option value="1">1</option></select>
      / 1 页 共 0 条记录
    </p> 
    <table>
    <thead>
    <tr>
    <th>编号</th> 
    <th>注单号/投注日期</th> 
    <th>投注类型</th> 
    <th>内容</th> 
    <th>投注额</th> 
    <th>可赢金额</th>
    </tr>
    </thead> 
    <tbody>
    <tr>
    <td>1</td> 
    <td>
    <p>29493652182</p> 
    <p>2018-10-09 11:37:05</p>
    </td> 
    <td>
    <p>六合彩</p> 
    <p>2018115 期</p>
    </td> 
    <td>
    <p>
    <span class="odds-font">特码A 11</span>
              @
    <span class="odds-font">40.84</span>
    </p>
    </td> 
    <td>22.00</td> 
    <td>876.48</td>
    </tr>
    </tbody> 
    <tr class="tab-footer">
    <td colspan="4" class="tar">此页面统计：</td> 
    <td>22.00</td> 
    <td>876.48</td>
    </tr> 
    <tr class="tab-footer">
    <td colspan="4" class="tar">总计：</td> 
    <td>22.00</td> 
    <td>876.48</td>
    </tr>
    </table>
    </div> 
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
    }
  },
  async created() {
  },
  computed: {
  },
  methods: {
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