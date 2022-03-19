import Recorder from "js-audio-recorder";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";

interface IShimsRecorder extends Recorder {
  // js-audio-recorder 的 ts 文件缺少的了该实例方法的类型声明
  getPermission (): Promise<void>;
}

class PCMRecorder {
  public isBrowserCanRecord = false;
  private hasRecordPermission = false;
  public recorder: IShimsRecorder | null = null;
  public fileName = "";

  constructor () {
    try {
      this.recorder = new Recorder({
        // 声纹识别使用的采样配置如下
        sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
        sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，chrome是48000
        numChannels: 1 // 声道，支持 1 或 2， 默认是 1.
      }) as IShimsRecorder;
      this.isBrowserCanRecord = true;
    } catch (e) {
      console.error("初始化 js-audio-recorder 实例失败:", e);
      this.isBrowserCanRecord = false;
    }
  }

  /**
   * 检查浏览器是否能进行录音
   * 需要检查下面:
   * 1. 是否有可用麦克风
   * 2. 是否有权限使用麦克风
   * 3. 浏览器不支持声音采集
   * @return {boolean}
   */
  public getPermission (): Promise<boolean> | never {
    if (this.recorder) {
      return (Recorder as any).getPermission().then(() => {
        this.hasRecordPermission = true;
        return true;
      }, (error: any) => {
        if (error.code === 8 && error.name === "NotFoundError") {
          ElMessage.info("无可用麦克风");
          this.hasRecordPermission = false;
        } else if (error.code === 0 && error.name === "NotAllowedError") {
          ElMessage.info("浏览器无权限使用麦克风，请进行麦克风授权");
          this.hasRecordPermission = false;
        } else {
          ElMessage.info("浏览器无权限使用麦克风");
          console.error("js-audio-recorder getPermission() 失败:", error);
          this.hasRecordPermission = false;
        }
        return false;
      });
    } else {
      throw Error("创建 js-audio-recorder 实例失败, 因此无法判断是否有权限");
    }
  }

  /**
   * 开始录音
   * @return {Promise<void>}
   */
  public async startRecord () {
    // 如果 recorder 调用 start() 后没有 stop() 就开始下一次 start() ,会抛异常
    // 所以开始前一定要先 stop
    try {
      this.stopRecord();
    } catch (e) { /* 未开始时调用 stop 会抛异常 */ }
    await this.recorder?.start().then(() => {
      this.fileName = `${dayjs().format("YYYYMMDDHHmmss")  }`;
      console.log(this.fileName, "开始录音文件名称");
    }, (err: any) => {
      console.log("录音出错了", err);
    });
  }

  /**
  * 结束录音
  */
  public stopRecord () {
    // eslint-disable-next-line no-unused-expressions
    this.recorder?.stop();
  }

  /**
   * 将 PCM 二进制数据放进 FormData 对象中
   * @return {FormData}
   */
  public getPCMFormData () {
    if (this.recorder) {
      // const PCM_MIME_TYPE = 'audio/wave'
      const blob: Blob = this.recorder.getWAVBlob();
      // const blobs = new Blob([blob], { type: PCM_MIME_TYPE }) // blob 默认的 type 是 application/octet-stream
      const formData = new FormData();

      const file = new File([blob], this.fileName);
      formData.append("file", file);
      return { filesData: formData, fileName: this.fileName };
    } else {
      throw Error("getPCMFormData() 失败: 未初始化 js-audio-recorder 实例");
    }
  }

  /**
   * 销毁实例
   */
  public destroyRecorder () {
    if (this.recorder) {
      this.recorder.destroy().then(() => {
        this.recorder = null;
      });
    }
  }
}

export const pcmRecorder = new PCMRecorder();
