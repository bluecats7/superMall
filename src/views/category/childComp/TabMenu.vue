<template>
  <scroll id="tab-menu">
    <div class="menu-list">
      <div class="menu-list-item"
           :class="{active:index === currentIndex}"
           v-for="(item,index) in categories"
           :key="index"
           @click="itemClick(index)">
          {{item.title}}
      </div>
    </div>
  </scroll>
</template>

<script>
	import Scroll from "../../../components/common/scroll/Scroll";

  export default {
		name: 'TabMenu',
		data() {
			return {
			currentIndex:0
      }
		},
		props: {
		  categories:Array
    },
		methods: {
			itemClick(index){
      this.currentIndex = index
      this.$emit("selectIndex",index)
      }
    },
		components: {Scroll},
	}
</script>

<style scoped>
  #tab-menu {
  background-color: #f6f6f6;
  height: 100%;
  width: 100px;
  box-sizing: border-box;
    /*border-box 告诉浏览器去理解你设置的边框和内边距的值是包含在width内的。
    也就是说，如果你将一个元素的width设为100px,那么这100px会包含其它的border和padding
    内容区的实际宽度会是width减去border + padding的计算值*/
    /*无论如何改动border，margin与padding的值，都不会导致box总尺寸发生变化，都不会被撑开。*/
  }
  .menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }
  .menu-list-item.active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color:#fff;
    border-left: 3px solid var(--color-high-text);
  }

</style>
