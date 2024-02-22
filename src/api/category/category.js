import request from '@/utils/request'

export default {
  //分类列表
  getCategoryPage(page,pageSize,categoryQuery){
    return request({
      url: `/category/pageCondition/${page}/${pageSize}`,
      method: 'post',
      data: categoryQuery
    })
  },
  //删除分类
  deleteCategory(id){
    return request({
      url: `/category/${id}`,
      method: 'delete'
    })
  },
  //添加分类
  addCategory(category){
    return request({
      url: `/category/save`,
      method: 'post',
      data: category
    })
  },
  //修改分类
  editCategory(category){
    return request({
      url: `/category`,
      method: 'put',
      data: category
    })
  },
  //获取分类列表
  getCategoryList(){
    return request({
      url: '/category/list',
      method: 'get'
    })
  }
}
