<template>
  <el-container class="layout-wrapper">
    <el-header class="layout-navbar">
      <NavBar />
    </el-header>
    <el-container>
      <el-aside
        class="layout-aside">
        <Sidebar />
      </el-aside>
      <el-main>
        <AppMain />
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import {
	defineComponent,
} from "vue";

import { Sidebar, NavBar, AppMain } from "./components/index";
export default defineComponent({
	components:{
		Sidebar,
		NavBar,
		AppMain
	},
	setup () {
		return {

		};
	}
});
</script>

<style lang="scss" scoped>
.layout-wrapper {
  background-color: $appmainBg;
  height: 100%;
}
.layout-aside {
  width: $sideBarWidth;
  background-color: $menuBg;
  color: $menuText;
}
.layout-navbar {
  background-color: $navbarBg;
  color: $navbarText;
}
</style>
