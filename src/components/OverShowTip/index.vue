<template>
  <el-tooltip v-bind="$attrs">
    <span v-overflowShowTooltip>
      <slot />
    </span>
  </el-tooltip>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	name: "OverShowTip",
	directives: {
		overflowShowTooltip: {
			mounted (el) {
				// 文本超出父元素,省略号显示
				el.style.overflow = "hidden";
				el.style.textOverflow = "ellipsis";
				el.style.whiteSpace = "nowrap";
				const pl = el.parentNode;

				pl.style.display = "flex";
				// 不超出父元素,鼠标悬停不展示tooptip
				if (pl.clientWidth >= el.scrollWidth) {
					const toolTipId = el.getAttribute("aria-describedby");
					console.log(el.scrollWidth);

					const tooptipdom = document.getElementById(toolTipId);
					if (tooptipdom) {
						tooptipdom.remove();
					}
				}
			}
		}
	}
});
</script>
<style lang="scss" scoped></style>
