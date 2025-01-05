import request from '@/utils/request'

export default {
  //账单列表
  getReceiptList(page,pageSize){
    return request({
      url: `/receipt/page/${page}/${pageSize}`,
      method: 'get'
    })
  },
  //删除账单
  deleteReceiptById(id){
    return request({
      url: `/receipt/${id}`,
      method: 'delete'
    })
  },
  //添加账单
  addReceipt(publisher){
    return request({
      url: `/receipt`,
      method: 'post',
      data: publisher
    })
  },
  //根据id获取账单信息
  getById(id){
    return request({
      url: `/receipt/${id}`,
      method: 'get'
    })
  },
  //修改账单
  updateReceipt(publisher){
    return request({
      url: `/receipt`,
      method: 'put',
      data: publisher
    })
  }
}
