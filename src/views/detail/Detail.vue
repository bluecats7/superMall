<template>
       <div class="Detail">
         <detail-nar-bar @titleClick="selectIndex" :current-index="currentIndex"/>
         <scroll class="content"
                 @scroll="contentScroll"
                 :probe-type="3"
                 ref="scroll">
         <detail-swiper :images="topImages"/>
          <detail-base-info :goods="goods"/>
         <detail-shop-info :shop-info="shop"/>
           <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
           <detail-param-info :param-info="paramInfo" ref="param"/>
           <detail-comment-info :comment-info="commentInfo" ref="comment"/>
           <goods-list :goods="goodsList" ref="recommend" class="goods-list"/>
         </scroll>
         <back-top v-show="showBackTop" @click.native="backTop"/>
         <detail-buttom-bar class="detail-bar" @addToCart="addToCart"/>
       </div>
</template>

<script>
  import DetailNarBar from "./childComp/DetailNarBar";
  import DetailSwiper from "./childComp/DetailSwiper";
  import DetailShopInfo from "./childComp/DetailShopInfo";
  import DetailBaseInfo from "./childComp/DetailBaseInfo";
  import Scroll from "../../components/common/scroll/Scroll";
  import DetailGoodsInfo from "./childComp/DetailGoodsInfo";
  import DetailParamInfo from "./childComp/DetailParamInfo";
  import DetailCommentInfo from "./childComp/DetailCommentInfo";
  import GoodsList from "components/content/goods/GoodsList"
  import DetailButtomBar from "./childComp/DetailButtomBar";

  import {getDetail,getRecommend} from   "network/detail.js";
  import {Goods,Shop,GoodsParam} from "../../network/detail";
  import {itemListenerMixin,backTopMixin} from "../../common/mixins"
  import MainTabBar from "../../components/content/tabbar/MainTabBar";

  export default{
	name:'Detail',
	data(){
	return{
		iid:'',
    topImages :[],
    goods:{}, //goods:null; Cannot convert undefined or null to object v-if='Object.keys(goods).length !==0'
    shop:{}, //
    detailInfo:{},
    paramInfo:{},
    commentInfo:{},
	  goodsList:[],
	  themeTops:[],
    currentIndex:0
  }
	},
	  mixins:[itemListenerMixin,backTopMixin],
	  methods: {
		  _getDetail(iid) {
			  getDetail(iid).then((res) => {
				  //1获取数据
				  const data = res.result;
		      console.log(data);
		      //2获取顶部的图片数据
				  this.topImages = data.itemInfo.topImages;
          //3.获取商品信息
          this.goods =new Goods(data.itemInfo, data.columns, data.shopInfo.services);
          /*当你data.columns为undefined时*/
          /* Cannot read property '0' of undefined */
		      console.log(this.goods);
		      //4.获取店铺信息
          this.shop = new Shop(data.shopInfo)
          //5.获取祥平详细信息
           this.detailInfo = data.detailInfo;
          //6.保存参数详细信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
          //7.保存评论数据
            if(data.rate.list) {
	            this.commentInfo = data.rate.list[0];
            }
			  })
		  },
        _getRecommend(){
		  	    getRecommend().then(res => {
		  	    	this.goodsList =res.data.list
            })
        },
        imageLoad(){
		  	this.$refs.scroll.refresh();
        // 获取对应的offsetTop
        this.themeTops = [];/*当图片加载完成进来*/
        this.themeTops.push(0);
        this.themeTops.push(this.$refs.param.$el.offsetTop);
        this.themeTops.push(this.$refs.comment.$el.offsetTop);
	        this.themeTops.push(this.$refs.recommend.$el.offsetTop)
	        this.themeTops.push(Number.MAX_VALUE)
        },
	    selectIndex(index){
		  	/*点击nav-bar到达指定位置*/
		  	this.$refs.scroll.scrollTo(0,-this.themeTops[index],500)
      },
	    contentScroll(postion){
        this._listenScrollTheme(-postion.y)
         this.showBackTop = -postion.y >= 1000
	    },
      _listenScrollTheme(position){
		  	/*完成当滚动条在那块区域，nav-bar的选择跟着改变*/
          let length =this.themeTops.length;
          for(let i =0; i <length-1; i++){
          	let iPos=this.themeTops[i];
          	if(position >= iPos && position <this.themeTops[i+1]){
          		if(this.currentIndex !== i){//为了不要平凡的调用
          			this.currentIndex = i; //把nav-bar选择改掉的关键步骤
              }
          		break;
            }
          }
      },
        addToCart(){
		  	//将商品信息添加到Store中
            const obj ={};
            obj.iid = this.iid;
            obj.imageURL = this.topImages[0];
            obj.title = this.goods.title;
            obj.desc = this.goods.desc;
            obj.price =this.goods.realPrice;
            this.$store.dispatch("addToCart",obj).then(()=>{
            //弹框提示
            })
        }
	  },
  created(){
	this.iid=this.$route.query.iid;
	this._getDetail(this.iid);
	this._getRecommend();
  },
	components:{
	  DetailNarBar,
	  DetailSwiper,
	  DetailShopInfo,
	  DetailBaseInfo,
	  Scroll,
	  DetailGoodsInfo,
	  DetailCommentInfo,
	  DetailParamInfo,
	  GoodsList,
	  DetailButtomBar
  },
	  destroyed() {
      this.$bus.$off("itemImageLoad",this.itemImgListener)
        /*因为这个组件不是keep-alive，切换的时候都会创一个，离开时候销毁*/
	  },
  }
</script>

<style scoped>
.Detail {
  height: 100vh;
  background-color: #ffffff;
}
.content {
  position: relative;
  z-index: 1;
  height: calc(100% - 44px - 58px);
  background-color: #ffffff;
}
.detail-bar{
  position: relative;
  z-index: 99;
}

</style>

