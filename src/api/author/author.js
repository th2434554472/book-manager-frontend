import request from '@/utils/request'

export default {
  //获取作者列表
  reqAuthorList(page, pageSize) {
    return request({
      url: `/author/page/${page}/${pageSize}`,
      method: 'get'
    })
  },
  //新增作者
  saveAuthor(author) {
    return request({
      url: `/author`,
      method: 'post',
      data: author
    })
  },
  //删除作者
  deleteAuthor(id) {
    return request({
      url: `/author/${id}`,
      method: 'delete'
    })
  },
  //根据id获取作者信息
  getAuthorInfoById(id) {
    return request({
      url: `/author/${id}`,
      method: 'get'
    })
  },
  //修改作者信息
  editAuthor(author) {
    return request({
      url: `/author`,
      method: 'put',
      data: author
    })
  },
  //获取作者列表
  getAuthorLIst() {
    return request({
      url: `/author/list`,
      method: 'get'
    })
  }
}
