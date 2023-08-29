/** 判断数组是否为空 */
export function isEmptyArray(obj: any): boolean {
  return (
    obj === null ||
    obj === undefined ||
    (Array.isArray(obj) && obj.length === 0)
  );
}
