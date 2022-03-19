import type { ElDatePicker, ElInput, ElSelect } from "element-plus";

/**
 * JtFilter 配置参数项
 *
 * label: el-form-item label 属性
 *
 * prop:  1. el-form-item prop 属性
 *        2. 通过 v-model="filter[prop]" 为具体的表单项设置双向绑定的值(含初始值)
 *
 *        类型: 通过泛型参数, 可设置为表单参数对象的 keys 组成的联合类型,
 *             保证外部传入的表单 config 中的 prop 字段和外部传入的表单参数对象字段一致
 *
 *             使用示例:
 *                interface FilterParams {
 *                  userName: string
 *                  roleId: string
 *                }
 *
 *                const params: FilterParams = {
 *                  userName: '',
 *                  roleId: '',
 *                }
 *
 *                const filterConfig: JtFilterConfig<keyof FilterParams>[] = [
 *                  { prop: 'userName', ...},
 *                  { prop: 'role', ...},
 *                ]
 *                // prop 的值设为 role, 不属于联合类型 keyof FilterParams
 *                // TS会提示
 *                // TS 2322: Types of property 'prop' are incompatible.
 *                //            Type '"role"' is not assignable to type 'userName' | 'roleId'.
 *                // 可以有效避免某些情况下修改了 params 的字段后, filterConfig 忘了修改的问题
 *                // 通过 TS 类型推导, 写 config 的 prop 时也能自动补全, 很方便
 *
 *
 * tag: component tag, 如 el-input, div,
 *
 * options: 如果 tag 是 el-select, 这里传入的 options 用来循环生成 el-option
 *
 * optionLabelKey: 通过 v-for="option in options" 生成 el-option 时, 需要确定 el-option 的 label, value 值
 *                 通过 optionLabelKey, optionValueKey 从 option 动态取值, 伪代码:
 *
 *                 <el-option
 *                   :label="option[optionLabelKey]"
 *                   :value="option[optionValueKey]"
 *                  />
 *
 * optionValueKey: 类似 optionLabelKey
 *
 * extraOption: 通过 v-bind="extraOption" 传给具体表单子项组件
 *              伪代码: <el-input v-bind="extraOption" />
 *
 * defaultVal: 用来在父组件中生成表单初始值时使用
 *             伪代码: const initialFilter = getDefaultFilter(filterConfig, 'defaultVal'), 会从 filterConfig.defaultVal 取值
 *
 */
export type ILyFilterInputItem<K = string> = {
  label: string;
  prop: K;
  tag?: string;
  options?: any[];
  extraOption?: Partial<ElInput> | Partial<ElDatePicker> | Partial<ElSelect> | Dictionary<unknown>;
  defaultVal?: any;
  optionLabelKey?: string;
  optionValueKey?: string;
  optionTag?: any; // TODO
}

export type ILyFilterButtonItem<F> = {
  role?: "reset" | "submit" | "export";
  action?: (filter: F) => void;
}

export interface ILyFilterConfig {
  input: ILyFilterInputItem[];
  button?: ILyFilterButtonItem[];
}
