<template>
  <div>
    <div
      v-for="(item, index) in contentHTML"
      :key="index"
      class="content-item"
    >
      <div class="content-item--role">
        {{ item.role }}
      </div>
      <div
        :id="`content-item--${item.index}`"
        class="content-item--info"
        :contenteditable="true"
        @blur="handleBlur($event, index)"
        v-html="item.sentence.text"
      />
    </div>
  </div>
</template>
<script lang="ts">
import {
	defineComponent,
	ref,
	watch,
	nextTick
} from "vue";
import { cloneDeep } from "lodash";

import type {IJsonDataItem} from "../type";
import type {	PropType } from "vue";
export default defineComponent({
	components:{
	},
	props: {
		keywords: {
			type: String,
			default: ""
		},
		contentData: {
			type: Array as PropType<IJsonDataItem[]>,
			default: () => []
		}
	},
	emits: ["update-content", "update-mate-num", "send-content-index"],
	setup (props, {emit}) {
		const total = ref(0);
		const current = ref(0);
		const matchContentArray = ref<IJsonDataItem[]>([]);
		const contentHTML = ref<IJsonDataItem[]>(cloneDeep(props.contentData));
		watch(() => props.contentData, () => {
			contentHTML.value = cloneDeep(props.contentData);
			heightLightFn(props.keywords);
		}, { deep: true });
		watch(() => props.keywords, (newValue) => {
			heightLightFn(newValue);
		});

		function heightLightFn (newValue: string) {
			matchContentArray.value = [];
			total.value = 0;
			for (let i = 0; i < props.contentData.length; i++) {
				const item = props.contentData[i];
				if (item.sentence.text.includes(newValue)) {
					if (newValue) {
						matchContentArray.value.push(item);
						const length = item.sentence.text.replaceAll(newValue, "**").split("**").length;
						total.value = total.value + length - 1;
					}
					contentHTML.value[i].sentence.text = item.sentence.text
						.replaceAll(newValue, `<font color="blue">${newValue}</font>`);
				} else {
					contentHTML.value[i].sentence.text = item.sentence.text;
				}
			}
			emit("update-mate-num", { total: total.value, current: current.value });
		}

		function handleBlur (e: any, index: number) {
			emit("update-content", { txt: e.target.innerText, index });
		}

		function updateFontHtml (index: number, color: string) {
			const oldTxt = props.contentData[index].sentence.text;
			contentHTML.value[index].sentence.text = oldTxt
				.replaceAll(props.keywords, `<font color="${color}">${props.keywords}</font>`);
		}

		function currentHeightLight(index: number, flag: boolean) {
			if (flag) {
				const indexValue = matchContentArray.value[index - 1].index;
				const target = contentHTML.value[indexValue];
				if (index >= 2) {
					const lastIndexValue = matchContentArray.value[index - 2].index;
					const lastTarget = contentHTML.value[lastIndexValue];
					if (lastTarget && lastTarget.sentence) {
						updateFontHtml(lastIndexValue, "blue");
					}
				}
				if (index === 1) {
					const lastIndexValue = matchContentArray.value[total.value - 1].index;
					updateFontHtml(lastIndexValue, "blue");
				}
				if (target && target.sentence) {
					updateFontHtml(indexValue, "red");
					emit("send-content-index", indexValue);
					scrollTo(indexValue);
				}
			} else {
				const indexValue = matchContentArray.value[index - 1].index;
				updateFontHtml(indexValue, "red");
				emit("send-content-index", indexValue);
				scrollTo(indexValue);
				if (index < total.value) {
					const lastIndexValue = matchContentArray.value[index].index;
					updateFontHtml(lastIndexValue, "blue");
				}
				if (index === total.value) {
					const lastIndexValue = matchContentArray.value[0].index;
					updateFontHtml(lastIndexValue, "blue");
				}
			}
		}

		function scrollTo (index: number) {
			nextTick(() => {
				const node = document.querySelector(`#content-item--${index}`);
				if (node) {
					node.scrollIntoView();
				}
			});
		}
		return {
			current,
			total,
			contentHTML,

			handleBlur,
			currentHeightLight,
			heightLightFn
		};
	}
});
</script>

<style lang="scss" scoped>
.content-item {
  &--role {
    cursor: pointer;
  }
  &--info {
    padding: 0 32px;
  }
}
</style>
