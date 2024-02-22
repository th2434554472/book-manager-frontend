import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission'
import ZhCN from 'element-ui/src/locale/lang/zh-CN' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

// 创建过滤器，将秒数过滤为年月日，时分秒，传参值originVal为毫秒
Vue.filter('dateFormat', function(originVal){
  // 先把传参毫秒转化为new Date()
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  // 月份是从0开始,需要+1
  // +''是把数字转化为字符串,padStart(2,'0')是把字符串设置为2位数,不足2位则在开头加'0'
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const h = (dt.getHours()) < 10 ? "0" + dt.getHours() : dt.getHours()
  const m2 = (dt.getMinutes()) < 10 ? "0" + dt.getMinutes() : dt.getMinutes()
  return `${y}-${m}-${d}  ${h}:${m2}`
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus=this;
  }
})
