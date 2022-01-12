<template>
  <div>
    <el-tag>home</el-tag>
  </div>
  <div class="iasd" style="color: red">123</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  props: {},
  components: {},
  setup(props) {
    const asd = 123;
    return {};
  }
});
</script>

<style lang="scss" scoped>
.iasd {
  background-color: #fff;
  color: #fff;
}
</style>
