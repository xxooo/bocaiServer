<template>
    <div>
        <div class="tool-bar toolLeft">
            <span class="bar-title" >{{$root.langs.alarm["smartspc.alarm.alarmStatistics"]}}</span>
            <span>{{$root.langs.alarm["smartspc.alarm.alarmObjects"]}}</span>
            <el-select v-model="value" style="width:100px" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']" size="mini" @change="getWarmSta()">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <span>{{$root.langs.alarm['smartspc.alarm.date']}}</span>
            <el-date-picker
                    size="mini"
                    v-model="time"
                    type="datetimerange"
                    value-format="yyyy-M-d HH:mm:ss"
                    :start-placeholder= "$root.langs.analysis['smartspc.analysis.startDate']"
                    :end-placeholder= "$root.langs.analysis['smartspc.analysis.endDate']"
                    :default-time="['08:00:00','17:00:00']"
                    @change="getWarmSta()">
            </el-date-picker>
            <el-button type="primary" size="mini" @click="getWarmSta()">{{$root.langs.common['smartspc.common.search']}}</el-button>
        </div>
        <div class="list chartsBox">
            <div v-if="showCharts" id="container"></div>
            <div v-if="showCharts" class="colorList">
                <h5>{{$root.langs.alarm['smartspc.alarm.legend']}}：</h5>
                <span v-for="item in chartList"><i :style="{background:item.color}"></i>{{item.name}}：{{item.num}}</span>
            </div>
            <p v-if="!showCharts" style="text-align: center; line-height: 400px;width: 100%;">{{$root.langs.common['smartspc.common.nodata']}}</p>
        </div>
        <div class="list">
            <el-table class="paramsTable" :data="listData" style="width: 100%" :empty-text="$root.langs.common['smartspc.common.nodata']">
                <el-table-column type="index" width="60" :label="$root.langs.alarm['smartspc.alarm.index']"></el-table-column>
                <el-table-column prop="project_code" :label="$root.langs.alarm['smartspc.alarm.alarmObjects']">
                    <template slot-scope="scope">
                      <p v-for="(item,index) in scope.row.content">{{item}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="project_code" :label="$root.langs.alarm['smartspc.alarm.itemValue']" >
                    <template slot-scope="scope">
                      {{scope.row.item}}
                    </template>
                </el-table-column>
                <el-table-column prop="project_code" :label="$root.langs.alarm['smartspc.alarm.specificationLower']">
                    <template slot-scope="scope">
                        {{scope.row.LSL}}
                    </template>
                </el-table-column>
                <el-table-column prop="project_code" :label="$root.langs.alarm['smartspc.alarm.targetValue']">
                    <template slot-scope="scope">
                        {{scope.row.target}}
                    </template>
                </el-table-column>
                <el-table-column prop="project_code" :label="$root.langs.alarm['smartspc.alarm.specificationUpper']">
                    <template slot-scope="scope">
                        {{scope.row.USL}}
                    </template>
                </el-table-column>
                <el-table-column prop="project_code" :label="$root.langs.alarm['smartspc.alarm.company']">
                    <template slot-scope="scope">
                        {{scope.row.units}}
                    </template>
                </el-table-column>
                <el-table-column prop="project_code" :label="$root.langs.alarm['smartspc.alarm.alarmRule']" min-width="180">
                    <template slot-scope="scope">
                        {{scope.row.rule}}
                    </template>
                </el-table-column>
                <el-table-column prop="level1" :label="$root.langs.alarm['smartspc.alarm.date']">
                    <template slot-scope="scope">
                        {{scope.row.date}}
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
    import Highcharts from "highcharts"
    let ColorArr = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b','#91e8e1'];
    Highcharts.setOptions({
        colors: ColorArr
    });
    export default {
        components: {

        },
        data() {
            let timecun = new Date();
            let time = new Date(timecun.getTime()-30*24*60*60*1000);
            timecun.setHours(17);timecun.setMinutes(0);timecun.setSeconds(0);
            time.setHours(8);time.setMinutes(0);time.setSeconds(0);

            return {
                options: [],
                value: '',
                AllListData:[],
                time:[time,timecun],
                chart:{},
                showCharts:false,
                chartList:[],
                total:0,
                pageSize:5,
                currentPage:1
            }
        },
        async created(){
            let selectData = await this.$get(`${window.gatewayspc}/infra/prj_mod2`);
            let arr = [];
            if(selectData.code == '0') {
                selectData.data.forEach((item)=>{
                arr.push({
                        value:item.project_name,
                        label:item.project_name
                    })
                });
            }

            this.options = arr;
            if(arr[0])
                this.value = arr[0].value;
            // let date = new Date().toLocaleString().split(" ")[0].replace(/\//g,"-");
            // this.time = [`${date} 08:00:00`,`${date} 17:00:00`];
            //this.time = ["2018-7-1 08:00:00","2018-8-3 17:00:00"];

            this.getWarmSta();
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
            initChart(data){
                let that = this;
                that.chart = Highcharts.chart('container', {
                    chart: {
                        spacing : [40, 0 , 40, 0]
                    },
                    title: {
                        floating:true,
                        text: that.$root.langs.alarm["smartspc.alarm.alarmStatistics"]
                    },
                    credits: {
                        enabled: false
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: false,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            },
                            point: {
                                events: {
//                                    mouseOver: function(e) {  // 鼠标滑过时动态更新标题
//                                        console.log(e,">>>>>>>>>");
//                                        that.chart.setTitle({
//                                            text: e.target.name + '：'+ e.target.y + ''
//                                        });
//                                    }
//                                    ,
                                    click: function(e) { // 同样的可以在点击事件里处理
                                        that.currentPage = 1;
                                        that.getStadetail(e.point.name);
                                        that.chart.setTitle({
                                            text: e.point.name + '：'+ e.point.y + ''
                                        });
                                    }
                                }
                            },
                        }
                    },
                    series: [{
                        type: 'pie',
                        innerSize: '82%',
                        name: this.$root.langs.alarm['smartspc.alarm.percentage'],
                        data: data
                    }]
                }, function(c) {
                    let centerY = c.series[0].center[1],
                        titleHeight = parseInt(c.title.styles.fontSize);
                    c.setTitle({
                        y:centerY + titleHeight/2
                    });
                });
            },
            async getWarmSta(){

                let opt = {
                    "project":this.value,
                    "start":this.time[0],
                    "end":this.time[1]
                };

                if(!(opt.project&&opt.start&&opt.end))return;
                let res = await this.$post(`${window.gatewayspc}/warm/sta`,opt);

                if(+res.code===0){
                    let keys = Object.keys(res.data);
                    if(keys.length===0){
                        this.showCharts = false
                    }else{
                        let data=[];
                        for(let k in res.data){
                            data.push([k,res.data[k]]);
                        }
                        if(!this.showCharts){
                            this.showCharts = true;
                            this.$nextTick(()=>{
                                this.initChart(data);
                            });
                        }else{
                            if(this.chart.series) {
                                this.chart.series[0].update({
                                    data:data
                                });
                            }
                        }
                        let chartList = [];
                        keys.forEach((k,i)=>{
                            chartList.push({
                                color:ColorArr[i%ColorArr.length],
                                name:k,
                                num:res.data[k]
                            })
                        });
                        this.chartList = chartList;
                    }
                }
            },
            handleCurrentChange(currentPage){
                this.currentPage = currentPage;
            },
            async getStadetail(value){
                let opt = {
                    "project":this.value,
                    "start":this.time[0],
                    "end":this.time[1],
                    value
                };
                let res = await this.$post(`${window.gatewayspc}/warm/stadetail`,opt);
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

                    this.total = res.data.length;
                    this.AllListData = res.data;
                }
            }
        }
    }
</script>
<style scoped >
.toolLeft span,.toolLeft button {
    margin-left:20px;
  }

    .bar-title {
        float: left;
        margin-left: 12px;
        margin-top: 6px;
        color: #606266;
        cursor: default;
        font-weight: bold;
    }
    .list{
        margin: 0 20px 0;
        padding: 20px 25px;
        background: #fff;
    }
    .chartsBox{
        height: 400px;
        display: flex;
    }
    #container{
        width: 600px;
    }
    .colorList{
        padding-top: 120px;
    }
    .colorList span{
        display: inline-block;
        margin-right: 50px;
    }
    .colorList span i{
        display: inline-block;
        width: 12px;
        height: 12px;
        vertical-align: middle;
        margin: -3px 10px 0 0;
    }
    .pagination{
        margin: 30px 0;
        text-align: center;
    }
</style>
<style>
    .tool-bar .el-date-editor .el-range-input{
        width: 120px;
    }
    .tool-bar .el-date-editor .el-range-separator,.tool-bar .el-range-editor--mini.el-input__inner{
        width: auto;
    }
    .tool-bar .el-date-editor .el-range__close-icon{
        display: none;
    }
</style>
