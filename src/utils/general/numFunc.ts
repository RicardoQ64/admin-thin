export const sumWithNull = arr => {
  return arr.reduce((acc, val) => {
    if (val) {
      return acc + Number(val);
    } else {
      return acc + 0;
    }
  }, 0);
};

export const formatPercent = num => {
  return num.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 2
  });
};
