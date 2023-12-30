import { ChatCreateModel, ChatModel } from "models/chat.model";
import { apiClient } from "./apiClient";
import { ResponseErrorModel } from "models/response.model";

export const chats_api = {
  getChatsByUser: async (
    user_id: number
  ): Promise<ChatModel | ResponseErrorModel> =>
    await apiClient.get(`chats/getChatsByUser?userId=${user_id}`),

  createChat: async (
    body: ChatCreateModel
  ): Promise<ChatModel | ResponseErrorModel> =>
    await apiClient.post("chats/createChat", {
      userId: body.user_id,
      newName: body.new_name,
    }),
};
