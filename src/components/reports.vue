<template>
  <el-card class="box-card">
    <my-bread data="数据统计" data2="数据报表"></my-bread>

    <div id="main" style="width: 600px;height:400px;" class="table"></div>
  </el-card>
</template>

<script>
import echarts from "echarts"

export default {
  mounted() {
    this.dataechart();
  },
  methods: {
   async dataechart() {
    var myChart = echarts.init(document.getElementById('main'));
     const res = await this.$http.get(`reports/type/1`);
     const option1 = res.data.data
      const option = {
        title: {
          text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        }
      };
     const option3 = {...option,...option1}
      myChart.setOption(option3);
    },
  }
};

</script>

<style>
.box-card {
  height: 800px;
}
.table{
}
</style>
