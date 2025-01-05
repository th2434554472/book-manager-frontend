<script>
import receipt from "@/api/receipt";
export default {
  name: "index",
  data(){
    return {
      list: null,
      page:1,
      pageSize:10,
      total:0
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList(page = 1){
      this.page = page;
      receipt.getReceiptList(this.page, this.pageSize)
      .then(res => {
        this.list = res.data.records;
        this.total = res.data.total;
      })
    },
    // 添加账单
    addReceiptHandler(){
      this.$router.push('/receipt/save');
    },
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
        <el-form-item label="日期:">
          <el-date-picker v-model="date"/>
        </el-form-item>
        <el-button type="primary" style="float: right" @click="addReceiptHandler" >+ 添加账单</el-button>
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
        <el-table-column prop="date" label="日期" align="center"/>
        <el-table-column prop="amount" label="消费额(円)" align="center"/>
        <el-table-column prop="store" label="消费店名" align="center"/>
        <el-table-column prop="payment" label="付费方式" align="center"/>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <router-link :to="'/receipt/' + scope.row.id">
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

<style scoped lang="scss">

</style>
