import { Sidebar } from "components/layout/Sidebar";
import { ChatDataModel } from "models/chat.model";
import { createContext, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

type ContextType = {
  chats: ChatDataModel[];
  setChats: React.Dispatch<React.SetStateAction<ChatDataModel[]>>;
};

export const MainPageContext = createContext<ContextType>({} as ContextType);

export const PrivateRoutes = () => {
  const [chats, setChats] = useState<ChatDataModel[]>([]);

  const userFromSession = sessionStorage.getItem("_user");
  const isAuthenticated = !!userFromSession;

  return isAuthenticated ? (
    <MainPageContext.Provider value={{ chats, setChats }}>
      <div className='main-page'>
        <div className='sidebar-container'>
          <Sidebar />
        </div>

        <Outlet />
      </div>
    </MainPageContext.Provider>
  ) : (
    <Navigate to='/login' />
  );
};
