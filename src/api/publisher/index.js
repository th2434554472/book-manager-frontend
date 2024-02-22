import request from '@/utils/request'

export default {
  //出版社列表
  getPublisherList(page,pageSize){
    return request({
      url: `/publisher/page/${page}/${pageSize}`,
      method: 'get'
    })
  },
  //删除出版社
  deletePublisherById(id){
    return request({
      url: `/publisher/${id}`,
      method: 'delete'
    })
  },
  //添加出版社
  addPublisher(publisher){
    return request({
      url: `/publisher`,
      method: 'post',
      data: publisher
    })
  },
  //根据id获取出版社信息
  getById(id){
    return request({
      url: `/publisher/${id}`,
      method: 'get'
    })
  },
  //修改出版社
  updatePublisher(publisher){
    return request({
      url: `/publisher`,
      method: 'put',
      data: publisher
    })
  },
  //获取出版社列表
  reqPublisherList(){
    return request({
      url: `/publisher/list`,
      method: 'get'
    })
  }
}
