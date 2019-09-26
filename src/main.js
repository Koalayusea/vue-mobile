// 入口文件  
import Vue from 'vue'
// 导入路由的包
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 注册Vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//每次进入网站，肯定会调用 main.js 在刚调用的时候，先充本地存储中把购物车数据读出来放到 store 中
localStorage.getItem('car') || '[]'

var car = JSON.parse(localStorage.getItem('car')|| '[]')

var store = new Vuex.Store({
    state:{  //this.$store.state.***
        car: car //将购物车中商品的数据用数组存储，{ id: , count: , price:, selected:true }
    },
    mutations:{  //this.$store.commit('方法的名称', '按需传递参数')
        addToCar(state, goodsinfo){
            //点击加入购物车，将商品信息保存到 car
            
            // 1.如果购物车中以前就有这个商品了，那么只需更新商品数量
            // 2.如果没有，则把商品数据 push 到 car 中即可

            var flag = false

            state.car.some(item => {
                if(item.id == goodsinfo.id){
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })

            if(!flag){
                state.car.push(goodsinfo)
            }

            // 当更新 car 之后把 car 数组，存储到本地的 localStorage 中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsInfo(state, goodsinfo){
            // 修改购物车中商品的值
            state.car.some(item=>{
                if( item.id == goodsinfo.id ){
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            // 修改商品数量后，最新商品数量保存到本地
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeFormCar(state,id){
            // 根据 id 删除 商品数据
            state.car.some((item,i)=>{
                if(item.id == id){
                    state.car.splice(i,1)
                    return true
                }
            })
            // 将删除完毕后的数据，同步到本地
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsSelected(state, info){
            state.car.some(item=>{
                if(item.id == info.id){
                    item.selected = info.selected
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
            
        }
    },
    getters:{   //this.$store.getters.***
        // 相当于计算属性
        getAllCount(state){
            var c = 0;
            state.car.forEach(item=>{
                c += item.count
            })
            return c
        },
        getGoodsCount(state){
            var o = []
            state.car.forEach(item=>{
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelected(state){
            var o = []
            state.car.forEach(item=>{
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state){
            var o = {
                count:0,  //勾选数量
                amount:0  //总价
            }
            state.car.forEach(item=>{
                if(item.selected){
                    o.count += item.count
                    o.amount += item.price * item.count
                }
            })
            return o
        }
    }
})


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
// 全局设置 post 时候表单数据格式
Vue.http.options.emulateJSON = true;

// 导入 mui 样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 按需导入 mint-ui 组件
/* import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload) */
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

// 安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 导入app组件
import app from './app.vue'

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,
    store       //挂载 store 
})