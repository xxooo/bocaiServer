<template>
	<span class="" style="float: right;">
		<el-button v-if='type == 1' class="edit-btn"  @click="clickIcon" >
			<i class="iconfont" :class="iconClass" :title="title"></i>
			<span v-if='showText'>{{title}}</span>
		</el-button>
		<router-link v-if='type == 2' :to="{name: routerName}" :target="target">
			<el-button class="edit-btn">
				<i class="iconfont" :class="iconClass" :title="title"></i>
				<span v-if='showText'>{{title}}</span>
			</el-button>
		</router-link>
	</span>
</template>

<script>
	import ElButton from "element-ui/packages/button/src/button";

  export default {
    components: {ElButton},
    props:{
			type:{
				default:1
			},
			routerName:{
				type: String
			},
			title:{
				type: String
			},
			iconClass:{
				type: String
			},
			target:{
				default: '_self'
			},
			showText:{
				default: true
			},
		},
		created(){
		},
		methods:{
			clickIcon(){
				let that = this;
				this.$emit('click')
			}
		}
	}
</script>

<style lang='less' scoped>
	.edit-btn{
    display: inline-block;
    background: #FFFFFF;
    border: 1px solid #D8D8D8;
    border-radius: 4px;
    padding: 0 8px;
    margin-left: 10px;
    height: 30px;
    line-height: 27px;
    font-size: 14px;
    cursor: pointer;
    i {
	    color: #515866;
	    cursor: pointer;
    }
	}
  .edit-btn:hover,.edit-btn:focus{border-color: #3399ff}
  .edit-btn:focus i{color: #3399ff;}
  .edit-btn:hover i{color: #3399ff;}
</style>
