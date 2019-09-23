// 入口文件  
import Vue from 'vue'
// 导入路由的包
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入时间插件
import moment from 'moment'

// 定义全局过滤器
Vue.filter('dataFormat', function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})

// 导入 router.js 路由模块
import router from './router.js'

// 导入 vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)

// 设置请求根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';

// 导入 mui 样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 按需导入 mint-ui 组件
import { Header, Swipe, SwipeItem, Button } from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)

// 导入app组件
import app from './app.vue'

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
})