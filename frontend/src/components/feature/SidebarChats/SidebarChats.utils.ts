import { chats_api } from "apis/chats.api";
import { ChatDataModel } from "models/chat.model";

export const fetchChats = async (
  user_id: number,
  setChats: (value: ChatDataModel[]) => void
) => {
  const response = await chats_api.getChatsByUser(user_id);

  response.success && setChats && setChats(response.data);
};
