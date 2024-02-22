<template>
  <div class="app-container">
    <el-card>
      <el-form :inline="true">
        <el-form-item>
          <label style="margin-right: 5px">书名：</label>
          <el-input
            v-model="bookQuery.bookName"
            placeholder="请输入书名"
            style="width: 70%"
            clearable
            @clear="getList"
            @keyup.enter.native="getList()"/>
        </el-form-item>
        <el-form-item>
          <label style="margin-right: 5px">作者：</label>
          <el-input
            v-model="bookQuery.authorName"
            placeholder="请输入作者"
            style="width: 70%"
            clearable
            @clear="getList"
            @keyup.enter.native="getList()"/>
        </el-form-item>
        <el-form-item>
          <label style="margin-right: 5px">出版社：</label>
          <el-input
            v-model="bookQuery.publisherName"
            placeholder="请输入出版社"
            style="width: 70%"
            clearable
            @clear="getList"
            @keyup.enter.native="getList()"/>
        </el-form-item>
        <el-form-item>
          <label style="margin-right: 5px">类型：</label>
          <el-input
            v-model="bookQuery.categoryName"
            placeholder="请输入类型"
            style="width: 70%"
            clearable
            @clear="getList"
            @keyup.enter.native="getList()"/>
        </el-form-item>
        <el-button @click="getList()">查询</el-button>
        <el-button type="primary" style="float: right" @click="addBookHandle">+ 添加图书</el-button>
      </el-form>
      <el-table :data="list" border fit highlight-current-row >
        <el-table-column label="序号" type="index" width="70" align="center"/>
        <el-table-column prop="bookName" label="书名" align="center" />
        <el-table-column prop="authorName" label="作者" align="center" />
        <el-table-column prop="translator" label="译者" align="center" />
        <el-table-column prop="publisherName" label="出版社" align="center" />
        <el-table-column prop="date" label="出版时间" align="center" />
        <el-table-column prop="categoryName" label="类型" align="center" />
        <el-table-column prop="price" label="价格" align="center" />
        <el-table-column label="操作" align="center" width="180px">
          <template slot-scope="scope">
            <router-link :to="'/book/' + scope.row.id">
              <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
            </router-link>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="remove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination
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
    </el-card>
  </div>
</template>

<script>
import book from '@/api/book/book'
export default {
  data() {
    return {
      list: null,
      page: 1,
      pageSize: 10,
      total: 0,
      bookQuery: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 图书列表
    getList(page = 1) {
      this.page = page
      book.getBookList(this.page, this.pageSize, this.bookQuery)
        .then(res => {
          this.list = res.data.records
          this.total = res.data.total
        })
        .catch(error => {
          this.$message.error('请求出错了：' + error.message)
        })
    },
    reset(){
      this.bookQuery = {}
      this.getList()
    },
    // 添加图书
    addBookHandle() {
      this.$router.push({ path: '/book/save' })
    },
    //删除图书
    remove(id){
      this.$confirm('此操作将永久删除图书信息，是否继续','提示',{
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        book.removeById(id)
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
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
