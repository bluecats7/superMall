<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
        <div>
          <i class="icon shop"></i>
          <span class="text">商铺</span>
        </div>
          <div>
            <i class="icon select"></i>
            <span class="text">收藏</span>
          </div>

    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
	export default {
		name: 'DetailButtomBar',
		data() {
			return {}
		},
		props: {},
		methods: {
		addToCart(event){
			this.$emit("addToCart")
    }
    },
		components: {},
	}
</script>

<style scoped>
  .bottom-bar {
    height: 58px;
    position: fixed;
    background-color: #fff;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    text-align: center;
  }
  .bar-item {
    /*思路吧共有的属性凑出来，为一个类*/
    display: flex;
    flex: 1;
  }
  .bar-item div{
    flex: 1;
  }
  .bar-left .text {
    font-size: 13px;
  }
  .bar-left .icon {
    display: block; /*把 i 设置为块状元素设置宽高*/
    width: 22px;
    height: 22px;
    margin: 10px auto 3px; /*上 - 左右 - 下*/
    background: url("~assets/img/detail/detail_bottom.png")0 0/100%;
  }
  .bar-left .service {
  background-position:0 -54px ;
    /*第一个值是水平位置，第二个值是垂直。左上角是0。单位可以是像素（0px0px）
        或任何其他 CSS单位。如果仅指定了一个值，其他值将是50％。你可以混合使用％和positions/
         */
  }
  .bar-left .shop {
    background-position: 0 -98px;
  }
  .bar-right {
    font-size: 15px;
    color: #fff;
    line-height: 58px;
    /*不给line-height就撑不起高度*/
  }
  .bar-right .cart{
    background-color: #ffe817;
    color: #333;
  }
  .bar-right .buy {
  background-color: #f69;
  }
</style>
