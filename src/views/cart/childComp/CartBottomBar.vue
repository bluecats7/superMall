<template>
  <div class="bottom-menu">
    <check-buttom class="select-all" @click.native="checkBtnClick" :is-checked="isSelectAll"/>
    <span>全选</span>
    <span class="total-price">合计{{totalPrice}}</span>
    <span class="buy-product">去计算{{cartLength}}</span>
  </div>
</template>

<script>
	import CheckButtom from "./CheckButtom";

	export default {
		name: 'BottomBar',
		data() {
			return {
      }
		},
		props: {},
		components: {CheckButtom},
		computed: {
			cartLength() {
       return  this.$store.getters.cartLength;
			},
        totalPrice() {
				const cartList=this.$store.getters.cartList;
          return cartList.filter(item => {
           return 	item.checked
          }).reduce((preValue,item)=>{
          	return  preValue+item.price * item.count
          },0).toFixed(2)
        },
        /*计算属性能够，computed用来监控自己定义的变量，该变量不在data里面声明，
        直接在computed里面定义，然后就可以在页面上进行双向数据绑定展示出结果或者用作其他处理
        相当于isSelectAll是一变量*/
		     /*watch主要用于监控vue实例的变化，它监控的变量当然必须在data里面声明才可以，
	  	  它可以监控一个变量，也可以是一个对象，但是我们不能类似这样监控*/
        isSelectAll() {
	        /* !2是可以判断为false的,!0是可以判断为true*/
	        /* return   !(this.$store.getters.cartList.filter(item =>{
	      return  	!item.checked /!*只要没有checked !=true*!/
        }).length);*/
	        /*find返回number类型  !undefined为true，当一个都没加入购物车的情况下，*/
	        if (this.$store.getters.cartList.length === 0) {
	          return false
          } else {
		        return !this.$store.getters.cartList.find(item => {
			        return !item.checked
		        })
          }
        }
		},
      methods:{
			//1.判断是否为选中的按钮
          checkBtnClick() {
	          let isSelectAll = this.$store.getters.cartList.find(item => !item.checked);
	     //2.有未选中的内容，则传布选中
         if(isSelectAll) {
         	this.$store.state.cartList.forEach((item)=>{
         		item.checked =true;
          })
         }  else {
         	this.$store.state.cartList.forEach(item =>{
         		item.checked = false
          })
         }
          }
      }
  }
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    left: 0;
    bottom: 49px;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
    /*为元素设定的宽度和高度决定了元素的边框盒。
    就是说，为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。
    通过从已设定的宽度和高度分别减去边框和内边距才能得到内容的宽度和高度。*/
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }
  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }


</style>
