import { apiClient } from "./apiClient";
import { ResponseErrorModel } from "models/response.model";
import { MessageCreateModel, MessageModel } from "models/message.model";

export const messages_api = {
  getMessagesInChat: async (
    user_id: number,
    chat_id: number
  ): Promise<MessageModel | ResponseErrorModel> =>
    await apiClient.get(
      `messages/getMessages?userId=${user_id}&chatId=${chat_id}`
    ),

  createMessageInChat: async (
    body: MessageCreateModel
  ): Promise<MessageModel | ResponseErrorModel> =>
    await apiClient.post("messages/createMessage", {
      userId: body.user_id,
      chatId: body.chat_id,
      newMessage: body.new_message,
    }),
};
