<script>
import HeadLable from "@/components/HeadLable/index.vue";
import store from "@/api/store";

export default {
  name: "save" ,
  components: {HeadLable},
  data(){
    return {
      title: '添加店铺',
      store: {
        name:'',
        address:'',
        phone:''
      }
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id){
      const id = this.$route.params.id;
      this.title = '修改店铺信息';
      this.getById(id);
    }
  },
  methods:{
    saveOrUpdate(){
      // 如果没有id,就是添加
      if (!this.store.id) {
        this.saveStore()
      }else{
        // 有id,就是更新
        this.updateStore()
      }
    },
    // 添加店铺
    saveStore(){
      store.saveStore(this.store).then(res => {
        this.$message({
          type: 'success',
          message: '添加成功'
        });
        this.$router.push({path: '/store/page'})
      })
    },
    // 根据id,获取店铺信息
    getById(id){
      store.getById(id).then(res => {
        this.store = res.data
      })
    },
    // 修改店铺信息
    updateStore(){
      store.updateStore(this.store).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功'
        });
        this.$router.push({path:'/store/page'})
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
        <el-form-item label="店铺名">
          <el-input v-model="store.name" aria-placeholder="请输入店铺名"/>
        </el-form-item>
        <el-form-item label="店铺地址">
          <el-input v-model="store.address" aria-placeholder="请输入店铺地址"/>
        </el-form-item>
        <el-form-item label="店铺电话">
          <el-input v-model="store.phone" aria-placeholder="请输入店铺电话"/>
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
