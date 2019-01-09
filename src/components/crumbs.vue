<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{data}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{data2}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
    props:['data','data2']
};
</script>

<style>
</style>
