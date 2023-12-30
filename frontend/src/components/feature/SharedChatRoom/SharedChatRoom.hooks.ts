import { useEffect } from "react";

export const useFetchMessages = (
  token: string | undefined,
  getMessagesInThisChat: () => Promise<void>
) => {
  useEffect(() => {
    token && getMessagesInThisChat();
  }, [getMessagesInThisChat, token]);
};
