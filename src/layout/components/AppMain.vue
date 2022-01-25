<template>
  <section class="app-main">
    <router-view
      v-slot="{ Component }">
      <transition
        name="fade-transition"
        mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </section>
</template>
<script lang="ts">
import {
	defineComponent,
} from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
	components:{
	},
	setup (props) {
		const route = useRoute();
		return {
			route
		};
	}
});
</script>

<style lang="scss" scoped>

</style>

