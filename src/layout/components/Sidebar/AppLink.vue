<template>
  <component
    :is="showType"
    :to="external?'':to"
    v-bind="linkProps(to)">
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
			required: true
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
