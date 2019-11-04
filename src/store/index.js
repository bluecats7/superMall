import Vuex from 'vuex'
import vue from 'vue'
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

vue.use(Vuex)
const state = {
  cartList:[]
}

const store =new Vuex.Store({
	state,
	mutations,
	getters,
	actions
});

export default store
