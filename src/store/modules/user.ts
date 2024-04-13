import { defineStore } from "pinia";
import { store } from "@/store";
import type { userType } from "./types";
import { routerArrays } from "@/layout/types";
import { resetRouter } from "@/router";
import { storageLocal } from "@pureadmin/utils";
import { getLogin, refreshTokenApi } from "@/api/login";
import type { UserResult, RefreshTokenResult } from "@/api/login";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import { type DataInfo, setToken, removeToken, userKey } from "@/utils/auth";

export const useUserStore = defineStore({
  id: "pure-user",
  state: (): userType => ({
    // 头像
    avatar: storageLocal().getItem<DataInfo<number>>(userKey)?.avatar ?? "",
    // 工号
    userNo: storageLocal().getItem<DataInfo<number>>(userKey)?.user_no ?? "",
    // 用户名
    username: storageLocal().getItem<DataInfo<number>>(userKey)?.username ?? "",
    // 页面级别权限
    roles: storageLocal().getItem<DataInfo<number>>(userKey)?.roles ?? [],
    // 机构号
    orgNo: storageLocal().getItem<DataInfo<number>>(userKey)?.org_no ?? "",
    // 机构名称
    org: storageLocal().getItem<DataInfo<number>>(userKey)?.org ?? "",
    // 电话
    phone: storageLocal().getItem<DataInfo<number>>(userKey)?.phone ?? "",
    // 是否勾选了7天内免登录
    isRemembered: false
  }),
  actions: {
    /** 存储头像 */
    SET_AVATAR(avatar: string) {
      this.avatar = avatar;
    },
    /** 存储工号 */
    SET_USERNO(userNo: string) {
      this.userNo = userNo;
    },
    /** 存储用户名 */
    SET_USERNAME(username: string) {
      this.username = username;
    },
    /** 存储角色 */
    SET_ROLES(roles: Array<string>) {
      this.roles = roles;
    },
    /** 存储机构号 */
    SET_ORGNO(orgNo: string) {
      this.orgNo = orgNo;
    },
    /** 存储机构名称 */
    SET_ORG(org: string) {
      this.org = org;
    },
    /** 存储电话 */
    SET_PHONE(phone: string) {
      this.phone = phone;
    },
    /** 存储是否勾选了7天内免登录 */
    SET_ISREMEMBERED(bool: boolean) {
      this.isRemembered = bool;
    },
    /** 登入 */
    async loginByUsername(data) {
      return new Promise<UserResult>((resolve, reject) => {
        getLogin(data)
          .then(data => {
            if (data?.success) setToken(data.data);
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /** 前端登出（不调用接口） */
    logOut() {
      this.user_no = "";
      this.username = "";
      this.roles = [];
      this.org_no = "";
      this.org = "";
      this.phone = "";
      removeToken();
      useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
      resetRouter();
      // router.push("/login");
      window.location.href = "/";
    },
    /** 刷新`token` */
    async handRefreshToken(data) {
      return new Promise<RefreshTokenResult>((resolve, reject) => {
        refreshTokenApi(data)
          .then(data => {
            if (data) {
              setToken(data.data);
              resolve(data);
            }
          })
          .catch(error => {
            reject(error);
            this.user_no = "";
            this.username = "";
            this.roles = [];
            this.org_no = "";
            this.org = "";
            this.phone = "";
            removeToken();
            useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
            resetRouter();
            // router.push("/login");
            window.location.href = "/";
          });
      });
    }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
