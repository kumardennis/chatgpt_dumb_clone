import { apiClient } from "./apiClient";
import { ResponseErrorModel } from "models/response.model";
import {
  SharedChatCreateModel,
  SharedChatCreateResponseModel,
  SharedChatModel,
  SharedChatTransferModel,
} from "models/sharedChat.model";

export const shared_chats_api = {
  getChatByToken: async (
    token: string
  ): Promise<SharedChatModel | ResponseErrorModel> =>
    await apiClient.get(`shared-chats/getSharedChatByToken?token=${token}`),

  createSharedChat: async (
    body: SharedChatCreateModel
  ): Promise<SharedChatCreateResponseModel | ResponseErrorModel> =>
    await apiClient.post("shared-chats/createSharedChat", {
      sharedByUserId: body.shared_by_user_id,
      chatId: body.chat_id,
    }),

  transferSharedChat: async (
    body: SharedChatTransferModel
  ): Promise<SharedChatCreateResponseModel | ResponseErrorModel> =>
    await apiClient.post("shared-chats/transferChat", {
      token: body.token,
      userId: body.user_id,
    }),
};
