<template>
  <div class="app-container">
    <el-card>
      <el-form :inline="true">
        <el-form-item>
          <label style="margin-right: 5px">分类名称：</label>
          <el-input
            v-model="categoryQuery.categoryName"
            placeholder="请输入分类名称"
            style="width: 70%"
            clearable
            @clear="getList"
            @keyup.enter.native="getList()"/>
        </el-form-item>
        <el-button @click="getList()">查询</el-button>
        <el-button type="primary" style="float: right" @click="add()">+添加图书分类</el-button>
      </el-form>
      <el-table :data="list" border fit highlight-current-row style="width: 100%">
        <el-table-column label="序号" width="70" align="center">
          <template slot-scope="scope">
            {{ (page - 1) * pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="分类名称" align="center" />
        <el-table-column prop="sort" label="排序" align="center" />
        <el-table-column prop="createTime" label="创建时间" align="center">
          <template slot-scope="scope">
            {{scope.row.createTime | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" align="center">
          <template slot-scope="scope">
            {{scope.row.updateTime | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit(scope.row)">修改</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="remove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination v-if="total > 10"
                     :page-sizes="[5, 10, 15, 20]"
                     :current-page="page"
                     :page-size="pageSize"
                     :total="total"
                     style="padding: 30px 0; text-align: center"
                     background
                     layout="total, sizes, prev, pager, next, jumper"
                     @current-change="getList"
                     @size-change="handleSizeChange"
      />
      <el-dialog :title="category.title"
                 :visible.sync="dialogVisible"
                 width="30%">
        <el-form :model="category" label-width="100px">
          <el-form-item label="分类名称：" prop="name">
            <el-input v-model="category.name" placeholder="请输入分类名称" maxlength="20" />
          </el-form-item>
          <el-form-item label="排序：" prop="sort">
            <el-input v-model="category.sort" placeholder="请输入排序" maxlength="20" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import category from '@/api/category/category'

export default {
  name: 'Category',
  data() {
    return {
      list: null,
      page: 1,
      pageSize: 10,
      total: 0,
      dialogVisible: false,
      categoryQuery:{},
      category: {
        title: '添加图书分类',
        categoryId: '',
        name: '',
        sort: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(page = 1){
      this.page = page
      category.getCategoryPage(this.page,this.pageSize,this.categoryQuery)
        .then(res => {
          this.list = res.data.records
          this.total = res.data.total
        })
        .catch(error => {
          this.$message.error('请求出错了：' + error.message)
        })
    },
    //删除分类
    remove(id){
      this.$confirm('此操作将永久删除分类信息，是否继续','提示',{
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        category.deleteCategory(id)
          .then(res => {
            //提示信息
            this.$message({
              type: 'success',
              message: '删除成功！'
            });
            //回到列表页面
            this.getList()
          })
      })
    },
    //提交表单
    submitForm(){
      if(this.action === 'add'){
        category.addCategory(this.category)
          .then(res => {
            this.$message({
              type: 'success',
              message: '添加分类成功'
            });
            this.reset()
            this.dialogVisible = false
            this.getList()
          })
        }else{
        category.editCategory(this.category)
          .then(res => {
            this.$message({
              type: 'success',
              message: '修改分类成功'
            });
            this.reset()
            this.dialogVisible = false
            this.getList()
          })
      }
    },
    //清空表单
    reset(){
      this.category = {}
    },
    //添加分类
    add(){
      this.category.title = "添加图书分类"
      this.dialogVisible = true
      this.action = 'add'
      this.category.name = ''
      this.category.sort = ''
    },
    //修改分类
    edit(data){
      this.category.title = "修改图书分类"
      this.dialogVisible = true
      this.action = 'edit'
      this.category.name = data.name
      this.category.sort = data.sort
      this.category.id = data.id
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
     margin: 30px;
    .container {
      background: #fff;
      position: relative;
      z-index: 1;
      padding: 30px 28px;
      border-radius: 4px;
    }
  }
}
</style>
