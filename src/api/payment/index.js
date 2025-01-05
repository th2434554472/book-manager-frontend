import request from "@/utils/request";

export default {
  // 获取支付方式列表
  getPaymentList(){
    return request({
      url: 'payment/list',
      method: 'get'
    });
  }
}
