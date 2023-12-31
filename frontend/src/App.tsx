import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "pages/LoginPage";
import { PrivateRoutes } from "routes/PrivateRoute";
import { ChatPage } from "pages/ChatPage";
import { SharedChatArea } from "components/layout/SharedChatArea";
import { SharedChatPage } from "pages/SharedChatPage";
import ErrorBoundary from "ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/login' element={<LoginPage />} />

          <Route path='/' element={<PrivateRoutes />}>
            <Route element={<ChatPage />} path='/chats/:id' />
            <Route element={<SharedChatPage />} path='/chats/shared/:token' />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
