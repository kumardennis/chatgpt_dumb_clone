import { messages_api } from "apis/messages.api";
import { MessageDataModel } from "models/message.model";
import { UserDataModel } from "models/user.models";
import { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChatRoomMessage } from "components/ui/ChatRoom.Message";
import { ChatRoomEmpty } from "components/ui/ChatRoom.Empty";
import { useFetchMessages } from "./SharedChatRoom.hooks";
import {
  createTransferChatRoom,
  getSharedChatByToken,
} from "./SharedChatRoom.utils";

type PropTypes = {
  user: UserDataModel;
};

export const SharedChatRoom = ({ user }: PropTypes) => {
  let { token } = useParams();

  const navigate = useNavigate();

  const [messages, setMessages] = useState<MessageDataModel[]>([]);

  const getMessagesInThisChat = useCallback(async () => {
    if (!token) return;

    const chat = await getSharedChatByToken(token);
    if (!chat) return;

    const response = await messages_api.getMessagesInChat(
      chat[0].shared_by_user_id,
      chat[0].chat_id
    );

    response.success && setMessages(response.data);
  }, [token]);

  const transferChatRoom = async () => {
    const new_chat_id = await createTransferChatRoom(token, user?.id);

    window.location.reload();

    navigate(`/chats/${new_chat_id}`);
  };

  useFetchMessages(token, getMessagesInThisChat);

  return (
    <div className='chat-room'>
      {token === "" ? (
        <ChatRoomEmpty />
      ) : (
        <div className='chat-room-messages'>
          {messages.map((message) => (
            <ChatRoomMessage key={message.id} message={message} user={user} />
          ))}
        </div>
      )}
      <div className='chat-room-footer'>
        <button onClick={transferChatRoom}>Fork this chat</button>
      </div>
    </div>
  );
};
