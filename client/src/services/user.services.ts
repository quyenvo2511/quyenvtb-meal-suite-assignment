import { User } from "@acme/shared-models";
import { Api } from "./request";
import { USER_URLS } from "./endpoint-url";

export const getListUser = async (): Promise<User[]> => {
  const response = await Api.get(USER_URLS.GET_LIST_USERS);
  return response;
};

export const getUserDetails = async (id: number): Promise<User> => {
  const response = await Api.get(`${USER_URLS.GET_DETAIL_USER}/${id}`);
  return response;
};
