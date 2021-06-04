<template>
  <div class="product">
    <!-- 按钮 -->
    <div class="btns">
      <el-button size="small" type="primary" @click="toAdd">新增</el-button>
    </div>
    <!-- /按钮 -->
    <!-- 表格 -->
    <el-table size="small" :data="products">
      <el-table-column label="编号" type="index" align="center" :index="1"></el-table-column>
      <el-table-column label="图片" width="80">
        <template v-slot="scope">
          <img style="width:50px; height:50px; border-radius:3px" :src="'http://121.199.29.84:8888/'+scope.row.photo" alt="">
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="name" width="120"></el-table-column>
      <el-table-column label="单价" prop="price" width="60"></el-table-column>
      <el-table-column label="所属分类" prop="category.name" width="120"></el-table-column>
      <el-table-column label="介绍" prop="introduce"></el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template v-slot="scope">
          <el-button type="danger" size="mini" @click="del(scope.row)"> 删除</el-button>
          <el-button type="primary" size="mini" @click="edit(scope.row)"> 修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- /表格 -->
    <!-- 模态框 -->
    <el-dialog title="录入产品信息" :visible.sync="visible" width="50%" >
      {{form}}
      <el-form label-width="80px">
        <el-form-item label="产品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="所属栏目">
          <!-- <el-select v-model="form.categoryId">
            <el-option v-for="c in categories" :key="c.id" :label="c.name" :value="c.id"></el-option>
          </el-select> -->
          <el-cascader 
            v-model="form.categoryId" 
            :options="categories" 
            :props="{ label:'name',value:'id',checkStrictly: true,emitPath:false }" clearable>
          </el-cascader>

        </el-form-item>
        <el-form-item label="产品单价">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="产品介绍">
          <el-input v-model="form.introduce" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            class="upload-demo"
            :multiple="false"
            :limit="1"
            :on-success="uploadSuccessHandler"
            :on-error="uploadErrorHandler"
            action="http://121.199.29.84:5588/file/upload"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>


        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submit" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 模态框 -->
  </div>
</template>
<script>
import {get,post} from '@/utils/request'
export default {
  data(){
    return {
      name:'产品管理',
      visible:false,
      products:[],
      categories:[],
      form:{}
    }
  },
  created(){
    // 调用加载数据方法进行数据加载
    this.loadProducts();
    // 调用查询栏目的方法加载栏目数据
    this.loadCategories();
  },
  methods:{
    uploadSuccessHandler(response){
      //console.log(response);
      let photo = response.data.groupname+'/'+response.data.id;
      //this.form.photo = photo;
      this.form = {...this.form,photo}
    },
    uploadErrorHandler(error){
      this.$message({type:'error',message:'上传失败'})
    },
    // 提交
    submit(){
      let url = "http://121.199.29.84:8090/product/saveOrUpdate";
      post(url,this.form).then((response)=>{
        // 提示
        this.$message({type:'success',message:response.message})
        // 关闭模态框
        this.visible = false;
        // 刷新数据
        this.loadProducts();
      })
    },
    toAdd(){
      // 重置form
      this.form = {}
      //打开模态框
      this.visible = true;
    },
    edit(row){
      //将当前行信息绑定
      this.form = row;
      // 打开模态框
      this.visible = true;
    },
    del(row){
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除
        let url = "http://121.199.29.84:8090/product/deleteById"
        get(url,{id:row.id}).then((response)=>{
          // 提示
          this.$message({type:'success',message:response.message})
          // 刷新数据
          this.loadProducts();
        })
      })
    },
    // 加载产品数据
    loadProducts(){
      let url = "http://121.199.29.84:8090/product/findAllWithCategory"
      get(url).then((response)=>{
        this.products = response.data;
      })
    },
    // 加载栏目数据
    loadCategories(){
      let url = "http://121.199.29.84:8090/category/findAllWithChild"
      get(url).then((response)=>{
        this.categories = response.data;
      })
    }
  }
}
</script>