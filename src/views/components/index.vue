<template>
  <span>最大最小输入框</span>
  <LyInput />
</template>
<script lang="ts">
import {
	defineComponent,
} from "vue";

import { ElForm, ElMessageBox, ElMessage } from "element-plus";
import LyInput from "./payload/ly-input.vue";
export default defineComponent({
	components:{
		LyInput
	},
	setup (props) {

		return {

		};
	}
});
</script>

<style lang="scss" scoped>

</style>
