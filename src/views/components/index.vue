<template>
  <div class="com">
    <div class="com-item">
      <span>输入框</span>
      <LyInput />
    </div>

    <div class="com-item">
      <span>时间和单选</span>
      <LyTime />
    </div>
  </div>
</template>
<script lang="ts">
import {
	defineComponent,
} from "vue";

import { ElForm, ElMessageBox, ElMessage } from "element-plus";
import LyInput from "./payload/ly-input/LyInput.vue";
import LyTime from "./payload/ly-time/LyTime.vue";
export default defineComponent({
	components:{
		LyInput,
		LyTime
	},
	setup (props) {

		return {

		};
	}
});
</script>

<style lang="scss" scoped>
.com {
  .com-item {
    margin-bottom: 20px;
  }
}
</style>
