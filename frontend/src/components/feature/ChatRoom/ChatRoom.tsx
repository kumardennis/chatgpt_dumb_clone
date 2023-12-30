import { messages_api } from "apis/messages.api";
import { ChatRoomHeader } from "components/ui/ChatRoom.Header";
import { MessageDataModel } from "models/message.model";
import { UserDataModel } from "models/user.models";
import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChatRoomMessage } from "components/ui/ChatRoom.Message";
import { ChatRoomInput } from "components/ui/ChatRoom.Input";
import { ChatRoomEmpty } from "components/ui/ChatRoom.Empty";
import { MainPageContext } from "routes/PrivateRoute";
import { useFetchMessages } from "./ChatRoom.hooks";
import { createNewChatRoom } from "./ChatRoom.utils";
import { ChatDataModel } from "models/chat.model";

type PropTypes = {
  user: UserDataModel;
};

export const ChatRoom = ({ user }: PropTypes) => {
  let { id } = useParams();

  const navigate = useNavigate();

  const [messages, setMessages] = useState<MessageDataModel[]>([]);

  const { setChats } = useContext(MainPageContext);

  const appendNewMessages = (newMessages: MessageDataModel[]) => {
    setMessages((preValue) => [...preValue, ...newMessages]);
  };

  const appendNewChat = (new_chat_created: ChatDataModel[]) => {
    setChats((prev) => [...new_chat_created, ...prev]);
  };

  const sendMessage = async (
    message: string,
    chat_id: number
  ): Promise<void> => {
    const response = await messages_api.createMessageInChat({
      user_id: user?.id,
      chat_id: chat_id,
      new_message: message,
    });

    if (!response.success) {
      alert(response.error);
      return;
    }

    appendNewMessages(response.data);
  };

  const createNewChatAndSendMessage = async (message: string) => {
    const new_chat = await createNewChatRoom(user?.id, message);

    if (!new_chat) return;

    navigate(`/chats/${new_chat[0].id}`, { replace: true });
    await sendMessage(message, new_chat[0].id);
    appendNewChat(new_chat);
  };

  const checkWhichChatRoomToMessageIn = async (message: string) => {
    if (!id) return;
    if (isNaN(parseInt(id))) return;

    if (id === "0") await createNewChatAndSendMessage(message);
    else sendMessage(message, parseInt(id));
  };

  useFetchMessages(user?.id, id, setMessages);

  return (
    <div className='chat-room'>
      <ChatRoomHeader userId={user?.id} id={parseInt(id ?? "0")} />
      {id === "0" ? (
        <ChatRoomEmpty />
      ) : (
        <div className='chat-room-messages'>
          {messages.map((message) => (
            <ChatRoomMessage key={message.id} message={message} user={user} />
          ))}
        </div>
      )}
      <div className='chat-room-footer'>
        <ChatRoomInput user={user} onSubmit={checkWhichChatRoomToMessageIn} />
      </div>
    </div>
  );
};
