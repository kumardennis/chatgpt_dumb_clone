import { ChatDataModel } from "models/chat.model";
import { createContext } from "react";

type ContextType = {
  selectedChat: ChatDataModel;
  setChat: React.Dispatch<React.SetStateAction<ChatDataModel>>;
};

export const SidebarChatsContext = createContext<ContextType>(
  {} as ContextType
);
