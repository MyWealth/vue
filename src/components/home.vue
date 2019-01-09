<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <img src="@/assets/logo.png" alt="图片无法显示">
          </div>
        </el-col>
        <el-col :span="19" class="middle">
          <h2>电商后台管理系统</h2>
        </el-col>
        <el-col :span="1" class="loginout">
          <a href="#" @click.prevent="handleLoginout()">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <el-menu router unique-opened default-active="2">
          <el-submenu :index="''+item1.order" v-for="(item1,i) in menus" :key="item1.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </template>
            <el-menu-item :index="item2.path" v-for="(item2,i) in item1.children" :key="item2.id">
              <i class="el-icon-success"></i>
              {{item2.authName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // 在home渲染之前 -> 判断是否登录
  // 在路由配置生效之前 -> 路由拦截-> 判断是否登录

  beforeCreate() {},
  created() {
    this.getMenus();
  },
  data() {
    return {
      menus: []
    };
  },
  methods: {
    // 获取导航数据
    async getMenus() {
      const res = await this.$http.get(`menus`);
      // console.log(res);
      this.menus = res.data.data;
    },

    // 退出
    handleLoginout() {
      // 1. 清除token
      localStorage.clear();
      // 2. 回到登录组件
      this.$router.push({
        name: "login"
      });

      // 3. 提示
      this.$message.success("退出成功");
    }
  }
};
</script>

<style>
.container {
  height: 100%;
  /* background-color: yellow; */
}
.container .header {
  background-color: #b3c0d1;
}

.middle {
  line-height: 60px;
  color: white;
  text-align: center;
}
.loginout a {
  line-height: 60px;
  text-decoration: none;
}
</style>
