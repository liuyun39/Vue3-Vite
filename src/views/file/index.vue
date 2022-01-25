<template>
  <div>
    <el-button
      type="primary"
      @click="handleClick">
      asd
    </el-button>
    <el-card>
      123
    </el-card>
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
		function handleClick() {
			ElMessage.error("test");
		}
		return {
			handleClick
		};
	}
});
</script>

<style lang="scss" scoped>
</style>
