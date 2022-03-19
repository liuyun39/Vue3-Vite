<template>
  <div>
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="58" />
      <el-table-column
        prop="group"
        label="分组"
        sortable />
      <el-table-column
        prop="name"
        label="类型" />
      <el-table-column
        prop="checkNum"
        label="检出数" />
      <el-table-column
        prop="unCheckNum"
        label="未检出数" />
      <el-table-column
        prop="checkRatio"
        label="检出比" />
    </el-table>
  </div>
</template>
<script lang="ts">
import {
	defineComponent,
	nextTick,
	reactive,
	ref,
	onMounted } from "vue";
import { ElForm, ElMessageBox, ElMessage } from "element-plus";

import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";

interface IUser {
	name: string;
	checkNum: number;
	unCheckNum: number;
	checkRatio: string;
}

interface ISpanMethodProps {
	row: IUser;
	column: TableColumnCtx<IUser>;
	rowIndex: number;
	columnIndex: number;
}

interface IResData {
	checkNum: number;
	checkRatio: string;
	group: string;
	name: string;
	unCheckNum: number;
}
export default defineComponent({
	components:{
	},
	setup (props) {

		const tableData = ref<IResData[]>([
			{
				checkNum: 1,
				checkRatio: "50%",
				group: "全明星",
				name: "利拉德",
				unCheckNum: 12,
			},
			{
				checkNum: 1,
				checkRatio: "50%",
				group: "全明星",
				name: "约基奇",
				unCheckNum: 5,
			},
			{
				checkNum: 1,
				checkRatio: "50%",
				group: "全明星",
				name: "东契奇",
				unCheckNum: 8,
			},
			{
				checkNum: 1,
				checkRatio: "50%",
				group: "超巨",
				name: "勒布朗",
				unCheckNum: 12,
			},
			{
				checkNum: 1,
				checkRatio: "50%",
				group: "超巨",
				name: "卡哇伊",
				unCheckNum: 12,
			},
			{
				checkNum: 1123,
				checkRatio: "50%",
				group: "球星",
				name: "吹杨",
				unCheckNum: 12,
			},
			{
				checkNum: 1123,
				checkRatio: "50%",
				group: "球星",
				name: "亚历山大",
				unCheckNum: 12,
			}
		]);

		const cellList = ref<Array<number>>([]); // 单元格数组
		const count = ref(0); // 计数
		const objectSpanMethod = ({
			row,
			column,
			rowIndex,
			columnIndex,
		}: ISpanMethodProps) => {
			if (columnIndex === 1) {
				console.log("单元格数组, 若下一项为0, 则代表合并上一项", cellList.value);
				const rowCell = cellList.value[rowIndex];
				if (rowCell > 0) {
					const colCell = 1;
					console.log(`动态竖向合并单元格, 第${colCell}列，竖向合并${rowCell}个单元格 `);
					return {
						rowspan: rowCell,
						colspan: colCell,
					};
				} else {
					// 清除原有的单元格，必须要加，否则就会出现单元格会被横着挤到后面了！！！
					return {
						rowspan: 0,
						colspan: 0,
					};
				}
			}
		};

		function computeCell (tableBody: Array<IResData>) {
			// 循环遍历表体数据
			for (let i = 0; i < tableBody.length; i++) {
				if (i == 0) {
					// 先设置第一项
					cellList.value.push(1); // 初为1，若下一项和此项相同，就往cellList数组中追加0
					count.value = 0; // 初始计数为0
					console.log("索引", 0, count);
				} else {
					// 判断当前项与上项的类别是否相同，因为是合并这一列的单元格
					if (tableBody[i].group == tableBody[i - 1].group) {
						// 如果相等
						cellList.value[count.value] += 1; // 增加计数
						cellList.value.push(0); // 相等就往cellList数组中追加0
						console.log("索引", i, count);
					} else {
						cellList.value.push(1); // 不等就往cellList数组中追加1
						count.value = i; // 将索引赋值为计数
						console.log("索引", i, count);
					}
				}
			}
		}
		onMounted(() => {
			computeCell(tableData.value as IResData[]);
		});

		// 选择
		const selectData = ref<IResData[]>([]);
		function handleSelectionChange (val: Array<IResData>) {
			selectData.value = val;
		}
		return {
			tableData,
			objectSpanMethod,

			handleSelectionChange
		};
	}
});
</script>

<style lang="scss" scoped>

</style>
