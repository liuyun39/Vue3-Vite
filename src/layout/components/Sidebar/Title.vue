<template>
  <SvgIcon
    :icon-class="iconClass" />
  <div class="sidebar-title">
    admin/{{ menuTitle }}
  </div>
</template>
<script lang="ts">
import {
	defineComponent,
} from "vue";
import SvgIcon from "@/components/SvgIcon/index.vue";

export default defineComponent({
	components:{
		SvgIcon
	},
	props: {
		iconClass: {
			type: String,
			default: ""
		},
		menuTitle: {
			type: String,
			default: ""
		}
	},
	setup () {

		return {

		};
	}
});
</script>

<style lang="scss" scoped>
.sidebar-title {
  margin-left: 5px;
}
</style>
