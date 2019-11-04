<template>
       <div class="back-top">
         <img src="~assets/img/common/top.png" alt="">
       </div>
</template>

<script>
	export default{
	name:'BackTop',
	data(){
	return{
  msg:'msg'
  }
	},
	method:{},
	components:{},
	}
</script>

<style scoped>
  .back-top {
    position: fixed;
    right: 8px;
    bottom:55px ;
    z-index: 9;
    /*外面一层是用来定位*/
  }
  .back-top img{
    width:45px ;
    height:45px ;
  }

</style>
