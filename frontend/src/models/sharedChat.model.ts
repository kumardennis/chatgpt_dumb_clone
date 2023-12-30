import { ResponseSuccessModel } from "./response.model";

export interface SharedChatModel extends ResponseSuccessModel {
  data: SharedChatDataModel[];
}

export type SharedChatDataModel = {
  id: number;
  chat_id: number;
  shared_by_user_id: number;
  share_token: string;
  created_at: string;
};

export type SharedChatCreateModel = {
  shared_by_user_id: number;
  chat_id: number;
};

export interface SharedChatCreateResponseModel extends ResponseSuccessModel {
  data: string;
}

export type SharedChatTransferModel = {
  token: string;
  user_id: number;
};

export interface SharedChatResponseModel extends ResponseSuccessModel {
  data: number;
}
