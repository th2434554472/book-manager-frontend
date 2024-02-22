import request from '@/utils/request'

export default {
  getBookList(page, pageSize, bookQuery) {
    //图书列表
    return request({
      url: `/book/pageCondition/${page}/${pageSize}`,
      method: 'post',
      data: bookQuery
    })
  },
  //添加图书
  addBook(book){
    return request({
      url: `/book`,
      method: 'post',
      data: book
    })
  },
  //删除图书
  removeById(id){
    return request({
      url: `/book/${id}`,
      method: 'delete'
    })
  },
  //根据id查询图书信息
  getBookInfo(id){
    return request({
      url: `/book/${id}`,
      method: 'get'
    })
  },
  //修改图书
  updateBook(book){
    return request({
      url: `/book`,
      method: 'put',
      data: book
    })
  }
}
