<template>
  <div class="sidebar-content">
    <!-- TODO height -->
    <el-scrollbar
      wrap-class="scrollbar-wrapper"
      height="93vh">
      <el-menu
        default-active="0"
        :collapse-transition="false">
        <SidebarItem
          v-for="(route, index) in routes"
          :key="index"
          :item="route"
          :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import {
	defineComponent,
	computed,
} from "vue";


import { useRouter, useRoute } from "vue-router";
import SidebarItem from "./SidebarItem.vue";

export default defineComponent({
	name: "Sidebar",
	components:{
		SidebarItem
	},
	setup () {
		const router = useRouter();
		// const route = useRoute();
		const routes = router.options.routes;

		return {
			routes,
		};
	}
});
</script>

<style lang="scss" scoped>
.sidebar-content {
  margin: 0 20px;
}
</style>
