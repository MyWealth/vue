<template>
  <el-container>
    <el-header class="head">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <img src="../assets/logo.png" alt>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <span>电商后台管理系统</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple left">
            <a href="#" @click="clear()">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="nuv" width="200px">
        <div>
          <el-menu  router default-active="2">
            <el-submenu :index="item.order+''" v-for="(item, index) in arr" :key="index">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item-group v-for="(item1, index1) in item.children" :key="index1">
                <el-menu-item :index="item1.path">{{item1.authName}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="roles" class="el-icon-success">选项1</el-menu-item>
                <el-menu-item index="rights" class="el-icon-success">选项2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1" class="el-icon-success">选项1</el-menu-item>
                <el-menu-item index="3-2" class="el-icon-success">选项2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1" class="el-icon-success">选项1</el-menu-item>
                <el-menu-item index="4-2" class="el-icon-success">选项2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>数据统计</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="5-1" class="el-icon-success">选项1</el-menu-item>
                <el-menu-item index="5-2" class="el-icon-success">选项2</el-menu-item>
              </el-menu-item-group>
            </el-submenu> -->
          </el-menu>
        </div>
      </el-aside>
      <el-main class="body">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data(){
    return{
      arr:[]
    }
  },
  created() {
     this.beforeCreate
     this.acquirelist()
  },
  methods: {
    //退出
    clear(){
      localStorage.clear();
      this.$router.push({
        name:"/"
      })
      this.$message.success("退出成功");
    },
    async acquirelist(){
    const res = await this.$http.get(`menus`);
    const{data:{data}} = res
    this.arr = data;
    }
  },
  //预测
  // beforeCreate(){
  //   if(!localStorage.getItem("token")){
  //     console.log(this)
  //      this.$message.warning("请先进行登陆");
  //       this.$router.push({
  //         name:"/"
  //       })
  //   }
  // }
};
</script>
  
<style>
.head {
  background-color: #b1becf;
}
.nuv {
    height: 100%;
}
.body {
  height:100%;
}
.bg-purple-light {
  font-size: 25px;
  font-weight: 700;
  color: white;
  line-height: 60px;
  text-align: center;
}
.left {
  float: right;
  line-height: 60px;
}
</style>
