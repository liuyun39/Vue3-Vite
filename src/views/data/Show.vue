<template>
  <div>
    <audio ref="audioRef" />
    <button @click="playing=!playing">
      Play / Pause
    </button>
    <span>{{ currentTime }} / {{ duration }} {{ playing }}</span>
  </div>
</template>
<script lang="ts">
import {
	defineComponent,
	onMounted,
	ref,
	reactive,
	toRefs
} from "vue";

import { useMediaControls } from "@vueuse/core";

import { ElForm, ElMessageBox, ElMessage } from "element-plus";
export default defineComponent({
	components:{
	},
	setup (props) {
		const audioRef = ref();
		// const datas = reactive({
		// 	playing: false,
		// 	currentTime: 0,
		// 	duration: 0
		// });
		const { playing, currentTime, duration, volume } = useMediaControls(audioRef, {
			src: "http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3",
		});

		// Change initial media properties
		onMounted(() => {
			// datas.playing = playing.value;
			// datas.currentTime = currentTime.value;
			// volume.value = 0.5;
			// currentTime.value = 60;
		});

		return {
			// ...toRefs(datas),
			playing,
			currentTime,
			duration,
			audioRef
		};
	}
});
</script>

<style lang="scss" scoped>

</style>
