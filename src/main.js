import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

//导入全局样式表
import './assets/css/global.css'
Vue.config.productionTip = false
//导入axios
import axios from 'axios'
//每一个vue组件都可以通过this.$http访问axios
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  //             console.log(config)
  // config.headers.token = window.sessionStorage.getItem('token')
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config;
} );



Vue.prototype.$http = axios



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
