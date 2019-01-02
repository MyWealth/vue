<template>
<div class="div">
 <el-form label-position="top" label-width="80px" class="form">
  <h1>用户登录</h1>
  <el-form-item label="用户名">
    <el-input v-model="formdata.username"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="formdata.password"></el-input>
  </el-form-item>
  <el-button type="primary" class="but" @click="Login()">登录</el-button>
</el-form>
</div>
</template>

<script>
export default {
  data(){
    return{
      formdata:{
        password:"",
        username:""
      }
     
    }
  },
  methods: {
    Login(){
      this.$http.post("login", this.formdata)
      .then((response) => {
        console.log(response)
        const {data:{data,meta:{msg,status}}} = response
        if(status === 200){
          console.log(data.token)
          localStorage.setItem("token",data.token)
          this.$message({
          message:msg,
           type: "success"
        });
        this.$router.push({
          name:"home"
        })
        }else{
          this.$message({
          message:msg,
           type: "error"
        })
        }
      })
      .catch((error) => {
      })
    }
  },
}
</script>

<style>
.div{
    height: 100%;
    background-color: #202020;
}.but{
    width: 100%;
}
.form{
  width: 500px;
     background-color: beige;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 10px;
    padding: 50px;
}
</style>
