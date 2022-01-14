<template>
  <el-button id="btn" class="title" style="font-size: 12px"></el-button>

  <div></div>
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
      function todo(params: string) {
        return params;
      }
      emit("todo");
      return { update, todo };
    }
  });
</script>

<style lang="scss" scoped>
  .title {
    color: yellow;
  }
</style>
