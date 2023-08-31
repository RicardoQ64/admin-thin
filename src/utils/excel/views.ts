import { utils, writeFile, read } from "xlsx";
import { message } from "../message";

type InputItem = Record<string, any>;

interface FilterOptions {
  required: string[];
  optional?: string[];
  disallowDup?: string[];
}

/** data：excel读取后的数组
 *  required：需要判断的表头字段
 *  optional：数据为选填的字段
 *  disallowDup： 不允许重复的字段
 */
export function filterFields(
  data: InputItem[],
  options: FilterOptions
): InputItem[] | false {
  const filteredData: InputItem[] = [];
  const ToCheck: string[] = options.required.concat(options.optional || []);
  const seenValues: Record<string, Set<any>> = {};

  for (const item of data) {
    const filteredItem: InputItem = {};

    // Check for duplicate values in specified
    // if (options.disallowDup) {
    //   const uniqueValues: Set<any> = new Set();

    //   for (const field of options.disallowDup) {
    //     if (!Object.prototype.hasOwnProperty.call(item, field)) {
    //       continue;
    //     }

    //     const value = item[field];
    //     if (uniqueValues.has(value)) {
    //       console.log(`Duplicate value '${value}' found in field '${field}'.`);
    //       return false;
    //     } else {
    //       uniqueValues.add(value);
    //     }
    //   }
    // }

    for (const field of ToCheck) {
      if (!Object.prototype.hasOwnProperty.call(item, field)) {
        if (!options.optional || options.required.includes(field)) {
          message("表头字段不符合，请检查！", {
            type: "error"
          });
          return false;
        }
        continue;
      }

      const value = item[field];
      if (options.disallowDup && options.disallowDup.includes(field)) {
        if (!seenValues[field]) {
          seenValues[field] = new Set([value]);
        } else if (seenValues[field].has(value)) {
          message(`‘${field}’存在重复值‘${value}’ .`, {
            type: "error"
          });
          return false;
        } else {
          seenValues[field].add(value);
        }
      }

      filteredItem[field] = value;
    }
    filteredData.push(filteredItem);
  }

  return filteredData;
}

/** 读取excel数据，异步方法 */
export const readExcel = async file => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = files => {
      try {
        const data = files.target.result;
        const workbook = read(data, {
          type: "binary"
        });
        const wsname = workbook.SheetNames[0]; // 取第一张表
        const ws = utils.sheet_to_json(workbook.Sheets[wsname]); // 生成json表格内容
        resolve(ws);
      } catch (e) {
        reject(e);
      }
    };
  });
};

/** 用于表头获取 */
export const getColumns = (list: any[]): any => {
  const keyList = list.slice(0, 1).reduce((acc, item) => {
    return acc.concat(Object.keys(item));
  }, []);
  const props = keyList.map(item => {
    return { label: item, prop: item };
  });
  return props;
};

/** 用于excel导出 */
export const expExcel = (
  list: any[],
  fileName = "result",
  sheet = "Sheet1"
): any => {
  const workSheet = utils.json_to_sheet(list);
  const workBook = utils.book_new();
  utils.book_append_sheet(workBook, workSheet, sheet);
  writeFile(workBook, fileName + ".xlsx");
};

/** 用于excel导出， 指定栏目 */
export const expExcelByCol = (
  list: any[],
  col: any[],
  fileName = "result",
  sheet = "Sheet1"
): any => {
  const res: string[][] = list.map(item => {
    const arr = [];
    col.forEach(cols => {
      if (cols.prop) arr.push(item[cols.prop as string]);
    });
    return arr;
  });
  const columns_: string[] = [];
  col.forEach(col => {
    if (col.prop) columns_.push(col.label);
  });
  res.unshift(columns_);
  const workSheet = utils.aoa_to_sheet(res);
  const workBook = utils.book_new();
  utils.book_append_sheet(workBook, workSheet, sheet);
  writeFile(workBook, fileName + ".xlsx");
};
