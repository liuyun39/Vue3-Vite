<template>
  <div
    v-if="isExternalSVG"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-on="$attrs" />
  <svg
    v-else
    :class="svgClass"
    aria-hidden="true"
    v-on="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>


<script lang="ts">
import {
	defineComponent,
	computed,
} from "vue";

// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
import { isExternal } from "@/utils/validate";

export default defineComponent({
	name: "SvgIcon",
	props: {
		iconClass: {
			type: String,
			required: true
		},
		className: {
			type: String,
			default: ""
		}
	},
	setup(props) {
		const isExternalSVG = computed(() => isExternal(props.iconClass));
		const iconName = computed(() => `#icon-${props.iconClass}`);
		const svgClass = computed(() => {
			if (props.className) {
				return `svg-icon ${ props.className }`;
			} else {
				return "svg-icon";
			}
		});
		const styleExternalIcon = (() => {
			return {
				mask: `url(${props.iconClass}) no-repeat 50% 50%`,
				"-webkit-mask": `url(${props.iconClass}) no-repeat 50% 50%`
			};
		});

		return {
			isExternalSVG,
			iconName,
			svgClass,
			styleExternalIcon
		};
	}
});
</script>

<style scoped lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>
