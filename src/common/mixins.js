import {debounce} from "./utils";
import BackTop from "../components/content/backtop/BackTop";

export const itemListenerMixin = {
  data(){
    return {
      itemImgListener:null
    }
  },
  mounted(){
    const refresh=debounce(this.$refs.scroll.refresh,100);
    this.itemImgListener=function () {
      refresh()
    };
    this.$bus.$on('itemImageLoad',this.itemImgListener)
  }

};

export const backTopMixin = {
  components:{
    BackTop
  },
  data(){
    return {
      showBackTop:false
    }
  },
  methods:{
    backTop(){
      this.$refs.scroll.scrollTo(0,0,1000)
    }
  }
};

export const tabControlMixin = {
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break
        case 1:
          this.currentType = 'new';
          break
        case 2:
          this.currentType = 'sell';
          break
      }
      console.log(this.currentType);
    }
  }

}
