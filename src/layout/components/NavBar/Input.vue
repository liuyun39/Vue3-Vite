<template>
  <el-input
    v-model="search"
    placeholder="Search what your want..."
    size="small">
    <template #suffix>
      <el-icon
        class="el-input__icon"
        @click="handleIconClick">
        <edit />
      </el-icon>
    </template>
  </el-input>
</template>
<script lang="ts" setup>
import {
	ref,
} from "vue";
import { Edit } from "@element-plus/icons-vue";
const search = ref("");

const handleIconClick = (ev: Event) => {
	alert("search");
};
</script>

<style lang="scss" scoped>
:deep(.el-input__inner) {
  background-color: $navbarBg;
  margin-left: 12px;
}
</style>
