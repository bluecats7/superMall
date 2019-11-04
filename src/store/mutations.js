import * as types from './mutation-type'
const mutations = {
   [types.ADD_TO_CART](state,obj){
      obj.checked = true;
      state.cartList.push(obj);
   },
  [types.INCREMENT_COUNT](state,index){
    state.cartList[index].count += 1
  }

};
export default  mutations
