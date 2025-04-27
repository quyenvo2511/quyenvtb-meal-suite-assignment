import { User } from "@acme/shared-models";
import { Api } from "./request";
import { USER_URLS } from "./endpoint-url";

export const getListUser = async (): Promise<User[]> => {
  const response = await Api.get(USER_URLS.getListUser);
  return response;
};
