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

    <div>-----------------</div>
    <div class="record-content">
      <div class="record-content--control">
        <el-button v-if="!startRecord">
          开始录音
        </el-button>
        <el-button v-else>
          结束录音
        </el-button>
      </div>
    </div>
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

export default defineComponent({
	components:{
	},
	setup (props) {
		const startRecord = ref(false);



		return {
			startRecord,
		};
	}
});
</script>

<style lang="scss" scoped>
.record-content {
  width: 800px;
  height: 50px;
  border: 1px solid #ccc;

  &--control {
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>
