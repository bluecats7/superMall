<template>
	<div>
    <keep-alive exclude="Detail"><!--为了每次点击获取的数据是从新渲染的所以exclude排除出去-->
      <router-view></router-view>
    </keep-alive>
	<main-tab-bar class="main-bar" id="home"></main-tab-bar>
	</div>
</template>

<script>
	import MainTabBar from "./components/content/tabbar/MainTabBar";
export  default {
	name:'App',/*这里命名可以快速导入vue组件*/
	components:{
		MainTabBar,
	},
}

</script>

<style scoped>
@import "assets/css/base.css";
</style>
