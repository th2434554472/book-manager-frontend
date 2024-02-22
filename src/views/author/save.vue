<script>
import HeadLable from '@/components/HeadLable/index.vue'
import { title } from '@/settings'
import author from '@/api/author/author'
import { id } from 'html-webpack-plugin/lib/chunksorter'
import path from 'path'

export default {
  name: 'save',
  components: { HeadLable },
  data(){
    return {
      title: '添加作者',
      author: {
        name: '',
        sex: '',
        age: '',
        country: ''
      }
    }
  },
  created() {
    if(this.$route.params && this.$route.params.id){
      const id = this.$route.params.id
      this.title = '修改作者信息'
      this.getById(id)
    }
  },
  methods:{
    submit(){
      if(!this.author.id){
        //新增作者
        this.addAuthor();
      }else{
        //修改作者
        this.updateAuthorInfo();
      }
    },
    //新增作者
    addAuthor(){
      author.saveAuthor(this.author).then(res => {
        if (res.code === 20000) {
          this.$message({
            type: 'success',
            message: '添加成功'
          });
          this.$router.push({path: '/author/page'})
        } else {
          this.$message({
            type: 'error',
            message: '添加失败'
          });
        }
      })
    },
    //根据查询作者信息
    getById(id) {
      author.getAuthorInfoById(id).then(res => {
        this.author = res.data
      })
    },
    //修改作者信息
    updateAuthorInfo(){
      author.editAuthor(this.author).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功'
        });
        this.$router.push({path:'/author/page'})
      })
    }
  }
}
</script>

<template>
  <div>
    <el-card style="margin: 20px 20px">
      <HeadLable
        :title="title"
        :goback="true"
      />
      <el-form  label-width="100px">
        <el-form-item label="作者名：">
          <el-input placeholder="请输入作者名" v-model="author.name"/>
        </el-form-item>
        <el-form-item label="性别：">
          <el-select placeholder="请选择性别" v-model="author.sex">
            <el-option value="男"/>
            <el-option value="女"/>
          </el-select>
        </el-form-item>
        <el-form-item label="国家：" >
          <el-input placeholder="请输入国家" v-model="author.country"/>
        </el-form-item>
        <el-form-item label="时代：" >
          <el-input placeholder="请输入时代" v-model="author.age"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">保存</el-button>
          <el-button type="primary">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.el-input {
  width: 500px;
}
</style>
