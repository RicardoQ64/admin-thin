export const baseApi = (url: string) =>
  process.env.NODE_ENV === "development"
    ? `/api/${url}`
    : `http://127.0.0.1:8000/${url}`;
