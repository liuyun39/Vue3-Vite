
import { writeFile, utils } from "xlsx";
import type { WorkBook} from "xlsx";

/**
 * 导出表格
 * @param array
 *  const array = selectData.value.map(i => {
 *     const rs: Record<string, string | number> = {}
 *     jtTableConfig.forEach(e => {
 *       rs[e.label] = i[e.prop as keyof typeof i]
 *     })
 *     return rs
 *  })
 * @param fileName
 * @param sheetName
 * @returns
 * use  exportExcelFile(array)
 *
 */
export function exportExcelFile (array: any[], fileName = "笔录统计表.xlsx", sheetName = "sheet") {
  const jsonWorkSheet = utils.json_to_sheet(array);
  const workBook: WorkBook = {
    SheetNames: [sheetName],
    Sheets: {
      [sheetName]: jsonWorkSheet,
    }
  };
  return writeFile(workBook, fileName);
}
