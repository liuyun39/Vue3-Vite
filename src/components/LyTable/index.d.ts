import type { ComponentPublicInstance } from "vue";
import type { ElTableColumn } from "element-plus";

type ElTableColumnProps = Partial<Omit<InstanceType<typeof ElTableColumn>, keyof ComponentPublicInstance>>

export interface ITableConfig<T extends string = string, K = any> extends ElTableColumnProps {
  label: string;
  // 通过泛型传入 prop 支持的枚举类型, 保证字段名和接口返回的列表数据字段名一致
  prop: T;
  isSlot?: boolean;
  valueFormatter?: (row: K) => string;
  width?: string | number;
  // [prop: string]: any // 传入 el-column 的其他 prop 属性
}

export interface IDataItem {
  [key: string]: any;
}

export interface IPageReq {
  offset: number;
  count: number;
}

