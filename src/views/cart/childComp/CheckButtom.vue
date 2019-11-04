 <template>
  <div>
    <div class="icon-selector" :class="{'select-active':isChecked}" @click="selectItem">
      <img src="~/assets/img/cart/tick.svg" alt="">
    </div>
  </div>
</template>

<script>
	export default {
		name: 'CheckButtom',
		props: {
			isChecked: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			selectItem() {
				this.$emit("checkBtnClick")
			}
		},
	}
</script>

<style scoped>
  .icon-selector {
    position: relative;
   margin-right: 6px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer; /*	光标呈现为指示链接的指针（一只手）*/
  }

  .select-active {
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>
