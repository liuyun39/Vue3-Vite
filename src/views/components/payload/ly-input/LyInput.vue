<template>
  <div class="input-content">
    <div class="input-content--left">
      <input
        v-model="formData.min"
        type="text"
        placeholder="最小"
        maxlength="3"
        @blur="handleBlur('min')"
      >
    </div>
    <div class="input-content--right">
      <input
        v-model="formData.max"
        type="text"
        placeholder="最大"
        maxlength="3"
        @blur="handleBlur('max')"
      >
    </div>
  </div>
</template>
<script lang="ts">
import {
	defineComponent,
	nextTick,
	reactive,
	ref,
} from "vue";

import { ElForm, ElMessageBox, ElMessage } from "element-plus";
export default defineComponent({
	components:{
	},
	setup (props) {
		const formData = ref({
			min: undefined,
			max: undefined
		});

		function validateFn (value?: string) {
			if (!value) return;
			let flag = false;
			const reg = /^[1-9]|[0-9][0-9]$/;
			if (reg.test(value)) {
				flag = true;
			}
			return flag;
		}

		function handleBlur (type: string) {
			if (!validateFn(formData.value.min)) {
				formData.value.min = undefined;
			}
			if (!validateFn(formData.value.max)) {
				formData.value.max = undefined;
			}
			if (formData.value.min && formData.value.max) {
				if (parseInt(formData.value.min) > parseInt(formData.value.max)) {
					ElMessage.info("最小值不能大于最大值");
				}
			}
		}
		return {
			formData,

			handleBlur
		};
	}
});
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
input {
  outline: none;
  border: 1px solid #ccc;
  text-align: center;
  margin: 0;
  padding: 0;
  font-size: 14px;
  color: var(--el-input-font-color);
  width: 100px;
}

input::-webkit-input-placeholder {
  color: #c0c5ce;
  font-size: 14px;
}
input::-moz-placeholder {
  color: #c0c5ce;
  font-size: 14px;
}
input:-moz-placeholder {
  color: #c0c5ce;
  font-size: 14px;
}


.input-content {
  display: flex;
  justify-content: flex-start;

  &--left {
    position: relative;
    &::after {
      content: '~';
      position: absolute;
      right: -2px;
      top: 3px;
    }
    input {
      border-right: none;
      border-radius: 5px 0 0 5px;
      height: 30px;
    }
  }

  &--right {
    input {
      border-left: none;
      border-radius: 0 5px 5px 0;
      height: 30px;
    }
  }
}
</style>
