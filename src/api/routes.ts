import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data: Array<any>;
};

export const getAsyncRoutes = (params?: object) => {
  return http.request<Result>("post", "/get-async-routes", { params });
};
