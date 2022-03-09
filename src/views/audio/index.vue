<template>
  <div>123</div>
</template>
<script lang="ts">
import {
	defineComponent,
} from "vue";

import { usePermission, useDevicesList } from "@vueuse/core";
import Recorder from "js-audio-recorder";

export default defineComponent({
	components:{
	},
	setup () {
		// const microphoneAccess = usePermission("microphone");
		//
		// const {
		// 	videoInputs: cameras,
		// 	audioInputs: microphones,
		// 	audioOutputs: speakers,
		// } = useDevicesList({
		// 	requestPermissions: true,
		// 	onUpdated: (v) => {
		// 		console.log(v, 123);
		// 	}
		// });

		const recorder = new Recorder();
		recorder.start().then(() => {
			console.log("start");
		}, (e) => {
			alert("requested device not found");
		});


		return {
			// cameras,
			// microphones,
			// speakers
		};
	}
});
</script>

<style lang="scss" scoped>
</style>
