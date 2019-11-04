<template>
	<div class="goods-list">
		<goods-item class="goods-item" v-for="item in goods" :goods-item="item">
		</goods-item>
	</div>
</template>

<script>
	import GoodsItem from "./GoodsItem";

	export default {
		name: 'GoodsList',
      props:{
	      goods:{
	      	type:Array,
          default(){
	      		return[]
          },
          required:true
        }
      },
		data() {
			return {}
		},
		method: {},
		components: {
			GoodsItem
		},
	}
</script>

<style>
	.goods-list { /*最外层的goodlist只有一个，不需要遍历，用来设置每一个goods-item的位置样式*/
	display: flex;
	flex-wrap: wrap;
	padding:5px ;
  justify-content: space-around;
	}
	.goods-item{
  width: 48%;
   height: 48%;
	}
</style>
