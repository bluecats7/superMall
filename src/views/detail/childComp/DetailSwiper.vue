<template>
    <!--组件也可以作为根-->
        <swiper class="detail-swiper">
          <swiper-item v-for="(item,index) in images" :key="index">
            <img :src="item" alt="">
          </swiper-item>
        </swiper>
</template>

<script>
  import Swiper from "components/common/swiper/Swiper";
  import SwiperItem from "components/common/swiper/SwiperItem";
	export default{
	name:'DetailSwiper',
	data(){
	return{}
	},
  props:{
		images:{
			type:Array,
      default(){
				return[]
      }
    }

  },
	method:{},
	components:{
	  Swiper,
	  SwiperItem
  },
	}
</script>

<style scoped>
  .detail-swiper{
    height: 300px;
    overflow: hidden;
  }


</style>
