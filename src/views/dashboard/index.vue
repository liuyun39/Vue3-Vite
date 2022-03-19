<template>
  <div>
    <button @click="start">
      开始录音
    </button>
    <button @click="stop">
      结束录音
    </button>
    <button @click="bofang">
      录音播放
    </button>
    <button @click="handleData">
      获取数据
    </button>
    <div>{{ blobsData }}</div>
  </div>
</template>
<script lang="ts">
import {
	defineComponent,
	nextTick,
	onMounted,
	reactive,
	ref,
} from "vue";

import { ElForm, ElMessageBox, ElMessage } from "element-plus";
import Recorder from "js-audio-recorder";

export default defineComponent({
	name: "",
	components:{
	},
	setup (props) {
		const recorder = new Recorder({
			sampleBits: 16,                 // 采样位数，支持 8 或 16，默认是16
			sampleRate: 16000,              // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
			numChannels: 1,                 // 声道，支持 1 或 2， 默认是1
			// compiling: false,(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
		});

		console.log(recorder);

		// onMounted(() => {
		// 	quanxian();
		// });

		// 开始录音
		function start () {
			quanxian();
			recorder.start().then(() => {
				// 开始录音
				console.log("开始录音");

			}, (error) => {
				// 出错了
				console.log(error);
			});
		}

		recorder.onprogress = (res: any) => {
			console.log("音量", res.vol);
			console.log("blob", res.data);

		};

		// 关闭录音
		function stop () {
			//
			recorder.stop();
		}

		// 播放录音
		function bofang () {
			recorder.play();
		}

		// 权限
		function quanxian () {
			(Recorder as any).getPermission().then(() => {
				console.log("给权限了");
			}, (error: any) => {
				console.log(`${error.name} : ${error.message}`);
			});
		}

		// handleData
		const blobsData: any = ref(null);
		function handleData () {
			//
			blobsData.value = recorder.getWAVBlob();
			console.log(blobsData.value, 123);

		}


		return {
			start,
			stop,
			bofang,
			handleData,
			blobsData
		};
	}
});
</script>

<style lang="scss" scoped>

</style>
