import { shared_chats_api } from "apis/sharedChats.api";
import { useState } from "react";

type PropTypes = {
  id: number;
  userId: number;
};

export const ChatRoomHeader = ({ id, userId }: PropTypes) => {
  const getShareableLink = async (): Promise<string | null> => {
    const response = await shared_chats_api.createSharedChat({
      shared_by_user_id: userId,
      chat_id: id,
    });

    if (!response.success) {
      alert(response.error);
      return null;
    }

    return response.data;
  };

  const copyShareableLink = (link: string) => {
    navigator.clipboard.writeText(
      `${window && window.location.origin}/chats/shared/${link}`
    );
    alert(
      `Link Copied: ${window && window.location.origin}/chats/shared/${link}`
    );
  };

  const getShareableLinkAndCopyIt = async () => {
    const link = await getShareableLink();

    if (!link) return;

    copyShareableLink(link);
  };

  return (
    <div className='chat-room-header'>
      Chat room id: {id}
      <button onClick={getShareableLinkAndCopyIt}>Copy Shareable Link!</button>
    </div>
  );
};
