<script>
import store from "@/api/store";
export default {
  name: "index",
  data() {
    return {
      list: null,
      page: 1,
      pageSize: 10,
      total: 0,
    }
  },
  created() {
    this.getList();
  },
  methods: {
    // 跳转到添加店铺
    addStoreHandler(){
      this.$router.push('/store/save')
    },
    // 获取店铺分页列表
    getList(page = 1){
      this.page = page;
      store.getStorePage(this.page, this.pageSize).then(res => {
        this.list = res.data.records;
        this.total = res.data.total;
      })
    },
    // 更改每页显示条数
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    }
  }
}
</script>

<template>
  <div class="app-container">
    <el-card>
      <el-form :inline="true">
        <el-form-item label="店铺名：">
          <el-input placeholder="请输入店铺名"/>
        </el-form-item>
        <el-button type="primary" style="float: right" @click="addStoreHandler" >+ 添加店铺</el-button>
      </el-form>

      <el-table  :data="list" border fit highlight-current-row style="width: 100%">
        <el-table-column label="序号"
                         width="70"
                         align="center">
          <template slot-scope="scope">
            {{ (page - 1) * pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="店铺名" align="center"/>
        <el-table-column prop="address" label="店铺地址" align="center"/>
        <el-table-column prop="phone" label="店铺电话" align="center"/>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <router-link :to="'/store/' + scope.row.id">
              <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
            </router-link>
<!--            <el-popconfirm-->
<!--              confirm-button-text="确认"-->
<!--              cancel-button-text="取消"-->
<!--              title="您确认要删除这条记录吗"-->
<!--            >-->

<!--            </el-popconfirm>-->
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
                     @size-change="handleSizeChange"/>
    </el-card>
  </div>
</template>

<style scoped lang="scss">

</style>
