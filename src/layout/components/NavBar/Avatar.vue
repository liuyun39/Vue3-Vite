<template>
  <el-dropdown
    :hide-on-click="false"
    trigger="click">
    <el-avatar
      class="navbar-avatar"
      :size="23"
      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
      <img
        src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png">
    </el-avatar>
    <el-icon
      color="#bebfc1"
      class="avatar-icon">
      <CaretBottom />
    </el-icon>
    <template #dropdown>
      <el-dropdown-menu class="navbar-avatar--dropdown">
        <div class="navbar-drop--title">
          Signed in as &nbsp;<span style="font-weight: 600;">admin</span>
        </div>
        <el-dropdown-item divided>
          Your info
        </el-dropdown-item>
        <a
          target="_blank"
          href="https://github.com/liuyun39/Vue3-Vite">
          <el-dropdown-item divided>
            Github
          </el-dropdown-item>
        </a>
        <a
          target="_blank"
          href="https://gitee.com/webkaifawonengxing/Vue3-Vite-Template">
          <el-dropdown-item divided>
            Gitee
          </el-dropdown-item>
        </a>
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
import { CaretBottom } from "@element-plus/icons-vue";

export default defineComponent({
	components:{
		CaretBottom
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

.avatar-icon {
  left: 1px;
  top: -2px;
  cursor: pointer;
}

.navbar-drop--title {
  font-size: 14px;
  color: #53575c;
  cursor: pointer;
  padding: 5px 16px;
}
</style>

