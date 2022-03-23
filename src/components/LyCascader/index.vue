<template>
  <el-popover
    v-model:visible="showState"
    placement="bottom"
    popper-class="fz-dept-cascader--wrapper">
    <template #reference>
      <div class="dept-cascader--body">
        <el-input
          ref="elInputRef"
          :placeholder="selectedDeptIds.length ? '' : placeholder"
          readonly
          clearable>
          <template #suffix>
            <el-icon
              style="cursor: pointer;"
              @click="onClear">
              <CircleClose />
            </el-icon>
          </template>
        </el-input>
        <div
          v-show="selectedDepts.length"
          class="tags-wrapper">
          <el-tag
            class="tags-wrapper--item"
            closable
            @close="onCloseFirst">
            {{ selectedDepts[0].name }}
          </el-tag>
          <el-tag
            v-if="selectedDepts.length > 1"
            style="margin-left: 10px;">
            +{{ selectedDepts.length - 1 }}
          </el-tag>
        </div>
      </div>
    </template>
    <div class="cascader-wrapper">
      <el-scrollbar :height="300">
        <ul class="cascader-col">
          <li
            v-for="item in options"
            :key="item.id"
            class="cascader-cell"
            :class="{
              'is-checked': selectedRadioNode?.id === item.id
            }"
            @mouseenter="onMouseEnter(item)"
            @click="onRadioChange(item)">
            <SvgIcon
              v-if="selectedDeptIds.includes(item.id)"
              icon-class="radio_checked" />
            <SvgIcon
              v-else
              icon-class="radio_unchecked" />
            <span class="cascader-cell__text">{{ item.name }}</span>
            <el-icon v-if="item.children?.length">
              <ArrowRight />
            </el-icon>
          </li>
        </ul>
      </el-scrollbar>
      <el-scrollbar :height="300">
        <ul class="cascader-col">
          <li
            v-for="item in displayRadioNode?.children"
            :key="item.id"
            class="cascader-cell"
            :class="{
              'is-checked': selectedDeptIds.includes(item.id)
            }"
            @click="onCheckChange(item)">
            <SvgIcon
              v-if="selectedDeptIds.includes(item.id)"
              icon-class="check_box_checked" />
            <SvgIcon
              v-else
              icon-class="check_box_unchecked" />
            <span class="cascader-cell__text">{{ item.name }}</span>
          </li>
        </ul>
      </el-scrollbar>
    </div>
  </el-popover>
</template>

<script lang="ts">
import { computed, defineComponent, ref, shallowRef, watch } from "vue";
import { ArrowRight, CircleClose } from "@element-plus/icons-vue";
import type { ElInput } from "element-plus";
import type { PropType} from "vue";
import SvgIcon from "@/components/icons/index.vue";

interface IDeptNode {
	id: string;
	parentId?: string;
	weight?: number;
	name?: string;
	createTime?: string;
	sort?: number;
	children?: IDeptNode[];
}


export default defineComponent({
	components: { ArrowRight, CircleClose, SvgIcon },
	props: {
		modelValue: {
			type: Array as PropType<string[]>,
			default: () => []
		},
		options: {
			type: Array as PropType<IDeptNode[]>,
			default: () => []
		},
		placeholder: {
			type: String,
			default: "请选择"
		}
	},
	emits: ["update:modelValue", "handle-change"],
	setup (props, { emit }) {
		const elInputRef = shallowRef<InstanceType<typeof ElInput>>();
		const showState = ref(false);

		const selectedDepts = ref<IDeptNode[]>([]);
		const selectedRadioNode = ref<IDeptNode | undefined>();

		const selectedDeptIds = computed(() => selectedDepts.value.map(i => i.id));
		const displayRadioNode = ref<IDeptNode>();

		function onSelect () {
			showState.value = false;
		}

		function onMouseEnter (item: IDeptNode) {
			displayRadioNode.value = item;
		}

		function onRadioChange (item: IDeptNode) {
			selectedRadioNode.value = item;
			if(item.children?.length) {
				selectedDepts.value = [...item.children];
			} else {
				selectedDepts.value = [item];
			}
			emit("update:modelValue", selectedDeptIds.value);
			emit("handle-change", selectedDeptIds.value);
		}

		function onCheckChange (item: IDeptNode) {
			const idx = selectedDepts.value.findIndex(i => i.id === item.id);
			if(idx != -1) {
				selectedDepts.value.splice(idx, 1);
			} else {
				if(item.parentId === selectedRadioNode.value?.id) {
					selectedDepts.value.push(item);
				} else {
					selectedRadioNode.value = props.options.find(i => i.id === item.parentId);
					selectedDepts.value = [item];
				}
			}
			emit("update:modelValue", selectedDeptIds.value);
			emit("handle-change", selectedDeptIds.value);
		}

		function onCloseFirst () {
			selectedDepts.value.shift();
			emit("update:modelValue", selectedDeptIds.value);
			emit("handle-change", selectedDeptIds.value);
		}

		watch(() => showState.value, (value) => {
			if(value) {
				elInputRef.value?.focus();
			} else {
				elInputRef.value?.blur();
			}
		});

		function onClear () {
			selectedDepts.value = [];
			emit("update:modelValue", selectedDeptIds.value);
			emit("handle-change", selectedDeptIds.value);
		}

		return {
			elInputRef,
			showState,
			selectedDeptIds,
			selectedDepts,
			displayRadioNode,
			selectedRadioNode,
			onSelect,
			onMouseEnter,
			onRadioChange,
			onCheckChange,
			onCloseFirst,
			onClear,
		};
	},
});
</script>

<style lang="scss">
.fz-dept-cascader--wrapper {
  padding: 0 !important;
  width: auto !important;
  .cascader-wrapper {
    display: flex;
    align-items: stretch;
    .el-scrollbar {
      &:not(:first-child) {
        border-left: 1px solid var(--el-border-color-base);
      }
    }
    .cascader-col {
      margin: 0;
      width: 100%;
      list-style: none;
      padding: 0;
    }

    .cascader-cell {
      display: flex;
      align-items: center;
      height: 34px;
      line-height: 34px;
      outline: 0;
      padding: 0 10px 0 20px;
      cursor: pointer;
      &:hover {
        background-color: var(--el-border-color-base);
        color: var(--el-color-primary);
      }
      &.is-displaying {
        .cascader-cell__text {
          color: var(--el-color-primary);
        }
      }
      &.is-checked {
        color: var(--el-color-primary);
      }
      &__text {
        flex: 1;
        margin: 0 10px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
.dept-cascader--body {
  position: relative;
  width: 300px;
  .tags-wrapper {
    position: absolute;
    top: 0;
    left: 10px;
    right: 24px;
    height: 32px;
    display: flex;
    align-items: center;
    &--item {
      max-width: 220px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

</style>
