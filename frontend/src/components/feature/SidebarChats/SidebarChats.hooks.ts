import { useEffect } from "react";
import { fetchChats } from "./SidebarChats.utils";
import { ChatDataModel } from "models/chat.model";

export const useFetchChats = (
  user_id: number,
  setChats: (value: ChatDataModel[]) => void
) => {
  useEffect(() => {
    fetchChats(user_id, setChats);
  }, [setChats, user_id]);
};

export const useSetSelectedChat = (
  setChat: (value: ChatDataModel) => void,
  chats: ChatDataModel[],
  id: string | undefined
) => {
  useEffect(() => {
    if (!id) return;

    setChat(
      chats.find((chat) => chat.id === parseInt(id)) ?? ({} as ChatDataModel)
    );
  }, [chats, id, setChat]);
};
