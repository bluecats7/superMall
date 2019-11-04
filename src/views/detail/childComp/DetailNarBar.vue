<template>
  <div id="DetailNarBar">
    <nav-bar>
    <img slot="left" src="~assets/img/common/back.svg" alt="" class="back" @click="back">
      <div slot="center" class="title" >
        <div class="title-item"
             v-for="(item, index) in titles"
             @click="navClick(index)" :class="{active:currentIndex === index}">
          {{item}}
        </div>

      </div>
    </nav-bar>

  </div>

</template>

<script>
	import NavBar from "components/common/navbar/NavBar"

	export default {
		name: "DetailNarBar",
		data() {
			return{
				titles:['商品', '参数', '评论', '推荐'],
			}
		},
		methods: {
			back(){
				this.$router.back()
      },
		  navClick(index) {
        this.$emit("titleClick",index)
		  }
    },
		components: {
			NavBar
		},
      props:{
	      currentIndex:{
		      type:Number,
		      default:0
	      }
      }

	}

</script>

<style scoped>
  .title{
    display: flex;
    padding: 0 20px;
  }
  .title-item{
    flex:1; /*为了让每一个item都均匀分布添加了title-item这个类*/
  }
  .back{
    margin-top: 12px;
  }
  .active{
    color: var(--color-tint);
  }
</style>
