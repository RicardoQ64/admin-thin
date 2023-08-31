/** 累加数字排除null值 */
export const sumWithNull = arr => {
  return arr.reduce((acc, val) => {
    if (val) {
      return acc + Number(val);
    } else {
      return acc + 0;
    }
  }, 0);
};

/** 转换数字为百分比 */
export const formatPercent = num => {
  return num.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 2
  });
};
