import { utils, writeFile } from "xlsx";

export const getColumns = (list: any[]): any => {
  const keyList = list.slice(0, 1).reduce((acc, item) => {
    return acc.concat(Object.keys(item));
  }, []);
  const props = keyList.map(item => {
    return { label: item, prop: item };
  });
  return props;
};

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
