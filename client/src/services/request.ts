import { toast } from "react-toastify";
import { HTTP_METHOD, HttpMethod } from "../constants/httpMethod";
import { encodeQuery } from "../utils/string";

const BASE_URL = "http://localhost:3333/api";

export const request = async (
  path: string,
  method: HttpMethod,
  options: { params?: Record<string, any>; body?: {} }
) => {
  let url = `${BASE_URL}${path}`;
  const instanceFetching: RequestInit = {
    method: HTTP_METHOD[method],
    headers: {
      "Content-Type": "application/json",
    },
  };

  const reqData =
    method === HTTP_METHOD.GET || method === HTTP_METHOD.DELETE
      ? { params: options }
      : { body: options };

  // Now process based on what reqData contains
  if (reqData.params) {
    const queryString = encodeQuery(reqData.params);
    url += `?${queryString}`;
  }

  if (reqData.body) {
    instanceFetching.body = JSON.stringify(reqData.body);
  }
  try {
    const response = await fetch(url, instanceFetching);

    if (response.status === 200) {
      const result = await response.json();
      return result;
    } else if (response.status >= 400) {
      const errorText = await response.text();
      toast.error(errorText || `Request failed with status ${response.status}`);
      throw new Error(
        errorText || `Request failed with status ${response.status}`
      );
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    toast.error((error as Error).message || "Something went wrong!");
    throw error;
  }
};

export const Api = {
  get: (path: string, data?: Record<string, any>) =>
    request(path, HTTP_METHOD.GET, { params: data }),
  post: (path: string, data?: any) => request(path, HTTP_METHOD.POST, data),
  put: (path: string, data?: any) => request(path, HTTP_METHOD.PUT, data),
  delete: (path: string, data?: Record<string, any>) =>
    request(path, HTTP_METHOD.DELETE, { params: data }),
};
