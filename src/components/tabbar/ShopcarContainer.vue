<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表项区域 -->
      <div class="mui-card" v-for="(item, index) in goodslist" :key="index">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch
              v-model="$store.getters.getGoodsSelected[item.id]"
              @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"
            ></mt-switch>
            <img :src="item.thumb_path" />
            <div class="info">
              <h1>{{ item.title }}}</h1>
              <p>
                <span class="price">￥{{ item.sell_price }}</span>
                <numbox :goodsid="item.id" :initcount="$store.getters.getGoodsCount[item.id]"></numbox>

                <!-- 如何从购物车中获取商品数量 -->
                <!-- 1.我们可以先创建一个空对象，然后循环购物车中所有的商品数据，{ id:count }格式存储 -->

                <a href="#" @click.prevent="remove(item.id, index)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 结算区域 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner jiesuan">
            <div class="left">
              <p>总计（不含运费）</p>
              <p>
                已勾选商品 ,
                <span class="red">{{ $store.getters.getGoodsCountAndAmount.price }}</span> 件，总价
                <span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span>
              </p>
            </div>
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numbox from "../subcomponents/shopcar_numbox.vue";
export default {
  data() {
    return {
      goodslist: []
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      //1.获取 store 中所有商品的id，拼接起来
      var idArr = [];
      this.$store.state.car.forEach(item => idArr.push(item.id));
      //如果购物车没商品,直接返回
      if (idArr.length <= 0) {
        return;
      }
      this.$http
        .get("api/goods/getshopcarlist/" + idArr.join(","))
        .then(result => {
          if (result.body.status === 0) {
            this.goodslist = result.body.message;
            console.log(this.$store.state.car);
            console.log("api/goods/getshopcarlist/" + idArr.join(","));
          }
        });
    },
    remove(id, index) {
      // store 中根据 id 来删除，goodslist 中通过 index 删除
      this.goodslist.splice(index, 1);
      this.$store.commit("removeFormCar", id);
    },
    selectedChanged(id, val) {
      // 每当点击开关，把最新开关状态同步到 'store'
      //   console.log( id +  '===' +  val)
      this.$store.commit('updateGoodsSelected',{id:id, selected:val})
    }
  },
  components: {
    numbox
  }
};
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        margin: 0;
      }
      h1 {
        margin-bottom: 15px;
      }
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }

}
</style>