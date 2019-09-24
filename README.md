# 这是一个NB的项目

## 自己看

### 嘻嘻嘻

#### 我是一只小小小小鸟

## 用传统方式把修改后的代码上传到github
1. git add .
2. git commit -m "提交信息"
3. git push

## 制作首页App组件
1. 完成 Header 区域，使用的是 Mint-UI 中的 Header 组件
2. 制作底部的 Tabbar 区域，使用的是 MUI 的 Tabbar.html
 + 在制作购物车小图标的时候，操作相对多一些
 + 先把扩展图标的 css 样式，拷贝到项目中
 + 拷贝扩展字体库 ttf 文件，到项目中
 + 为购物车小图标，添加样式 'mui-icon mui-icon-extra mui-icon-extra-cart'
3. 要在中间区域放置一个 router-view 来展示路由匹配到的组件

## 改造 tabbar 为 router-link

## 设置路由高亮

## 点击 tarbbar 中的路由链接，展示对应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据
1. 获取数据，使用 vue-resource
2. 使用 vue-resource 的 this.$http.get 获取数据
3. 获取到的数据，要保存到 data 身上
4. 使用 v-for 循环渲染每个 item 项

## 改造九宫格区域的样式

## 改造新闻资讯路由链接

## 新闻资讯页面制作
1. 绘制界面，使用 MUI 中的 media-list.html
2. 使用 vue-resource 获取数据
3. 渲染真实数据

## 实现 新闻资讯列表 跳转到 新闻详情
1. 把列表中的每一项改造成 router-link ，同时，在跳转的时候应该提供唯一的Id标识符
2. 创建新闻详情的组件页面 NewsInfo.vue
3. 在路由模块中，将新闻详情的路由地址和组件页面对应起来

## 实现 新闻详情 的 页面布局 和 数据渲染

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个单独的 comment.vue 组件模板
2. 在需要使用 comment 组件的页面中，先手动导入 comment 组件
 + `import comment from './comment.vue'`
3. 在父组件中，使用 `components` 属性，将刚才导入的 comment 组件，注册为子组件
4. 将注册子组件时候的，注册名称，已标签形式，在页面中引用即可

## 获取所有的评论数据显示到页面中

## 实现点击加载更多评论的功能
1. 为加载更多按钮，绑定点击事件，在事件中，请求下一页数据
2. 点击加载更多，让 pageIndex++ ，然后重新调用 this.getComments() 方法重新获取最新一页的评论数据
3. 为了防止新数据覆盖老数据的情况，我们在点击加载更多的时候，每当获取到新数据，应该让老数据调用数组的 concat 方法，拼接上新数组

## 发表评论
1. 把文本框做双向数据绑定
2. 为发表按钮绑定一个事件
3. 校验评论内容是否为空，如果为空，则 Toast 提示用户评论内容不能为空
4. 通过 vue-resource 发送一个请求，把评论交给服务器
5. 当发表评论ok后，重新刷新列表，以查看最新的评论
 + 如果调用 getComments 方法重新刷新评论列表的话，只能得到最后一页的评论，前几页的评论获取不到
 + 换一种思路：当评论成功后，在客户端手动拼接一个最新的评论对象，然后调用数组的 unshift 方法，把最新的评论，追加到 data 中 comments 的开头

## 改造图片分析按钮为路由的链接并显示对应的组件页面

## 绘制 图片列表 组件页面结构并美化样式
 1. 制作顶部的滑动条
 2. 制作替补的图片列表
### 制作顶部滑动条的坑
 1. 需要借助于 MUI 中的 tab-top-webview-main.html
 2. 需要把 slider 区域的 mui-fullscreen 类去掉
 3. 滑动条无法正常触发滑动，需引入JS组件
  + 导入 mui.js
  + 调用官方的方式初始化
  ```
  mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });
  ```
 4.我们在初始化滑动条的时候，导入了 mui.js，但是控制台报错：`ncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them`
  + mui.js 用到了'caller', 'callee', and 'arguments',但是，webpack 打包好的 bundle.js 中，默认是启用严格模式的，所以这两者冲突了
  + 解决方案：1. 把 mui.js 中的 非严格模式的代码改掉;但是不现实；2.把 webpack 打包时候的严格模式禁用掉；
  + weibpack4 移除严格模式：`cnpm i @babel/plugin-transform-strict-mode -D`
  + `{"plugins": ["@babel/plugin-transform-strict-mode"]}`
  + 上面方法依然报错
  + 完美解决方法 `https://segmentfault.com/a/1190000017558699?utm_source=tag-newest`
  + 刚进入图片分享页面的时候，滑动条无法正常工作，要把初始化 滑动条的代码搬到 mounted 生命周期函数中
  + 底部 tabbar 不能切换，找到Tab栏mui-tab-item的所有样式，复制一份，重新赋予新的样式类名，如mui-tab-item-my
 5. 获取所有分类并渲染分类列表

### 制作图片列表区域
 1. 图片列表需要使用懒加载技术，可以使用 Mint-UI 提供的组件 `lazy load`
 2. 根据`lazy load`的使用文档使用
 3. 渲染图片列表数据

### 实现了图片列表的懒加载改造和样式美化

## 实现 点击图片 跳转到 图片详情页面
1. 在改造 li 成 router-link 的时候，需要使用 tag 属性指定渲染为 li 元素

## 实现 详情页面布局和美化，同时获取数据渲染页面

## 实现 图片详情中 缩略图的功能
1. 使用插件 vue-preview `https://github.com/LS1231/vue-preview`
2. 获取到所有图片列表，然后使用 v-for 指令渲染数组
3. 每个图片要有 w, h, src, msrc 属性
 + 需要手动设置缩略图样式

## 绘制 商品列表 页面基本结构并美化

## 尝试在手机上进行项目的预览和测试
1. 要保证自己手机可以正常运行
2. 要保证 手机 和 开发项目的电脑处于同一个 WIFI 环境中
3. 打开自己的 项目中 package.json 文件，在 dev 脚本中，添加一个 --host 指令，把当前电脑的 WIFI IP 地址，设置为 --host 的指令值
 + 在 cmd 中运行 `ipconfig` 查看无线网 ip 