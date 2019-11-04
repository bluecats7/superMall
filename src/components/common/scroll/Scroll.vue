<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<!--上面的代码中 better-scroll 是作用在外层 wrapper 容器上的，滚动的部分是 content 元素。这里要注意的是，
better-scroll 只处理容器（wrapper）的第一个子元素（content）的滚动，其它的元素都会被忽略。-->
<script>
	import BScroll from 'better-scroll'

	export default {
		name: 'Scroll',
	  props: {
		  probeType: {
			  type: Number,
			  default: 0
		  },
		  pullUpLoad: {
			  type: Boolean,
			  default: false
		  },
		  click: {
			  type: Boolean,
			  default: true
		  }
		  /*要想在betterscroll里使用点击就必须设置参数：click：true*/
	  },
		data() {
			return {
				scroll: {}
			}
		},
		methods: {
			_initScroll() {
				this.scroll = new BScroll(this.$refs.wrapper, {
					probeType: this.probeType,
          pullUpLoad:this.pullUpLoad,
			    click: this.click,
            /*此处click不设置的话，content里的内将不会监听点击事件*/
				})
          //2.事件滚动
          if(this.probeType===2 || this.probeType === 3){
          	this.scroll.on('scroll',position =>{
          		this.$emit('scroll',position)
            })
          }
          //3.上啦加载
          if(this.pullUpLoad){
          	this.scroll.on('pullingUp',()=>{
          		this.$emit('pullingUp')
            })
          }
			},
        //用于刷新重新计算高度
		refresh() {
			this.scroll && this.scroll.refresh && this.scroll.refresh()
		},
     finishedPullUp(){
				//finishPullUp,加载到一次，调用这个方法，放行，才可以进行下次pullUp
         this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
     },
     scrollTo(x,y,time=300){
			this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
     }
	},
		mounted() {
		setTimeout(this._initScroll, 20)
		},
    computed:{
			scrollY(){
		  return this.scroll ? this.scroll.y:0
      }
    }
	}
</script>

<style scoped>
  .wrapper {
    overflow: hidden;
  }
</style>
