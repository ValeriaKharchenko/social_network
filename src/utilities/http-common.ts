import axios, { AxiosResponse } from "axios";
import { setAccessToken, setRefreshToken } from "./token";

const a = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

a.interceptors.request.use((config) => {
  const aConfig = config;
  const token = localStorage.getItem("accessToken");
  if (token) {
    if (aConfig.headers) {
      aConfig.headers.Authorization = `Bearer ${token}`;
    }
  }
  return aConfig;
});

export default {
  post: async (url: string, data?: any): Promise<AxiosResponse<any, any>> => {
    try {
      const resp = await a.post(url, data);
      return resp;
    } catch (e: any) {
      if (e.response) {
        if (e.response.data.status_code === 401) {
          // await refresh token
          // if during refresh response is 401 -> logout
          const newTokens = await refresh();
          return await a.post(url, data);
        }
      }
      throw e;
    }
  },
  delete: async (url: string, data?: any) => {
    try {
      await a.delete(url, data);
      console.log("user logged out");
    } catch (e) {
      console.log(e);
    }
  },
  get: async (url: string): Promise<AxiosResponse<any, any>> => {
    try {
      const res = await a.get(url);
      return res;
    } catch (e: any) {
      if (e.response) {
        if (e.response.data.status_code === 401) {
          // await refresh token
          // if during refresh response is 401 -> logout
          await refresh();
          return await a.get(url);
        }
      }
      throw e;
    }
  },
};

async function refresh() {
  const rT = localStorage.getItem("refreshToken");
  try {
    const response = await a.post("user/refresh", {
      refresh_token: rT,
    });
    setAccessToken(response.data.access_token);
    setRefreshToken(response.data.refresh_token);
    console.log("refreshed");
  } catch (e) {
    throw e;
  }
}
