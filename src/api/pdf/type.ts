export interface IPosition {
  x: number;
  y: number;
}

export interface ILinesItem {
  location: Array<IPosition>;
  text: string; // 行内容
}

export interface IRegionsItem {
  location: any;
  lines: Array<ILinesItem>; // 行数
}

export interface IPdfJsonRes {
  regions: Array<IRegionsItem>;
  width: number; // 页宽
  height: number; // 页高
  currentPage: number; // 第几页
}
