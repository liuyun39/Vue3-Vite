<template>
  <div>123</div>
  <Editor
    :init="{
      plugins: 'lists link image table code help wordcount'
    }"
  />
</template>
<script lang="ts">
import {
	defineComponent,
	nextTick,
	reactive,
	ref,
} from "vue";
import Editor from "@tinymce/tinymce-vue";
import { ElForm, ElMessageBox, ElMessage } from "element-plus";
export default defineComponent({
	components:{
		Editor
	},
	setup (props) {

		return {
		};
	}
});
</script>

<style lang="scss" scoped>

</style>
