<template>
  <div class="pannel mycss" :style="{'padding':padding+'px'}">
    <div class="line pannel-content">
      <slot name="content"></slot>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  name: 'pannel',
  props:{
    title: {
      type: String,
      default: ''
    },
    back: {
      type: Boolean,
      default: true
    },
    center: {
      type: Boolean,
      default: true
    },
    padding: {
      type: Number,
      default: 20
    },
  },
  data() {
    return {}
  },
  mounted() {
    this.$emit('mounted')
  },
  methods: {
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mycss *{
    cursor: default;
  }
</style>
