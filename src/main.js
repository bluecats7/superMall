import Vue from 'vue'
import App from './App.vue'
import router from 'router'
import store from "./store";
import fastclick from "fastclick"
import lazyload from  "vue-lazyload"

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue();

//解决移动端延迟300的方法
fastclick.attach(document.body);
//图片懒加载
Vue.use(lazyload,{
  loading:require("assets/img/common/placeholder.png")
});
Vue.use(VueAwesomeSwiper, {
  loop:true
});
new Vue({
  router,
  store,/* 把vuex加入到全局vue*/
  render: h => h(App)
}).$mount('#app')
