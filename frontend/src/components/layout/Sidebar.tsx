import { SidebarChats } from "components/feature/SidebarChats/SidebarChats";
import { UserDataModel } from "models/user.models";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const userFromSession = sessionStorage.getItem("_user");
  const user: UserDataModel | null = userFromSession
    ? JSON.parse(userFromSession)
    : null;

  if (!user) return <span>No user</span>;

  return (
    <div className='sidebar'>
      <div className='chat-brand'>
        <h3>DumbGPT</h3>
        <Link to={"/chats/0"}>
          <button>New</button>
        </Link>
      </div>
      <SidebarChats user={user} />

      <div className='account-name'>
        <img
          src={user?.profile_picture}
          alt='profile'
          className='profile-image'
        />
        <strong>{user?.display_name}</strong>
      </div>
    </div>
  );
};
