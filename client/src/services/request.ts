import { toast } from "react-toastify";
import { HTTP_METHOD, HttpMethod } from "../constants/httpMethod";

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
      "Access-Control-Allow-Origin": "*",
    },
  };

  // Process query params for GET and DELETE requests
  if (options?.params) {
    const queryString = new URLSearchParams(options.params).toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  // Process body for POST, PUT, DELETE
  if (options?.body) {
    instanceFetching.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, instanceFetching);

    if (response.status === 204) {
      // No Content, return null or an empty object as appropriate
      return null;
    } else if (response.status >= 200 && response.status < 300) {
      // Successful response with content
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
