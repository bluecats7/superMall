<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control ref="tabControll1" v-show="isShowTabControl" class="tab-control" @tabClick="homeClick"/>
    <scroll
      class="content"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="loadMore"
      ref="scroll"
      @scroll="contentScroll">
      <home-swiper :banners="banner" @swiperLoaderImage="swiperLoaderImage"/>
      <recommoned-view :recommend="recommends"></recommoned-view>
      <feature-view/>
      <tab-control ref="tabControll2" class="tab-control" @tabClick="homeClick"/>
      <goods-list :goods="showGoodsList"></goods-list>
    </scroll>
    <back-top v-show="isShowBackTop" @click.native="topClick"></back-top>
    <!--这back-top是不允许放在scroll标签里的，back-top样式index-z已经脱离文档流，脱离了页面，
    监听到scroll滚动到某一位置，就会在index-z：9这一层中show出来
    如果放到scroll标签里每次加载它就会称大，fixed的位置也就随之改变，而不能fixed
    -->
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'
	import HomeSwiper from "./childrenComp/HomeSwiper";
	import RecommonedView from "./childrenComp/Recommoned";
	import FeatureView from "./childrenComp/FeatureView";
	import TabControl from "../../components/content/tabcontroller/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backtop/BackTop";
/*只有vue组件不用{}*/
  import {itemListenerMixin} from "../../common/mixins"
	import {getMultiData,getProductData} from "../../network/home";

	export default {
		data(){
		return{
			banner:[],
			recommends:[],
      currenType:"pop",
		  goods: {
			'pop': {page: 1, list: []},
			'new': {page: 1, list: []},
			'sell': {page: 1, list: []}
		},
		isShowBackTop:false,
    isShowFixed:0,
    isShowTabControl:false,
    saveY:0,
		}
		},
	  mixins:[itemListenerMixin],
      computed:{
			showGoodsList(){
				return this.goods[this.currenType].list
      }
      },
	  methods: {
		  _getMultiData() {
			  getMultiData().then(res => {
				  this.banner = res.data.banner.list;
				  this.recommends = res.data.recommend.list;
			  })
		  },
		  _getProductData(type) {
			  getProductData(type,1).then(res => {
			  	const newlist=res.data.list
          this.goods[type].list.push(...newlist)
		      console.log(this.goods)
		      this.goods[type].page++
		    this.$refs.scroll.finishedPullUp()
			  })
		  },
	    homeClick(index){
        switch (index) {
            case 0:
                this.currenType='pop'
            break;
            case 1:
            	  this.currenType='new'
            break;
            case 2:
            	  this.currenType='sell'
                break
            /*这里判断点击了哪个*/
        }
        //不管你点击的是tab-control是1还是2都是调用的是homeClick方法，数据都是获取一样的，
         //唯一要改的是active的状态也就是currentIndex
          this.$refs.tabControll1.currentIndex=index;
        //当2组件点击了要把一激活状态active
	        this.$refs.tabControll2.currentIndex=index;
      },
	    topClick(){
	      console.log('---');
	      this.$refs.scroll.scrollTo(0,0);

      },
	  //3.上啦加载
    loadMore(){
    	 this._getProductData(this.currenType)
    },
	    contentScroll(position) {
	      this.isShowBackTop = (-position.y) > 500
        this.isShowTabControl=(-position.y) > this.isShowFixed

	    },
	    swiperLoaderImage(){
	        this.isShowFixed=this.$refs.tabControll2.$el.offsetTop;
	        /*$el.offsetTop这里是正数，十分注意*/
	      console.log('已发送'+this.isShowFixed);
	      /*只要swipe-home发来图片就会获取tabControl2的里top的距离*/
      }
	  },
		created(){
			this._getMultiData(),
		  this._getProductData("pop"),
		  this._getProductData("new"),
		  this._getProductData("sell")
		},
      activated(){
			//进来的时候，获取上次保存的位置saveY,
        this.$refs.scroll.scrollTo(0,this.saveY,0);
        this.$refs.scroll.refresh()
      },
      deactivated(){
			//离开时或，记录位置
        this.saveY = this.$refs.scroll.scrollY
        this.$bus.$off("itemImageLoad",this.itemImgListener)
      },
		components: {
			NavBar,
			HomeSwiper,
			RecommonedView,
			FeatureView,
			TabControl,
		  GoodsList,
      Scroll,
      BackTop
		},
  }

</script>

<style scoped>
  #home {
    height: 100vh;/*vh(viewpoint height)视口的意思,相当域手机屏幕的高度*/
    position: relative;/*vw(viewpoin width)视口的意思,相当域手机屏幕的宽度**/
    /*不设置这个相当于home是由标签称起来的高度，将会大概6000px的高度，手机客户端没有6000px的大小将显示不全*/
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    z-index: 9;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
