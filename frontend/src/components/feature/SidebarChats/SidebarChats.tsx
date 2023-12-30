import { SidebarChatItem } from "components/ui/SidebarChatItem";
import { ChatDataModel } from "models/chat.model";
import { UserDataModel } from "models/user.models";
import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { MainPageContext } from "routes/PrivateRoute";
import { SidebarChatsContext } from "./SidebarChats.context";
import { useFetchChats, useSetSelectedChat } from "./SidebarChats.hooks";

type PropTypes = {
  user: UserDataModel;
};

export const SidebarChats = ({ user }: PropTypes) => {
  const { id } = useParams();

  const { chats, setChats } = useContext(MainPageContext);

  const [selectedChat, setChat] = useState<ChatDataModel>({} as ChatDataModel);

  useFetchChats(user?.id, setChats);

  useSetSelectedChat(setChat, chats, id);

  return (
    <SidebarChatsContext.Provider value={{ selectedChat, setChat }}>
      <div className='chats'>
        {chats?.map((chat) => (
          <SidebarChatItem key={chat.id} chat={chat} />
        ))}
      </div>
    </SidebarChatsContext.Provider>
  );
};
