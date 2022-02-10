<template>
  <div class="breadcrumb">
    <el-breadcrumb>
      <el-breadcrumb-item
        v-for="(item, index) in levelList"
        :key="index">
        <span v-if="index===levelList.length-1">{{ item.meta.title }}</span>
        <a
          v-else
          :href="item.path">{{ item.meta?.title }}</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts">
import {
	defineComponent,
	computed
} from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
	components:{
	},
	setup () {
		const router = useRouter();
		const levelList = computed(() => {
			return router.currentRoute.value.matched.filter(t => t.meta && t.meta.title && t.meta.breadcrumb !==false);
		});
		return {
			levelList
		};
	}
});
</script>

<style lang="scss" scoped>
.breadcrumb {
  margin-left: 12px;
}
</style>
