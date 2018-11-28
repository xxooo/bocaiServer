<template>
    <div id="alarmBoardEdit">
        <div class="tool-bar">
          <el-breadcrumb class="bar-title" separator="/">
            <el-breadcrumb-item :to="{ path: '/alarm/alarmBoard' }">{{$root.langs.alarm["smartspc.alarm.alarmBoard"]}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{$root.langs.alarm["smartspc.alarm.alarmMessage"]}}</el-breadcrumb-item>
          </el-breadcrumb>
          <el-button  plain size="mini" @click="$router.push('/alarm/alarmBoard')">{{$root.langs.common["smartspc.common.cancel"]}}</el-button>
          <el-button type="primary" size="mini"  class="batOK" @click="save">{{$root.langs.common["smartspc.common.save"]}}</el-button>
        </div>
        <div class="list">
            <h4 class="title">{{$root.langs.alarm["smartspc.alarm.details"]}}</h4>
            <div class="details">
                <span><em>{{$root.langs.alarm["smartspc.alarm.alarmObjects"]}}：</em>{{warmData.content&&warmData.content.replace(/[{}]/g,"").replace(/"/g,"")}}</span>
                <div v-if="warmData.item" class="itemS">
                    <span><em>{{$root.langs.alarm["smartspc.alarm.parameterName"]}}：</em>{{warmData.item.itemName}}</span>
                    <span><em>{{$root.langs.alarm["smartspc.alarm.specificationLower"]}}：</em>{{warmData.item.LSL}}</span>
                    <span><em>{{$root.langs.alarm["smartspc.alarm.targetValue"]}}：</em>{{warmData.item.target}}</span>
                    <span><em>{{$root.langs.alarm["smartspc.alarm.specificationUpper"]}}：</em>{{warmData.item.USL}}</span>
                    <span><em>{{$root.langs.alarm["smartspc.alarm.company"]}}：</em>{{warmData.item.units}}</span>
                </div>
                <span><em>{{$root.langs.alarm["smartspc.alarm.alarmRule"]}}：</em>{{warmData.rule}}</span>
            </div>
            <h4 class="title">{{$root.langs.alarm["smartspc.alarm.processFlow"]}}</h4>
            <div class="table">
                <el-table class="paramsTable" :data="warmData.flow" style="width: 100%" :empty-text="$root.langs.common['smartspc.common.nodata']">
                    <el-table-column type="index" width="60" :label="$root.langs.alarm['smartspc.alarm.index']"></el-table-column>
                    <el-table-column :label="$root.langs.alarm['smartspc.alarm.executor']">
                        <template slot-scope="scope">
                            {{scope.row.handler}}
                        </template>
                    </el-table-column>
                  <el-table-column :label="$root.langs.alarm['smartspc.alarm.analysisCause']">
                    <template slot-scope="scope">
                        <el-input
                            type="textarea"
                            autosize
                            readonly
                            resize = "none"
                            :rows="4"
                            :placeholder="$root.langs.alarm['smartspc.alarm.analysisCause']+'...'"
                            v-model="scope.row.analysis_causes"
                            class="noborder">
                        </el-input>
                      <!-- {{scope.row.analysis_causes}} -->
                    </template>
                  </el-table-column>
                    <el-table-column :label="$root.langs.alarm['smartspc.alarm.handleSuggestion']">
                        <template slot-scope="scope">
                            <el-input
                                type="textarea"
                                autosize
                                readonly
                                resize = "none"
                                :rows="4"
                                :placeholder="$root.langs.alarm['smartspc.alarm.analysisCause']+'...'"
                                v-model="scope.row.suggestion"
                                class="noborder">
                            </el-input>
                            <!-- {{scope.row.suggestion}} -->
                        </template>
                    </el-table-column>
                    <el-table-column :label="$root.langs.alarm['smartspc.alarm.processingTime']">
                        <template slot-scope="scope">
                            {{scope.row.handle_dt}}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
          <h4 class="title lastM">{{$root.langs.alarm["smartspc.alarm.analysisCause"]}}</h4>
          <el-input
            type="textarea"
            :disabled="type==='#show'"
            :rows="4"
            :maxlength="150"
            :placeholder="$root.langs.alarm['smartspc.alarm.analysisCause']+'...'"
            v-model="analysisCause">
          </el-input>
          <h4 class="title lastM">{{$root.langs.alarm["smartspc.alarm.handleSuggestion"]}}</h4>
          <el-input
            type="textarea"
            :disabled="type==='#show'"
            :maxlength="150"
            :rows="4"
            :placeholder="$root.langs.alarm['smartspc.alarm.handleSuggestion']+'...'"
            v-model="handleSuggestion">
          </el-input>
        </div>
    </div>
</template>
<script>
    export default {
        components: {

        },
        data() {
            return {
                options: [{
                    value: 'all',
                    label: 'ALL'
                }, {
                    value: '选项2',
                    label: '选项2'
                }],
                value: 'all',
                handleSuggestion:"",//解决措施
                analysisCause:"",//分析原因
                warmID:this.$route.params.warmID,
                warmData:{},
                type:this.$router.history.current.hash //''编辑，‘#show’查看
            }
        },
        async created(){

            let en = Lockr.get('locale') == 'en-US';

            let obj = {
               language:  en ? "EN" : "CN",
               warmID: this.warmID
            }

            let res =await this.$post(`${window.gatewayspc}/warm/handlenodo`,JSON.stringify(obj));
            if(+res.code===0){
                this.warmData = res.data;
            }

            if(this.type === '#show'){
              res =await this.$get(`${window.gatewayspc}/warm/analysis_suggestion/${this.warmID}`);
              if(+res.code===0){
                this.handleSuggestion = res.data.handle_suggestion;

                this.analysisCause = res.data.analysis_causes;
              }
            }
        },
        mounted(){

        },
        computed:{

        },
        methods:{
            async save(){
                let obj = {warmID:this.warmID};
                obj.handle_suggestion = this.handleSuggestion.replace(/^ +| +$/g,"");
                obj.analysis_cause = this.analysisCause.replace(/^ +| +$/g,"");
                if(obj.handle_suggestion && obj.analysis_cause){
                    let res =await this.$post(`${window.gatewayspc}/warm/handle`,obj);
                    if(+res.code === 0){
                        this.$success();
                        this.$router.push('/alarm/alarmBoard');
                    }

                   //改变没处理个数
                   res =  await this.$get(`${window.gatewayspc}/warm/warm_count`);
                   store.commit('updateUntreated', res.data.count);
                }
            }
        },
    }
</script>
<style scoped >
    .list{
        margin: 0 20px 0;
        padding: 20px 25px;
        background: #fff;
        border-radius: 5px;
    }
    .batOK{
        background: #0486fe;
        border:#0486fe;
    }
    .list .title{
        width: calc(100% + 50px);
        border-bottom: 1px solid #eaeaea;
        margin: 0 -25px;
        line-height: 30px;
        padding: 10px 0 0 20px;
        font-weight: normal;
        font-size: 14px;
        color: #878d99;
    }
    .list .title:first-child{
        margin-top: -20px;
    }
    .details{
        display: flex;
        padding: 40px 30px ;
        flex-wrap:wrap;
    }
    .details span{
        flex: 1;
    }
    .details span em,.itemS>em{
        display: inline-block;
        font-style: normal;
        color:#878d99;
        width:180px;
        line-height: 30px;
    }
    .list .title.lastM{
        margin: 20px -25px;
    }
    .table{
        height: 300px;
        overflow: auto;
    }
    .itemS{
        width: 100%;
    }
    .itemS span{
        display: block;
    }
</style>
<style lang="less">
#alarmBoardEdit {
    .noborder textarea{
        border: 0px solid #d8dce5;
    }

    .el-table--enable-row-hover .el-table__body tr:hover textarea {
        background-color: #f5f7fa;
    }
    
}
</style>
