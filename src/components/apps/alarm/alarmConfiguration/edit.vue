<template>
    <div>
        <div class="tool-bar">
          <el-breadcrumb class="bar-title" separator="/">
            <el-breadcrumb-item :to="{ path: '/alarm/alarmConfiguration' }">{{$root.langs.alarm["smartspc.alarm.alarmConfiguration"]}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{$root.langs.alarm["smartspc.alarm.alarmConfiguration"]}}</el-breadcrumb-item>
          </el-breadcrumb>
            <el-button plain size="mini" @click="$router.push('/alarm/alarmConfiguration')">{{$root.langs.common["smartspc.common.cancel"]}}</el-button>
            <el-button type="primary" size="mini" class="batOK" @click="save">{{$root.langs.common["smartspc.common.save"]}}</el-button>
        </div>
        <div class="list">
            <el-table class="paramsTable" tooltip-effect="dark" :data="listData" ref="multipleTable" @selection-change="handleSelectionChange" style="width: 100%" :empty-text="$root.langs.common['smartspc.common.nodata']">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column  width="60" :label="$root.langs.alarm['smartspc.alarm.index']">
                  <template slot-scope="scope">
                    {{scope.row.ruleID}}
                  </template>
                </el-table-column>
                <el-table-column :label="$root.langs.alarm['smartspc.alarm.name']">
                    <template slot-scope="scope">
                        {{scope.row.text}}
                    </template>
                </el-table-column>
                <el-table-column :label="$root.langs.alarm['smartspc.alarm.cuttingValue']">
                    <template slot-scope="scope">
                        <span v-for="(v, k) in scope.row.conf">
                            {{k}} :
                          <input v-if="k=='K'" :value="v" min="1" class="checkedList" :maxlength="2"
                             @keyup="change(scope.$index, k, $event)"   onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/" style="width: 140px;" :key="scope.row.ruleID">
                          <input v-else-if="k=='R'" :value="v" type="number" :maxlength="4" min="0.01" max="1" class="checkedList" step="0.01"
                              @keyup="change(scope.$index, k, $event)" style="width: 140px;" :key="scope.row.ruleID">
                        </span>
                        {{scope.row.rule}}
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    export default {
        components: {

        },
        data() {
            return {
                listData:[],
                multipleSelection: []
            }
        },
        async created(){
            let that = this;
            let res =await this.$get(`${window.gatewayspc}/warm/conf/${this.$route.params.itemID}`);
            if(+res.code===0){
                res.data.forEach((item, i) => {
                    item.conf = JSON.parse(item.conf.replace(/([kr]):([^,}]+)/ig,($1,$2,$3)=>{
                        return '"'+$2+'":'+$3
                    }));
                });
                this.listData = res.data;
                this.$nextTick(()=>{
                   let arr =  this.listData.filter(item => +item.check===1);
                    arr.forEach(item => {
                        that.$refs.multipleTable.toggleRowSelection(item);
                    })
                });
            }
        },
        mounted(){

        },
        computed:{

        },
        methods:{
            async save(){
                let data = [];
                this.multipleSelection.forEach(item => {
                    data.push({
                        ruleID:item.ruleID,
                        conf:JSON.stringify(item.conf).replace(/"/g,"")
                    })
                });
                let res = await this.$post(`${window.gatewayspc}/warm/conf/${this.$route.params.itemID}`, data);
                if(+res.code===0){
                    this.$success();
                    this.$router.push('/alarm/alarmConfiguration')
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            change(i, k, e){
              let val = e.target.value;
              val = Number(val);
              if(k==="K" &&  val<=0){
                e.target.value = this.listData[i].conf[k] || 1;
              }else if(k==="R"&& (val>= 1 || val<=0)){
                e.target.value = this.listData[i].conf[k] || 0.01;
              }else{
                this.listData[i].conf[k] = val;
              }
                /*val = val.replace(/^(\d+\.\d+)[^\d]+/,"$1");

                this.$refs.input[i].value = val;*/
            }
        }
    }
</script>
<style scoped >
    .list{
        margin: 0 20px 0;
        padding: 20px 25px;
        background: #fff;
    }
    .opsEdit{
        color:#3399ff;
        cursor: pointer;
    }
    .opsEdit:hover{color: #56aafa}
    .opsSpan{
        color:#f5aa30;
    }
    .checkedList{
        border-radius: 3px;
        border:1px solid #cccccc;
        width: 60px;
        padding: 4px 10px;
        line-height: 20px;
        font-size: 14px;
    }
</style>
