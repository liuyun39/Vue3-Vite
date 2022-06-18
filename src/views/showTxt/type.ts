export interface IJsonDataItem {
  startTime: number;
  endTime: number;
  role: string;
  sentence: {
    confidence: number;
    text: string;
  };
  index: number;
}
