<template>
  <div class="content-header">
    <el-input
      v-model="keywords"
      placeholder="请输入内容"
      style="width: 360px"
    />
    <el-button @click="handleLast">
      上一步
    </el-button>
    <el-button @click="handleNext">
      下一步
    </el-button>
    <el-button @click="handleSwitch(false)">
      替换
    </el-button>
    <el-input
      v-model="updateValue"
      placeholder="请输入内容"
      style="width: 360px"
    />
    <el-button @click="handleSwitch(true)">
      全部替换
    </el-button>
    <span style="white-space: nowrap;">第{{ currentIndex ? currentIndex : '？' }}项</span>
    <span style="white-space: nowrap; margin-left: 12px;">共{{ totalIndex ? totalIndex : '？' }}项</span>
  </div>
  <div class="content-txt">
    <MyHightLight
      v-if="contentData.length"
      ref="myHightLightRef"
      :content-data="contentData"
      :keywords="keywords"
      @update-mate-num="handleUpdateMateNum"
      @update-content="handleUpdateContent"
      @send-content-index="handleSendContentIndex"
    />
  </div>
</template>
<script lang="ts">
import {
	defineComponent,
	ref,
} from "vue";

import MyHightLight from "./components/MyHightLight.vue";
import { jsonData } from "./mock";
import type {IJsonDataItem} from "./type";
export default defineComponent({
	components:{
		MyHightLight
	},
	setup (props) {
		const myHightLightRef = ref();
		const currentIndex = ref(0);
		const totalIndex = ref(0);
		const contentIndex = ref(0);
		const keywords = ref("");
		const updateValue = ref("");
		const contentData = ref<IJsonDataItem[]>(configContentData());

		function configContentData () {
			const arr: IJsonDataItem[] = [];
			let index = 0;
			jsonData.forEach(t => {
				arr.push({
					startTime: t.startTime,
					endTime: t.endTime,
					role: t.role,
					sentence: t.sentence,
					index: index++
				});
			});
			return arr;
		}

		function handleNext () {
			if (!keywords.value) return;
			if (!totalIndex.value) return;
			if (currentIndex.value >= totalIndex.value) {
				currentIndex.value = 1;
			} else {
				currentIndex.value++;
			}
			myHightLightRef.value.currentHeightLight(currentIndex.value, true);
		}
		function handleLast () {
			if (!keywords.value) return;
			if (!totalIndex.value) return;
			if (currentIndex.value <= 1) {
				currentIndex.value = totalIndex.value;
			} else {
				currentIndex.value--;
			}
			myHightLightRef.value.currentHeightLight(currentIndex.value, false);
		}
		function handleSwitch (flag: boolean) {
			if (flag) {
				if (!updateValue.value) return;
				contentData.value.forEach(t => {
					t.sentence.text = t.sentence.text.replace(keywords.value, updateValue.value);
				});
			} else {
				const txt = contentData.value[contentIndex.value].sentence.text;
				contentData.value[contentIndex.value].sentence.text = txt.replace(keywords.value, updateValue.value);
				myHightLightRef.value.heightLightFn(keywords.value);
			}
		}

		function handleUpdateContent (value: any) {
			contentData.value[value.index].sentence.text = value.txt;
		}
		function handleUpdateMateNum (value: any) {
			totalIndex.value = value.total;
			currentIndex.value = totalIndex.value ? value.current : 0;
		}
		function handleSendContentIndex (index: number) {
			contentIndex.value = index;
		}
		return {
			keywords,
			updateValue,
			jsonData,
			contentData,
			currentIndex,
			totalIndex,
			myHightLightRef,

			handleNext,
			handleLast,
			handleSwitch,
			handleUpdateMateNum,
			handleUpdateContent,
			handleSendContentIndex
		};
	}
});
</script>

<style lang="scss" scoped>
.content-header {
  display: flex;
  align-items: center;
  width: 600px;
}
.content-txt {
  height: 82vh;
  overflow-y: auto;
}
</style>
