<template>
  <component
    :is="showType"
    v-bind="linkProps(to)"
    :to="external?'':to">
    <slot />
  </component>
</template>
<script lang="ts">
import {
	defineComponent,
	computed,
} from "vue";
import type { ComputedRef } from "vue";

import { isExternal } from "@/utils/validate";
export default defineComponent({
	name: "",
	components:{
	},
	props: {
		to: {
			type: String,
			default: ""
		}
	},
	setup (props) {
		const external: ComputedRef = computed(() => {
			return isExternal(props.to);
		});

		const showType = computed(() => {
			if (external.value) {
				return "a";
			}
			return "router-link";
		});


		function linkProps(to: string) {
			if (external.value) {
				return {
					href: to,
					target: "_blank",
					rel: "index"
				};
			}
		}
		return {
			linkProps,
			showType,
			external
		};
	}
});
</script>

<style lang="scss" scoped>

</style>
