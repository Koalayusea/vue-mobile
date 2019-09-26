<template>
  <div class="mui-numbox" data-numbox-min="1" style="height:25px">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      :value="initcount"
      @change="countChanged"
      ref="numbox"
      readonly
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
  <!-- 分析子组件什么时候把值传给父组件 -->
</template>



<script>
import mui from "../../lib/mui/js/mui.js";
export default {
  mounted() {
    // 初始化数字选择框
    mui(".mui-numbox").numbox();
  },
  methods: {
    countChanged() {
      //数量改变
      console.log(this.$refs.numbox.value)
      this.$store.commit('updateGoodsInfo', { id: this.goodsid, count: this.$refs.numbox.value })
    }
  },
  props:['initcount','goodsid']
};
</script>

<style lang="scss" scoped>
</style>