<template>
  <div class="app-container">
    <el-card>
      <el-form :inline="true">
        <el-form-item>
          <label style="margin-right: 5px">出版社名：</label>
          <el-input
            v-model="publisherQuery.name"
            placeholder="请输入出版社名"
            style="width: 70%"
            clearable
          />
        </el-form-item>
        <el-button>查询</el-button>
        <el-button type="primary" style="float: right" @click="addPublisherHandle">+ 添加出版社</el-button>
      </el-form>
      <el-table :data="list" border fit highlight-current-row style="width: 100%">
        <el-table-column
          label="序号"
          width="70"
          align="center">
          <template slot-scope="scope">
            {{ (page - 1) * pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="出版社名" align="center" />
        <el-table-column prop="address" label="地址" align="center" />
        <el-table-column prop="website" label="网址" align="center" />
        <el-table-column prop="phone" label="电话" align="center" />
        <el-table-column prop="email" label="邮箱" align="center" />
        <el-table-column prop="code" label="邮编" align="center" />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <router-link :to="'/publisher/' + scope.row.id">
              <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
            </router-link>
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
    </el-card>
  </div>
</template>

<script>
import publisher from '@/api/publisher'
export default {
  name: 'list',
  data(){
    return{
      list:null,
      page:1,
      pageSize:10,
      total:0,
      publisherQuery: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    //出版社列表
    getList(page = 1){
      this.page = page
      publisher.getPublisherList(this.page,this.pageSize)
        .then(res => {
          this.list = res.data.records
          this.total = res.data.total
        })
    },
    //删除出版社
    remove(id){
      this.$confirm('此操作将永久删除出版社信息，是否继续','提示',{
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        publisher.deletePublisherById(id)
          .then(res => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          });
        this.getList()
      })
    },
    //添加出版社
    addPublisherHandle(){
      this.$router.push('/publisher/save')
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .el-input {
    width: 500px;
  }
.el-form--inline .el-form-item__content {
    width: 293px;
  }
}
</style>
