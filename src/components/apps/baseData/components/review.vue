<template>
  <div>
    <div class="main-panel-wapper devicerule">
      <div class="tool-bar">
        <el-breadcrumb class="bar-title" separator="/">
          <el-breadcrumb-item :to="{ name: $route.params.name}">{{$route.params.title}}</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">{{$root.langs.baseData['smartspc.baseData.reviewUploadFile']}}</a></el-breadcrumb-item>
        </el-breadcrumb>
    		<!--<span class="bar-title" >
    			{{$root.langs.baseData['smartspc.baseData.reviewUploadFile']}}
    		</span>-->
        <icon-font @click="save" v-if="ifhasdata" :iconClass='"icon-ok"' :title="$root.langs.common['smartspc.common.save']"></icon-font>
      </div>
      <Pannel  :center="true">
        <div slot="content" class="mineditbody">
          <template v-for="(table,key) in data" v-if="key !=='FileID'">
            <h4 class="title">{{key}} </h4>
            <el-table :data="table.row" style="width: 100%; border-bottom:solid 15px #f2f3f7">
              <el-table-column v-for="(label,filed) in table.colname" style="color:red"
                                :key="filed"
                               :prop="filed"
                               :label="label">
                <template slot-scope="scope">
                <span>
                  {{ scope.row[filed] }}
                </span>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </Pannel>
    </div>
  </div>
</template>

<script>
  import NProgress from 'nprogress'
  import 'nprogress/nprogress.css'
  export default {
    props:{
      title:{
        type:String
      }
    },
    data() {
      return {
        data:this.$route.params.data,
        ifhasdata: true
      }
    },
    components: {
      Pannel: resolve => require(['common/pannel.vue'], resolve),
      IconFont: resolve => require(['common/iconfont.vue'], resolve)
    },
    created() {
      //console.log('this.data',this.data)
      if(!this.data) {
        this.ifhasdata = false;
      }
    },
    methods: {
      goBack: function() {
        this.$router.go(-1);
      },
      save: async function(){
        // let res = await this.$post(`${window.gatewayspc}/infra/import_excel`,{FileID:this.data.FileID});
        // this.$notify({
        //   title: '信息提示',
        //   message: res.msg,
        //   position: 'bottom-right'
        // });

        console.log('this.data.FileID',this.data.FileID);

        let that = this;

          NProgress.start();

          await that.$post(`${window.gatewayspc}/infra/import_excel`,{FileID:this.data.FileID}).then((res) => {
            that.$handelResponse(res, (result) => {
              NProgress.done();
              if(result.code == '0') {
                that.$notify({
                  title: '信息提示',
                  message: result.msg,
                  position: 'bottom-right'
                });
                router.push({name:'parameterConfiguration'});
              }

            })
          });


      }
    }
  }
</script>

<style lang="less" scoped>
  .mineditbody>.title:first-child{margin-top: -20px}
  .title {
    width: calc(100% + 50px);
    border-bottom: 1px solid #eaeaea;
    margin: 0 -25px;
    line-height: 30px;
    padding: 10px 0 0 20px;
    font-weight: normal;
    font-size: 14px;
    color: #878d99;
  }

</style>
