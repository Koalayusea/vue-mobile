<template>
  <div class="goodsdesc-comtainer">
    <h3>{{info.title}}</h3>
    <hr />
    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      info: {}
    };
  },
  created() {
    this.getGoodsDesc();
  },
  methods: {
    getGoodsDesc() {
      this.$http.get("api/goods/getdesc/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.info = result.body.message[0];
        }
      });
    }
  }
};
</script>

<style lang="scss">
.goodsdesc-comtainer {
    padding: 4px;
  h3 {
    font-size: 16px;
    color: #226aff;
    margin: 15px 0;
    text-align: center;
  }
  .content {
    p {
        margin: 0;
      img {
        vertical-align:bottom;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>