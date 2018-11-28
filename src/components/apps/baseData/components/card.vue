<template>
  <div class="card">
    <div class="contend">
      <slot name="content"></slot>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  props:{
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.card {
  background-color: #ffffff;
  border-radius: 5px;
  margin: 0 20px 10px;
}
</style>
