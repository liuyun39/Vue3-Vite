<template>
  <div
    ref="chartEl"
    class="chart"
    :style="{
      width: theWidth,
      height: theHeight
    }" />
</template>

<script lang="ts">
import { computed, defineComponent, watch } from "vue";

import useScroll from "../common/scroll";
import useResize from "../common/resize";
import type { EChartsOption, ECharts } from "echarts";
import type { PropType, Ref} from "vue";

const transformStyle = (val: string | number) => {
	if (typeof val === "number") {
		return `${val  }px`;
	} else {
		return val;
	}
};

export default defineComponent({
	name: "JtChart",
	props: {
		options: {
			type: Object as PropType<EChartsOption>,
			required: true
		},
		width: {
			type: [Number, String],
			default: "100%"
		},
		height: {
			type: [Number, String],
			default: "400px"
		}
	},
	setup (props, { emit }){
		const theWidth = computed(() => transformStyle(props.width));
		const theHeight = computed(() => transformStyle(props.height));

		const {
			chart,
			chartEl
		} = useScroll(props.options, emit);

		useResize(chart as Ref<ECharts>);

		watch(() => props.options, (nVal: EChartsOption) => {
			if(chart.value){
				chart.value.setOption(nVal);
			}
		}, {
			deep: true
		});

		return {
			chartEl,
			chart,
			theWidth,
			theHeight
		};
	}
});
</script>

<style lang="scss" scoped>
</style>
