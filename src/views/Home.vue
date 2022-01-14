<template>
  <el-button>home</el-button>
</template>
<script lang="ts">
import { defineComponent, nextTick, reactive, ref } from "vue";
import { ElForm, ElMessageBox, ElMessage, ElMenuItem } from "element-plus";
import type { IUpdata } from "../api/login/type";

export default defineComponent({
  name: "",
  components: {},
  props: {},
  emits: ["todo"],
  setup(props, { emit }) {
    const update: IUpdata = {
      color: "red"
    };
    emit("todo");
    return { update };
  }
});
</script>

<style lang="scss" scoped></style>
