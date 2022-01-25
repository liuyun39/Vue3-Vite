<template>
  <el-dropdown :hide-on-click="false">
    <el-avatar
      class="navbar-avatar"
      :size="23"
      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
      <img
        src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png">
    </el-avatar>
    <template #dropdown>
      <el-dropdown-menu class="navbar-avatar--dropdown">
        <el-dropdown-item>
          Signed in as admin
        </el-dropdown-item>
        <el-dropdown-item divided>
          Your info
        </el-dropdown-item>
        <el-dropdown-item divided>
          Github
        </el-dropdown-item>
        <el-dropdown-item>
          Gitee
        </el-dropdown-item>
        <el-dropdown-item>
          Sign out
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts">
import {
	defineComponent
} from "vue";

export default defineComponent({
	components:{
	},
	setup () {

		return {

		};
	}
});
</script>

<style lang="scss" scoped>
.navbar-avatar--dropdown {
  width: 200px;
}
.navbar-avatar {
  cursor: pointer;
}
</style>

