<template>
  <div>
    <span>
      游戏类型:
      <el-select v-model="curBocaiId" @change="gotobocaiSet" placeholder="请选择" size="mini">
        <el-option v-for="item in bocaiMenu" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>

      <div class="btn-ground">
        <button
          class="tabBtn btn btn-blue mgr10 router-link-active"
          @click="$router.push({name:'youxishezhi'})"
        >基本设置</button>
        <button
          class="tabBtn btn btn-blue mgr10"
          @click="$router.push({name:'jiangxi11xuan5Base'})"
        >赔率设置</button>
        <button class="tabBtn btn btn-blue mgr10" @click="$router.push({name:'peilvchaset'})">赔率差设置</button>
        <button
          class="tabBtn btn btn-blue mgr10"
          @click="$router.push({name:'peilvfudongset'})"
        >赔率浮动设置</button>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    curBocaiTypeId: {
      type: Number,
      default: 1
    },
    bocaiMenu: {
      type: Array,
      default: []
    }
  },
  components: {},
  data() {
    return {
      t: null, //轮询
      resultTime: "30000",
      parms: {},
      curBocaiId: this.curBocaiTypeId
    };
  },
  created() {
      console.log('curBocaiTypeId',this.curBocaiTypeId);
  },
  computed: {},
  methods: {
    gotobocaiSet(data) {
      console.log("data", data);

      let path = "";

      switch (data) {
        case 1:
          path = "chongqinduboBase";
          break;
        case 8555:
          path = "luckyairshipBase";
          break;
        case 8806:
          path = "beijingpk10Base";
          break;
        case 8811:
          path = "shandong11xuan5Base";
          break;
        case 8374:
          path = "guangdong11xuan5Base";
          break;
        case 8813:
          path = "jiangxi11xuan5Base";
          break;
        case 8223:
          path = "pcdandanBase";
          break;
        case 8498:
          path = "jiangsukuaisanBase";
          break;
        case 8266:
          path = "beijingkuaile8Base";
          break;
        case 9057:
          path = "jisusaicheBase";
          break;
        case 8815:
          path = "jisuduboBase";
          break;
        case 8810:
          path = "anhuikuaisanBase";
          break;
      }

      this.$router.push({ name: path });
    }
  },
  mounted() {},
  updated() {}
};
</script>