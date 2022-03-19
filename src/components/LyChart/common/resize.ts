import { onActivated, onBeforeUnmount, onDeactivated, onMounted, ref } from "vue";
import debounce from "lodash/debounce";
import type { ECharts } from "echarts";
import type { Ref } from "vue";

export default function useResize (chart: Ref<ECharts>) {
  const $sidebarElm = ref<Element>();
  let $resizeHandler: undefined | (() => void) = undefined;

  const resize = function (){
    chart.value && chart.value.resize();
  };

  // use $_ for mixins properties
  // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
  const $sidebarResizeHandler = function (e: Event){
    if ((e as TransitionEvent).propertyName === "width") {
      $resizeHandler && $resizeHandler();
    }
  };

  const initListener = function (){
    $resizeHandler = debounce(resize, 100);
    window.addEventListener("resize", $resizeHandler as (() => void));

    $sidebarElm.value = document.getElementsByClassName("sidebar-container")[0];
    $sidebarElm.value && $sidebarElm.value.addEventListener("transitionend", $sidebarResizeHandler);
  };
  onMounted(function (){
    initListener();
  });
  onActivated(function (){
    if (!$resizeHandler) {
      // avoid duplication init
      initListener();
    }
    // when keep-alive chart activated, auto resize
    resize();
  });

  const destroyListener = function (){
    $resizeHandler && window.removeEventListener("resize", $resizeHandler);
    $resizeHandler = undefined;

    $sidebarElm.value && $sidebarElm.value.removeEventListener("transitionend", $sidebarResizeHandler);
  };
  onBeforeUnmount(destroyListener);
  onDeactivated(destroyListener);

  return {
    chart
  };
}

