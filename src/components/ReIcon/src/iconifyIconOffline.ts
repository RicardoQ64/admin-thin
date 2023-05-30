import { h, defineComponent } from "vue";
import { Icon as IconifyIcon, addIcon } from "@iconify/vue/dist/offline";

// radix-icons
import dashboardIcon from "@iconify-icons/radix-icons/dashboard";
import CurrencyLine from "@iconify-icons/ri/currency-line";
import FileList from "@iconify-icons/ri/file-list-3-line";
import draftLine from "@iconify-icons/ri/draft-line";
import Database from "@iconify-icons/ri/database-2-line";
import AddFill from "@iconify-icons/ri/add-circle-line";
import deleteBin3Line from "@iconify-icons/ri/delete-bin-3-line";
import lockPasswordLine from "@iconify-icons/ri/lock-password-line";
import gitBranchLine from "@iconify-icons/ri/git-branch-line";
import restartLine from "@iconify-icons/ri/restart-line";
import More2Fill from "@iconify-icons/ri/more-2-fill";
import moneyCnyCircleLine from "@iconify-icons/ri/money-cny-circle-line";
import exchangeCnyFill from "@iconify-icons/ri/exchange-cny-fill";
import exchangeLine from "@iconify-icons/ri/exchange-line";
import NumberLine from "@iconify-icons/ri/numbers-line";
import LineChartLine from "@iconify-icons/ri/line-chart-line";
addIcon("dash-board", dashboardIcon);
addIcon("currency-line", CurrencyLine);
addIcon("file-list", FileList);
addIcon("draft-line", draftLine);
addIcon("database", Database);
addIcon("add-fill", AddFill);
addIcon("delete-bin-3-line", deleteBin3Line);
addIcon("lock-password-line", lockPasswordLine);
addIcon("git-branch-line", gitBranchLine);
addIcon("restart-line", restartLine);
addIcon("more2fill", More2Fill);
addIcon("money-cny-circle-line", moneyCnyCircleLine);
addIcon("exchange-cny-fill", exchangeCnyFill);
addIcon("exchange-line", exchangeLine);
addIcon("numbers-line", NumberLine);
addIcon("line-chart-line", LineChartLine);

// remixicon
import ArrowRightSLine from "@iconify-icons/ri/arrow-right-s-line";
import ArrowLeftSLine from "@iconify-icons/ri/arrow-left-s-line";
import LogoutCircleRLine from "@iconify-icons/ri/logout-circle-r-line";
import InformationLine from "@iconify-icons/ri/information-line";
import ArrowUpLine from "@iconify-icons/ri/arrow-up-line";
import ArrowDownLine from "@iconify-icons/ri/arrow-down-line";
import Bookmark2Line from "@iconify-icons/ri/bookmark-2-line";
import User from "@iconify-icons/ri/user-3-line";
import Lock from "@iconify-icons/ri/lock-fill";
import MenuUnfold from "@iconify-icons/ri/menu-unfold-fill";
import MenuFold from "@iconify-icons/ri/menu-fold-fill";
import Setting from "@iconify-icons/ri/settings-3-line";
import ArrowDown from "@iconify-icons/ri/arrow-down-s-line";
import CloseLeftTags from "@iconify-icons/ri/text-direction-r";
import CloseRightTags from "@iconify-icons/ri/text-direction-l";
import CloseOtherTags from "@iconify-icons/ri/text-spacing";
import CloseAllTags from "@iconify-icons/ri/subtract-line";
import Fullscreen from "@iconify-icons/ri/fullscreen-fill";
import ExitFullscreen from "@iconify-icons/ri/fullscreen-exit-fill";
import nodeTree from "@iconify-icons/ri/node-tree";
import contactsLine from "@iconify-icons/ri/contacts-line";
import groupLine from "@iconify-icons/ri/group-line";
import upload2Fill from "@iconify-icons/ri/upload-2-fill";
addIcon("arrow-right-s-line", ArrowRightSLine);
addIcon("arrow-left-s-line", ArrowLeftSLine);
addIcon("logout-circle-r-line", LogoutCircleRLine);
addIcon("information-line", InformationLine);
addIcon("arrow-up-line", ArrowUpLine);
addIcon("arrow-down-line", ArrowDownLine);
addIcon("bookmark-2-line", Bookmark2Line);
addIcon("user", User);
addIcon("lock", Lock);
addIcon("menu-unfold", MenuUnfold);
addIcon("menu-fold", MenuFold);
addIcon("setting", Setting);
addIcon("arrow-down", ArrowDown);
addIcon("close-left-tags", CloseLeftTags);
addIcon("close-right-tags", CloseRightTags);
addIcon("close-other-tags", CloseOtherTags);
addIcon("close-all-tags", CloseAllTags);
addIcon("fullscreen", Fullscreen);
addIcon("exit-fullscreen", ExitFullscreen);
addIcon("node-tree", nodeTree);
addIcon("contacts-line", contactsLine);
addIcon("group-line", groupLine);
addIcon("upload-2-fill", upload2Fill);

// Material Symbols
import wifiRounded from "@iconify-icons/material-symbols/wifi-rounded";
addIcon("wifi-rounded", wifiRounded);

// Iconify Icon在Vue里本地使用（用于内网环境）https://docs.iconify.design/icon-components/vue/offline.html
export default defineComponent({
  name: "IconifyIconOffline",
  components: { IconifyIcon },
  props: {
    icon: {
      default: null
    }
  },
  render() {
    if (typeof this.icon === "object") addIcon(this.icon, this.icon);
    const attrs = this.$attrs;
    return h(
      IconifyIcon,
      {
        icon: this.icon,
        style: attrs?.style
          ? Object.assign(attrs.style, { outline: "none" })
          : { outline: "none" },
        ...attrs
      },
      {
        default: () => []
      }
    );
  }
});
