<template>
  <div id="mountNode" />
</template>
<script lang="ts">
import {
	defineComponent,
	nextTick,
	reactive,
	ref,
	onMounted,
} from "vue";
import G6 from "@antv/g6";

import { ElForm, ElMessageBox, ElMessage } from "element-plus";
export default defineComponent({
	components:{
	},
	setup (props) {
		let graph: any = null;
		// const imageMinimap = new G6.ImageMinimap({
		// 	width: 200,
		// 	graphImg: "https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*eD7nT6tmYgAAAAAAAAAAAABkARQnAQ"
		// });
		onMounted(() => {
			// 实例化 minimap 插件
			const minimap = new G6.Minimap({
				size: [100, 100],
				className: "minimap",
				type: "delegate",
			});
			const grid = new G6.Grid();


			const graphObj = new G6.Graph({
				animate: true,
				plugins: [minimap, grid], // 将 minimap 实例配置到图上
				container: "mountNode", // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
				width: 1500, // Number，必须，图的宽度
				height: 700, // Number，必须，图的高度
				// fitView: true,
				// fitViewPadding: [10],
				layout: {
					// Object，可选，布局的方法及其配置项，默认为 random 布局。
					type: "force", // 指定为力导向布局
					preventOverlap: true, // 防止节点重叠
					// nodeSize: 30        // 节点大小，用于算法中防止节点重叠时的碰撞检测。由于已经在上一节的元素配置中设置了每个节点的 size 属性，则不需要在此设置 nodeSize。
					linkDistance: 400, // 指定边距离为100
				},
				modes: {
					default: [
						"drag-canvas",
						"zoom-canvas",
						"drag-node",
						{
							type: "tooltip", // 提示框
							formatText(model) {
								// 提示框文本内容
								const text = `label: ${  model.label  }<br/> class: ${  model.class}`;
								return text;
							},
						},
						{
							type: "edge-tooltip", // 边提示框
							formatText(model) {
								// 边提示框文本内容
								const text =
									`source: ${
										model.source
									}<br/> target: ${
										model.target
									}<br/> weight: ${
										model.weight}`;
								return text;
							},
						},
					], // 允许拖拽画布、放缩画布、拖拽节点
				},
				// 节点不同状态下的样式集合
				nodeStateStyles: {
					// 鼠标 hover 上节点，即 hover 状态为 true 时的样式
					hover: {
						fill: "lightsteelblue",
					},
					// 鼠标点击节点，即 click 状态为 true 时的样式
					click: {
						stroke: "#000",
						lineWidth: 3,
					},
				},
				// 边不同状态下的样式集合
				edgeStateStyles: {
					// 鼠标点击边，即 click 状态为 true 时的样式
					click: {
						stroke: "steelblue",
					},
				},
				defaultNode: {
					size: 30, // 节点大小
					// ...                 // 节点的其他配置
					// 节点样式配置
					style: {
						fill: "steelblue", // 节点填充色
						stroke: "#666", // 节点描边色
						lineWidth: 1, // 节点描边粗细
					},
					// 节点上的标签文本配置
					labelCfg: {
						// 节点上的标签文本样式配置
						style: {
							fill: "#fff", // 节点标签文字颜色
						},
					},
				},
				// 边在默认状态下的样式配置（style）和其他配置
				defaultEdge: {
					// 边上的标签文本配置
					labelCfg: {
						autoRotate: true, // 边上的标签文本根据边的方向旋转
					},
				},
			});
			graph = graphObj;
			// 鼠标进入节点
			graph.on("node:mouseenter", (e: any) => {
				const nodeItem = e.item; // 获取鼠标进入的节点元素对象
				graph.setItemState(nodeItem, "hover", true); // 设置当前节点的 hover 状态为 true
			});

			// 鼠标离开节点
			graph.on("node:mouseleave", (e: any) => {
				const nodeItem = e.item; // 获取鼠标离开的节点元素对象
				graph.setItemState(nodeItem, "hover", false); // 设置当前节点的 hover 状态为 false
			});

			// 点击节点
			graph.on("node:click", (e: any) => {
				// 先将所有当前是 click 状态的节点置为非 click 状态
				const clickNodes = graph.findAllByState("node", "click");
				clickNodes.forEach((cn: any) => {
					graph.setItemState(cn, "click", false);
				});
				const nodeItem = e.item; // 获取被点击的节点元素对象
				graph.setItemState(nodeItem, "click", true); // 设置当前节点的 click 状态为 true
			});

			// 点击边
			graph.on("edge:click", (e: any) => {
				// 先将所有当前是 click 状态的边置为非 click 状态
				const clickEdges = graph.findAllByState("edge", "click");
				clickEdges.forEach((ce: any) => {
					graph.setItemState(ce, "click", false);
				});
				const edgeItem = e.item; // 获取被点击的边元素对象
				graph.setItemState(edgeItem, "click", true); // 设置当前边的 click 状态为 true
			});
		});

		const main = async () => {
			const response = await fetch(
				"https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json",
			);
			const remoteData = await response.json();
			const nodes = remoteData.nodes;
			nodes.forEach((node: any) => {
				if (!node.style) {
					node.style = {};
				}
				switch (
					node.class // 根据节点数据中的 class 属性配置图形
				) {
				case "c0": {
					node.type = "circle"; // class = 'c0' 时节点图形为 circle
					break;
				}
				case "c1": {
					node.type = "rect"; // class = 'c1' 时节点图形为 rect
					node.size = [35, 20]; // class = 'c1' 时节点大小
					break;
				}
				case "c2": {
					node.type = "ellipse"; // class = 'c2' 时节点图形为 ellipse
					node.size = [35, 20]; // class = 'c2' 时节点大小
					break;
				}
				}
			});
			// 遍历边数据
			const edges = remoteData.edges;
			edges.forEach((edge: any) => {
				if (!edge.style) {
					edge.style = {};
				}
				edge.style.lineWidth = edge.weight; // 边的粗细映射边数据中的 weight 属性数值
				edge.style.opacity = 0.5;
				edge.style.stroke = "grey";
			});
			graph.data(remoteData); // 加载远程数据
			graph.render(); // 渲染
			// imageMinimap.updateGraphImg(img); // 使用新的图片（用户自己生成）替换 minimap 图片
		};
		main();

		return {

		};
	}
});
</script>

<style lang="scss" scoped>
.g6-tooltip {
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  font-size: 12px;
  color: #545454;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 8px;
  box-shadow: rgb(174, 174, 174) 0px 0px 10px;
}
</style>
