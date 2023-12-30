import { ResponseSuccessModel } from "./response.model";

export interface ChatModel extends ResponseSuccessModel {
  data: ChatDataModel[];
}

export type ChatDataModel = {
  id: number;
  name: string;
  created_by: number;
  created_at: string;
  updated_at: string;
};

export type ChatCreateModel = {
  user_id: number;
  new_name: string;
};
