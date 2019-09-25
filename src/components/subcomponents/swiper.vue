<template>
  <div>
    <mt-swipe :auto="4000">
        <!-- 将来谁使用此轮播图组件，谁为我们传递 lunbotuList -->
        <!-- 此时 lunbotuList 是父组件向子组件传值 -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <img :src="item.img" alt :class="{full:isfull}" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
  <!-- 分析：为什么商品详情中的轮播图这么丑 -->
  <!-- 首页中的图片宽高都是 100% -->
  <!-- 商品详情页面中，轮播图的图片如果也用宽高 100%，页面不好看 -->
  <!-- 商品详情中 期望是 高度 100%，宽度自适应 -->
  <!-- 在轮播图中定义一个熟悉，让使用轮播图的调用者手动指定是否为 100% 宽度 -->
</template>

<script>
export default {
    props: ["lunbotuList","isfull"]

};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;

  // .mint-swipe-item:nth-child(1){
  //     background-color: red;
  // }
  .mint-swipe-item {
      text-align: center;
    /* &:nth-child(1) {
      background-color: red;
    }
    &:nth-child(2) {
      background-color: green;
    }
    &:nth-child(3) {
      background-color: blue;
    } */
    img {
    //   width: 100%;
      height: 100%;
    }
  }
}
.full{
    width: 100%;
}
</style>