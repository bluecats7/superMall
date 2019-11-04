<template>
       <div class="tab-control">
		<div class="tab-control-item"
		     v-for="(item,index) in titles"
		     :class="{active:currentIndex === index}"
		     @click="itemClick(index)">
		<span>{{item}}</span>

		</div>
       </div>
</template>

<script>
	export default{
	name:'TabControl',
    		data(){
		return {
		currentIndex: 0
		//用来判断是否要激活active
	}
		},
	props:{
		titles:{
			type:Array,
			default(){
				return['流行','新款','精选']
			}
		}
	},
		methods:{
			itemClick(index){
				this.currentIndex=index
        this.$emit('tabClick',index)
			}
		}
	}
</script>

<style scoped>
	.tab-control{
		display: flex;
		font-size: 15px;
		background-color: #fff;
	}
	.tab-control-item{
		flex: 1;
		line-height: 40px;
		height:40px ;
		text-align: center;
	}
	.active{
		color: var(--color-high-text);
	}
	.tab-control-item span{
		padding: 5px;
	}
	.tab-control-item.active span {
   /* //当前面有active这个类，才会加上这个样式（才能找到）*/
		border-bottom: 2px solid var(--color-high-text);
	}
</style>
