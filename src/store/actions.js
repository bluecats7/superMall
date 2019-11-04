import {INCREMENT_COUNT,ADD_TO_CART} from "./mutation-type";

const actions = {
  addToCart({state,commit},info){
    return new Promise((resolve) => {
      /*1.岔开该商品是否已经添加到cartList中*/
        const oldInfo = state.cartList.find(item => item.iid === info.iid)
        /*find方法返回对象,if判断如果是undefind就是false*/
      if(oldInfo){
      const index = state.cartList.indexOf(oldInfo);
      commit(INCREMENT_COUNT,index)
      }else {
        info.count = 1;
        info.checked = true;
        commit(ADD_TO_CART,info)
      }
      resolve()
    })

  }

};

export default  actions
