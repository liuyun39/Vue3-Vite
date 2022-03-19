<template>
  <div class="ly-filter">
    <el-form
      ref="formRef"
      v-bind="$attrs"
      :model="filterState">
      <el-row class="ly-filter__container">
        <el-col
          v-for="item in inputConfig"
          :key="item.prop"
          class="ly-filter__item"
          :span="8">
          <el-form-item
            :label="item.label"
            :prop="item.prop">
            <component
              :is="item.tag || 'el-input'"
              v-model="filterState[item.prop]"
              class="ly-filter__input"
              v-bind="item.extraOption || {}">
              <component
                :is="item.optionTag || item.tag === 'el-select'? 'el-option': ''"
                v-for="option in (item.options || [])"
                :key="option[item.optionValueKey || 'value']"
                :label="option[item.optionLabelKey || 'label']"
                :value="option[item.optionValueKey || 'value']">
                {{ option[item.optionLabelKey || 'label'] }}
              </component>
            </component>
          </el-form-item>
        </el-col>
        <slot
          name="operations"
          :filter="filterState" />
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ref, watch, defineComponent, onMounted, nextTick, toRefs} from "vue";
import type { PropType} from "vue";
import type { ElForm } from "element-plus";
import type{ Callback } from "element-plus/es/components/form/src/form.vue";
import type { ILyFilterConfig } from "./type";
import type { Dictionary } from "lodash";

export default defineComponent({
	name: "JtFilter",
	props: {
		config: {
			type: Object as PropType<ILyFilterConfig>,
			required: true
		},
		modelValue: {
			type: Object as PropType<Dictionary<unknown>>,
			required: true
		}
	},
	emits: ["update:modelValue"],
	setup (props, { emit }){
		const formRef = ref<InstanceType<typeof ElForm>>();

		const patchDefaultValue: Dictionary<unknown> = {};

		const inputConfig = toRefs(props.config).input;
		inputConfig.value.forEach(item => {
			// 表单重置时，若无初始值，日期范围值会重置会重置为[undefined]，导致组件显示错误
			if(
				["el-date-picker"].includes(`${item.tag  }`)
				&& (item.extraOption?.type || "").match(/range/i)
			){
				if(!props.modelValue?.[item.prop]){
					patchDefaultValue[item.prop] = [];
				}
			}
		});
		const filterState = ref<Dictionary<unknown>>(Object.assign(
			{},
			props.modelValue,
			patchDefaultValue
		));
		const validate = ref<((callback?: Callback | undefined) => Promise<boolean> | undefined) | undefined>();

		const resetFilter = () => {
			if(formRef.value){
				formRef.value.resetFields();
				nextTick(formRef.value.clearValidate);
			}
		};

		watch(filterState, (val: unknown) => {
			emit("update:modelValue", val);
		}, {
			deep: true,
			immediate: true
		});
		onMounted(()=> {
			if (validate.value === undefined) return;
			validate.value = formRef.value?.validate;
		});
		return {
			formRef,
			filterState,
			resetFilter,
			inputConfig
		};
	}
});
</script>

<style scoped lang="scss">
.ly-filter{
  ::v-deep .ly-filter__container {
    .ly-filter__item {
      display: inline-block;
      float: none;
      vertical-align: middle;
    }
    .ly-filter__input{
      &.el-date-editor.el-input__inner,
      &.el-select {
          width: 100%;
      }
    }
  }
}
</style>
