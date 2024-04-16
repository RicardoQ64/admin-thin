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

/** 判断数组是否为空 */
export function isEmptyArray(obj: any): boolean {
  return (
    obj === null ||
    obj === undefined ||
    (Array.isArray(obj) && obj.length === 0)
  );
}

/** 对日期数据格式转换 => YYYY-MM-DD */
export const dateToStr = date => {
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/** 对日期数据格式转换 => YYYY-MM-DD */
export const datetimeToStr = date => {
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  const hour = dateObject.getHours().toString().padStart(2, "0");
  const minute = dateObject.getMinutes().toString().padStart(2, "0");
  const seconds = dateObject.getSeconds().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
};

/** 对日期数据格式转换 => YYYYMMDDHHmmss */
export const dts2strNoSign = date => {
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  const hour = dateObject.getHours().toString().padStart(2, "0");
  const minute = dateObject.getMinutes().toString().padStart(2, "0");
  const seconds = dateObject.getSeconds().toString().padStart(2, "0");
  return `${year}${month}${day}${hour}${minute}${seconds}`;
};

/** 对日期数据格式转换 => YYYYMMDDHHmm */
export const dt2strNoSign = date => {
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");
  const hour = dateObject.getHours().toString().padStart(2, "0");
  const minute = dateObject.getMinutes().toString().padStart(2, "0");
  return `${year}${month}${day}${hour}${minute}`;
};

/** 文件类型匹配 */
export const matchType = fileName => {
  let suffix = "";
  try {
    const flieArr = fileName.split(".");
    suffix = flieArr[flieArr.length - 1];
  } catch (err) {
    suffix = "";
  }

  const imglist = ["png", "jpg", "jpeg", "bmp", "gif"];
  if (imglist.some(item => item == suffix)) {
    return "image";
  }

  const txtlist = ["txt"];
  if (txtlist.some(item => item == suffix)) {
    return "txt";
  }

  const excelist = ["xls", "xlsx"];
  if (excelist.some(item => item == suffix)) {
    return "excel";
  }

  const wordlist = ["docx"];
  if (wordlist.some(item => item == suffix)) {
    return "word";
  }

  const pdflist = ["pdf"];
  if (pdflist.some(item => item == suffix)) {
    return "pdf";
  }

  const pptlist = ["ppt"];
  if (pptlist.some(item => item == suffix)) {
    return "ppt";
  }

  const videolist = ["mp4", "m2v", "mkv"];
  if (videolist.some(item => item == suffix)) {
    return "video";
  }

  const radiolist = ["mp3", "wav", "wmv"];
  if (radiolist.some(item => item == suffix)) {
    return "radio";
  }

  return "other";
};
