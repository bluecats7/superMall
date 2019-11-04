<template>
  <swiper>
    <swiper-slide v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" class="img-swiper" @load="swiperLoader" alt="">
      </a>
    </swiper-slide>
  </swiper>

</template>

<script>
	//import {Swiper, SwiperItem} from 'components/common/swiper'

	export default {
		name: 'HomeSwiper',
		data() {
			return {
			isSend: false,
			}
		},
		methods: {
			swiperLoader() {
				if (!this.isSend) {
					this.$emit('swiperLoaderImage');
					this.isSend = true
				}
			}
		},
		props: {
			banners: {
				type: Array,
				required: true,
				default() {
					return []
				}
			}
		}
	}
</script>

<style scoped>
  .img-swiper{
    width: 100%;
    height: 50%;
  }

</style>
