<template>
  <div
    class="search-highlight"
    v-html="contentShow"
  />
</template>
<script lang="ts">
import {
	defineComponent,
	computed,
	watch,
	nextTick,
	onBeforeUnmount,
	ref
} from "vue";
const PLUGIN_FLAG = "search-hightlight_by_mumaa";

export default defineComponent({
	components: {
	},
	props: {
		content: {
			type: String,
			default: ""
		},
		keyword: {
			type: String,
			default: ""
		},
		highlightStyle: {
			type: String,
			default: "background: #ffff00"
		},
		currentStyle: {
			type: String,
			default: "background: #ffff00"
		},
		regExp: {
			type: Boolean,
			default: false
		}
	},
	emits: ["current-change", "match-count-change", "font-dom-style"],
	setup (props, { emit }) {
		const lightIndex = ref(0); // 第几个高亮
		const matchCount = ref(0); // 匹配到的个数
		const contentShow = ref("");
		const random = ref(`${Math.random()}`.slice(2));

		const watchString = computed(() => {
			return [props.content, props.keyword];
		});
		const watchStyle = computed(() => {
			return [lightIndex.value, props.highlightStyle, props.currentStyle];
		});
		const flag = computed(() => {
			// return `${PLUGIN_FLAG}${random.value}`
			return `${PLUGIN_FLAG}`;
		});
		const styleSelector = computed(() => {
			return `style[${flag.value}]`;
		});

		watch(() => watchString.value, () => {
			replaceKeywords();
		}, { immediate: true });
		watch(() => watchStyle.value, () => {
			setStyle();
		}, { immediate: true });
		watch(() => lightIndex.value, () => {
			emit("current-change", lightIndex.value);
		}, { immediate: true });
		watch(() => matchCount.value, () => {
			emit("match-count-change", matchCount.value);
		}, { immediate: true });

		onBeforeUnmount(() => {
			clearStyle();
		});

		function getTextNodeList (dom: any) {
			const nodeList = [...dom.childNodes];
			const textNodes = [];
			while (nodeList.length) {
				const node = nodeList.shift();
				if (node.nodeType === node.TEXT_NODE) {
					node.wholeText && textNodes.push(node);
				} else {
					nodeList.unshift(...node.childNodes);
				}
			}
			return textNodes;
		}

		function getTextInfoList (textNodes: any) {
			let length = 0;
			const textList = textNodes.map((node: any) => {
				const startIdx = length;
				const endIdx = length + node.wholeText.length;
				length = endIdx;
				return {
					text: node.wholeText,
					startIdx,
					endIdx
				};
			});
			return textList;
		}

		function getMatchList (content: any, keyword: string) {
			if (!props.regExp) {
				const characters: any = [..."\\[](){}?.+*^$:|"].reduce(
					// eslint-disable-next-line no-sequences
					(r: any, c: any) => ((r[c] = true), r),
					{}
				);
				keyword = keyword
					.split("")
					.map((s) => (characters[s] ? `\\${s}` : s))
					.join("[\\s\\n]*");
			}
			const reg = new RegExp(keyword, "gmi");
			const matchList = [];
			let match = reg.exec(content);
			while (match) {
				matchList.push(match);
				match = reg.exec(content);
			}
			return matchList;
		}

		function replaceMatchResult (textNodes: any, textList: any, matchList: any) {
			// 对于每一个匹配结果，可能分散在多个标签中，找出这些标签，截取匹配片段并用font标签替换出
			for (let i = matchList.length - 1; i >= 0; i--) {
				const match = matchList[i];
				const matchStart = match.index;
				const matchEnd = matchStart + match[0].length; // 匹配结果在拼接字符串中的起止索引
				// 遍历文本信息列表，查找匹配的文本节点
				for (let textIdx = 0; textIdx < textList.length; textIdx++) {
					const { text, startIdx, endIdx } = textList[textIdx]; // 文本内容、文本在拼接串中开始、结束索引
					if (endIdx < matchStart) continue; // 匹配的文本节点还在后面
					if (startIdx >= matchEnd) break; // 匹配文本节点已经处理完了
					let textNode = textNodes[textIdx]; // 这个节点中的部分或全部内容匹配到了关键词，将匹配部分截取出来进行替换
					const nodeMatchStartIdx = Math.max(0, matchStart - startIdx); // 匹配内容在文本节点内容中的开始索引
					const nodeMatchLength =
						Math.min(endIdx, matchEnd) - startIdx - nodeMatchStartIdx; // 文本节点内容匹配关键词的长度
					if (nodeMatchStartIdx > 0) { textNode = textNode.splitText(nodeMatchStartIdx); } // textNode取后半部分
					if (nodeMatchLength < textNode.wholeText.length) { textNode.splitText(nodeMatchLength); }
					const font = document.createElement("font");
					font.setAttribute(flag.value, `${i + 1  }`);
					font.innerText = text.substr(nodeMatchStartIdx, nodeMatchLength);
					textNode.parentNode.replaceChild(font, textNode);
				}
			}
		}

		function replaceKeywords () {
			let errFlag = false;
			if (props.regExp) {
				try {
					const reg = new RegExp(props.keyword);
					if (reg.test("")) errFlag = true;
				} catch (err) {
					errFlag = true;
				}
			}
			if (errFlag || !props.keyword) {
				matchCount.value = 0;
				lightIndex.value = 0;
				contentShow.value = props.content;
				return;
			}
			const div = document.createElement("div");
			div.innerHTML = props.content;
			const textNodes = getTextNodeList(div);
			const textList: [] = getTextInfoList(textNodes);
			const content = textList.map(({ text }) => text).join("");
			const matchList = getMatchList(content, props.keyword);
			matchCount.value = matchList.length;
			lightIndex.value = matchCount.value ? 1 : 0;
			replaceMatchResult(textNodes, textList, matchList);
			contentShow.value = div.innerHTML;
		}

		function scrollTo (index: number) {
			nextTick(() => {
				const node = document.querySelector(`font[${flag.value}='${index}']`);
				if (node) {
					lightIndex.value = index;
					node.scrollIntoView();
				}
			});
		}

		function searchNext () {
			nextTick(() => {
				const idx = lightIndex.value >= matchCount.value ? 1 : lightIndex.value + 1;
				scrollTo(idx);
			});
		}
		function searchLast () {
			nextTick(() => {
				const idx = lightIndex.value <= 1 ? matchCount.value : lightIndex.value - 1;
				scrollTo(idx);
			});
		}

		function setStyle () {
			let style: any = document.head.querySelector(styleSelector.value);
			if (!style) {
				style = document.createElement("style");
				style.setAttribute(flag.value, 1);
			}
			style.innerText = `font[${flag.value}]{${props.highlightStyle}}font[${flag.value}='${lightIndex.value}']{${props.currentStyle}}`;
			emit("font-dom-style", `${flag.value}=${lightIndex.value}`);
			document.head.appendChild(style);
		}

		function clearStyle () {
			const style = document.head.querySelector(styleSelector.value);
			style && document.head.removeChild(style);
		}
		return {
			searchLast,
			searchNext,
			contentShow
		};
	}
});
</script>

<style lang="scss" scoped>
.search-highlight {
  position: relative;
  p {
    position: absolute;
  }
}
</style>
