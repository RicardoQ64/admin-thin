/**
 * @description ⚠️：此文件仅供主题插件使用，请不要在此文件中导出别的工具函数（仅在页面加载前运行）
 */

import { EpThemeColor } from "../../../public/serverConfig.json";

type MultipleScopeVarsItem = {
  scopeName: string;
  varsContent: string;
};

/** 将vxe默认主题色和ep默认主题色保持一致 */
const vxeColor = EpThemeColor;

/** 预设主题色 */
const themeColors = {
  default: {
    vxeColor,
    subMenuActiveText: "#fff",
    menuBg: "#344058",
    menuHover: "#0960bd",
    subMenuBg: "#404c64",
    subMenuActiveBg: "#0960bd",
    menuText: "rgb(254 254 254 / 65%)",
    sidebarLogo: "#344058",
    menuTitleHover: "#fff",
    menuActiveBefore: "#0960bd"
  },
  light: {
    vxeColor,
    subMenuActiveText: "#409eff",
    menuBg: "#fff",
    menuHover: "#e0ebf6",
    subMenuBg: "#fff",
    subMenuActiveBg: "#e0ebf6",
    menuText: "#7a80b4",
    sidebarLogo: "#fff",
    menuTitleHover: "#333",
    menuActiveBefore: "#4091f7"
  }
};

/**
 * @description 将预设主题色处理成主题插件所需格式
 */
export const genScssMultipleScopeVars = (): MultipleScopeVarsItem[] => {
  const result = [] as MultipleScopeVarsItem[];
  Object.keys(themeColors).forEach(key => {
    result.push({
      scopeName: `layout-theme-${key}`,
      varsContent: `
        $vxe-primary-color: ${themeColors[key].vxeColor} !default;
        $subMenuActiveText: ${themeColors[key].subMenuActiveText} !default;
        $menuBg: ${themeColors[key].menuBg} !default;
        $menuHover: ${themeColors[key].menuHover} !default;
        $subMenuBg: ${themeColors[key].subMenuBg} !default;
        $subMenuActiveBg: ${themeColors[key].subMenuActiveBg} !default;
        $menuText: ${themeColors[key].menuText} !default;
        $sidebarLogo: ${themeColors[key].sidebarLogo} !default;
        $menuTitleHover: ${themeColors[key].menuTitleHover} !default;
        $menuActiveBefore: ${themeColors[key].menuActiveBefore} !default;
      `
    } as MultipleScopeVarsItem);
  });
  return result;
};
