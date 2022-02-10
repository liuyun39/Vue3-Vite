<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for="(item, index) in levelList"
      :key="index">
      <a href="item.path">{{ item.meta?.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script lang="ts">
import {
	defineComponent,
	ref,
} from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
	name: "",
	components:{
	},
	setup (props) {
		const router = useRouter();
		const levelList = router.options.routes;
		console.log(levelList);

		return {
			levelList
		};
	}
});
</script>

<style lang="scss" scoped>

</style>
