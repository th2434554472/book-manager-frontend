import request from "@/utils/request";

export default {
  // 分页查询店铺
  getStorePage(page,pageSize){
    return request({
      url: `store//page/${page}/${pageSize}`,
      method: 'get'
    })
  },
  // 保存店铺
  saveStore(store){
    return request({
      url: 'store/save',
      method: 'post',
      data: store
    })
  },
  // 更新店铺
  updateStore(store){
    return request({
      url: 'store/update',
      method: 'put',
      data: store
    })
  },
  // 根据id获取店铺
  getById(id){
    return request({
      url: `/store/${id}`,
      method: 'get'
    })
  },
  // 删除店铺
  deleteStore(id){
    return request({
      url: `store/delete/${id}`,
      method: 'delete'
    })
  },
  // 获取店铺列表
  getStoreList(){
    return request({
      url: '/store/list',
      method: 'get'
    })
  }
}
