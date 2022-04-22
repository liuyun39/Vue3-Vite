<template>
    <div class="audio-content">
        <div class="audio-left">
            <el-switch
                v-model="playing" />
            <div class="audio-progress">
                <el-slider
                    v-model="currentTime"
                    :format-tooltip="formatTooltip"
                    :max="duration"
                    style="width: 200px" />
            </div>
        </div>
        <div class="audio-title">
            {{ playing ? '音乐播放中。。。' : '未播放音乐。。。' }}
        </div>
        <audio ref="audioRef" />
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useMediaControls } from "@vueuse/core";

export default defineComponent ({
	components: {
	},
	setup () {
		const audioRef = ref<HTMLAudioElement>();
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
		return {
			playing,
			currentTime,
			duration,
			totalTime,
			audioRef,

			formatTooltip
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
    background-color: #fff;
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
</style>
