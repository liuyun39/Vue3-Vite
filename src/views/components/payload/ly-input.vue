<template>
  <div class="input-content">
    <div class="input-content--left">
      <input type="text">
    </div>
    <div class="input-content-center">
      ~
    </div>
    <div class="input-content--right">
      <input type="text">
    </div>
  </div>
</template>
<script lang="ts">
import {
	defineComponent,
	nextTick,
	reactive,
	ref,
} from "vue";

import { ElForm, ElMessageBox, ElMessage } from "element-plus";
export default defineComponent({
	name: "",
	components:{
	},
	setup (props) {
		return {

		};
	}
});
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
input {
  outline: none;
  border: 1px solid #ccc;
  text-align: center;
  margin: 0;
  padding: 0;
}

input-content {
  display: flex;
  justify-content: flex-start;
  // width: 100%;
  height: 30px;
  background-color: green;
  // &--left {
  //   height: 100%;
  //   border-right: none;
  //   background-color: #fff;
  //   // margin-right: 12px;
  // }
  // &--center {
  //   width: 100px;
  //   height: 100%;
  //   border: 1px solid #ccc;
  //   background-color: aqua;
  // }
  // &--right {
  //   height: 100%;
  //   border-left: none;
  //   background-color: #fff;
  // }
}
</style>
