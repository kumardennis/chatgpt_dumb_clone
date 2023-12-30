import { ResponseSuccessModel } from "./response.model";

export interface MessageModel extends ResponseSuccessModel {
  data: MessageDataModel[];
}

export type MessageDataModel = {
  id: number;
  text: string;
  chat_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
};

export type MessageCreateModel = {
  user_id: number;
  chat_id: number;
  new_message: string;
};
