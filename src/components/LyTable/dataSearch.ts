import chunk from "lodash/chunk";
/**
 * @description  前端分页
 * @param {array} origin
 * @param {number} param1
 * @param {number} size
 * @returns {array}
 */

export default function (origin: any[], { cur, size }: { cur: number; size: number }): Array<any> {
  cur = cur < 1 ? 1 : cur;
  size = size || 10;
  return chunk(origin, size)[cur - 1] || [];
}
