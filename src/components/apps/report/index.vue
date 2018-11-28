<template>
  <div class="main" id="reportIndex">
      <div class="column scrollbar">
        <div class="column-header">
          <el-button type="info" @click="dialogVisible = true" size="mini">{{$root.langs.dashboard['smartspc.dashboard.dataSource']}}</el-button>
        </div>
        <el-tree  default-expand-all :data="treeData" :props="defaultProps" @node-click="treeNodeClick"></el-tree>
      </div>
      <div class="report-body">
        <div class="row toolBar">
          <icon-font @click="dialogContent = true" class=""  :title="$root.langs.report['smartspc.report.contentSelection']">{{''}}</icon-font>
          <template  v-if="loadDown">
            <icon-font @click='tableToExcel' class="" :iconClass='"icon-20"' :title="$root.langs.common['smartspc.common.export']+this.kongge+'Excel'">{{''}}</icon-font>
            <icon-font @click='exportFile("pdf")' class="" :iconClass='"icon-20"' :title="$root.langs.common['smartspc.common.export']+this.kongge+'PDF'">{{''}}</icon-font>
            <icon-font @click='exportFile("docx")' class="" :iconClass='"icon-20"' :title="$root.langs.common['smartspc.common.export']+this.kongge+'Word'">{{''}}</icon-font>
          </template>
        </div>
        <div class="report-concent" id="reportConcent">
          <report-top v-if="checkList.indexOf('0')>-1" :chartTop="chartTop" :tableTop="tableTop" prop="top" ref="chartTop"></report-top>
          <report-tabel v-if="checkList.indexOf('1')>-1" :table="tableCpk" ref="tableCpk" prop="cpk"></report-tabel>
          <report-param v-if="checkList.indexOf('2')>-1" :chartParam="chartParam" ref="chartParam"></report-param>
          <report-tabel v-if="checkList.indexOf('3')>-1" :table="tabelEvent" ref="tabelEvent" prop="event"></report-tabel>
          <report-top v-if="checkList.indexOf('4')>-1" :chartTop="chartAnalyse" :tableTop="tableAnalyse"  prop="analyse" ref="chartAnalyse"></report-top>
        </div>
      </div>

    <el-dialog class="mailInvite-dialog" :title="$root.langs.dashboard['smartspc.dashboard.dataSource']" :visible.sync="dialogVisible" width="500px;padding-right: 30px" >
      <div class="label title"><label >{{$root.langs.common['smartspc.common.timeWindowOption']}}:</label></div>
      <el-form  :model="form" :rules="rules" label-width="150px">
        <el-form-item :label="$root.langs.common['smartspc.common.type']" prop="timeRange">
          <el-select v-model="form.timeType" class="x12">
            <el-option  value="0" :label="$root.langs.common['smartspc.common.staticTimeWindow']"></el-option>
            <el-option  value="1" :label="$root.langs.common['smartspc.common.dynamicTimeWindow']"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$root.langs.common['smartspc.common.timeWindowSize']" v-if="form.timeType ==1" prop="timeRange">
          <el-input v-model="form.timeSize" class="x9" :maxlength="3"/>
          <el-select v-model="form.timeUnit" class="x3">
            <el-option  value="day" :label="$root.langs.common['smartspc.common.day']"></el-option>
            <el-option  value="week" :label="$root.langs.common['smartspc.common.week']"></el-option>
            <el-option  value="month" :label="$root.langs.common['smartspc.common.month']"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="form.timeRange.label" v-else prop="timeRange">
          <el-date-picker
            v-model="form.timeRange.value"
            type="datetimerange"
            range-separator="-"
            :start-placeholder="$root.langs.analysis['smartspc.analysis.startDate']"
            :end-placeholder="$root.langs.analysis['smartspc.analysis.endDate']">
          </el-date-picker>
        </el-form-item>
      </el-form>

      <div class="label title"><label >{{$root.langs.dashboard['smartspc.dashboard.dataSource']}}:</label></div>
      <el-form  :model="form" :rules="rules" label-width="150px">
        <el-form-item
          v-for="(domain, index) in form.dataSource"
          :key="domain.key"
          class="adddatas"
        >
          <el-select class="x5 field" v-model="domain.code" @visible-change="isHasCode" :placeholder="$root.langs.dashboard['smartspc.dashboard.pleaseSelectPro']">
            <el-option  v-for="(item,index) in proNameListTemp" :key="item.project_code" :label="item.project_name" :value="item.project_code"></el-option>
          </el-select>
          <el-select class="x5 field" v-model="domain.value"  @visible-change="proParamData(domain.code)"  :placeholder="$root.langs.dashboard['smartspc.dashboard.pleaseSelectValue']">
            <el-option  v-for="(item,index) in proValueList" :key="item.LevelValue" :label="item.LevelValue" :value="item.LevelValue"></el-option>
          </el-select>
          <icon-font @click="removeDomain(domain)" class="" :iconClass='"icon-dele"' :title="''">{{''}}</icon-font>
        </el-form-item>
        <el-form-item>
          <icon-font @click='addDomain' class="" :iconClass='"icon-add"' :title="''">{{''}}</icon-font>
        </el-form-item>
      </el-form>

      <div class="label title"><label >{{$root.langs.common['smartspc.common.navigation']}}:</label></div>
      <el-form  :model="form" :rules="rules" label-width="150px">
        <el-form-item :label="$root.langs.baseData['smartspc.baseData.attributeValueSetting']" prop="structure">
          <el-select  v-model="form.structure" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']" class="x12">
            <el-option  v-for="(item,index) in proNameList" :key="item.project_code" :label="item.project_name" :value="item.project_code"></el-option>
          </el-select>
          </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" plain @click="dialogVisible = false">{{$root.langs.common['smartspc.common.cancel']}}</el-button>
        <el-button size="small" type="primary" @click="submitDataSource">{{$root.langs.common['smartspc.common.ok']}}</el-button>
      </span>
    </el-dialog>
    <el-dialog class="mailInvite-dialog" :title="$root.langs.report['smartspc.report.contentSelection']" :visible.sync="dialogContent" width="500px" >
      <el-checkbox-group v-model="form.checkList" class="el-row" style="padding-left: 10px">
        <div class="x6"><el-checkbox label="0">{{$root.langs.report['smartspc.report.topFault']}}</el-checkbox></div>
        <div class="x6"><el-checkbox label="1">{{$root.langs.report['smartspc.report.cpkReport']}}</el-checkbox></div>
        <div class="x6"><el-checkbox label="2">{{$root.langs.report['smartspc.report.paramFluctuate']}}</el-checkbox></div>
        <div class="x6"><el-checkbox label="3">{{$root.langs.report['smartspc.report.incontrollableEvnet']}}</el-checkbox></div>
        <div class="x6"><el-checkbox label="4">{{$root.langs.report['smartspc.report.incontrollableAnalysis']}}</el-checkbox></div>
      </el-checkbox-group>
       <div slot="footer" class="dialog-footer">
        <el-button plain @click="dialogContent = false" size="small">{{$root.langs.common['smartspc.common.cancel']}}</el-button>
        <el-button type="primary" @click="submitContent"  size="small">{{$root.langs.common['smartspc.common.ok']}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

    import "./css/style.less"
    import jsPDF from 'jspdf'
    import html2canvas from 'html2canvas'
    import canvg from 'canvg'
    import XLSX from 'xlsx'

    export default {
      data(){
        let common= this.$root.langs.common;
        return {
          value6: '',
          dialogVisible:false,
          dialogContent:false,
          rules: {
            timeRange:[{
              required: true,
              message: this.$root.langs.common['smartspc.common.required'],
              trigger: 'blur'
            }],
            structure:[{
              required: true,
              message: this.$root.langs.common['smartspc.common.required'],
              trigger: 'blur'
            }]
          },
          form:{
            timeType:"0",
            timeSize:"",
            timeUnit:"day",
            timeRange:{start:'',end:'',value:[new Date(), new Date()]},
            dataSource:[{code:'',value:''}],
            structure:'',
            checkList:["0","1","2","3","4"]
          },
          proNameList:[],
          proNameListTemp: [],
          proValueList:[],
          treeData:[{
            label: '一级 1',
            children: [{
              label: '二级 1-1',
              children: [{
                label: '三级 1-1-1'
              }]
            }]
          }],
          defaultProps: {
            children: 'children',
            label: 'lable'
          },
          chartTop:{},
          tableTop:{},
          tableCpk:{},
          chartAnalyse:{},
          tableAnalyse:{},
          chartParam:{},
          tabelEvent:[],
          checkList:["0","1","2","3","4"],
          loadDown:false,
        }
      },
      components: {
        IconFont: resolve => require(['common/iconfont.vue'], resolve),
        reportTop: resolve => require(['./components/reportTop.vue'], resolve),
        reportTabel: resolve => require(['./components/reportTabel.vue'], resolve),
        reportParam: resolve => require(['./reportParam.vue'], resolve),
      },
      created: function() {
        this.initDataSource();
        this.getProNameList();
        this.getTree();
        //this.getReport();
      },
      computed:{
          kongge() {
            let en = Lockr.get('locale') == 'en-US';
            return en ? ' ' : '';
          }
      },
      methods: {
        isHasCode() {

          let that = this;
          let ooop = [];

          for(let n in this.proNameList) {
            ooop.push(this.proNameList[n]);
          }

          this.proNameListTemp = ooop;

          for(let x in that.form.dataSource) {
            _.remove(that.proNameListTemp, function(n) {
                       return n.project_code == that.form.dataSource[x].code;
                    });
          }

        },
        async getReport(value) {
          this.loadDown = false;

          value = value || "R11";
          if(!value) return;
          let res = await this.$post(`${window.gatewayspc}/report/report_item_failure`,{"value":value});
          if(res.code==0){
            res.data.chart.itemdata_name = res.data.itemdata_name;
            res.data.chart.ratedata_name = res.data.ratedata_name;
            this.chartTop = res.data.chart;
            this.tableTop = res.data.table;
          }
          await this.getReportCpk(value);
          await this.getReportParam(value);
          await this.getReportAnalysis(value);
          await this.getReportEvent(value);

          this.loadDown =true;
        },
        async getReportAnalysis(value){
          let  res = await this.$post(`${window.gatewayspc}/report/report_out_of_control_analysis`,{"value":value});
          if(res.code==0){
            this.chartAnalyse = res.data;
            this.tableAnalyse = res.data.rulelist;
          }
        },
        async getReportCpk(value){
          let  res = await this.$post(`${window.gatewayspc}/report/report_cpk`,{"value":value});
          if(res.code==0){
            this.tableCpk = res.data;
          }
        },
        async getReportParam(value){
          let res = await this.$post(`${window.gatewayspc}/report/report_boxploat`,{"value":value});
          if(res.code==0){
            this.chartParam = res.data;
          }
        },
        async getReportEvent(value){
          let res = await this.$post(`${window.gatewayspc}/report/report_out_of_control`,{"value":value});
          if(res.code==0){
            let contentArr = [];
                for(let n in res.data) {
                    res.data[n].content = res.data[n].content.replace(/"/g, "");
                    res.data[n].content = res.data[n].content.replace(/[{}]/g,"");
                    let marr = res.data[n].content.split(",");
                    contentArr.push(marr[0]);
                    contentArr.push(marr[1]);
                    res.data[n].content = marr;
                }

                this.tabelEvent = res.data;

          }
        },
        async submitContent(){//内容提交

         let res = await this.$post(`${window.gatewayspc}/report/content`,{content:this.form.checkList});
          if(res.code==0){
            this.dialogContent = false;
            this.checkList = this.form.checkList;
          }
        },
        async submitDataSource(){//数据源提交
          let [data,res] = [$.extend({},this.form)];
          let pass = true;

          if(data.timeType == '0') {
            if(data.timeRange.value.length == '0') {
              this.$warning(this.$root.langs.common['smartspc.common.timeHorizonRequred']);
              pass = false;
            }
          } else if(data.timeType == '1') {
            if(data.timeSize == '') {
              this.$warning(this.$root.langs.common['smartspc.common.timeHorizonRequred']);
              pass = false;
            }
          }

          if(pass) {
            
            if(data.timeRange.value) {
              data.timeRange.start = data.timeRange.value[0];
              data.timeRange.end = data.timeRange.value[1];
            }
            data.structure = {code:data.structure};
            delete  data.checkList;

            console.log('data',data);

            res = await this.$post(`${window.gatewayspc}/report/datasource`,data);
            if(res.code==0){
              this.dialogVisible = false;
              this.getTree();
            }
          }
        },
        async initDataSource(){
          let res = await this.$get(`${window.gatewayspc}/report/report_config`);
          if(res.code==0){
            this.form.dataSource = res.data.dataSource;
            this.form.timeType = res.data.timeType;
            this.form.structure = res.data.structure.code;
            this.form.timeSize = res.data.timeSize;
            this.form.timeUnit = res.data.timeUnit;
            this.form.timeRange.value = [res.data.start ||'',res.data.end || ''];
          }
        },
        async getTree() {
          let res = await this.$get(`${window.gatewayspc}/report/structure`);
          if(res.code==0){
            this.treeData = res.data;
          }
        },
        treeNodeClick(v){
          if(v.children) return;
          this.getReport(v.lable);
          this.treeNode = v.lable;
        },
        async getProNameList() {
          let prjData = await this.$get(`${window.gatewayspc}/infra/prj`);
          if(prjData.code==0){
            this.proNameList = prjData.data;
          }
        },
        async proParamData(data) {
          if(data != '') {
            let prjData = await this.$get(`${window.gatewayspc}/infra/leafv/`+data);

            if(prjData.code==0){
              this.proValueList = prjData.data;
            }
          } else {
            this.proValueList = [];
          }
        },
        removeDomain(item) {
          var index = this.form.dataSource.indexOf(item)
          if (index !== -1) {
            this.form.dataSource.splice(index, 1)
          }
        },
        addDomain() {
          this.form.dataSource.push({
            code: '',
            value: '',
            key: Date.now()
          });
        },
        exportFile(type){
          XDoc.server = 'http://www.xdocin.com';
          let tpm = '<html><body><div style="text-align: center;font-size: 28">'+this.treeNode+'</div>\
            <div>&nbsp;</div><div>&nbsp;</div>';

          let gettabel  = (cloum,row,cardtype)=>{
            let th='',tr='',color='';
            row = row || [];
            row.forEach(function(item,j){
              if(cardtype=='cpk'){//cpk表格需要背景
                if (item.Cp >1.67) {
                  color= '#fb7761';
                } else if (item.Cp <1) {
                  color= '#dad55e';
                }
              }

              tr = tr + '<tr>';
              for (let key in cloum){
                 tr = tr + '<td style="background-color:'+color+'">'+(item[key] || '')+'</td>';
                 if(j===0){
                    th =th+ '<th width="400" style="font-weight: bold">'+(cloum[key] || '')+'</th>';
                  }
              }
              tr = tr+'</tr>';
            });
            if(th) return '<table>'+'<tr>'+th+'</tr>'+tr+'</table>';
            else return '';
          }

          let canvgtoImg = (chart)=>{
            let svg = chart.chart.getSVG();
            var canvas = document.createElement('canvas');
            canvg(canvas, svg);
            return canvas.toDataURL('image/png');
          }

          for (var value of this.checkList) {
            switch (value){
              case "0":
                let dataurl = canvgtoImg(this.$refs.chartTop.$refs.highcharts);
                tpm = tpm+ '<div line-spacing="30" indent="30">\
                              <span  font-name="标宋" font-size="18">'+this.$root.langs.report['smartspc.report.topFault']+'</span>\
                              <div>&nbsp;</div>\
                             </div>\
                             <div>'+gettabel(this.tableTop.columns,this.tableTop.rows)+'</div>\
                             <div><img src="'+dataurl+'"/></div><div>&nbsp;</div><div>&nbsp;</div>';
                break;
              case "1":
                tpm = tpm+ '<div heading="1" >\
                               <span font-name="标宋" font-size="18">'+this.$root.langs.report['smartspc.report.cpkReport']+'</span>\
                                <div>&nbsp;</div>\
                                <span style="background-color: #5daf34;">&nbsp;&nbsp;</span>&nbsp;'+this.$root.langs.common['smartspc.common.processNoOffset']+' &nbsp;\
                                <span style="background-color: #dad55e;">&nbsp;&nbsp;</span>&nbsp;'+this.$root.langs.common['smartspc.common.processOffset']+'&nbsp;\
                                <span style="background-color: #fc9999;">&nbsp;&nbsp;</span>&nbsp;'+this.$root.langs.common['smartspc.common.abilityLack']+'&nbsp;\
                             </div>\
                             <div>'+gettabel(this.tableCpk.columns,this.tableCpk.row,'cpk')+'</div><div>&nbsp;</div><div>&nbsp;</div>';
                break;
              case "2":
                let dataurl2 = canvgtoImg(this.$refs.chartParam.$refs.highcharts);
                tpm = tpm+ '<div heading="1">\
                               <span font-name="标宋" font-size="18">'+this.$root.langs.report['smartspc.report.paramFluctuate']+'</span>\
                               <div>&nbsp;</div>\
                             </div>\
                             <div>     </div>\
                             <div><img src="'+dataurl2+'"/></div><div>&nbsp;</div><div>&nbsp;</div>';
                break ;
              case "3":
                let alarm = this.$root.langs.alarm;
                let columns={
                  content:alarm['smartspc.alarm.alarmDetails'],
                  item:this.$root.langs.baseData['smartspc.baseData.params'],
                  rule:alarm['smartspc.alarm.abnormalInformation'],
                  date:alarm['smartspc.alarm.date']
                };
                tpm = tpm+ '<para heading="1" lineSpacing="28">\
                               <text align="center" font-name="标宋" font-size="18">'+this.$root.langs.report['smartspc.report.incontrollableEvnet']+'</text>\
                               <div>&nbsp;</div>\
                             </para>\
                             <para>'+gettabel(columns,this.tabelEvent)+'</para><div>&nbsp;</div><div>&nbsp;</div>';
                break;
              case "4":
                let dataurl4 = canvgtoImg(this.$refs.chartAnalyse.$refs.highcharts);
                tpm = tpm+ '<div style="margin-bottom: 10px">\
                              <span  font-name="标宋" font-size="18">'+this.$root.langs.report['smartspc.report.incontrollableAnalysis']+'</span>\
                              <div>&nbsp;</div>\
                             </div>\
                             <div>'+gettabel(this.tableAnalyse.columns,this.tableAnalyse.rows)+'</div>\
                             <div><img src="'+dataurl4+'"/></div>';
                break;
            }
          }

          tpm = tpm+'</body></html>';
          XDoc.to(tpm, type, {name:'report'}, "_blank");
        },
        tableToExcel(){
          let jsondata = this.tableTop.rows;

          var sheetNames = [],name;
          var sheetsList= {};

          let getSheetData  = (cloum,row)=>{
            let obj=[],temp = [],i=0;

            for(let n in row) {
              if((typeof row[n].content=='object')&&row[n].content.constructor==Array) {
                row[n].content = row[n].content[0]+', '+row[n].content[1]
              }
            }

            obj.push(temp);
            for (let key in cloum){
              temp.push(cloum[key]);
              row.forEach(function(item,j){
                let value = item[key];
                if(!obj[j+1]) obj.push([value]);
                else{
                  obj[j+1][i] = value;
                }
              });
              i=i+1;
            }
            return obj;
          }

          for (var value of this.checkList) {
            switch (value){
              case "0":
                name = this.$root.langs.report['smartspc.report.topFault'];
                sheetNames.push(name);
                sheetsList[name] = XLSX.utils.aoa_to_sheet(getSheetData(this.tableTop.columns,this.tableTop.rows));
                break;
              case "1":
                name = this.$root.langs.report['smartspc.report.cpkReport'];
                sheetNames.push(name);
                sheetsList[name] = XLSX.utils.aoa_to_sheet(getSheetData(this.tableCpk.columns,this.tableCpk.row));
                break;
              case "3":
                let alarm = this.$root.langs.alarm;
                let columns={
                  content:alarm['smartspc.alarm.alarmDetails'],
                  item:this.$root.langs.baseData['smartspc.baseData.params'],
                  rule:alarm['smartspc.alarm.abnormalInformation'],
                  date:alarm['smartspc.alarm.date']
                };
                name = this.$root.langs.report['smartspc.report.incontrollableEvnet'];
                sheetNames.push(name);
                sheetsList[name] = XLSX.utils.aoa_to_sheet(getSheetData(columns,this.tabelEvent));
                break;
                case "4":
                name = this.$root.langs.report['smartspc.report.incontrollableAnalysis'];
                sheetNames.push(name);
                sheetsList[name] = XLSX.utils.aoa_to_sheet(getSheetData(this.tableAnalyse.columns,this.tableAnalyse.rows));
                break;
            }
          }

          const wb = XLSX.utils.book_new();
          wb['SheetNames']= sheetNames;
          wb['Sheets']= sheetsList;
          XLSX.writeFile(wb,"report.xlsx");
        }
      },
    }
</script>

<style scoped>
  .report-concent>div{
    margin-bottom: 15px;
  }

  .column{
    background: #fff;
    border-bottom: 1px solid #d5d8dc;
    border-right: 1px solid #d5d8dc;
    width: 170px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px;
    float: left;
    color: #162134;
    line-height: 46px;
    font-size: 14px;
    padding-bottom: 60px;
    position: fixed;
    top: 60px;
    bottom: 0;
    /* overflow-y: auto; */
  }
  .column-header .el-button{
    width:100%;
    text-align: center;
  }
  .toolBar{
    padding: 16px;
    margin-left: 170px;
    background: #F2F3F7;
    height: 54px;
  }
  .el-dialog .title{
    font-size: 14px;
    color: #abb4bc;
  }
  .report-concent{    border-left: 170px solid transparent; padding:15px;}

</style>
<style lang="less">
#reportIndex {
  .x9 {
    width: 75% !important;
  }
}


</style>
