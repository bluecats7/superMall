<template>
       <div class="recommond">
		<div class="recommend-item" v-for="item in recommend">
			<a :href="item.link">
				<img :src="item.image" alt="">
				<span>{{item.title}}</span>
			</a>
		</div>

       </div>
</template>

<script>
	export default{
	name:'RecommonedView',
	props:{
		recommend:{
			type:Array,
			required:true,
			default() {
				return[]
			}
		}
	}
	}

</script>

<style scoped>
	.recommond{
		display: flex;
		text-align: center;
		font-size: 14px;
		padding-bottom: 30px;
		border-bottom: 10px solid #eee;
		margin-top: 10px;

	}
	.recommend-item {
		flex: 1;

	}
	.recommend-item img{
		width: 80px;
		height: 80px;
		margin-bottom: 10px;
	}
</style>
