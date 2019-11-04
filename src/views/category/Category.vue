<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
    <tab-menu :categories="categroies" @selectIndex="selectIndex"/>
    <scroll id="tab-content" ref="scroll">
      <div>
      <tab-content-category :subcategories="showSubcategory"/>
        <tab-control :titles="['综合', '新品', '销量']"
                     @itemClick="tabClick"/>
      <goods-list :goods="showCategroyDetail"/>
      </div>
    </scroll>
  </div>
  </div>
</template>

<script>
	import NavBar from "../../components/common/navbar/NavBar";
	import TabMenu from "./childComp/TabMenu";
	import Scroll from "../../components/common/scroll/Scroll";
  import TabControl from "../../components/content/tabcontroller/TabControl";
  import TabContentCategory from "./childComp/TabContentCategory";
  import GoodsList from "../../components/content/goods/GoodsList";

	import {getCategory, getSubcategories,getCategoryDetail} from "network/category"
  import {tabControlMixin} from "../../common/mixins"
	export default {
		data() {
			return {
		    categroies: [],
				categroyData: {},
				currentIndex: -1,
        currentType : "pop"
			}
		},
		created() {
			this._getCategory()
		},
    mixins:[tabControlMixin],
		methods: {
			_getCategory() {
				getCategory().then(res => {
					this.categroies = res.data.category.list;
					console.log(res);
					for (let i = 0; i < this.categroies.length; i++) {
						/*数组取值array[1] 对象取值['type']*/
						this.categroyData[i] = {
							subcategories: {},
							categroyDetail: {
								'pop': [],
								'new': [],
								'sell': []
							}
						}
					}
					//3.请求第一个分类的数据
					this._getSubcategories(0)
				})
			},
			_getSubcategories(index) {
				this.currentIndex = index;
				const mailKey = this.categroies[index].maitKey
			getSubcategories(mailKey).then(res => {
        this.categroyData[index].subcategories = res.data
        this.categroyData ={...this.categroyData}  /*多个this.categoryData放进{}对象里*/
        this._getCategoryDetail('pop');
		    this._getCategoryDetail('sell')
		    this._getCategoryDetail('new')
	  })
			},
		  _getCategoryDetail(type){
				/*1.获取请求的miniWallkey*/
        const miniWallKey =this.categroies[this.currentIndex].miniWallkey
		  getCategoryDetail(miniWallKey,type).then(res =>{
		  	this.categroyData[this.currentIndex].categroyDetail[type] = res;
        this.categroyData ={...this.categroyData}
		  console.log(this.categroyData);
	  })
      },
		selectIndex(index){
				this._getSubcategories(index);
    }
		},
		components: {
			NavBar,TabMenu,TabControl,Scroll,TabContentCategory,GoodsList
		},
      computed:{
			  showSubcategory(){
			  	if(this.currentIndex === -1)return {}; /*请求不到数据的时候*/
			  	return this.categroyData[this.currentIndex].subcategories
        },
        showCategroyDetail(){
			  	if(this.currentIndex === -1) return  [];
			  		return this.categroyData[this.currentIndex].categroyDetail[this.currentType]
        }
      }
	}

</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }
</style>
