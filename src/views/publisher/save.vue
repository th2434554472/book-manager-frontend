<template>
  <div class="addBrand-container">
    <div class="container">
      <HeadLable
        :title="title"
        :goback="true"
      />
      <el-form
        :inline="true"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div>
          <el-form-item label="出版社名：">
            <el-input
              v-model="publisher.name"
              placeholder="请输入出版社名"
              maxlength="100"
            />
          </el-form-item>

          <el-form-item label="地址：">
            <el-input
              v-model="publisher.address"
              placeholder="请输入地址"
              maxlength="100"
            />
          </el-form-item>
        </div>

        <div>
          <el-form-item label="网址：">
            <el-input
              v-model="publisher.website"
              placeholder="请输入网址"
              maxlength="100"
            />
          </el-form-item>

          <el-form-item label="电话：">
            <el-input
              v-model="publisher.phone"
              placeholder="请输入电话"
              maxlength="100"
            />
          </el-form-item>

          <el-form-item label="邮箱：">
            <el-input
              v-model="publisher.email"
              placeholder="请输入邮箱"
              maxlength="100"
            />
          </el-form-item>

          <el-form-item label="邮编：">
            <el-input
              v-model="publisher.code"
              placeholder="请输入邮箱"
              maxlength="100"
            />
          </el-form-item>
        </div>

        <div style="padding-left: 20px">
          <el-button>
            取消
          </el-button>
          <el-button @click="saveOrUpdate"type="primary">
            保存
          </el-button>
          <el-button>
            保存并继续添加
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import HeadLable from '@/components/HeadLable'
import publisher from '@/api/publisher'
export default {
  name: 'save',
  components: {
    HeadLable
  },
  data() {
    return {
      title: '添加出版社',
      publisher: {
        name: '',
        address: '',
        website: '',
        phone: '',
        email: '',
        code: ''
      }
    }
  },
  created() {
    if(this.$route.params && this.$route.params.id){
      const id = this.$route.params.id
      this.title = '修改出版社信息'
      this.getPublisherById(id)
    }
  },
  methods: {
    saveOrUpdate(){
      if(!this.publisher.id){
        this.savePublisher()
      }else {
        this.updatePublisherInfo()
      }
    },
    //添加出版社
    savePublisher(){
      publisher.addPublisher(this.publisher)
        .then(res => {
          this.$message({
            type: 'success',
            message: '添加成功'
          });
          this.$router.push('/publisher/page')
        })
    },
    //根据id获取出版社信息
    getPublisherById(id){
      publisher.getById(id)
        .then(res => {
          this.publisher = res.data
        })
    },
    //修改出版社信息
    updatePublisherInfo() {
      publisher.updatePublisher(this.publisher)
        .then(res => {
          this.$message({
            type: 'success',
            message: '修改出版社信息'
          });
          this.$router.push('/publisher/page')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.addBrand-container {
  .el-input {
    width: 500px;
  }
}
</style>
