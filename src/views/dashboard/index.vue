<template>
  <div>
    <!-- 录音条 -->
    <div class="recode-content">
      <div class="recode-content--left">
        <CircleBar :on-animation="recordering" />
        <span class="recode-time">{{ recorderDuration }}</span>
        <div class="recode-bar">
          <div
            class="recode-voice--size"
            :style="{width: '10px'}"
          />
          <span
            v-for="(item, index) in 66"
            :key="index"
            class="recode-bar--item"
          />
        </div>
      </div>
      <el-button @click="recodeStart">
        开始录音
      </el-button>
    </div>
    <!-- 播放器 -->
    <div class="audio-content">
      <audio
        ref="audioRef"
        style="display: hidden;"
      />
      <div class="audio-left">
        <el-switch v-model="playing" />
        <div class="audio-progress">
          <el-slider
            v-model="currentTime"
            :format-tooltip="formatTooltip"
            :max="duration"
            style="width: 200px"
            @change="playing=true"
          />
        </div>
      </div>
      <div class="audio-title">
        {{ playing ? '音乐播放中。。。' : '未播放音乐。。。' }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import { useMediaControls } from "@vueuse/core";
import { ElMessage } from "element-plus";
import CircleBar from "./components/CircleBar.vue";
import { pcmRecorder } from "./recoder";

export default defineComponent ({
	components: {
		CircleBar
	},
	setup () {
		const audioRef = ref<HTMLAudioElement>();
		const recordering = ref(false);
		const recorderCurrentTime = ref(0);
		const recorderVoiceSize = ref("");

		const { playing, currentTime, duration, volume } = useMediaControls( audioRef, {
			src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
		});

		const totalTime = ref(0);
		onMounted(() => {
			totalTime.value = duration.value;
		});

		function formatTooltip (v: number) {
			return `${addZero((v / 60).toFixed(0))}:${addZero((v % 60).toFixed(0))}`;
		}

		function addZero (v: string) {
			return parseFloat(v) <= 9 ? `0${v}` : v;
		}

		async function recodeStart () {
			const hasPermision = pcmRecorder.getPermission();
			if (!hasPermision) {
				ElMessage.info("请获取浏览器录音权限");
				return;
			}
			await pcmRecorder.startRecord();
			if (pcmRecorder.recorder) {
				pcmRecorder.recorder.onprogress = (params: any) => {
					console.log("录音时长(秒)", params.duration);
					console.log("录音大小(字节)", params.fileSize);
					console.log("录音音量百分比(%)", params.vol);

					recorderVoiceSize.value = params.val;
					recorderCurrentTime.value = parseInt(params.duration);
				};
			}
			recordering.value = !recordering.value;
		}

		const recorderDuration = computed(() => {
			return `
        ${addZero((recorderCurrentTime.value / 60).toFixed(0))}:
        ${addZero((recorderCurrentTime.value % 60).toFixed(0))}`;
		});
		return {
			playing,
			currentTime,
			duration,
			totalTime,
			audioRef,
			recordering,
			recorderDuration,
			recorderVoiceSize,

			formatTooltip,
			recodeStart
		};
	}
});
</script>

<style lang="scss" scoped>
.audio-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 600px;
    margin: auto;
    padding: 0 12px;
    height: 50px;
    background-color: #aaa;
    border-radius: 5px;
    color: #000;
    .audio-left {
      display: flex;
      .audio-progress {
          margin-left: 12px;
      }
    }
    .audio-title {
      display: flex;
      justify-content: start;
    }
}

.recode-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 600px;
  height: 50px;
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  margin: 60px auto;
  padding: 0 12px;
  font-size: 16px;

  &--left {
    display: flex;
    align-items: center;
    .recode-time {
      margin-left: 12px;
    }
    .recode-bar {
      display: flex;
      margin-left: 24px;

      .recode-voice--size {
        width: 50px;
        height: 100%;
        background-color: red;
      }

      &--item {
        width: 2px;
        height: 26px;
        background-color: #868686;
        margin-left: 2px;
      }
    }

  }
}
</style>
