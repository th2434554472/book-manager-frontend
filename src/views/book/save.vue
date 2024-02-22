<template>
  <div class="addBrand-container">
    <div class="container">
      <el-card style="margin: 20px 20px">
        <HeadLable
          :title="title"
          :goback="true"
        />
        <el-form
          :model="book"
          label-width="100px">
            <el-form-item label="书名：" prop="bookName">
              <el-input
                v-model="book.bookName"
                placeholder="请输入书名"
                maxlength="100"
              />
            </el-form-item>
            <el-form-item label="类型：" prop="categoryName">
              <el-select v-model="book.categoryName"
                         placeholder="请选择图书类型">
                <el-option v-for="(item,index) in categoryList" :label="item.name" :key="item.id" :value="item.name"/>
              </el-select>
            </el-form-item>
            <el-form-item label="作者：" prop="authorName">
              <el-select v-model="book.authorName" placeholder="请选择作者">
                <el-option v-for="item in authorList" :label="item.name" :key="item.id" :value="item.name"/>
              </el-select>
            </el-form-item>
            <el-form-item label="译者：" prop="translator">
              <el-input
                v-model="book.translator"
                placeholder="请输入译者"
                maxlength="100"
              />
            </el-form-item>
            <el-form-item label="出版社：" prop="publisherName">
              <el-select placeholder="请选择出版社"  v-model="book.publisherName">
                <el-option v-for="item in publisherList" :label="item.name" :key="item.id" :value="item.name"/>
              </el-select>
            </el-form-item>
            <el-form-item label="出版时间：" prop="date">
              <el-date-picker
                v-model="book.date"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">]
              </el-date-picker>
            </el-form-item>
            <el-form-item label="价格：" prop="price">
              <el-input
                type="number"
                v-model="book.price"
                placeholder="请输入价格"
                maxlength="10"
              />
            </el-form-item>
            <el-form-item>
              <template>
                <el-button type="primary">取消</el-button>
                <el-button @click="saveOrUpdate">保存</el-button>
                <el-button>保存并继续添加</el-button>
              </template>
            </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import HeadLable from '@/components/HeadLable/index.vue'
import book from '@/api/book/book'
import category from '@/api/category/category'
import author from '@/api/author/author'
import publisher from '@/api/publisher'
export default {
  name: 'AddBook',
  components: {HeadLable},
  data() {
    return {
      title: "添加图书",
      book: {
        bookName: '',
        categoryName: '',
        authorName: '',
        translator:'',
        publisherName: '',
        date: '',
        price:'',
        image: ''
      },
      imageUrl: '',
      categoryList: [],
      authorList: [],
      publisherList: []
    }
  },
  created() {
    //图书分类
    this.getType();
    //作者列表
    this.getAuthorNameList();
    //出版社列表
    this.getPublisherNameList();
    //判断路径中是否有id值
    if(this.$route.params && this.$route.params.id){
      //从路径中获取id值
      const id = this.$route.params.id
      this.title = '修改图书信息'
      //调用根据id查询的方法
      this.getInfo(id)
    }
  },
  methods: {
    imageChange(val) {
      this.book.image = val
    },
    saveOrUpdate() {
      //根据是否有id，判断是添加还是修改
      if (!this.book.id) {
        //添加
        this.saveBook()
      } else {
        //修改
        this.updateBookInfo()
      }
    },
    //添加图书
    saveBook() {
      book.addBook(this.book)
        .then(res => {
          this.$message({
            type: 'success',
            message: '添加成功'
          });
          this.$router.push({ path: '/book/page' })
        })
    },
    //根据id查询图书
    getInfo(id) {
      book.getBookInfo(id)
        .then(res => {
          this.book = res.data
        })
    },
    //修改图书
    updateBookInfo() {
      book.updateBook(this.book)
        .then(res => {
          //提示信息
          this.$message({
            type: 'success',
            message: '修改成功！'
          });
          //回到列表页面
          this.$router.push({ path: '/book/page' })
        })
    },
    //获取图书分类列表
    getType(){
      category.getCategoryList().then(res => {
          this.categoryList = res.data
      })
    },
    //获取作者列表
    getAuthorNameList(){
      author.getAuthorLIst().then(res => {
        this.authorList = res.data
      })
    },
    //获取出版社列表
    getPublisherNameList() {
      publisher.reqPublisherList().then(res => {
        this.publisherList = res.data
      })
    }
  }
}
</script>

<style scoped lang="scss">
.addBrand-container {
  .el-input {
    width: 500px;
  }
}
</style>
