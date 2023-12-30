import { ChatRoom } from "components/feature/ChatRoom/ChatRoom";
import { UserDataModel } from "models/user.models";

export const ChatArea = () => {
  const userFromSession = sessionStorage.getItem("_user");
  const user: UserDataModel | null = userFromSession
    ? JSON.parse(userFromSession)
    : null;

  if (!user) return <span>No user</span>;

  return <ChatRoom user={user} />;
};
