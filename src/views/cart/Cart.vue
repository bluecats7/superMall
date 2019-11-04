<template>
  <div>
	    <nav-bar class="nav-bar"><div slot="center">购物车{{cartLength}}</div></nav-bar>
      <cart-list :cart-list="cartList" v-if="cartList.length !== 0"></cart-list>
      <cart-bottom-bar/>
  </div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
  import CartList from "./childComp/CartList";
	import CartBottomBar from "./childComp/CartBottomBar";
	export default {
  	name:"Cart",
  	data(){
  		return{}
    },
		methods: {},
		components: {
		NavBar,CartList,CartBottomBar
    },
      computed:{
  		cartLength(){
  		  return 	this.$store.getters.cartLength
      },
	      cartList(){
  		  return 	this.$store.getters.cartList
        }
      }
	}

</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color:#fff;
    font-weight: 700;
  }

</style>
