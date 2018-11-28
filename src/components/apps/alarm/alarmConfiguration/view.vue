<template>
    <div>
        <div class="tool-bar">
            <span class="bar-title" >{{$root.langs.alarm["smartspc.alarm.alarmConfiguration"]}}</span>
        </div>
        <div class="list">
            <el-table class="paramsTable" :data="listData" style="width: 100%" :empty-text="$root.langs.common['smartspc.common.nodata']">
                <el-table-column type="index" width="60" :label="$root.langs.alarm['smartspc.alarm.index']"></el-table-column>
                <el-table-column :label="$root.langs.alarm['smartspc.alarm.alarmDetails']" width="210">
                    <template slot-scope="scope">
                        <p v-for="(item,index) in scope.row.content">{{item}}</p>
                    </template>
                </el-table-column>
                <el-table-column :label="$root.langs.baseData['smartspc.baseData.params']" width="140">
                    <template slot-scope="scope">
                        {{scope.row.item}}
                    </template>
                </el-table-column>
                <el-table-column :label="$root.langs.alarm['smartspc.alarm.configuration']">
                    <template slot-scope="scope">
                        {{scope.row.rule}}
                    </template>
                </el-table-column>
                <el-table-column width="100" :label="$root.langs.alarm['smartspc.alarm.ops']">
                    <template slot-scope="scope">
                        <a @click="edit(scope.row)" class="opsEdit">{{$root.langs.alarm['smartspc.alarm.toConfigure']}}</a>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination" v-if="total > pageSize">
                <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="total" @current-change="handleCurrentChange" :current-page="currentPage" :background='true'>
                </el-pagination>
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
                AllListData:[],
                total:0,
                pageSize:10,
                currentPage:1
            }
        },
        async created(){
            let res =await this.$get(`${window.gatewayspc}/warm/item`);
            if(+res.code===0){

                let contentArr = [];
                for(let n in res.data) {
                    res.data[n].content = res.data[n].content.replace(/"/g, "");
                    res.data[n].content = res.data[n].content.replace(/[{}]/g,"");
                    let marr = res.data[n].content.split(",");
                    contentArr.push(marr[0]);
                    contentArr.push(marr[1]);
                    res.data[n].content = marr;
                }

                this.AllListData = res.data;
                this.total = res.data.length
            }
        },
        mounted(){

        },
        computed:{
            listData(){
                let start = (this.currentPage-1) * this.pageSize;
                return this.AllListData.slice(start,start +this.pageSize);
            }
        },
        methods:{
            edit(item){
                let {itemID} = item;
                this.$router.push({
                    path:`/alarm/alarmConfigurationEdit/${itemID}`
                })
            },
            handleCurrentChange(currentPage){
                this.currentPage = currentPage;
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
    .pagination{
        margin: 30px 0;
        text-align: center;
    }
</style>
