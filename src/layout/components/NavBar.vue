<template>
  <div class="navbar-content">
    <div>NavBar</div>
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
	name: "NavBar",
	components:{
	},
	setup (props) {

		return {

		};
	}
});
</script>

<style lang="scss" scoped>
.navbar-content {
  height: 100%;
  line-height: 4;
  padding: 0 30px;
}
</style>
