import { UserModel } from "models/user.models";
import { apiClient } from "./apiClient";
import { ResponseErrorModel } from "models/response.model";

export const auth_api = {
  getUser: async (): Promise<UserModel | ResponseErrorModel> =>
    await apiClient.get("/auth/get-user"),
};
