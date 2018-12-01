<template>
  <div>
            <div class="bead-table">

              <table class="bead-ball" v-if="curBocaiTypeId != 8266">
                <tr v-if="[1,8815,8811,8374,8813].findIndex((n) => n==curBocaiTypeId)>-1">
                  <th class="active getqiu1" @click="getqiu(1,'第一球')">第一球</th>
                  <th class="getqiu2" @click="getqiu(2,'第二球')">第二球</th>
                  <th class="getqiu3" @click="getqiu(3,'第三球')">第三球</th>
                  <th class="getqiu4" @click="getqiu(4,'第四球')">第四球</th>
                  <th class="getqiu5" @click="getqiu(5,'第五球')">第五球</th>
                </tr>
                <tr v-if="[8555,8806,9057].findIndex((n) => n==curBocaiTypeId)>-1">
                  <th class="active getqiu1" @click="getqiu(1,'冠军')">冠军</th>
                  <th class="getqiu2" @click="getqiu(2,'亚军')">亚军</th>
                  <th class="getqiu3" @click="getqiu(3,'第三名')">第三名</th>
                  <th class="getqiu4" @click="getqiu(4,'第四名')">第四名</th>
                  <th class="getqiu5" @click="getqiu(5,'第五名')">第五名</th>
                  <th class="getqiu5" @click="getqiu(6,'第六名')">第六名</th>
                  <th class="getqiu5" @click="getqiu(7,'第七名')">第七名</th>
                  <th class="getqiu5" @click="getqiu(8,'第八名')">第八名</th>
                  <th class="getqiu5" @click="getqiu(9,'第九名')">第九名</th>
                  <th class="getqiu5" @click="getqiu(10,'第十名')">第十名</th>
                </tr>
              </table>




              <table v-if="curBocaiTypeId != 8266">
                <tr class="td-head" v-if="[1,8815].findIndex((n) => n==curBocaiTypeId)>-1">
                  <td>0</td> 
                  <td>1</td> 
                  <td>2</td> 
                  <td>3</td> 
                  <td>4</td> 
                  <td>5</td> 
                  <td>6</td> 
                  <td>7</td> 
                  <td>8</td> 
                  <td>9</td>
                </tr>
                <tr class="td-head" v-if="[8811,8374,8813].findIndex((n) => n==curBocaiTypeId)>-1">
                  <td style="width: 8%;">1</td> 
                  <td style="width: 8%;">2</td> 
                  <td style="width: 8%;">3</td> 
                  <td style="width: 8%;">4</td> 
                  <td style="width: 8%;">5</td> 
                  <td style="width: 8%;">6</td> 
                  <td style="width: 8%;">7</td> 
                  <td style="width: 8%;">8</td> 
                  <td style="width: 8%;">9</td>
                  <td style="width: 8%;">10</td>
                  <td style="width: 8%;">11</td>
                </tr>
                <tr class="td-head" v-if="[8555,8806,9057].findIndex((n) => n==curBocaiTypeId)>-1">
                  <td>1</td> 
                  <td>2</td> 
                  <td>3</td> 
                  <td>4</td> 
                  <td>5</td> 
                  <td>6</td> 
                  <td>7</td> 
                  <td>8</td> 
                  <td>9</td>
                  <td>10</td>
                </tr>

                <tr>
                  <td v-for="(item,key) in countsList">{{item}}</td>
                </tr>
                
              </table>

              <table width="100%" class="bead-ball">
                <tr v-if="curBocaiTypeId != 8266">
                  <th class="active getsubtit1" @click="getsubtit(1)" v-if="[1,8815,8811,8374,8813].findIndex((n) => n==curBocaiTypeId)>-1">{{subtitLabel}}</th>
                  <th class="active getsubtit1" @click="getsubtit(1)" v-if="[8555,8806,9057].findIndex((n) => n==curBocaiTypeId)>-1">{{subtitLabel2}}</th>
                  <th class="getsubtit2" @click="getsubtit(2)">大小</th> 
                  <th class="getsubtit3" @click="getsubtit(3)">单双</th> 
                  <th class="getsubtit4" @click="getsubtit(4)" v-if="[1,8815,8811,8374,8813].findIndex((n) => n==curBocaiTypeId)>-1">总和大小</th> 
                  <th class="getsubtit5" @click="getsubtit(5)" v-if="[1,8815,8811,8374,8813].findIndex((n) => n==curBocaiTypeId)>-1">总和单双</th>

                  <th class="getsubtit6" @click="getsubtit(6)" v-if="[1,8815].findIndex((n) => n==curBocaiTypeId)>-1">龙虎和</th>

                  <th class="getsubtit7" @click="getsubtit(7)" v-if="[8811,8374,8813].findIndex((n) => n==curBocaiTypeId)>-1">总和尾数大小</th>
                  <th class="getsubtit8" @click="getsubtit(8)" v-if="[8811,8374,8813].findIndex((n) => n==curBocaiTypeId)>-1">龙虎</th>

                  <th class="getsubtit7" @click="getsubtit(9)" v-if="[8555,8806,9057].findIndex((n) => n==curBocaiTypeId)>-1">冠亚军和</th>
                  <th class="getsubtit8" @click="getsubtit(10)" v-if="[8555,8806,9057].findIndex((n) => n==curBocaiTypeId)>-1">冠亚军和大小</th>
                  <th class="getsubtit8" @click="getsubtit(11)" v-if="[8555,8806,9057].findIndex((n) => n==curBocaiTypeId)>-1">冠亚军和单双</th>


                </tr>

                <tr v-else>
                  <th class="active getsubtit1" @click="getsubtit(1)">总和数</th>
                  <th class="getsubtit2" @click="getsubtit(2)">总和大小</th>
                  <th class="getsubtit3" @click="getsubtit(3)">总和单双</th>
                  <th class="getsubtit4" @click="getsubtit(4)">五行</th>
                  <th class="getsubtit5" @click="getsubtit(5)">前后和</th>
                  <th class="getsubtit6" @click="getsubtit(6)">单双和</th>
                </tr>
              </table>

              <table v-if="curBocaiTypeId != 8266">

                <tr v-if="subtit == 1">
                  <td width="4%" class="bead-list" v-for="(item,index) in numMapListTemp">
                    <p v-for="itemsub in item.value">{{itemsub}}</p>
                  </td>
                </tr>

                <tr v-if="subtit == 2">
                  <td width="4%" class="bead-list" v-for="(item,index) in daxiaoMapListTemp">
                    <p v-for="itemsub in item.value">{{itemsub}}</p>
                  </td>
                </tr>

                <tr v-if="subtit == 3">
                  <td width="4%" class="bead-list" v-for="(item,index) in danshuangMapListTemp">
                    <p v-for="itemsub in item.value">{{itemsub}}</p>
                  </td>
                </tr>

                <tr v-if="subtit == 4">
                  <td width="4%" class="bead-list" v-for="(item,index) in zonghedaxiaoList">
                    <p v-for="itemsub in item.value">{{itemsub}}</p>
                  </td>
                </tr>

                <tr v-if="subtit == 5">
                  <td width="4%" class="bead-list" v-for="(item,index) in zonghedanshuangList">
                    <p v-for="itemsub in item.value">{{itemsub}}</p>
                  </td>
                </tr>

                <tr v-if="subtit == 6">
                  <td width="4%" class="bead-list" v-for="(item,index) in longhuheList">
                    <p v-for="itemsub in item.value">{{itemsub}}</p>
                  </td>
                </tr>

                <tr v-if="subtit == 7">
                  <td width="4%" class="bead-list" v-for="(item,index) in zongheweishudaxiaoList">
                    <p v-for="itemsub in item.value">{{itemsub}}</p>
                  </td>
                </tr>

                <tr v-if="subtit == 8">
                  <td width="4%" class="bead-list" v-for="(item,index) in longhuList">
                    <p v-for="itemsub in item.value">{{itemsub}}</p>
                  </td>
                </tr>

                <tr v-if="subtit == 9">
                  <td width="4%" class="bead-list" v-for="(item,index) in guanyijunhe">
                    <p v-for="itemsub in item.value">{{itemsub}}</p>
                  </td>
                </tr>

                <tr v-if="subtit == 10">
                  <td width="4%" class="bead-list" v-for="(item,index) in guanyajunhedaxiao">
                    <p v-for="itemsub in item.value">{{itemsub}}</p>
                  </td>
                </tr>

                <tr v-if="subtit == 11">
                  <td width="4%" class="bead-list" v-for="(item,index) in guanyejunhedanshuang">
                    <p v-for="itemsub in item.value">{{itemsub}}</p>
                  </td>
                </tr>

              </table>

              <table v-if="curBocaiTypeId == 8266">

                <tr v-if="subtit == 1">
                  <td width="4%" class="bead-list" v-for="(item,index) in zongheshu">
                    <p v-for="itemsub in item.value">{{itemsub}}</p>
                  </td>
                </tr>

                <tr v-if="subtit == 2">
                  <td width="4%" class="bead-list" v-for="(item,index) in zonghedaxiaoList">
                    <p v-for="itemsub in item.value">{{itemsub}}</p>
                  </td>
                </tr>

                <tr v-if="subtit == 3">
                  <td width="4%" class="bead-list" v-for="(item,index) in zonghedanshuangList">
                    <p v-for="itemsub in item.value">{{itemsub}}</p>
                  </td>
                </tr>

                <tr v-if="subtit == 4">
                  <td width="4%" class="bead-list" v-for="(item,index) in wuxing">
                    <p v-for="itemsub in item.value">{{itemsub}}</p>
                  </td>
                </tr>

                <tr v-if="subtit == 5">
                  <td width="4%" class="bead-list" v-for="(item,index) in qianhouhe">
                    <p v-for="itemsub in item.value">{{itemsub}}</p>
                  </td>
                </tr>

                <tr v-if="subtit == 6">
                  <td width="4%" class="bead-list" v-for="(item,index) in danshuanghe">
                    <p v-for="itemsub in item.value">{{itemsub}}</p>
                  </td>
                </tr>

              </table>
            </div>



          </div>
</template>


<script>
	export default {
		props: {
      curBocaiTypeId: {
        type: String
      }
		},
		data() {
			return {
        subtitLabel: '第一球',
        subtitLabel2: '冠军',
        subtit: 1,
        counts: [],
        countsList: [],
        numMapList: [],
        numMapListTemp: [],
        danshuangMapList: [],
        danshuangMapListTemp: [],
        daxiaoMapList: [],
        daxiaoMapListTemp: [],
        zonghedaxiaoList: [],
        zonghedanshuangList: [],
        longhuheList: [],
        zongheweishudaxiaoList: [],
        longhuList: [],

        zongheshu: [],
        wuxing: [],
        qianhouhe: [],
        danshuanghe: [],

        guanyijunhe: [],
        guanyajunhedaxiao: [],
        guanyejunhedanshuang: []

			}
		},
    components: {
		},
		created() {
      this.gettongji(this.curBocaiTypeId);
    },
    computed:{
    },
    mounted(){
    },
		methods: {
      async gettongji(bocaiId) {
        let that = this;
            NProgress.start();
            await that.$get(`${window.url}/api/tongji?bocaiTypeId=`+bocaiId).then((res) => {
              that.$handelResponse(res, (result) => {
                NProgress.done();
                if(result.code===200){

                  if(result.data.counts) {
                    this.counts = result.data.counts;

                    this.countsList = this.counts[0];
                  }
                  

                  for(let x in result.data.numMap) {
                    let data = result.data.numMap[x].split(","); 

                    let numMapTemp = [];
                    let temp = '';
                    let nn = 1;
                    for(let n in data) {
                      let obj = {};
                      if(temp != data[n]) {
                        obj.type = 1;
                        obj.value = [];
                        obj.value.push(data[n]);
                        numMapTemp.push(obj);
                      } else {
                        if(numMapTemp[n*1-nn]) {
                          numMapTemp[n*1-nn].type = 2;
                          numMapTemp[n*1-nn].value.push(data[n]);
                          nn = nn++;
                        }
                      }
                      temp = data[n];
                    }
                    this.numMapList.push(numMapTemp);
                  }

                  this.numMapListTemp = this.numMapList[0];

                  for(let x in result.data.danshuangMap) {
                    let data = result.data.danshuangMap[x].split(","); 

                    let numMapTemp = [];
                    let temp = '';
                    let nn = 1;
                    
                    for(let n in data) {
                      let obj = {};
                      if(temp != data[n]) {  
                        obj.type = 1;
                        obj.value = [];
                        obj.value.push(data[n]);
                        numMapTemp.push(obj);
                      } else {
                        let kk = n*1-nn;
                        if(numMapTemp[n*1-nn]) {
                          numMapTemp[n*1-nn].type = 2;
                          numMapTemp[n*1-nn].value.push(data[n]);
                          nn = nn*1+1;
                        }
                      }

                      temp = data[n];
                    }
                    this.danshuangMapList.push(numMapTemp);
                  }

                    this.danshuangMapListTemp = this.danshuangMapList[0];
              
                    for(let x in result.data.daxiaoMap) {
                      let data = result.data.daxiaoMap[x].split(","); 
                      let numMapTemp = [];
                      let temp = '';
                      let nn = 1;
                      for(let n in data) {
                        let obj = {};
                        if(temp != data[n]) {  
                          obj.type = 1;
                          obj.value = [];
                          obj.value.push(data[n]);
                          numMapTemp.push(obj);
                        } else {
                          let kk = n*1-nn;
                          if(numMapTemp[n*1-nn]) {
                            numMapTemp[n*1-nn].type = 2;
                            numMapTemp[n*1-nn].value.push(data[n]);
                            nn = nn*1+1;
                          }
                        }

                        temp = data[n];
                      }
                      this.daxiaoMapList.push(numMapTemp);
                    }
                    this.daxiaoMapListTemp = this.daxiaoMapList[0];
                  

                    if(result.data.zonghedaxiao) {
                      let data = result.data.zonghedaxiao.split(","); 
                      let temp = '';
                      let nn = 1;
                      for(let n in data) {
                        let obj = {};
                        if(temp != data[n]) {  
                          obj.type = 1;
                          obj.value = [];
                          obj.value.push(data[n]);
                          this.zonghedaxiaoList.push(obj);
                        } else {
                          let kk = n*1-nn;
                          if(this.zonghedaxiaoList[n*1-nn]) {
                            this.zonghedaxiaoList[n*1-nn].type = 2;
                            this.zonghedaxiaoList[n*1-nn].value.push(data[n]);
                            nn = nn*1+1;
                          }
                        }

                        temp = data[n];
                      }
                    }

                    
                    if(result.data.zonghedanshuang) {
                      let data2 = result.data.zonghedanshuang.split(","); 
                      let temp2 = '';
                      let nn2 = 1;
                      for(let n in data2) {
                        let obj = {};
                        if(temp2 != data2[n]) {  
                          obj.type = 1;
                          obj.value = [];
                          obj.value.push(data2[n]);
                          this.zonghedanshuangList.push(obj);
                        } else {
                          let kk = n*1-nn2;
                          if(this.zonghedanshuangList[n*1-nn2]) {
                            this.zonghedanshuangList[n*1-nn2].type = 2;
                            this.zonghedanshuangList[n*1-nn2].value.push(data2[n]);
                            nn2 = nn2*1+1;
                          }
                        }

                        temp2 = data2[n];
                      }
                    }
                    

                    if(result.data.longhuhe) {
                      let data3 = result.data.longhuhe.split(","); 
                      let temp3 = '';
                      let nn3 = 1;
                      for(let n in data3) {
                        let obj = {};
                        if(temp3 != data3[n]) {  
                          obj.type = 1;
                          obj.value = [];
                          obj.value.push(data3[n]);
                          this.longhuheList.push(obj);
                        } else {
                          let kk = n*1-nn3;
                          if(this.longhuheList[n*1-nn3]) {
                            this.longhuheList[n*1-nn3].type = 2;
                            this.longhuheList[n*1-nn3].value.push(data3[n]);
                            nn3 = nn3*1+1;
                          }
                        }

                        temp3 = data3[n];
                      }
                    }

                    if(result.data.zongheweishudaxiao) {
                      let data3 = result.data.zongheweishudaxiao.split(","); 
                      let temp3 = '';
                      let nn3 = 1;
                      for(let n in data3) {
                        let obj = {};
                        if(temp3 != data3[n]) {  
                          obj.type = 1;
                          obj.value = [];
                          obj.value.push(data3[n]);
                          this.zongheweishudaxiaoList.push(obj);
                        } else {
                          let kk = n*1-nn3;
                          if(this.zongheweishudaxiaoList[n*1-nn3]) {
                            this.zongheweishudaxiaoList[n*1-nn3].type = 2;
                            this.zongheweishudaxiaoList[n*1-nn3].value.push(data3[n]);
                            nn3 = nn3*1+1;
                          }
                        }

                        temp3 = data3[n];
                      }
                    }

                    if(result.data.longhu) {
                      let data3 = result.data.longhu.split(","); 
                      let temp3 = '';
                      let nn3 = 1;
                      for(let n in data3) {
                        let obj = {};
                        if(temp3 != data3[n]) {  
                          obj.type = 1;
                          obj.value = [];
                          obj.value.push(data3[n]);
                          this.longhuList.push(obj);
                        } else {
                          let kk = n*1-nn3;
                          if(this.longhuList[n*1-nn3]) {
                            this.longhuList[n*1-nn3].type = 2;
                            this.longhuList[n*1-nn3].value.push(data3[n]);
                            nn3 = nn3*1+1;
                          }
                        }

                        temp3 = data3[n];
                      }
                    }


                    if(result.data.zhongheshu) {

                      let data3 = result.data.zhongheshu.split(","); 
                      let temp3 = '';
                      let nn3 = 1;
                      for(let n in data3) {
                        let obj = {};
                        if(temp3 != data3[n]) {  
                          obj.type = 1;
                          obj.value = [];
                          obj.value.push(data3[n]);
                          this.zongheshu.push(obj);
                        } else {
                          let kk = n*1-nn3;
                          if(this.zongheshu[n*1-nn3]) {
                            this.zongheshu[n*1-nn3].type = 2;
                            this.zongheshu[n*1-nn3].value.push(data3[n]);
                            nn3 = nn3*1+1;
                          }
                        }

                        temp3 = data3[n];
                      }

                      console.log('zongheshu',this.zongheshu);
                    }

                    if(result.data.wuxing) {

                      let data3 = result.data.wuxing.split(","); 
                      let temp3 = '';
                      let nn3 = 1;
                      for(let n in data3) {
                        let obj = {};
                        if(temp3 != data3[n]) {  
                          obj.type = 1;
                          obj.value = [];
                          obj.value.push(data3[n]);
                          this.wuxing.push(obj);
                        } else {
                          let kk = n*1-nn3;
                          if(this.wuxing[n*1-nn3]) {
                            this.wuxing[n*1-nn3].type = 2;
                            this.wuxing[n*1-nn3].value.push(data3[n]);
                            nn3 = nn3*1+1;
                          }
                        }

                        temp3 = data3[n];
                      }

                      console.log('wuxing',this.wuxing);
                    }

                    if(result.data.qianhouhe) {

                      let data3 = result.data.qianhouhe.split(","); 
                      let temp3 = '';
                      let nn3 = 1;
                      for(let n in data3) {
                        let obj = {};
                        if(temp3 != data3[n]) {  
                          obj.type = 1;
                          obj.value = [];
                          obj.value.push(data3[n]);
                          this.qianhouhe.push(obj);
                        } else {
                          let kk = n*1-nn3;
                          if(this.qianhouhe[n*1-nn3]) {
                            this.qianhouhe[n*1-nn3].type = 2;
                            this.qianhouhe[n*1-nn3].value.push(data3[n]);
                            nn3 = nn3*1+1;
                          }
                        }

                        temp3 = data3[n];
                      }

                      console.log('qianhouhe',this.qianhouhe);
                    }

                    if(result.data.danshuanghe) {

                      let data3 = result.data.danshuanghe.split(","); 
                      let temp3 = '';
                      let nn3 = 1;
                      for(let n in data3) {
                        let obj = {};
                        if(temp3 != data3[n]) {  
                          obj.type = 1;
                          obj.value = [];
                          obj.value.push(data3[n]);
                          this.danshuanghe.push(obj);
                        } else {
                          let kk = n*1-nn3;
                          if(this.danshuanghe[n*1-nn3]) {
                            this.danshuanghe[n*1-nn3].type = 2;
                            this.danshuanghe[n*1-nn3].value.push(data3[n]);
                            nn3 = nn3*1+1;
                          }
                        }

                        temp3 = data3[n];
                      }

                      console.log('danshuanghe',this.danshuanghe);
                    }

                    if(result.data.guanyijunhe) {

                      let data3 = result.data.guanyijunhe.split(","); 
                      let temp3 = '';
                      let nn3 = 1;
                      for(let n in data3) {
                        let obj = {};
                        if(temp3 != data3[n]) {  
                          obj.type = 1;
                          obj.value = [];
                          obj.value.push(data3[n]);
                          this.guanyijunhe.push(obj);
                        } else {
                          let kk = n*1-nn3;
                          if(this.guanyijunhe[n*1-nn3]) {
                            this.guanyijunhe[n*1-nn3].type = 2;
                            this.guanyijunhe[n*1-nn3].value.push(data3[n]);
                            nn3 = nn3*1+1;
                          }
                        }

                        temp3 = data3[n];
                      }

                      console.log('guanyijunhe',this.guanyijunhe);
                    }

                    if(result.data.guanyajunhedaxiao) {

                      let data3 = result.data.guanyajunhedaxiao.split(","); 
                      let temp3 = '';
                      let nn3 = 1;
                      for(let n in data3) {
                        let obj = {};
                        if(temp3 != data3[n]) {  
                          obj.type = 1;
                          obj.value = [];
                          obj.value.push(data3[n]);
                          this.guanyajunhedaxiao.push(obj);
                        } else {
                          let kk = n*1-nn3;
                          if(this.guanyajunhedaxiao[n*1-nn3]) {
                            this.guanyajunhedaxiao[n*1-nn3].type = 2;
                            this.guanyajunhedaxiao[n*1-nn3].value.push(data3[n]);
                            nn3 = nn3*1+1;
                          }
                        }

                        temp3 = data3[n];
                      }

                      console.log('guanyajunhedaxiao',this.guanyajunhedaxiao);
                    }

                    if(result.data.guanyejunhedanshuang) {

                      let data3 = result.data.guanyejunhedanshuang.split(","); 
                      let temp3 = '';
                      let nn3 = 1;
                      for(let n in data3) {
                        let obj = {};
                        if(temp3 != data3[n]) {  
                          obj.type = 1;
                          obj.value = [];
                          obj.value.push(data3[n]);
                          this.guanyejunhedanshuang.push(obj);
                        } else {
                          let kk = n*1-nn3;
                          if(this.guanyejunhedanshuang[n*1-nn3]) {
                            this.guanyejunhedanshuang[n*1-nn3].type = 2;
                            this.guanyejunhedanshuang[n*1-nn3].value.push(data3[n]);
                            nn3 = nn3*1+1;
                          }
                        }

                        temp3 = data3[n];
                      }

                      console.log('guanyejunhedanshuang',this.guanyejunhedanshuang);
                    }


                }
              })
            });
      },
        getsubtit(num) {
          this.subtit = num;
          $('.getsubtit'+num).addClass('active').siblings().removeClass('active');
        },
        getqiu(num,tit) {
          this.numMapListTemp = this.numMapList[num*1-1];
          this.daxiaoMapListTemp = this.daxiaoMapList[num*1-1];
          this.danshuangMapListTemp = this.danshuangMapList[num*1-1];
          this.subtitLabel = tit;
          this.subtitLabel2 = tit;
          this.countsList = this.counts[num*1-1];
          $('.getqiu'+num).addClass('active').siblings().removeClass('active');
        }

      }

	}

</script>

<style scoped>
.betQuick {
    text-align: center;
    margin-bottom: 10px;
    margin-top: 14px;
    position: relative;
    height: 67px;
}

.betQuick div {
  display: inline-block;
  float: left;
}

.betRTop div {
  font-size: 16px;
}

.betRTop {
  margin-left: 20px; 
}

.beishu {
  width: 400px;
  height: 67px;
}

.betRight {
  width: 380px;
  margin-left: 50px;
}

.betRBottom label {
  color: #fff;
  float: left;
  padding: 5px 20px 0px 20px;
}

.betRBottom {
  margin-top: 10px;
}

.beishuBtn {
    width: 54px;
    height: 52px;
    margin: 0px 2px !important;
    border-radius: 50px;
    color: #1b1b1b;
    font-family: Microsoft YaHei;
    font-size: 10px;
    font-weight: 700;
    cursor: pointer;
}

.beishuBtn a {
  height: 52px;
  line-height: 52px;
  font-weight: bold;
}

.beishuBtn.beishuBtn10 {
    background: url(../../../../../static/img/cm1.png) bottom no-repeat transparent;
    background-size: contain;
}
.beishuBtn.beishuBtn50 {
  background: url(../../../../../static/img/cm2.png) bottom no-repeat transparent;
    background-size: contain;
}
.beishuBtn.beishuBtn100 {
  background: url(../../../../../static/img/cm3.png) bottom no-repeat transparent;
    background-size: contain;
}
.beishuBtn.beishuBtn500 {
  background: url(../../../../../static/img/cm4.png) bottom no-repeat transparent;
    background-size: contain;
}
.beishuBtn.beishuBtn1000 {
  background: url(../../../../../static/img/cm5.png) bottom no-repeat transparent;
    background-size: contain;
}
.beishuBtn.beishuBtn5000 {
  background: url(../../../../../static/img/cm6.png) bottom no-repeat transparent;
    background-size: contain;
}

.beishuBtn:hover {
  color: #ff9800;
}

.popup-body {
    overflow-y: auto;
    margin-left: 0px !important;
}

.default-list {
    padding: 8px 10px;
    margin-left: 0px !important;
}

.default-list table {
    margin-top: 5px;
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
}

.default-list table thead {
    background-color: #fcefc2;
    font-weight: 700;
    color: #261238;
}
.default-list table td, .default-list table th {
    text-align: center;
    line-height: 30px;
    border: 1px solid #dcdfe6;
    padding: 0 6px;
    position: relative;
}
.default-list table td p, .default-list table th p {
    line-height: 18px;
}
.odds-font {
    color: #d63e35;
    font-weight: 700;
}
.betValue {
    height: 16px;
    width: 60px;
    padding: 0 3px;
    line-height: 16px;
}
button.btn-delete {
    margin-left: 8px;
    width: 50px;
    height: 24px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: #fff;
    outline: none;
}
button.btn-delete {
    line-height: 16px;
    background: #d63e35;
}
.default-list table tr.tab-footer {
    background-color: #fcefc2;
    font-weight: 700;
    color: #261238;
}

.beishuBtn.addPayChouMa a{
  color: #ff9800;
  font-size: 18px;
}



</style>

<style lang="less">

.betQuick {
  .el-input {
    width: 120px;
    margin-right: 20px;
  }

  .el-radio.is-bordered.is-checked {
    background-color: #805933;
  }

  .betRTop.onlybet {
    margin-top: 20px;
  }

  .el-dialog__header {
    padding: 20px 20px 10px;
    background-color: #80664b;
    border-radius: 5px 5px 0 0;
  }
  .el-dialog.el-dialog--center {
    width: 500px;
    color: #450400 !important;
    background-color: #fcfcfa;
    box-shadow: 0 2px 8px rgba(0,0,0,.33);
    font-family: Helvetica,Arial,sans-serif;
    border-radius: 5px;
  }
  .el-dialog--center .el-dialog__body {
    text-align: center;
    padding: 0px;
  }
  .betRTop button {
    height: 28px;
  }

  .el-button--primary.is-plain {
    color: #805933;
  }
}

</style>
