<template>
  <el-card class="box-card">
    <div>
      <my-bread data="活动管理" data-2="活动列表"></my-bread>
      <el-row>
        <el-col>
          <el-button class="but">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="expand" width="100">
          <template slot-scope="scope2">
            <span v-if="scope2.row.children.length ===0">无数据</span>
            <el-row v-for="(item, index) in scope2.row.children" :key="index" class="sss">
              <el-col :span="4">
                <el-tag
                  @close="removeRight(scope2.row,item.id)"
                  closable
                  type="success"
                >{{item.authName}}</el-tag>
                <i class="el-icon-arrow-right"></i>
              </el-col>
              <el-col :span="20">
                <el-row v-for="(item2, index) in item.children" :key="index">
                  <el-col :span="4">
                    <el-tag
                      @close="removeRight(scope2.row,item2.id)"
                      closable
                      type="warning"
                    >{{item2.authName}}</el-tag>
                    <i class="el-icon-arrow-right"></i>
                  </el-col>
                  <el-col :span="20">
                    <el-tag
                      closable
                      type="danger"
                      class="tag"
                      @close="removeRight(scope2.row,item3.id)"
                      v-for="(item3, index) in item2.children"
                      :key="index"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#" width="100"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="150"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="200"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <el-button circle icon="el-icon-check" type="success" @click="open2(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <span>
          <el-tree
            ref="tree"
            :data="data2"
            show-checkbox
            node-key="id"
            :default-expanded-keys="expanded"
            :default-checked-keys="checked"
            :props="defaultProps"
          ></el-tree>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addAuthority">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
       data2: [],
       expanded:[],
       checked:[],
        defaultProps: {
          label: 'authName',
          children: 'children'
        },
        userid:""
    };
  },
  created() {
    this.reqdata();
  },
  methods: {
    async reqdata() {
      const res = await this.$http.get("roles");
      this.tableData = res.data.data;
    },
    async removeRight(scope, rightId) {
    
      const res = await this.$http.delete(
        `roles/${scope.id}/rights/${rightId}`
      );
      const {
        data: { data, meta }
      } = res;
      console.log(res);
      if (meta.status === 200) {
        this.$message.success(meta.msg);
      } else {
        this.$message.warning(meta.msg);
      }
      this.reqdata();
    },
    async open2(scope) {
      this.dialogVisible = true;
      this.userid = scope.id
      const res = await this.$http.get('rights/tree');
      this.data2 = res.data.data;


      this.data2.forEach(element => {
        this.expanded.push(element.id);
        element.children.forEach(item =>{
            this.expanded.push(item.id);
        })
      });
      console.log(scope)
      scope.children.forEach(elemen => {
      //  this.checked.push(elemen.id)
        elemen.children.forEach(elemen1 =>{
          // this.checked.push(elemen1.id)
          elemen1.children.forEach(elemen2 =>{
          this.checked.push(elemen2.id)
        })
        })
      });
      
    },
    async addAuthority(){
        
       const arr2 = this.$refs.tree.getCheckedKeys()
        const arr3 = this.$refs.tree.getHalfCheckedKeys()
        const arr = [...arr2,...arr3]
        console.log(arr);
      const res = await this.$http.post(`roles/${this.userid}/rights`,{
        rids:arr.join(',')
      })
      const {data:{data,meta}} = res;
      console.log(res)
      if(meta.status === 200){
        this.$message.success(meta.msg)
      }
      this.dialogVisible = false
      this.reqdata()
    }
  }
};
</script>

<style>
.but {
  margin-top: 20px;
}
.sss {
  margin-top: 10px;
}
.tag {
  margin-left: 2px;
  margin-bottom: 5px;
}
</style>
