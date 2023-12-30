import { chats_api } from "apis/chats.api";
import { ChatDataModel } from "models/chat.model";

export const createNewChatRoom = async (
  user_id: number,
  message: string
): Promise<ChatDataModel[] | null> => {
  const response = await chats_api.createChat({
    user_id,
    new_name: message.slice(0, 50),
  });

  if (!response.success) {
    alert(response.error);
    return null;
  }

  return response.data;
};
