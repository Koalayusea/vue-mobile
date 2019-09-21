// 入口文件  
import Vue from 'vue'

// 导入 mui 样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 按需导入 mint-ui 组件
import { Header } from 'mint-ui'
Vue.component(Header.name,Header)

// 导入app组件
import app from './app.vue'

var vm = new Vue({
    el: '#app',
    render: c => c(app)
})