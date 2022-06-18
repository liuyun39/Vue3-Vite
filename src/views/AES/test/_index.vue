<template>
  <div>
    <video
      :src="url"
      controls
    />
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      :limit="1"
      :before-upload="onBeforeUpdate"
    >
      <el-button type="primary">
        Click to upload
      </el-button>
    </el-upload>
  </div>
</template>
<script lang="ts">
import {
	defineComponent,
	ref
} from "vue";
import CryptoJS from "crypto-js";
export default defineComponent({
	components: {
	},
	setup () {
		const url = ref("");

		const ArrayBufferToWordArray = (arrayBuffer: any) => {
			const u8 = new Uint8Array(arrayBuffer, 0, arrayBuffer.byteLength);
			const len = u8.length;
			const words: any = [];
			for (let i = 0; i < len; i += 1) {
				words[i >>> 2] |= (u8[i] & 0xff) << (24 - (i % 4) * 8);
			}
			return CryptoJS.lib.WordArray.create(words, len);
		};

		const WordArrayToArrayBuffer = (wordArray: any) => {
			const { words } = wordArray;
			const { sigBytes } = wordArray;
			const u8 = new Uint8Array(sigBytes);
			for (let i = 0; i < sigBytes; i += 1) {
				const byte = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
				u8[i] = byte;
			}
			return u8;
		};

		// 加密
		const AESEncData = (data: any, key: any, iv?: any) => { // 这里的data是WordBuffer类型的数据
			const bKey = CryptoJS.enc.Hex.parse(key);
			// const bKey = CryptoJS.enc.Utf8.parse(key);
			const bIv = CryptoJS.enc.Hex.parse(iv);
			// const bIv = CryptoJS.enc.Utf8.parse(iv);

			const encrypt = CryptoJS.AES.encrypt(data, bKey, { iv: bIv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Iso10126 });
			const arrayBuffer = WordArrayToArrayBuffer(encrypt.ciphertext);
			return arrayBuffer;
		};

		// 解密
		const AESDecData = (data: CryptoJS.lib.WordArray, key: string, iv: string) => { // 这里的data是WordBuffer类型的数据
			try {
				const bKey = CryptoJS.enc.Base64.parse(key);
				const bIv = CryptoJS.enc.Utf8.parse(iv);

				const decrypt = CryptoJS.AES.decrypt(
					CryptoJS.lib.CipherParams.create({ ciphertext: data }),
					bKey,
					{
						mode: CryptoJS.mode.CBC,
						iv: bIv,
						padding: CryptoJS.pad.Iso10126
					});
				const arrayBuffer = WordArrayToArrayBuffer(decrypt);
				return arrayBuffer;
			} catch (error) {
				console.log(error);
			}
		};

		function onBeforeUpdate (file: any) {
			const reader = new FileReader();
			reader.readAsArrayBuffer(file);
			reader.onload = event => {
				const arrayBuffer = event.target!.result;
				const wordBuffer = ArrayBufferToWordArray(arrayBuffer);

				const AESKey = "XWxNDL/QKJcSxZmY7Nc2X6yZ9xtcZkKBUnOaWBT1wHE=";
				const AESIv = "67syfl8mqoxt2906";
				const encData = AESDecData(wordBuffer, AESKey, AESIv);
				const data = new Blob([encData!]);
				url.value = URL.createObjectURL(data);
			};

			return false;
		}

		return {
			onBeforeUpdate,
			url,
		};
	}
});
</script>

<style lang="scss" scoped>

</style>
