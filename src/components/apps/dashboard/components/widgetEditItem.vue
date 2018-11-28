<!-- 编辑组件 -->
<template>
  <div v-if="data && data.field && app" id="widgetEditItem">
    <div class="column-body">
      <div class="title">{{data.field.label}}</div>

      <div class="form-group" v-if="data.field.type != 'line'">
        <div class="label">
          <label for="title">{{$root.langs.common['smartspc.common.title']}}</label>
        </div>
        <div class="field">
          <input type="text" class="input" name="title" id="title" maxlength="50" v-model.trim="data.field.title" />
        </div>
      </div>

      <template v-if="['controlChart','controlChart2'].findIndex((n) => n==data.field.type)>-1">
        <div v-show="data.type=='controlChart' || data.type=='controlChart2'" class="form-group">
          <div class="label title">
            <label for="title">{{$root.langs.dashboard['smartspc.dashboard.style']}}:</label>
          </div>
          <div class="line">
            <div class="x7">
              <label for="zheColor">{{$root.langs.dashboard['smartspc.dashboard.polylineColor']}}</label>
            </div>
            <div class="x5">
              <span class="colorPic" name="zheColor" id="zheColor" v-model.trim="data.field.zheColor" :style="{'background-color':data.field.zheColor}"></span>
            </div>
          </div>
          <div class="line">
            <div class="x7">
              <label for="dashStylesZ">{{$root.langs.dashboard['smartspc.dashboard.polylineStyle']}}</label>
            </div>
            <div class="x5">
              <el-select v-model="data.field.dashStylesZ" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']">
                <el-option v-for="item in dashStyles" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="line">
            <div class="x7">
              <label for="controlColor">{{$root.langs.dashboard['smartspc.dashboard.controlLineColor']}}</label>
            </div>
            <div class="x5">
              <span class="colorPic" name="controlColor" id="controlColor" v-model.trim="data.field.controlColor" :style="{'background-color':data.field.controlColor}"></span>
            </div>
          </div>
          <div class="line">
            <div class="x7">
              <label for="dashStylesC">{{$root.langs.dashboard['smartspc.dashboard.controlLineStyle']}}</label>
            </div>
            <div class="x5">
              <el-select v-model="data.field.dashStylesC" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']">
                <el-option v-for="item in dashStyles" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="line" v-if="data.type=='controlChart'">
            <div class="x7">
              <label for="dotColor">{{$root.langs.dashboard['smartspc.dashboard.abnormalPointColor']}}</label>
            </div>
            <div class="x5">
              <span class="colorPic" name="dotColor" id="dotColor" v-model.trim="data.field.dotColor" :style="{'background-color':data.field.dotColor}"></span>
            </div>
          </div>
          <div class="line" v-if="data.field.ifShowPSize && data.type=='controlChart2'">
            <div class="x7">
              <label for="dotColor">{{$root.langs.baseData['smartspc.baseData.packetSize']}}</label>
            </div>
            <div class="x5">
              <input type="text" class="input" name="value" id="value" :maxlength="6" v-model.trim="data.field.pSize" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"/>
            </div>
          </div>
        </div>

        <div v-show="data.type=='controlChart' || data.type=='controlChart2'" class="form-group">
          <div class="label title">
            <label for="title">{{$root.langs.alarm['smartspc.alarm.configuration']}}:</label>
          </div>
          <div class="line">
            <div class="x7">
              <label for="type2">{{$root.langs.dashboard['smartspc.dashboard.controlChartType']}}</label>
            </div>
            <div class="x5" v-if="data.type=='controlChart'">
              <el-select v-model="data.field.type2" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']">
                <el-option v-for="item in controlChart" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="x5" v-else>
              <el-select v-model="data.field.type2" @change="changeStatisticsChart2" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']">
                <el-option v-for="item in controlChart2" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>

          </div>
        </div>

      </template>

      <template v-if="['figure'].findIndex((n) => n==data.field.type)>-1">
        <div class="form-group">
          <div class="label title">
            <label for="title">{{$root.langs.dashboard['smartspc.dashboard.style']}}:</label>
          </div>
          <div class="line">
            <div class="x7">
              <label for="pointColor">{{$root.langs.dashboard['smartspc.dashboard.scatterColor']}}</label>
            </div>
            <div class="x5">
              <span class="colorPic" name="pointColor" id="pointColor" v-model.trim="data.field.pointColor" :style="{'background-color':data.field.pointColor}"></span>
            </div>
          </div>
          <div class="line">
            <div class="x7">
              <label for="lineColor">{{$root.langs.dashboard['smartspc.dashboard.circleColor']}}</label>
            </div>
            <div class="x5">
              <span class="colorPic" name="lineColor" id="lineColor" v-model.trim="data.field.lineColor" :style="{'background-color':data.field.lineColor}"></span>
            </div>
          </div>
          <el-form>
            <el-form-item>
              <label for="circleColor">{{$root.langs.dashboard['smartspc.dashboard.circle']}}</label>
            </el-form-item>
            <el-form-item v-for="(item,index) in data.field.dataCircle" :key="index">
              <input class="x10 field input" v-model="item.r" :placeholder="$root.langs.dashboard['smartspc.dashboard.pleaseSelectPro']">
              <icon-font  class="" @click="removeCircle(item)" :iconClass='"icon-dele"' :title="''">{{''}}</icon-font>
            </el-form-item>
            <el-form-item>
              <icon-font @click='addCircle' class="" :iconClass='"icon-add"' :title="''">{{''}}</icon-font>
            </el-form-item>
          </el-form>
        </div>
        <div class="form-group">
          <div class="label title">
            <label for="title">{{$root.langs.alarm['smartspc.alarm.configuration']}}:</label>
          </div>
        </div>
      </template>

      <template v-if="['histogram'].findIndex((n) => n==data.field.type)>-1">
        <div class="form-group">
          <div class="label title">
            <label for="title">{{$root.langs.dashboard['smartspc.dashboard.style']}}:</label>
          </div>

          <div class="line">
            <div class="x7">
              <label for="hisColor">{{$root.langs.dashboard['smartspc.dashboard.histogramColor']}}</label>
            </div>
            <div class="x5">
              <span class="colorPic" name="hisColor" id="hisColor" v-model.trim="data.field.hisColor" :style="{'background-color':data.field.hisColor}"></span>
            </div>
          </div>
          <div class="line">
            <div class="x7">
              <label for="lineColor">{{$root.langs.dashboard['smartspc.dashboard.normalLineColor']}}</label>
            </div>
            <div class="x5">
              <span class="colorPic" name="lineColor" id="lineColor" v-model.trim="data.field.lineColor" :style="{'background-color':data.field.lineColor}"></span>
            </div>
          </div>
          <div class="line">
            <div class="x7">
              <label for="dashStylesL">{{$root.langs.dashboard['smartspc.dashboard.normalLineStyle']}}</label>
            </div>
            <div class="x5">
              <el-select v-model="data.field.dashStylesL" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']">
                <el-option v-for="item in dashStyles" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="line">
            <div class="x8 label">
              <label for="autofill">{{$root.langs.dashboard['smartspc.dashboard.displayTheControlLine']}}</label>
            </div>
            <div class="x4 field">
              <el-checkbox v-model="data.field.isShowCLine"></el-checkbox>
            </div>
          </div>

          <div class="line" v-if="data.field.isShowCLine">
            <div class="x7">
              <label for="clColor">{{$root.langs.dashboard['smartspc.dashboard.controlLineColor']}}</label>
            </div>
            <div class="x5">
              <span class="colorPic" name="clColor" id="clColor" v-model.trim="data.field.clColor" :style="{'background-color':data.field.clColor}"></span>
            </div>
            <div class="x7">
              <label for="dashStylesC">{{$root.langs.dashboard['smartspc.dashboard.controlLineStyle']}}</label>
            </div>
            <div class="x5">
              <el-select v-model="data.field.dashStylesC" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']">
                <el-option v-for="item in dashStyles" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>

        </div>
        <div class="label title">
          <label for="title">{{$root.langs.alarm['smartspc.alarm.configuration']}}:</label>
        </div>

      </template>

      <template v-if="['boxplot'].findIndex((n) => n==data.field.type)>-1">
        <div class="form-group">
          <div class="label title">
            <label for="title">{{$root.langs.dashboard['smartspc.dashboard.style']}}:</label>
          </div>

          <div class="line">
            <div class="x7">
              <label for="boxColor">{{$root.langs.dashboard['smartspc.dashboard.cabinetColor']}}</label>
            </div>
            <div class="x5">
              <span class="colorPic" name="boxColor" id="boxColor" v-model.trim="data.field.boxColor" :style="{'background-color':data.field.boxColor}"></span>
            </div>
          </div>
          <div class="line">
            <div class="x7">
              <label for="sifenColor">{{$root.langs.dashboard['smartspc.dashboard.quartileLineColor']}}</label>
            </div>
            <div class="x5">
              <span class="colorPic" name="sifenColor" id="sifenColor" v-model.trim="data.field.sifenColor" :style="{'background-color':data.field.sifenColor}"></span>
            </div>
          </div>
          <div class="line">
            <div class="x7">
              <label for="dashStylesSi">{{$root.langs.dashboard['smartspc.dashboard.quartileLineStyle']}}</label>
            </div>
            <div class="x5">
              <el-select v-model="data.field.dashStylesSi" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']">
                <el-option v-for="item in dashStyles" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="label title">
            <label for="title">{{$root.langs.alarm['smartspc.alarm.configuration']}}:</label>
          </div>
          <div class="line">
            <div class="x7">
              <label for="comparaItem">{{$root.langs.alarm['smartspc.alarm.comparisonItem']}}</label>
            </div>
            <div class="x5">
              <el-select v-model="data.field.comparaItem" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']">
                <el-option  v-for="(item,index) in proNameList" :key="item.project_code" :label="item.project_name" :value="item.project_code"></el-option>
              </el-select>
            </div>
          </div>
        </div>

      </template>

      <template v-if="['plato'].findIndex((n) => n==data.field.type)>-1">
        <div class="form-group">
          <div class="label title">
            <label for="title">{{$root.langs.dashboard['smartspc.dashboard.style']}}:</label>
          </div>

          <div class="line">
            <div class="x8">
              <label for="boxColor">{{$root.langs.dashboard['smartspc.dashboard.cylindricalColor']}}</label>
            </div>
            <div class="x4">
              <span class="colorPic" name="boxColor" id="boxColor" v-model.trim="data.field.boxColor" :style="{'background-color':data.field.boxColor}"></span>
            </div>
          </div>
          <div class="line">
            <div class="x8">
              <label for="sifenColor">{{$root.langs.dashboard['smartspc.dashboard.percentageLineColor']}}</label>
            </div>
            <div class="x4">
              <span class="colorPic" name="sifenColor" id="sifenColor" v-model.trim="data.field.sifenColor" :style="{'background-color':data.field.sifenColor}"></span>
            </div>
          </div>
          <div class="line">
            <div class="x8">
              <label for="dashStylesSi">{{$root.langs.dashboard['smartspc.dashboard.percentageLineStyle']}}</label>
            </div>
            <div class="x4">
              <el-select v-model="data.field.dashStylesSi" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']">
                <el-option v-for="item in dashStyles" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="label title">
            <label for="title">{{$root.langs.alarm['smartspc.alarm.configuration']}}:</label>
          </div>
        </div>

      </template>

      <template v-if="['cpk'].findIndex((n) => n==data.field.type)>-1">
        <div class="form-group">
          <div class="label title">
            <label for="title">{{$root.langs.alarm['smartspc.alarm.configuration']}}:</label>
          </div>
        </div>

      </template>

      <template v-if="['scatter'].findIndex((n) => n==data.field.type)>-1">
        <div class="form-group">
          <div class="label title">
            <label for="title">{{$root.langs.dashboard['smartspc.dashboard.style']}}:</label>
          </div>
        </div>

        <div class="form-group">
          <div class="label title">
            <label for="title">{{$root.langs.alarm['smartspc.alarm.configuration']}}:</label>
          </div>
        </div>

      </template>

      <template v-if="['running'].findIndex((n) => n==data.field.type)>-1">
        <div class="form-group">
          <div class="label title">
            <label for="title">{{$root.langs.dashboard['smartspc.dashboard.style']}}:</label>
          </div>

          <div class="line">
            <div class="x7">
              <label for="lineColor">{{$root.langs.dashboard['smartspc.dashboard.polylineColor']}}</label>
            </div>
            <div class="x5">
              <span class="colorPic" name="lineColor" id="lineColor" v-model.trim="data.field.lineColor" :style="{'background-color':data.field.lineColor}"></span>
            </div>
          </div>
          <div class="line">
            <div class="x7">
              <label for="dashStylesL">{{$root.langs.dashboard['smartspc.dashboard.polylineStyle']}}</label>
            </div>
            <div class="x5">
              <el-select v-model="data.field.dashStylesL" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']">
                <el-option v-for="item in dashStyles" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="label title">
            <label for="title">{{$root.langs.alarm['smartspc.alarm.configuration']}}:</label>
          </div>
        </div>
        <div class="x7 label">
          <label for="pSize">{{$root.langs.dashboard['smartspc.dashboard.displayUntil']}}</label>
        </div>
        <div class="x5 field">
          <input type="text" class="input" name="pSize" id="pSize" maxlength="2" v-model.trim="data.field.pSize" onkeypress="return event.keyCode>=48&&event.keyCode<=57" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"/>
        </div>
      </template>

      <template v-if="['table'].findIndex((n) => n==data.field.type)>-1">
        <div class="form-group">
          <div class="label title">
            <label for="title">{{$root.langs.alarm['smartspc.alarm.configuration']}}:</label>
          </div>
        </div>
        <div class="x7">
          <label for="type2">{{$root.langs.analysis['smartspc.analysis.statisticalMethod']}}</label>
        </div>
        <div class="x5">
          <el-select v-model="data.field.statistics" @change="changeStatistics" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']">
            <el-option v-for="item in staList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </template>

      <template v-if="['indicator'].findIndex((n) => n==data.field.type)>-1">
        <div class="form-group">
          <div class="label title">
            <label for="title">{{$root.langs.alarm['smartspc.alarm.configuration']}}:</label>
          </div>
        </div>
      </template>

      <template v-if="['controlChart','controlChart2','histogram','boxplot','plato','cpk','scatter','running','indicator','figure'].findIndex((n) => n==data.field.type)>-1">
        <div class="form-group">
          <div class="label">
            <label for="dataSParms">{{$root.langs.dashboard['smartspc.dashboard.dataSource']}}:</label>
          </div>

          <el-form>
            <el-form-item
              v-for="(domain, index) in data.field.dataSource"
              :key="domain.key"
              class="adddatas"
            >
              <el-select class="x5 field" v-model="domain.code" @change="changeFList(index)" :placeholder="$root.langs.dashboard['smartspc.dashboard.pleaseSelectPro']">
                <el-option  v-for="(item,index) in proNameList" :key="item.project_code" :label="item.project_name" :value="item.project_code"></el-option>
              </el-select>
              <el-select class="x5 field" v-model="domain.value" @change="changeFList2(index)" @visible-change="proParamData(domain.code)"  :placeholder="$root.langs.dashboard['smartspc.dashboard.pleaseSelectPro']">
                <el-option  v-for="(item,index) in proValueList" :key="item.LevelValue" :label="item.LevelValue" :value="item.LevelValue"></el-option>
              </el-select>

              <icon-font @click="removeDomain(domain)" class="" :iconClass='"icon-dele"' :title="''">{{''}}</icon-font>
            </el-form-item>
          </el-form>

          <template v-if="data.field.ifShowParms && data.field.type == 'controlChart2'">
            <div class="x5 label">
              <label for="dataSParms">{{$root.langs.dashboard['smartspc.dashboard.parameter']}}</label>
            </div>
            <div class="x5">
              <el-select v-model="data.field.dataSParms" @change="changeControl" @visible-change="getDateParmse(data.field.dataSource)" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']">
                <el-option v-for="(item,index) in dataSParmsList" :key="index" :label="item.item" :value="item.item">
                </el-option>
              </el-select>
            </div>
          </template>

          <template v-if="['histogram','boxplot','cpk','running'].findIndex((n) => n==data.field.type)>-1">
            <div class="x5 label">
              <label for="dataSParms">{{$root.langs.dashboard['smartspc.dashboard.parameter']}}</label>
            </div>
            <div class="x5">
              <el-select v-model="data.field.dataSParms" @visible-change="getDateParmse(data.field.dataSource)" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']">
                <el-option v-for="(item,index) in dataSParmsList" :key="index" :label="item.item" :value="item.item">
                </el-option>
              </el-select>
            </div>
          </template>
          <template v-if="['indicator'].findIndex((n) => n==data.field.type)>-1">
            <div class="x5 label">
              <label for="dataSParms">{{$root.langs.dashboard['smartspc.dashboard.parameter']}}</label>
            </div>
            <div class="x5">
              <el-select v-model="data.field.dataSParms" @change="changeControl" @visible-change="getDateParmse(data.field.dataSource)" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']">
                <el-option v-for="(item,index) in dataSParmsList" :key="index" :label="item.item" :value="item.item">
                </el-option>
              </el-select>
            </div>
          </template>
          <template v-if="['controlChart'].findIndex((n) => n==data.field.type)>-1">
            <div class="x5 label">
              <label for="dataSParms">{{$root.langs.dashboard['smartspc.dashboard.parameter']}}</label>
            </div>
            <div class="x5">
              <el-select v-model="data.field.dataSParms" @change="changeControl" @visible-change="getDateParmse(data.field.dataSource)" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']">
                <el-option v-for="(item,index) in dataSParmsList" :key="index" :label="item.item" :value="item.item">
                </el-option>
              </el-select>
            </div>
          </template>
          <template v-else-if="['scatter','figure'].findIndex((n) => n==data.field.type)>-1">
            <div class="x5 label">
              <label for="dataSParms">{{$root.langs.dashboard['smartspc.dashboard.X-axis']}}</label>
            </div>
            <div class="x5">
              <el-select v-model="data.field.dataSParmsX" @visible-change="getDateParmse(data.field.dataSource)" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']">
                <el-option v-for="(item,index) in dataSParmsList" :key="index" :label="item.item" :value="item.item">
                </el-option>
              </el-select>
            </div>
            <div class="x5 label">
              <label for="dataSParms">{{$root.langs.dashboard['smartspc.dashboard.Y-axis']}}</label>
            </div>
            <div class="x5">
              <el-select v-model="data.field.dataSParmsY" @visible-change="getDateParmse2(data.field.dataSource)" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']">
                <el-option v-for="(item,index) in dataSParmsList2" :key="index" :label="item.item" :value="item.item">
                </el-option>
              </el-select>
            </div>
          </template>

          <icon-font @click='addDomain' class="" :iconClass='"icon-add"' :title="''">{{''}}</icon-font>
        </div>
        <div class="form-group">
          <el-button size="mini" @click="submitParms">{{$root.langs.common['smartspc.common.submit']}}</el-button>
        </div>
      </template>

      <template v-if="['table'].findIndex((n) => n==data.field.type)>-1">
        <div class="form-group">
          <div class="label">
            <label for="dataSParmsList">{{$root.langs.dashboard['smartspc.dashboard.dataSource']}}:</label>
          </div>

          <el-form>
            <el-form-item
              v-for="(domain, index) in data.field.dataSourceList"
              :key="domain.key"
              class="adddatas"
            >
              <el-select class="x9 field" v-model="domain.code" @change="changeFList(index)" :placeholder="$root.langs.dashboard['smartspc.dashboard.pleaseSelectPro']">
                <el-option  v-for="(item,index) in proNameList" :key="item.project_code" :label="item.project_name" :value="item.project_code"></el-option>
              </el-select>

              <el-select class="x9 field" v-model="domain.value" multiple collapse-tags @change="changeFList2(index)" @visible-change="proParamData(domain.code)"  :placeholder="$root.langs.dashboard['smartspc.dashboard.pleaseSelectPro']">
                <el-option key="ALLData" :label="$root.langs.common['smartspc.common.all']" value="ALL" style="border-bottom:1px solid#f5f7fa;"></el-option>
                <el-option  v-for="(item,index) in proValueList" :key="item.LevelValue" :label="item.LevelValue" :value="item.LevelValue"></el-option>
              </el-select>

              <icon-font @click="removeDomain(domain)" class="" :iconClass='"icon-dele"' :title="''">{{''}}</icon-font>
            </el-form-item>
          </el-form>

          <template v-if="data.field.ifShowParms">
            <div class="x2 label">
              <label for="dataSParms">{{$root.langs.dashboard['smartspc.dashboard.parameter']}}:</label>
            </div>
            <div class="x10">
              <el-select v-model="data.field.dataSParmsList" multiple collapse-tags @change="changeParmsList" @visible-change="getDateParmse(data.field.dataSourceList)" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']">
                <el-option key="ALLValue" :label="$root.langs.common['smartspc.common.all']" value="ALL" style="border-bottom:1px solid#f5f7fa;"></el-option>
                <el-option v-for="(item,index) in dataSParmsList" :key="index" :label="item.item" :value="item.item">
                </el-option>
              </el-select>
            </div>
          </template>

          <icon-font @click='addDomain' class="" :iconClass='"icon-add"' :title="''">{{''}}</icon-font>
        </div>
        <div class="form-group">
          <el-button size="mini" @click="submitParms">{{$root.langs.common['smartspc.common.submit']}}</el-button>
        </div>
      </template>

      <template v-if="data.field.type=='label'">
        <div class="form-group">
          <div class="label">
            <label for="value">{{$root.langs.common['smartspc.common.value']}}</label>
          </div>
          <div class="field">
            <input type="text" class="input" name="value" id="value" :maxlength="250" v-model.trim="data.field.value" />
          </div>
        </div>
        <div class="form-group">
          <div class="line">
            <div class="x8">
              <label for="fontsize">{{$root.langs.dashboard['smartspc.dashboard.fontSize']}}</label>
            </div>
            <div class="x4">
              <el-select v-model="data.field.fontsize" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']">
                <el-option v-for="item in fontSizeSelect" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="line">
            <div class="x8">
              <label for="fontWeight">{{$root.langs.dashboard['smartspc.dashboard.fontWeight']}}</label>
            </div>
            <div class="x4">
              <el-select v-model="data.field.fontWeight" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']">
                <el-option v-for="item in fontWeightSelect" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="line">
            <div class="x8">
              <label for="color">{{$root.langs.dashboard['smartspc.dashboard.colour']}}</label>
            </div>
            <div class="x4">
              <span class="colorPic" name="color" id="color" v-model.trim="data.field.color" :style="{'background-color':data.field.color}"></span>
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="data.field.type=='img'">
        <div class="form-group">
          <div class="label">
            <label for="src">{{$root.langs.dashboard['smartspc.dashboard.img']}}</label>
          </div>
          <div class="field line-middle">
            <div class="x5  relative">
              <a class="button input-file" href="javascript:void(0);">
                <el-button type="Blue">{{$root.langs.dashboard['smartspc.dashboard.upload']}}</el-button>
                <input size="80" id="fileToUpload" name="fileToUpload" type="file" @change="upload(data,'fileToUpload')" />
              </a>
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="data.field.type=='line'">
        <div class="form-group">
          <div class="line">
            <div class="x8">
              <label for="lineWeight">{{$root.langs.dashboard['smartspc.dashboard.lineWeight']}}</label>
            </div>
            <div class="x4">
              <el-select v-model="data.field.lineWeight" :placeholder="$root.langs.common['smartspc.common.pleaseChoose']">
                <el-option v-for="item in lineWeightSelect" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="line">
            <div class="x8">
              <label for="lineColor">{{$root.langs.dashboard['smartspc.dashboard.colour']}}</label>
            </div>
            <div class="x4">
              <span class="colorPic" name="lineColor" id="lineColor" v-model.trim="data.field.lineColor" :style="{'background-color':data.field.lineColor}"></span>
            </div>
          </div>
        </div>
      </template>
      <template v-if="data.field.type=='defined'">
        <div class="form-group">
          <div class="label">
            <label for="value">URL</label>
          </div>
          <div class="field">
            <input type="url" class="input" name="url" id="url" v-model.trim="data.field.url"/>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
  import "../css/style.less";
  require('../vendors/colorPick/colpick.css')
  require('../vendors/colorPick/colpick')
  require('../vendors/colorPick/color_exchange')

  var app;
  import {
    mapGetters
  } from 'vuex'
  export default {
    props: ['currentEidtIndex'],
    data() {
      return {
        app: '',
        lineWeightSelect:[{
          label: '1',
          value: '1'
        }, {
          label: '2',
          value: '2'
        }, {
          label: '3',
          value: '3'
        }],
        fontWeightSelect: [{
          label: this.$root.langs.dashboard['smartspc.dashboard.regular'],
          value: 'normal'
        }, {
          label: this.$root.langs.dashboard['smartspc.dashboard.bold'],
          value: 'bold'
        }],
        fontSizeSelect: [{
          label: this.$root.langs.dashboard['smartspc.dashboard.small'],
          value: 'small'
        }, {
          label: this.$root.langs.dashboard['smartspc.dashboard.middle'],
          value: 'medium'
        }, {
          label: this.$root.langs.dashboard['smartspc.dashboard.big'],
          value: 'large'
        }, {
          label: this.$root.langs.dashboard['smartspc.dashboard.x-large'],
          value: 'x-large'
        }, {
          label: this.$root.langs.dashboard['smartspc.dashboard.xx-large'],
          value: 'xx-large'
        }],
        controlChart: [{
          label: 'Xbar',
          value: 'Xbar'
        }, {
          label: 'S',
          value: 'S'
        }, {
          label: 'R',
          value: 'R'
        }, {
          label: 'Xmed',
          value: 'Xmed'
        }, {
          label: 'MR',
          value: 'MR'
        }],
        controlChart2: [{
          label: 'nP',
          value: 'nP'
        }, {
          label: 'P',
          value: 'P'
        }, {
          label: 'C',
          value: 'C'
        }, {
          label: 'U',
          value: 'U'
        }],
        dashStyles: [{
          label: 'Solid',
          value: 'Solid'
        }, {
          label: 'Dot',
          value: 'Dot'
        }, {
          label: 'Dash',
          value: 'Dash'
        }, {
          label: 'DashDot',
          value: 'DashDot'
        }],
        staList: [{
          label: this.$root.langs.dashboard['smartspc.dashboard.averageValue'],
          value: 'average'
        }, {
          label: this.$root.langs.dashboard['smartspc.dashboard.max'],
          value: 'max'
        }, {
          label: this.$root.langs.dashboard['smartspc.dashboard.min'],
          value: 'min'
        },{
          label: this.$root.langs.dashboard['smartspc.dashboard.unitValue'],
          value: 'unitValue'
        }, {
          label: this.$root.langs.dashboard['smartspc.dashboard.passRateSingle-board'],
          value: 'boardRate'
        }, {
          label: this.$root.langs.dashboard['smartspc.dashboard.passRateTestItems'],
          value: 'testRate'
        }, {
          label: this.$root.langs.dashboard['smartspc.dashboard.totalTestsSingle-board'],
          value: 'boardTotal'
        }],
        proValueList: [],
        dataSParmsList: [],
        dataSParmsList2: [],
        proNameList: []
      }
    },
    components: {
      IconFont: resolve => require(['common/iconfont.vue'], resolve)
    },
    computed: {
      data: function() {
        let numIndex = app.domWidgets.length-1;
        if(numIndex == this.currentEidtIndex){
          return app.domWidgets[this.currentEidtIndex];
        } else {
          let arr =  app.domWidgets.filter((item) => (item.type != 'line'));
          return arr[this.currentEidtIndex];
        }

        console.log('arr[this.currentEidtIndex]',arr[this.currentEidtIndex]);
      },
      editId: function() {
        return this.$route.params.id
      }
    },
    created: function() {
      app = this.$parent;
      this.app = app;

      this.getProNameList();

      //console.log('app.domWidgets',app.domWidgets);

    },
    mounted: function() {
      this.init();
    },
    updated: function() {
      this.init();
    },
    methods: {
      changeControl(data) {
        for(let n in this.dataSParmsList) {
          if(data === this.dataSParmsList[n].item) {
            this.data.field.dataSParmsId = this.dataSParmsList[n].Item_ID;
          }
        }
      },
      changeStatistics(data) {
        if(data === 'boardRate' || data === 'boardTotal') {
          this.data.field.dataSParmsList = [];
          this.data.field.ifShowParms = false;
        } else {
          this.data.field.ifShowParms = true;
        }
      },
      changeStatisticsChart2(data) {

        if(data === 'C' || data === 'U') {
          this.data.field.ifShowPSize = false;
          this.data.field.ifShowParms = true;
        } else {
          this.data.field.ifShowPSize = true;
          this.data.field.ifShowParms = false;
        }
      },
      upload: function(obj, id) {
        window.console && console.log(FileReader, obj, id);
        
        let that = this;
        var file = document.getElementById(id).files[0];

        window.console && console.log('image.fileSize',file.size);

        //超过800KB，不让用
        if((file.size/1024) > 800) {
          this.$notify({
            message: this.$root.langs.dashboard['smartspc.dashboard.imgnotexceed800KB'],
            type: 'error',
            duration: 2000,
          });
          return false;
        }

        //判断浏览器是否支持FileReader接口
        if (typeof FileReader == 'undefined') {
          this.$notify({
            message: '',
            type: 'error',
            duration: 2000,
          });
          //使选择控件不可操作
          file.setAttribute("disabled", "disabled");
        }
        if (!/image\/\w+/.test(file.type)) {
          this.$notify({
            message: this.$root.langs.dashboard['smartspc.dashboard.pleaseChooseImg'],
            type: 'error',
            duration: 2000,
          });
          return false;
        }
        var reader = new FileReader();
        //将文件以Data URL形式读入页面
        reader.readAsDataURL(file);
        reader.onload = function(e) {
          obj.field.src = this.result
        }
      },
      changeFList(index) {
        if(this.data.field.type == 'table') {
          this.data.field.dataSourceList[index].value = [];
          this.data.field.dataSParmsList = [];
        } else {
          this.data.field.dataSource[index].value = '';
          this.data.field.dataSParms = '';
        }
        
        this.data.field.dataSParmsX = '';
        this.data.field.dataSParmsY = '';
        this.data.field.hChartDatas = {};
      },
      changeFList2(index) {
        if(this.data.field.type == 'table') {
          this.data.field.dataSParmsList = [];

          for(let n in this.data.field.dataSourceList[index].value) {
            if(this.data.field.dataSourceList[index].value[n] == 'ALL') {
              let temArr = [];
              for(let x in this.proValueList) {
                temArr.push(this.proValueList[x].LevelValue);
              }
              this.data.field.dataSourceList[index].value = temArr;
            }
          }
        } else {
          this.data.field.dataSParms = '';
        }

        this.data.field.dataSParmsX = '';
        this.data.field.dataSParmsY = '';
        this.data.field.hChartDatas = {};

      },
      changeParmsList(data) {

        for(let n in this.data.field.dataSParmsList) {
            if(this.data.field.dataSParmsList[n] == 'ALL') {
              let temArr = [];
              for(let x in this.dataSParmsList) {
                temArr.push(this.dataSParmsList[x].item);
              }
              this.data.field.dataSParmsList = temArr;
            }
          }
      },
      async getProNameList() {
        let prjData = await this.$get(`${window.gatewayspc}/infra/prj`);
        if(prjData.code==0){
          this.proNameList = prjData.data;
        }
      },
      async getDateParmse2(data) {
        if(data[0].value != '') {
          let jsonData = JSON.stringify(data);
          let prjData = await this.$post(`${window.gatewayspc}/kb/item`,jsonData);
          if(prjData.code==0){
            this.dataSParmsList2 = prjData.data;
          }
        } else {
          this.dataSParmsList2 = [];
        }

      },
      async getDateParmse(data) {

        if(data[0].value != '') {
          let jsonData = JSON.stringify(data);
          let prjData = await this.$post(`${window.gatewayspc}/kb/item`,jsonData);
          if(prjData.code==0){
            this.dataSParmsList = prjData.data;
          }
        } else {
          this.dataSParmsList = [];
        }

      },
      async proParamData(data) {
        //console.log(data,'-------------------');
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
        if(this.data.field.type == 'table') {
          var index = this.data.field.dataSourceList.indexOf(item)
          if (index !== -1) {
            this.data.field.dataSourceList.splice(index, 1)
          }
        } else {
          var index = this.data.field.dataSource.indexOf(item)
          if (index !== -1) {
            this.data.field.dataSource.splice(index, 1)
          }
        }
      },
      addDomain() {

        let that = this;
        if(this.data.field.type == 'table') {
          if(!(this.data.field.dataSourceList.length >= this.proNameList.length)) {
            this.data.field.dataSourceList.push({
              code: '',
              value: [],
              key: Date.now()
            });
          } else {
            that.$warning(that.$root.langs.common['smartspc.common.outOfLimit']);
          }
        } else {
          if(!(this.data.field.dataSource.length >= this.proNameList.length)) {
            this.data.field.dataSource.push({
              code: '',
              value: '',
              key: Date.now()
            });
          } else {
            that.$warning(that.$root.langs.common['smartspc.common.outOfLimit']);
          }
        }
        
      },
      removeCircle(item) {
        var index = this.data.field.dataCircle.indexOf(item)
        if (index !== -1) {
          this.data.field.dataCircle.splice(index, 1)
        }
      },
      addCircle() {
        this.data.field.dataCircle.push({
          r:""
        });
      },
      async submitParms() {

        let that = this;
          var theObj = this.data;
          if (!theObj) {
            return;
          }
          var type = theObj.field.type;

          let obj = {
            boardId: this.editId,
            field: theObj.field
          }
        let obj2 = JSON.stringify(obj);

          //console.log('init',obj);

        let url = '';
        switch (theObj.field.type) {
          case 'controlChart':
            url = 'cchart';
            break;
          case 'controlChart2':
            url = 'pchart';
            break;
          case 'histogram':
            url = 'hist';
            break;
          case 'boxplot':
            url = 'boxplot';
            break;
          case 'plato':
            url = 'ploat';
            break;
          case 'cpk':
            url = 'cpk';
            break;
          case 'scatter':
            url = 'scatter';
            break;
          case 'running':
            url = 'runchart';
            break;
          case 'table':
            url = 'table';
            break;
          case 'indicator':
            url = 'indicator';
            break;
          case 'figure':
            url = 'targetmap';
            break;
          case 'defined':
            url = 'defined';
            break ;
        }
        
        if(url != '') { 

          if(url == 'table') {

            let indexData = theObj.field.dataSourceList.length*1 - 1;

            if(theObj.field.statistics==='boardRate' || theObj.field.statistics==='boardTotal') {
              if(theObj.field.dataSourceList[indexData].value != '') {
                let datas = await this.$post(`${window.gatewayspc}/kb/`+url,obj2);
                if(datas.code == 0) {
                  theObj.field.hChartDatas =  datas.data;
                }  else {
                  theObj.field.hChartDatas =  {};
                }
              } else {
                this.$warning(this.$root.langs.dashboard['smartspc.dashboard.completeParameters']);
              }
            } else if(theObj.field.statistics != '' && theObj.field.dataSParmsList != '') {
                let datas = await this.$post(`${window.gatewayspc}/kb/`+url,obj2);
                if(datas.code == 0) {
                  theObj.field.hChartDatas =  datas.data;
                }  else {
                  theObj.field.hChartDatas =  {};
                }
            } else {
              this.$warning(this.$root.langs.dashboard['smartspc.dashboard.completeParameters']);
            }

          }

          //普通常规控制图
          if(['cpk','runchart','indicator','hist'].findIndex((n) => n == url)>-1) {
            if(theObj.field.dataSParms != '') {
              let datas = await this.$post(`${window.gatewayspc}/kb/`+url,obj2);
              if(datas.code == 0) {
                theObj.field.hChartDatas =  datas.data;

                if(url == 'indicator') {
                  theObj.field.backgroundColor =  theObj.field.hChartDatas.color === 'RED' ? '#d61111' : '#11d611';
                  theObj.field.exceptionNum =  theObj.field.hChartDatas.total;
                }

              }  else {
                theObj.field.hChartDatas =  {};
              }
            } else {
              this.$warning(this.$root.langs.dashboard['smartspc.dashboard.completeParameters']);
            }
            
          }

          if(url == 'cchart') {
            if(theObj.field.type2 != '' && theObj.field.dataSParms != '') {
              let datas = await this.$post(`${window.gatewayspc}/kb/`+url,obj2);
              if(datas.code == 0) {

                theObj.field.hChartDatas =  datas.data;
                theObj.field.hChartDatas.CL = theObj.field.hChartDatas.CL.toFixed(3)*1;
                theObj.field.hChartDatas.LCL = theObj.field.hChartDatas.LCL.toFixed(3)*1;
                theObj.field.hChartDatas.UCL = theObj.field.hChartDatas.UCL.toFixed(3)*1;

                let min =eval("Math.min(" +datas.data.points.toString()+")");　 // 1     采用字符串拼接

　　            let max = eval("Math.max(" +datas.data.points.toString()+")");;　 // 33

                if(max > theObj.field.hChartDatas.UCL) {
                        theObj.field.maxValue = max;
                      } else {
                        theObj.field.maxValue = theObj.field.hChartDatas.UCL+(theObj.field.hChartDatas.UCL - theObj.field.hChartDatas.LCL)*0.05;
                      }

                      if(min < theObj.field.hChartDatas.LCL) {
                        theObj.field.minValue = min;
                      } else {
                        theObj.field.minValue = theObj.field.hChartDatas.LCL-(theObj.field.hChartDatas.UCL - theObj.field.hChartDatas.LCL)*0.05;
                }

              }  else {
                theObj.field.hChartDatas =  {};
              }
            } else {
              this.$warning(this.$root.langs.dashboard['smartspc.dashboard.completeParameters']);
            }
          } 

          if(url == 'pchart') {

            if(theObj.field.type2 == 'C' || theObj.field.type2 == 'U') {
              if(theObj.field.dataSParms != '') {
                let datas = await this.$post(`${window.gatewayspc}/kb/`+url,obj2);
                if(datas.code == 0) {

                  theObj.field.hChartDatas =  datas.data;
                  theObj.field.hChartDatas.CL = theObj.field.hChartDatas.CL.toFixed(3)*1;
                  theObj.field.hChartDatas.LCL = theObj.field.hChartDatas.LCL.toFixed(3)*1;
                  theObj.field.hChartDatas.UCL = theObj.field.hChartDatas.UCL.toFixed(3)*1;

                  let min =eval("Math.min(" +datas.data.points.toString()+")");　 // 1     采用字符串拼接

  　　            let max = eval("Math.max(" +datas.data.points.toString()+")");;　 // 33

                  if(max > theObj.field.hChartDatas.UCL) {
                          theObj.field.maxValue = max;
                        } else {
                          theObj.field.maxValue = theObj.field.hChartDatas.UCL+(theObj.field.hChartDatas.UCL - theObj.field.hChartDatas.LCL)*0.05;
                        }

                        if(min < theObj.field.hChartDatas.LCL) {
                          theObj.field.minValue = min;
                        } else {
                          theObj.field.minValue = theObj.field.hChartDatas.LCL-(theObj.field.hChartDatas.UCL - theObj.field.hChartDatas.LCL)*0.05;
                  }

                } else {
                  theObj.field.hChartDatas =  {};
                }
              } else {
                this.$warning(this.$root.langs.dashboard['smartspc.dashboard.completeParameters']);
              }
            } else if(theObj.field.type2 != '' && theObj.field.dataSource[0].value) {
              let indexData = theObj.field.dataSource.length*1 - 1;

              if(theObj.field.dataSource[indexData].value != '') {
                let datas = await this.$post(`${window.gatewayspc}/kb/`+url,obj2);
                if(datas.code == 0) {

                  theObj.field.hChartDatas =  datas.data;
                  theObj.field.hChartDatas.CL = theObj.field.hChartDatas.CL.toFixed(3)*1;
                  theObj.field.hChartDatas.LCL = theObj.field.hChartDatas.LCL.toFixed(3)*1;
                  theObj.field.hChartDatas.UCL = theObj.field.hChartDatas.UCL.toFixed(3)*1;

                  let min =eval("Math.min(" +datas.data.points.toString()+")");　 // 1     采用字符串拼接

  　　            let max = eval("Math.max(" +datas.data.points.toString()+")");;　 // 33

                  if(max > theObj.field.hChartDatas.UCL) {
                          theObj.field.maxValue = max;
                        } else {
                          theObj.field.maxValue = theObj.field.hChartDatas.UCL+(theObj.field.hChartDatas.UCL - theObj.field.hChartDatas.LCL)*0.05;
                        }

                        if(min < theObj.field.hChartDatas.LCL) {
                          theObj.field.minValue = min;
                        } else {
                          theObj.field.minValue = theObj.field.hChartDatas.LCL-(theObj.field.hChartDatas.UCL - theObj.field.hChartDatas.LCL)*0.05;
                  }


                } else {
                  theObj.field.hChartDatas =  {};
                }
              } else {
                this.$warning(this.$root.langs.dashboard['smartspc.dashboard.completeParameters']);
              }
            } else {
              this.$warning(this.$root.langs.dashboard['smartspc.dashboard.completeParameters']);
            }
          }

          if(url == 'boxplot'){
            if(theObj.field.comparaItem != '' && theObj.field.dataSParms != '') {
              let datas = await this.$post(`${window.gatewayspc}/kb/`+url,obj2);
              if(datas.code == 0) {
                theObj.field.hChartDatas =  datas.data;
              }  else {
                theObj.field.hChartDatas =  {};
              }
            } else {
              this.$warning(this.$root.langs.dashboard['smartspc.dashboard.completeParameters']);
            }
          }

          if(url == 'ploat') {
            if(theObj.field.dataSource[0].value) {
              let datas = await this.$post(`${window.gatewayspc}/kb/`+url,obj2);
              if(datas.code == 0) {
                theObj.field.hChartDatas =  datas.data;
              }  else {
                theObj.field.hChartDatas =  {};
              }
            } else {
              this.$warning(this.$root.langs.dashboard['smartspc.dashboard.completeParameters']);
            }
          }

          if(['scatter','targetmap'].findIndex((n) => n == url)>-1) {
            if(theObj.field.dataSParmsY != '' && theObj.field.dataSParmsX != '') {
              let datas = await this.$post(`${window.gatewayspc}/kb/`+url,obj2);
              if(datas.code == 0) {
                theObj.field.hChartDatas =  datas.data;
              }  else {
                theObj.field.hChartDatas =  {};
              }
            } else {
              this.$warning(this.$root.langs.dashboard['smartspc.dashboard.completeParameters']);
            }
          }  

        }
      },
      async init() {
        let that = this;
        
        //绑定编辑面板事件
        $('.colorPic').colpick({
          submit: 0,
          onChange: function(hsb, hex, rgb, el, bySetColor) {
            //input定义了id则用id，否则用colorpic_rel
            if (el.id) {
              app.domWidgets[that.currentEidtIndex].field[el.id] = '#' + hex;
            } else if (el.getAttribute('colorpic_rel')) {
              var colorpic_rel = el.getAttribute('colorpic_rel'),
                colorpic_field = el.getAttribute('colorpic_field'),
                colorpic_rels = colorpic_rel.split('.'),
                arr = [app.domWidgets[that.currentEidtIndex].field];
              for (var i = 0; i < colorpic_rels.length; i++) {
                arr.push(arr[i][colorpic_rels[i]]);
              }
              var obj = arr[arr.length - 1];
              obj[colorpic_field] = '#' + hex;
            }
          }
        });


      }
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  ul,
  li {
    margin: 0;
    padding: 0;
    &.el-select-dropdown__item{
      padding: 0 10px;
    }
  }

  p {
    margin-bottom: 0
  }

  .label label {
    font-weight: normal;
  }

  .column-header {
    font-size: 16px;
    font-weight: bold;
  }

  @color1: #c1c8ce;
  @color2: #fc9584;
  .iconfont {
    width: 20px;
    display: inline-block;
    text-align: center;
    color: @color1;
    cursor: pointer;
    &:hover {
      color: @color2;
    }
    &.icon-create {
      font-size: 22px;
    }
    &.icon-tubiao06 {
      font-size: 19px;
      vertical-align: 3px;
    }
  }

  .colorPic {
    display: inline-block;
    width: 50px;
    height: 22px;
    vertical-align: middle;
    border-radius: 3px;
    border: 1px solid #ddd;
  }

  .numberInput {
    width: 50px;
    display: inline-block;
    height: 22px;
    margin-right: 3px;
  }

  @colorBorder: #dfdfe9;
  .form-group .fieldList {
    max-height: 180px;
    overflow-y: scroll;
    overflow-x: hidden;
    border-top: 1px solid @colorBorder;
    border-bottom: 1px solid @colorBorder;
    line-height: 24px;
    li {
      border: 1px solid @colorBorder;
      position: relative;
      display: inline-block;
      width: 96px;
      border-radius: 3px;
      margin: 5px 10px 0 0;
      padding: 3px 8px;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #a5a5a5;
      height: 30px;
      white-space: nowrap;
      &:nth-child(even) {
        margin-right: 0;
      }
      &.active {
        border: 1px solid #fb735c;
        box-shadow: 3px 3px 3px #f1d6cd;
      }
    }
  }

  body {
    overflow-x: hidden;
  }


  .alarm .iconfont {
    vertical-align: -5px;
    &.icon-tubiao06 {
      vertical-align: -2px;
    }
  }

  .relative {
    position: relative;
  }

  #fileToUpload {
    background: red;
    position: absolute;
    left: 0;
    top: 3px;
    height: 38px;
    opacity: 0;
  }

  .column-body .title {
    font-size: 14px;
    font-weight: bold;
    color: #abb4bc;
  }

</style>
<style lang='less'>
  #widgetEditItem {
    .el-form-item__label {
      width: 100%;
      text-align: left;
    }
    .el-form-item {
      margin-bottom: 0px;
    }
    .column-body .edit-btn {
      margin-left: 0px;
    }

  }
</style>