import Vue from 'vue'
import VueRoute from 'vue-router'
const Home =()=>import('views/home/Home.vue')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')
Vue.use(VueRoute)
const route=new VueRoute({
	routes:[
		{path:'/',redirect:'/home'},
		{path:'/home',component:Home},
		{path:'/category',component:Category},
		{path:'/cart',component:Cart},
		{path:'/detail',component:Detail},
		{path:'/profile',component:Profile}
	],
	mode:'history'
})

export default route