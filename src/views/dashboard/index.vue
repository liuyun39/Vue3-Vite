<template>
  <div
    class="home"
    style="margin:1vw;">
    <Button
      type="success"
      style="margin:1vw;"
      @click="getPermission()">
      获取麦克风权限
    </Button>
    <br>
    <Button
      ref="startRecorderRef"
      type="info"
      style="margin:1vw;"
      @click="startRecorder()">
      开始录音
    </Button>
    <Button
      type="info"
      style="margin:1vw;"
      @click="resumeRecorder()">
      继续录音
    </Button>
    <Button
      type="info"
      style="margin:1vw;"
      @click="pauseRecorder()">
      暂停录音
    </Button>
    <Button
      type="info"
      style="margin:1vw;"
      @click="stopRecorder()">
      结束录音
    </Button>
    <br>
    <Button
      type="success"
      style="margin:1vw;"
      @click="playRecorder()">
      录音播放
    </Button>
    <Button
      type="success"
      style="margin:1vw;"
      @click="pausePlayRecorder()">
      暂停录音播放
    </Button>
    <Button
      type="success"
      style="margin:1vw;"
      @click="resumePlayRecorder()">
      恢复录音播放
    </Button>
    <Button
      type="success"
      style="margin:1vw;"
      @click="stopPlayRecorder()">
      停止录音播放
    </Button>
    <br>
    <Button
      type="info"
      style="margin:1vw;"
      @click="getRecorder()">
      获取录音信息
    </Button>
    <Button
      type="info"
      style="margin:1vw;"
      @click="downPCM()">
      下载PCM
    </Button>
    <Button
      type="info"
      style="margin:1vw;"
      @click="downWAV()">
      下载WAV
    </Button>
    <Button
      type="info"
      style="margin:1vw;"
      @click="getMp3Data()">
      下载MP3
    </Button>
    <br>
    <Button
      type="error"
      style="margin:1vw;"
      @click="destroyRecorder()">
      销毁录音
    </Button>
    <br>
    <div style="width:100%;height:200px;border:1px solid red;">
      <canvas id="canvas" />
      <span style="padding: 0 10%;" />
      <canvas id="playChart" />
    </div>
  </div>
</template>
<script lang="ts">
import {
	defineComponent,
	onMounted,
	reactive,
	ref
} from "vue";

// import { useMediaControls } from "@vueuse/core";
import Recorder from "js-audio-recorder";

export default defineComponent({
	name: "Dashboard",
	components:{
	},
	setup () {

		// const audioRef = ref();
		// const { playing, currentTime, duration, volume } = useMediaControls(audioRef, { 
		// 	src: "https://www.cambridgeenglish.org/images/153149-movers-sample-listening-test-vol2.mp3",
		// });

		// // Change initial media properties
		// onMounted(() => {
		// 	// volume.value = 0.5;
		// 	// currentTime.value = 60;
		// });

		const drawRecordId = reactive<any>(null);
		let oCanvas = reactive<any>(null);
		let ctx = reactive<any>(null);
		const drawPlayId = reactive<any>(null);
		let pCanvas = reactive<any>(null);
		let pCtx = reactive<any>(null);
		onMounted(() => {
			/**
			 * 波浪图配置
			 * */
			//录音波浪
			oCanvas = document.getElementById("canvas");
			ctx = oCanvas.getContext("2d");
			//播放波浪
			pCanvas = document.getElementById("playChart");
			pCtx = pCanvas.getContext("2d");
		});

		const recorder = new Recorder({
			sampleBits: 16,                 // 采样位数，支持 8 或 16，默认是16
			sampleRate: 48000,              // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
			numChannels: 1,                 // 声道，支持 1 或 2， 默认是1
			// compiling: false,(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
		});

		// 绑定事件-打印的是当前录音数据
		recorder.onprogress = function(params) {
			// console.log('--------------START---------------')
			// console.log('录音时长(秒)', params.duration);
			// console.log('录音大小(字节)', params.fileSize);
			// console.log('录音音量百分比(%)', params.vol);
			// console.log('当前录音的总数据([DataView, DataView...])', params.data);
 
			// console.log('--------------END---------------')
		};

		// 开始录音
		const startRecorderRef = ref();
		function startRecorder () {
			recorder.start().then(() => {
				startRecorderRef.value.drawRecord();//开始绘制图片
			}, (error) => {
				// 出错了
				console.log(`${error.name} : ${error.message}`);
			});
		}

		// 继续录音
		function resumeRecorder () {
			recorder.resume();
		}
		// 暂停录音
		const pauseRecorderRef = ref();
		function pauseRecorder () {
			recorder.pause();
			pauseRecorderRef.value.drawRecordId && cancelAnimationFrame(pauseRecorderRef.value.drawRecordId);
			pauseRecorderRef.value.drawRecordId = null;
		}
		// 结束录音
		const stopRecorderRef = ref();
		function stopRecorder () {
			recorder.stop();
			stopRecorderRef.value.drawRecordId && cancelAnimationFrame(stopRecorderRef.value.drawRecordId);
			stopRecorderRef.value.drawRecordId = null;
		}
		// 录音播放
		const playRecorderRef = ref();
		function playRecorder () {
			recorder.play();
			playRecorderRef.value.drawPlay();//绘制波浪图
		}

		// 暂停录音播放
		function pausePlayRecorder () {
			recorder.pausePlay();
		}
		// 恢复录音播放
		const resumePlayRecorderRef = ref();
		function resumePlayRecorder () {
			recorder.resumePlay();
			resumePlayRecorderRef.value.drawPlay();//绘制波浪图
		}
		// 停止录音播放
		function stopPlayRecorder () {
			recorder.stopPlay();
		}
		// 销毁录音
		const destroyRecorderRef = ref();
		function destroyRecorder () {
			recorder.destroy().then(function() {
				// recorder = null;
				destroyRecorderRef.value.drawRecordId && cancelAnimationFrame(destroyRecorderRef.value.drawRecordId);
				destroyRecorderRef.value.drawRecordId = null;
			});
		}
		/**
		 *  获取录音文件
		 * */
		function getRecorder(){
			const toltime = recorder.duration;//录音总时长
			const fileSize = recorder.fileSize;//录音总大小
 
			//录音结束，获取取录音数据
			const PCMBlob = recorder.getPCMBlob();//获取 PCM 数据
			const wav = recorder.getWAVBlob();//获取 WAV 数据
 
			// const channel = recorder.getChannelData();//获取左声道和右声道音频数据
 
		}


		return {
			// audioRef,
			// playing,
			// currentTime,
			// duration
			startRecorder,
			startRecorderRef,
			resumeRecorder,
			pauseRecorderRef,
			pauseRecorder,
			stopRecorderRef,
			stopRecorder,
			playRecorderRef,
			playRecorder,
			pausePlayRecorder,
			resumePlayRecorderRef,
			resumePlayRecorder,
			stopPlayRecorder,
			destroyRecorderRef,
			destroyRecorder,
			getRecorder

		};
	}
});
</script>

<style lang="scss" scoped>

</style>
