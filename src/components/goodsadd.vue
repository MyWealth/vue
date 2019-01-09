<template>
  <div>
    <el-card class="box-card">
      <my-bread data="活动管理" data-2="活动列表"></my-bread>
      <el-steps :active="active-0" align-center class="active">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
      </el-steps>
      <el-form :model="from" class="from">
        <el-tabs tab-position="left" v-model="active" class="list" @tab-click="changeTab">
          <el-tab-pane name="1" label="基本信息">
            <el-form-item label="商品名称">
              <el-input v-model="from.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input v-model="from.price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量">
              <el-input v-model="from.weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input v-model="from.quantity"></el-input>
            </el-form-item>
            {{selectedOptions}}
            <div class="block">
              <el-cascader
                clearable
                :props="defaultprop"
                :options="options"
                v-model="selectedOptions"
              ></el-cascader>
            </div>
          </el-tab-pane>
          <el-tab-pane name="2" label="商品参数">
            <el-form-item :label="item.attr_name" v-for="(item, index) in arrDy" :key="index">
              <el-row>
                <el-col>
                  <el-checkbox-group v-model="item.attr_vals">
                    <el-checkbox
                      :label="item2"
                      border
                      v-for="(item2, index) in item.attr_vals"
                      :key="index"
                    ></el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-row>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane name="3" label="商品属性">
            <el-form-item
              :label="item3.attr_name"
              v-for="(item3, index2) in arrstatic"
              :key="index2"
            >
              <el-input v-model="item3.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane name="4" label="商品图片">
            <el-upload
              action="http://localhost:8888/api/private/v1/upload"
              :headers="headers"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              list-type="picture"
             
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane name="5" label="商品内容">
            <el-button @click="addgoods">添加商品</el-button>
              <quill-editor v-model="from.goods_introduce"></quill-editor>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>
<script>
  import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      from: {
        //商品名称
        goods_name: "",
        //商品价格
        price: "",
        //商品重量
        weight: "",
        //商品数量
        quantity: "",
        //介绍
        goods_introduce:"",
//上传的图片临时路径（对象）
        pics:{},
//商品的参数（数组）
        attrs:[],
      },
      active: "",
      options: [],
      //[1,3,6] 默认选项
      selectedOptions: [],
      //绑定数据的key名
      defaultprop: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      //动态参数数据
      arrDy: [],
      //静态参数
      arrstatic: [],
      //是否选中
      // checkList:["aa"]
      headers:{
        Authorization:localStorage.getItem('token')
      }
    };
  },
  created() {
    this.commodity();
  },
  methods: {
    async addgoods(){
      await this.$http.get(`goods`,this.from)
    },
    async commodity() {
      const res = await this.$http.get(`categories?type=3`);
      const {
        data: { data }
      } = res;
      this.options = data;
    },
    async changeTab() {
      if (this.active === "2") {
        if (this.selectedOptions.length === 3) {
          const res = await this.$http.get(
            `categories/${this.selectedOptions[2]}/attributes?sel=many`
          );
          console.log(res);
          const {
            data: { data }
          } = res;
          this.arrDy = data;
          this.arrDy.forEach(element => {
            element.attr_vals = element.attr_vals.split(",");
          });
        } else {
          this.$message.warning("请选择三级分类");
        }
      }

      if (this.active === "3") {
        if (this.selectedOptions.length === 3) {
          const res2 = await this.$http.get(
            `categories/${this.selectedOptions[2]}/attributes?sel=only`
          );
          const {
            data: { data }
          } = res2;
          this.arrstatic = data;
          console.log(res2);
        } else {
          this.$message.warning("请选择三级分类");
        }
      }
    },
    handleRemove(file){
      console.log(file)
    },
    handleSuccess(response){
     this.from.pics = response.data
     console.log(this.from.pics)
      console.log(response)
    }
  }
};
</script>

<style>
.box-card {
  height: 800px;
}
.active {
  margin-top: 20px;
}
.list {
  margin-top: 10px;
}
.from {
  height: 400px;
  overflow: auto;
}
</style>
