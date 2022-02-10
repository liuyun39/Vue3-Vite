<template>
  <div>
    <el-button
      type="primary"
      @click="showExcelUpload">
      打开批量上传组件
    </el-button>
    <ExcelUpload
      ref="excelUploadRef"
      title="用户信息导入"
      temp-name="用户信息.xlsx"
      :temp-url="'xxx'"
      @on-upload-success="refresh" />
  </div>
</template>
<script lang="ts">
import {
	defineComponent,
	shallowRef,
} from "vue";
import ExcelUpload from "./ExcelUpload.vue";

export default defineComponent({
	components:{
		ExcelUpload
	},
	setup () {
		const excelUploadRef = shallowRef<InstanceType<typeof ExcelUpload>>();
		function  showExcelUpload() {
			excelUploadRef.value?.show();
		}
		function refresh () {
			// 批量上传成功后的一些操作
			// tableRef.value?.search();
		}
		return {
			refresh,
			excelUploadRef,
			showExcelUpload,
		};
	}
});
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
