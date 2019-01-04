<template>
  <el-card class="card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 15px;">
      <el-input
        @clear="getalluset"
        clearable
        placeholder="请输入内容"
        v-model="query"
        class="input-with-select"
      >
        <el-button slot="append" @click="getall" icon="el-icon-search"></el-button>
      </el-input>
      <el-button @click="dialogFormVisible = !dialogFormVisible" type="primary">添加用户</el-button>
    </div>
    <template>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="#" width="80"></el-table-column>
        <el-table-column prop="username" label="姓名" width="100"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话" width="100"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="100"></el-table-column>
        <el-table-column label="用户状态" width="160">
          <template slot-scope="scope" @click="operateState">
            <el-switch
              v-model="scope.row.mg_state"
              @change="operateState(scope.row)"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop label="操作" width="180">
          <template slot-scope="scope">
            <el-row>
              <el-button @click="compile(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
              <el-button @click="allocation(scope.row)" type="success" icon="el-icon-check" circle></el-button>
              <el-button @click="del(scope.row)" type="danger" icon="el-icon-delete" circle></el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 添加弹窗 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="adduser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹窗 -->
    <el-dialog title="编辑用户" :visible.sync="dialogForm">
      <el-form :model="form2">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input disabled v-model="form2.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮件" :label-width="formLabelWidth">
          <el-input v-model="form2.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form2.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogForm = false">取 消</el-button>
        <el-button type="primary" @click="submitAll">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormRole">
      <el-form>
        <el-form-item label="用户名" :label-width="formLabelWidth">{{username}}</el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="region" placeholder="请选择活动区域">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option
              v-for="(item, index) in role"
              :key="index"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormRole = false">取 消</el-button>
        <el-button type="primary" @click="ModifyRole">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>


<script>
export default {
  data() {
    return {
      tableData: [],
      query: "",
      pagenum: 1,
      pagesize: 2,
      total: -1,
      dialogFormVisible: false,
      dialogForm: false,
      dialogFormRole: false,
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      form2: {
        username: "",
        email: "",
        mobile: ""
      },
      username: "",
      region: -1,
      formLabelWidth: "80px",
      usersid:"",
      role: []
    };
  },
  created() {
    this.getTableDate();
  },
  methods: {
    getTableDate() {
      this.$http.defaults.headers.common[
        "Authorization"
      ] = localStorage.getItem("token");
      this.$http
        .get(`users`, {
          params: {
            query: this.query,
            pagenum: this.pagenum,
            pagesize: this.pagesize
          }
        })
        .then(response => {
          const {
            data: {
              data: { total, users },
              meta: { msg, status }
            }
          } = response;
          if (status === 200) {
            this.tableData = users;
            this.total = total;
            this.$message.success(msg);
            this.form = {};
          }
        })
        .catch(function(error) {});
    },
    handleSizeChange(val) {
      this.pagenum = 1;
      this.pagesize = val;
      this.getTableDate();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getTableDate();
    },
    //用户查询
    getall() {
      this.pagenum = 1;
      this.getTableDate();
    },
    getalluset() {
      this.getTableDate();
    },
    //添加用户名
    adduser() {
      this.dialogFormVisible = false;
      this.$http
        .post("users", this.form)
        .then(response => {
          console.log(response);
          const {
            data: {
              data,
              meta: { msg, status }
            }
          } = response;
          if (status === 201) {
            this.$message.success(msg);
            this.getTableDate();
          } else {
            this.$message.warning(msg);
          }
        })
        .catch(error => {});
    },
    del(delscope) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .delete(`users/${delscope.id}`)
            .then(response => {
              this.getTableDate();
            })
            .catch(function(error) {});
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async compile(comscope) {
      this.dialogForm = true;
      const a = await this.$http.get(`users/${comscope.id}`);
      const {
        data: {
          data,
          meta: { msg, status }
        }
      } = a;
      if (status === 200) {
        this.form2 = data;
      }
    },
    async submitAll() {
      this.dialogForm = false;
      const res = await this.$http.put(`users/${this.form2.id}`, this.form2);
      const {
        data: {
          meta: { msg, status }
        }
      } = res;
      if (status === 200) {
        this.$message.success(msg);
        this.getTableDate();
      } else {
        this.$message.success(msg);
      }
    },
    //修改状态
    async operateState(scope) {
      const res = await this.$http.put(
        `users/${scope.id}/state/${scope.mg_state}`
      );
      console.log(res);
      const {
        data: {
          meta: { msg, status }
        }
      } = res;
      if (status === 200) {
        this.$message.success(msg);
      } else {
        this.$message.success(msg);
      }
    },
    //分配角色
    async allocation(scope) {
      this.dialogFormRole = true;
      this.username = scope.username;
      this.usersid = scope.id
      const res = await this.$http.get(`roles`);
      const {
        data: {
          data,
          meta: { msg, status }
        }
      } = res;
      if (status === 200) {
        this.role = data;
        this.$message.success(msg);
      } else {
        this.$message.success(msg);
      }
      //角色id
      const res2 = await this.$http.get(`users/${scope.id}`);
     if(res2.data.meta.status == 200){
       this.region = res2.data.data.rid
     }
    },
    //修改角色
    async ModifyRole(){
      this.dialogFormRole=false
     const res = await this.$http.put(`users/${this.usersid}/role`,{
      rid:this.region
     });
    }
  }
};
</script>

<style>
.card {
  height: 800px;
}
.input-with-select {
  width: 350px;
}
</style>
