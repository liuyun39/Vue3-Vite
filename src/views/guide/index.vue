<template>
  <div>
    <div id="toolbar-container" />
    <div id="editor-container" />
  </div>
</template>
<script lang="ts">
import {
	defineComponent,
	onMounted,
	reactive,
	ref,
} from "vue";
import "@wangeditor/editor/dist/css/style.css";
import { createEditor, createToolbar } from "@wangeditor/editor";
import type { IEditorConfig, IDomEditor, IToolbarConfig } from "@wangeditor/editor";
export default defineComponent({
	components:{
	},
	setup (props) {
		// 编辑器配置
		const editorConfig: Partial<IEditorConfig> = {};
		editorConfig.placeholder = "请输入内容";
		editorConfig.onChange = (editor: IDomEditor) => {
			// 当编辑器选区、内容变化时，即触发
			console.log("content", editor.children);
			console.log("html", editor.getHtml());
		};

		// 工具栏配置
		const toolbarConfig: Partial<IToolbarConfig> = {};

		onMounted(() => {
			// 创建编辑器
			const editor = createEditor({
				selector: "#editor-container",
				config: editorConfig,
				mode: "default" // 或 'simple' 参考下文
			});
			// 创建工具栏
			const toolbar = createToolbar({
				editor,
				selector: "#toolbar-container",
				config: toolbarConfig,
				mode: "default" // 或 'simple' 参考下文
			});
		});
		return {

		};
	}
});
</script>

<style lang="scss" scoped>

</style>
