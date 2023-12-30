import { SidebarChatsContext } from "components/feature/SidebarChats/SidebarChats.context";
import { ChatDataModel } from "models/chat.model";
import { useContext } from "react";
import { Link } from "react-router-dom";

type PropTypes = {
  chat: ChatDataModel;
};

export const SidebarChatItem = ({ chat }: PropTypes) => {
  const { selectedChat } = useContext(SidebarChatsContext);

  return (
    <Link
      className={`chat-item ${selectedChat.id === chat.id ? "active" : ""}`}
      to={`/chats/${chat.id}`}
    >
      <span>{chat.name}</span>
    </Link>
  );
};
