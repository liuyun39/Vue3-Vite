<template>
  <div>
    <div
      id="toolbar-container"
      class="toolbar" />
    <p>------ 我是分割线 ------</p>
    <div
      id="text-container"
      class="text">
      <audio
        controls
        src="someaudio.wav" />
      <div>
        啊实打实的<div />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
	defineComponent,
	ref
} from "vue";

import E from "wangeditor";

export default defineComponent({
	name: "Dashboard",
	components:{
	},
	setup () {
		// const E = window.wangEditor;
		const editor = new E("#toolbar-container", "#text-container");
		editor.create();

		return {
			// divDOM
		};
	}
});
</script>

<style lang="scss" scoped>

</style>
