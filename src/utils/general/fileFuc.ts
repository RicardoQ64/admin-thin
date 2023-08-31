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

  const wordlist = ["doc", "docx"];
  if (wordlist.some(item => item == suffix)) {
    return "word";
  }

  const pdflist = ["pdf"];
  if (pdflist.some(item => item == suffix)) {
    return "pdf";
  }

  const pptlist = ["ppt", "pptx"];
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
