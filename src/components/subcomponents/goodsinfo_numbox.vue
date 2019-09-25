<template>
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      value="1"
      @change="countChanged"
      ref="numbox"
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
      // console.log(this.$refs.numbox.value);
      this.$emit("getcount", parseInt(this.$refs.numbox.value));
    }
  },
  props: ["max"],
  watch: {
    // 属性监听
    'max': function(newVal, oldVal) {
      mui('.mui-numbox')
        .numbox()
        .setOption("max", newVal);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>