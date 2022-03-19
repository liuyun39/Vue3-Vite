import { onBeforeUnmount, onMounted, shallowRef } from "vue";


import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";

import {
  BarChart,
  LineChart,
  PieChart,
  TreeChart,
} from "echarts/charts";

import {
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  GridComponent,
  MarkPointComponent,
  MarkLineComponent,
  TimelineComponent,
  DataZoomComponent,
  ToolboxComponent,
  DatasetComponent
} from "echarts/components";
import type { EChartsOption } from "echarts";

echarts.use([
  // Canvas 渲染器
  CanvasRenderer,
  // 柱状图
  BarChart,
  // 折线图
  LineChart,
  // 饼图
  PieChart,
  TreeChart,
  // 标题
  TitleComponent,
  // 图例
  LegendComponent,
  // 提示框
  TooltipComponent,
  // 直角坐标系
  GridComponent,
  // 标注
  MarkPointComponent,
  // 标线
  MarkLineComponent,
  // 时间轴
  TimelineComponent,
  // 缩放
  DataZoomComponent,
  // 工具栏
  ToolboxComponent,
  // Dataset
  DatasetComponent
]);

/**
 * @param {*} el
 * @returns {boolean}
 */
function isInViewport (el: HTMLElement) {
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  const top = el.getBoundingClientRect() && el.getBoundingClientRect().top;
  return top < height;
}

export default function useScroll (options: EChartsOption, emit: any){
  const chartEl = shallowRef<HTMLDivElement>();
  const chart = shallowRef(); // 此处若在泛型中传ECharts类型，下方调用会报错

  const chartInit = () => {
    if (isInViewport(chartEl.value as HTMLElement)) {
      chart.value = echarts.init(chartEl.value as HTMLDivElement);
      chart.value.setOption(options);
      emit("init");
      window.removeEventListener("scroll", chartInit, true);
    }
  };
  onMounted(() => {
    window.addEventListener("scroll", chartInit, true);
    chartInit();

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", chartInit, true);
    });
  });

  return {
    chartEl,
    chart
  };
}
