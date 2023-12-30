import { SharedChatRoom } from "components/feature/SharedChatRoom/SharedChatRoom";
import { UserDataModel } from "models/user.models";

export const SharedChatArea = () => {
  const userFromSession = sessionStorage.getItem("_user");
  const user: UserDataModel | null = userFromSession
    ? JSON.parse(userFromSession)
    : null;

  if (!user) return <span>No user</span>;

  return <SharedChatRoom user={user} />;
};
