<script>
import author from '@/api/author/author'

export default {
  name: 'index',
  data() {
    return {
      list: null,
      page: 1,
      pageSize: 10,
      total: 0,
      authorQuery:{}
    }
  },
  created() {
    this.getAuthorList()
  },
  methods: {
    //获取作者列表
    getAuthorList(page = 1) {
      this.page = page
      author.reqAuthorList(this.page, this.pageSize).then(res => {
        this.list = res.data.records;
        this.total = res.data.total;
      })
    },
    //添加按钮事件
    addAuthor(){
      this.$router.push('/author/save')
    },
    //删除作者
    removeAuthor(id){
        this.$confirm("此操作将永久删除作者信息，是否继续",'提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning'
        }).then(() => {
          author.deleteAuthor(id).then(res => {
            this.$message({
              type:'success',
              message: '删除成功'
              });
            this.getAuthorList();
          })
        })
    },
    //更改每页展示数
    handelSizeChange(val){
      this.pageSize = val
      this.getAuthorList();
    }
  }
}
</script>

<template>
  <div>
    <el-card style="margin: 20px 20px">
      <el-form :inline="true">
        <el-form-item label="作者名：">
          <el-input placeholder="请输入作者名" v-model="authorQuery.name"/>
        </el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button type="primary" style="float: right" @click="addAuthor">+ 添加作者</el-button>
      </el-form>
      <el-table border highlight-current-row :data="list">
        <el-table-column label="序号" type="index" width="80px" align="center"/>
        <el-table-column label="作者名" align="center" prop="name"/>
        <el-table-column label="国家" align="center" prop="country"/>
        <el-table-column label="时代" align="center" prop="age"/>
        <el-table-column label="性别" align="center" prop="sex">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <router-link :to="'/author/' + scope.row.id">
              <el-button type="primary" icon="el-icon-edit">修改</el-button>
            </router-link>
            <el-button type="danger" icon="el-icon-delete" @click="removeAuthor(scope.row.id)">删除</el-button>
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
        @size-change="handelSizeChange"
        @current-change="getAuthorList"
      />
    </el-card>

  </div>

</template>

<style scoped lang="scss">

</style>
