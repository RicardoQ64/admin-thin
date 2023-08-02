import { addIcon } from "@iconify/vue/dist/offline";

/**
 * 这里存放本地图标，在 src/layout/index.vue 文件中加载，避免在首启动加载
 */

// 本地菜单图标，后端在路由的icon中返回对应的图标字符串并且前端在此处使用addIcon添加即可渲染菜单图标
import HomeFilled from "@iconify-icons/ep/home-filled";
import InformationLine from "@iconify-icons/ri/information-line";
import Lollipop from "@iconify-icons/ep/lollipop";
import RefreshRight from "@iconify-icons/ep/refresh-right";
import Search from "@iconify-icons/ep/search";
import More from "@iconify-icons/ep/more-filled";
import Delete from "@iconify-icons/ep/delete";
import Edit from "@iconify-icons/ep/edit";
import EditPen from "@iconify-icons/ep/edit-pen";
import Refresh from "@iconify-icons/ep/refresh";
import Menu from "@iconify-icons/ep/menu";
import Download from "@iconify-icons/ep/download";
import Upload from "@iconify-icons/ep/upload";
import OfficeBuilding from "@iconify-icons/ep/office-building";
import Place from "@iconify-icons/ep/place";
import Coin from "@iconify-icons/ep/coin";
import Guide from "@iconify-icons/ep/guide";
import Paperclip from "@iconify-icons/ep/paperclip";
import UploadFilled from "@iconify-icons/ep/upload-filled";
import PieChart from "@iconify-icons/ep/pie-chart";
import Warning from "@iconify-icons/ep/warning";
import ElementPlus from "@iconify-icons/ep/element-plus";

addIcon("homeFilled", HomeFilled);
addIcon("informationLine", InformationLine);
addIcon("lollipop", Lollipop);
addIcon("refresh-right", RefreshRight);
addIcon("search", Search);
addIcon("more-filled", More);
addIcon("delete", Delete);
addIcon("edit-pen", EditPen);
addIcon("edit", Edit);
addIcon("refresh", Refresh);
addIcon("menu", Menu);
addIcon("download", Download);
addIcon("upload", Upload);
addIcon("office-building", OfficeBuilding);
addIcon("place", Place);
addIcon("coin", Coin);
addIcon("guide", Guide);
addIcon("paperclip", Paperclip);
addIcon("upload-filled", UploadFilled);
addIcon("pie-chart", PieChart);
addIcon("warning", Warning);
addIcon("element-plus", ElementPlus);
