<template>
  <div v-if="!item?.meta?.hidden">
    <template v-if="hasOneShowingChild(item?.children)&&!onlyOneChild.children&&!item?.meta?.alwaysShow">
      <AppLink
        v-if="onlyOneChild.meta"
        :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <template #title>
            <el-icon><Setting /></el-icon>
            admin/{{ onlyOneChild.meta?.title }}
          </template>
        </el-menu-item>
      </AppLink>
    </template>
    <el-sub-menu
      v-else
      :index="resolvePath(item?.path as string)"
      popper-append-to-body>
      <template #title>
        <el-icon><Setting /></el-icon>
        admin/{{ item?.meta?.title }}
      </template>
      <SidebarItem
        v-for="(child, idx) in item!.children"
        :key="idx"
        :item="child"
        :base-path="item?.path ?? '/'" />
    </el-sub-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import path from "path-browserify";

import {
	Setting,
} from "@element-plus/icons-vue";
import AppLink from "./AppLink.vue";

import type { RouteRecordRaw } from "vue-router";
import type { PropType } from "vue";
import { isExternal } from "@/utils/validate";
export default defineComponent({
	components:{
		Setting,
		AppLink
	},
	props: {
		item: {
			type: Object as PropType<RouteRecordRaw>
		},
		basePath: {
			type: String,
			default: ""
		}
	},
	setup (props) {
		const onlyOneChild = onlyOneChildFn(props.item?.children, props.item);
		function onlyOneChildFn (children: RouteRecordRaw[] = [], parent?: RouteRecordRaw) {
			let target = {} as RouteRecordRaw;
			const showingChildren = children.filter(item => {
				if (item.meta && !item.meta.hidden) {
					return true;
				} else {
					return false;
				}
			});

			if (showingChildren.length === 1) {
				target = showingChildren[0];
			}
			if (showingChildren.length === 0) {
				target = parent as RouteRecordRaw;
			}
			return target;
		}

		const hasOneShowingChild = (children: RouteRecordRaw[] = []) => {
			if(!children) return;
			const showingChildren = children.filter(t => {
				if (t?.meta?.hidden) {
					return false;
				} else {
					return true;
				}
			});
			if (showingChildren.length === 1) {
				return true;
			}

			if (showingChildren.length === 0) {

				return true;
			}
			return false;
		};

		function resolvePath(routePath: string) {
			if (isExternal(routePath)) {
				return routePath;
			}
			if (isExternal(props.basePath)) {
				return props.basePath;
			}
			return path.resolve(props.basePath, routePath);
		}
		return {
			hasOneShowingChild,
			onlyOneChild,
			resolvePath
		};
	}
});
</script>

<style lang="scss" scoped>

</style>
