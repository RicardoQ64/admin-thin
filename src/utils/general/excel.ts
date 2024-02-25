import { utils, writeFile, read } from "xlsx";
import { message } from "../message";

type InputItem = Record<string, any>;

interface FilterOptions {
  required: string[];
  optional?: string[];
  disallowDup?: string[];
}

/** 用于 excel 读取， 检查表头是否符合
 *  data：excel读取后的数组
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

      filteredItem[field] = value.toString();
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

        const filteredWs = ws.filter(row => {
          return Object.values(row).some(value => value !== "");
        });
        resolve(filteredWs);
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

/** 用于excel导出， 制定栏目 */
export const expExcelByCol = (
  list: any[],
  cols: any[],
  fileName = "result",
  sheet = "Sheet1"
) => {
  const newData = list.map(item => {
    const newItem = {};
    cols.forEach(col => {
      newItem[col.label] = item[col.prop];
    });
    return newItem;
  });
  const workSheet = utils.json_to_sheet(newData);
  const workBook = utils.book_new();
  utils.book_append_sheet(workBook, workSheet, sheet);
  writeFile(workBook, fileName + ".xlsx");
};

/** 用于excel导出， 指定栏目 */
export const expExcelAsnCol = (
  list: any[],
  cols: any[],
  fileName = "result",
  sheet = "Sheet1"
): any => {
  const res: string[][] = list.map(item => {
    const arr = [];
    cols.forEach(cols => {
      if (cols.prop) arr.push(item[cols.prop as string]);
    });
    return arr;
  });
  const columns_: string[] = [];
  cols.forEach(col => {
    if (col.prop) columns_.push(col.label);
  });
  res.unshift(columns_);
  const workSheet = utils.aoa_to_sheet(res);
  const workBook = utils.book_new();
  utils.book_append_sheet(workBook, workSheet, sheet);
  writeFile(workBook, fileName + ".xlsx");
};

/** 用于excel导出， 多级表头合并 */
export default class MergeCell {
  private map: Map<any, any>;
  private size: number[];

  headerMerge: any[];
  headerValue: any[];
  bodyMapList: any[];
  bodyValue: any[];
  deep: any;

  constructor(headers: any[], data: any[]) {
    this.headerMerge = [];
    this.headerValue = [];
    this.bodyMapList = [];
    this.map = new Map();
    this.deep = 0;
    this.init(headers, data);
  }

  /** 数据初始化 */
  init(headers: any[], data: any[]) {
    this.size = this.getCellsSize(headers);
    this.getBodyMapList(headers);
    this.mergeHeadersCell(headers, 0, 0);
    this.getHeadersValue(headers, 0, 0);
    this.bodyValue = data.map((item: any) =>
      this.bodyMapList.map((key: any) => item[key])
    );
    this.deep = this.getDeep(headers);
  }

  /** 获取表头最大深度 */
  getDeep(headers: any[]): number {
    return this.map.get(headers)[0];
  }

  /** 根据节点获取深度广度 */
  getCellsSize(list: any[]): number[] {
    if (this.map.has(list)) {
      return this.map.get(list);
    }
    if (list?.length) {
      let rows = -1;
      let cols = list.length - 1;
      list.forEach((item: any) => {
        if (item.children) {
          const size = this.getCellsSize(item.children);
          rows = Math.max(size[0], rows);
          cols += size[1];
        }
      });
      this.map.set(list, [rows + 1, cols]);
      return [rows + 1, cols];
    }
  }

  /** 合并表头 */
  mergeHeadersCell(headers: any[], row: number, col: number) {
    for (let i = 0, len = headers.length; i < len; i++) {
      const cell = headers[i];
      if (!cell.children?.length) {
        if (row !== this.size[0]) {
          this.headerMerge.push({
            s: { r: row, c: col + i },
            e: { r: this.size[0], c: col + i }
          });
        }
      } else {
        const size = this.map.get(cell.children);
        this.headerMerge.push({
          s: { r: row, c: col + i },
          e: { r: row, c: col + size[1] + i }
        });
        this.mergeHeadersCell(cell.children, row + 1, col + i);
        col += size[1];
      }
    }
  }

  /** 表头赋值 */
  getHeadersValue(headers: any[], row: number, col: number) {
    if (!this.headerValue[row]) {
      this.headerValue[row] = new Array(col).fill("");
    }
    headers.forEach(header => {
      if (row === this.headerValue.length) {
        this.headerValue.push([]); // 确保有足够的行来添加新值
      }
      if (!header.children) {
        // 对于没有子项的表头，直接赋值
        this.headerValue[row][col] = header.label;
        col++;
      } else {
        this.headerValue[row][col] = header.label;
        const size = this.getCellsSize(header.children);
        // 递归处理子项
        this.getHeadersValue(header.children, row + 1, col);
        col += size[1] + 1; // 更新列索引，跳过当前处理的子项范围
      }
    });
  }

  /** 正文prop对应 */
  getBodyMapList(list: any[]) {
    if (list?.length) {
      list.forEach((item: any) => {
        if (!item.children) {
          this.bodyMapList.push(item.prop);
        } else {
          this.getBodyMapList(item.children);
        }
      });
    }
  }
}

export const expExcelbyBes = (result, fileName = "数据导出") => {
  const link = document.createElement("a"); //创建a标签
  const blob = new Blob([result], {
    type: "application/vnd.ms-excel;charset=utf-8"
  }); //设置文件流
  link.style.display = "none";
  // 设置连接
  link.href = URL.createObjectURL(blob); //将文件流转化为blob地址
  link.download = fileName + ".xlsx";
  document.body.appendChild(link);
  // 模拟点击事件
  link.click(); //设置点击事件
  document.body.removeChild(link);
};
