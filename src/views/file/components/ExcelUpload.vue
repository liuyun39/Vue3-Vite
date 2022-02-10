<template>
  <el-dialog
    v-model="showState"
    :title="title"
    width="400px"
    append-to-body
    :close-on-click-modal="false"
    :close-on-press-escape="false">
    <el-upload
      ref="uploadRef"
      :limit="1"
      accept=".xlsx, .xls"
      :headers="headers"
      :action="url"
      :disabled="uploading"
      :on-progress="handleUploadProgress"
      :on-success="handleUploadSuccess"
      :auto-upload="false"
      drag>
      <el-icon style="font-size: 40px;margin-top: 50px;">
        <UploadFilled />
      </el-icon>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip text-center">
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link
            v-if="tempUrl && tempName"
            type="primary"
            :underline="false"
            :href="tempUrl"
            style="font-size:12px;vertical-align: baseline;">
            下载模板
          </el-link>
          <br>
          <p
            v-if="tip"
            style="color: var(--el-color-danger)">
            {{ tip }}
          </p>
        </div>
      </template>
    </el-upload>
    <template #footer>
      <div class="dialog-footer">
        <el-button
          type="primary"
          @click="submitFileForm">
          确 定
        </el-button>
        <el-button @click="showState = false">
          取 消
        </el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog
    v-model="errorVisible"
    title="校验失败数据">
    <el-table :data="errorData">
      <el-table-column
        property="lineNum"
        label="行号"
        width="50" />
      <el-table-column
        property="errors"
        label="错误描述"
        show-overflow-tooltip>
        <template #default="scope">
          <el-tag
            v-for="error in scope.row.errors"
            :key="error"
            type="danger">
            {{ error }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, shallowRef } from "vue";
import { ElMessage } from "element-plus";
import { UploadFilled } from "@element-plus/icons-vue";
import type { ElUpload } from "element-plus";
// import { getTokenFromMemory } from "@/utils/auth";

export default defineComponent({
	components: { UploadFilled },
	props: {
		url: {
			type: String,
			default: "",
		},
		title: {
			type: String,
			default: ""
		},
		tempUrl: {
			type: String
		},
		tempName: {
			type: String
		},
		tip: {
			type: String
		}
	},
	emits: ["on-upload-success"],
	setup (props, { emit }) {
		const showState = ref(false);
		const uploading = ref(false);
		const uploadRef = shallowRef<InstanceType<typeof ElUpload>>();
		const errorVisible = ref(false);
		const errorData = ref<any[]>([]);

		// TODO: 这里 TS 类型出错了， 就先转 unknown 再转 Headers， 进行了强转
		const headers = {
			// authorization: getTokenFromMemory()
		} as unknown as Headers;

		function handleUploadProgress () {
			uploading.value = true;
		}

		function handleUploadSuccess (response: any) {
			uploading.value = false;
			showState.value = false;
			uploadRef.value?.clearFiles();

			// 校验失败
			if (response.code === 1) {
				ElMessage.error("导入失败，以下数据不合法");
				errorVisible.value = true;
				errorData.value = response.data;
			} else {
				ElMessage.success("导入成功");
				emit("on-upload-success");
			}
		}

		function submitFileForm () {
			uploadRef?.value?.submit();
		}

		function show () {
			uploading.value = false;
			showState.value = true;
		}

		return {
			show,
			showState,
			uploading,
			uploadRef,
			headers,

			handleUploadProgress,
			handleUploadSuccess,

			submitFileForm,

			errorVisible,
			errorData,
		};
	},
});

</script>
