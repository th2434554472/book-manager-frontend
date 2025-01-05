<script>
import receipt from "@/api/receipt";
import payment from "@/api/payment";
import store from "@/api/store";
import HeadLable from "@/components/HeadLable/index.vue";

export default {
  name: "save" ,
  components: {HeadLable},
  data(){
    return {
      title: '添加账单',
      receipt:{
        date:'',
        storeId:0,
        store:'',
        amount:'',
        paymentId:0,
        payment:''
      },
      payments:[],
      stores:[]
    }
  },
  created() {
    this.getPaymentList();
    this.getStoreList();
    if(this.$route.params.id){
      const id = this.$route.params.id;
      this.title = '修改账单';
      this.getReceiptById(id);
    }
  },
  methods:{
    saveOrUpdate(){
      if(!this.receipt.id){
        this.saveReceipt()
      }else {

      }
    },
    // 添加账单
    saveReceipt(){
      receipt.addReceipt(this.receipt)
      .then(res => {
        this.$message({
          type: 'success',
          message: '添加成功'
        });
        this.$router.push('/receipt/page')
      })
    },
    // 根据id获取账单列表
    getReceiptById(id){
      receipt.getById(id).then(res => {
        this.receipt = res.data
      })
    },
    // 获取支付方式列表
    getPaymentList() {
      payment.getPaymentList().then(res => {
        this.payments = res.data;
      })
    },
    // 获取店铺列表
    getStoreList(){
      store.getStoreList().then(res => {
        this.stores = res.data;
      })
    }
  }
}
</script>

<template>
  <div class="container">
    <el-card style="margin: 20px 20px">
      <HeadLable
        :title="title"
        :goback="true"
      />
      <el-form label-width="100px">
        <el-form-item label="消费日期:">
          <el-date-picker v-model="receipt.date"
                          type="date"
                          value-format="yyyy-MM-dd"/>
        </el-form-item>
        <el-form-item label="消费店:">
          <el-select v-model="receipt.store" placeholder="请输入消费店名">
            <el-option v-for="item in stores" :label="item.name" :key="item.id" :value="item.name"/>
          </el-select>
        </el-form-item>
        <el-form-item label="消费额:">
          <el-input v-model="receipt.amount" type="number" placeholder="请输入消费额"/>
        </el-form-item>
        <el-form-item label="支付方式:">
          <el-select v-model="receipt.payment" placeholder="请选择支付方式">
            <el-option v-for="item in payments" :label="item.name" :key="item.id" :value="item.name"/>
          </el-select>
        </el-form-item>

        <div style="padding-left: 20px">
          <el-button>
            取消
          </el-button>
          <el-button @click="saveOrUpdate" type="primary">
            保存
          </el-button>
          <el-button>
            保存并继续添加
          </el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.el-input {
  width: 500px;
}
</style>
