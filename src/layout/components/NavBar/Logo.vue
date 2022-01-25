<template>
  <div class="navbar-logo">
    <router-link to="/">
      <el-avatar
        v-if="logoData.logo"
        :size="36"
        :src="logoData.logo" />
      <h1
        v-else
        class="navbar-logo--title">
        {{ logoData.title }}
      </h1>
    </router-link>
  </div>
</template>
<script lang="ts">
import {
	defineComponent,
	nextTick,
	reactive,
	ref,
} from "vue";

export default defineComponent({
	components:{
	},
	setup () {
		const logoData = reactive({
			logo: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
			title: "logo"
		});
		return {
			logoData
		};
	}
});
</script>

<style lang="scss" scoped>
.navbar-logo--title {
  color: #fff;
}
</style>
