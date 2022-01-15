<template>
  <div v-if="!item?.meta?.hidden">
    <el-menu-item :index="menuIndex?.toString()">
      <el-icon><Setting /></el-icon>
      <template #title>
        UserName/{{ item?.children?.[0].meta?.title }}
      </template>
    </el-menu-item>
  </div>
</template>
<script lang="ts">
import {
	defineComponent,
	computed
} from "vue";

import {
	Setting,
} from "@element-plus/icons-vue";

import type { RouteRecordRaw } from "vue-router";
import type {
	PropType} from "vue";
export default defineComponent({
	name: "",
	components:{
		Setting,
	},
	props: {
		menuIndex: {
			type: Number,
			requred: true
		},
		item: {
			type: Object as PropType<RouteRecordRaw>
		}
	},
	setup (props) {
		return {
		};
	}
});
</script>

<style lang="scss" scoped>

</style>
