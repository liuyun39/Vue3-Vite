<template>
  <div class="sidebar-content">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu default-active="0">
        <SidebarItem
          v-for="(route, index) in filterRoutes"
          :key="index"
          :menu-index="index"
          :item="route" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import {
	defineComponent,
	computed,
	ref,
} from "vue";


import SidebarItem from "./SidebarItem.vue";
import routes from "@/router/routers/index";


export default defineComponent({
	name: "Sidebar",
	components:{
		SidebarItem
	},
	setup () {
		const filterRoutes = computed(() => {
			return routes.filter((route) => {
				return route?.meta?.hidden === undefined;
			});
		});
		return {
			filterRoutes
		};
	}
});
</script>

<style lang="scss" scoped>
.sidebar-content {
  margin: 0 20px;
}
</style>
