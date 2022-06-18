import CryptoJS from "crypto-js";

// ArrayBuffer 类型转 WordArray
const ArrayBufferToWordArray = (arrayBuffer: any) => {
  const u8 = new Uint8Array(arrayBuffer, 0, arrayBuffer.byteLength);
  const len = u8.length;
  const words: any = [];
  for (let i = 0; i < len; i += 1) {
    words[i >>> 2] |= (u8[i] & 0xff) << (24 - (i % 4) * 8);
  }
  return CryptoJS.lib.WordArray.create(words, len);
};
// WordArray  类型转 ArrayBuffer
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
const AESDecData = (data: CryptoJS.lib.WordArray, key: string, iv: string) => { // 这里的data是WordBuffer类型的数据
  try {
    // key 用 Base64 编码
    const bKey = CryptoJS.enc.Base64.parse(key);
    // 偏移向量用 utf-8 编码
    const bIv = CryptoJS.enc.Utf8.parse(iv);
    const decrypt = CryptoJS.AES.decrypt(
      CryptoJS.lib.CipherParams.create({ ciphertext: data }),
      bKey,
      {
        mode: CryptoJS.mode.CBC,
        iv: bIv,
        padding: CryptoJS.pad.Iso10126
      }
    );
    const arrayBuffer = WordArrayToArrayBuffer(decrypt);
    return arrayBuffer;
  } catch (error) {
    console.log(error);
  }
};

async function file2ArrayBuffer (data: File): Promise<ArrayBuffer> {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(data);
    reader.onload = event => {
      const arrayBuffer = event.target!.result as ArrayBuffer;
      resolve(arrayBuffer);
    };
  });
}
/**
 * AES 解密文件
 * 对加密空间的文件进行解密
 * @return 显示音频、视频、图片、PDF等文件的 url
 */
export async function decryptFileData (fileData: Blob | File, key: string): Promise<{ blobURL: string; decryptedFileData: null | Blob}> {
  let arrayBufferData: ArrayBuffer;
  if (fileData instanceof Blob) {
    arrayBufferData = await fileData.arrayBuffer();
  } else {
    arrayBufferData = await file2ArrayBuffer(fileData);
  }

  const wordBuffer = ArrayBufferToWordArray(arrayBufferData);
  const AESKey = key;
  const AESIv = "67syfl8mqoxt2906";
  let decData: Uint8Array;
  let blobURL = "";
  let decryptedFileData = null;
  try {
    decData = AESDecData(wordBuffer, AESKey, AESIv) as Uint8Array;
    decryptedFileData = new Blob([decData], { type: fileData.type });
    blobURL = URL.createObjectURL(decryptedFileData);
  } catch (error) {
    console.log(error);
  }
  return {
    blobURL,
    decryptedFileData,
  };
}
