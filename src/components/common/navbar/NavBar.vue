<template>
		<div class="nav-bar ">
			<div class="left"><slot name="left"></slot></div>
			<div class="center"><slot name="center"></slot></div>
			<div class="right"><slot name="right"></slot></div>
		</div>
</template>

<script>
    export default {
    	name:"NavBar"
    }
</script>

<style>
	/*作为组件，别人安放在哪不用自己决定*/
.nav-bar {
	display: flex;
	/*width: 100%; flex :1自动不租空间*/
	text-align: center;
	height: 44px; /*又最外面的div撑起*/
	line-height: 44px;
	box-shadow: 0px 1px 1px rgba(0 197 205);
}

.nav-bar .left{
	width: 66px;
}
.nav-bar .center{
	flex:1
}
.nav-bar .right{
	width: 66px;
}
</style>
