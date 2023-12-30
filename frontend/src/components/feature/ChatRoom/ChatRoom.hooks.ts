import { messages_api } from "apis/messages.api";
import { MessageDataModel } from "models/message.model";
import { useCallback, useEffect } from "react";

export const useFetchMessages = (
  user_id: number,
  chat_id: string | undefined,
  setMessages: (value: MessageDataModel[]) => void
) => {
  const getMessagesInThisChat = useCallback(
    async (user_id: number, chat_id: number) => {
      const response = await messages_api.getMessagesInChat(user_id, chat_id);

      response.success && setMessages(response.data);
    },
    [setMessages]
  );

  useEffect(() => {
    chat_id && getMessagesInThisChat(user_id, parseInt(chat_id));
  }, [chat_id, getMessagesInThisChat, user_id]);
};
