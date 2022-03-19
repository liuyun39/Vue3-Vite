<template>
  <div v-bind="$attrs">
    <JtChart
      ref="chartRef"
      :options="chartOption" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import JtChart from "../common/index.vue";
import type { PropType } from "vue";
import type { EChartsOption, LineSeriesOption } from "echarts";

// 用于将对象数组形式的数据转换为二维数组形式的数据
/**
 * [
 *  {
 *    key: 'key-1'
 *    a:12,
 *    b:20,
 *    c:51
 *  },
 *  {
 *    key: 'key-2'
 *    a:31,
 *    b:67,
 *    c:74
 *  }
 * ]
 * ---->
 * [
 *  ['key'  , 'a', 'b', 'c'],
 *  ['key-1', 12 , 20 , 51 ],
 *  ['key-2', 31 , 67 , 74 ]
 * ]
 */
function getDatasetOption (
	{ data: dictData, xKey }:
		{ data: { [key: string]: unknown}[]; xKey: string }
){
	const serieses: LineSeriesOption[] = [];
	const datasetSource: Array<any[]> = [];

	const keySet = new Set();
	dictData.forEach(item => {
		Object.keys(item).forEach(key => {
			keySet.add(key);
		});
		datasetSource.push([item[xKey]]);
	});
	const keys = [...keySet];
	const xKeyIndex = keys.findIndex(item => item === xKey);
	keys.splice(xKeyIndex, 1);
	keys.sort();

	dictData.forEach((item, index) => {
		keys.forEach((key: any) => {
			datasetSource[index].push(item[key]);
		});
	});

	serieses.length = datasetSource.length;
	serieses.fill({type: "line"});

	datasetSource.unshift([xKey, ...keys]);

	return {
		datasetSource,
		series: serieses
	};
}

export default defineComponent({
	name: "JtLineChart",
	components: {
		JtChart
	},
	props: {
		data: {
			type: Array as PropType<any>,
			default: () => []
		},
		xKey: {
			type: String,
			required: true
		}
	},
	setup (props){
		const chartRef = ref<InstanceType<typeof JtChart>>();
		const chartOption = computed<EChartsOption>(() => {
			const {
				datasetSource,
				series
			} = getDatasetOption(props);
			return {
				tooltip: {
					trigger: "axis"
				},
				dataset: {
					source: datasetSource
				},
				legend: {},
				grid: {
					left: "3%",
					right: "4%",
					bottom: "3%",
					containLabel: true
				},
				xAxis: {
					type: "category",
					boundaryGap: false
				},
				yAxis: {
					type: "value"
				},
				series
			};
		});

		return {
			chartRef,
			chartOption
		};
	}
});
</script>

<style>

</style>
