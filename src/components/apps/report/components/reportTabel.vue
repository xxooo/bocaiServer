<template>
    <el-card class="box-card" v-if="prop == 'cpk'">
      <div slot="header" class="clearfix" >
        <span>{{$root.langs.report['smartspc.report.cpkReport']}}
        </span>
        <div class="tool-mark" >
          <span><i class="iconfont green"></i> {{$root.langs.common['smartspc.common.processnooffsetnew']}}</span>
          <span><i class="iconfont yellow"></i> {{$root.langs.common['smartspc.common.processOffset']}}</span>
          <span><i class="iconfont red"></i> {{$root.langs.common['smartspc.common.abilityLack']}}</span>
        </div>
      </div>

        <template>
          <!--<h4 class="title"></h4>-->
          <el-table :data="table.row" :row-class-name="tableRowClassName" max-height="500" style="width: 100%;" :empty-text="$root.langs.common['smartspc.common.nodata']">
            <el-table-column v-for="(label,filed) in table.columns" style="color:red"
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
    </el-card>

    <el-card class="box-card" v-else>
      <div slot="header" class="clearfix">
          <span>{{$root.langs.report['smartspc.report.incontrollableEvnet']}}
          </span>
      </div>

        <el-table class="paramsTable" max-height="500":data="table" style="width: 100%;" :empty-text="$root.langs.common['smartspc.common.nodata']">
          <el-table-column type="index" width="60" :label="$root.langs.alarm['smartspc.alarm.index']"></el-table-column>
          <el-table-column :label="$root.langs.alarm['smartspc.alarm.alarmDetails']" width="210">
            <template slot-scope="scope">
              <p v-for="(item,index) in scope.row.content">{{item}}</p>
            </template>
          </el-table-column>
          <el-table-column :label="$root.langs.baseData['smartspc.baseData.params']" width="100">
            <template slot-scope="scope">
              {{scope.row.item}}
            </template>
          </el-table-column>
          <el-table-column :label="$root.langs.alarm['smartspc.alarm.abnormalInformation']">
            <template slot-scope="scope">
              {{scope.row.rule}}
            </template>
          </el-table-column>
          <el-table-column width="160" :label="$root.langs.alarm['smartspc.alarm.date']">
            <template slot-scope="scope">
              {{scope.row.date}}
            </template>
          </el-table-column>
          <!--<el-table-column width="100" :label="$root.langs.alarm['smartspc.alarm.ops']">
            <template slot-scope="scope">
              <a @click="edit(scope.row)" class="opsEdit" v-if="scope.row.handle==0">{{$root.langs.alarm['smartspc.alarm.pending']}}</a>
              <span class="opsSpan" v-else>{{$root.langs.alarm['smartspc.alarm.handled']}}</span>
            </template>
          </el-table-column>-->
        </el-table>
    </el-card>
</template>

<script>

  export default {
    props:{
      table:{},
      prop:{}
    },
    data() {
        return {};
    },
    components: {

    },
    created() {
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (row.Cpk >1.67) {
          return 'green';
        } else if (row.Cpk <1 && row.Cpk >=0.67) {
          return 'yellow';
        } else if(row.Cpk <0.67){
          return 'red';
        }else{
          
        }
        return '';
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
  .tool-mark {
    float: right;
    text-align: right;
    &>span{margin-right: 20px}
    i {
      display:inline-block;
      vertical-align: text-bottom;
      width: 15px;
      height: 15px;
    }
  }

</style>
<style>
  .el-table tr.red,.red{background-color: #fc9999;color: #fff}
  .el-table tr.green,.green{background-color: #5daf34;color: #fff}
  .el-table tr.yellow,.yellow{background-color: #dad55e;}
</style>
