const api =
  import.meta.env.MODE === "development"
    ? "/api"
    : "https://xurmo-api.vercel.app/api";
export const authUrl = `${api}/auth/`;
export const productUrl = `${api}/product/`;
export const reviewUrl = `${api}/review/`;
export const userUrl = `${api}/user/`;
export const bannerUrl = `${api}/banner/`;
export const brandUrl = `${api}/brand/`;
export const categoryUrl = `${api}/category/`;
export const orderUrl = `${api}/order/`;
export const postUrl = `${api}/post/`;

export const token = localStorage.getItem("refresh_token") || false;
