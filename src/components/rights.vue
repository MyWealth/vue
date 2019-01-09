<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-bread data="活动管理" data-2="活动列表"></my-bread>
    <!-- 表格 -->
    <el-table :data="tableData" class="tabla" stripe style="width: 100%" :v-loading="loading">
        <el-table-column  type="index" label="#" width="180"></el-table-column>
        <el-table-column prop="authName" label="权限名称" width="380"></el-table-column>
        <el-table-column prop="path" label="路径" width="380"></el-table-column>
        <el-table-column  label="层级" width="280">
            <template slot-scope="scope" >
                <span v-if="scope.row.level==='0'">一级</span>
                 <span v-if="scope.row.level==='1'">二级</span>
                <span v-if="scope.row.level ==='2'">三级</span>
            </template>
        </el-table-column>
    </el-table>
</el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      loading:true
    };
  },
created() {
    this.applyy()
},
  methods: {
     async applyy(){
        const res =  await this.$http.get(`rights/list`)
         this.tableData = res.data.data
      }
  },
}
</script>

<style>
.box-card {
  height: 800px;
}
.tabla{
    margin-top: 20px;
    height: 500px;
    overflow: auto;
}
</style>
