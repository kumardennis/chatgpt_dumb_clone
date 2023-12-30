import { shared_chats_api } from "apis/sharedChats.api";
import { SharedChatDataModel } from "models/sharedChat.model";

export const getSharedChatByToken = async (
  sharedToken: string
): Promise<SharedChatDataModel[] | null> => {
  const response = await shared_chats_api.getChatByToken(sharedToken);

  if (!response.success) {
    alert(response.error);
    return null;
  }

  return response.data;
};

export const createTransferChatRoom = async (
  token: string | undefined,
  user_id: number
): Promise<string | null> => {
  if (!token) return null;

  const response = await shared_chats_api.transferSharedChat({
    user_id,
    token,
  });

  if (!response.success) {
    alert(response.error);
    return null;
  }

  return response.data;
};
